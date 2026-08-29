export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-sm tracking-[0.28em] uppercase">Damien Carrión</p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} · Estudio de pintura, escultura y dorado
        </p>
      </div>
    </footer>
  );
}
