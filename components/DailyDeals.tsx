import { getDailyDeals } from '@/data/mockDeals';
import Link from 'next/link';

export default function DailyDeals() {
  const deals = getDailyDeals();

  return (
    <section id="deals" className="section-padding">
      <h2>ดีลเด็ดประจำวัน (Today's Active Deals)</h2>
      <div className="grid md:grid-cols-3">
        {deals.map((deal) => (
          <article key={deal.id} style={{ 
            backgroundColor: 'var(--surface-color)', 
            borderRadius: 'var(--radius-lg)', 
            overflow: 'hidden', 
            boxShadow: 'var(--shadow-md)' 
          }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={deal.image} 
                alt={deal.restaurant} 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
              />
              <span style={{ 
                position: 'absolute', 
                top: '1rem', 
                right: '1rem', 
                backgroundColor: deal.app === 'LINE MAN' ? 'var(--primary-color)' : 'var(--secondary-color)', 
                color: 'white', 
                padding: '0.25rem 0.75rem', 
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}>
                {deal.app}
              </span>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {deal.restaurant}
                <span style={{ color: '#ef4444', fontSize: '1rem', fontWeight: 700 }}>{deal.discount}</span>
              </h3>
              <p>{deal.description}</p>
              <Link href="#" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                รับสิทธิ์ผ่าน LINE
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
