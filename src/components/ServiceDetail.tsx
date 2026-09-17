import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, CheckSquare, ArrowRight, Home, Shield, PhoneCall, Calculator } from 'lucide-react';
import { servicesDetailList, serviceRelatedArticles, articlesList } from '../content';
import { ImageWithFallback } from './ImageWithFallback';

interface ServiceDetailProps {
  serviceId: string;
  lang: 'th' | 'en';
  onNavigate: (page: 'home' | 'services' | 'portfolio' | 'knowledge' | 'article', id?: string | null) => void;
  onOpenQuote: () => void;
  onContactUs: () => void;
}

export function ServiceDetail({
  serviceId,
  lang,
  onNavigate,
  onOpenQuote,
  onContactUs
}: ServiceDetailProps) {
  const service = servicesDetailList.find(s => s.id === serviceId) || servicesDetailList[0];

  // บทความที่เกี่ยวข้องกับบริการนี้ — อ่านจาก serviceRelatedArticles ใน content.js
  const relatedArticles = ((serviceRelatedArticles as any)[service.id] || [])
    .map((id: string) => articlesList.find(a => a.id === id))
    .filter(Boolean)
    .slice(0, 3);

  const title = lang === 'th' ? service.titleTh : service.titleEn;
  const intro = lang === 'th' ? service.introTh : service.introEn;
  const paragraphs = lang === 'th' ? service.paragraphsTh : service.paragraphsEn;
  const features = lang === 'th' ? service.featuresTh : service.featuresEn;
  const industries = lang === 'th' ? service.industriesTh : service.industriesEn;

  return (
    <div className="pt-24 pb-16 bg-[#FCFDFE]">
      {/* Breadcrumbs Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm font-sans font-medium text-brand-text/60">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-brand-blue flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>{lang === 'th' ? 'หน้าแรก' : 'Home'}</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-brand-text/30" />
          <button
            onClick={() => onNavigate('home', 'services')}
            className="hover:text-brand-blue transition-colors cursor-pointer"
          >
            {lang === 'th' ? 'บริการ' : 'Services'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-brand-text/30" />
          <span className="text-brand-navy font-bold truncate max-w-[200px] sm:max-w-none">
            {title}
          </span>
        </nav>
      </div>

      {/* Page Hero: Navy Band with Service Title (TH+EN) + Intro + Button */}
      <section className="bg-brand-navy text-white py-16 sm:py-20 relative overflow-hidden">
        {/* Background Subtle Watermark */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-5 pointer-events-none text-white">
          <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 11h-4.14l2.42-2.42c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0L13 10.02V5c0-.55-.45-1-1-1s-1 .45-1 1v5.02L8.13 7.16a.996.996 0 0 0-1.41 0c-.39.39-.39 1.03 0 1.42L9.14 11H5c-.55 0-1 .45-1 1s.45 1 1 1h4.14l-2.42 2.42c-.39.39-.39 1.03 0 1.42.2.2.45.3.71.3.26 0 .51-.1.71-.3L11 13.98V19c0 .55.45 1 1 1s1-.45 1-1v-5.02l2.87 2.87c.2.2.45.3.71.3.26 0 .51-.1.71-.3.39-.39.39-1.03 0-1.42L14.86 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-black tracking-[0.25em] text-brand-green uppercase block">
                {lang === 'th' ? 'รายละเอียดบริการ' : 'SERVICE DETAIL'}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">
                {title}
              </h1>
              {service.titleEn && lang === 'th' && (
                <p className="text-brand-surface/60 text-sm font-semibold tracking-wide uppercase font-mono">
                  {service.titleEn}
                </p>
              )}
              <p className="text-brand-surface/85 text-xs sm:text-base font-sans max-w-2xl leading-relaxed">
                {intro}
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col gap-3 w-full md:w-[340px]">
              <button
                onClick={onOpenQuote}
                className="bg-brand-green hover:bg-brand-green/90 text-white font-bold font-sans text-xs px-8 py-4 rounded-xl shadow-lg hover:shadow-brand-green/20 transition-all hover:-translate-y-0.5 inline-flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{lang === 'th' ? 'ขอใบเสนอราคา' : 'Get a Quote'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* ── ลิงก์เครื่องคำนวณขนาดห้องเย็น — เฉพาะหน้าห้องเย็น ──
                   หน้าเครื่องคำนวณเป็นไฟล์ static แยก (public_html/tools/cold-room-calculator/)
                   ต้องเป็น <a href> ธรรมดา ห้ามเปลี่ยนเป็น onNavigate() ไม่งั้นจะเจอ 404 ของ SPA */}
              {service.id === 'coldroom' && (
                <a
                  href="/tools/cold-room-calculator/"
                  className="group bg-white/10 hover:bg-white/15 border border-white/25 hover:border-brand-green text-white rounded-xl px-5 py-3.5 flex items-center gap-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green"
                >
                  <span className="p-2 rounded-lg bg-brand-green/20 text-brand-green flex-shrink-0">
                    <Calculator className="w-5 h-5" />
                  </span>
                  <span className="text-left leading-snug">
                    <span className="block font-bold font-sans text-sm">
                      {lang === 'th' ? 'เครื่องคำนวณขนาดห้องเย็นเบื้องต้น' : 'Cold room load calculator'}
                    </span>
                    <span className="block text-[11px] sm:text-xs text-brand-surface/70 font-sans">
                      {lang === 'th'
                        ? 'กรอก 4 ขั้นตอน รู้ขนาดเครื่องโดยประมาณ พร้อมภาพห้อง 3 มิติ'
                        : 'Estimate refrigeration capacity in 4 steps, with a 3D room view (Thai)'}
                    </span>
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-start">
          
          {/* Left Column: Image and Description Paragraphs */}
          <div className="lg:col-span-7 space-y-8">
            {/* Main Image with Gradient Overlay/Fallback */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-[320px] sm:h-[480px] rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative group"
            >
              <ImageWithFallback
                src={`/${service.imgName}`}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                fallbackText={title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Paragraphs Section */}
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight relative inline-block">
                {lang === 'th' ? 'รายละเอียดบริการ' : 'Service Description'}
                <div className="absolute bottom-[-6px] left-0 w-8 h-1 bg-brand-green rounded-full" />
              </h2>
              
              <div className="space-y-4 text-xs sm:text-sm font-sans text-brand-text/80 leading-relaxed pt-2">
                {paragraphs.map((p, index) => (
                  <p key={index}>{p}</p>
                ))}
              </div>

              {/* ── 3D Interactive Cold Room — เฉพาะหน้าห้องเย็น ──
                   ตัวโมเดลอยู่ที่ public/coldroom-3d.html (ไฟล์แยก แก้เนื้อหาใน CONTENT บนหัวไฟล์นั้น)
                   เปิดอัตโนมัติ (loading=lazy จะเริ่มโหลดเมื่อเลื่อนมาใกล้ ไม่ถ่วงตอนเปิดหน้า) */}
              {service.id === 'coldroom' && (
                <div className="pt-4">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight relative inline-block mb-2">
                    {lang === 'th' ? 'สำรวจส่วนประกอบห้องเย็น' : 'Explore the Cold Room'}
                    <div className="absolute bottom-[-6px] left-0 w-8 h-1 bg-brand-green rounded-full" />
                  </h2>
                  <div className="w-full h-[420px] sm:h-[540px] rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-[#F5F8FC] mt-4">
                    <iframe
                      src={`/coldroom-3d.html?lang=${lang}&v=16`}   /* ← แก้ไฟล์ 3D เมื่อไหร่ ให้บวกเลข v นี้ขึ้น 1 กัน cache */
                      title={lang === 'th' ? 'ห้องเย็น 3D อินเทอร์แอคทีฟ' : 'Interactive 3D cold room'}
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Key Specifications & Industries Chips */}
          <div className="lg:col-span-5 space-y-10 bg-brand-surface/20 border border-brand-blue/5 p-8 rounded-3xl">
            
            {/* Features Bullet Grid */}
            <div className="space-y-6">
              <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy tracking-tight relative inline-block">
                {lang === 'th' ? 'จุดเด่น / คุณสมบัติ' : 'Key Features & Specs'}
                <div className="absolute bottom-[-6px] left-0 w-8 h-1 bg-brand-green rounded-full" />
              </h2>
              
              <ul className="grid grid-cols-1 gap-4 font-sans text-xs sm:text-sm text-brand-text/85 pt-2">
                {features.map((feat, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="flex items-start space-x-3 group"
                  >
                    <CheckSquare className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="leading-normal font-medium">{feat}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Target Industries Chips */}
            <div className="space-y-4 pt-4 border-t border-brand-blue/5">
              <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy tracking-tight relative inline-block">
                {lang === 'th' ? 'การใช้งาน / กลุ่มอุตสาหกรรม' : 'Applications & Industries'}
                <div className="absolute bottom-[-6px] left-0 w-8 h-1 bg-brand-green rounded-full" />
              </h2>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {industries.map((ind, idx) => (
                  <span
                    key={idx}
                    className="bg-white border border-brand-blue/10 text-brand-navy font-bold font-sans text-xs px-3 py-2 rounded-xl shadow-sm hover:border-brand-blue/30 transition-all cursor-default"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust badge */}
            <div className="pt-6 border-t border-brand-blue/5 flex items-center space-x-3.5 text-xs text-brand-text/75 font-sans font-medium">
              <div className="p-2.5 rounded-xl bg-brand-green/10 text-brand-green flex-shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <p>
                {lang === 'th' 
                  ? 'ระบบทุกชิ้นผ่านการทดสอบมาตรฐานวิศวกรรมความเย็นอย่างเข้มงวดก่อนส่งมอบ' 
                  : 'Every system passes rigorous cooling engineering audits before final delivery.'}
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom CTA Band: "สนใจบริการนี้? ปรึกษาเราฟรี" */}
      <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-navy rounded-3xl text-white p-8 sm:p-12 relative overflow-hidden shadow-xl border border-white/5">
          {/* Subtle Watermark Snowflake */}
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-5 text-white pointer-events-none">
            <svg className="w-80 h-80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 11h-4.14l2.42-2.42c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0L13 10.02V5c0-.55-.45-1-1-1s-1 .45-1 1v5.02L8.13 7.16a.996.996 0 0 0-1.41 0c-.39.39-.39 1.03 0 1.42L9.14 11H5c-.55 0-1 .45-1 1s.45 1 1 1h4.14l-2.42 2.42c-.39.39-.39 1.03 0 1.42.2.2.45.3.71.3.26 0 .51-.1.71-.3L11 13.98V19c0 .55.45 1 1 1s1-.45 1-1v-5.02l2.87 2.87c.2.2.45.3.71.3.26 0 .51-.1.71-.3.39-.39.39-1.03 0-1.42L14.86 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black">
                {lang === 'th' ? 'สนใจระบบทำความเย็นรุ่นนี้?' : 'Interested in this refrigeration system?'}
              </h3>
              <p className="text-brand-surface/75 text-xs sm:text-sm font-sans">
                {lang === 'th' 
                  ? 'ทีมวิศวกรผู้เชี่ยวชาญพร้อมให้คำแนะนำ ออกแบบ และเข้าสำรวจหน้างานฟรี ไม่มีค่าใช้จ่าย' 
                  : 'Our specialist engineering team is ready to recommend designs and conduct free site surveys.'}
              </p>
            </div>

            <button
              onClick={onContactUs}
              className="bg-brand-green hover:bg-brand-green/90 text-white font-bold font-sans text-xs px-8 py-4 rounded-xl shadow-lg hover:shadow-brand-green/15 transition-all hover:-translate-y-0.5 flex items-center justify-center space-x-2 self-start md:self-auto cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{lang === 'th' ? 'ติดต่อเราเพื่อรับสิทธิ์พิเศษ' : 'Contact Us'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* บทความที่เกี่ยวข้อง — ให้คนอ่านต่อได้ และช่วยให้ Google เห็นว่าหน้าไหนเชื่อมกับหน้าไหน */}
      {relatedArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h3 className="text-lg sm:text-xl font-extrabold text-brand-navy tracking-tight relative inline-block mb-8">
            {lang === 'th' ? 'อ่านเพิ่มเติมก่อนตัดสินใจ' : 'Read before you decide'}
            <div className="absolute bottom-[-6px] left-0 w-8 h-1 bg-brand-green rounded-full" />
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedArticles.map((art: any) => (
              <a
                key={art.id}
                href={`/knowledge/${art.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('article', art.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left group p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-blue/25 transition-all cursor-pointer flex flex-col justify-between h-full no-underline"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-brand-blue">
                    {lang === 'th' ? art.categoryTh : art.categoryEn}
                  </span>
                  <h4 className="mt-2 text-sm font-bold text-brand-navy leading-snug group-hover:text-brand-blue transition-colors line-clamp-3">
                    {lang === 'th' ? art.titleTh : art.titleEn}
                  </h4>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-green">
                  {lang === 'th' ? 'อ่านบทความ' : 'Read article'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
