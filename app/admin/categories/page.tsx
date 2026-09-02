"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  status: string;
  _count?: { products: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    if (data.success) setCategories(data.data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await fetch(`/api/admin/categories/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: "", description: "" });
    setEditId(null);
    setShowForm(false);
    fetchData();
  };

  const handleEdit = (cat: Category) => {
    setForm({ name: cat.name, description: cat.description || "" });
    setEditId(cat.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this category?")) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-gray-900">Categories</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ name: "", description: "" }); }}
          className="inline-flex items-center gap-1.5 bg-primary-700 hover:bg-primary-800 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Name *</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
            <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-primary-700 text-white text-xs font-semibold px-4 py-2 rounded-lg">{editId ? "Update" : "Create"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="text-xs text-gray-500 px-4 py-2">Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <LoadingSpinner size="lg" className="py-20" />
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Slug</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Products</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{cat.name}</td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{cat.slug}</td>
                  <td className="px-4 py-3 text-gray-600">{cat._count?.products ?? 0}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => handleEdit(cat)} className="text-primary-700 hover:text-primary-800"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(cat.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
