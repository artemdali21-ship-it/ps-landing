export const metadata = {
  title: "Публичная оферта — Polishchuk Systems",
};

export default function PublicOffer() {
  return (
    <>
      <h1 className="font-space-grotesk font-bold text-charcoal text-3xl md:text-4xl mb-2">
        Публичная оферта
      </h1>
      <p className="text-taupe text-sm mb-10">Дата актуальности: 06.04.2026</p>

      <section className="space-y-8 text-charcoal">
        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">1. Общие положения</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Данная публичная оферта содержит условия оказания услуг консалтинга и разработки
            AI-решений физическим и юридическим лицам. Акцепт оферты происходит в момент
            совершения клиентом действий, подтверждающих согласие, включая оплату услуг.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">2. Услуги</h2>
          <p className="font-inter font-light text-taupe leading-relaxed mb-3">
            Polishchuk Systems предоставляет следующие услуги:
          </p>
          <ul className="list-disc pl-6 space-y-2 font-inter font-light text-taupe">
            <li>Консультационные услуги в области AI и архитектуры решений</li>
            <li>Разработку и оркестрацию AI-систем</li>
            <li>Масштабирование и оптимизацию существующих решений</li>
            <li>Обучение и поддержку в использовании инструментов</li>
          </ul>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">3. Стоимость услуг</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Стоимость определяется индивидуально в зависимости от объёма, сложности и сроков
            проекта. Клиент получает оценку стоимости до подписания договора.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">4. Порядок оплаты</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Клиент обязуется оплатить услуги согласно выставленному счёту. Сроки и порядок
            оплаты согласовываются индивидуально по каждому проекту.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">5. Сроки выполнения</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Сроки указываются в договоре. Мы стремимся к своевременному выполнению, однако
            непредвиденные обстоятельства могут влиять на сроки — в таких случаях клиент
            уведомляется заблаговременно.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">6. Ответственность сторон</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Мы гарантируем качество работ в соответствии с согласованными требованиями.
            Мы не несём ответственности за убытки, возникшие вследствие неправильного
            использования результатов работ клиентом.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">7. Конфиденциальность</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Обе стороны обязуются сохранять конфиденциальность всей информации, полученной
            в ходе оказания услуг, без письменного согласия другой стороны на передачу
            третьим лицам.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">8. Интеллектуальная собственность</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Результаты работ остаются интеллектуальной собственностью исполнителя до момента
            полной оплаты. После оплаты права передаются клиенту в соответствии с условиями договора.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">9. Прекращение договора</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Расторжение договора возможно по взаимному соглашению сторон или в соответствии
            с законодательством. При расторжении клиент обязан оплатить фактически выполненные работы.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">10. Применимое право</h2>
          <p className="font-inter font-light text-taupe leading-relaxed">
            Договор регулируется законодательством Российской Федерации. Споры разрешаются
            в соответствии с действующим законодательством.
          </p>
        </div>

        <div>
          <h2 className="font-space-grotesk font-semibold text-xl mb-3">11. Контактная информация</h2>
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
