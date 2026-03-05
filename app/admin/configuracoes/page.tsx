"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  Key,
  UserPlus,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  X,
} from "lucide-react";

const inputClass =
  "w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent";

function Toast({
  type,
  message,
  onDismiss,
}: {
  type: "success" | "error";
  message: string;
  onDismiss: () => void;
}) {
  const Icon = type === "success" ? CheckCircle : XCircle;
  return (
    <div
      className={`fixed right-4 top-4 z-50 flex items-center gap-3 rounded-xl border p-4 shadow-xl ${
        type === "success"
          ? "border-emerald-200 bg-white"
          : "border-red-200 bg-white"
      }`}
    >
      <Icon
        className={`h-5 w-5 shrink-0 ${
          type === "success" ? "text-emerald-600" : "text-red-600"
        }`}
      />
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onDismiss} className="rounded p-1 hover:bg-stone-100">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function AdminConfiguracoesPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [admins, setAdmins] = useState<Array<{ id: string; name: string; email: string; createdAt: string }>>([]);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [passForm, setPassForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [savingPass, setSavingPass] = useState(false);

  const [adminForm, setAdminForm] = useState({ name: "", email: "", password: "" });
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [savingAdmin, setSavingAdmin] = useState(false);

  useEffect(() => {
    async function init() {
      const authRes = await fetch("/api/admin/auth");
      if (!authRes.ok) {
        window.location.href = "/admin/login";
        return;
      }
      setAuthChecked(true);

      const adminsRes = await fetch("/api/admin/admins");
      if (adminsRes.ok) {
        const data = await adminsRes.json();
        setAdmins(data.admins ?? []);
      }
    }
    init();
  }, []);

  async function handleChangePassword() {
    if (passForm.newPassword !== passForm.confirmPassword) {
      setToast({ type: "error", message: "As senhas não coincidem" });
      return;
    }
    setSavingPass(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passForm.currentPassword,
          newPassword: passForm.newPassword,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setToast({ type: "error", message: data.error || "Erro ao alterar senha" });
        return;
      }
      setToast({ type: "success", message: "Senha alterada com sucesso!" });
      setPassForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      setToast({ type: "error", message: "Erro de conexão" });
    } finally {
      setSavingPass(false);
    }
  }

  async function handleCreateAdmin() {
    if (!adminForm.name || !adminForm.email || !adminForm.password) {
      setToast({ type: "error", message: "Preencha todos os campos" });
      return;
    }
    if (adminForm.password.length < 6) {
      setToast({ type: "error", message: "A senha deve ter pelo menos 6 caracteres" });
      return;
    }
    setSavingAdmin(true);
    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminForm),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setToast({ type: "error", message: data.error || "Erro ao criar admin" });
        return;
      }
      setToast({ type: "success", message: "Admin criado com sucesso!" });
      setAdmins((prev) => [data.admin, ...prev]);
      setAdminForm({ name: "", email: "", password: "" });
      setShowAdminForm(false);
    } catch {
      setToast({ type: "error", message: "Erro de conexão" });
    } finally {
      setSavingAdmin(false);
    }
  }

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600" />
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-stone-900">Configurações</h1>
        <p className="mt-1 text-sm text-stone-500">
          Gerenciar admins e alterar senha
        </p>

        <div className="mt-8 space-y-8">
          {/* Alterar senha */}
          <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-stone-200 bg-stone-50 px-5 py-4">
              <Key className="h-4 w-4 text-stone-600" />
              <h2 className="text-sm font-semibold text-stone-800">
                Alterar minha senha
              </h2>
            </div>
            <div className="space-y-4 p-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">
                  Senha atual
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={passForm.currentPassword}
                    onChange={(e) =>
                      setPassForm({ ...passForm, currentPassword: e.target.value })
                    }
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                  >
                    {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">
                  Nova senha
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={passForm.newPassword}
                    onChange={(e) =>
                      setPassForm({ ...passForm, newPassword: e.target.value })
                    }
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                  >
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-stone-500">Mínimo 6 caracteres</p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">
                  Confirmar nova senha
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={passForm.confirmPassword}
                    onChange={(e) =>
                      setPassForm({ ...passForm, confirmPassword: e.target.value })
                    }
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button
                onClick={handleChangePassword}
                disabled={savingPass}
                className="rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-800 disabled:opacity-60"
              >
                {savingPass ? "Alterando..." : "Alterar senha"}
              </button>
            </div>
          </div>

          {/* Admins */}
          <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-5 py-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-stone-600" />
                <h2 className="text-sm font-semibold text-stone-800">
                  Administradores
                </h2>
                <span className="text-xs text-stone-500">({admins.length})</span>
              </div>
              <button
                onClick={() => setShowAdminForm(!showAdminForm)}
                className="flex items-center gap-2 rounded-lg bg-stone-900 px-3 py-2 text-sm font-medium text-white hover:bg-stone-800"
              >
                <UserPlus className="h-4 w-4" />
                Novo Admin
              </button>
            </div>

            {showAdminForm && (
              <div className="border-b border-stone-200 bg-amber-50/50 px-5 py-4">
                <h3 className="mb-3 text-sm font-semibold text-stone-800">
                  Criar novo administrador
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-stone-600">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={adminForm.name}
                      onChange={(e) =>
                        setAdminForm({ ...adminForm, name: e.target.value })
                      }
                      className={inputClass}
                      placeholder="Nome do admin"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-stone-600">
                      Email
                    </label>
                    <input
                      type="email"
                      value={adminForm.email}
                      onChange={(e) =>
                        setAdminForm({ ...adminForm, email: e.target.value })
                      }
                      className={inputClass}
                      placeholder="admin@email.com"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-stone-600">
                      Senha inicial
                    </label>
                    <input
                      type="text"
                      value={adminForm.password}
                      onChange={(e) =>
                        setAdminForm({ ...adminForm, password: e.target.value })
                      }
                      className={inputClass}
                      placeholder="Mínimo 6 caracteres"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateAdmin}
                      disabled={savingAdmin}
                      className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800 disabled:opacity-60"
                    >
                      {savingAdmin ? "Criando..." : "Criar"}
                    </button>
                    <button
                      onClick={() => {
                        setShowAdminForm(false);
                        setAdminForm({ name: "", email: "", password: "" });
                      }}
                      className="rounded-lg bg-stone-200 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-300"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="divide-y divide-stone-100">
              {admins.map((admin) => (
                <div
                  key={admin.id}
                  className="flex items-center justify-between px-5 py-3"
                >
                  <div>
                    <p className="font-medium text-stone-900">{admin.name}</p>
                    <p className="text-sm text-stone-500">{admin.email}</p>
                  </div>
                  <span className="text-xs text-stone-400">
                    {new Date(admin.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
