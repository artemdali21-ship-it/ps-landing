import Link from "next/link";

export default function Footer() {
  const links = [
    { href: "/legal/privacy-policy", label: "Политика конфиденциальности" },
    { href: "/legal/terms-of-service", label: "Условия использования" },
    { href: "/legal/cookie-policy", label: "Cookie" },
    { href: "/legal/public-offer", label: "Публичная оферта" },
  ];

  return (
    <footer className="px-5 md:px-20 border-t border-stone" style={{ position: "relative", zIndex: 2, background: "#FAF6F0" }}>
      {/* Logo block */}
      <div className="max-w-5xl mx-auto pt-10 pb-8 flex flex-col items-center gap-2 border-b border-stone/60">
        <Link href="/" className="flex flex-col items-center leading-none" style={{ textDecoration: "none" }}>
          <span className="font-outfit font-black text-2xl text-espresso" style={{ fontFamily: "Satoshi, system-ui, sans-serif", fontWeight: 900 }}>
            Polishchuk<span style={{ color: "#C41230" }}>.</span>
          </span>
          <span className="font-space-grotesk font-semibold text-xs tracking-widest uppercase" style={{ color: "#C41230", letterSpacing: "0.18em", marginTop: 2 }}>
            AI Systems
          </span>
        </Link>
        <p className="font-outfit font-light text-sm text-center max-w-xs leading-relaxed" style={{ color: "rgba(31,20,16,0.45)", marginTop: 6 }}>
          Строим AI-системы, которые меняют процессы — не добавляют инструменты.
        </p>
      </div>

      {/* Legal links + copyright */}
      <div className="max-w-5xl mx-auto py-6 flex flex-col items-center gap-4">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-inter font-light text-taupe text-sm hover:text-charcoal transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="font-inter font-light text-taupe text-xs text-center">
          Полищук Артём Викторович · Самозанятый (НПД) · ИНН 616204739770
        </p>
        <p className="font-inter font-light text-crimson text-sm text-center">
          Polishchuk AI Systems · © 2026
        </p>
      </div>
    </footer>
  );
}
