import styles from './deals.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flash Foodie - ดีลเด็ดวันนี้',
  description: 'รวมแหล่งรวมดีลเด็ด ShopeeFood อัปเดตทุกวัน',
};

// Force dynamic rendering to always fetch fresh data from Redis
export const dynamic = 'force-dynamic';

async function getDeals() {
  try {
    // In App Router, absolute URL is needed for fetch on server, or we can use the domain.
    // However, since it's on Vercel, it's easier to just fetch from the public URL, but we don't hardcode domain.
    // An alternative is to just use Upstash Redis directly in the Server Component.
    const { Redis } = await import('@upstash/redis');
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL || '',
      token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
    });
    const deals = await redis.get('flashfoodie_deals');
    return deals as any;
  } catch (error) {
    console.error("Failed to fetch deals from Redis", error);
    return null;
  }
}

export default async function DealsPage() {
  let data = await getDeals();
  
  // Fallback to defaults if empty
  if (!data || !data.campaigns) {
    data = {
      campaigns: [
        {
          id: 1,
          title: 'รวมโปร 50% ส่งฟรี',
          desc: 'ลดแรงครึ่งราคา พร้อมส่งฟรีถึงหน้าบ้าน',
          icon: '🔥',
          url: 'https://spf.shopee.co.th/183ZTkkN2'
        },
        {
          id: 2,
          title: 'ร้านในโครงการไทยช่วยไทย',
          desc: 'อุดหนุนร้านค้าคนไทย ในราคาประหยัด',
          icon: '🇹🇭',
          url: 'https://spf.shopee.co.th/183ZxqE9q'
        }
      ],
      baitDeals: [
        {
          id: 1,
          title: 'ดีลลับ ลดกระหน่ำ',
          price: 'คลิกดูราคาพิเศษ!',
          emoji: '🍕',
          discount: 'HOT DEAL',
          url: 'https://spf.shopee.co.th/1LdRATAPH9'
        }
      ]
    };
  }

  const { campaigns, baitDeals } = data;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Flash Foodie</h1>
        <p className={styles.subtitle}>รวมดีลเด็ด ShopeeFood อัปเดตทุกวัน คุ้มชัวร์!</p>
      </header>

      <main>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>✨ แคมเปญมาแรง</h2>
          <div className={styles.campaignList}>
            {campaigns.map((camp: any, idx: number) => (
              <a key={idx} href={camp.url} className={styles.campaignCard} target="_blank" rel="noopener noreferrer">
                <div className={styles.campaignIcon}>{camp.icon}</div>
                <div className={styles.campaignInfo}>
                  <div className={styles.campaignName}>{camp.title}</div>
                  <div className={styles.campaignDesc}>{camp.desc}</div>
                </div>
                <div className={styles.campaignArrow}>👉</div>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>⚡ เมนูยั่วๆ ประจำวัน</h2>
          <div className={styles.grid}>
            {baitDeals.map((deal: any, idx: number) => (
              <a key={idx} href={deal.url} className={styles.baitCard} target="_blank" rel="noopener noreferrer">
                <div className={styles.imagePlaceholder}>
                  {deal.emoji}
                  <span className={styles.discountBadge}>{deal.discount}</span>
                </div>
                <div className={styles.baitContent}>
                  <div className={styles.baitTitle}>{deal.title}</div>
                  <div className={styles.baitPrice}>{deal.price}</div>
                  <div className={styles.orderBtn}>กดสั่งเลย</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
