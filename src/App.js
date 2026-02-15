import React, { useState } from "react";
import useSimulator from "./hooks/useSimulator";
import Sidebar      from "./components/sidebar";
import Dashboard    from "./components/Dashboard";
import Threats      from "./components/Threats";
import Analytics    from "./components/Analytics";
import RulesPage    from "./components/RulesPage";
import SettingsPage from "./components/SettingsPage";
import LiveLog      from "./components/LiveLog";

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const {
    running, setRunning,
    threats, setThreats,
    logs, counters, history,
    rules, setRules,
  } = useSimulator();

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: "linear-gradient(135deg,#020617 0%,#0f172a 60%,#0c1a2e 100%)",
      color: "#e2e8f0", fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}>
      <Sidebar page={page} setPage={setPage} running={running} setRunning={setRunning} />

      <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: "#f1f5f9", margin: 0 }}>{page}</h1>
            <p style={{ fontSize: 13, color: "#475569", margin: "4px 0 0" }}>
              Smart Web Application Firewall • Real-time Protection
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{
              padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
              background: running ? "#22c55e22" : "#47556922",
              color: running ? "#22c55e" : "#475569",
              border: `1px solid ${running ? "#22c55e44" : "#47556944"}`,
            }}>
              {running ? "● LIVE" : "○ PAUSED"}
            </span>
            <span style={{ fontSize: 13, color: "#475569" }}>
              {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </span>
          </div>
        </div>

        {page === "Dashboard" && <Dashboard counters={counters} history={history} />}
        {page === "Threats"   && <Threats threats={threats} setThreats={setThreats} />}
        {page === "Analytics" && <Analytics counters={counters} history={history} threats={threats} />}
        {page === "Rules"     && <RulesPage rules={rules} setRules={setRules} />}
        {page === "Settings"  && <SettingsPage />}

        {(page === "Dashboard" || page === "Threats") && (
          <LiveLog logs={logs} running={running} />
        )}
      </main>
    </div>
  );
}