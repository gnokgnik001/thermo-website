/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { sendQuote, prewarmMailer } from './sendQuote';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Globe, 
  ArrowRight, 
  Snowflake, 
  ShieldCheck, 
  Leaf, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Activity, 
  ChevronRight, 
  Award, 
  Users, 
  BookOpen,
  Calendar,
  Layers,
  Thermometer,
  Shield,
  Briefcase,
  CheckSquare,
  Smile,
  Map,
  Facebook,
  Youtube,
  Linkedin,
  ArrowUpRight,
  Headset
} from 'lucide-react';

import { SITE_URL, translations, servicesData, projectsData, whyChooseUsData, articlesData, statsData, articlesList, lineConfig, companyInfo } from './content';
import { ImageWithFallback } from './components/ImageWithFallback';
import { Careers } from './components/Careers';
import { QuoteModal } from './components/QuoteModal';
import { ServiceModal } from './components/ServiceModal';
import { ServiceDetail } from './components/ServiceDetail';
import { Portfolio } from './components/Portfolio';
import { KnowledgeList } from './components/KnowledgeList';
import { ArticleDetail } from './components/ArticleDetail';
import { FloatingActions } from './components/FloatingActions';

// Animated Counter Component
function AnimatedCounter({ value, duration = 1500 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = React.useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setHasStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    
    // รองรับตัวเลขมีคอมมา เช่น "2,000+"
    const match = value.match(/^(\d[\d,]*)/);
    if (!match) {
      return;
    }
    
    const target = parseInt(match[1].replace(/,/g, ''), 10);
    let startTimestamp: number | null = null;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [hasStarted, value, duration]);

  const numPart = value.match(/^(\d[\d,]*)/);
  if (!numPart) {
    return <span ref={elementRef}>{value}</span>;
  }
  const hasComma = numPart[1].includes(',');
  const suffix = value.slice(numPart[1].length);
  const shown = hasStarted ? count : 0;

  return (
    <span ref={elementRef} className="tabular-nums">
      {hasComma ? shown.toLocaleString('en-US') : shown}
      {suffix}
    </span>
  );
}

// Interactive Logo Component with Error/Fallback state
function BrandLogo({ white = false, onClick }: { white?: boolean; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <a 
        href="#home" 
        onClick={onClick}
        className="flex items-center space-x-2 select-none group cursor-pointer"
      >
        {/* Logo Snowflake Shield */}
        <div className={`p-2 rounded-xl flex items-center justify-center transition-all duration-300 ${
          white 
            ? 'bg-white/10 group-hover:bg-brand-green/20' 
            : 'bg-brand-navy/5 group-hover:bg-brand-blue/10'
        }`}>
          <svg className={`w-6 h-6 transition-transform duration-500 group-hover:rotate-180 ${
            white ? 'text-brand-green' : 'text-brand-blue'
          }`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18m-3-6L6 18M6 6l12 12m-3-9h3M9 15H6M9 9H6m9 6h3" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className={`font-black tracking-wider text-xl leading-none ${white ? 'text-white' : 'text-brand-navy'}`}>
            THERMO
          </span>
          <span className={`text-[9px] font-black tracking-[0.18em] leading-none mt-0.5 ${white ? 'text-brand-green' : 'text-brand-blue'}`}>
            CO., LTD.
          </span>
        </div>
      </a>
    );
  }

  return (
    <a href="#home" onClick={onClick} className="flex items-center">
      <img
        src={white ? '/logo-white.png' : '/logo.png'}
        alt="THERMO CO., LTD."
        className="h-10 w-auto object-contain"
        onError={() => setHasError(true)}
        referrerPolicy="no-referrer"
      />
    </a>
  );
}

type PageName = 'home' | 'services' | 'portfolio' | 'knowledge' | 'article' | 'careers';

/* ─────────────────────────────────────────────────────────
   URL ของแต่ละหน้า
   เดิมทั้งเว็บมี URL เดียว ทำให้ Google เก็บได้แค่หน้าแรก
   และส่งลิงก์บทความให้คนอื่นไม่ได้ ตอนนี้ทุกหน้ามีที่อยู่ของตัวเอง:
     /                       หน้าแรก
     /services/coldroom      หน้าบริการ
     /portfolio              ผลงาน
     /knowledge              คลังความรู้
     /knowledge/rg4-license  บทความ
   ───────────────────────────────────────────────────────── */
type Lang = 'th' | 'en';

/* ภาษาไทย = URL ปกติ  |  ภาษาอังกฤษ = มี /en/ นำหน้า
   เช่น  /knowledge/rg4-license   (ไทย)
        /en/knowledge/rg4-license (อังกฤษ)
   ทำให้ Google เก็บเนื้อหาอังกฤษได้ด้วย ไม่ใช่เห็นแต่ไทย */
const routeToPath = (page: PageName, id?: string | null, lang: Lang = 'th'): string => {
  const prefix = lang === 'en' ? '/en' : '';
  if (page === 'services') return id ? `${prefix}/services/${id}` : `${prefix}/services`;
  if (page === 'portfolio') return `${prefix}/portfolio`;
  if (page === 'knowledge') return `${prefix}/knowledge`;
  if (page === 'article') return id ? `${prefix}/knowledge/${id}` : `${prefix}/knowledge`;
  if (page === 'careers') return `${prefix}/careers`;
  return prefix === '' ? '/' : prefix;
};

const pathToRoute = (pathname: string): { page: PageName; id: string | null; lang: Lang } => {
  const parts = pathname.split('/').filter(Boolean);
  let lang: Lang = 'th';
  if (parts[0] === 'en') { lang = 'en'; parts.shift(); }
  if (parts.length === 0) return { page: 'home', id: null, lang };
  if (parts[0] === 'services') return { page: 'services', id: parts[1] || null, lang };
  if (parts[0] === 'portfolio') return { page: 'portfolio', id: null, lang };
  if (parts[0] === 'careers') return { page: 'careers', id: null, lang };
  if (parts[0] === 'knowledge') return parts[1] ? { page: 'article', id: parts[1], lang } : { page: 'knowledge', id: null, lang };
  return { page: 'home', id: null, lang };
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // อ่านหน้าเริ่มต้นจาก URL — เปิดลิงก์ตรงเข้าบทความได้เลย
  const initialRoute = pathToRoute(typeof window !== 'undefined' ? window.location.pathname : '/');
  const [currentPage, setCurrentPage] = useState<PageName>(initialRoute.page);
  const [currentServiceId, setCurrentServiceId] = useState<string | null>(initialRoute.page === 'services' ? initialRoute.id : null);
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(initialRoute.page === 'article' ? initialRoute.id : null);
  const [lang, setLang] = useState<Lang>(initialRoute.lang);
  const t = translations[lang];

  // สลับภาษาแล้วเปลี่ยน URL ด้วย (ไทย = /  |  อังกฤษ = /en/...)
  // เพื่อให้ Google เก็บเนื้อหาสองภาษาเป็นคนละหน้า และแชร์ลิงก์ภาษาที่ต้องการได้
  const switchLang = () => {
    const next: Lang = lang === 'th' ? 'en' : 'th';
    const id = currentPage === 'services' ? currentServiceId
             : currentPage === 'article' ? currentArticleId : null;
    const path = routeToPath(currentPage, id, next);
    window.history.pushState({ page: currentPage, id, lang: next }, '', path + window.location.hash);
    setLang(next);
  };

  const navigate = (page: PageName, id: string | null = null) => {
    // เปลี่ยน URL บนแถบที่อยู่ด้วย เพื่อให้กด Back ได้ และส่งลิงก์ให้คนอื่นได้
    const path = routeToPath(page, id, lang);
    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({ page, id }, '', path);
    }
    setCurrentPage(page);
    if (page === 'services') {
      setCurrentServiceId(id);
    } else if (page === 'article') {
      setCurrentArticleId(id);
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // เปิดลิงก์ที่มี #about / #contact ตรงๆ แล้วเลื่อนไปที่ section นั้น
  // (ใช้กับ 301 redirect จาก /aboutus และ /contact-us ของเว็บเก่า)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    // รอให้ React วาดหน้าเสร็จก่อน ไม่งั้นหา element ไม่เจอ
    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // รองรับปุ่ม Back / Forward ของเบราว์เซอร์
  useEffect(() => {
    const onPop = () => {
      const r = pathToRoute(window.location.pathname);
      setLang(r.lang);
      setCurrentPage(r.page);
      setCurrentServiceId(r.page === 'services' ? r.id : null);
      setCurrentArticleId(r.page === 'article' ? r.id : null);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // SEO dynamic meta and title update
  useEffect(() => {
    let title = '';
    let desc = '';

    if (currentPage === 'home') {
      if (lang === 'th') {
        title = 'THERMO Co., Ltd. | ผู้เชี่ยวชาญระบบทำความเย็นอุตสาหกรรม ห้องเย็น ชิลเลอร์';
        desc = 'บริษัท เทอร์โม จำกัด - ออกแบบ ติดตั้ง และบำรุงรักษาระบบทำความเย็นอุตสาหกรรม ห้องเย็นสำเร็จรูป และเครื่องทำน้ำเย็นชิลเลอร์ประสิทธิภาพสูง ให้บริการตั้งแต่ปี 2530 ผลงานกว่า 2,000 โครงการทั่วประเทศ';
      } else {
        title = 'THERMO Co., Ltd. | Industrial Cooling Systems, Cold Room & Chiller Specialists';
        desc = 'THERMO Co., Ltd. - Industrial refrigeration, turnkey cold rooms and process chillers since 1987. Over 2,000 projects delivered across Thailand.';
      }
    } else if (currentPage === 'services' && currentServiceId) {
      const svc = servicesData.find(s => s.id === currentServiceId);
      title = svc ? `${t[svc.titleKey]} | THERMO Co., Ltd.` : (lang === 'th' ? 'บริการของเรา | THERMO Co., Ltd.' : 'Our Services | THERMO Co., Ltd.');
      desc = svc ? (t[svc.descKey] as string) : (lang === 'th' ? 'บริการออกแบบ ติดตั้งระบบทำความเย็น' : 'Industrial cooling system engineering and setup services.');
    } else if (currentPage === 'careers') {
      if (lang === 'th') {
        title = 'ร่วมงานกับเรา | THERMO Co., Ltd.';
        desc = 'ร่วมงานกับ THERMO ผู้เชี่ยวชาญระบบทำความเย็นอุตสาหกรรม ตั้งแต่ปี 1987 — งานออกแบบเฉพาะโครงการ ตั้งแต่คลังสินค้าสนามบินถึงรีสอร์ตต่างประเทศ';
      } else {
        title = 'Careers | THERMO Co., Ltd.';
        desc = 'Join THERMO, industrial refrigeration specialists since 1987 — bespoke engineering from airport cargo terminals to overseas resorts.';
      }
    } else if (currentPage === 'portfolio') {
      if (lang === 'th') {
        title = 'ผลงานและโครงการอ้างอิง | THERMO Co., Ltd.';
        desc = 'ชมผลงานการติดตั้งระบบห้องเย็นและระบบปรับอากาศอุตสาหกรรมจากเวทีจริงระดับประเทศของบริษัท เทอร์โม จำกัด';
      } else {
        title = 'Our Portfolio & Projects | THERMO Co., Ltd.';
        desc = 'Explore our track record of high-performance cold storage and industrial refrigeration installations.';
      }
    } else if (currentPage === 'knowledge') {
      if (lang === 'th') {
        title = 'คลังความรู้ระบบทำความเย็น | THERMO Co., Ltd.';
        desc = 'รวมบทความ เทคนิควิศวกรรมความเย็น และการบำรุงรักษาระบบทำความเย็นสำหรับโรงงานอุตสาหกรรม';
      } else {
        title = 'Knowledge Center | THERMO Co., Ltd.';
        desc = 'Technical refrigeration guides, chiller guides, and energy saving tips from THERMO engineers.';
      }
    } else if (currentPage === 'article' && currentArticleId) {
      const art = articlesList.find(a => a.id === currentArticleId);
      if (lang === 'th') {
        title = art ? `${art.titleTh} | THERMO Co., Ltd.` : 'คลังความรู้ | THERMO Co., Ltd.';
        desc = art ? art.excerptTh : 'บทความระบบทำความเย็นอุตสาหกรรม';
      } else {
        title = art ? `${art.titleEn} | THERMO Co., Ltd.` : 'Knowledge Base | THERMO Co., Ltd.';
        desc = art ? art.excerptEn : 'Industrial refrigeration technical articles.';
      }
    }

    if (title) document.title = title;
    
    // Set meta description
    if (desc) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', desc);
    }

    // canonical + og ให้ตรงกับหน้าที่เปิดอยู่ กัน Google มองว่าเนื้อหาซ้ำ
    const id = currentPage === 'services' ? currentServiceId
             : currentPage === 'article' ? currentArticleId : null;
    const url = SITE_URL + routeToPath(currentPage, id, lang);

    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement('link');
      canon.setAttribute('rel', 'canonical');
      document.head.appendChild(canon);
    }
    canon.setAttribute('href', url);

    // hreflang — บอก Google ว่าหน้าไทยกับหน้าอังกฤษคือเนื้อหาเดียวกันคนละภาษา
    // ถ้าไม่มีบรรทัดนี้ Google อาจตัดสินว่าเป็นเนื้อหาซ้ำ
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    ([['th', 'th'], ['en', 'en'], ['x-default', 'th']] as [string, Lang][]).forEach(([code, l]) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', code);
      link.setAttribute('href', SITE_URL + routeToPath(currentPage, id, l));
      document.head.appendChild(link);
    });
    document.documentElement.lang = lang;

    const setProp = (prop: string, val: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', prop);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };
    setProp('og:url', url);
    if (title) setProp('og:title', title);
    if (desc) setProp('og:description', desc);
    setProp('og:locale', lang === 'th' ? 'th_TH' : 'en_US');

    // ── JSON-LD ต่อหน้า ──
    // บทความ = BlogPosting (ให้ Google / ChatGPT / Perplexity อ้างอิงบทความได้ตรงหน้า)
    // หน้าอื่น = BreadcrumbList (ให้ผลค้นหาแสดงเส้นทางหน้า)
    document.getElementById('page-jsonld')?.remove();
    const graph: any[] = [];

    if (currentPage === 'article' && currentArticleId) {
      const art = articlesList.find(a => a.id === currentArticleId);
      if (art) {
        graph.push({
          "@type": "BlogPosting",
          "@id": url + "#article",
          "headline": lang === 'th' ? art.titleTh : art.titleEn,
          "description": lang === 'th' ? art.excerptTh : art.excerptEn,
          "articleSection": lang === 'th' ? art.categoryTh : art.categoryEn,
          "inLanguage": lang === 'th' ? 'th-TH' : 'en-US',
          ...((art as any).datePublishedISO ? {
            "datePublished": (art as any).datePublishedISO,
            "dateModified": (art as any).dateModifiedISO
          } : {}),
          "image": SITE_URL + '/' + art.imgName,
          "mainEntityOfPage": { "@type": "WebPage", "@id": url },
          "author": { "@type": "Organization", "name": "THERMO Co., Ltd.", "url": SITE_URL },
          "publisher": {
            "@type": "Organization",
            "name": "THERMO Co., Ltd.",
            "logo": { "@type": "ImageObject", "url": SITE_URL + "/logo.png" }
          }
        });
      }
    }

    // เส้นทางหน้า (breadcrumb)
    const crumbs: { name: string; item: string }[] = [
      { name: lang === 'th' ? 'หน้าแรก' : 'Home', item: SITE_URL + routeToPath('home', null, lang) }
    ];
    if (currentPage === 'article') {
      crumbs.push({ name: lang === 'th' ? 'คลังความรู้' : 'Knowledge', item: SITE_URL + routeToPath('knowledge', null, lang) });
      const art = articlesList.find(a => a.id === currentArticleId);
      if (art) crumbs.push({ name: lang === 'th' ? art.titleTh : art.titleEn, item: url });
    } else if (currentPage !== 'home') {
      crumbs.push({ name: title.split('|')[0].trim(), item: url });
    }
    if (crumbs.length > 1) {
      graph.push({
        "@type": "BreadcrumbList",
        "itemListElement": crumbs.map((c, i) => ({
          "@type": "ListItem", "position": i + 1, "name": c.name, "item": c.item
        }))
      });
    }

    if (graph.length > 0) {
      const tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.id = 'page-jsonld';
      tag.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
      document.head.appendChild(tag);
    }
  }, [currentPage, currentServiceId, currentArticleId, lang, t]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    // จำไว้ว่าเมนูมือถือเปิดอยู่ไหม ก่อนสั่งปิด
    const mobileMenuWasOpen = isMobileMenuOpen;
    setIsMobileMenuOpen(false);

    // ถ้าเมนูมือถือเปิดอยู่ ต้องรอให้มันยุบเสร็จก่อนค่อยเลื่อน
    // ไม่งั้นเบราว์เซอร์คำนวณตำแหน่งจากหน้าที่เมนูยังกางอยู่ แล้วเลื่อนไปผิดที่
    const scrollDelay = mobileMenuWasOpen ? 280 : 0;

    const scrollToTarget = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (targetId === 'home') {
      navigate('home');
      setActiveSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (targetId === 'knowledge') {
      navigate('knowledge');
      return;
    }

    if (targetId === 'projects') {
      navigate('portfolio');
      return;
    }
    
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setCurrentServiceId(null);
      setCurrentArticleId(null);
      setActiveSection(targetId);
      // มาจากหน้าอื่น ต้องรอให้หน้าแรก render เสร็จก่อน + รอเมนูยุบ
      setTimeout(() => scrollToTarget(targetId), Math.max(100, scrollDelay));
    } else {
      setActiveSection(targetId);
      setTimeout(() => scrollToTarget(targetId), scrollDelay);
    }
  };

  // Active nav ID resolves services/portfolio properly
  let activeNavId = activeSection;
  if (currentPage === 'services') {
    activeNavId = 'services';
  } else if (currentPage === 'portfolio') {
    activeNavId = 'projects';
  } else if (currentPage === 'knowledge' || currentPage === 'article') {
    activeNavId = 'knowledge';
  }

  const isSolidNavbar = isScrolled || currentPage !== 'home';

  // Contact Form States
  const [formName, setFormName] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formInterest, setFormInterest] = useState('');
  const [formDetails, setFormDetails] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorsContact, setErrorsContact] = useState({ name: false, phone: false });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSubmitError, setContactSubmitError] = useState<string | null>(null);

  // Contact Form submit handler
  const handleContactSubmit = async () => {
    const hasNameError = !formName.trim();
    const hasPhoneError = !formPhone.trim();

    setErrorsContact({ name: hasNameError, phone: hasPhoneError });
    setContactSubmitError(null);
    setFormStatus('idle');

    if (hasNameError || hasPhoneError) {
      setFormStatus('error');
      return;
    }

    setIsSubmittingContact(true);

    const serviceLabelMap: Record<string, string> = {
      coldroom: lang === 'th' ? "ห้องเย็น (Cold Room)" : "Cold Room",
      chiller: lang === 'th' ? "ระบบชิลเลอร์ (Chiller System)" : "Chiller System",
      special: lang === 'th' ? "ห้องควบคุมสภาวะแวดล้อม & งานเฉพาะทาง" : "Environment Control & Specialist Rooms",
      hispeeddoor: lang === 'th' ? "ประตูความเร็วสูง (Hi-Speed Door)" : "Hi-Speed Door",
      monitoring: lang === 'th' ? "ระบบมอนิเตอร์ริ่ง (Monitoring System)" : "Monitoring System",
      others: lang === 'th' ? "อื่นๆ" : "Others"
    };

    const serviceType = serviceLabelMap[formInterest] || formInterest || '-';

    const result = await sendQuote({
      name: formName,
      company: formCompany,
      phone: formPhone,
      email: formEmail,
      serviceType: serviceType,
      message: formDetails
    }, lang);

    if (result.ok) {
      setFormStatus('success');
      setFormName('');
      setFormCompany('');
      setFormPhone('');
      setFormEmail('');
      setFormInterest('');
      setFormDetails('');
      setErrorsContact({ name: false, phone: false });
    } else {
      setFormStatus('error');
      setContactSubmitError(result.error || (lang === 'th' ? "เกิดข้อผิดพลาด กรุณาลองใหม่ หรือโทร 02 717 8065-7" : "An error occurred. Please try again or call 02 717 8065-7"));
    }
    setIsSubmittingContact(false);
  };

  // Track page scroll to set transparent-to-solid navbar and scroll-spy active states
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple robust scroll spy (only on home page)
      if (currentPage !== 'home') return;

      const sections = ['home', 'services', 'projects', 'why', 'knowledge', 'about', 'contact'];
      const scrollPos = window.scrollY + 140;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Helper to resolve services icons
  const getServiceIcon = (iconName: string, className: string = "w-8 h-8") => {
    switch (iconName) {
      case 'Snowflake':
        return <Snowflake className={className} />;
      case 'Cpu':
        return <Layers className={className} />;
      case 'DoorClosed':
        return <Thermometer className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      default:
        // High-speed industrial roller door icon (Custom Path)
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="3" width="16" height="18" rx="1.5" />
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="11" x2="20" y2="11" />
            <line x1="4" y1="15" x2="20" y2="15" />
            <path d="M10 15h4v4h-4z" fill="currentColor" fillOpacity="0.1" />
          </svg>
        );
    }
  };

  // Helper to resolve why choose us icons
  const getWhyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="w-6 h-6 text-brand-navy" />;
      case 'Users':
        return <Users className="w-6 h-6 text-brand-navy" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-brand-navy" />;
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-brand-green" />;
      default:
        return <Clock className="w-6 h-6 text-brand-navy" />;
    }
  };

  // Helper to resolve statistics icons
  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Award className="w-7 h-7 text-brand-navy" />;
      case 'CheckSquare':
        return <CheckSquare className="w-7 h-7 text-brand-navy" />;
      case 'Users':
        return <Users className="w-7 h-7 text-brand-navy" />;
      case 'Smile':
        return <Smile className="w-7 h-7 text-brand-navy" />;
      default:
        return <Map className="w-7 h-7 text-brand-navy" />;
    }
  };

  const navMenuItems = [
    { id: 'home', label: t.navHome },
    { id: 'services', label: t.navServices },
    { id: 'projects', label: t.navProjects },
    { id: 'why', label: t.navWhyUs },
    { id: 'knowledge', label: t.navKnowledge },
    { id: 'about', label: t.navAbout },
    { id: 'contact', label: t.navContact }
  ];

  return (
    <div className="relative min-h-screen bg-[#FCFDFE]">
      
      {/* 1) NAVBAR */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isSolidNavbar 
            ? 'bg-white/95 backdrop-blur-md py-3 shadow-md border-gray-100' 
            : 'bg-transparent py-5 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left: Brand Logo */}
            <div className="flex-shrink-0">
              <BrandLogo white={!isSolidNavbar} onClick={(e) => handleNavClick(e, 'home')} />
            </div>

            {/* Middle: Desktop Menu Items */}
            <div className="hidden lg:flex items-center space-x-8">
              {navMenuItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-brand-green relative py-1.5 ${
                    isSolidNavbar 
                      ? (activeNavId === item.id ? 'text-brand-navy font-bold' : 'text-brand-text/80') 
                      : (activeNavId === item.id ? 'text-white font-bold' : 'text-white/80')
                  }`}
                >
                  {item.label}
                  {activeNavId === item.id && (
                    <motion.div 
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green" 
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Right: Lang Toggle + Quote Button */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Language Switcher */}
              <button 
                onClick={switchLang}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  isSolidNavbar
                    ? 'border-gray-200 text-brand-navy hover:bg-gray-50'
                    : 'border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'th' ? 'TH | EN' : 'EN | TH'}</span>
              </button>

              {/* Get a Quote Button */}
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="bg-brand-green hover:bg-brand-green/90 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-brand-green/20 hover:-translate-y-0.5 cursor-pointer flex items-center space-x-1"
              >
                <span>{t.btnQuote}</span>
              </button>
            </div>

            {/* Mobile hamburger menu trigger */}
            <div className="flex lg:hidden items-center space-x-4">
              {/* Mobile Language Switcher */}
              <button 
                onClick={switchLang}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
                  isSolidNavbar
                    ? 'border-gray-200 text-brand-navy'
                    : 'border-white/20 text-white'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span>{lang === 'th' ? 'TH' : 'EN'}</span>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isSolidNavbar ? 'text-brand-navy hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-gray-100 overflow-hidden shadow-xl"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navMenuItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`block px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                      activeNavId === item.id 
                        ? 'bg-brand-surface/40 text-brand-navy' 
                        : 'text-brand-text/80 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                
                <div className="pt-4 px-3">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setQuoteModalOpen(true);
                    }}
                    className="w-full bg-brand-green hover:bg-brand-green/90 text-white py-3 rounded-xl font-bold font-sans text-center shadow-lg cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>{t.btnQuote}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>


      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 2) HERO SECTION */}
            <section 
              id="home" 
              className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-brand-navy"
            >
        {/* Background Image with Error Fallback */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/hero.jpg"
            alt="THERMO Sliding Cold Room Door Background"
            className="w-full h-full"
            fallbackText={t.heroTitle}
            overlayClass="gradient-overlay opacity-95" // Beautiful premium overlay over image
          />
        </div>

        {/* Decorative subtle patterns in background */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-navy/60 pointer-events-none z-1" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center lg:text-left w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content Column */}
            <div className="lg:col-span-8 text-white space-y-6">
              
              {/* Small accent indicator */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-brand-surface">
                  {t.heroSubtitle}
                </span>
              </motion.div>

              {/* Headline Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]"
              >
                {t.heroTitle}
              </motion.h1>

              {/* Tagline text */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-brand-surface/80 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed font-sans"
              >
                {t.heroTagline}
              </motion.p>

              {/* 3 Glassmorphism Feature Pills */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6"
              >
                {/* Pill 1 */}
                <div className="hero-glass border border-white/10 rounded-2xl p-4 flex items-center space-x-3 text-left">
                  <div className="p-2 rounded-xl bg-white/10 text-white flex-shrink-0">
                    <Snowflake className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">{t.feature1}</h4>
                    <p className="text-[11px] text-white/60 font-sans mt-0.5">{lang === 'th' ? 'ออกแบบติดตั้งครบวงจร' : 'All-in-one execution'}</p>
                  </div>
                </div>

                {/* Pill 2 */}
                <div className="hero-glass border border-white/10 rounded-2xl p-4 flex items-center space-x-3 text-left">
                  <div className="p-2 rounded-xl bg-white/10 text-white flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">{t.feature2}</h4>
                    <p className="text-[11px] text-white/60 font-sans mt-0.5">{lang === 'th' ? 'รับประกันผลงานมาตรฐาน' : 'Certified QA standards'}</p>
                  </div>
                </div>

                {/* Pill 3 */}
                <div className="hero-glass border border-white/10 rounded-2xl p-4 flex items-center space-x-3 text-left">
                  <div className="p-2 rounded-xl bg-white/10 text-white flex-shrink-0">
                    <Leaf className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">{t.feature3}</h4>
                    <p className="text-[11px] text-white/60 font-sans mt-0.5">{lang === 'th' ? 'ลดการใช้ไฟฟ้า เป็นมิตรสิ่งแวดล้อม' : 'Eco-conscious design'}</p>
                  </div>
                </div>
              </motion.div>

              {/* Primary Green Call to Action */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="pt-6 sm:pt-8"
              >
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="bg-brand-green hover:bg-brand-green/90 text-white font-bold font-sans text-sm px-8 py-4 rounded-2xl shadow-xl shadow-brand-green/20 hover:shadow-brand-green/35 transition-all hover:-translate-y-1 inline-flex items-center space-x-2 group cursor-pointer"
                >
                  <span>{t.btnQuote}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </button>
              </motion.div>

            </div>

            {/* Hero Right Column (Sleek abstract geometric representation of cold space or floating badge) */}
            <div className="hidden lg:col-span-4 lg:flex justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative w-72 h-72 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl p-8 flex flex-col justify-between overflow-hidden shadow-2xl"
              >
                {/* Decorative glowing backdrops */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
                
                {/* Cold Badge Content */}
                <div className="flex justify-between items-start">
                  <span className="text-brand-green uppercase font-black tracking-widest text-[10px]">Since 1987</span>
                  <span className="bg-brand-green/20 text-brand-green rounded-lg px-2 py-1 text-[10px] font-black uppercase font-mono tracking-wider">
                    40+ Years
                  </span>
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-4">
                    <Snowflake className="w-6 h-6 text-brand-green" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 leading-tight">
                    {lang === 'th' ? 'ความเย็นเสถียร 100%' : '100% Temperature Integrity'}
                  </h3>
                  <p className="text-xs text-white/60 font-sans leading-relaxed">
                    {lang === 'th' 
                      ? 'รักษาระดับอุณหภูมิได้อย่างแม่นยำเพื่อป้องกันความเสียหายต่ออุตสาหกรรมของคุณ' 
                      : 'Preserving raw materials with maximum stability and professional standards.'}
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>


      {/* 3) SERVICES SECTION */}
      <section id="services" className="py-24 sm:py-32 bg-[#FCFDFE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black tracking-[0.25em] text-brand-blue block uppercase">
              {t.servicesSubtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight relative inline-block">
              {t.servicesTitle}
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-12 h-1 bg-brand-green rounded-full" />
            </h2>
          </div>

          {/* 5 columns -> 2 columns -> 1 column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {servicesData.map((service, index) => {
              const titleText = t[service.titleKey] as string;
              const descText = t[service.descKey] as string;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between card-shadow-hover relative group overflow-hidden cursor-pointer"
                  onClick={() => navigate('services', service.id)}
                >
                  {/* Subtle top decoration */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-14 h-14 bg-[#EAF1F8] group-hover:bg-[#0B2E5F] rounded-2xl flex items-center justify-center text-[#0B2E5F] group-hover:text-white transition-colors duration-200">
                      {getServiceIcon(service.iconName, "w-8 h-8 transition-colors duration-200")}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-grow space-y-3">
                    <h3 className="font-bold text-base sm:text-lg text-brand-navy group-hover:text-brand-blue transition-colors leading-snug">
                      {titleText}
                    </h3>
                    <p className="text-xs text-brand-text/75 font-sans leading-relaxed line-clamp-3">
                      {descText}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-6 mt-4 border-t border-gray-50 flex items-center justify-between text-brand-green">
                    <span className="text-xs font-extrabold tracking-wide uppercase transition-all flex items-center group-hover:underline">
                      {t.btnViewDetails}
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>


      {/* 4) PROJECTS SECTION */}
      <section id="projects" className="py-24 sm:py-32 bg-brand-surface/20 border-y border-brand-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-black tracking-[0.25em] text-brand-blue block uppercase">
                {t.projectsSubtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight relative">
                {t.projectsTitle}
                <div className="absolute bottom-[-10px] left-0 w-12 h-1 bg-brand-green rounded-full" />
              </h2>
            </div>
            
            <button
              onClick={() => navigate('portfolio')}
              className="bg-brand-green hover:bg-brand-green/90 text-white font-bold font-sans text-xs px-6 py-3.5 rounded-xl shadow-md hover:shadow-brand-green/15 transition-all hover:-translate-y-0.5 flex items-center space-x-1 cursor-pointer self-start sm:self-auto"
            >
              <span>{t.btnViewAll}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Projects Image Grid 4 -> 2 -> 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectsData.map((project, index) => {
              const titleText = t[project.titleKey] as string;
              const locationText = t[project.locationKey] as string;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm group hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => navigate('portfolio')}
                >
                  {/* Photo area */}
                  <div className="h-56 relative bg-brand-navy overflow-hidden">
                    <ImageWithFallback
                      src={`/${project.imgName}`}
                      alt={titleText}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      fallbackText={titleText}
                    />
                    <div className="absolute top-3 right-3 bg-brand-navy/80 backdrop-blur-sm text-white text-[10px] font-black tracking-widest px-2 py-1 rounded-md uppercase">
                      Thermo Cert
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-base text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-1">
                      {titleText}
                    </h3>
                    
                    {/* Location Badge */}
                    <div className="flex items-center space-x-1.5 text-brand-text/60 font-sans text-xs">
                      <MapPin className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                      <span className="truncate">{locationText}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>


      {/* 5) WHY CHOOSE US SECTION */}
      <section id="why" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
            <span className="text-xs font-black tracking-[0.25em] text-brand-blue block uppercase">
              {t.whySubtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight relative inline-block">
              {t.whyTitle}
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-12 h-1 bg-brand-green rounded-full" />
            </h2>
          </div>

          {/* Icons horizontal row with thin dividers on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-12 lg:gap-y-0 lg:divide-x lg:divide-gray-200/80">
            {whyChooseUsData.map((item, index) => {
              const titleText = t[item.titleKey] as string;
              const descText = t[item.descKey] as string;
              const isGreenIcon = item.iconName === 'Leaf';

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center px-6 lg:px-4"
                >
                  {/* Circle Icon Badge */}
                  <div className="mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isGreenIcon 
                        ? 'bg-brand-green/10 text-brand-green' 
                        : 'bg-brand-navy/5 text-brand-navy'
                    }`}>
                      {getWhyIcon(item.iconName)}
                    </div>
                  </div>

                  <h3 className="font-extrabold text-brand-navy text-sm md:text-base mb-2">
                    {titleText}
                  </h3>
                  <p className="text-xs text-brand-text/75 font-sans leading-relaxed">
                    {descText}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>


      {/* 7) STATS — ย้ายไปอยู่ในหัวข้อ "เกี่ยวกับเรา" ที่เดียว
           เดิมตัวเลขชุดเดียวกันขึ้น 2 รอบในหน้าเดียว (ตรงนี้ + ในเกี่ยวกับเรา)
           ถ้าอยากให้กลับมาโชว์ตรงนี้แทน ให้ไปลบอันในเกี่ยวกับเราออก จะได้ไม่ซ้ำกันอีก */}


      {/* 8) KNOWLEDGE CENTER SECTION */}
      <section id="knowledge" className="py-24 sm:py-32 bg-brand-surface/10 border-t border-brand-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
            <div className="space-y-3">
              <span className="text-xs font-black tracking-[0.25em] text-brand-blue block uppercase">
                {t.knowledgeSubtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight relative">
                {t.knowledgeTitle}
                <div className="absolute bottom-[-10px] left-0 w-12 h-1 bg-brand-green rounded-full" />
              </h2>
            </div>
            
            <button
              onClick={() => navigate('knowledge')}
              className="bg-brand-green hover:bg-brand-green/90 text-white font-bold font-sans text-xs px-6 py-3.5 rounded-xl shadow-md hover:shadow-brand-green/15 transition-all hover:-translate-y-0.5 flex items-center space-x-1 cursor-pointer self-start sm:self-auto"
            >
              <span>{lang === 'th' ? 'ดูบทความทั้งหมด' : 'View All Articles'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Article grid: Responsive 4 -> 2 -> 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articlesList.slice(0, 4).map((article, index) => {
              const titleText = lang === 'th' ? article.titleTh : article.titleEn;
              const dateText = lang === 'th' ? article.dateTh : article.dateEn;

              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                  onClick={() => navigate('article', article.id)}
                >
                  <div>
                    {/* Photo with hover effect */}
                    <div className="h-44 relative bg-brand-navy overflow-hidden">
                      <ImageWithFallback
                        src={`/${article.imgName}`}
                        alt={titleText}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        fallbackText={titleText}
                      />
                      {/* Badge overlay */}
                      <span className="absolute top-3 left-3 bg-brand-green text-white text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider z-10 shadow-sm">
                        {lang === 'th' ? article.categoryTh : article.categoryEn}
                      </span>
                    </div>

                    {/* Info area */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center space-x-1 text-[10px] text-brand-text/50 font-sans">
                        <Calendar className="w-3 h-3 text-brand-blue" />
                        <span>{dateText}</span>
                      </div>
                      <h3 className="font-bold text-sm text-brand-navy group-hover:text-brand-blue transition-colors leading-snug line-clamp-2 h-10 font-sans">
                        {titleText}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="px-5 pb-5 pt-0">
                    <span className="text-[11px] font-extrabold text-brand-green group-hover:underline flex items-center">
                      {lang === 'th' ? 'อ่านต่อบทความ →' : 'Read Article →'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>


      {/* 9) ABOUT US SECTION */}
      <section id="about" className="py-24 sm:py-32 bg-white relative overflow-hidden">
        
        {/* Background mesh decoration */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-surface/30 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left description column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-black tracking-[0.25em] text-brand-blue block uppercase">
                {t.aboutSubtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight relative">
                {t.aboutTitle}
                <div className="absolute bottom-[-10px] left-0 w-12 h-1 bg-brand-green rounded-full" />
              </h2>
              
              <p className="text-sm sm:text-base text-brand-text/80 leading-relaxed font-sans pt-3">
                {t.aboutDescription}
              </p>

              <div className="pt-4">
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="bg-brand-green hover:bg-brand-green/90 text-white font-bold font-sans text-xs px-6 py-3.5 rounded-xl shadow-md transition-all hover:-translate-y-0.5 inline-flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>{t.btnReadMore}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right statistics grid - white cards with navy icons */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {statsData.map((stat, index) => {
                const numText = t[stat.numKey] as string;
                const labelText = t[stat.labelKey] as string;

                return (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-start space-y-4"
                  >
                    <div className="p-3 rounded-xl bg-brand-surface/40 text-brand-navy flex-shrink-0">
                      {getStatIcon(stat.iconName)}
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-black text-brand-navy leading-none">
                        <AnimatedCounter value={numText} />
                      </h3>
                      <p className="text-xs font-semibold text-brand-text/60 font-sans mt-2">
                        {labelText}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>


      {/* 10) CALL-TO-ACTION BAND */}
      <section className="py-16 sm:py-20 bg-brand-navy relative overflow-hidden">
        {/* Background Snowflake watermark motif */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-5 text-white pointer-events-none">
          <svg className="w-96 h-96 animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 11h-4.14l2.42-2.42c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0L13 10.02V5c0-.55-.45-1-1-1s-1 .45-1 1v5.02L8.13 7.16a.996.996 0 0 0-1.41 0c-.39.39-.39 1.03 0 1.42L9.14 11H5c-.55 0-1 .45-1 1s.45 1 1 1h4.14l-2.42 2.42c-.39.39-.39 1.03 0 1.42.2.2.45.3.71.3.26 0 .51-.1.71-.3L11 13.98V19c0 .55.45 1 1 1s1-.45 1-1v-5.02l2.87 2.87c.2.2.45.3.71.3.26 0 .51-.1.71-.3.39-.39.39-1.03 0-1.42L14.86 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
          </svg>
        </div>

        {/* Decorative ambient gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-blue pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Call to action heading */}
            <div className="text-white text-center lg:text-left max-w-2xl space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                {t.ctaText}
              </h2>
              <p className="text-brand-surface/75 text-xs sm:text-sm font-sans">
                {t.ctaSub}
              </p>
            </div>

            {/* Quote and Call Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="w-full sm:w-auto bg-brand-green hover:bg-brand-green/90 text-white font-bold font-sans text-sm px-8 py-4 rounded-xl shadow-lg hover:shadow-brand-green/20 transition-all hover:-translate-y-0.5 inline-flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{t.btnQuoteFree}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${t.contactPhone.replace(/\s+/g, '').replace(/-/g, '')}`}
                className="w-full sm:w-auto border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold font-sans text-sm px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 inline-flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-brand-green" />
                <span>{t.contactPhone}</span>
              </a>
            </div>

          </div>
        </div>
      </section>


      {/* 11) CONTACT SECTION */}
      <section id="contact" className="py-24 sm:py-32 bg-[#EAF1F8]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
            <span className="text-xs font-black tracking-[0.25em] text-brand-blue block uppercase">
              {lang === 'th' ? 'ช่องทางการติดต่อ' : 'GET IN TOUCH'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight relative inline-block">
              {t.contactTitle}
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-12 h-1 bg-brand-green rounded-full" />
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Side: Contact Form Card */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">
                  {lang === 'th' ? 'ส่งข้อความถึงเรา' : 'Send Us a Message'}
                </h3>
                <p className="text-xs text-brand-text/60 font-sans mb-6">
                  {lang === 'th' ? 'ทีมวิศวกรผู้เชี่ยวชาญจะติดต่อกลับโดยเร็วที่สุด' : 'Our engineering specialists will get back to you as soon as possible.'}
                </p>

                {/* Status Messages */}
                {formStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-brand-green/20 text-brand-navy rounded-xl font-bold font-sans text-xs leading-relaxed text-center">
                    {lang === 'th' 
                      ? 'ขอบคุณค่ะ เราได้รับข้อมูลแล้ว จะติดต่อกลับโดยเร็วที่สุด' 
                      : 'Thank you, we have received your information. We will contact you back as soon as possible.'}
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl font-bold font-sans text-xs">
                    {contactSubmitError ? contactSubmitError : (
                      lang === 'th' 
                        ? 'กรุณากรอกข้อมูลในช่องที่จำเป็น (ชื่อ และเบอร์โทร)' 
                        : 'Please fill in all required fields (Name and Phone).'
                    )}
                  </div>
                )}

                {/* Form Inputs (No <form> tag) */}
                <div className="space-y-4" onFocus={() => prewarmMailer()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-brand-navy uppercase tracking-wider block">
                        {t.contactFormName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => {
                          setFormName(e.target.value);
                          if (errorsContact.name) setErrorsContact({ ...errorsContact, name: false });
                        }}
                        placeholder={lang === 'th' ? 'กรุณากรอกชื่อ-นามสกุล' : 'Your name'}
                        className={`w-full bg-[#EAF1F8]/30 border rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-blue/30 transition-all ${
                          errorsContact.name ? 'border-red-500 focus:border-red-500' : 'border-brand-blue/10 focus:border-brand-blue'
                        }`}
                      />
                      {errorsContact.name && (
                        <p className="text-red-500 text-[11px] mt-1 font-sans">
                          {lang === 'th' ? 'กรุณากรอกชื่อ-นามสกุล' : 'Please enter your name'}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-brand-navy uppercase tracking-wider block">
                        {t.contactFormCompany}
                      </label>
                      <input
                        type="text"
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                        placeholder={lang === 'th' ? 'ชื่อบริษัทของคุณ' : 'Your company'}
                        className="w-full bg-[#EAF1F8]/30 border border-brand-blue/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-brand-navy uppercase tracking-wider block">
                        {t.contactFormPhone} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formPhone}
                        onChange={(e) => {
                          setFormPhone(e.target.value);
                          if (errorsContact.phone) setErrorsContact({ ...errorsContact, phone: false });
                        }}
                        placeholder="08X-XXX-XXXX"
                        className={`w-full bg-[#EAF1F8]/30 border rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-blue/30 transition-all ${
                          errorsContact.phone ? 'border-red-500 focus:border-red-500' : 'border-brand-blue/10 focus:border-brand-blue'
                        }`}
                      />
                      {errorsContact.phone && (
                        <p className="text-red-500 text-[11px] mt-1 font-sans">
                          {lang === 'th' ? 'กรุณากรอกเบอร์โทรศัพท์' : 'Please enter your phone number'}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-brand-navy uppercase tracking-wider block">
                        {t.contactFormEmail}
                      </label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="example@email.com"
                        className="w-full bg-[#EAF1F8]/30 border border-brand-blue/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-brand-navy uppercase tracking-wider block">
                      {t.contactFormInterest} <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formInterest}
                      onChange={(e) => setFormInterest(e.target.value)}
                      className="w-full bg-[#EAF1F8]/30 border border-brand-blue/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all cursor-pointer text-brand-text"
                    >
                      <option value="" disabled>
                        {lang === 'th' ? '-- เลือกบริการที่สนใจ --' : '-- Choose a service of interest --'}
                      </option>
                      {lang === 'th' ? (
                        <>
                          <option value="coldroom">ห้องเย็น (Cold Room)</option>
                          <option value="chiller">ระบบชิลเลอร์ (Chiller System)</option>
                          <option value="special">ห้องควบคุมสภาวะแวดล้อม & งานเฉพาะทาง</option>
                          <option value="hispeeddoor">ประตูความเร็วสูง (Hi-Speed Door)</option>
                          <option value="monitoring">ระบบมอนิเตอร์ริ่ง (Monitoring System)</option>
                          <option value="others">อื่นๆ (Others)</option>
                        </>
                      ) : (
                        <>
                          <option value="coldroom">Cold Room</option>
                          <option value="chiller">Chiller System</option>
                          <option value="special">Environment Control & Specialist Rooms</option>
                          <option value="hispeeddoor">Hi-Speed Door</option>
                          <option value="monitoring">Monitoring System</option>
                          <option value="others">Others</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-brand-navy uppercase tracking-wider block">
                      {t.contactFormDetails}
                    </label>
                    <textarea
                      value={formDetails}
                      onChange={(e) => setFormDetails(e.target.value)}
                      rows={4}
                      placeholder={lang === 'th' ? 'ระบุข้อมูลเพิ่มเติม เช่น ขนาด หรืออุณหภูมิที่ต้องการ' : 'Specify details, size, or target temperatures...'}
                      className="w-full bg-[#EAF1F8]/30 border border-brand-blue/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleContactSubmit}
                    disabled={isSubmittingContact}
                    className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-bold font-sans text-sm py-4 rounded-xl shadow-md hover:shadow-brand-green/20 transition-all hover:-translate-y-0.5 inline-flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>{isSubmittingContact ? (lang === 'th' ? 'กำลังส่ง...' : 'Sending...') : t.contactFormSubmit}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick-action buttons - Highly prominent and equal/more prominent than the form */}
              <div className="border-t border-gray-100 pt-6 mt-6">
                <p className="text-xs font-bold text-brand-navy mb-3 text-center sm:text-left">
                  {lang === 'th' ? 'หรือ ติดต่อเราได้ทันทีผ่านช่องทางด่วน:' : 'Or contact us immediately via quick channels:'}
                </p>
                <div className={`grid ${lineConfig.enabled ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                  <a
                    href="tel:027178065"
                    className="flex items-center justify-center space-x-2 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold font-sans text-xs px-4 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-md cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-brand-green flex-shrink-0" />
                    <span className="truncate">{lang === 'th' ? 'โทร 02-717-8065-7' : 'Call 02-717-8065-7'}</span>
                  </a>
                  {lineConfig.enabled && (
                    <a
                      href={lineConfig.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-brand-green hover:bg-brand-green/90 text-white font-bold font-sans text-xs px-4 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-md cursor-pointer"
                    >
                      <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                        <path d="M24 10.3c0-4.6-4.9-8.3-11-8.3S2 5.7 2 10.3c0 4.1 3.9 7.6 9.2 8.2.4 0 .8.2 1 .5l.2 1.3c.1.5-.1.8-.4.9l-1.9 1.1s-.2.1-.1.3c0 .1.1.2.2.2h.3c.4 0 .9-.2 1.3-.5l2.4-1.7c.3-.2.6-.3.9-.3 5.3-.2 8.8-3.7 8.8-7.9zm-15.3 2.9H7.2c-.3 0-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5h1.5c.3 0 .5.2.5.5s-.2.5-.5.5H7.7v1.2h1c.3 0 .5.2.5.5s-.2.5-.5.5h-1v1.3h1.5c.3 0 .5.2.5.5s-.2.5-.5.5zm4 0h-1.5c-.3 0-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5s.5.2.5.5v3.5h1c.3 0 .5.2.5.5s-.2.5-.5.5zm3.1-.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5s.5.2.5.5v4.5zm5.1.5H19c-.3 0-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5h2.1c.3 0 .5.2.5.5s-.2.5-.5.5h-1.6v1.2H21c.3 0 .5.2.5.5s-.2.5-.5.5h-1v1.3H21c.3 0 .5.2.5.5s-.2.5-.5.5z"/>
                      </svg>
                      <span>LINE Official</span>
                    </a>
                  )}
                </div>
              </div>

            </div>

            {/* Right Side: Map Card */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
              <div className="space-y-6">
                {/* Embed Google Maps */}
                <div className="w-full h-80 rounded-xl overflow-hidden border border-gray-100 shadow-inner relative">
                  <iframe
                    src="https://maps.google.com/maps?q=280%20ซอยอ่อนนุช%2017%20แยก%2016%20สวนหลวง%20กรุงเทพฯ%2010250&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="THERMO Headquarters Location Map"
                  />
                </div>
                
                {/* Contact Address text */}
                <div className="space-y-4 font-sans text-xs sm:text-sm text-brand-text/80">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-brand-navy mb-1">{t.contactAddressLabel}</p>
                      <p className="text-xs sm:text-sm leading-relaxed">{t.contactAddress}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-brand-blue flex-shrink-0" />
                    <div>
                      <span className="font-bold text-brand-navy mr-2">{lang === 'th' ? 'โทรศัพท์:' : 'Phone:'}</span>
                      <a href={`tel:${t.contactPhone.replace(/\s+/g, '').replace(/-/g, '')}`} className="hover:text-brand-blue transition-colors text-xs sm:text-sm">
                        {t.contactPhone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-brand-blue flex-shrink-0" />
                    <div>
                      <span className="font-bold text-brand-navy mr-2">{lang === 'th' ? 'อีเมล:' : 'Email:'}</span>
                      <a href={`mailto:${t.contactEmail}`} className="hover:text-brand-blue transition-colors text-xs sm:text-sm">
                        {t.contactEmail}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-brand-blue flex-shrink-0" />
                    <div>
                      <span className="font-bold text-brand-navy mr-2">{lang === 'th' ? 'เว็บไซต์:' : 'Website:'}</span>
                      <a href={`https://${t.contactWeb}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors text-xs sm:text-sm">
                        {t.contactWeb}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
          </motion.div>
        ) : currentPage === 'services' && currentServiceId ? (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="pt-24"
          >
            <ServiceDetail
              serviceId={currentServiceId}
              lang={lang}
              onNavigate={navigate}
              onOpenQuote={() => setQuoteModalOpen(true)}
              onContactUs={() => {
                navigate('home');
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 200);
              }}
            />
          </motion.div>
        ) : currentPage === 'careers' ? (
          <motion.div
            key="careers"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <Careers lang={lang} />
          </motion.div>
        ) : currentPage === 'portfolio' ? (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="pt-24"
          >
            <Portfolio
              lang={lang}
              onNavigate={navigate}
              onOpenQuote={() => setQuoteModalOpen(true)}
            />
          </motion.div>
        ) : currentPage === 'knowledge' ? (
          <motion.div
            key="knowledge-list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="pt-24"
          >
            <KnowledgeList
              lang={lang}
              onNavigate={navigate}
            />
          </motion.div>
        ) : currentPage === 'article' && currentArticleId ? (
          <motion.div
            key="article-detail"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="pt-24"
          >
            <ArticleDetail
              articleId={currentArticleId}
              lang={lang}
              onNavigate={navigate}
              onContactUs={() => {
                navigate('home');
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 200);
              }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>


      {/* 12) FOOTER */}
      <footer id="footer" className="bg-[#0B2E5F] text-white pt-24 pb-12 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            
            {/* Col 1: THERMO description & Socials */}
            <div className="lg:col-span-4 space-y-6">
              <BrandLogo white />
              <p className="text-brand-surface/70 text-xs sm:text-sm font-sans leading-relaxed">
                {t.footerTagline}
              </p>
              
              {/* Social icons — แสดงเฉพาะช่องทางที่ใส่ URL จริงใน companyInfo (content.js)
                   ยังเป็น "#" อยู่ = ซ่อนไว้ (ลิงก์ว่างไม่ดีต่อ SEO) */}
              {(() => {
                const iconClass = "w-9 h-9 rounded-xl bg-white/5 hover:bg-brand-green hover:text-white flex items-center justify-center transition-colors text-white/80";
                const isReal = (u?: string) => !!u && u !== '#';
                const socials = [
                  { url: (companyInfo as any).facebookUrl, label: 'Facebook', icon: <Facebook className="w-4 h-4" /> },
                  { url: (companyInfo as any).youtubeUrl, label: 'YouTube', icon: <Youtube className="w-4 h-4" /> },
                  { url: (companyInfo as any).linkedinUrl, label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" /> },
                  { url: (companyInfo as any).twitterUrl, label: 'X', icon: (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ) },
                ].filter(x => isReal(x.url));
                if (socials.length === 0) return null;
                return (
                  <div className="flex items-center space-x-3.5">
                    {socials.map(x => (
                      <a key={x.label} href={x.url} target="_blank" rel="noopener noreferrer" className={iconClass} aria-label={x.label}>
                        {x.icon}
                      </a>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Col 2: Services links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-black tracking-widest text-brand-green uppercase">
                {t.footerServices}
              </h4>
              <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-brand-surface/70">
                <li>
                  <a href="#services" onClick={(e) => { e.preventDefault(); navigate('services', 'coldroom'); }} className="hover:text-white transition-colors">
                    {lang === 'th' ? 'ห้องเย็น' : 'Cold Room'}
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => { e.preventDefault(); navigate('services', 'chiller'); }} className="hover:text-white transition-colors">
                    {lang === 'th' ? 'ระบบชิลเลอร์' : 'Chiller System'}
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => { e.preventDefault(); navigate('services', 'special'); }} className="hover:text-white transition-colors">
                    {lang === 'th' ? 'ห้องควบคุมสภาวะแวดล้อม' : 'Environment Control'}
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => { e.preventDefault(); navigate('services', 'hispeeddoor'); }} className="hover:text-white transition-colors">
                    {lang === 'th' ? 'ประตูความเร็วสูง' : 'Hi-Speed Door'}
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={(e) => { e.preventDefault(); navigate('services', 'monitoring'); }} className="hover:text-white transition-colors">
                    {lang === 'th' ? 'ระบบมอนิเตอร์ริ่ง' : 'Monitoring System'}
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Company links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-black tracking-widest text-brand-green uppercase">
                {t.footerCompany}
              </h4>
              <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-brand-surface/70">
                <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-white transition-colors">{lang === 'th' ? 'เกี่ยวกับเรา' : 'About Us'}</a></li>
                <li><a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="hover:text-white transition-colors">{lang === 'th' ? 'ผลงานของเรา' : 'Our Projects'}</a></li>
                <li><a href={lang === 'en' ? '/en/careers' : '/careers'} onClick={(e) => { e.preventDefault(); navigate('careers'); }} className="hover:text-white transition-colors">{lang === 'th' ? 'ร่วมงานกับเรา' : 'Careers'}</a></li>
              </ul>
            </div>

            {/* Col 4: Knowledge base links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-black tracking-widest text-brand-green uppercase">
                {t.footerKnowledge}
              </h4>
              <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-brand-surface/70">
                <li><a href="#knowledge" onClick={(e) => handleNavClick(e, 'knowledge')} className="hover:text-white transition-colors">{lang === 'th' ? 'บทความ' : 'Articles'}</a></li>
                {/* ลิงก์บทความพื้นฐาน (แทน "เทคโนโลยีความเย็น" เดิมที่เป็นลิงก์ว่าง — ปุ่ม "บทความ" ด้านบนพาไปคลังความรู้อยู่แล้ว) */}
                <li><a href={lang === 'en' ? '/en/knowledge/coldroom-types/' : '/knowledge/coldroom-types/'} onClick={(e) => { e.preventDefault(); navigate('article', 'coldroom-types'); }} className="hover:text-white transition-colors">{lang === 'th' ? 'ห้องเย็นมีกี่ประเภท' : 'Types of Cold Rooms'}</a></li>
                {/* หน้าเครื่องคำนวณเป็นไฟล์ static แยกจาก React (public_html/tools/cold-room-calculator/)
                     ต้องใช้ลิงก์ธรรมดา ห้ามใช้ navigate() ไม่งั้นจะเจอหน้า 404 ของ SPA */}
                <li><a href="/tools/cold-room-calculator/" className="hover:text-white transition-colors">{lang === 'th' ? 'คำนวณขนาดห้องเย็น' : 'Cold Room Calculator (Thai)'}</a></li>
              </ul>
            </div>

            {/* Col 5: Contact Info */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-black tracking-widest text-brand-green uppercase">
                {t.footerContact}
              </h4>
              <div className="space-y-3 font-sans text-xs text-brand-surface/70">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{t.contactAddress}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <a href={`tel:${t.contactPhone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                    {t.contactPhone}
                  </a>
                </div>

                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <a href={`mailto:${t.contactEmail}`} className="hover:text-white transition-colors">
                    {t.contactEmail}
                  </a>
                </div>

                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <a href={`https://${t.contactWeb}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {t.contactWeb}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar copyright */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-surface/50 font-sans gap-4">
            <span>© 2026 THERMO Co., Ltd. All rights reserved.</span>
          </div>

        </div>
      </footer>

      {/* Interactive Modals and Detail drawers */}
      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
        lang={lang}
        translation={t}
      />

      <ServiceModal
        serviceId={selectedServiceId}
        onClose={() => setSelectedServiceId(null)}
        lang={lang}
        translation={t}
      />

      {/* Floating Action Button (FAB) & Scroll to Top */}
      <FloatingActions
        lang={lang}
        onOpenQuote={() => setQuoteModalOpen(true)}
        onNavigateToContact={() => {
          navigate('home');
          setTimeout(() => {
            const el = document.getElementById('contact');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 200);
        }}
      />

    </div>
  );
}
