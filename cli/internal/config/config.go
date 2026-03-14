package config

import (
	"encoding/json"
	"os"
	"path/filepath"
	"strings"
)

type Config struct {
	APIUrl       string `json:"api_url"`
	GeminiAPIKey string `json:"gemini_api_key,omitempty"`
	AuthToken    string `json:"auth_token,omitempty"`
	ActiveSandbox string `json:"active_sandbox,omitempty"`
}

func configDir() string {
	home, _ := os.UserHomeDir()
	return filepath.Join(home, ".cider")
}

func configPath() string {
	return filepath.Join(configDir(), "config.json")
}

func Load() *Config {
	cfg := &Config{
		APIUrl: "http://localhost:8000",
	}

	// Env overrides
	if u := os.Getenv("CIDER_API_URL"); u != "" {
		cfg.APIUrl = u
	}
	if k := os.Getenv("GEMINI_API_KEY"); k != "" {
		cfg.GeminiAPIKey = k
	}

	data, err := os.ReadFile(configPath())
	if err == nil {
		var fileCfg Config
		if err := json.Unmarshal(data, &fileCfg); err == nil {
			// File values, env takes precedence
			if cfg.APIUrl == "http://localhost:8000" && fileCfg.APIUrl != "" {
				cfg.APIUrl = fileCfg.APIUrl
			}
			if cfg.GeminiAPIKey == "" {
				cfg.GeminiAPIKey = fileCfg.GeminiAPIKey
			}
			cfg.AuthToken = fileCfg.AuthToken
			cfg.ActiveSandbox = fileCfg.ActiveSandbox
		}
	}

	// Strip trailing slash to avoid double-slash in API paths
	cfg.APIUrl = strings.TrimRight(cfg.APIUrl, "/")

	return cfg
}

func (c *Config) Save() error {
	os.MkdirAll(configDir(), 0o755)
	data, err := json.MarshalIndent(c, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(configPath(), data, 0o600)
}
