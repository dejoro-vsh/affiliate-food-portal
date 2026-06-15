import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="section-padding" style={{ textAlign: 'center' }}>
      <h1>Flash Foodie: ส่งโปรโมชั่นเดลิเวอรี่ และ ไอเดียอาหารรอบตัวคุณ</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
        รับโปรโมชันสุดคุ้มจากร้านอาหารดังส่งตรงถึง LINE ของคุณทุกวัน ฟรี!
      </p>
      <Link href="#" className="btn-primary" style={{ marginBottom: '3rem' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="LINE" style={{ width: '24px', height: '24px' }} />
        เพิ่มเพื่อนใน LINE
      </Link>
      
      <div style={{ maxWidth: '400px', margin: '0 auto', borderRadius: '1rem', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        <img 
          src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400" 
          alt="LINE Chat Mockup" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />
      </div>
    </section>
  );
}
