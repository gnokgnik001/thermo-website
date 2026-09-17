/**
 * สร้าง sitemap.xml และ robots.txt อัตโนมัติจาก content.js
 * รันเองทุกครั้งที่ build (ดู package.json)
 *
 * เพิ่มบทความหรือบริการใหม่ใน content.js → sitemap อัปเดตเอง ไม่ต้องมาแก้ไฟล์นี้
 * ถ้าเปลี่ยนโดเมน → แก้ SITE_URL ใน content.js บรรทัดเดียว
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const { SITE_URL, services, articles, companyInfo } = await import(
  'file://' + path.join(root, 'src', 'content.js')
);

const base = String(SITE_URL).replace(/\/+$/, '');
const today = new Date().toISOString().slice(0, 10);

// priority: หน้าแรกสำคัญสุด → บริการ → คลังความรู้/ผลงาน → บทความ
// หมายเหตุ: ทุก loc ที่ไม่ใช่หน้าแรกต้องมี "/" ท้าย ให้ตรงกับ canonical
// ใน gen-prerender.mjs และโครงสร้างไฟล์จริง (services/xxx/index.html)
// ไม่งั้น Apache จะ 301 เติม "/" ให้เองตอน Google crawl จาก sitemap
const urls = [
  { loc: '/', priority: '1.0', changefreq: 'monthly' },
  { loc: '/portfolio/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/knowledge/', priority: '0.8', changefreq: 'weekly' },
  ...services.map(s => ({ loc: `/services/${s.id}/`, priority: '0.9', changefreq: 'monthly' })),
  ...articles.map(a => ({ loc: `/knowledge/${a.id}/`, priority: '0.7', changefreq: 'monthly' })),
  // เครื่องมือ (ไฟล์ static แยกจาก React อยู่ที่ public_html/tools/...) — ภาษาไทยอย่างเดียว
  { loc: '/tools/cold-room-calculator/', priority: '0.8', changefreq: 'monthly' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${base}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const robots = `# robots.txt — THERMO Co., Ltd.
User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;

fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(root, 'public', 'robots.txt'), robots, 'utf8');
const th = (v) => (v && typeof v === 'object' ? (v.th || v.en || '') : String(v || ''));
const llms = `# THERMO Co., Ltd. (บริษัท เทอร์โม จำกัด)

> ผู้เชี่ยวชาญด้านการออกแบบ ติดตั้ง และบำรุงรักษาระบบทำความเย็นอุตสาหกรรมแบบครบวงจร ก่อตั้งปี 1987 ทีมวิศวกรประสบการณ์รวมกว่า 40 ปี ผลงานกว่า 2,000 โครงการ

THERMO ให้บริการห้องเย็น ห้องแช่แข็ง Blast Freezer ระบบชิลเลอร์ ห้องควบคุมความชื้น Wine Cellar ประตูความเร็วสูง และระบบมอนิเตอร์ริ่ง

## บริการ (Services)
${services.map(s => `- [${th(s.title)}](${base}/services/${s.id}/)`).join('\n')}

## เครื่องมือ (Tools)
- [เครื่องคำนวณขนาดห้องเย็นเบื้องต้น (Cold Room Load Calculator, ภาษาไทย)](${base}/tools/cold-room-calculator/): ประเมินขนาดเครื่องทำความเย็นเบื้องต้นสำหรับห้องเย็น ห้องแช่แข็ง และ Blast Freezer จากขนาดห้อง สินค้า อุณหภูมิ และสภาพการใช้งาน พร้อมภาพห้อง 3 มิติ ผลลัพธ์เป็นค่าประมาณ ขนาดสำหรับเลือกซื้อจริงต้องให้วิศวกร THERMO ตรวจสอบ

## คลังความรู้ (Knowledge Base)
${articles.map(a => `- [${th(a.title)}](${base}/knowledge/${a.id}/)`).join('\n')}

## ติดต่อ
- ที่อยู่: ${th(companyInfo.address)}
- โทรศัพท์: ${companyInfo.phone}
- อีเมล: ${companyInfo.email}
- เว็บไซต์: ${base}
`;
fs.writeFileSync(path.join(root, 'public', 'llms.txt'), llms, 'utf8');
console.log(`✓ sitemap.xml (${urls.length} URLs) + robots.txt + llms.txt → ${base}`);
