"use client";

import { useState } from "react";
import { Plus, X, Pencil, Check } from "lucide-react";

function parseCategories(str: string): string[] {
  return (str || "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
}

function joinCategories(arr: string[]): string {
  return arr.join(", ");
}

export default function CategoryTags({
  value,
  onChange,
  placeholder = "Nova categoria",
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [newCat, setNewCat] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const list = parseCategories(value);

  function handleAdd() {
    const trimmed = newCat.trim();
    if (!trimmed) return;
    if (list.includes(trimmed)) {
      setNewCat("");
      return;
    }
    onChange(joinCategories([...list, trimmed]));
    setNewCat("");
  }

  function handleRemove(index: number) {
    const next = list.filter((_, i) => i !== index);
    onChange(joinCategories(next));
  }

  function startEdit(index: number) {
    setEditingIndex(index);
    setEditValue(list[index]);
  }

  function saveEdit() {
    if (editingIndex === null) return;
    const trimmed = editValue.trim();
    if (trimmed) {
      const next = [...list];
      next[editingIndex] = trimmed;
      onChange(joinCategories(next));
    }
    setEditingIndex(null);
    setEditValue("");
  }

  function cancelEdit() {
    setEditingIndex(null);
    setEditValue("");
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {list.map((cat, i) => (
          <div
            key={`${cat}-${i}`}
            className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-sm"
          >
            {editingIndex === i ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit();
                    if (e.key === "Escape") cancelEdit();
                  }}
                  className="w-28 rounded border border-stone-300 px-2 py-0.5 text-sm focus:outline-none focus:ring-1 focus:ring-stone-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={saveEdit}
                  className="rounded p-0.5 text-emerald-600 hover:bg-emerald-50"
                  title="Salvar"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded p-0.5 text-stone-400 hover:bg-stone-200"
                  title="Cancelar"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <>
                <span className="text-stone-800">{cat}</span>
                {!disabled && (
                  <>
                    <button
                      type="button"
                      onClick={() => startEdit(i)}
                      className="rounded p-0.5 text-stone-400 hover:bg-stone-200 hover:text-stone-600"
                      title="Editar"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(i)}
                      className="rounded p-0.5 text-stone-400 hover:bg-red-50 hover:text-red-600"
                      title="Remover"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {!disabled && (
        <div className="flex gap-2">
          <input
            type="text"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
            placeholder={placeholder}
            className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-500"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800"
          >
            <Plus className="h-4 w-4" />
            Adicionar
          </button>
        </div>
      )}
    </div>
  );
}
