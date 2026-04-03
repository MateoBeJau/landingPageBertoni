import { revalidateTag } from "next/cache";

/** Tag compartido por `unstable_cache` del tenant público (landing + detalle). */
export const TENANT_PUBLIC_TAG = "tenant-public";

export function revalidateTenantPublic(): void {
  try {
    revalidateTag(TENANT_PUBLIC_TAG, { expire: 0 });
  } catch {
    /* fuera de request Next (tests / scripts) */
  }
}
