import Link from "next/link";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-beige">
      <header className="px-5 md:px-20 py-6 border-b border-stone">
        <Link
          href="/"
          className="font-space-grotesk font-semibold text-charcoal text-sm uppercase tracking-widest hover:text-crimson transition-colors"
        >
          ← Polishchuk AI Systems
        </Link>
      </header>
      <main className="max-w-3xl mx-auto px-5 md:px-8 py-16">
        <div>
          {children}
        </div>
      </main>
      <footer className="px-5 md:px-20 py-8 border-t border-stone">
        <p className="font-inter font-light text-taupe text-sm text-center">
          Polishchuk AI Systems · 2026
        </p>
      </footer>
    </div>
  );
}
