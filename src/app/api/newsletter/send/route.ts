import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { subject, message, recipients } = await request.json();

    // Validate inputs
    if (!subject || !message || !recipients || recipients.length === 0) {
      return NextResponse.json(
        { error: 'Subject, message, and recipients are required' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your-resend-api-key-here') {
      console.log('📧 RESEND API KEY NOT CONFIGURED - SIMULATING EMAIL SENDING:');
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log(`Recipients: ${recipients.length} subscribers`);
      console.log(`To: ${recipients.join(', ')}`);
      
      return NextResponse.json({
        success: true,
        message: `Newsletter simulated for ${recipients.length} subscriber${recipients.length !== 1 ? 's' : ''} (Configure RESEND_API_KEY for real emails)`,
        sentCount: recipients.length,
        isSimulation: true
      });
    }

    console.log('📧 SENDING NEWSLETTER TO ALL SUBSCRIBERS:');
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log(`Recipients: ${recipients.length} subscribers`);

    // Send real emails
    const emailResults = await sendRealEmails(subject, message, recipients);

    return NextResponse.json({
      success: true,
      message: `Newsletter sent! ${emailResults.summary.sent} delivered, ${emailResults.summary.failed} failed out of ${emailResults.summary.total} total.`,
      sentCount: emailResults.summary.sent,
      failedCount: emailResults.summary.failed,
      totalCount: emailResults.summary.total,
      isSimulation: false,
      results: emailResults.results
    });

  } catch (error) {
    console.error('Newsletter sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send newsletter' },
      { status: 500 }
    );
  }
}

// Send professional newsletters to all subscribers using Resend
async function sendRealEmails(subject: string, message: string, recipients: string[]) {
  const results = [];
  const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';

  console.log('\n🚀 SENDING NEWSLETTERS TO ALL SUBSCRIBERS...');
  console.log(`From: ${fromEmail}`);
  console.log(`Total recipients: ${recipients.length}`);
  
  for (const email of recipients) {
    try {
      const result = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: subject,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
            <style>
              @media only screen and (max-width: 600px) {
                .container { width: 100% !important; }
                .header { padding: 30px 20px !important; }
                .content { padding: 30px 20px !important; }
                .cta-button { padding: 12px 24px !important; font-size: 14px !important; }
              }
            </style>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  
                  <!-- Main Container -->
                  <table class="container" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
                    
                    <!-- Header -->
                    <tr>
                      <td class="header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.2;">
                          📦 Digital Store
                        </h1>
                        <p style="color: #e2e8f0; margin: 8px 0 0 0; font-size: 16px; font-weight: 400;">
                          Premium Digital Products & Design Assets
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                      <td class="content" style="padding: 40px 30px;">
                        
                        <!-- Subject Title -->
                        <h2 style="color: #1a202c; font-size: 24px; font-weight: 600; margin: 0 0 24px 0; line-height: 1.3;">
                          ${subject}
                        </h2>
                        
                        <!-- Newsletter Content -->
                        <div style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
                          ${message.split('\n').map(line => 
                            line.trim() 
                              ? `<p style="margin: 0 0 16px 0;">${line}</p>` 
                              : '<div style="height: 16px;"></div>'
                          ).join('')}
                        </div>
                        
                        <!-- Call to Action -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 32px 0;">
                          <tr>
                            <td align="center">
                              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}" 
                                 class="cta-button"
                                 style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                                🛍️ Visit Our Store
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Featured Products Section -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; background: #f7fafc; border-radius: 12px; margin: 32px 0;">
                          <tr>
                            <td style="padding: 30px;">
                              <h3 style="color: #2d3748; font-size: 20px; font-weight: 600; margin: 0 0 20px 0; text-align: center;">
                                🎨 What's New This Week
                              </h3>
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                                <tr>
                                  <td style="text-align: center; color: #718096; font-size: 15px; line-height: 1.6;">
                                    ✨ Premium UI Kits & Design Templates<br>
                                    🎯 Code Snippets & Development Tools<br>
                                    🎪 Creative Assets & Resources<br>
                                    💎 Exclusive Member Content
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background: #edf2f7; padding: 30px; text-align: center; border-radius: 0 0 12px 12px;">
                        <p style="color: #718096; font-size: 14px; margin: 0 0 16px 0; font-weight: 500;">
                          Thanks for being part of our community! 🙏
                        </p>
                        <p style="color: #a0aec0; font-size: 13px; margin: 0 0 20px 0;">
                          You're receiving this because you subscribed to our newsletter.
                        </p>
                        
                        <!-- Company Info -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; border-top: 1px solid #cbd5e0; padding-top: 20px; margin-top: 20px;">
                          <tr style="text-align: center;">
                            <td style="text-align: center;">
                              <p style="color: #a0aec0; font-size: 12px; margin: 0; line-height: 1.5;">
                                <strong style="color: #4a5568;">Digital Store</strong><br>
                                Premium Digital Products & Design Assets<br>
                                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}" style="color: #667eea; text-decoration: none;">Visit our website</a> | 
                                <a href="#" style="color: #667eea; text-decoration: none;">Unsubscribe</a>
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                  </table>
                  
                </td>
              </tr>
            </table>
            
            <!-- Preheader Text (Hidden) -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
              ${subject} - ${message.substring(0, 100)}...
            </div>
            
          </body>
          </html>
        `,
      });

      console.log(`✅ Newsletter sent to: ${email} (ID: ${result.data?.id})`);
      results.push({ email, success: true, id: result.data?.id });
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`❌ Failed to send newsletter to: ${email}`, error);
      results.push({ 
        email, 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  
  console.log(`\n📊 NEWSLETTER CAMPAIGN COMPLETED:`);
  console.log(`✅ Successfully sent: ${successCount}`);
  console.log(`❌ Failed to send: ${failCount}`);
  console.log(`📧 Total attempted: ${results.length}\n`);
  
  return { 
    success: true, 
    results, 
    summary: {
      total: results.length,
      sent: successCount,
      failed: failCount
    }
  };
}
