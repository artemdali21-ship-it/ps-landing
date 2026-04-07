import Link from "next/link";

export const metadata = {
  title: "Политика конфиденциальности — Polishchuk AI Systems",
};

export default function PrivacyPolicy() {
  return (
    <>
      <h1 className="font-space-grotesk font-bold text-charcoal text-3xl md:text-4xl mb-2">
        Политика конфиденциальности
      </h1>
      <p className="text-taupe text-sm mb-10">Последнее обновление: 07.04.2026</p>

      <section className="space-y-8 text-charcoal">
        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">1. Владелец сайта</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Полищук Артём Викторович, самозанятый (плательщик налога на профессиональный доход, НПД),
            ИНН 616204739770, действующий под брендом Polishchuk AI Systems («мы», «нас», «наш»).
            В своей работе мы руководствуемся принципами Федерального закона от 27.07.2006 № 152-ФЗ
            «О персональных данных».
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">2. Какую информацию мы собираем</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Данный сайт не содержит форм ввода данных и не собирает персональные данные посетителей
            напрямую. Если вы свяжетесь с нами по email или Telegram, мы будем обрабатывать только ту
            информацию, которую вы предоставите добровольно в рамках переписки (имя, контактные данные,
            описание вашей задачи).
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">3. Аналитика</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Мы используем Vercel Web Analytics для анонимной статистики посещений: просматриваемые
            страницы, переходы, примерная география. Этот сервис не использует cookies и не собирает
            персональные данные. Данные агрегированы и не позволяют идентифицировать конкретного
            пользователя.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">4. Хостинг и трансграничная передача данных</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Сайт размещён на платформе Vercel Inc. (США). Технические данные о подключении
            (IP-адрес, заголовки запросов) могут обрабатываться на серверах за пределами Российской
            Федерации в рамках работы хостинг-провайдера.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">5. Как мы используем информацию</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Информацию, полученную в ходе добровольной переписки, мы используем исключительно для:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe">
            <li>Ответа на ваш запрос и организации сотрудничества</li>
            <li>Оказания согласованных услуг</li>
            <li>Соблюдения требований применимого законодательства</li>
          </ul>
          <p className="font-inter font-light text-taupe leading-relaxed mt-3">
            Мы не отправляем рекламные рассылки и не передаём ваши данные третьим лицам без вашего
            согласия, за исключением случаев, предусмотренных законодательством.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">6. Ваши права</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Если в рамках сотрудничества мы получим ваши персональные данные, вы имеете право:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe">
            <li>На доступ к вашим данным и информацию об их обработке</li>
            <li>На исправление неточных или устаревших данных</li>
            <li>На удаление данных при отсутствии законных оснований для их хранения</li>
            <li>На отзыв согласия на обработку</li>
          </ul>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">7. Файлы Cookie</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Подробнее о файлах Cookie и их использовании на сайте — в нашей{" "}
            <Link href="/legal/cookie-policy" className="text-crimson hover:underline">
              Политике использования Cookie
            </Link>.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">8. Изменения в Политике</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Мы оставляем за собой право изменять данную Политику конфиденциальности. Изменения вступают
            в силу после публикации на сайте. Дата последнего обновления указана в начале документа.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">9. Контактная информация</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            По любым вопросам о конфиденциальности обращайтесь по контактам ниже. Ответ — в течение
            30 дней.
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
