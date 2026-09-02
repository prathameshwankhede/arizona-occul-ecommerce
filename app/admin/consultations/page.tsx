"use client";

import { useState, useEffect } from "react";
import { formatDate, getConsultationStatusColor } from "@/lib/utils/format";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Consultation {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  message: string | null;
  status: string;
  createdAt: string;
  user: { id: number; name: string; email: string } | null;
  service: { id: number; name: string } | null;
}

const STATUSES = ["", "NEW", "CONTACTED", "CONFIRMED", "COMPLETED", "CANCELLED"];

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    const res = await fetch(`/api/admin/consultations?${params.toString()}`);
    const data = await res.json();
    if (data.success) setConsultations(data.data.data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [statusFilter]);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/admin/consultations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-gray-900">Consultations</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
        >
          <option value="">All Statuses</option>
          {STATUSES.filter(Boolean).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <LoadingSpinner size="lg" className="py-20" />
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Phone</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Service</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Pref. Date</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {consultations.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium">{c.name}</div>
                    {c.email && <div className="text-xs text-gray-400">{c.email}</div>}
                  </td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3 text-gray-600">{c.service?.name || "General"}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {c.preferredDate ? formatDate(c.preferredDate) : "—"}
                    {c.preferredTime && <div className="text-xs">{c.preferredTime}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getConsultationStatusColor(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={c.status}
                      onChange={(e) => updateStatus(c.id, e.target.value)}
                      className="text-xs px-2 py-1 rounded border border-gray-200 bg-white"
                    >
                      {STATUSES.filter(Boolean).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
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
