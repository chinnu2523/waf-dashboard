import { useState, useEffect, useRef } from "react";
import { rnd, rndIP, ts, ATTACK_POOL } from "../utils/helpers";

export default function useSimulator() {
  const [running, setRunning]   = useState(false);
  const [threats, setThreats]   = useState([]);
  const [logs, setLogs]         = useState([]);
  const [counters, setCounters] = useState({ total: 0, blocked: 0, allowed: 0, latency: 0 });
  const [history, setHistory]   = useState({
    allowed: Array(20).fill(0),
    blocked: Array(20).fill(0),
  });
  const [rules, setRules] = useState([
    { id: 1, name: "Block SQL Injection",  enabled: true,  hits: 0 },
    { id: 2, name: "Block XSS Payloads",   enabled: true,  hits: 0 },
    { id: 3, name: "Rate Limit (100/min)", enabled: true,  hits: 0 },
    { id: 4, name: "Block Path Traversal", enabled: true,  hits: 0 },
    { id: 5, name: "Bot Detection",        enabled: false, hits: 0 },
    { id: 6, name: "Command Injection",    enabled: true,  hits: 0 },
  ]);

  const intervalRef = useRef(null);// Add this inside useSimulator.js at the top of the file
useEffect(() => {
  const interval = setInterval(async () => {
    try {
      const res = await fetch("http://localhost:4000/api/stats");
      const data = await res.json();
      setCounters(prev => ({ ...prev, ...data }));
    } catch (e) {}
  }, 2000);
  return () => clearInterval(interval);
}, []);  const tick = () => {
    const isAttack = Math.random() > 0.62;
    const lat = rnd(4, 28);

    setCounters(p => ({
      total:   p.total + 1,
      blocked: isAttack ? p.blocked + 1 : p.blocked,
      allowed: isAttack ? p.allowed     : p.allowed + 1,
      latency: lat,
    }));

    setHistory(p => ({
      allowed: [...p.allowed.slice(1), isAttack ? 0 : 1],
      blocked: [...p.blocked.slice(1), isAttack ? 1 : 0],
    }));

    if (isAttack) {
      const atk = ATTACK_POOL[rnd(0, ATTACK_POOL.length - 1)];
      const ip  = rndIP();
      const threat = { id: Date.now() + Math.random(), time: ts(), ip, ...atk };
      setThreats(p => [threat, ...p].slice(0, 60));
      setLogs(p => [
        `${ts()}  🛑 BLOCKED  ${atk.type.padEnd(22)} ${ip}`,
        ...p,
      ].slice(0, 80));
      setRules(p => p.map(r =>
        r.name.toLowerCase().includes(atk.type.split(" ")[0].toLowerCase())
          ? { ...r, hits: r.hits + 1 } : r
      ));
    } else {
      setLogs(p => [
        `${ts()}  ✅ ALLOWED  GET /api/data           ${rndIP()}`,
        ...p,
      ].slice(0, 80));
    }
  };

  useEffect(() => {
    if (running) intervalRef.current = setInterval(tick, 700);
    else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  return { running, setRunning, threats, setThreats, logs, counters, history, rules, setRules };
}