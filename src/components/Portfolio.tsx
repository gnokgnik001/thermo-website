import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, MapPin, Grid, Home, Filter, ArrowRight } from 'lucide-react';
import { portfolioProjectsList, portfolioCategories } from '../content';
import { ImageWithFallback } from './ImageWithFallback';

/* ไอคอนประจำหมวด — ใช้กับการ์ดที่ยังไม่มีรูปถ่ายจริง
   พอใส่รูปจริงเข้าไป (ตามชื่อใน imgName) ไอคอนจะหายไปเอง */
const ICONS: Record<string, string> = {
  'คลังสินค้าและโลจิสติกส์': 'M3 9.5 12 4l9 5.5M5 10v9h14v-9M9 19v-5h6v5',
  'อาหารและเครื่องดื่ม':     'M7 3v8a2 2 0 0 0 4 0V3M9 11v10M17 3c-1.5 2-2 4-2 6s.5 3 2 3v9',
  'เกษตรและฟาร์ม':           'M12 21V9m0 0c0-3 2-5 5-5 0 3-2 5-5 5Zm0 0c0-3-2-5-5-5 0 3 2 5 5 5ZM5 21h14',
  'โรงแรม รีสอร์ต และงานครัว': 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5M9 11h.01M15 11h.01',
  'อุตสาหกรรมการผลิต':       'M3 21h18M4 21V10l5 3V10l5 3V10l5 3v8M8 17h.01M13 17h.01M18 17h.01',
  'วิจัยและการแพทย์':        'M9 3v6l-5 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-9V3M8 3h8M7 15h10',
};
function categoryIcon(categoryTh: string) {
  const d = ICONS[categoryTh] || ICONS['อุตสาหกรรมการผลิต'];
  return (
    <svg className="w-11 h-11" fill="none" stroke="currentColor" strokeWidth={1.4}
         strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

interface PortfolioProps {
  lang: 'th' | 'en';
  onNavigate: (page: 'home' | 'services' | 'portfolio', id?: string | null) => void;
  onOpenQuote: () => void;
}

export function Portfolio({ lang, onNavigate, onOpenQuote }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // รายชื่อ filter สร้างอัตโนมัติจากหมวดหมู่ที่มีอยู่ใน content.js
  // เพิ่ม/ลบหมวดใน content.js ได้เลย ปุ่มตรงนี้จะขึ้นเอง ไม่ต้องมาแก้ไฟล์นี้
  const filterCategories = useMemo(() => {
    return [
      { id: 'all', label: lang === 'th' ? 'ทั้งหมด' : 'All' },
      ...portfolioCategories.map(c => ({
        id: c.th,
        label: lang === 'th' ? c.th : c.en
      }))
    ];
  }, [lang]);

  // Filter projects by active category in JavaScript
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return portfolioProjectsList;
    }
    return portfolioProjectsList.filter(project => project.categoryTh === activeFilter);
  }, [activeFilter]);

  return (
    <div className="pt-24 pb-20 bg-[#FCFDFE]">
      
      {/* Breadcrumbs */}
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
          <span className="text-brand-navy font-bold">
            {lang === 'th' ? 'ผลงานของเรา' : 'Our Projects'}
          </span>
        </nav>
      </div>

      {/* Navy Hero Header */}
      <section className="bg-brand-navy text-white py-16 relative overflow-hidden">
        {/* Background Subtle Watermark */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-5 text-white pointer-events-none">
          <svg className="w-80 h-80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 11h-4.14l2.42-2.42c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0L13 10.02V5c0-.55-.45-1-1-1s-1 .45-1 1v5.02L8.13 7.16a.996.996 0 0 0-1.41 0c-.39.39-.39 1.03 0 1.42L9.14 11H5c-.55 0-1 .45-1 1s.45 1 1 1h4.14l-2.42 2.42c-.39.39-.39 1.03 0 1.42.2.2.45.3.71.3.26 0 .51-.1.71-.3L11 13.98V19c0 .55.45 1 1 1s1-.45 1-1v-5.02l2.87 2.87c.2.2.45.3.71.3.26 0 .51-.1.71-.3.39-.39.39-1.03 0-1.42L14.86 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-black tracking-[0.25em] text-brand-green uppercase block">
              {lang === 'th' ? 'ผลงานความสำเร็จ' : 'OUR PORTFOLIO'}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">
              {lang === 'th' ? 'ผลงานการติดตั้งที่ผ่านมา' : 'Our Engineering Projects'}
            </h1>
            <p className="text-brand-surface/75 text-xs sm:text-base font-sans max-w-2xl leading-relaxed">
              {lang === 'th'
                ? 'ความภูมิใจในผลงานการออกแบบและส่งมอบระบบทำความเย็นอุตสาหกรรมมาตรฐานสูงมากกว่า 40 ปี ครอบคลุมหลากหลายกลุ่มอุตสาหกรรมชั้นนำ'
                : 'Over 40 years of pride in delivering and custom engineering international-standard industrial refrigeration systems across top industries.'}
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Dynamic Filter Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-brand-blue/5 pb-6">
          <div className="flex items-center space-x-2 text-brand-navy font-bold text-sm">
            <Filter className="w-4 h-4 text-brand-blue" />
            <span>{lang === 'th' ? 'ตัวกรองผลงาน:' : 'Filter Projects:'}</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {filterCategories.map((category) => {
              const isActive = activeFilter === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
                    isActive
                      ? 'bg-brand-green text-white shadow-md shadow-brand-green/15 scale-102'
                      : 'bg-white text-brand-text border border-gray-200 hover:border-brand-blue/30 hover:bg-brand-surface/20'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Grid of 9-12 project cards */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const title = lang === 'th' ? project.titleTh : project.titleEn;
              const client = lang === 'th' ? project.clientTh : project.clientEn;
              const scope = lang === 'th' ? project.scopeTh : project.scopeEn;
              const categoryLabel = lang === 'th' ? project.categoryTh : (
                filterCategories.find(f => f.id === project.categoryTh)?.label || project.categoryTh
              );
              const location = lang === 'th' ? project.locationTh : project.locationEn;

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col h-full"
                  onClick={onOpenQuote}
                >
                  {/* Image with fallbacks & Zoom Effect */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-surface/10">
                    <ImageWithFallback
                      src={`/${project.imgName}`}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      fallbackIcon={categoryIcon(project.categoryTh)}
                      fallbackText={lang === 'th' ? project.categoryTh : project.categoryEn}
                    />
                    {/* Category Label overlay */}
                    <span className="absolute top-4 left-4 bg-brand-green text-white text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider z-10 shadow-sm">
                      {categoryLabel}
                    </span>
                  </div>

                  {/* Content card info */}
                  <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                    <div className="space-y-2">
                      <p className="text-[11px] font-black uppercase tracking-wider text-brand-green font-sans">
                        {client}
                      </p>
                      <h3 className="font-extrabold text-sm sm:text-base text-brand-navy group-hover:text-brand-blue transition-colors leading-snug">
                        {title}
                      </h3>
                      <p className="text-xs text-brand-text/60 leading-relaxed line-clamp-3">
                        {scope}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-brand-text/60 border-t border-gray-50 pt-4">
                      <div className="flex items-center space-x-1 font-sans">
                        <MapPin className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                        <span className="truncate">{location}</span>
                      </div>
                      
                      <span className="text-[10px] font-bold text-brand-blue group-hover:text-brand-green transition-colors flex items-center space-x-1 font-sans">
                        <span>{lang === 'th' ? 'ปรึกษาโครงการ' : 'Inquire'}</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 font-sans text-brand-text/60 space-y-3 bg-brand-surface/20 rounded-3xl border border-dashed border-gray-200 mt-10">
            <Grid className="w-12 h-12 text-brand-text/30 mx-auto" />
            <p className="font-bold">
              {lang === 'th' ? 'ไม่พบผลงานในหมวดหมู่นี้' : 'No projects found in this category'}
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="text-brand-blue underline text-xs font-bold font-sans cursor-pointer"
            >
              {lang === 'th' ? 'ดูผลงานทั้งหมด' : 'Show all projects'}
            </button>
          </div>
        )}

      </section>

      {/* Request Call to Action inside page */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-gradient-to-br from-brand-navy to-brand-blue/90 rounded-3xl text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-lg border border-white/5">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-xl sm:text-3xl font-black">
              {lang === 'th' ? 'ต้องการระบบทำความเย็นสำหรับโครงการของคุณ?' : 'Need a cooling system for your project?'}
            </h2>
            <p className="text-brand-surface/70 text-xs sm:text-sm font-sans">
              {lang === 'th'
                ? 'ให้ผู้เชี่ยวชาญจาก THERMO ช่วยวิเคราะห์ ออกแบบ และนำเสนอราคาที่ดีที่สุดสำหรับคุณ สำรวจหน้างานฟรี!'
                : 'Let THERMO specialists analyze, design, and provide the absolute best quote for your workspace. Free site surveys!'}
            </p>
            <div className="pt-4">
              <button
                onClick={onOpenQuote}
                className="bg-brand-green hover:bg-brand-green/90 text-white font-bold font-sans text-xs px-8 py-4 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 inline-flex items-center space-x-1.5 cursor-pointer"
              >
                <span>{lang === 'th' ? 'ประเมินราคาโครงการฟรี' : 'Request a Free Quote'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
