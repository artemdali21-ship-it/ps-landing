import Link from "next/link";

export default function Footer() {
  const links = [
    { href: "/legal/privacy-policy", label: "Политика конфиденциальности" },
    { href: "/legal/terms-of-service", label: "Условия использования" },
    { href: "/legal/cookie-policy", label: "Cookie" },
    { href: "/legal/public-offer", label: "Общие условия" },
  ];

  return (
    <footer className="px-5 md:px-20 border-t border-stone" style={{ position: "relative", zIndex: 2, background: "#FAF6F0" }}>
      {/* Legal links + copyright */}
      <div className="max-w-5xl mx-auto py-2 md:py-4 flex flex-col items-center gap-1 md:gap-3">
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 md:gap-x-6 md:gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-inter font-light text-taupe text-xs md:text-sm hover:text-charcoal transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="font-inter font-light text-taupe text-center" style={{ fontSize: "10px" }}>
          Полищук Артём Викторович · Самозанятый (НПД) · ИНН 616204739770
        </p>
        <p className="font-inter font-light text-crimson text-xs md:text-sm text-center">
          Polishchuk AI Systems · © 2026
        </p>
        <p className="hidden md:block font-inter font-light text-center leading-relaxed max-w-2xl mx-auto" style={{ fontSize: "10px", color: "rgba(109,89,74,0.45)" }}>
          Описания услуг на сайте носят ознакомительный характер и не являются гарантией конкретного результата.
          Результаты AI-систем зависят от входных данных, среды внедрения и участия заказчика.
          Подробные условия —{" "}
          <Link href="/legal/public-offer" className="underline hover:opacity-75 transition-opacity">
            Общие условия
          </Link>.
        </p>
      </div>
    </footer>
  );
}
