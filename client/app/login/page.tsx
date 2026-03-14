import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import CiderIcon from "@/components/CiderIcon";

const methods = [
  {
    label: "Cider login",
    detail: "Browser destination for `cider login` sessions.",
  },
  {
    label: "Gemini auth",
    detail: "Use this surface for `cider gemini auth` approval.",
  },
  {
    label: "Google login",
    detail: "Pair with `cider google login` when the CLI requests Google auth.",
  },
];

const sessionFields = [
  "Session source",
  "Requested scopes",
  "Callback target",
  "CLI handshake",
];

export default function LoginPage() {
  return (
    <main className="page-shell">
      <SiteHeader current="login" />

      <section className="mt-16 grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)]">
        <div>
          <div className="flex items-center gap-3">
            <CiderIcon size={28} />
            <span className="eyebrow">CLI auth</span>
          </div>
          <h1 className="section-title mt-6 max-w-3xl">Approve CLI authentication in the browser.</h1>
          <p className="body-copy mt-5 max-w-xl text-lg">
            This page is intentionally quiet. It exists to complete auth initiated from the
            CLI, then get out of the way.
          </p>

          <div className="mt-10 space-y-6">
            {methods.map((method) => (
              <div key={method.label} className="border-t border-[var(--border)] pt-4">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold leading-none">{method.label}</h2>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
                    Pending
                  </span>
                </div>
                <p className="body-copy mt-3 max-w-lg">{method.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard" className="button-primary">
              Open dashboard
            </Link>
            <Link href="/" className="button-secondary">
              Back to landing
            </Link>
          </div>
        </div>

        <div className="surface-card p-8">
          <div className="data-label">CLI session</div>
          <h2 className="mt-4 text-3xl font-semibold leading-tight">Awaiting handshake</h2>

          <div className="mt-8 space-y-5">
            {sessionFields.map((field) => (
              <div key={field} className="border-t border-[var(--border)] pt-4">
                <div className="data-label">{field}</div>
                <p className="body-copy mt-3">
                  This value should be populated by the auth flow once the CLI opens the browser.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-[var(--border)] pt-4">
            <div className="data-label">After approval</div>
            <p className="body-copy mt-3">
              When authentication succeeds, the CLI can continue and this browser tab can close.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
