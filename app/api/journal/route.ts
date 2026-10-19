import { NextRequest, NextResponse } from 'next/server';
import { getArticles, saveArticle } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';
import { JournalArticle } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const publishedOnly = searchParams.get('published') === 'true';
  const list = getArticles(publishedOnly);
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.title || !data.slug) {
      return NextResponse.json({ error: 'Title and slug required' }, { status: 400 });
    }

    const item: JournalArticle = {
      ...data,
      id: data.id || `art-${Date.now()}`
    };
    const saved = saveArticle(item);
    return NextResponse.json({ success: true, article: saved });
  } catch (error) {
    console.error('Error saving article:', error);
    return NextResponse.json({ error: 'Failed to save article' }, { status: 500 });
  }
}
