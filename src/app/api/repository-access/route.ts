import { NextRequest, NextResponse } from 'next/server';
import { addRepositoryAccess } from '@/lib/github';
import { getPurchasesByEmail, updatePurchase } from '@/lib/purchases-db';
import { getProductById } from '@/lib/products-db';
import crypto from 'crypto';

// Rate limiting for repository access requests
const requestCounts = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const windowTime = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5; // Max 5 requests per hour per email

  const record = requestCounts.get(identifier);
  
  if (!record || now - record.timestamp > windowTime) {
    requestCounts.set(identifier, { count: 1, timestamp: now });
    return false;
  }
  
  if (record.count >= maxRequests) {
    return true;
  }
  
  record.count++;
  return false;
}

function validateInput(email: string, githubUsername: string, productId: string): { valid: boolean; error?: string } {
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // GitHub username validation (alphanumeric, hyphens, max 39 chars)
  const githubRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
  if (!githubRegex.test(githubUsername)) {
    return { valid: false, error: 'Invalid GitHub username format' };
  }

  // Product ID validation (prevent injection)
  if (!/^[a-zA-Z0-9-_]+$/.test(productId)) {
    return { valid: false, error: 'Invalid product ID format' };
  }

  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, githubUsername, productId } = body;

    // Input validation
    if (!email || !githubUsername || !productId) {
      return NextResponse.json(
        { error: 'Missing required fields: email, githubUsername, productId' },
        { status: 400 }
      );
    }

    // Validate input format and security
    const validation = validateInput(email, githubUsername, productId);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Rate limiting check
    const rateLimitKey = crypto.createHash('sha256').update(email).digest('hex');
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    console.log(`🔑 Repository access request from ${email} for product ${productId}`);

    // Find purchases by email with additional security checks
    const purchases = getPurchasesByEmail(email);
    
    if (purchases.length === 0) {
      return NextResponse.json(
        { error: 'No purchases found for this email address' },
        { status: 404 }
      );
    }

    // Find the specific product purchase with strict validation
    let targetPurchase = null;
    let targetItem = null;

    for (const purchase of purchases) {
      // Verify purchase integrity
      if (!purchase.sessionId || !purchase.completedAt || purchase.status !== 'completed') {
        continue;
      }

      const item = purchase.items.find(item => item.productId === productId);
      if (item) {
        targetPurchase = purchase;
        targetItem = item;
        break;
      }
    }

    if (!targetPurchase || !targetItem) {
      return NextResponse.json(
        { error: 'Product not found in your purchases' },
        { status: 404 }
      );
    }

    // Additional purchase verification
    if (targetPurchase.status !== 'completed') {
      return NextResponse.json(
        { error: 'Purchase is not completed yet' },
        { status: 400 }
      );
    }

    // Verify purchase is recent (within 1 year)
    if (targetPurchase.completedAt) {
      const purchaseDate = new Date(targetPurchase.completedAt);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      
      if (purchaseDate < oneYearAgo) {
        return NextResponse.json(
          { error: 'Purchase is too old for repository access' },
          { status: 400 }
        );
      }
    }

    // Check if access was already granted
    if (targetItem.repositoryAccess?.granted) {
      const product = getProductById(productId);
      const repositoryUrl = product?.repository 
        ? `https://github.com/${product.repository.owner}/${product.repository.name}`
        : undefined;

      return NextResponse.json(
        { 
          message: 'Repository access already granted',
          repository: {
            ...targetItem.repositoryAccess,
            url: repositoryUrl
          },
          alreadyGranted: true
        }
      );
    }

    // Get product information
    const product = getProductById(productId);
    if (!product || !product.repository) {
      return NextResponse.json(
        { error: 'Product does not have an associated repository' },
        { status: 400 }
      );
    }

    // Grant GitHub repository access
    const accessResult = await addRepositoryAccess({
      owner: product.repository.owner,
      repo: product.repository.name,
      username: githubUsername,
      permission: 'read'
    });

    if (accessResult.success) {
      // Update purchase record
      const updatedItems = targetPurchase.items.map(item => {
        if (item.productId === productId) {
          return {
            ...item,
            repositoryAccess: {
              owner: product.repository!.owner,
              repo: product.repository!.name,
              granted: true,
              grantedAt: new Date().toISOString(),
              accessRequested: true
            }
          };
        }
        return item;
      });

      await updatePurchase(targetPurchase.id, {
        items: updatedItems,
        githubUsername
      });

      return NextResponse.json({
        success: true,
        message: 'Repository access granted successfully',
        repository: {
          owner: product.repository.owner,
          name: product.repository.name,
          url: `https://github.com/${product.repository.owner}/${product.repository.name}`,
          permission: 'read'
        }
      });
    } else {
      // Update purchase to mark access as requested but failed
      const updatedItems = targetPurchase.items.map(item => {
        if (item.productId === productId) {
          return {
            ...item,
            repositoryAccess: {
              owner: product.repository!.owner,
              repo: product.repository!.name,
              granted: false,
              accessRequested: true
            }
          };
        }
        return item;
      });

      await updatePurchase(targetPurchase.id, {
        items: updatedItems,
        githubUsername
      });

      return NextResponse.json(
        { 
          error: 'Failed to grant repository access',
          details: accessResult.message
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ Repository access error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
