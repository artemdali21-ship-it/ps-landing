export const metadata = {
  title: "Политика Cookie — Polishchuk Systems",
};

export default function CookiePolicy() {
  return (
    <>
      <h1 className="font-space-grotesk font-bold text-charcoal text-3xl md:text-4xl mb-2">
        Политика использования файлов Cookie
      </h1>
      <p className="text-taupe text-sm mb-10">Последнее обновление: 23.01.2026</p>

      <section className="space-y-8 text-charcoal">
        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">Что такое файлы Cookie?</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Файлы Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве
            при посещении веб-сайта. Они используются для улучшения функциональности сайта,
            анализа трафика и предоставления персонализированного контента.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">Типы используемых файлов Cookie</h2>

          <div className="space-y-5">
            <div>
              <h3 className="font-space-grotesk font-semibold text-base mb-2">Необходимые файлы Cookie</h3>
              <p className="font-inter font-light text-taupe leading-relaxed">
                Эти файлы необходимы для работы сайта, включая аутентификацию и безопасность.
                Они удаляются после закрытия браузера.
              </p>
            </div>

            <div>
              <h3 className="font-space-grotesk font-semibold text-base mb-2">Аналитические файлы Cookie</h3>
              <p className="font-inter font-light text-taupe leading-relaxed">
                Используются для анализа использования сайта и улучшения его функциональности.
                Помогают нам понять, как вы используете наш сайт.
              </p>
            </div>

            <div>
              <h3 className="font-space-grotesk font-semibold text-base mb-2">Функциональные файлы Cookie</h3>
              <p className="font-inter font-light text-taupe leading-relaxed">
                Сохраняют ваши предпочтения и выбор для улучшения взаимодействия с сайтом
                при последующих посещениях.
              </p>
            </div>

            <div>
              <h3 className="font-space-grotesk font-semibold text-base mb-2">Маркетинговые файлы Cookie</h3>
              <p className="font-inter font-light text-taupe leading-relaxed">
                Используются для отслеживания вашей активности и предоставления релевантной рекламы.
                Устанавливаются только с вашего согласия.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">Как управлять файлами Cookie</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Вы можете управлять файлами Cookie через настройки вашего браузера.
            Большинство браузеров позволяют вам:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe">
            <li>Просматривать сохранённые файлы Cookie</li>
            <li>Удалять файлы Cookie</li>
            <li>Блокировать установку новых файлов Cookie</li>
            <li>Получать уведомления при установке файлов Cookie</li>
          </ul>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">Третьи лица</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Некоторые наши партнёры могут также использовать файлы Cookie на нашем сайте для
            предоставления услуг аналитики и маркетинга. Мы не контролируем файлы Cookie,
            устанавливаемые третьими лицами.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">Контакты</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-2">
            Если у вас есть вопросы о нашей политике использования файлов Cookie, свяжитесь с нами:
          </p>
          <ul className="list-none space-y-1 font-inter font-light text-taupe">
            <li>Email: <a href="mailto:a.polishchuk21@yandex.com" className="text-crimson hover:underline">a.polishchuk21@yandex.com</a></li>
            <li>Telegram: <a href="https://t.me/spaces_love" className="text-crimson hover:underline" target="_blank" rel="noopener noreferrer">@spaces_love</a></li>
          </ul>
        </div>
      </section>
    </>
  );
}
