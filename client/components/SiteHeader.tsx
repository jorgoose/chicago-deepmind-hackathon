import Link from "next/link";
import CiderIcon from "./CiderIcon";

interface Props {
  current: "home" | "login" | "dashboard";
}

const links: Array<{ href: string; label: string; key: Props["current"] }> = [
  { href: "/", label: "Landing", key: "home" },
  { href: "/login", label: "Login", key: "login" },
  { href: "/dashboard", label: "Dashboard", key: "dashboard" },
];

export default function SiteHeader({ current }: Props) {
  return (
    <header className="site-nav">
      <Link href="/" className="flex items-center gap-2.5 text-[1.45rem] font-semibold tracking-[-0.04em] text-[var(--text)]">
        <CiderIcon size={32} />
        Cider
      </Link>

      <nav className="flex flex-wrap items-center gap-6">
        {links.map((link) => {
          const active = link.key === current;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold ${active ? "text-[var(--accent)]" : "text-[var(--muted)]"}`}
            >
              {link.label}
            </Link>
          );
        })}

        <Link href="/dashboard" className="button-primary">
          Open dashboard
        </Link>
      </nav>
    </header>
  );
}
