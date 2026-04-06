export const metadata = {
  title: "Условия использования — Polishchuk Systems",
};

export default function TermsOfService() {
  return (
    <>
      <h1 className="font-space-grotesk font-bold text-charcoal text-3xl md:text-4xl mb-2">
        Условия использования
      </h1>
      <p className="text-taupe text-sm mb-10">Последнее обновление: 06.04.2026</p>

      <section className="space-y-8 text-charcoal">
        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">1. Принятие условий</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Используя сайт и услуги Polishchuk Systems, вы соглашаетесь с данными Условиями
            использования. Если вы не согласны с условиями, пожалуйста, не используйте наш сайт.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">2. Описание услуг</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Polishchuk Systems предоставляет консультационные услуги в области архитектуры AI-решений,
            оркестрации и масштабирования. Наши предложения включают анализ, стратегическое
            планирование, деплой и сопровождение проектов.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">3. Интеллектуальная собственность</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Все материалы на нашем сайте являются собственностью Polishchuk Systems или его
            поставщиков контента и защищены законами об авторском праве. Запрещается
            копирование или распространение материалов без письменного разрешения.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">4. Ограничение ответственности</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Мы не несём ответственности за косвенные, случайные, специальные или последующие
            убытки, возникшие в результате использования или невозможности использования наших услуг.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">5. Гарантии и отказ от них</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Мы предоставляем наши услуги в том виде, в котором они есть, без каких-либо явных
            или подразумеваемых гарантий относительно точности, надёжности или пригодности для
            конкретных целей.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">6. Оплата и возврат средств</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Оплата производится согласно согласованным графикам. Возврат средств обсуждается
            индивидуально по каждому проекту. Отмена услуг требует письменного уведомления.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">7. Конфиденциальность</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Мы обязуемся сохранять конфиденциальность информации, предоставленной клиентами.
            Подробности описаны в нашей Политике конфиденциальности.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">8. Изменение условий</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Мы оставляем за собой право изменять данные условия. Изменения вступают в силу
            после публикации на сайте. Продолжение использования услуг означает принятие
            обновлённых условий.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">9. Применимое право</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Данные условия регулируются применимым законодательством. Споры разрешаются в судах
            по месту регистрации компании.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">10. Контактная информация</h2>
          <ul className="list-none space-y-1 font-inter font-light text-taupe">
            <li>Полищук Артём Викторович, самозанятый (НПД)</li>
            <li>ИНН: 616204739770</li>
            <li>Email: <a href="mailto:a.polishchuk21@yandex.com" className="text-crimson hover:underline">a.polishchuk21@yandex.com</a></li>
            <li>Telegram: <a href="https://t.me/spaces_love" className="text-crimson hover:underline" target="_blank" rel="noopener noreferrer">@spaces_love</a></li>
          </ul>
        </div>
      </section>
    </>
  );
}
