import Link from 'next/link';

export default function About() {
  return (
    <main className="main-container section-padding" style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
        <h1>เกี่ยวกับเรา (About Us)</h1>
        <div style={{ marginTop: '2rem' }}>
          <p><strong>The Daily Foodie</strong> คือโครงการที่พัฒนาโดยทีม Developer "BizXThai" มีวัตถุประสงค์เพื่อนำเสนอแพลตฟอร์มบอทอัจฉริยะบน LINE ที่จะช่วยคัดสรรโปรโมชันร้านอาหารเดลิเวอรี่รอบตัวคุณ</p>
          <p>เราเข้าใจถึงปัญหา "วันนี้กินอะไรดี?" และการต้องคอยสลับแอปพลิเคชันเพื่อหาดีลที่คุ้มค่าที่สุด เราจึงพัฒนาระบบนี้ขึ้นเพื่อรวบรวมและวิเคราะห์ข้อมูลให้คุณโดยอัตโนมัติ พร้อมส่งตรงถึงหน้าจอแชทของคุณทุกวัน</p>
        </div>
        <Link href="/" className="btn-primary" style={{ marginTop: '2rem' }}>กลับสู่หน้าหลัก</Link>
      </div>
    </main>
  );
}
