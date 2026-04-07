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
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">1. Стороны и принятие условий</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Услуги оказывает самозанятый Полищук Артём Викторович, ИНН 616204739770, плательщик
            налога на профессиональный доход (НПД), действующий под брендом Polishchuk AI Systems
            («Исполнитель»). Используя сайт и услуги Polishchuk AI Systems, вы («Заказчик»)
            подтверждаете согласие с данными Условиями использования. Если вы не согласны —
            пожалуйста, не используйте сайт.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">2. Описание услуг</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Polishchuk AI Systems предоставляет консультационные услуги в области архитектуры
            AI-решений, оркестрации и масштабирования. Предложения включают анализ, стратегическое
            планирование, деплой и сопровождение проектов. Подробные условия оказания услуг описаны
            в{" "}
            <Link href="/legal/public-offer" className="text-crimson hover:underline">
              Публичной оферте
            </Link>.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">3. Интеллектуальная собственность</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Все материалы на сайте являются собственностью Исполнителя или его поставщиков контента
            и защищены законодательством Российской Федерации об авторском праве. Копирование или
            распространение материалов без письменного разрешения запрещено.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">4. Ограничение ответственности</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Исполнитель не несёт ответственности за косвенные, случайные или последующие убытки,
            возникшие в результате использования или невозможности использования услуг. Совокупная
            ответственность Исполнителя ограничена суммой оплаченных Заказчиком услуг по
            соответствующему проекту.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">5. Гарантии</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Услуги оказываются на основе профессионального опыта и добросовестности. Исполнитель
            не даёт гарантий конкретных коммерческих результатов, которые зависят от множества
            факторов, находящихся вне его контроля.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">6. Оплата и возврат средств</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Оплата производится согласно согласованным условиям. Возврат средств обсуждается
            индивидуально по каждому проекту. Отмена услуг требует письменного уведомления.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">7. Конфиденциальность</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Исполнитель обязуется сохранять конфиденциальность информации, предоставленной клиентами.
            Подробности описаны в{" "}
            <Link href="/legal/privacy-policy" className="text-crimson hover:underline">
              Политике конфиденциальности
            </Link>.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">8. Изменение условий</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Исполнитель оставляет за собой право изменять данные условия. Изменения вступают в силу
            после публикации на сайте. Продолжение использования услуг означает принятие обновлённых
            условий.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">9. Применимое право</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Данные условия регулируются законодательством Российской Федерации. Споры разрешаются
            в судах по месту нахождения Исполнителя.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">10. Претензионный порядок</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            До обращения в суд стороны обязуются направить письменную претензию по email или
            заказным письмом. Срок рассмотрения претензии — 30 календарных дней с момента получения.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">11. Форс-мажор</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Стороны освобождаются от ответственности за неисполнение обязательств, если оно вызвано
            обстоятельствами непреодолимой силы (стихийные бедствия, действия органов власти,
            масштабные сбои инфраструктуры и иные события, не зависящие от воли сторон). О
            наступлении таких обстоятельств сторона обязана уведомить другую сторону незамедлительно.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">12. Электронный документооборот</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Стороны признают юридическую силу переписки по электронной почте и в мессенджерах
            (при условии однозначной идентификации отправителя) наравне с документами на бумажном
            носителе.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">13. Контактная информация</h2>
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
