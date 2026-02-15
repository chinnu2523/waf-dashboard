import React, { useRef } from "react";

export default function LiveLog({ logs, running }) {
  const bottomRef = useRef(null);

  return (
    <div style={{ background: "rgba(15,23,42,0.85)", borderRadius: 14, padding: 20, marginTop: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9" }}>📟 Live Log</span>
        <span style={{ fontSize: 12, color: "#64748b" }}>({logs.length} entries)</span>
        <span style={{
          marginLeft: "auto", width: 9, height: 9, borderRadius: "50%",
          background: running ? "#22c55e" : "#475569",
          display: "inline-block",
          boxShadow: running ? "0 0 6px #22c55e" : "none",
        }} />
      </div>

      <div style={{
        background: "#020617", borderRadius: 8, padding: "12px 14px",
        height: 170, overflowY: "auto",
        fontFamily: "'Courier New', monospace", fontSize: 12,
      }}>
        {logs.length === 0 ? (
          <span style={{ color: "#475569" }}>Waiting for traffic… press Start Simulation</span>
        ) : logs.map((line, i) => (
          <div key={i} style={{
            color: line.includes("BLOCKED") ? "#f87171" : "#4ade80",
            marginBottom: 3, whiteSpace: "nowrap",
          }}>{line}</div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}