export default function Workflow() {
  const steps = [
    {
      step: 1,
      title: "สแกนเพิ่มเพื่อน",
      description: "ผู้ใช้งานทำการเพิ่มเพื่อนระบบ LINE Official Account เพื่อตั้งค่ารับข้อมูล"
    },
    {
      step: 2,
      title: "ระบบประมวลผล",
      description: "บอททำการคำนวณและสกัดโปรโมชันเด็ดรอบตัวในเวลา 11:00 น. และ 17:00 น. ของทุกวัน"
    },
    {
      step: 3,
      title: "รับส่วนลดและสั่งซื้อ",
      description: "ผู้ใช้งานกดรับสิทธิ์ผ่าน Flex Message บน LINE เพื่อเปิดแอปพลิเคชันและทำการสั่งซื้อทันที"
    }
  ];

  return (
    <section className="section-padding">
      <h2>ขั้นตอนการทำงาน (System Workflows)</h2>
      <div className="grid md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.step} style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ 
              width: '3rem', 
              height: '3rem', 
              backgroundColor: 'var(--primary-color)', 
              color: 'white', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              margin: '0 auto 1rem'
            }}>
              {s.step}
            </div>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
