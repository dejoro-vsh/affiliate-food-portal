'use client';

import React, { useState, useEffect } from 'react';
import styles from './admin.module.css';

export default function AdminPanel() {
  const [dealForm, setDealForm] = useState({
    title: 'ส่วนลด 70% ลดสูงสุด ฿400',
    price: 'กรอกโค้ดลดทันที',
    emoji: '🔥',
    discount: 'NEWJUN8ALL',
    url: 'https://spf.shopee.co.th/XXX'
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  // This JSON is generated live
  const flexJson = {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": "https://img.freepik.com/free-vector/special-offer-modern-sale-banner-template_1017-20667.jpg",
      "size": "full",
      "aspectRatio": "20:13",
      "aspectMode": "cover",
      "action": {
        "type": "uri",
        "uri": dealForm.url
      }
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": dealForm.title,
          "weight": "bold",
          "size": "xl"
        },
        {
          "type": "text",
          "text": `โค้ด: ${dealForm.discount}`,
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
            "uri": dealForm.url
          }
        }
      ],
      "flex": 0
    }
  };

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
      baitDeals: [
        {
          id: 1,
          title: dealForm.title,
          price: dealForm.price,
          emoji: dealForm.emoji,
          discount: dealForm.discount,
          url: dealForm.url
        }
      ]
    };

    try {
      const res = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if(result.status === 'success') {
        setMessage('บันทึกขึ้นหน้า Deals.bizxthai.com สำเร็จแล้ว!');
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
          <h2 className={styles.panelTitle}>1. สร้างและอัปเดตดีล (Bait Deal)</h2>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>หัวข้อแคมเปญ / โค้ดส่วนลด (Title)</label>
            <input 
              className={styles.input} 
              value={dealForm.title}
              onChange={(e) => setDealForm({...dealForm, title: e.target.value})}
              placeholder="เช่น ส่วนลด 70% ลดสูงสุด 400"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>รหัสโค้ด (Discount Code / Badge)</label>
            <input 
              className={styles.input} 
              value={dealForm.discount}
              onChange={(e) => setDealForm({...dealForm, discount: e.target.value})}
              placeholder="เช่น NEWJUN8ALL"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>ลิงก์ Affiliate (Target URL)</label>
            <input 
              className={styles.input} 
              value={dealForm.url}
              onChange={(e) => setDealForm({...dealForm, url: e.target.value})}
              placeholder="แปะลิงก์จาก Ecomobi หรือ Shopee ที่นี่"
            />
          </div>

          <button className={styles.btn} onClick={handleSaveToLanding} disabled={saving}>
            {saving ? 'กำลังอัปเดต...' : 'บันทึกอัปเดตขึ้นหน้าเว็บ (Landing Page)'}
          </button>
          {message && <p style={{marginTop: '10px', color: '#06c755', fontWeight: 'bold'}}>{message}</p>}
        </div>

        {/* Right Column: Preview & JSON */}
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>2. พรีวิว LINE Flex Message</h2>
          
          <div className={styles.flexPreview}>
            <div className={styles.flexCard}>
              <div className={styles.flexImage}>
                {dealForm.emoji}
                <span className={styles.flexBadge}>PROMO</span>
              </div>
              <div className={styles.flexBody}>
                <div className={styles.flexTitle}>{dealForm.title}</div>
                <div className={styles.flexDesc}>โค้ด: <strong style={{color: '#ee4d2d'}}>{dealForm.discount}</strong></div>
                <div className={styles.flexBtn}>เก็บโค้ดเลย!</div>
              </div>
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
