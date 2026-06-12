export const mockDeals = [
  {
    id: 1,
    restaurant: "เจ๊ไฝ ซีฟู้ด",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400",
    discount: "ลด 40%",
    description: "ไข่เจียวปูระดับมิชลินสตาร์ พร้อมส่งตรงถึงบ้านคุณ",
    app: "LINE MAN"
  },
  {
    id: 2,
    restaurant: "ส้มตำนัว",
    image: "https://images.unsplash.com/photo-1626804475297-4160aae01338?auto=format&fit=crop&q=80&w=400",
    discount: "ซื้อ 1 แถม 1",
    description: "ส้มตำปูปลาร้าแซ่บนัว แถมฟรีไก่ทอดครึ่งตัว",
    app: "Shopee Food"
  },
  {
    id: 3,
    restaurant: "Burger King",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400",
    discount: "ลด 50%",
    description: "วอปเปอร์เนื้อย่างไฟ ชิ้นที่สองลด 50%",
    app: "LINE MAN"
  },
  {
    id: 4,
    restaurant: "Starbucks",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400",
    discount: "ฟรีค่าส่ง",
    description: "เครื่องดื่มเย็นทุกประเภท ส่งฟรีเมื่อสั่งครบ 200 บาท",
    app: "Shopee Food"
  },
  {
    id: 5,
    restaurant: "ข้าวมันไก่ประตูน้ำ",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400",
    discount: "ลด 30%",
    description: "ข้าวมันไก่เนื้อน่อง พร้อมน้ำซุปร้อนๆ",
    app: "LINE MAN"
  },
  {
    id: 6,
    restaurant: "Shabushi",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400",
    discount: "มา 4 จ่าย 3",
    description: "บุฟเฟ่ต์ชาบูและซูชิไม่อั้น อิ่มอร่อยสุดคุ้ม",
    app: "LINE MAN"
  },
  {
    id: 7,
    restaurant: "MK Restaurant",
    image: "https://images.unsplash.com/photo-1580872659132-7236d29994c6?auto=format&fit=crop&q=80&w=400",
    discount: "ลด 100 บาท",
    description: "เซตเป็ดย่างใหญ่ พร้อมสุกี้ชุดประหยัด",
    app: "Shopee Food"
  }
];

export function getDailyDeals() {
  const currentDay = new Date().getDate(); // 1 - 31
  const itemsPerPage = 5;
  
  const startIndex = (currentDay * itemsPerPage) % mockDeals.length;
  
  const dailySelection = mockDeals.slice(startIndex, startIndex + itemsPerPage);
  
  if (dailySelection.length < itemsPerPage) {
    const remainingCount = itemsPerPage - dailySelection.length;
    dailySelection.push(...mockDeals.slice(0, remainingCount));
  }
  
  return dailySelection;
}
