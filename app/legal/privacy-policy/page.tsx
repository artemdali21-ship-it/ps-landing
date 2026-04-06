export const metadata = {
  title: "Политика конфиденциальности — Polishchuk Systems",
};

export default function PrivacyPolicy() {
  return (
    <>
      <h1 className="font-space-grotesk font-bold text-charcoal text-3xl md:text-4xl mb-2">
        Политика конфиденциальности
      </h1>
      <p className="text-taupe text-sm mb-10">Последнее обновление: 06.04.2026</p>

      <section className="space-y-8 text-charcoal">
        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">1. Введение</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Polishchuk Systems («мы», «нас», «наш») предоставляет услуги в соответствии с данной
            Политикой конфиденциальности. Мы уважаем вашу приватность и берём на себя
            ответственность за защиту ваших персональных данных.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">2. Какую информацию мы собираем</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Мы собираем информацию, которую вы предоставляете нам напрямую, включая:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe">
            <li>Контактная информация (имя, электронная почта, номер телефона)</li>
            <li>Информация о компании и должности</li>
            <li>Информация о ваших потребностях и проектах</li>
            <li>Любая другая информация, которую вы добровольно предоставляете</li>
          </ul>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">3. Как мы используем вашу информацию</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Мы используем собранную информацию в следующих целях:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe">
            <li>Предоставления и улучшения наших услуг</li>
            <li>Связи с вами по поводу ваших заказов и запросов</li>
            <li>Отправки информации о новых услугах и предложениях</li>
            <li>Анализа и улучшения нашего сайта</li>
            <li>Соответствия применимому законодательству</li>
          </ul>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">4. Защита данных</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Мы внедряем технические и организационные меры для защиты ваших персональных данных
            от несанкционированного доступа, изменения, раскрытия или уничтожения. Однако, пожалуйста,
            имейте в виду, что ни одна система безопасности не является полностью защищённой.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">5. Передача данных третьим лицам</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Мы не продаём, не торгуем и не передаём вашу личную информацию третьим лицам без
            вашего согласия, за исключением случаев, когда это необходимо для предоставления
            наших услуг или выполнения обязательств по закону.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">6. Ваши права</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            У вас есть следующие права в отношении ваших персональных данных:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe">
            <li>Право доступа к вашим данным</li>
            <li>Право на исправление неточных данных</li>
            <li>Право на удаление данных</li>
            <li>Право отозвать согласие на обработку</li>
          </ul>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">7. Контактная информация</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Если у вас есть вопросы о данной Политике конфиденциальности или о том, как мы
            обрабатываем ваши данные, пожалуйста, свяжитесь с нами:
          </p>
          <ul className="list-none mt-3 space-y-1 font-inter font-light text-taupe">
            <li>Полищук Артём Викторович, самозанятый (НПД)</li>
            <li>ИНН: 616204739770</li>
            <li>Email: <a href="mailto:a.polishchuk21@yandex.com" className="text-crimson hover:underline">a.polishchuk21@yandex.com</a></li>
            <li>Telegram: <a href="https://t.me/spaces_love" className="text-crimson hover:underline" target="_blank" rel="noopener noreferrer">@spaces_love</a></li>
          </ul>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">8. Изменения в Политике</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Мы оставляем за собой право изменять данную Политику конфиденциальности в любое время.
            Изменения вступят в силу после их публикации на сайте.
          </p>
        </div>
      </section>
    </>
  );
}
