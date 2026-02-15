import React from "react";
import { Shield, AlertTriangle, TrendingUp, Lock, Settings } from "lucide-react";

const PAGES = ["Dashboard", "Threats", "Analytics", "Rules", "Settings"];
const ICONS = [Shield, AlertTriangle, TrendingUp, Lock, Settings];

export default function Sidebar({ page, setPage, running, setRunning }) {
  return (
    <aside style={{
      width: 220, minHeight: "100vh", flexShrink: 0,
      background: "rgba(15,23,42,0.97)",
      borderRight: "1px solid rgba(59,130,246,0.15)",
      display: "flex", flexDirection: "column", padding: "24px 0",
    }}>
      <div style={{ padding: "0 20px 24px", borderBottom: "1px solid rgba(59,130,246,0.15)", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Shield size={28} color="#3b82f6" />
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#f1f5f9" }}>SmartWAF</div>
            <div style={{ fontSize: 10, color: "#3b82f6" }}>v1.0 • Online</div>
          </div>
        </div>
      </div>

      {PAGES.map((p, i) => {
        const Icon = ICONS[i];
        const active = page === p;
        return (
          <div key={p} onClick={() => setPage(p)} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "12px 20px", cursor: "pointer",
            background: active ? "rgba(59,130,246,0.18)" : "transparent",
            borderLeft: active ? "3px solid #3b82f6" : "3px solid transparent",
            color: active ? "#93c5fd" : "#64748b",
            fontWeight: active ? 600 : 400, fontSize: 14,
            transition: "all .15s",
          }}>
            <Icon size={16} /> {p}
          </div>
        );
      })}

      <div style={{ marginTop: "auto", padding: "20px 16px 0", borderTop: "1px solid rgba(59,130,246,0.1)" }}>
        <button onClick={() => setRunning(r => !r)} style={{
          width: "100%", padding: "11px 0", borderRadius: 10, border: "none",
          background: running ? "#dc2626" : "#16a34a",
          color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer",
          transition: "background .2s",
        }}>
          {running ? "⏸  Stop Simulation" : "▶  Start Simulation"}
        </button>
        <p style={{ fontSize: 11, color: "#475569", textAlign: "center", marginTop: 8 }}>
          {running ? "🟢 Live traffic running" : "Press to start demo"}
        </p>
      </div>
    </aside>
  );
}