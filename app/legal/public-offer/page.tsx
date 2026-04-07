import Link from "next/link";

export const metadata = {
  title: "Публичная оферта — Polishchuk AI Systems",
};

export default function PublicOffer() {
  return (
    <>
      <h1 className="font-space-grotesk font-bold text-charcoal text-3xl md:text-4xl mb-2">
        Публичная оферта
      </h1>
      <p className="text-taupe text-sm mb-10">Дата актуальности: 07.04.2026</p>

      <section className="space-y-8 text-charcoal">
        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">1. Общие положения</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Настоящая публичная оферта адресована физическим и юридическим лицам («Заказчик») и
            содержит условия оказания услуг консалтинга и разработки AI-решений. Исполнитель —
            самозанятый Полищук Артём Викторович, ИНН 616204739770, плательщик налога на
            профессиональный доход (НПД), действующий под брендом Polishchuk AI Systems.
            Акцептом оферты считается оплата счёта или подписание договора-заявки.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">2. Услуги</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Polishchuk AI Systems предоставляет следующие услуги:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe">
            <li>Консультации в области AI и архитектуры решений</li>
            <li>Разработку и оркестрацию AI-систем</li>
            <li>Масштабирование и оптимизацию существующих решений</li>
            <li>Обучение и поддержку в использовании инструментов</li>
          </ul>
          <p className="font-inter font-light text-taupe leading-relaxed mt-3">
            Общие условия использования сайта описаны в{" "}
            <Link href="/legal/terms-of-service" className="text-crimson hover:underline">
              Условиях использования
            </Link>.
            Обработка данных — в{" "}
            <Link href="/legal/privacy-policy" className="text-crimson hover:underline">
              Политике конфиденциальности
            </Link>.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">3. Стоимость услуг</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Стоимость определяется индивидуально в зависимости от объёма, сложности и сроков
            проекта. Заказчик получает оценку стоимости до подтверждения заказа.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">4. Порядок оплаты</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Заказчик обязуется оплатить услуги согласно выставленному счёту. Сроки и порядок оплаты
            согласовываются индивидуально. Исполнитель, являясь самозанятым (НПД), выдаёт чек
            через приложение «Мой налог» в течение одного рабочего дня после получения оплаты.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">5. Сроки выполнения</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Сроки указываются в договоре-заявке. Исполнитель уведомляет Заказчика о возможных
            задержках заблаговременно.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">6. Приёмка работ</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            По завершении работ Исполнитель направляет Заказчику результат и/или акт выполненных
            работ. Заказчик обязан рассмотреть результат в течение 5 рабочих дней. При отсутствии
            мотивированных возражений в указанный срок работы считаются принятыми. Мотивированные
            возражения направляются по email с описанием конкретных несоответствий.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">7. Гарантийные обязательства</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Исполнитель гарантирует исправление дефектов в течение 14 календарных дней после
            приёмки, если дефект вызван действиями или упущениями Исполнителя. Гарантия не
            распространяется на изменения, внесённые Заказчиком самостоятельно после приёмки.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">8. Ответственность сторон</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Исполнитель не несёт ответственности за убытки, возникшие вследствие неправильного
            использования результатов работ Заказчиком. Совокупная ответственность Исполнителя
            ограничена суммой оплаченных Заказчиком услуг по соответствующему проекту.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">9. Конфиденциальность</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Обе стороны обязуются сохранять конфиденциальность всей информации, полученной в ходе
            оказания услуг, и не передавать её третьим лицам без письменного согласия другой стороны.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">10. Интеллектуальная собственность</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Результаты работ остаются интеллектуальной собственностью Исполнителя до момента
            полной оплаты. После оплаты права передаются Заказчику в объёме, согласованном в
            договоре-заявке.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">11. Прекращение договора</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Расторжение возможно по взаимному соглашению или в соответствии с законодательством
            Российской Федерации. При расторжении Заказчик обязан оплатить фактически выполненные работы.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">12. Форс-мажор</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Стороны освобождаются от ответственности за неисполнение обязательств, вызванное
            обстоятельствами непреодолимой силы: стихийные бедствия, действия органов власти,
            масштабные сбои инфраструктуры и иные события вне контроля сторон. Сторона, столкнувшаяся
            с форс-мажором, обязана уведомить другую сторону незамедлительно.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">13. Электронный документооборот</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Стороны признают юридическую силу переписки по электронной почте и в мессенджерах
            (при условии однозначной идентификации отправителя) наравне с документами на бумажном
            носителе.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">14. Претензионный порядок</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            До обращения в суд стороны обязуются направить письменную претензию по email или
            заказным письмом. Срок рассмотрения — 30 календарных дней с момента получения.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">15. Применимое право</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Договор регулируется законодательством Российской Федерации. Споры разрешаются в судах
            по месту нахождения Исполнителя.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">16. Контактная информация</h2>
          <ul className="list-none space-y-1 font-inter font-light text-taupe">
            <li>Исполнитель: Полищук Артём Викторович</li>
            <li>Статус: Самозанятый, плательщик налога на профессиональный доход (НПД)</li>
            <li>ИНН: 616204739770</li>
            <li>Регион деятельности: г. Москва</li>
            <li>Email: <a href="mailto:a.polishchuk21@yandex.com" className="text-crimson hover:underline">a.polishchuk21@yandex.com</a></li>
            <li>Telegram: <a href="https://t.me/spaces_love" className="text-crimson hover:underline" target="_blank" rel="noopener noreferrer">@spaces_love</a></li>
          </ul>
        </div>
      </section>
    </>
  );
}
