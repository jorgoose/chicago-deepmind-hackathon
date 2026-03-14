package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

type Client struct {
	BaseURL    string
	HTTPClient *http.Client
}

func New(baseURL string) *Client {
	return &Client{
		BaseURL: baseURL,
		HTTPClient: &http.Client{
			Timeout: 120 * time.Second,
		},
	}
}

// --- Response types ---

type SandboxStatus struct {
	Platform         string      `json:"platform"`
	MacOSVersion     string      `json:"macos_version"`
	Xcode            string      `json:"xcode"`
	BootedSimulators []Simulator `json:"booted_simulators"`
	Disk             string      `json:"disk"`
	ProjectRoot      string      `json:"project_root"`
}

type Simulator struct {
	Name    string `json:"name"`
	UDID    string `json:"udid"`
	Runtime string `json:"runtime,omitempty"`
}

type ExecResult struct {
	Stdout   string `json:"stdout"`
	Stderr   string `json:"stderr"`
	ExitCode int    `json:"exit_code"`
}

type FileResult struct {
	Path    string `json:"path"`
	Content string `json:"content,omitempty"`
	Size    int    `json:"size,omitempty"`
	Error   string `json:"error,omitempty"`
}

type DirListing struct {
	Path    string     `json:"path"`
	Entries []DirEntry `json:"entries"`
	Error   string     `json:"error,omitempty"`
}

type DirEntry struct {
	Path string `json:"path"`
	Type string `json:"type"`
	Size *int   `json:"size"`
}

type ProjectResult struct {
	Path  string `json:"path"`
	Name  string `json:"name"`
	Error string `json:"error,omitempty"`
}

// --- API methods ---

func (c *Client) Status() (*SandboxStatus, error) {
	var s SandboxStatus
	return &s, c.get("/status", &s)
}

func (c *Client) Exec(command string, cwd string) (*ExecResult, error) {
	body := map[string]string{"command": command}
	if cwd != "" {
		body["cwd"] = cwd
	}
	var r ExecResult
	return &r, c.post("/exec", body, &r)
}

func (c *Client) WriteFile(path, content string) (*FileResult, error) {
	var r FileResult
	return &r, c.post("/files/write", map[string]string{"path": path, "content": content}, &r)
}

func (c *Client) ReadFile(path string) (*FileResult, error) {
	var r FileResult
	return &r, c.post("/files/read", map[string]string{"path": path}, &r)
}

func (c *Client) ListFiles(path string, recursive bool) (*DirListing, error) {
	var r DirListing
	return &r, c.post("/files/list", map[string]any{"path": path, "recursive": recursive}, &r)
}

func (c *Client) CreateProject(name string) (*ProjectResult, error) {
	var r ProjectResult
	return &r, c.post("/project/create", map[string]string{"name": name}, &r)
}

func (c *Client) BootSimulator(device string) (map[string]any, error) {
	body := map[string]any{}
	if device != "" {
		body["device_name"] = device
	}
	var r map[string]any
	return r, c.post("/simulator/boot", body, &r)
}

func (c *Client) Screenshot() ([]byte, error) {
	resp, err := c.HTTPClient.Get(c.BaseURL + "/screenshot")
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	return io.ReadAll(resp.Body)
}

// --- HTTP helpers ---

func (c *Client) get(endpoint string, out any) error {
	resp, err := c.HTTPClient.Get(c.BaseURL + endpoint)
	if err != nil {
		return fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("HTTP %d: %s", resp.StatusCode, string(body))
	}

	return json.NewDecoder(resp.Body).Decode(out)
}

func (c *Client) post(endpoint string, body any, out any) error {
	data, err := json.Marshal(body)
	if err != nil {
		return err
	}

	resp, err := c.HTTPClient.Post(c.BaseURL+endpoint, "application/json", bytes.NewReader(data))
	if err != nil {
		return fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		respBody, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("HTTP %d: %s", resp.StatusCode, string(respBody))
	}

	return json.NewDecoder(resp.Body).Decode(out)
}
