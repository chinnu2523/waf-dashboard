import React from "react";

export default function RulesPage({ rules, setRules }) {
  const toggle = (id) =>
    setRules(p => p.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>Firewall Rules</h1>
        <span style={{ fontSize: 13, color: "#64748b" }}>
          {rules.filter(r => r.enabled).length} / {rules.length} active
        </span>
      </div>

      {rules.map(r => (
        <div key={r.id} style={{
          background: "rgba(15,23,42,0.85)",
          border: `1px solid ${r.enabled ? "#22c55e" : "#475569"}30`,
          borderRadius: 12, padding: "16px 20px", marginBottom: 12,
          display: "flex", alignItems: "center", gap: 16,
        }}>
          <span style={{ fontSize: 20 }}>{r.enabled ? "🔒" : "🔓"}</span>
          <span style={{ flex: 1, fontWeight: 600, color: "#f1f5f9" }}>{r.name}</span>
          <span style={{ color: "#64748b", fontSize: 13 }}>
            Hits: <strong style={{ color: "#f1f5f9" }}>{r.hits}</strong>
          </span>

          <div onClick={() => toggle(r.id)} style={{
            width: 46, height: 26, borderRadius: 13, cursor: "pointer",
            background: r.enabled ? "#22c55e" : "#334155",
            position: "relative", transition: "background .2s",
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: "50%", background: "#fff",
              position: "absolute", top: 3,
              left: r.enabled ? 23 : 3, transition: "left .2s",
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}