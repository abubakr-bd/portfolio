import { NextRequest, NextResponse } from 'next/server';
import { getCurrentlyBuilding, saveCurrentlyBuilding, deleteCurrentlyBuilding } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';
import { CurrentlyBuilding } from '@/lib/types';

export async function GET() {
  const list = getCurrentlyBuilding();
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const item: CurrentlyBuilding = {
      ...data,
      id: data.id || `cb-${Date.now()}`
    };
    const saved = saveCurrentlyBuilding(item);
    return NextResponse.json({ success: true, item: saved });
  } catch (error) {
    console.error('Error saving currently building item:', error);
    return NextResponse.json({ error: 'Failed to save item' }, { status: 500 });
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

  const success = deleteCurrentlyBuilding(id);
  return NextResponse.json({ success });
}
