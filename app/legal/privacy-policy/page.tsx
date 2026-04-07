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
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">1. Общие положения</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Настоящая Политика разработана в соответствии с Федеральным законом от 27.07.2006
            № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных
            лицами, обращающимися к услугам Polishchuk AI Systems.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            <strong className="font-medium text-charcoal">Оператор:</strong> Полищук Артём Викторович,
            самозанятый (плательщик налога на профессиональный доход, НПД), ИНН 616204739770,
            действующий под брендом Polishchuk AI Systems (далее — «Оператор», «мы»).
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed mt-3">
            <strong className="font-medium text-charcoal">Персональные данные</strong> — любая
            информация, относящаяся к прямо или косвенно определённому физическому лицу (субъекту
            персональных данных), в соответствии с п.1 ст.3 ФЗ-152.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">2. Цели обработки персональных данных</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-4">
            Оператор обрабатывает персональные данные только в конкретных, заранее определённых
            целях и на законных основаниях (ст.6 ФЗ-152):
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-inter font-light text-taupe" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(212,200,184,0.7)" }}>
                  <th className="text-left py-2 pr-4 font-space-grotesk font-semibold text-charcoal pb-3" style={{ minWidth: "140px" }}>Цель</th>
                  <th className="text-left py-2 pr-4 font-space-grotesk font-semibold text-charcoal pb-3" style={{ minWidth: "150px" }}>Категории данных</th>
                  <th className="text-left py-2 pr-4 font-space-grotesk font-semibold text-charcoal pb-3" style={{ minWidth: "160px" }}>Основание (ст.6 ФЗ-152)</th>
                  <th className="text-left py-2 font-space-grotesk font-semibold text-charcoal pb-3" style={{ minWidth: "130px" }}>Срок хранения</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid rgba(212,200,184,0.4)" }}>
                  <td className="py-3 pr-4 align-top leading-relaxed">Ответ на обращения через email / Telegram</td>
                  <td className="py-3 pr-4 align-top leading-relaxed">Имя, контактные данные, содержание обращения, Telegram username</td>
                  <td className="py-3 pr-4 align-top leading-relaxed">п.5 ч.1 ст.6 — обработка необходима для ответа на обращение и совершения действий по инициативе субъекта до заключения договора; п.1 ч.1 ст.6 — согласие субъекта в случаях, когда оно требуется законом</td>
                  <td className="py-3 align-top leading-relaxed">До завершения переписки + 1 год</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(212,200,184,0.4)" }}>
                  <td className="py-3 pr-4 align-top leading-relaxed">Исполнение договора об оказании услуг</td>
                  <td className="py-3 pr-4 align-top leading-relaxed">ФИО, реквизиты, контактные данные, данные проекта</td>
                  <td className="py-3 pr-4 align-top leading-relaxed">п.5 ч.1 ст.6 — исполнение договора</td>
                  <td className="py-3 align-top leading-relaxed">Срок договора + 3 года (исковая давность)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(212,200,184,0.4)" }}>
                  <td className="py-3 pr-4 align-top leading-relaxed">Налоговая отчётность и бухгалтерский учёт</td>
                  <td className="py-3 pr-4 align-top leading-relaxed">ФИО, ИНН, реквизиты оплаты</td>
                  <td className="py-3 pr-4 align-top leading-relaxed">п.2 ч.1 ст.6 — требование закона</td>
                  <td className="py-3 align-top leading-relaxed">5 лет (ФЗ «О бухгалтерском учёте»)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 align-top leading-relaxed">Статистика посещений сайта</td>
                  <td className="py-3 pr-4 align-top leading-relaxed">Агрегированные данные без идентификации</td>
                  <td className="py-3 pr-4 align-top leading-relaxed">п.7 ч.1 ст.6 — законный интерес оператора</td>
                  <td className="py-3 align-top leading-relaxed">До отзыва или прекращения деятельности</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">3. Какие данные мы обрабатываем</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Данный сайт <strong className="font-medium text-charcoal">не содержит форм сбора данных</strong> и
            не принимает заявки через веб-интерфейс. Обработка персональных данных может начаться
            при обращении пользователя по указанным на сайте каналам связи (электронная почта, Telegram).
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe">
            <li>
              <strong className="font-medium text-charcoal">При обращении через Telegram/Email:</strong> имя
              или username, контактные данные, содержание переписки, описание задачи — только то,
              что вы сами предоставите.
            </li>
            <li>
              <strong className="font-medium text-charcoal">При заключении договора:</strong> ФИО,
              ИНН (для ИП/юрлиц), реквизиты для выставления счёта, контактные данные.
            </li>
            <li>
              <strong className="font-medium text-charcoal">Технические данные сайта:</strong> хостинг-провайдер
              Timeweb Cloud (Россия) обрабатывает IP-адреса и заголовки запросов в рамках технического
              функционирования серверов. Данные обрабатываются на территории РФ. Аналитические сервисы
              на сайте не подключены.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">4. Передача данных третьим лицам и трансграничная передача</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            В рамках оказания услуг данные могут обрабатываться следующими третьими лицами
            (обработчиками):
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe mb-4">
            <li><strong className="font-medium text-charcoal">Timeweb Cloud (Россия, г. Москва)</strong> — хостинг сайта, обработка технических данных (IP-адреса, заголовки запросов) на территории РФ.</li>
            <li><strong className="font-medium text-charcoal">Telegram Messenger Inc. (ОАЭ/Великобритания)</strong> — канал связи с клиентами, переписка хранится на зарубежных серверах.</li>
            <li><strong className="font-medium text-charcoal">Яндекс (Россия)</strong> — email-провайдер, хранение входящей и исходящей переписки на территории РФ.</li>
            <li><strong className="font-medium text-charcoal">Anthropic PBC (США)</strong> — AI-сервис (Claude), может использоваться при оказании услуг. Данные клиентов передаются в минимальном объёме и только при необходимости для выполнения задач проекта.</li>
          </ul>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            <strong className="font-medium text-charcoal">Трансграничная передача данных (ст.12 ФЗ-152):</strong>{" "}
            Сайт размещён на серверах Timeweb Cloud (Россия). При оказании услуг могут использоваться
            зарубежные сервисы, если это необходимо для исполнения договора или взаимодействия
            с клиентом. Такая передача осуществляется только в объёме, необходимом для
            соответствующей цели, при наличии предусмотренных законом оснований.
            Перечень сервисов указан в разделе 4 настоящей Политики.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Мы не продаём и не передаём ваши данные третьим лицам для маркетинговых целей.
            Перечень обработчиков обновляется при изменении состава используемых сервисов.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">5. Защита персональных данных</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Оператор принимает необходимые правовые, организационные и технические меры для
            защиты персональных данных от неправомерного доступа, уничтожения, изменения,
            блокирования, копирования и распространения. При работе с зарубежными сервисами
            Оператор использует только провайдеров с собственными политиками безопасности и
            защиты данных.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">6. Права субъекта персональных данных</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            В соответствии с ФЗ-152 вы имеете право:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe mb-4">
            <li>На получение информации об обработке ваших персональных данных (ст.14 ФЗ-152)</li>
            <li>На доступ к своим персональным данным</li>
            <li>На уточнение, блокирование или уничтожение данных (ст.21 ФЗ-152)</li>
            <li>На отзыв согласия на обработку</li>
            <li>На обжалование действий Оператора в уполномоченном органе (Роскомнадзор)</li>
          </ul>
          <p className="font-inter font-light text-taupe leading-relaxed">
            <strong className="font-medium text-charcoal">Порядок реализации прав:</strong> направьте
            запрос на email{" "}
            <a href="mailto:a.polishchuk21@yandex.com" className="text-crimson hover:underline">
              a.polishchuk21@yandex.com
            </a>{" "}
            с указанием ФИО и сути запроса. Срок обработки — 10 рабочих дней с момента
            получения запроса (в соответствии со ст.14 ФЗ-152).
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">7. Файлы Cookie</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Подробнее о технологиях отслеживания, используемых на сайте, — в нашей{" "}
            <Link href="/legal/cookie-policy" className="text-crimson hover:underline">
              Политике использования Cookie
            </Link>.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">8. Изменения в Политике</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Оператор вправе вносить изменения в настоящую Политику. Актуальная версия всегда
            размещена на сайте. Дата последнего обновления указана в начале документа.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">9. Контактная информация</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Ответственный за обработку персональных данных: Полищук Артём Викторович.
            По вопросам, связанным с обработкой ПД, обращайтесь на email. Ответ — в течение
            10 рабочих дней.
          </p>
          <ul className="list-none space-y-1 font-inter font-light text-taupe">
            <li>ИНН: 616204739770 · Самозанятый (НПД)</li>
            <li>Email: <a href="mailto:a.polishchuk21@yandex.com" className="text-crimson hover:underline">a.polishchuk21@yandex.com</a></li>
            <li>Telegram: <a href="https://t.me/spaces_love" className="text-crimson hover:underline" target="_blank" rel="noopener noreferrer">@spaces_love</a></li>
          </ul>
          <p className="font-inter font-light text-taupe leading-relaxed mt-4">
            Связанные документы:{" "}
            <Link href="/legal/cookie-policy" className="text-crimson hover:underline">Cookie Policy</Link>
            {" · "}
            <Link href="/legal/public-offer" className="text-crimson hover:underline">Общие условия оказания услуг</Link>
          </p>
        </div>

      </section>
    </>
  );
}
