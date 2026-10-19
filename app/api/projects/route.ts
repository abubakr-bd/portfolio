import { NextRequest, NextResponse } from 'next/server';
import { getProjects, saveProject } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';
import { Project } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const publishedOnly = searchParams.get('published') === 'true';
  const projects = getProjects(publishedOnly);
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    if (!data.title || !data.slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    const newProject: Project = {
      ...data,
      id: data.id || `proj-${Date.now()}`
    };

    const saved = saveProject(newProject);
    return NextResponse.json({ success: true, project: saved });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}
