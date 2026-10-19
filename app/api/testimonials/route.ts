import { NextRequest, NextResponse } from 'next/server';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';
import { Testimonial } from '@/lib/types';

export async function GET() {
  const list = getTestimonials();
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const item: Testimonial = {
      ...data,
      id: data.id || `test-${Date.now()}`
    };
    const saved = saveTestimonial(item);
    return NextResponse.json({ success: true, testimonial: saved });
  } catch (error) {
    console.error('Error saving testimonial:', error);
    return NextResponse.json({ error: 'Failed to save testimonial' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const success = deleteTestimonial(id);
  return NextResponse.json({ success });
}
