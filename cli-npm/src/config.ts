import fs from "node:fs";
import path from "node:path";
import os from "node:os";

export interface CiderConfig {
  apiUrl: string;
  authToken: string | null;
  activeSandbox: string | null;
}

const configDir = path.join(os.homedir(), ".cider");
const configPath = path.join(configDir, "config.json");

export function loadConfig(): CiderConfig {
  const cfg: CiderConfig = {
    apiUrl: "http://localhost:8000",
    authToken: null,
    activeSandbox: null,
  };

  if (process.env.CIDER_API_URL) cfg.apiUrl = process.env.CIDER_API_URL;

  try {
    const data = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    if (!process.env.CIDER_API_URL && data.apiUrl) cfg.apiUrl = data.apiUrl;
    if (data.authToken) cfg.authToken = data.authToken;
    if (data.activeSandbox) cfg.activeSandbox = data.activeSandbox;
  } catch {
    // No config file yet
  }

  return cfg;
}

export function saveConfig(cfg: CiderConfig) {
  fs.mkdirSync(configDir, { recursive: true });
  fs.writeFileSync(configPath, JSON.stringify(cfg, null, 2), { mode: 0o600 });
}
