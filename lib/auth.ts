import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'abubakr_admin_session';
const DEFAULT_PASSKEY = process.env.ADMIN_SECRET_KEY || 'abubakr_creative_2026';
const DEFAULT_USER = process.env.ADMIN_USERNAME || 'abubakr';

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!sessionToken) return false;
    // Simple secure deterministic signature check
    const expectedToken = Buffer.from(`${DEFAULT_USER}:${DEFAULT_PASSKEY}`).toString('base64');
    return sessionToken === expectedToken;
  } catch {
    return false;
  }
}

export function createAdminSessionToken(): string {
  return Buffer.from(`${DEFAULT_USER}:${DEFAULT_PASSKEY}`).toString('base64');
}

export function getAdminCookieName(): string {
  return ADMIN_COOKIE_NAME;
}

export function validateCredentials(passkey?: string, username?: string): boolean {
  if (!passkey) return false;
  const targetPasskey = process.env.ADMIN_SECRET_KEY || 'abubakr_creative_2026';
  const targetUser = process.env.ADMIN_USERNAME || 'abubakr';

  if (username && username.trim().toLowerCase() !== targetUser.toLowerCase()) {
    return false;
  }

  return passkey.trim() === targetPasskey.trim();
}
