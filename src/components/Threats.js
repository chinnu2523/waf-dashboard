import React from "react";

export default function Threats({ threats, setThreats }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", margin: 0 }}>Threat Feed</h1>
          <p style={{ fontSize: 13, color: "#475569", margin: "4px 0 0" }}>{threats.length} threats detected</p>
        </div>
        <button onClick={() => setThreats([])} style={{
          padding: "8px 18px", background: "#dc2626", color: "#fff",
          border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600,
        }}>Clear All</button>
      </div>

      {threats.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "#475569" }}>
          <p style={{ fontSize: 40 }}>🛡️</p>
          <p>No threats yet — press Start Simulation</p>
        </div>
      ) : threats.map(t => (
        <div key={t.id} style={{
          background: "rgba(15,23,42,0.85)", border: `1px solid ${t.color}30`,
          borderRadius: 10, padding: "14px 18px", marginBottom: 10,
          display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
        }}>
          <span style={{
            padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
            background: t.color + "22", color: t.color, border: `1px solid ${t.color}44`,
          }}>{t.sev.toUpperCase()}</span>

          <strong style={{ minWidth: 150, color: "#f1f5f9" }}>{t.type}</strong>
          <span style={{ color: "#64748b", fontSize: 13, fontFamily: "monospace" }}>{t.ip}</span>

          <code style={{
            flex: 1, fontFamily: "monospace", fontSize: 12, color: t.color,
            background: "#020617", padding: "4px 10px", borderRadius: 6,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>{t.code}</code>

          <span style={{ color: "#475569", fontSize: 12, whiteSpace: "nowrap" }}>{t.time}</span>

          <span style={{
            padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
            background: "#22c55e22", color: "#22c55e",
          }}>BLOCKED</span>
        </div>
      ))}
    </div>
  );
}