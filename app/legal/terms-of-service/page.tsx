import Link from "next/link";

export const metadata = {
  title: "Условия использования — Polishchuk AI Systems",
};

export default function TermsOfService() {
  return (
    <>
      <h1 className="font-space-grotesk font-bold text-charcoal text-3xl md:text-4xl mb-2">
        Условия использования
      </h1>
      <p className="text-taupe text-sm mb-10">Последнее обновление: 07.04.2026</p>

      <section className="space-y-8 text-charcoal">

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">1. Общие положения</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Настоящие Условия регулируют использование сайта{" "}
            <span className="font-medium text-charcoal">polishchuk-ai-systems.vercel.app</span>{" "}
            (далее — «Сайт»), принадлежащего самозанятому Полищук Артёму Викторовичу
            (ИНН 616204739770, НПД), действующему под брендом Polishchuk AI Systems
            (далее — «Исполнитель»).
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Используя Сайт, вы («Пользователь») подтверждаете согласие с настоящими Условиями.
            Если вы не согласны — пожалуйста, не используйте Сайт.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">2. Описание сайта</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Сайт является информационным ресурсом об услугах в области AI-архитектуры и
            автоматизации бизнес-процессов. Сайт не является средством массовой информации.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Информация на Сайте носит ознакомительный характер и{" "}
            <strong className="font-medium text-charcoal">не является публичной офертой</strong>,
            если не указано иное. Коммерческие условия оказания услуг определяются{" "}
            <Link href="/legal/public-offer" className="text-crimson hover:underline">
              Публичной офертой
            </Link>.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">3. Интеллектуальная собственность</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Все материалы Сайта (тексты, дизайн, код, визуальные элементы) являются
            собственностью Исполнителя или используются на законных основаниях и защищены
            законодательством Российской Федерации об авторском праве. Копирование,
            распространение или использование материалов без письменного согласия Исполнителя
            запрещено.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">4. Ограничение ответственности</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Исполнитель не гарантирует бесперебойную работу Сайта и не несёт ответственности за:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe">
            <li>Решения, принятые Пользователем на основании информации на Сайте</li>
            <li>Временную недоступность Сайта по техническим причинам</li>
            <li>Содержание внешних ресурсов, на которые ведут ссылки с Сайта</li>
          </ul>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">5. Особые условия об AI-системах</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            AI-системы, описанные на Сайте, являются инструментами поддержки принятия решений
            и автоматизации процессов. Исполнитель не гарантирует:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe mb-3">
            <li>100% точность или безошибочность результатов работы AI</li>
            <li>Конкретный коммерческий результат (прибыль, экономию, ROI)</li>
            <li>Воспроизводимость результатов в условиях, отличных от условий разработки</li>
          </ul>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Результаты зависят от качества входных данных, среды внедрения и участия Заказчика.
            Пользователь несёт ответственность за верификацию результатов AI и принятие
            финальных решений на их основе.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">6. Конфиденциальность и Cookie</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Обработка персональных данных регулируется{" "}
            <Link href="/legal/privacy-policy" className="text-crimson hover:underline">
              Политикой конфиденциальности
            </Link>.
            Информация о технологиях отслеживания — в{" "}
            <Link href="/legal/cookie-policy" className="text-crimson hover:underline">
              Cookie Policy
            </Link>.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">7. Изменение условий</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Исполнитель вправе изменять настоящие Условия. Актуальная версия размещена на Сайте.
            Продолжение использования Сайта после публикации изменений означает их принятие.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">8. Применимое право и разрешение споров</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Настоящие Условия регулируются законодательством Российской Федерации.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            <strong className="font-medium text-charcoal">Претензионный порядок:</strong> до
            обращения в суд стороны направляют письменную претензию на email{" "}
            <a href="mailto:a.polishchuk21@yandex.com" className="text-crimson hover:underline">
              a.polishchuk21@yandex.com
            </a>.
            Срок рассмотрения — 30 календарных дней.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            <strong className="font-medium text-charcoal">Подсудность:</strong> споры
            рассматриваются в суде по месту нахождения Исполнителя (г. Москва).
            Для потребителей — физических лиц — подсудность определяется в соответствии со
            ст.17 Закона РФ «О защите прав потребителей» по выбору потребителя.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">9. Связанные документы</h2>
          <ul className="list-none space-y-2 font-inter font-light text-taupe">
            <li>
              <Link href="/legal/privacy-policy" className="text-crimson hover:underline">
                Политика конфиденциальности
              </Link>{" "}
              — порядок обработки персональных данных
            </li>
            <li>
              <Link href="/legal/cookie-policy" className="text-crimson hover:underline">
                Cookie Policy
              </Link>{" "}
              — использование технологий отслеживания
            </li>
            <li>
              <Link href="/legal/public-offer" className="text-crimson hover:underline">
                Публичная оферта
              </Link>{" "}
              — коммерческие условия оказания услуг
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">10. Контактная информация</h2>
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
