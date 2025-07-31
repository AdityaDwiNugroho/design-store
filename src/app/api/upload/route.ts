import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and SVG are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Check if we're in development or production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (isDevelopment) {
      // Development: Save to local file system
      const { writeFile, mkdir } = await import('fs/promises');
      const { join } = await import('path');
      const { existsSync } = await import('fs');

      const uploadsDir = join(process.cwd(), 'public', 'uploads');
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }

      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const extension = file.name.split('.').pop() || 'jpg';
      const filename = `product-${timestamp}-${randomSuffix}.${extension}`;
      
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filepath = join(uploadsDir, filename);
      
      await writeFile(filepath, buffer);
      
      return NextResponse.json({
        success: true,
        url: `/uploads/${filename}`,
        filename: filename
      });
    } else {
      // Production: Use Cloudinary
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Convert buffer to base64 for Cloudinary upload
      const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;
      
      // Generate unique filename
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const filename = `product-${timestamp}-${randomSuffix}`;
      
      try {
        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(base64Data, {
          folder: 'design-store/products',
          public_id: filename,
          resource_type: 'auto',
          transformation: [
            { quality: 'auto', fetch_format: 'auto' }, // Automatic optimization
            { width: 800, height: 600, crop: 'limit' }  // Limit max size
          ]
        });

        return NextResponse.json({
          success: true,
          url: uploadResult.secure_url,
          filename: uploadResult.public_id,
          cloudinary_id: uploadResult.public_id,
          message: 'Image uploaded successfully to Cloudinary'
        });
      } catch (cloudinaryError) {
        console.error('Cloudinary upload error:', cloudinaryError);
        return NextResponse.json(
          { error: 'Failed to upload to Cloudinary. Please check your configuration.' },
          { status: 500 }
        );
      }
    }

  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image. ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}
