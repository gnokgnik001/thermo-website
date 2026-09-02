import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Calendar, Search, BookOpen, Home, Tag } from 'lucide-react';
import { articlesList, knowledgeCategories } from '../content';
import { ImageWithFallback } from './ImageWithFallback';

interface KnowledgeListProps {
  lang: 'th' | 'en';
  onNavigate: (page: 'home' | 'services' | 'portfolio' | 'knowledge' | 'article', id: string | null) => void;
}

export function KnowledgeList({ lang, onNavigate }: KnowledgeListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // รายการหมวดสร้างอัตโนมัติจากหมวดจริงของบทความใน content.js
  // เพิ่ม/ลบหมวดในบทความได้เลย ปุ่มตรงนี้จะขึ้นเอง (ทำงานเหมือนหน้า Portfolio)
  const categories = useMemo(() => {
    return [
      { id: 'all', label: lang === 'th' ? 'ทั้งหมด' : 'All Articles' },
      ...knowledgeCategories.map(c => ({
        id: c.th,
        label: lang === 'th' ? c.th : c.en
      }))
    ];
  }, [lang]);

  // Filter and search logic
  const filteredArticles = useMemo(() => {
    return articlesList.filter(article => {
      const matchesCategory = activeCategory === 'all' || article.categoryTh === activeCategory;
      const title = lang === 'th' ? article.titleTh : article.titleEn;
      const excerpt = lang === 'th' ? article.excerptTh : article.excerptEn;
      const query = searchQuery.toLowerCase();
      const matchesSearch = title.toLowerCase().includes(query) || excerpt.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, lang]);

  return (
    <div className="bg-brand-surface/10 min-h-screen pb-20">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-brand-navy to-brand-blue text-white py-12 md:py-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue/20 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs sm:text-sm text-white/70 mb-4 sm:mb-6 font-sans">
            <button 
              onClick={() => onNavigate('home', null)}
              className="hover:text-brand-green transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <Home className="w-4.5 h-4.5" />
              <span>{lang === 'th' ? 'หน้าแรก' : 'Home'}</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-white font-medium">
              {lang === 'th' ? 'คลังความรู้' : 'Knowledge Center'}
            </span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-brand-green/20 text-brand-green font-bold text-[11px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              {lang === 'th' ? 'สาระความรู้เชิงเทคนิค' : 'Technical Insights'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight mb-3 sm:mb-4">
              {lang === 'th' ? 'คลังความรู้ระบบทำความเย็น' : 'Cooling Knowledge Center'}
            </h1>
            <p className="text-sm sm:text-lg text-brand-surface/80 leading-relaxed font-sans font-light">
              {lang === 'th' 
                ? 'บทความ เทคนิควิศวกรรมความเย็น และการดูแลรักษาระบบทำความเย็นอุตสาหกรรมอย่างถูกต้องจากทีมผู้เชี่ยวชาญของ THERMO' 
                : 'Articles, thermal engineering tips, and industrial cooling system maintenance guides curated by our expert engineering team.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        
        {/* Controls: Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 sm:mb-10 bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm">
          
          {/* Filter Chips */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 order-2 md:order-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-sans font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-brand-navy text-white shadow-md shadow-brand-navy/10'
                    : 'bg-brand-surface/30 text-brand-navy hover:bg-brand-surface/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 order-1 md:order-2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'th' ? 'ค้นหาบทความ...' : 'Search articles...'}
              className="w-full bg-brand-surface/30 text-brand-navy placeholder:text-gray-400 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:border-brand-blue/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/10 transition-all font-sans"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article, index) => {
              const title = lang === 'th' ? article.titleTh : article.titleEn;
              const excerpt = lang === 'th' ? article.excerptTh : article.excerptEn;
              const date = lang === 'th' ? article.dateTh : article.dateEn;
              const category = lang === 'th' ? article.categoryTh : article.categoryEn;

              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => onNavigate('article', article.id)}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  {/* Article Photo */}
                  <div className="h-52 relative bg-brand-navy overflow-hidden">
                    <ImageWithFallback
                      src={`/${article.imgName}`}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category overlay */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-brand-navy text-[10px] sm:text-xs font-bold font-sans px-3 py-1 rounded-lg flex items-center space-x-1 shadow-sm">
                      <Tag className="w-3 h-3 text-brand-green" />
                      <span>{category}</span>
                    </div>
                  </div>

                  {/* Article content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Date */}
                      <div className="flex items-center space-x-1.5 text-xs text-gray-400 font-sans mb-2.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{date}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-brand-navy font-sans mb-2.5 leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors">
                        {title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-brand-text/75 font-sans leading-relaxed line-clamp-3 mb-4">
                        {excerpt}
                      </p>
                    </div>

                    {/* Footer Read More link */}
                    <div className="pt-3 border-t border-gray-50 flex items-center text-brand-blue group-hover:text-brand-green text-xs sm:text-sm font-bold font-sans transition-colors">
                      <span>{lang === 'th' ? 'อ่านต่อบทความ' : 'Read Full Article'}</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          /* Empty Search/Filter State */
          <div className="text-center py-16 sm:py-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-brand-navy font-sans mb-1">
              {lang === 'th' ? 'ไม่พบข้อมูลบทความที่ค้นหา' : 'No Articles Found'}
            </h3>
            <p className="text-sm text-gray-400 font-sans mb-6">
              {lang === 'th' 
                ? 'ลองปรับเปลี่ยนคำค้นหา หรือเปลี่ยนไปเลือกหมวดหมู่อื่นเพื่อค้นหาหัวข้อที่คุณต้องการ' 
                : 'Try adjusting your search keywords or switching to a different category chip.'}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="bg-brand-navy hover:bg-brand-blue text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer font-sans"
            >
              {lang === 'th' ? 'ล้างค่าการค้นหา' : 'Reset Search Filters'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
