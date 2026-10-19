import { NextRequest, NextResponse } from 'next/server';
import { getMessages, addMessage } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';

export async function GET() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const list = getMessages();
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Honeypot anti-spam check
    if (data.website_trap || data.honeypot) {
      return NextResponse.json({ success: true, message: 'Message received' });
    }

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    const saved = addMessage({
      name: data.name.trim(),
      email: data.email.trim(),
      company: data.company?.trim() || '',
      projectType: data.projectType || 'General Inquiry',
      budget: data.budget || 'Flexible',
      message: data.message.trim()
    });

    return NextResponse.json({ success: true, message: 'Thank you! Your inquiry has been received.', inquiry: saved });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
