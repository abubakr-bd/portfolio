import { NextRequest, NextResponse } from 'next/server';
import { getExperiences, saveExperience, deleteExperience } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';
import { Experience } from '@/lib/types';

export async function GET() {
  const list = getExperiences();
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const item: Experience = {
      ...data,
      id: data.id || `exp-${Date.now()}`
    };
    const saved = saveExperience(item);
    return NextResponse.json({ success: true, experience: saved });
  } catch (error) {
    console.error('Error saving experience:', error);
    return NextResponse.json({ error: 'Failed to save experience' }, { status: 500 });
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

  const success = deleteExperience(id);
  return NextResponse.json({ success });
}
