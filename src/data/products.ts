import { Product } from "./types";


export const products: Product[] = [
  // Womens 
  { id: "f1", nameKey: "f1", descriptionKey: "f1", price: 109.0, image: "/products/p1.png", category: "womenswear", audience: "womens", fit: { ar: "بطول الكاحل", en: "Ankle-length" }, stock: 12, rating: 4.6 },
  { id: "f2", nameKey: "f2", descriptionKey: "f2", price: 54.99, image: "/products/p2.png", category: "womenswear", audience: "womens", fit: { ar: "قصة ضيقة", en: "Slim Fit" }, stock: 9, rating: 4.4 },
  { id: "f3", nameKey: "f3", descriptionKey: "f3", price: 89.99, image: "/products/p3.png", category: "womenswear", audience: "womens", fit: { ar: "تنورة انسيابية", en: "Flowing skirt" }, stock: 6, rating: 4.8 },
  { id: "f4", nameKey: "f4", descriptionKey: "f4", price: 49.99, image: "/products/p4.png", category: "accessories", audience: "womens", fit: { ar: "واسعة", en: "Spacious" }, stock: 15, rating: 4.3 },
  { id: "f5", nameKey: "f5", descriptionKey: "f5", price: 24.99, image: "/products/p5.png", category: "accessories", audience: "womens", fit: { ar: "مقاس واحد يناسب الجميع", en: "One size fits all" }, stock: 20, rating: 4.1 },
  { id: "f6", nameKey: "f6", descriptionKey: "f6", price: 19.99, image: "/products/p6.png", category: "accessories", audience: "womens", fit: { ar: "خفيفة الوزن", en: "Lightweight" }, stock: 25, rating: 4.2 },

  // Mens
  { id: "f7", nameKey: "f7", descriptionKey: "f7", price: 64.99, image: "/products/p7.jfif", category: "menswear", audience: "mens", fit: { ar: "قصة عادية", en: "Regular Fit" }, stock: 18, rating: 4.5 },
  { id: "f8", nameKey: "f8", descriptionKey: "f8", price: 139.0, image: "/products/p8.jfif", category: "menswear", audience: "mens", fit: { ar: "قصة مفصّلة", en: "Tailored Fit" }, stock: 5, rating: 4.7 },
  { id: "f9", nameKey: "f9", descriptionKey: "f9", price: 99.0, image: "/products/p9.jfif", category: "accessories", audience: "mens", fit: { ar: "مطابق للمقاس القياسي", en: "True to size" }, stock: 10, rating: 4.4 },
  { id: "f10", nameKey: "f10", descriptionKey: "f10", price: 34.99, image: "/products/p10.webp", category: "accessories", audience: "mens", fit: { ar: "مضغوطة", en: "Compact" }, stock: 30, rating: 4.0 },

  // Kids
  { id: "f11", nameKey: "f11", descriptionKey: "f11", price: 29.99, image: "/products/p11.jfif", category: "kidswear", audience: "kids", fit: { ar: "قصة مريحة", en: "Relaxed Fit" }, stock: 22, rating: 4.3 },
  { id: "f12", nameKey: "f12", descriptionKey: "f12", price: 27.5, image: "/products/p12.jfif", category: "kidswear", audience: "kids", fit: { ar: "قماش مطاطي", en: "Stretch Fit" }, stock: 17, rating: 4.2 },
  { id: "f13", nameKey: "f13", descriptionKey: "f13", price: 22.0, image: "/products/p13.jfif", category: "accessories", audience: "kids", fit: { ar: "مطابق للمقاس القياسي", en: "True to size" }, stock: 14, rating: 4.1 },
  { id: "f14", nameKey: "f14", descriptionKey: "f14", price: 18.99, image: "/products/p14.webp", category: "accessories", audience: "kids", fit: { ar: "مقاس واحد يناسب الجميع", en: "One size fits all" }, stock: 27, rating: 4.4 },
];


