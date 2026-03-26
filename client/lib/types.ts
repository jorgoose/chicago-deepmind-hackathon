// --- Sandbox API types ---

export interface SandboxStatus {
  platform: string;
  macos_version: string;
  xcode: string;
  booted_simulators: SimulatorDevice[];
  disk: string;
  project_root: string;
}

export interface SimulatorDevice {
  name: string;
  udid: string;
  runtime?: string;
  state?: string;
}

export interface ExecResult {
  stdout: string;
  stderr: string;
  exit_code: number;
}

export interface FileResult {
  path: string;
  content?: string;
  size?: number;
  error?: string;
}

export interface DirectoryListing {
  path: string;
  entries: DirectoryEntry[];
  error?: string;
}

export interface DirectoryEntry {
  path: string;
  type: "file" | "directory";
  size: number | null;
}

export interface ProjectResult {
  path: string;
  name: string;
  error?: string;
}

// --- WebSocket types ---

export interface WsExecMessage {
  command: string;
  cwd?: string;
}

export interface WsExecChunk {
  type: "stdout" | "stderr" | "exit" | "error";
  data?: string;
  code?: number;
}
