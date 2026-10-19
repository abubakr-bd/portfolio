import { NextRequest, NextResponse } from 'next/server';
import { getSkills, saveSkills } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';

export async function GET() {
  const list = getSkills();
  return NextResponse.json(list);
}

export async function PUT(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    saveSkills(data);
    return NextResponse.json({ success: true, skills: data });
  } catch (error) {
    console.error('Error saving skills:', error);
    return NextResponse.json({ error: 'Failed to save skills' }, { status: 500 });
  }
}
