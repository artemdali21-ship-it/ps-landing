import Link from "next/link";

export const metadata = {
  title: "Общие условия оказания услуг — Polishchuk AI Systems",
};

export default function PublicOffer() {
  return (
    <>
      <h1 className="font-space-grotesk font-bold text-charcoal text-3xl md:text-4xl mb-2">
        Общие условия оказания услуг
      </h1>
      <p className="text-taupe text-sm mb-10">Дата актуальности: 07.04.2026</p>

      <section className="space-y-8 text-charcoal">

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">1. Общие положения</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Настоящий документ определяет общие условия оказания услуг (далее — «Условия») самозанятого
            <strong className="font-medium text-charcoal"> Полищук Артёма Викторовича</strong>,
            ИНН 616204739770, плательщика налога на профессиональный доход (НПД), действующего
            под брендом Polishchuk AI Systems (далее — «Исполнитель»), адресованной любому лицу
            (далее — «Заказчик»).
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Оферта адресована как субъектам предпринимательской деятельности (юридическим лицам
            и индивидуальным предпринимателям), так и физическим лицам — потребителям.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Условия, применимые только к субъектам предпринимательской деятельности или только
            к потребителям, отмечены в соответствующих разделах. Заказчик подтверждает, что ознакомился с настоящими Условиями,{" "}
            <Link href="/legal/privacy-policy" className="text-crimson hover:underline">Политикой конфиденциальности</Link>,{" "}
            <Link href="/legal/terms-of-service" className="text-crimson hover:underline">Условиями использования</Link>{" "}
            и{" "}
            <Link href="/legal/cookie-policy" className="text-crimson hover:underline">Cookie Policy</Link>{" "}
            до момента акцепта.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">2. Предмет оферты</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Исполнитель оказывает услуги в области:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe mb-4">
            <li>Консультирования по AI-архитектуре и автоматизации бизнес-процессов</li>
            <li>Проектирования и разработки AI-систем</li>
            <li>Оркестрации, оптимизации и масштабирования решений</li>
            <li>Обучения и сопровождения при внедрении</li>
          </ul>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Конкретный перечень, объём, сроки и стоимость услуг определяются в договоре-заявке,
            согласованном сторонами.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed mt-3">
            Предмет, объём, этапность, сроки и итоговая стоимость определяются индивидуально
            и фиксируются в договоре-заявке.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Ценовые диапазоны, указанные на сайте (например, «от 150 000 ₽»), являются
            <strong className="font-medium text-charcoal"> ориентировочными</strong> и не являются
            фиксированной ценой. Итоговая стоимость определяется индивидуально после разбора задачи.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">3. Принятие условий</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Принятием настоящих Условий является оплата счёта Исполнителя или подписание
            договора-заявки. Принятие означает полное и безоговорочное согласие со всеми настоящими
            Условиями.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Первичная консультация («30 минут. Без обязательств.») не является принятием Условий
            и не создаёт у сторон обязательств по заключению договора.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">4. Стоимость и порядок оплаты</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Стоимость услуг определяется в договоре-заявке. Оплата производится по реквизитам
            Исполнителя (перевод на карту или расчётный счёт).
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Исполнитель, являясь самозанятым (НПД), формирует чек через приложение «Мой налог»
            и направляет его Заказчику в соответствии с требованиями Федерального закона
            № 422-ФЗ «О проведении эксперимента по установлению специального налогового режима».
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">5. Сроки выполнения</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Сроки выполнения работ указываются в договоре-заявке. Исполнитель уведомляет
            Заказчика о возможных задержках заблаговременно.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">6. Порядок оказания услуг и приёмки</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Этапность, сроки и формат результата определяются в договоре-заявке. По завершении
            работ или этапа Исполнитель направляет Заказчику результаты работ и/или акт выполненных
            работ.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Заказчик обязан рассмотреть результат в течение <strong className="font-medium text-charcoal">5 рабочих дней</strong>.
            При отсутствии мотивированных возражений в указанный срок работы считаются принятыми.
            Мотивированные возражения направляются по email с описанием конкретных несоответствий.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">7. Гарантийные обязательства</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Исполнитель гарантирует исправление дефектов в течение{" "}
            <strong className="font-medium text-charcoal">14 календарных дней</strong> после
            приёмки, если дефект возник по вине Исполнителя.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Гарантия не распространяется на: дефекты, вызванные действиями Заказчика или
            третьих лиц; изменения, внесённые Заказчиком самостоятельно после приёмки;
            последствия обстоятельств непреодолимой силы; изменения в сторонних сервисах
            и API, от которых зависит решение.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">8. Ограничение ответственности</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Исполнитель не несёт ответственности за: косвенные убытки и упущенную выгоду;
            результаты самостоятельного внедрения решений Заказчиком без участия Исполнителя;
            действия/бездействие третьих лиц (платформ, API, контрагентов Заказчика).
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            <strong className="font-medium text-charcoal">Для субъектов предпринимательской
            деятельности (B2B):</strong> совокупная ответственность Исполнителя ограничена
            суммой оплаченных Заказчиком услуг по соответствующему проекту.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            <strong className="font-medium text-charcoal">Для физических лиц — потребителей:</strong>{" "}
            ответственность Исполнителя определяется в соответствии с Законом РФ «О защите прав
            потребителей».
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">9. Особые условия для потребителей</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Физическое лицо, являющееся потребителем по смыслу Закона РФ «О защите прав
            потребителей», имеет право на отказ от исполнения договора в любое время при
            условии оплаты Исполнителю фактически понесённых расходов (ст.32 ЗоЗПП).
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            <strong className="font-medium text-charcoal">Порядок возврата:</strong> Заказчик
            направляет письменное заявление на email{" "}
            <a href="mailto:a.polishchuk21@yandex.com" className="text-crimson hover:underline">
              a.polishchuk21@yandex.com
            </a>.
            Исполнитель в течение 10 рабочих дней рассчитывает фактические расходы и возвращает
            разницу.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            <strong className="font-medium text-charcoal">Подсудность для потребителей:</strong>{" "}
            определяется в соответствии со ст.17 Закона РФ «О защите прав потребителей»
            по выбору потребителя.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">10. Отказ от гарантий по AI-системам</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            AI-системы, создаваемые Исполнителем, являются инструментами поддержки принятия
            решений и автоматизации процессов. Исполнитель не гарантирует:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe mb-3">
            <li>100% точность или безошибочность результатов работы AI</li>
            <li>Конкретный коммерческий результат (прибыль, экономию, ROI)</li>
            <li>Непрерывную работу в случае изменений во внешних сервисах, API или AI-моделях</li>
          </ul>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Конечный результат зависит от качества входных данных, среды внедрения, особенностей
            бизнес-процессов и степени участия Заказчика. Заказчик несёт ответственность за
            верификацию результатов AI и принятие финальных решений на их основе.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">11. Интеллектуальная собственность</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Права на результаты работ передаются Заказчику после полной оплаты в объёме,
            согласованном в договоре-заявке.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            <strong className="font-medium text-charcoal">Если договор-заявка не определяет
            объём передаваемых прав:</strong> Заказчику предоставляется неисключительная
            лицензия на использование результатов без ограничения по территории, сроком на
            5 (пять) лет, с правом модификации для собственных нужд.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Исполнитель сохраняет право использовать общие методы, подходы и анонимизированный
            опыт проекта в своей деятельности.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Open-source компоненты, использованные в работе, сохраняют свои оригинальные лицензии.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">12. Конфиденциальность</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Стороны обязуются не разглашать конфиденциальную информацию, полученную в ходе
            сотрудничества. Обязательство действует в течение срока оказания услуг и
            <strong className="font-medium text-charcoal"> 2 лет</strong> после его окончания.
            Конфиденциальной не считается общедоступная информация или информация, полученная
            из иных законных источников.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">13. Прекращение договора</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Расторжение возможно по взаимному соглашению или в соответствии с законодательством
            Российской Федерации. При расторжении Заказчик обязан оплатить фактически выполненные
            работы.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">14. Форс-мажор</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Стороны освобождаются от ответственности за неисполнение обязательств, вызванное
            обстоятельствами непреодолимой силы: стихийные бедствия, военные действия,
            эпидемии, изменения законодательства, действия государственных органов, масштабные
            сбои в работе сетей связи и инфраструктуры.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Сторона, столкнувшаяся с форс-мажором, обязана уведомить другую сторону в течение
            5 рабочих дней. Срок исполнения обязательств продлевается соразмерно времени
            действия форс-мажорных обстоятельств.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">15. Электронный документооборот</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Стороны признают юридическую силу переписки по электронной почте и в мессенджерах
            (при условии однозначной идентификации отправителя) наравне с документами на
            бумажном носителе. Счета, акты и уведомления, направленные в электронной форме,
            имеют полную юридическую силу.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">16. Претензионный порядок и разрешение споров</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            До обращения в суд стороны обязуются направить письменную претензию на email{" "}
            <a href="mailto:a.polishchuk21@yandex.com" className="text-crimson hover:underline">
              a.polishchuk21@yandex.com
            </a>.
            Срок рассмотрения претензии — <strong className="font-medium text-charcoal">30 календарных дней</strong>{" "}
            с момента получения.
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            <strong className="font-medium text-charcoal">Для субъектов предпринимательской
            деятельности:</strong> споры рассматриваются в суде по месту нахождения Исполнителя
            (г. Москва).
          </p>
          <p className="font-inter font-light text-taupe leading-relaxed">
            <strong className="font-medium text-charcoal">Для потребителей — физических лиц:</strong>{" "}
            в соответствии со ст.17 Закона РФ «О защите прав потребителей» по выбору потребителя.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">17. Применимое право</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Настоящая Оферта и все отношения, возникающие из неё, регулируются законодательством
            Российской Федерации.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">18. Контактная информация</h2>
          <ul className="list-none space-y-1 font-inter font-light text-taupe mb-4">
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
