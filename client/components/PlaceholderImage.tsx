interface Props {
  index: string;
  title: string;
  copy: string;
}

export default function PlaceholderImage({ index, title, copy }: Props) {
  return (
    <section className="placeholder-panel">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="data-label">Image {index}</div>
        <div className="text-sm text-[var(--muted)]">{title}</div>
      </div>

      <div className="placeholder-frame p-6">
        <div className="mx-auto max-w-[420px] rounded-[16px] border border-[var(--border)] bg-white">
          <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]/35" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-200" />
          </div>

          <div className="space-y-4 p-5">
            <div className="h-40 rounded-[12px] bg-[var(--surface-muted)]" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="h-24 rounded-[12px] bg-[var(--surface-muted)]" />
              <div className="h-24 rounded-[12px] bg-[var(--surface-muted)]" />
            </div>
            <div className="h-3 w-2/3 rounded-full bg-stone-200" />
            <div className="h-3 w-1/2 rounded-full bg-stone-200" />
          </div>
        </div>
      </div>

      <div className="px-5 py-5">
        <p className="body-copy max-w-md">{copy}</p>
      </div>
    </section>
  );
}
