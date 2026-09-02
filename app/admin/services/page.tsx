"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Service {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: string | null;
  status: string;
  sortOrder: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", sortOrder: 0 });

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/services");
    const data = await res.json();
    if (data.success) setServices(data.data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: any = { name: form.name, description: form.description || undefined, sortOrder: form.sortOrder };
    if (form.price) body.price = parseFloat(form.price);

    if (editId) {
      await fetch(`/api/admin/services/${editId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    } else {
      await fetch("/api/admin/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    }
    setForm({ name: "", description: "", price: "", sortOrder: 0 });
    setEditId(null);
    setShowForm(false);
    fetchData();
  };

  const handleEdit = (svc: Service) => {
    setForm({ name: svc.name, description: svc.description || "", price: svc.price || "", sortOrder: svc.sortOrder });
    setEditId(svc.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-gray-900">Services</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ name: "", description: "", price: "", sortOrder: 0 }); }}
          className="inline-flex items-center gap-1.5 bg-primary-700 hover:bg-primary-800 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Name *</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Price (₹)</label>
              <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
            <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Sort Order</label>
            <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} className="w-32 px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-primary-700 text-white text-xs font-semibold px-4 py-2 rounded-lg">{editId ? "Update" : "Create"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="text-xs text-gray-500 px-4 py-2">Cancel</button>
          </div>
        </form>
      )}

      {loading ? <LoadingSpinner size="lg" className="py-20" /> : (
        <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">#</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Price</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((svc) => (
                <tr key={svc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{svc.sortOrder}</td>
                  <td className="px-4 py-3 font-medium">{svc.name}</td>
                  <td className="px-4 py-3 text-gray-600">{svc.price ? `₹${svc.price}` : "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${svc.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {svc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => handleEdit(svc)} className="text-primary-700 hover:text-primary-800"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(svc.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
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
