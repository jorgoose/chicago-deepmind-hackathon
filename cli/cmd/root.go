package cmd

import (
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"runtime"
	"strings"

	"github.com/Bardemic/Cider/cli/internal/agent"
	"github.com/Bardemic/Cider/cli/internal/api"
	"github.com/Bardemic/Cider/cli/internal/config"
	"github.com/Bardemic/Cider/cli/internal/ui"
)

func Execute() {
	if len(os.Args) < 2 {
		printUsage()
		return
	}

	cfg := config.Load()
	cmd := os.Args[1]

	switch cmd {
	case "create":
		cmdCreate(cfg)
	case "login":
		cmdLogin(cfg)
	case "google":
		// cider google login
		if len(os.Args) >= 3 && os.Args[2] == "login" {
			cmdGoogleLogin(cfg)
		} else {
			printUsage()
		}
	case "status":
		cmdStatus(cfg)
	case "help", "--help", "-h":
		printUsage()
	case "version", "--version", "-v":
		fmt.Println("cider v0.1.0")
	default:
		// Treat as sandbox ID: cider <ID> --emulator ios | --google
		cmdSandboxAction(cfg, cmd)
	}
}

func cmdCreate(cfg *config.Config) {
	var repo string
	for i, arg := range os.Args[2:] {
		if arg == "--repo" && i+3 < len(os.Args) {
			repo = os.Args[i+3]
		}
	}

	client := api.New(cfg.APIUrl)

	fmt.Print("  Creating sandbox...")
	status, err := client.Status()
	if err != nil {
		ui.Fatal(fmt.Sprintf("Cannot reach sandbox at %s: %s", cfg.APIUrl, err))
	}
	ui.ClearLine()
	ui.Done("Connected to sandbox")

	if repo != "" {
		ui.KeyValue("Cloning", repo)
		result, err := client.Exec(fmt.Sprintf("git clone %s project", repo), "")
		if err != nil {
			ui.Fatal(fmt.Sprintf("git clone failed: %s", err))
		}
		if result.ExitCode != 0 {
			ui.Fatal(fmt.Sprintf("git clone failed: %s", result.Stderr))
		}
		ui.Done("Repo cloned")
	}

	// Generate a short ID
	sandboxID := fmt.Sprintf("sbx-%s", randomID(6))
	cfg.ActiveSandbox = sandboxID
	cfg.Save()

	fmt.Println()
	ui.KeyValue("ID", ui.Brand(sandboxID))
	ui.KeyValue("macOS", status.MacOSVersion)
	ui.KeyValue("Xcode", strings.Split(status.Xcode, "\n")[0])
	ui.KeyValue("Project root", status.ProjectRoot)

	sims := make([]string, len(status.BootedSimulators))
	for i, s := range status.BootedSimulators {
		sims[i] = s.Name
	}
	if len(sims) > 0 {
		ui.KeyValue("Simulators", strings.Join(sims, ", "))
	} else {
		ui.KeyValue("Simulators", ui.Dimmed("none booted"))
	}

	fmt.Println()
	fmt.Printf("  %s\n", ui.Dimmed("Next steps:"))
	fmt.Printf("  %s\n", ui.Dimmed(fmt.Sprintf("  cider %s --emulator ios    # open iOS simulator", sandboxID)))
	fmt.Printf("  %s\n", ui.Dimmed(fmt.Sprintf("  cider %s --google          # start Gemini agent", sandboxID)))
	fmt.Println()
}

func cmdLogin(cfg *config.Config) {
	dashboardURL := os.Getenv("CIDER_DASHBOARD_URL")
	if dashboardURL == "" {
		dashboardURL = "http://localhost:3000"
	}
	loginURL := dashboardURL + "/login"

	fmt.Println()
	fmt.Printf("  Opening %s...\n\n", ui.Brand(loginURL))

	var openCmd *exec.Cmd
	switch runtime.GOOS {
	case "darwin":
		openCmd = exec.Command("open", loginURL)
	case "windows":
		openCmd = exec.Command("rundll32", "url.dll,FileProtocolHandler", loginURL)
	default:
		openCmd = exec.Command("xdg-open", loginURL)
	}

	if err := openCmd.Start(); err != nil {
		fmt.Printf("  %s Visit manually: %s\n\n", ui.Dimmed("Could not open browser."), loginURL)
	} else {
		ui.Done("Browser opened. Complete login there, then return here.")
	}
	fmt.Println()
}

func cmdGoogleLogin(cfg *config.Config) {
	fmt.Println()
	fmt.Printf("  %s%sGemini API Authentication%s\n\n", ui.Orange, ui.Bold, ui.Reset)
	fmt.Printf("  %s\n\n", ui.Dimmed("Get your API key at: https://aistudio.google.com/apikey"))

	reader := bufio.NewReader(os.Stdin)
	fmt.Print("  Enter your Gemini API key: ")
	key, _ := reader.ReadString('\n')
	key = strings.TrimSpace(key)

	if key == "" {
		ui.Fatal("No key provided.")
	}

	fmt.Print("  Validating...")

	// Quick validation — list models
	resp, err := api.New("https://generativelanguage.googleapis.com/v1beta").HTTPClient.Get(
		fmt.Sprintf("https://generativelanguage.googleapis.com/v1beta/models?key=%s", key),
	)
	if err != nil || resp.StatusCode != 200 {
		ui.ClearLine()
		ui.Fatal("Invalid API key. Check your key and try again.")
	}
	resp.Body.Close()

	cfg.GeminiAPIKey = key
	if err := cfg.Save(); err != nil {
		ui.Fatal(fmt.Sprintf("Failed to save config: %s", err))
	}

	ui.ClearLine()
	ui.Done("API key saved")
	fmt.Printf("  %s\n\n", ui.Dimmed("Stored in ~/.cider/config.json"))
}

func cmdStatus(cfg *config.Config) {
	client := api.New(cfg.APIUrl)
	status, err := client.Status()
	if err != nil {
		ui.Fatal(fmt.Sprintf("Cannot reach sandbox at %s: %s", cfg.APIUrl, err))
	}

	ui.Banner()
	ui.KeyValue("Sandbox", cfg.APIUrl)
	ui.KeyValue("macOS", status.MacOSVersion)
	ui.KeyValue("Xcode", strings.Split(status.Xcode, "\n")[0])
	ui.KeyValue("Disk", status.Disk)

	if len(status.BootedSimulators) > 0 {
		for _, s := range status.BootedSimulators {
			ui.KeyValue("Simulator", fmt.Sprintf("%s (%s)", s.Name, s.UDID[:8]))
		}
	} else {
		ui.KeyValue("Simulators", ui.Dimmed("none booted"))
	}

	if cfg.GeminiAPIKey != "" {
		ui.KeyValue("Gemini", ui.Success("configured"))
	} else {
		ui.KeyValue("Gemini", ui.Dimmed("not configured — run: cider google login"))
	}
	fmt.Println()
}

func cmdSandboxAction(cfg *config.Config, id string) {
	if len(os.Args) < 3 {
		fmt.Printf("  %s\n\n", ui.Dimmed("Usage: cider <ID> --emulator ios | --google"))
		return
	}

	client := api.New(cfg.APIUrl)
	flag := os.Args[2]

	switch flag {
	case "--emulator":
		device := "iPhone 16"
		if len(os.Args) >= 4 && os.Args[3] != "" {
			// "ios" is the default, but accept a device name
			if os.Args[3] != "ios" {
				device = os.Args[3]
			}
		}

		fmt.Printf("  Booting %s...\n", device)
		result, err := client.BootSimulator(device)
		if err != nil {
			ui.Fatal(fmt.Sprintf("Failed to boot simulator: %s", err))
		}

		status, _ := result["status"].(string)
		if status == "already_booted" {
			ui.Done(fmt.Sprintf("%s already running", device))
		} else {
			ui.Done(fmt.Sprintf("%s booted", device))
		}
		fmt.Println()

	case "--google":
		geminiKey := cfg.GeminiAPIKey
		if geminiKey == "" {
			ui.Fatal("Gemini not configured. Run: cider google login")
		}

		ui.Banner()
		fmt.Printf("  %s\n", ui.Dimmed("Type your prompt. The agent will build your iOS app."))
		fmt.Printf("  %s\n\n", ui.Dimmed("Type 'exit' to quit."))

		reader := bufio.NewReader(os.Stdin)
		for {
			fmt.Printf("  %s> %s", ui.Orange, ui.Reset)
			prompt, _ := reader.ReadString('\n')
			prompt = strings.TrimSpace(prompt)

			if prompt == "" {
				continue
			}
			if prompt == "exit" || prompt == "quit" {
				fmt.Println()
				return
			}

			a := agent.New(geminiKey, client)
			if err := a.Run(prompt); err != nil {
				fmt.Printf("\n  %s %s\n\n", ui.Error("✗"), err)
			} else {
				fmt.Printf("\n  %s\n\n", ui.Success("✓ Agent finished"))
			}
		}

	default:
		fmt.Printf("  Unknown flag: %s\n", flag)
		fmt.Printf("  %s\n\n", ui.Dimmed("Usage: cider <ID> --emulator ios | --google"))
	}
}

func printUsage() {
	ui.Banner()
	fmt.Println("  " + ui.Bold + "Usage:" + ui.Reset)
	fmt.Println()
	fmt.Println("    cider create                     Create a new sandbox")
	fmt.Println("    cider create --repo <url>         Create sandbox with repo cloned")
	fmt.Println("    cider status                     Check sandbox connection & info")
	fmt.Println("    cider login                      Open dashboard login in browser")
	fmt.Println("    cider google login               Authenticate with Gemini API key")
	fmt.Println("    cider <ID> --emulator ios         Boot iOS simulator")
	fmt.Println("    cider <ID> --google               Start Gemini agent CLI")
	fmt.Println()
}

func randomID(n int) string {
	const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
	b := make([]byte, n)
	f, _ := os.Open("/dev/urandom")
	if f != nil {
		f.Read(b)
		f.Close()
	}
	for i := range b {
		b[i] = chars[int(b[i])%len(chars)]
	}
	return string(b)
}
