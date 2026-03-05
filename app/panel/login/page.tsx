"use client";

import { useState } from "react";
import { Camera, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";

export default function PanelLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/panel/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Credenciais inválidas");
        return;
      }

      window.location.href = "/panel";
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="lg:w-1/2 bg-linear-to-br from-stone-950 to-stone-800 flex flex-col items-center justify-center px-8 py-12 lg:py-0">
        <div className="flex flex-col items-center text-center max-w-sm">
          <div className="mb-6 lg:mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 lg:w-28 lg:h-28 rounded-2xl bg-stone-800/50 border border-stone-700/50 shadow-2xl">
              <Camera className="w-10 h-10 lg:w-14 lg:h-14 text-stone-400" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-white tracking-tight">
            Painel do Fotógrafo
          </h1>
          <p className="mt-2 text-sm lg:text-base text-stone-400">
            Gerencie seu portfólio, perfil e configurações
          </p>
        </div>
      </div>

      <div className="lg:w-1/2 bg-stone-50 flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-xl shadow-lg shadow-stone-200/80 border border-stone-200/80 p-8">
            <h2 className="text-xl font-semibold text-stone-900 mb-6">
              Entrar no painel
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/20 focus:border-stone-400 transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1.5">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/20 focus:border-stone-400 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-100 text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:shadow-stone-900/20 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
