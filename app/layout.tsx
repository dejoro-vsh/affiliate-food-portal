import "./globals.css";

export const metadata = {
  title: "The Daily Foodie: บอทผู้ช่วยดึงโปรโมชันเดลิเวอรี่",
  description: "ระบบบอทอัตโนมัติบนแพลตฟอร์ม LINE ทำหน้าที่ค้นหา สกัดข้อมูล และแจ้งเตือนโปรโมชันเด็ด",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "The Daily Foodie Bot",
              operatingSystem: "LINE Platform",
              applicationCategory: "UtilitiesApplication",
              description:
                "ระบบบอทอัตโนมัติบนแพลตฟอร์ม LINE ทำหน้าที่ค้นหา สกัดข้อมูล และแจ้งเตือนโปรโมชันเด็ดรวมถึงโค้ดส่วนลดจากแอปพลิเคชันสั่งอาหารเดลิเวอรี่ เช่น LINE MAN และ Shopee Food",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "THB",
              },
              author: {
                "@type": "Organization",
                name: "BizXThai Developer Team",
                url: "https://food.bizxthai.com",
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
