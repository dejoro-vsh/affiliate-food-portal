import styles from './deals.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flash Foodie - ดีลเด็ดวันนี้',
  description: 'รวมแหล่งรวมดีลเด็ด ShopeeFood อัปเดตทุกวัน',
};

export default function DealsPage() {
  const campaigns = [
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
  ];

  const baitDeals = [
    {
      id: 1,
      title: 'ดีลลับ ลดกระหน่ำ',
      price: 'คลิกดูราคาพิเศษ!',
      emoji: '🍕',
      discount: 'HOT DEAL',
      url: 'https://spf.shopee.co.th/1LdRATAPH9'
    }
  ];

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
            {campaigns.map(camp => (
              <a key={camp.id} href={camp.url} className={styles.campaignCard} target="_blank" rel="noopener noreferrer">
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
            {baitDeals.map(deal => (
              <a key={deal.id} href={deal.url} className={styles.baitCard} target="_blank" rel="noopener noreferrer">
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
