import { NextRequest, NextResponse } from "next/server";

const DEV_TENANT_COOKIE = "dev_tenant";

export function middleware(request: NextRequest) {
  let hostname = request.headers.get("host") || "localhost";
  const url = request.nextUrl;
  const isLocal =
    hostname === "localhost" || hostname.startsWith("127.0.0.1");
  const slugParam = url.searchParams.get("tenant")?.trim();
  const slugFromCookie = request.cookies.get(DEV_TENANT_COOKIE)?.value;

  // Guardar host original para detectar plataforma (antes de cookie/param)
  const requestHost = hostname.replace(/:\d+$/, "").toLowerCase();

  if (slugParam === "" || slugParam === "clear") {
    hostname = isLocal ? "localhost" : hostname;
  } else {
    const slug = slugParam || slugFromCookie;
    if (slug) {
      hostname = isLocal ? `${slug}.localhost` : `${slug}.${hostname}`;
    }
  }

  const response = NextResponse.next();
  response.headers.set("x-tenant-host", hostname);

  // Platform landing: path "/" + host es plataforma. En localhost, ?tenant= override para dev.
  const platformDomains = (
    process.env.NEXT_PUBLIC_PLATFORM_DOMAIN ||
    process.env.NEXT_PUBLIC_PLATFORM_DOMAINS ||
    "localhost"
  )
    .split(",")
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
  const isPlatformDomain = platformDomains.some((d) => requestHost === d);
  const hasTenantOverride = (slugParam && slugParam !== "" && slugParam !== "clear") || (slugFromCookie && slugFromCookie !== "");
  // En producción (no localhost), la raíz siempre muestra plataforma. Cookie solo afecta en localhost.
  const showPlatform = url.pathname === "/" && isPlatformDomain && (requestHost === "localhost" ? !hasTenantOverride : true);
  if (showPlatform) {
    response.headers.set("x-platform-root", "1");
  }

  const pathSegments = url.pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];
  if (firstSegment && firstSegment !== "foto") {
    response.headers.set("x-tenant-slug", firstSegment);
  }

  if (url.searchParams.has("tenant")) {
    const slug = url.searchParams.get("tenant")?.trim();
    if (slug === "" || slug === "clear") {
      response.cookies.delete(DEV_TENANT_COOKIE);
    } else if (slug) {
      response.cookies.set(DEV_TENANT_COOKIE, slug, {
        path: "/",
        maxAge: 60 * 60 * 24,
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/admin|api/panel|admin|panel).*)",
  ],
};
