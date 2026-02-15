import React from "react";

export default function SettingsPage() {
  const configs = [
    { label: "Rate Limit Threshold", value: "100 req/min",       color: "#3b82f6" },
    { label: "Block Duration",        value: "10 minutes",        color: "#a855f7" },
    { label: "Log Retention",         value: "30 days",           color: "#22c55e" },
    { label: "Alert Email",           value: "admin@yourapp.com", color: "#f97316" },
    { label: "Max Payload Size",      value: "10 MB",             color: "#eab308" },
  ];

  const modes = ["Monitor Only", "Detection Mode", "Prevention Mode"];

  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 20 }}>Settings</h1>

      {configs.map(c => (
        <div key={c.label} style={{
          background: "rgba(15,23,42,0.85)", border: `1px solid ${c.color}30`,
          borderRadius: 12, padding: "16px 20px", marginBottom: 12,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontWeight: 600, color: "#f1f5f9" }}>{c.label}</span>
          <span style={{
            color: c.color, background: c.color + "18",
            padding: "5px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700,
          }}>{c.value}</span>
        </div>
      ))}

      <div style={{ background: "rgba(15,23,42,0.85)", borderRadius: 12, padding: "20px 22px", marginTop: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 14 }}>WAF Mode</h2>
        <div style={{ display: "flex", gap: 12 }}>
          {modes.map((m, i) => (
            <div key={m} style={{
              flex: 1, padding: "14px 10px", borderRadius: 10,
              textAlign: "center", cursor: "pointer",
              background: i === 2 ? "#22c55e1a" : "rgba(255,255,255,.03)",
              border: i === 2 ? "1px solid #22c55e55" : "1px solid #1e293b",
              color: i === 2 ? "#22c55e" : "#64748b",
              fontWeight: i === 2 ? 700 : 400, fontSize: 13,
            }}>{m}{i === 2 ? " ✓" : ""}</div>
          ))}
        </div>
      </div>
    </div>
  );
}