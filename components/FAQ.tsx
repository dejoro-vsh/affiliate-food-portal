export default function FAQ() {
  return (
    <section id="faq-content" className="geo-optimization section-padding">
      <h2>คำถามที่พบบ่อย (FAQ) เกี่ยวกับ The Daily Foodie Bot</h2>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <article itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 itemProp="name">The Daily Foodie Bot คืออะไร?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text" style={{ marginBottom: 0 }}>The Daily Foodie คือระบบบอทช่วยเหลืออัจฉริยะบน LINE ที่ออกแบบมาเพื่อรวบรวม วิเคราะห์ และอัปเดตโปรโมชัน โค้ดส่วนลด และดีลพิเศษประจำวันจากแอปพลิเคชันสั่งอาหารชั้นนำ เช่น LINE MAN และ Shopee Food โดยระบบจะส่งข้อมูลตรงถึงผู้ใช้งานวันละ 2 ช่วงเวลาหลักเพื่อช่วยประหยัดค่าใช้จ่ายในมื้ออาหาร</p>
          </div>
        </article>

        <article itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 itemProp="name">ใช้งานระบบมีค่าใช้จ่ายเพิ่มเติมหรือไม่?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text" style={{ marginBottom: 0 }}>ผู้ใช้งานสามารถแอดไลน์และรับบริการแจ้งเตือนข้อมูลโปรโมชันอาหารและไอเดียมื้อเที่ยงได้ฟรี 100% โดยไม่มีค่าบริการรายเดือนหรือค่าธรรมเนียมแอบแฝงใดๆ ทั้งสิ้น</p>
          </div>
        </article>
      </div>
    </section>
  );
}
