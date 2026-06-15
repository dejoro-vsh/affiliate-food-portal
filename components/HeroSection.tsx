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
      

    </section>
  );
}
