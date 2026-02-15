export const rnd = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const rndIP = () =>
  `${rnd(1,254)}.${rnd(0,255)}.${rnd(0,255)}.${rnd(1,254)}`;

export const ts = () =>
  new Date().toLocaleTimeString("en-US", { hour12: false });

export const ATTACK_POOL = [
  { type: "SQL Injection",     code: "' OR '1'='1; DROP TABLE users--", sev: "critical", color: "#ef4444" },
  { type: "XSS Attack",        code: '<script>document.cookie</script>', sev: "high",     color: "#f97316" },
  { type: "Path Traversal",    code: "../../../etc/passwd",              sev: "high",     color: "#f97316" },
  { type: "Command Injection", code: "| rm -rf / && echo pwned",         sev: "critical", color: "#ef4444" },
  { type: "Rate Limit Breach", code: "130 req/min from same client",     sev: "medium",   color: "#eab308" },
  { type: "Bot / Scraper",     code: "User-Agent: python-requests/2.x", sev: "low",      color: "#3b82f6" },
  { type: "DDoS Burst",        code: "Flood: 4200 req/s from single IP",sev: "critical", color: "#ef4444" },
  { type: "SSRF Probe",        code: "url=http://169.254.169.254/latest",sev: "high",     color: "#f97316" },
  { type: "CSRF Attempt",      code: "forged-token: bypass-csrf-check",  sev: "medium",   color: "#eab308" },
  { type: "Broken Auth",       code: "token=eyJhbGciOiJub25lIn0.fake",  sev: "high",     color: "#f97316" },
];