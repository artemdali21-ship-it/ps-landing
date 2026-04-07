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
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">1. Введение</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Данная страница разъясняет, какие технологии отслеживания используются на сайте
            polishchuk-ai-systems.vercel.app, принадлежащем самозанятому Полищук Артёму Викторовичу
            (ИНН 616204739770), действующему под брендом Polishchuk AI Systems.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">2. Использование файлов Cookie</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            <strong className="font-medium text-charcoal">Данный сайт не устанавливает
            собственных файлов Cookie.</strong>
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            На сайте отсутствуют: маркетинговые cookies, рекламные трекеры, аналитические cookies
            (Яндекс.Метрика, Google Analytics и аналоги), а также cookies авторизации и
            персонализации. Никакого согласия на cookies не требуется и не запрашивается.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">3. Vercel Web Analytics</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Для анализа посещаемости используется Vercel Web Analytics — встроенный инструмент
            хостинг-провайдера. Этот сервис:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe mb-4">
            <li>Не использует файлы Cookie</li>
            <li>Не собирает персональные данные пользователей</li>
            <li>Работает исключительно на агрегированных и анонимных данных</li>
            <li>Не позволяет идентифицировать конкретного посетителя</li>
          </ul>
          <p className="font-inter font-light text-taupe leading-relaxed">
            При этом хостинг-провайдер{" "}
            <strong className="font-medium text-charcoal">Vercel Inc. (США)</strong> в рамках
            технического функционирования серверов обрабатывает IP-адреса посетителей. Это
            является неотъемлемой частью работы любого веб-хостинга и происходит вне зависимости
            от использования cookies.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">4. Сторонние сервисы</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            При переходе по ссылкам на внешние ресурсы (Telegram, сторонние сайты) эти сервисы
            могут устанавливать собственные cookies в соответствии со своими политиками
            конфиденциальности. Владелец сайта не контролирует и не несёт ответственности за
            их действия.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">5. Управление настройками браузера</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Вы можете управлять cookies через настройки вашего браузера:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe mb-3">
            <li>Просматривать и удалять сохранённые cookies</li>
            <li>Блокировать установку новых cookies от любых сайтов</li>
            <li>Получать уведомления при попытке установки cookie</li>
          </ul>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Поскольку данный сайт не использует cookies для своей работы, изменение настроек
            браузера не повлияет на доступность контента.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">6. Изменения</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            При подключении дополнительных аналитических или маркетинговых инструментов
            настоящая Политика будет обновлена до начала их использования.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">7. Контакты</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            По вопросам, связанным с настоящей Политикой:
          </p>
          <ul className="list-none space-y-1 font-inter font-light text-taupe mb-4">
            <li>Полищук Артём Викторович, самозанятый (НПД), ИНН 616204739770</li>
            <li>Email: <a href="mailto:a.polishchuk21@yandex.com" className="text-crimson hover:underline">a.polishchuk21@yandex.com</a></li>
            <li>Telegram: <a href="https://t.me/spaces_love" className="text-crimson hover:underline" target="_blank" rel="noopener noreferrer">@spaces_love</a></li>
          </ul>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Подробнее об обработке персональных данных — в{" "}
            <Link href="/legal/privacy-policy" className="text-crimson hover:underline">
              Политике конфиденциальности
            </Link>.
          </p>
        </div>

      </section>
    </>
  );
}
