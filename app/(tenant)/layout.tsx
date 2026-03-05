import { headers } from "next/headers";
import { getTenantFromHeaders } from "@/lib/tenant";
import { TenantProvider } from "@/components/TenantProvider";

export default async function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const tenant = await getTenantFromHeaders(headersList);
  const pathSlug = headersList.get("x-tenant-slug");
  const tenantWithPath = tenant
    ? { ...tenant, basePath: pathSlug ? `/${pathSlug}` : "" }
    : null;

  if (!tenantWithPath) {
    const host = headersList.get("x-tenant-host") || headersList.get("host") || "localhost";
    const isLocal =
      host === "localhost" ||
      host.startsWith("127.0.0.1") ||
      host.includes("localhost");
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-950">
        <div className="text-center max-w-md px-4">
          <h1 className="font-serif text-white text-4xl font-semibold mb-4">
            Site não encontrado
          </h1>
          <p className="font-sans text-stone-400 mb-6">
            Nenhum fotógrafo configurado para este domínio.
          </p>
          {isLocal && (
            <p className="text-sm text-stone-500">
              Para testar localmente, use{" "}
              <code className="rounded bg-stone-800 px-2 py-1 text-stone-300">
                ?tenant=slug-do-tenant
              </code>
              <br />
              Ex: <code className="rounded bg-stone-800 px-2 py-1 text-stone-300">?tenant=alvaro-sanguinetti</code>
            </p>
          )}
        </div>
      </div>
    );
  }

  return <TenantProvider tenant={tenantWithPath}>{children}</TenantProvider>;
}
