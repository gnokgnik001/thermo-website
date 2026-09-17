// Prerender: สร้างไฟล์ HTML static ต่อ 1 route จาก content.js
// - meta (title/desc/canonical/hreflang/og) เฉพาะหน้า
// - เนื้อหาจริงฝังใน #root (บอตที่ไม่ render JS เห็น) — React จะ render ทับตอนผู้ใช้เปิด
// - JSON-LD เฉพาะหน้า (BlogPosting / BreadcrumbList) แทน @graph ของหน้าแรกในหน้าใน
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const templatePath = path.join(distDir, 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');

const C = await import(pathToFileURL(path.join(root, 'src', 'content.js')).href);
const SITE = C.SITE_URL;
const t = { th: C.translations.th, en: C.translations.en };
// หน้าเครื่องคำนวณขนาดห้องเย็น — ไฟล์ static แยกจาก React อยู่ที่ public_html/tools/cold-room-calculator/
const TOOL_PATH = '/tools/cold-room-calculator/';

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const escText = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---- routing (คัดลอกจาก App.tsx ให้ path ตรงเป๊ะ) ----
// หมายเหตุ: เติม "/" ท้าย path เสมอ (ยกเว้นหน้าแรก "/") เพราะ writePage()
// สร้างไฟล์แบบโฟลเดอร์เสมอ (เช่น services/coldroom/index.html) ถ้า
// canonical/hreflang/sitemap ไม่มี "/" ท้าย Apache (mod_dir) จะ 301
// เติมให้เองตอน crawl จริง กลายเป็น redirect ซ้อนโดยไม่จำเป็น —
// ต้องให้ URL ที่ประกาศ "ตรง" กับ URL ที่โหลดจบแบบ 200 ทันทีเสมอ
const routeToPath = (page, id, lang = 'th') => {
  const prefix = lang === 'en' ? '/en' : '';
  let p;
  if (page === 'services') p = id ? `${prefix}/services/${id}` : `${prefix}/services`;
  else if (page === 'portfolio') p = `${prefix}/portfolio`;
  else if (page === 'knowledge') p = `${prefix}/knowledge`;
  else if (page === 'article') p = id ? `${prefix}/knowledge/${id}` : `${prefix}/knowledge`;
  else if (page === 'careers') p = `${prefix}/careers`;
  else p = prefix === '' ? '/' : prefix;
  return p === '/' ? p : `${p}/`;
};

// ---- meta (mirror App.tsx) ----
function metaFor(page, id, lang) {
  let title = '', desc = '';
  if (page === 'home') {
    if (lang === 'th') {
      title = 'THERMO Co., Ltd. | ผู้เชี่ยวชาญระบบทำความเย็นอุตสาหกรรม ห้องเย็น ชิลเลอร์';
      desc = 'บริษัท เทอร์โม จำกัด - ออกแบบ ติดตั้ง และบำรุงรักษาระบบทำความเย็นอุตสาหกรรม ห้องเย็นสำเร็จรูป และเครื่องทำน้ำเย็นชิลเลอร์ประสิทธิภาพสูง ให้บริการตั้งแต่ปี 2530 ผลงานกว่า 2,000 โครงการทั่วประเทศ';
    } else {
      title = 'THERMO Co., Ltd. | Industrial Cooling Systems, Cold Room & Chiller Specialists';
      desc = 'THERMO Co., Ltd. - Industrial refrigeration, turnkey cold rooms and process chillers since 1987. Over 2,000 projects delivered across Thailand.';
    }
  } else if (page === 'services') {
    const svc = C.servicesData.find(s => s.id === id);
    const tl = t[lang];
    title = svc ? `${tl[svc.titleKey]} | THERMO Co., Ltd.` : (lang === 'th' ? 'บริการของเรา | THERMO Co., Ltd.' : 'Our Services | THERMO Co., Ltd.');
    desc = svc ? tl[svc.descKey] : (lang === 'th' ? 'บริการออกแบบ ติดตั้งระบบทำความเย็น' : 'Industrial cooling system engineering and setup services.');
  } else if (page === 'careers') {
    if (lang === 'th') { title = 'ร่วมงานกับเรา | THERMO Co., Ltd.'; desc = 'ร่วมงานกับ THERMO ผู้เชี่ยวชาญระบบทำความเย็นอุตสาหกรรม ตั้งแต่ปี 1987 — งานออกแบบเฉพาะโครงการ ตั้งแต่คลังสินค้าสนามบินถึงรีสอร์ตต่างประเทศ'; }
    else { title = 'Careers | THERMO Co., Ltd.'; desc = 'Join THERMO, industrial refrigeration specialists since 1987 — bespoke engineering from airport cargo terminals to overseas resorts.'; }
  } else if (page === 'portfolio') {
    if (lang === 'th') { title = 'ผลงานและโครงการอ้างอิง | THERMO Co., Ltd.'; desc = 'ชมผลงานการติดตั้งระบบห้องเย็นและระบบปรับอากาศอุตสาหกรรมจากเวทีจริงระดับประเทศของบริษัท เทอร์โม จำกัด'; }
    else { title = 'Our Portfolio & Projects | THERMO Co., Ltd.'; desc = 'Explore our track record of high-performance cold storage and industrial refrigeration installations.'; }
  } else if (page === 'knowledge') {
    if (lang === 'th') { title = 'คลังความรู้ระบบทำความเย็น | THERMO Co., Ltd.'; desc = 'รวมบทความ เทคนิควิศวกรรมความเย็น และการบำรุงรักษาระบบทำความเย็นสำหรับโรงงานอุตสาหกรรม'; }
    else { title = 'Knowledge Center | THERMO Co., Ltd.'; desc = 'Technical refrigeration guides, chiller guides, and energy saving tips from THERMO engineers.'; }
  } else if (page === 'article') {
    const art = C.articlesList.find(a => a.id === id);
    if (lang === 'th') { title = art ? `${art.titleTh} | THERMO Co., Ltd.` : 'คลังความรู้ | THERMO Co., Ltd.'; desc = art ? art.excerptTh : 'บทความระบบทำความเย็นอุตสาหกรรม'; }
    else { title = art ? `${art.titleEn} | THERMO Co., Ltd.` : 'Knowledge Base | THERMO Co., Ltd.'; desc = art ? art.excerptEn : 'Industrial refrigeration technical articles.'; }
  }
  return { title, desc };
}

// ---- JSON-LD ต่อหน้า (สำหรับหน้าใน) ----
function jsonLdFor(page, id, lang, url, title) {
  const graph = [];
  graph.push({
    "@type": "Organization",
    "@id": SITE + "/#organization",
    "name": "THERMO Co., Ltd.",
    "url": SITE,
    "logo": { "@type": "ImageObject", "url": SITE + "/logo.png" }
  });
  if (page === 'article') {
    const art = C.articlesList.find(a => a.id === id);
    if (art) {
      graph.push({
        "@type": "BlogPosting",
        "@id": url + "#article",
        "headline": lang === 'th' ? art.titleTh : art.titleEn,
        "description": lang === 'th' ? art.excerptTh : art.excerptEn,
        "articleSection": lang === 'th' ? art.categoryTh : art.categoryEn,
        "inLanguage": lang === 'th' ? 'th-TH' : 'en-US',
        ...(art.datePublishedISO ? { "datePublished": art.datePublishedISO, "dateModified": art.dateModifiedISO } : {}),
        "image": SITE + '/' + art.imgName,
        "mainEntityOfPage": { "@type": "WebPage", "@id": url },
        "author": { "@type": "Organization", "name": "THERMO Co., Ltd.", "url": SITE },
        "publisher": { "@type": "Organization", "name": "THERMO Co., Ltd.", "logo": { "@type": "ImageObject", "url": SITE + "/logo.png" } }
      });
    }
  }
  // breadcrumb
  const crumbs = [{ name: lang === 'th' ? 'หน้าแรก' : 'Home', item: SITE + routeToPath('home', null, lang) }];
  if (page === 'article') {
    crumbs.push({ name: lang === 'th' ? 'คลังความรู้' : 'Knowledge', item: SITE + routeToPath('knowledge', null, lang) });
    const art = C.articlesList.find(a => a.id === id);
    if (art) crumbs.push({ name: lang === 'th' ? art.titleTh : art.titleEn, item: url });
  } else if (page !== 'home') {
    crumbs.push({ name: title.split('|')[0].trim(), item: url });
  }
  if (crumbs.length > 1) {
    graph.push({ "@type": "BreadcrumbList", "itemListElement": crumbs.map((c, i) => ({ "@type": "ListItem", "position": i + 1, "name": c.name, "item": c.item })) });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

// ---- เนื้อหา static ต่อหน้า (ฝังใน #root) ----
function renderMarkdown(md) {
  return renderToStaticMarkup(React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, md));
}

function contentFor(page, id, lang) {
  const wrap = (inner) => `<main style="max-width:840px;margin:0 auto;padding:24px;font-family:sans-serif;line-height:1.7;color:#0B2E5F">${inner}</main>`;
  const homeLink = `<a href="${routeToPath('home', null, lang)}">${lang === 'th' ? 'หน้าแรก' : 'Home'}</a>`;

  if (page === 'article') {
    const src = C.articles.find(a => a.id === id);
    const art = C.articlesList.find(a => a.id === id);
    if (!art) return wrap('');
    const titleTxt = lang === 'th' ? art.titleTh : art.titleEn;
    const excerpt = lang === 'th' ? art.excerptTh : art.excerptEn;
    const md = src && src.bodyMarkdown ? (lang === 'th' ? src.bodyMarkdown.th : src.bodyMarkdown.en) : null;
    let body;
    if (md) body = renderMarkdown(md);
    else {
      const paras = lang === 'th' ? art.contentTh : art.contentEn;
      body = (paras || []).map(p => `<p>${escText(p)}</p>`).join('\n');
    }
    return wrap(`<nav><a href="${routeToPath('knowledge', null, lang)}">${lang === 'th' ? 'คลังความรู้' : 'Knowledge'}</a></nav>
<article><h1>${escText(titleTxt)}</h1><p><em>${escText(excerpt)}</em></p>${body}</article>`);
  }

  if (page === 'services') {
    const svc = C.servicesData.find(s => s.id === id);
    const tl = t[lang];
    const stitle = svc ? tl[svc.titleKey] : '';
    const sdesc = svc ? tl[svc.descKey] : '';
    const others = C.servicesData.filter(s => s.id !== id)
      .map(s => `<li><a href="${routeToPath('services', s.id, lang)}">${escText(tl[s.titleKey])}</a></li>`).join('');
    // หน้าห้องเย็น: ลิงก์เครื่องคำนวณขนาดห้องเย็น (หน้า static แยก ภาษาไทยอย่างเดียว)
    const toolLink = id === 'coldroom'
      ? `<p>${lang === 'th'
          ? 'ประเมินขนาดเครื่องทำความเย็นเบื้องต้นด้วยตัวเองได้ที่'
          : 'Get a preliminary refrigeration capacity estimate with our'} <a href="${SITE}${TOOL_PATH}">${lang === 'th' ? 'เครื่องคำนวณขนาดห้องเย็นเบื้องต้น' : 'cold room load calculator (Thai)'}</a></p>`
      : '';
    return wrap(`<article><h1>${escText(stitle)}</h1><p>${escText(sdesc)}</p>${toolLink}
<h2>${lang === 'th' ? 'บริการอื่นของ THERMO' : 'Other THERMO services'}</h2><ul>${others}</ul>
<p>${lang === 'th' ? 'ดูผลงาน' : 'See our'} <a href="${routeToPath('portfolio', null, lang)}">${lang === 'th' ? 'ผลงานทั้งหมด' : 'portfolio'}</a> ${lang === 'th' ? 'หรือ' : 'or'} <a href="${routeToPath('knowledge', null, lang)}">${lang === 'th' ? 'คลังความรู้' : 'knowledge base'}</a>.</p></article>`);
  }

  if (page === 'portfolio') {
    const list = (C.portfolioProjectsList || C.projects || []);
    const items = list.map(p => {
      const ti = lang === 'th' ? p.titleTh : p.titleEn;
      const cl = lang === 'th' ? p.clientTh : p.clientEn;
      const lo = lang === 'th' ? p.locationTh : p.locationEn;
      return `<li><strong>${escText(ti)}</strong>${cl ? ' — ' + escText(cl) : ''}${lo ? ', ' + escText(lo) : ''}</li>`;
    }).join('\n');
    const h1 = lang === 'th' ? 'ผลงานและโครงการอ้างอิง' : 'Our Portfolio & Projects';
    return wrap(`<h1>${h1}</h1><ul>${items}</ul>`);
  }

  if (page === 'knowledge') {
    const items = C.articlesList.map(a => {
      const ti = lang === 'th' ? a.titleTh : a.titleEn;
      const ex = lang === 'th' ? a.excerptTh : a.excerptEn;
      return `<li><a href="${routeToPath('article', a.id, lang)}">${escText(ti)}</a> — ${escText(ex)}</li>`;
    }).join('\n');
    const h1 = lang === 'th' ? 'คลังความรู้ระบบทำความเย็น' : 'Knowledge Center';
    return wrap(`<h1>${h1}</h1><ul>${items}</ul>`);
  }

  if (page === 'careers') {
    const cc = C.careersContent || {};
    const pick = (o) => o ? (lang === 'th' ? o.th : o.en) : '';
    const h1 = pick(cc.title) || (lang === 'th' ? 'ร่วมงานกับเรา' : 'Careers');
    const intro = pick(cc.intro) || '';
    let jobs = '';
    if (Array.isArray(cc.openings)) {
      jobs = cc.openings.map(j => {
        const jt = j && (j.title ? pick(j.title) : (typeof j === 'object' ? (lang === 'th' ? j.th : j.en) : j));
        return jt ? `<li>${escText(jt)}</li>` : '';
      }).join('');
    }
    return wrap(`<h1>${escText(h1)}</h1><p>${escText(intro)}</p>${jobs ? `<h2>${lang === 'th' ? 'ตำแหน่งที่เปิดรับ' : 'Open positions'}</h2><ul>${jobs}</ul>` : ''}`);
  }

  // home (EN) — TH home ใช้ template เดิม ไม่ต้องสร้าง
  const tl = t[lang];
  const svcList = C.servicesData.map(s => `<li><a href="${routeToPath('services', s.id, lang)}">${escText(tl[s.titleKey])}</a></li>`).join('');
  const h1 = lang === 'th' ? 'THERMO Co., Ltd. — ผู้เชี่ยวชาญระบบทำความเย็นอุตสาหกรรม ตั้งแต่ปี 1987' : 'THERMO Co., Ltd. — Industrial Cooling System Specialists since 1987';
  const p = metaFor('home', null, lang).desc;
  return wrap(`<h1>${escText(h1)}</h1><p>${escText(p)}</p><h2>${lang === 'th' ? 'บริการ' : 'Services'}</h2><ul>${svcList}</ul>
<p><a href="${routeToPath('portfolio', null, lang)}">${lang === 'th' ? 'ผลงานทั้งหมด' : 'Portfolio'}</a> · <a href="${routeToPath('knowledge', null, lang)}">${lang === 'th' ? 'คลังความรู้' : 'Knowledge'}</a> · <a href="${TOOL_PATH}">${lang === 'th' ? 'เครื่องคำนวณขนาดห้องเย็น' : 'Cold room load calculator (Thai)'}</a></p>`);
}

// ---- ประกอบไฟล์ HTML ต่อ route ----
function buildPage(page, id, lang) {
  const { title, desc } = metaFor(page, id, lang);
  const url = SITE + routeToPath(page, id, lang);
  let html = template;

  html = html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = html.replace(/(<meta name="description" content=")[\s\S]*?("\s*\/?>)/, `$1${esc(desc)}$2`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:title" content=")[\s\S]*?("\s*\/?>)/, `$1${esc(title)}$2`);
  html = html.replace(/(<meta property="og:description" content=")[\s\S]*?("\s*\/?>)/, `$1${esc(desc)}$2`);
  html = html.replace(/(<meta property="og:locale" content=")[^"]*(")/, `$1${lang === 'th' ? 'th_TH' : 'en_US'}$2`);
  html = html.replace(/(<meta name="twitter:title" content=")[\s\S]*?("\s*\/?>)/, `$1${esc(title)}$2`);
  html = html.replace(/(<meta name="twitter:description" content=")[\s\S]*?("\s*\/?>)/, `$1${esc(desc)}$2`);

  // hreflang — เพิ่มก่อน </head>
  const alts = [['th', 'th'], ['en', 'en'], ['x-default', 'th']]
    .map(([code, l]) => `    <link rel="alternate" hreflang="${code}" href="${SITE + routeToPath(page, id, l)}" />`).join('\n');
  html = html.replace('</head>', `${alts}\n  </head>`);

  // JSON-LD เฉพาะหน้า — แทนบล็อก @graph ของหน้าแรก
  const ld = jsonLdFor(page, id, lang, url, title);
  const ldScript = `<script type="application/ld+json">\n${JSON.stringify(ld, null, 2)}\n    </script>`;
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, ldScript);

  // เนื้อหา static ใน #root
  const content = contentFor(page, id, lang);
  html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${content}</div>`);

  return html;
}

function writePage(page, id, lang) {
  const rel = routeToPath(page, id, lang);
  const outPath = path.join(distDir, rel === '/' ? 'index.html' : rel.replace(/^\/|\/$/g, '') + '/index.html');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buildPage(page, id, lang), 'utf8');
  return rel;
}

// ---- routes ----
const langs = ['th', 'en'];
const written = [];
for (const lang of langs) {
  // TH home = template เดิม (ไม่แตะ); EN home = สร้างใหม่
  if (lang === 'en') written.push(writePage('home', null, 'en'));
  for (const s of C.servicesData) written.push(writePage('services', s.id, lang));
  written.push(writePage('portfolio', null, lang));
  written.push(writePage('knowledge', null, lang));
  for (const a of C.articlesList) written.push(writePage('article', a.id, lang));
  written.push(writePage('careers', null, lang));
}
console.log(`✓ prerender: ${written.length} static pages generated`);
