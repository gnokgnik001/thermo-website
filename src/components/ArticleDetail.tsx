import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Calendar, User, ArrowLeft, Send, Home, Tag, Sparkles } from 'lucide-react';
import { articlesList, articleRelations, servicesData, translations } from '../content';
import { ImageWithFallback } from './ImageWithFallback';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ArticleDetailProps {
  articleId: string;
  lang: 'th' | 'en';
  onNavigate: (page: 'home' | 'services' | 'portfolio' | 'knowledge' | 'article', id: string | null) => void;
  onContactUs: () => void;
}

export function ArticleDetail({ articleId, lang, onNavigate, onContactUs }: ArticleDetailProps) {
  // Find current article
  const article = useMemo(() => {
    return articlesList.find(a => a.id === articleId) || null;
  }, [articleId]);

  // บทความที่เกี่ยวข้องจริง — อ่านจาก articleRelations ใน content.js
  // ถ้าบทความไหนยังไม่ได้กำหนดไว้ จะเลือกบทความหมวดเดียวกันให้อัตโนมัติ
  const relatedArticles = useMemo(() => {
    if (!article) return [];
    const ids: string[] = (articleRelations as any)[articleId]?.articles || [];
    const picked = ids
      .map(id => articlesList.find(a => a.id === id))
      .filter((a): a is typeof articlesList[number] => Boolean(a));
    if (picked.length > 0) return picked.slice(0, 3);
    return articlesList
      .filter(a => a.id !== articleId && a.categoryTh === article.categoryTh)
      .concat(articlesList.filter(a => a.id !== articleId))
      .slice(0, 3);
  }, [articleId, article]);

  // บริการที่เกี่ยวข้องกับบทความนี้
  const relatedServices = useMemo(() => {
    const ids: string[] = (articleRelations as any)[articleId]?.services || [];
    return ids
      .map(id => servicesData.find(sv => sv.id === id))
      .filter((sv): sv is typeof servicesData[number] => Boolean(sv));
  }, [articleId]);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center font-sans">
        <h2 className="text-2xl font-bold text-brand-navy mb-3">
          {lang === 'th' ? 'ไม่พบข้อมูลบทความที่คุณต้องการ' : 'Article Not Found'}
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          {lang === 'th' ? 'บทความนี้ไม่มีอยู่จริง หรือถูกย้ายหมวดหมู่ไปแล้ว' : 'The article could not be found or has been moved.'}
        </p>
        <button
          onClick={() => onNavigate('knowledge', null)}
          className="bg-brand-navy text-white text-xs sm:text-sm px-5 py-2.5 rounded-xl cursor-pointer"
        >
          {lang === 'th' ? 'กลับไปที่คลังความรู้' : 'Back to Knowledge Center'}
        </button>
      </div>
    );
  }

  const title = lang === 'th' ? article.titleTh : article.titleEn;
  const date = lang === 'th' ? article.dateTh : article.dateEn;
  const category = lang === 'th' ? article.categoryTh : article.categoryEn;
  const contentParagraphs = lang === 'th' ? article.contentTh : article.contentEn;
  const bodyMarkdown = lang === 'th' ? (article as any).bodyMarkdownTh : (article as any).bodyMarkdownEn;

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      
      {/* Breadcrumb Area */}
      <div className="bg-brand-surface/40 py-4 sm:py-5 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-brand-navy/60">
            <button 
              onClick={() => onNavigate('home', null)}
              className="hover:text-brand-green flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>{lang === 'th' ? 'หน้าแรก' : 'Home'}</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <button 
              onClick={() => onNavigate('knowledge', null)}
              className="hover:text-brand-green cursor-pointer transition-colors"
            >
              <span>{lang === 'th' ? 'คลังความรู้' : 'Knowledge Center'}</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-brand-navy font-semibold truncate max-w-[200px] sm:max-w-[350px]">
              {title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          
          {/* Main Article column */}
          <div className="lg:col-span-8">
            
            {/* Return Link */}
            <button
              onClick={() => onNavigate('knowledge', null)}
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm text-brand-navy/60 hover:text-brand-blue font-semibold mb-6 group transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{lang === 'th' ? 'กลับหน้าคลังความรู้' : 'Back to Knowledge Base'}</span>
            </button>

            {/* Header Metadata */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3.5">
                <span className="inline-flex items-center space-x-1 bg-brand-green/10 text-brand-green font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-lg">
                  <Tag className="w-3 h-3" />
                  <span>{category}</span>
                </span>
                <span className="text-xs text-gray-300">|</span>
                <span className="flex items-center space-x-1 text-xs text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{date}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy font-sans tracking-tight leading-tight mb-4">
                {title}
              </h1>

              <div className="flex items-center space-x-2 text-xs sm:text-sm text-brand-navy/70 pb-5 border-b border-gray-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-surface/80 flex items-center justify-center font-bold text-xs text-brand-blue">
                  <User className="w-4 h-4 text-brand-blue" />
                </div>
                <span>
                  {lang === 'th' ? 'โดย: ทีมงานผู้เชี่ยวชาญ THERMO' : 'By: THERMO Engineering Team'}
                </span>
              </div>
            </div>

            {/* Article Cover Image with fallback */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-8 shadow-sm relative bg-brand-navy">
              <ImageWithFallback
                src={`/${article.imgName}`}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article body: markdown (with tables) when available, else legacy paragraph blocks */}
            <div className="max-w-none text-brand-text/90 font-sans leading-relaxed text-sm sm:text-base">
              {bodyMarkdown ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                    h2: (p) => <h2 className="text-xl sm:text-2xl font-bold text-brand-navy mt-10 mb-3" {...p} />,
                    h3: (p) => <h3 className="text-lg sm:text-xl font-bold text-brand-navy mt-8 mb-2" {...p} />,
                    p: (p) => <p className="mb-4 leading-relaxed font-light" {...p} />,
                    ul: (p) => <ul className="list-disc pl-5 space-y-1 mb-4" {...p} />,
                    ol: (p) => <ol className="list-decimal pl-5 space-y-2 mb-4" {...p} />,
                    li: (p) => <li className="leading-relaxed" {...p} />,
                    strong: (p) => <strong className="font-semibold text-brand-navy" {...p} />,
                    a: (p) => <a className="text-brand-blue underline hover:text-brand-navy" {...p} />,
                    blockquote: (p) => <blockquote className="border-l-4 border-brand-blue bg-brand-surface/40 p-4 my-5 rounded-r-lg text-brand-navy font-medium" {...p} />,
                    table: (p) => <div className="overflow-x-auto my-6"><table className="w-full border-collapse text-xs sm:text-sm" {...p} /></div>,
                    thead: (p) => <thead className="bg-brand-navy text-white" {...p} />,
                    th: (p) => <th className="border border-gray-300 px-3 py-2 text-left font-semibold" {...p} />,
                    td: (p) => <td className="border border-gray-200 px-3 py-2 align-top" {...p} />,
                  }}>{bodyMarkdown}</ReactMarkdown>
              ) : (
                <div className="space-y-5 sm:space-y-6">
                  {contentParagraphs.map((paragraph, pIdx) => {
                    const isBulletItem = paragraph.match(/^\d+\.\s/);
                    if (isBulletItem) {
                      const parts = paragraph.split(':');
                      const heading = parts[0];
                      const body = parts.slice(1).join(':');
                      return (
                        <div key={pIdx} className="bg-brand-surface/20 p-4 sm:p-5 rounded-xl border-l-4 border-brand-blue text-xs sm:text-sm my-4">
                          <strong className="text-brand-navy font-bold block mb-1 text-sm sm:text-base">{heading}</strong>
                          {body && <span className="text-brand-text/80 leading-relaxed block">{body.trim()}</span>}
                        </div>
                      );
                    }
                    return (<p key={pIdx} className="font-light">{paragraph}</p>);
                  })}
                </div>
              )}
            </div>

            {/* end of article decoration / signature */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm text-gray-400">
              <span>© THERMO CO., LTD. {new Date().getFullYear()}</span>
              <span className="italic">{lang === 'th' ? 'ข้อมูลเผยแพร่เพื่อการศึกษา' : 'Educational Resources'}</span>
            </div>

            {/* CTA Box (มีคำถามเกี่ยวกับระบบทำความเย็น? ปรึกษาเราฟรี) */}
            <div className="mt-12 bg-gradient-to-br from-brand-navy to-brand-blue rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-brand-navy/10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-green/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center space-x-1.5 mb-2.5">
                    <Sparkles className="w-5 h-5 text-brand-green" />
                    <span className="text-brand-green font-bold text-xs sm:text-sm uppercase tracking-wider">
                      {lang === 'th' ? 'คำปรึกษาฟรีจากวิศวกร' : 'Free Engineer Consultation'}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans mb-1 leading-snug">
                    {lang === 'th' ? 'มีคำถามเกี่ยวกับระบบทำความเย็น?' : 'Have Questions About Cooling Systems?'}
                  </h3>
                  <p className="text-brand-surface/75 text-xs sm:text-sm font-sans font-light max-w-md">
                    {lang === 'th' 
                      ? 'เราพร้อมช่วยออกแบบและแนะนำโซลูชันห้องเย็นและชิลเลอร์อุตสาหกรรมที่เหมาะสม คุ้มค่า ปลอดภัย' 
                      : 'We design custom chilling layouts and industrial cold rooms fitted precisely to your business scale.'}
                  </p>
                </div>

                <button
                  onClick={onContactUs}
                  className="bg-brand-green hover:bg-brand-green/90 text-white font-bold font-sans text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-brand-green/15 transition-all hover:-translate-y-0.5 flex items-center justify-center space-x-1.5 cursor-pointer self-start sm:self-auto shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'th' ? 'ปรึกษาเราฟรี' : 'Contact Us'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Related Articles column */}
          <div className="lg:col-span-4 lg:border-l lg:border-gray-100 lg:pl-8">

            {/* บริการที่เกี่ยวข้อง — พาคนอ่านจากบทความไปหน้าบริการ */}
            {relatedServices.length > 0 && (
              <div className="mb-10">
                <h3 className="text-base sm:text-lg font-bold text-brand-navy font-sans mb-4 pb-2 border-b border-gray-100">
                  {lang === 'th' ? 'บริการที่เกี่ยวข้อง' : 'Related Services'}
                </h3>
                <div className="space-y-2.5">
                  {relatedServices.map((sv) => {
                    const tt = translations[lang] as any;
                    const svTitle = tt[sv.titleKey] || sv.id;
                    return (
                      <a
                        key={sv.id}
                        href={`/services/${sv.id}`}
                        onClick={(e) => { e.preventDefault(); onNavigate('services', sv.id); }}
                        className="w-full text-left group flex items-center justify-between gap-3 p-3.5 rounded-xl bg-brand-surface/40 hover:bg-brand-blue/5 border border-brand-blue/10 transition-colors cursor-pointer no-underline"
                      >
                        <span className="text-xs sm:text-sm font-bold text-brand-navy group-hover:text-brand-blue transition-colors leading-snug">
                          {svTitle}
                        </span>
                        <ChevronRight className="w-4 h-4 text-brand-blue shrink-0" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            <h3 className="text-base sm:text-lg font-bold text-brand-navy font-sans mb-6 pb-2 border-b border-gray-100">
              {lang === 'th' ? 'บทความที่เกี่ยวข้อง' : 'Related Articles'}
            </h3>

            <div className="space-y-6">
              {relatedArticles.map((relArt) => {
                const relTitle = lang === 'th' ? relArt.titleTh : relArt.titleEn;
                const relDate = lang === 'th' ? relArt.dateTh : relArt.dateEn;
                const relCategory = lang === 'th' ? relArt.categoryTh : relArt.categoryEn;

                return (
                  <a
                    key={relArt.id}
                    href={`/knowledge/${relArt.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('article', relArt.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group cursor-pointer flex flex-col gap-3 pb-6 border-b border-gray-50 last:border-b-0 last:pb-0 no-underline"
                  >
                    {/* Tiny thumbnail */}
                    <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-brand-navy">
                      <ImageWithFallback
                        src={`/${relArt.imgName}`}
                        alt={relTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div>
                      {/* Badge / Date */}
                      <div className="flex items-center space-x-2 text-[10px] text-gray-400 mb-1.5 font-sans">
                        <span className="text-brand-blue font-bold uppercase">{relCategory}</span>
                        <span>•</span>
                        <span>{relDate}</span>
                      </div>

                      {/* Title */}
                      <h4 className="text-xs sm:text-sm font-bold text-brand-navy font-sans line-clamp-2 leading-snug group-hover:text-brand-blue transition-colors">
                        {relTitle}
                      </h4>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
