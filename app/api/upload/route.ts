import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyAdminSession } from '@/lib/auth';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

function ensureUploadDir(): void {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

export async function GET() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  ensureUploadDir();
  const files = fs.readdirSync(UPLOAD_DIR).map((file) => {
    const stats = fs.statSync(path.join(UPLOAD_DIR, file));
    return {
      name: file,
      url: `/uploads/${file}`,
      size: stats.size,
      createdAt: stats.birthtime.toISOString(),
      type: file.endsWith('.mp4') ? 'video' : 'image'
    };
  });

  // Also include pre-bundled portfolio images from public/images
  const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
  let bundled: Array<{ name: string; url: string; size: number; createdAt: string; type: string }> = [];
  if (fs.existsSync(IMAGES_DIR)) {
    bundled = fs.readdirSync(IMAGES_DIR).map((file) => {
      const stats = fs.statSync(path.join(IMAGES_DIR, file));
      return {
        name: file,
        url: `/images/${file}`,
        size: stats.size,
        createdAt: stats.birthtime.toISOString(),
        type: file.endsWith('.mp4') ? 'video' : 'image'
      };
    });
  }

  return NextResponse.json([...files, ...bundled]);
}

export async function POST(req: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    ensureUploadDir();
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${sanitizedName}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
      name: filename,
      size: file.size
    });
  } catch (error) {
    console.error('Error handling upload:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
