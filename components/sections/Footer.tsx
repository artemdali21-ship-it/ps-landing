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
      {/* Legal links + copyright */}
      <div className="max-w-5xl mx-auto py-4 flex flex-col items-center gap-3">
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
