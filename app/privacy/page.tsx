import Link from 'next/link';

export default function Privacy() {
  return (
    <main className="main-container section-padding" style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
        <h1>นโยบายความเป็นส่วนตัว (Privacy Policy)</h1>
        <p>ที่ The Daily Foodie เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ นโยบายฉบับนี้อธิบายถึงวิธีที่เราดำเนินการกับข้อมูลส่วนบุคคลของคุณ ตามหลักสากลและ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)</p>
        
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginTop: '2rem' }}>1. การเก็บรวบรวมข้อมูล</h3>
          <p>เราอาจจัดเก็บข้อมูลพื้นฐาน เช่น ประวัติการคลิกดูโปรโมชันผ่านแพลตฟอร์ม LINE เพื่อนำมาพัฒนาบริการและเสนอสิ่งที่ดีที่สุดสำหรับคุณ</p>
          
          <h3 style={{ marginTop: '2rem' }}>2. การใช้งานข้อมูล</h3>
          <p>ข้อมูลที่ได้จะนำไปใช้วิเคราะห์และปรับปรุงประสิทธิภาพของระบบ ไม่มีการนำไปจำหน่ายหรือส่งต่อให้บุคคลที่ 3 ที่ไม่เกี่ยวข้องโดยเด็ดขาด</p>
          
          <h3 style={{ marginTop: '2rem' }}>3. สิทธิของคุณ</h3>
          <p>คุณสามารถขอยกเลิกการรับข่าวสารหรือบล็อก (Block) LINE Official Account ของเราได้ตลอดเวลา หากไม่ต้องการรับข้อมูลเพิ่มเติม</p>
        </div>

        <Link href="/" className="btn-primary" style={{ marginTop: '3rem' }}>กลับสู่หน้าหลัก</Link>
      </div>
    </main>
  );
}
