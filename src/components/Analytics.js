import React from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ATTACK_POOL } from "../utils/helpers";

export default function Analytics({ counters, history, threats }) {
  const blockRate = counters.total
    ? ((counters.blocked / counters.total) * 100).toFixed(1) : "0.0";

  const trafficData = history.allowed.map((v, i) => ({
    tick: i, Allowed: v, Blocked: history.blocked[i],
  }));

  const typeData = ATTACK_POOL.slice(0, 6).map(a => ({
    name: a.type.split(" ")[0],
    count: threats.filter(t => t.type === a.type).length,
    color: a.color,
  }));

  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 20 }}>Analytics</h1>

      <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ flex: 2, background: "rgba(15,23,42,0.85)", borderRadius: 14, padding: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 12 }}>Request Traffic</h2>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={trafficData}>
              <XAxis dataKey="tick" hide />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "#0f172a", border: "none", borderRadius: 8 }} />
              <Legend />
              <Line type="monotone" dataKey="Allowed" stroke="#22c55e" dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="Blocked" stroke="#ef4444" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1, background: "rgba(15,23,42,0.85)", borderRadius: 14, padding: 20, textAlign: "center" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 12 }}>Block Rate</h2>
          <p style={{ fontSize: 56, fontWeight: 900, color: "#a855f7", margin: "20px 0" }}>{blockRate}%</p>
          <p style={{ color: "#64748b", fontSize: 13 }}>of all requests blocked</p>
        </div>
      </div>

      <div style={{ background: "rgba(15,23,42,0.85)", borderRadius: 14, padding: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", marginBottom: 12 }}>Attacks by Type</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={typeData}>
            <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis hide />
            <Tooltip contentStyle={{ background: "#0f172a", border: "none", borderRadius: 8 }} />
            <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}