import Link from "next/link";

export const metadata = {
  title: "Политика Cookie — Polishchuk AI Systems",
};

export default function CookiePolicy() {
  return (
    <>
      <h1 className="font-space-grotesk font-bold text-charcoal text-3xl md:text-4xl mb-2">
        Политика использования файлов Cookie
      </h1>
      <p className="text-taupe text-sm mb-10">Последнее обновление: 07.04.2026</p>

      <section className="space-y-8 text-charcoal">
        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">Что такое файлы Cookie?</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Файлы Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве
            при посещении веб-сайта. Они используются для сохранения настроек, анализа трафика
            и улучшения работы сайта.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">Использует ли этот сайт Cookie?</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Данный сайт не устанавливает собственных файлов Cookie. На нём отсутствуют формы
            авторизации, личный кабинет и сервисы персонализации, которые требовали бы хранения
            данных на вашем устройстве.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">Аналитика без Cookie</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Для измерения посещаемости мы используем Vercel Web Analytics — сервис, который работает
            без файлов Cookie и не собирает персональные данные. Статистика агрегирована: просмотры
            страниц, источники переходов, примерная география. Идентифицировать конкретного
            пользователя по этим данным невозможно.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">Технические Cookie браузера</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Некоторые браузеры и операционные системы могут самостоятельно сохранять технические
            данные при посещении сайта (например, для кэширования страниц). Это поведение определяется
            настройками вашего браузера и находится вне нашего контроля.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">Как управлять файлами Cookie</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Вы можете управлять файлами Cookie через настройки вашего браузера. Большинство
            браузеров позволяют:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe">
            <li>Просматривать и удалять сохранённые файлы Cookie</li>
            <li>Блокировать установку новых файлов Cookie</li>
            <li>Получать уведомления при попытке установки Cookie</li>
          </ul>
          <p className="font-inter font-light text-taupe leading-relaxed mt-3">
            Поскольку сайт не использует Cookie для своей работы, блокировка не повлияет на
            доступность контента.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">Дополнительная информация</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            О том, как мы в целом относимся к данным посетителей, читайте в{" "}
            <Link href="/legal/privacy-policy" className="text-crimson hover:underline">
              Политике конфиденциальности
            </Link>.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">Контакты</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-2">
            Если у вас есть вопросы о нашей политике использования файлов Cookie, свяжитесь с нами:
          </p>
          <ul className="list-none space-y-1 font-inter font-light text-taupe">
            <li>Полищук Артём Викторович, самозанятый (НПД), ИНН 616204739770</li>
            <li>Email: <a href="mailto:a.polishchuk21@yandex.com" className="text-crimson hover:underline">a.polishchuk21@yandex.com</a></li>
            <li>Telegram: <a href="https://t.me/spaces_love" className="text-crimson hover:underline" target="_blank" rel="noopener noreferrer">@spaces_love</a></li>
          </ul>
        </div>
      </section>
    </>
  );
}
