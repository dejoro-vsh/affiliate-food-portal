import Link from 'next/link';

export default function TrustSignals() {
  return (
    <footer style={{ 
      backgroundColor: 'var(--surface-color)', 
      borderTop: '1px solid var(--border-color)', 
      padding: '4rem 1rem 2rem',
      marginTop: '4rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="grid md:grid-cols-3" style={{ marginBottom: '3rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>The Daily Foodie</h3>
            <p>โครงการพัฒนาเครื่องมืออัตโนมัติโดยทีม Developer เพื่ออำนวยความสะดวกในการเลือกซื้อมื้ออาหารและช่วยคุณประหยัดทุกมื้อ</p>
          </div>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>ลิงก์ที่เกี่ยวข้อง</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link href="/about">เกี่ยวกับเรา (About Us)</Link></li>
              <li><Link href="/contact">ติดต่อเรา (Contact Us)</Link></li>
              <li><Link href="/privacy">นโยบายความเป็นส่วนตัว (Privacy Policy)</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>ติดต่อ</h3>
            <p>อีเมล: contact@bizxthai.com</p>
            <Link href="#" className="btn-primary" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
              เพิ่มเพื่อน LINE OA
            </Link>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} The Daily Foodie by BizXThai Developer Team. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
