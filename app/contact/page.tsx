import Link from 'next/link';

export default function Contact() {
  return (
    <main className="main-container section-padding" style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
        <h1>ติดต่อเรา (Contact Us)</h1>
        <p>หากคุณมีคำถาม ข้อเสนอแนะ หรือต้องการติดต่อเราในเรื่องใดๆ สามารถใช้ช่องทางด้านล่างนี้ได้เลยครับ</p>
        <ul style={{ margin: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--bg-color)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <strong>อีเมลติดต่อ:</strong> 
            <a href="mailto:contact@bizxthai.com" style={{ color: 'var(--primary-dark)', fontWeight: 500 }}>contact@bizxthai.com</a>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <strong>LINE Official Account:</strong> 
            <Link href="https://line.me/R/ti/p/@099kzkta" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', fontWeight: 500 }}>@099kzkta (เพิ่มเพื่อน)</Link>
          </li>
        </ul>
        <Link href="/" className="btn-primary">กลับสู่หน้าหลัก</Link>
      </div>
    </main>
  );
}
