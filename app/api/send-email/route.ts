import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Initialize Resend inside the handler to avoid build-time errors
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['robertmitchell.biz@gmail.com'],
      replyTo: email,
      subject: `Portfolio Message from ${name}`,
      html: `
        <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; background: #030014; color: #f8fafc; padding: 40px; border: 1px solid #22d3d1;">
          <div style="border-bottom: 1px solid #22d3d1; padding-bottom: 20px; margin-bottom: 20px;">
            <h1 style="color: #22d3d1; margin: 0; font-size: 18px; letter-spacing: 2px;">
              &gt; INCOMING_TRANSMISSION
            </h1>
          </div>

          <div style="margin-bottom: 30px;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0 0 5px 0;">SENDER_ID:</p>
            <p style="color: #f8fafc; font-size: 16px; margin: 0;">${name}</p>
          </div>

          <div style="margin-bottom: 30px;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0 0 5px 0;">RETURN_FREQ:</p>
            <p style="color: #22d3d1; font-size: 16px; margin: 0;">
              <a href="mailto:${email}" style="color: #22d3d1; text-decoration: none;">${email}</a>
            </p>
          </div>

          <div style="margin-bottom: 30px;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0 0 5px 0;">MESSAGE_PAYLOAD:</p>
            <div style="background: rgba(34, 211, 209, 0.1); border: 1px solid rgba(34, 211, 209, 0.3); padding: 20px; margin-top: 10px;">
              <p style="color: #f8fafc; font-size: 14px; margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
          </div>

          <div style="border-top: 1px solid #22d3d1; padding-top: 20px; font-size: 11px; color: #64748b;">
            <p style="margin: 0;">TRANSMISSION_SOURCE: Portfolio Website</p>
            <p style="margin: 5px 0 0 0;">TIMESTAMP: ${new Date().toISOString()}</p>
          </div>
        </div>
      `,
      text: `
INCOMING TRANSMISSION
=====================

SENDER: ${name}
EMAIL: ${email}

MESSAGE:
${message}

---
Sent from Portfolio Contact Form
${new Date().toISOString()}
      `.trim(),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
