"use client";
import { useEffect, useState } from "react";

export default function InquiriesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/mock/inquiries")
      .then((r) => r.json())
      .then((d) => setItems(d || []))
      .catch(() => setItems([]))
      .finally(()=>setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="font-display text-3xl mb-3">Demo Inquiries (mock)</h1>
      {loading && <div className="text-white/50">Loading…</div>}
      {!loading && !items.length && <div className="text-white/60">No inquiries. Click "Seed Demo" on the homepage.</div>}
      <div className="mt-6 space-y-4">
        {items.map((i:any) => (
          <div key={i.id} className="bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-white/60">{new Date(i.created_at).toLocaleString()}</div>
                <div className="font-semibold mt-1">{i.subject}</div>
                <div className="text-xs text-white/60">{i.sender}</div>
              </div>
              <div className="text-xs text-white/60">{i.classification}</div>
            </div>
            <p className="mt-3 text-white/80 whitespace-pre-wrap">{i.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}