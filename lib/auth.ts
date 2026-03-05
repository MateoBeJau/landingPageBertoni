import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-me"
);

const ADMIN_COOKIE = "admin_token";
const PANEL_COOKIE = "panel_token";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ─── Admin (platform) ───────────────────────────────────────────────────────

export async function createToken(payload: {
  adminId: string;
  email: string;
}): Promise<string> {
  return new SignJWT({ ...payload, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function getAdminSession(): Promise<{
  adminId: string;
  email: string;
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload.role !== "admin") return null;
    return { adminId: payload.adminId as string, email: payload.email as string };
  } catch {
    return null;
  }
}

export function getTokenCookieOptions() {
  return {
    name: ADMIN_COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

// ─── Tenant User (photographer panel) ───────────────────────────────────────

export async function createPanelToken(payload: {
  userId: string;
  tenantId: string;
  email: string;
}): Promise<string> {
  return new SignJWT({ ...payload, role: "tenant_user" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function getPanelSession(): Promise<{
  userId: string;
  tenantId: string;
  email: string;
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(PANEL_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload.role !== "tenant_user") return null;
    return {
      userId: payload.userId as string,
      tenantId: payload.tenantId as string,
      email: payload.email as string,
    };
  } catch {
    return null;
  }
}

export function getPanelCookieOptions() {
  return {
    name: PANEL_COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
