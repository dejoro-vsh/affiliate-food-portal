import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ 
      backgroundColor: 'var(--surface-color)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0.5rem 0'
    }}>
      <div className="main-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '8px', 
            overflow: 'hidden',
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src="/images/flashfoodie.jpg" 
              alt="Flash Foodie Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Flash Foodie
          </span>
        </Link>
        <nav>
          <Link href="/about" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>
            เกี่ยวกับเรา
          </Link>
        </nav>
      </div>
    </header>
  );
}
