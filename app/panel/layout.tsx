"use client";

import PanelSidebar from "@/components/panel/PanelSidebar";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Tenant = {
  id: string;
  slug: string;
  domain: string | null;
  name: string;
  subtitle: string;
  whatsappNumber: string;
  email: string | null;
  maxPhotos: number;
  colorPrimary: string;
  colorAccent: string;
  colorCta: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroImage: string;
  aboutTitle: string | null;
  aboutText1: string | null;
  aboutText2: string | null;
  aboutText3: string | null;
  aboutImage: string | null;
  contactTitle: string;
  contactText: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
  categories: string;
  instagramUrl: string | null;
  facebookUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  active: boolean;
  photos: Array<{
    id: string;
    title: string;
    slug: string;
    location: string;
    year: number;
    description: string | null;
    category: string | null;
    imageSrc: string;
    imageThumb: string;
    price: string | null;
    format: string | null;
    printType: string | null;
    order: number;
  }>;
};

type PanelCtx = {
  tenant: Tenant | null;
  userName: string;
  loading: boolean;
  reload: () => Promise<void>;
  showToast: (type: "success" | "error", message: string) => void;
  toast: { type: "success" | "error"; message: string } | null;
  clearToast: () => void;
  handleUpload: (file: File) => Promise<string | null>;
  handleSave: (data: Record<string, unknown>) => Promise<boolean>;
};

const PanelContext = createContext<PanelCtx>({
  tenant: null,
  userName: "",
  loading: true,
  reload: async () => {},
  showToast: () => {},
  toast: null,
  clearToast: () => {},
  handleUpload: async () => null,
  handleSave: async () => false,
});

export function usePanelContext() {
  return useContext(PanelContext);
}

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/panel/login";
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 4000);
    },
    []
  );

  const clearToast = useCallback(() => setToast(null), []);

  const reload = useCallback(async () => {
    const res = await fetch("/api/panel/profile");
    if (!res.ok) return;
    const data = await res.json();
    setTenant(data.tenant as Tenant);
  }, []);

  const handleUpload = useCallback(async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/panel/upload", { method: "POST", body: fd });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url ?? null;
  }, []);

  const handleSave = useCallback(
    async (data: Record<string, unknown>): Promise<boolean> => {
      try {
        const res = await fetch("/api/panel/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          showToast("error", json.error || "Erro ao salvar");
          return false;
        }
        showToast("success", "Salvo com sucesso!");
        setTenant(json.tenant);
        return true;
      } catch {
        showToast("error", "Erro de conexão");
        return false;
      }
    },
    [showToast]
  );

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }
    async function init() {
      const authRes = await fetch("/api/panel/auth");
      if (!authRes.ok) {
        window.location.href = "/panel/login";
        return;
      }
      const authData = await authRes.json();
      setUserName(authData.user?.name ?? "");

      const res = await fetch("/api/panel/profile");
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setTenant(data.tenant as Tenant);
      setLoading(false);
    }
    init();
  }, [isLoginPage]);

  if (isLoginPage) {
    return <div className="min-h-screen bg-stone-100">{children}</div>;
  }

  return (
    <PanelContext.Provider
      value={{
        tenant,
        userName,
        loading,
        reload,
        showToast,
        toast,
        clearToast,
        handleUpload,
        handleSave,
      }}
    >
      <div className="min-h-screen bg-stone-100">
        <PanelSidebar
          tenantName={tenant?.name}
          tenantDomain={tenant?.domain}
        />
        <div className="lg:pl-60">{children}</div>
      </div>

      {/* Toast */}
      {toast && <ToastGlobal type={toast.type} message={toast.message} onDismiss={clearToast} />}
    </PanelContext.Provider>
  );
}

function ToastGlobal({
  type,
  message,
  onDismiss,
}: {
  type: "success" | "error";
  message: string;
  onDismiss: () => void;
}) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const duration = 4000;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onDismiss();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [onDismiss]);

  return (
    <div
      className={`fixed right-4 top-4 z-[60] flex min-w-[320px] max-w-md items-start gap-3 rounded-xl border p-4 shadow-xl ${
        type === "success"
          ? "border-emerald-200 bg-white"
          : "border-red-200 bg-white"
      }`}
    >
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${
            type === "success" ? "text-emerald-900" : "text-red-900"
          }`}
        >
          {message}
        </p>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-stone-100">
          <div
            className={`h-full transition-all duration-75 ${
              type === "success" ? "bg-emerald-500" : "bg-red-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
