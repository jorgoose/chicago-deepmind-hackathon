import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";
import SiteHeader from "@/components/SiteHeader";
import CiderIcon from "@/components/CiderIcon";

const commands = [
  "cider create",
  'cider create --repo "url"',
  "cider gemini auth",
  "cider login",
  "cider google login",
  "cider [ID] --emulator ios",
  "cider [ID] --google",
];

const sections = [
  {
    title: "Create",
    copy: "Start a sandbox with `cider create`, or seed it from a repo and return a clean sandbox ID.",
  },
  {
    title: "Authenticate",
    copy: "Open the browser only when the CLI needs approval, then get back out of the way.",
  },
  {
    title: "Operate",
    copy: "Use the dashboard for status, build output, tool activity, and the simulator view.",
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <SiteHeader current="home" />

      <section className="mt-16 grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(420px,470px)]">
        <div>
          <div className="flex items-center gap-3">
            <CiderIcon size={28} />
            <span className="eyebrow">Brew iOS apps in the cloud</span>
          </div>
          <h1 className="hero-title mt-6 max-w-3xl">Build iOS apps from any machine.</h1>
          <p className="body-copy mt-6 max-w-xl text-lg">
            Cider only needs three browser surfaces: a sharp landing page, a quiet auth
            flow for the CLI, and a dashboard that shows what the sandbox is doing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/login" className="button-primary">
              Open login surface
            </Link>
            <Link href="/dashboard" className="button-secondary">
              View dashboard
            </Link>
          </div>

          <div className="mt-12 max-w-xl border-t border-[var(--border)] pt-6">
            <div className="data-label">CLI flow</div>
            <ul className="mt-4 space-y-3">
              {commands.map((command) => (
                <li key={command} className="flex items-start gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span className="mono-inline">{command}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <PlaceholderImage
          index="01"
          title="Primary product image"
          copy="Replace this with the hero product visual or a clean screenshot from the browser dashboard."
        />
      </section>

      <section className="mt-24 grid items-start gap-14 border-t border-[var(--border)] pt-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(420px,1.2fr)]">
        <div>
          <div className="data-label">How it works</div>
          <h2 className="section-title mt-4 max-w-lg">
            Create, authenticate, and monitor without turning the browser into a control room.
          </h2>
          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <div key={section.title} className="border-t border-[var(--border)] pt-4">
                <h3 className="text-xl font-semibold">{section.title}</h3>
                <p className="body-copy mt-3 max-w-md">{section.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <PlaceholderImage
          index="02"
          title="Dashboard image"
          copy="Replace this with a quieter dashboard screenshot, emulator shot, or auth completion screen."
        />
      </section>

      <section className="mt-20 grid gap-10 border-t border-[var(--border)] pt-10 md:grid-cols-3">
        <div>
          <div className="data-label">Sandbox</div>
          <p className="body-copy mt-3">
            `cider create` can start clean or initialize from a repo URL without extra browser complexity.
          </p>
        </div>
        <div>
          <div className="data-label">Auth</div>
          <p className="body-copy mt-3">
            `cider login`, `cider gemini auth`, and `cider google login` now have a direct, minimal web destination.
          </p>
        </div>
        <div>
          <div className="data-label">Dashboard</div>
          <p className="body-copy mt-3">
            The dashboard stays for data, not decoration: status, logs, activity, and simulator output.
          </p>
        </div>
      </section>
    </main>
  );
}
