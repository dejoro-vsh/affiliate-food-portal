'use client';

import React, { useState } from 'react';
import styles from './admin.module.css';

export default function AdminPanel() {
  const [dealForms, setDealForms] = useState([
    {
      id: Date.now(),
      title: 'ส่วนลด 70% ลดสูงสุด ฿400',
      price: 'กรอกโค้ดลดทันที',
      emoji: '🔥',
      discount: 'NEWJUN8ALL',
      url: 'https://spf.shopee.co.th/XXX'
    }
  ]);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const addDeal = () => {
    setDealForms([
      ...dealForms,
      {
        id: Date.now(),
        title: '',
        price: 'กรอกโค้ดลดทันที',
        emoji: '🎁',
        discount: '',
        url: ''
      }
    ]);
  };

  const removeDeal = (id: number) => {
    if (dealForms.length === 1) {
      alert('ต้องมีอย่างน้อย 1 ดีลครับ');
      return;
    }
    setDealForms(dealForms.filter(deal => deal.id !== id));
  };

  const updateDeal = (id: number, field: string, value: string) => {
    setDealForms(dealForms.map(deal => 
      deal.id === id ? { ...deal, [field]: value } : deal
    ));
  };

  // Generate Flex JSON dynamically
  const generateFlexJson = () => {
    const bubbles = dealForms.map(deal => ({
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": "https://img.freepik.com/free-vector/special-offer-modern-sale-banner-template_1017-20667.jpg",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "action": {
          "type": "uri",
          "uri": deal.url || "https://spf.shopee.co.th"
        }
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": deal.title || "ไม่มีชื่อโปรโมชั่น",
            "weight": "bold",
            "size": "xl",
            "wrap": true
          },
          {
            "type": "text",
            "text": `โค้ด: ${deal.discount || "-"}`,
            "size": "md",
            "color": "#ee4d2d",
            "margin": "md",
            "weight": "bold"
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "style": "primary",
            "height": "sm",
            "color": "#ee4d2d",
            "action": {
              "type": "uri",
              "label": "เก็บโค้ดเลย!",
              "uri": deal.url || "https://spf.shopee.co.th"
            }
          }
        ],
        "flex": 0
      }
    }));

    if (bubbles.length === 1) {
      return bubbles[0];
    }

    return {
      "type": "carousel",
      "contents": bubbles
    };
  };

  const flexJson = generateFlexJson();

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(flexJson, null, 2));
    alert('คัดลอกโค้ด Flex Message เรียบร้อยแล้ว นำไปวางใน LINE OA ได้เลย!');
  };

  const handleSaveToLanding = async () => {
    setSaving(true);
    setMessage('');
    
    // Create payload for the public deals page
    const payload = {
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
      baitDeals: dealForms.map((deal, idx) => ({
        id: idx + 1,
        title: deal.title,
        price: deal.price,
        emoji: deal.emoji,
        discount: deal.discount,
        url: deal.url
      }))
    };

    try {
      const res = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if(result.status === 'success') {
        setMessage('บันทึกขึ้นหน้า Deals.bizxthai.com สำเร็จแล้ว! (ระบบบันทึกไปทั้งหมด ' + dealForms.length + ' รายการ)');
      } else {
        setMessage('เกิดข้อผิดพลาด: ' + result.message);
      }
    } catch(err: any) {
      setMessage('เกิดข้อผิดพลาด: ' + err.message);
    }
    setSaving(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Flash Foodie Control Panel 🛠️</h1>
        <p className={styles.subtitle}>ศูนย์บัญชาการ อัปเดตดีล และสร้าง LINE Flex Message</p>
      </header>

      <div className={styles.grid}>
        {/* Left Column: Form */}
        <div className={styles.panel}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
            <h2 className={styles.panelTitle} style={{ borderBottom: 'none', margin: 0, padding: 0 }}>1. สร้างและอัปเดตดีล (Bait Deal)</h2>
            <button 
              onClick={addDeal}
              style={{ background: '#333', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', border: 'none' }}
            >
              + เพิ่มดีลใหม่
            </button>
          </div>
          
          {dealForms.map((deal, index) => (
            <div key={deal.id} style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #ddd' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: '#ee4d2d' }}>ดีลที่ {index + 1}</h3>
                {dealForms.length > 1 && (
                  <button onClick={() => removeDeal(deal.id)} style={{ background: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', padding: '0.25rem 0.5rem', cursor: 'pointer' }}>
                    ลบทิ้ง
                  </button>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>หัวข้อแคมเปญ / โค้ดส่วนลด (Title)</label>
                <input 
                  className={styles.input} 
                  value={deal.title}
                  onChange={(e) => updateDeal(deal.id, 'title', e.target.value)}
                  placeholder="เช่น ส่วนลด 70% ลดสูงสุด 400"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>รหัสโค้ด (Discount Code / Badge)</label>
                <input 
                  className={styles.input} 
                  value={deal.discount}
                  onChange={(e) => updateDeal(deal.id, 'discount', e.target.value)}
                  placeholder="เช่น NEWJUN8ALL"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>ลิงก์ Affiliate (Target URL)</label>
                <input 
                  className={styles.input} 
                  value={deal.url}
                  onChange={(e) => updateDeal(deal.id, 'url', e.target.value)}
                  placeholder="แปะลิงก์จาก Ecomobi หรือ Shopee ที่นี่"
                />
              </div>
            </div>
          ))}

          <button className={styles.btn} onClick={handleSaveToLanding} disabled={saving}>
            {saving ? 'กำลังอัปเดต...' : `บันทึกอัปเดตขึ้นหน้าเว็บ (${dealForms.length} ดีล)`}
          </button>
          {message && <p style={{marginTop: '10px', color: '#06c755', fontWeight: 'bold'}}>{message}</p>}
        </div>

        {/* Right Column: Preview & JSON */}
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>2. พรีวิว LINE Flex Message ({dealForms.length > 1 ? 'แบบสไลด์ Carousel' : 'แบบการ์ด Bubble'})</h2>
          
          <div className={styles.flexPreview} style={{ overflowX: 'auto', justifyContent: dealForms.length > 1 ? 'flex-start' : 'center', padding: '2rem 1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {dealForms.map((deal) => (
                <div key={deal.id} className={styles.flexCard} style={{ flexShrink: 0 }}>
                  <div className={styles.flexImage}>
                    {deal.emoji}
                    <span className={styles.flexBadge}>PROMO</span>
                  </div>
                  <div className={styles.flexBody}>
                    <div className={styles.flexTitle} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {deal.title || 'ไม่มีชื่อโปรโมชั่น'}
                    </div>
                    <div className={styles.flexDesc}>โค้ด: <strong style={{color: '#ee4d2d'}}>{deal.discount || '-'}</strong></div>
                    <div className={styles.flexBtn}>เก็บโค้ดเลย!</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className={styles.btnSecondary} onClick={handleCopyJson}>
            คัดลอกโค้ด JSON ไปวางใน LINE
          </button>

          <h2 className={styles.panelTitle} style={{marginTop: '2rem'}}>โค้ดดิบ (JSON Code)</h2>
          <textarea 
            className={styles.textarea} 
            readOnly 
            value={JSON.stringify(flexJson, null, 2)} 
          />
        </div>
      </div>
    </div>
  );
}
