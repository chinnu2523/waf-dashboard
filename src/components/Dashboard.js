import React from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const Card = ({ children, color = "#3b82f6", style = {} }) => (
  <div style={{
    background: "rgba(15,23,42,0.85)", border: `1px solid ${color}30`,
    borderRadius: 14, padding: "20px 22px", backdropFilter: "blur(8px)", ...style,
  }}>{children}</div>
);

export default function Dashboard({ counters, history }) {
  const blockRate = counters.total
    ? ((counters.blocked / counters.total) * 100).toFixed(1) : "0.0";

  const chartData = history.allowed.map((v, i) => ({
    name: i, allowed: v, blocked: history.blocked[i],
  }));

  const kpis = [
    { label: "Total Requests",  value: counters.total,   color: "#3b82f6" },
    { label: "Attacks Blocked", value: counters.blocked, color: "#ef4444" },
    { label: "Allowed Traffic", value: counters.allowed, color: "#22c55e" },
    { label: "Block Rate",      value: blockRate + "%",  color: "#a855f7" },
  ];

  const layers = [
    ["SQL Injection","🛡️","#ef4444"], ["XSS Shield","🔒","#f97316"],
    ["Rate Limiter","⏱️","#eab308"],  ["Bot Detector","🤖","#3b82f6"],
    ["DDoS Guard","🌊","#a855f7"],    ["Path Guard","📂","#22c55e"],
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        {kpis.map(({ label, value, color }) => (
          <Card key={label} color={color} style={{ flex: "1 1 160px" }}>
            <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>{label}</p>
            <p style={{ fontSize: 34, fontWeight: 900, color, margin: 0 }}>{value}</p>
          </Card>
        ))}
      </div>

      <Card style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", marginBottom: 14 }}>
          Live Traffic (last 20 ticks)
        </h2>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={chartData}>
            <Tooltip
              contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }}
              labelStyle={{ color: "#94a3b8" }}
            />
            <Line type="monotone" dataKey="allowed" stroke="#22c55e" dot={false} strokeWidth={2.5} name="Allowed" />
            <Line type="monotone" dataKey="blocked" stroke="#ef4444" dot={false} strokeWidth={2.5} name="Blocked" />
          </LineChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
          <span style={{ color: "#22c55e", fontSize: 13 }}>● Allowed</span>
          <span style={{ color: "#ef4444", fontSize: 13 }}>● Blocked</span>
        </div>
      </Card>

      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        <Card color="#a855f7" style={{ flex: 1, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "#94a3b8" }}>Avg Latency</p>
          <p style={{ fontSize: 48, fontWeight: 900, color: counters.latency > 20 ? "#f97316" : "#22c55e", margin: "6px 0" }}>
            {counters.latency}<span style={{ fontSize: 18 }}>ms</span>
          </p>
          <p style={{ fontSize: 12, color: "#64748b" }}>WAF overhead: +{Math.max(2, counters.latency - 5)}ms</p>
        </Card>
      </div>

      <Card>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", marginBottom: 14 }}>
          Active Protection Layers
        </h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {layers.map(([name, icon, color]) => (
            <div key={name} style={{
              flex: "1 1 120px", padding: "14px 10px", borderRadius: 10, textAlign: "center",
              background: color + "11", border: `1px solid ${color}33`,
            }}>
              <div style={{ fontSize: 26, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{name}</div>
              <div style={{ fontSize: 11, color, marginTop: 4 }}>● Active</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}