import Link from "next/link";

export default function Footer() {
  const links = [
    { href: "/legal/privacy-policy", label: "Политика конфиденциальности" },
    { href: "/legal/terms-of-service", label: "Условия использования" },
    { href: "/legal/cookie-policy", label: "Cookie" },
    { href: "/legal/public-offer", label: "Публичная оферта" },
  ];

  return (
    <footer className="px-5 md:px-20 py-10 border-t border-stone">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-5">
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
        <p className="font-inter font-light text-taupe text-sm text-center">
          Polishchuk Systems · 2026
        </p>
      </div>
    </footer>
  );
}
