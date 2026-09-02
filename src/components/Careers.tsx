import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ApplyModal } from './ApplyModal';
import { 
  Briefcase, 
  MapPin, 
  CheckCircle2, 
  Mail, 
  Phone, 
  ArrowRight, 
  Clock, 
  Building2, 
  Sparkles, 
  Award,
  Send,
  UserCheck
} from 'lucide-react';
import { careersContent, companyInfo } from '../content';
import { ImageWithFallback } from './ImageWithFallback';

interface CareersProps {
  lang: 'th' | 'en';
}

export function Careers({ lang }: CareersProps) {
  const content = careersContent;
  const openings = content.openings || [];

  // ตำแหน่งที่กำลังสมัคร (null = ยังไม่เปิดฟอร์ม)
  const [applyPosition, setApplyPosition] = useState<string | null>(null);

  return (
    <div className="pt-28 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-black tracking-[0.25em] text-brand-blue block uppercase">
            {content.subtitle[lang]}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-navy tracking-tight relative inline-block">
            {content.title[lang]}
            <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-16 h-1 bg-brand-green rounded-full" />
          </h1>
          <p className="text-base sm:text-lg text-brand-text/80 font-sans pt-4 font-medium">
            {content.tagline[lang]}
          </p>
        </div>

        {/* Intro & Poster Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-sm space-y-6"
          >
            <div className="flex items-center space-x-3 text-brand-navy">
              <div className="p-3 bg-brand-surface/50 rounded-xl text-brand-blue">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                {lang === 'th' ? 'เกี่ยวกับทีม THERMO' : 'About THERMO Team'}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-brand-text/80 leading-relaxed font-sans">
              {content.intro[lang]}
            </p>

            {/* Why Join Us List */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-brand-green" />
                <span>{lang === 'th' ? 'จุดเด่นของการทำงานกับเรา' : 'Why Work With Us'}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {content.whyJoin[lang].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 bg-slate-50 p-3 rounded-xl border border-gray-100/80">
                    <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-brand-navy font-medium leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 group bg-brand-navy aspect-[3/2]">
              <ImageWithFallback
                src={`/${content.posterImg}`}
                alt={content.title[lang]}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                fallbackText={content.title[lang]}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Benefits Bar */}
        <div className="bg-gradient-to-r from-brand-navy to-[#0F3B77] rounded-2xl p-6 sm:p-8 text-white shadow-md mb-16 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <Award className="w-6 h-6 text-brand-green flex-shrink-0" />
              <div>
                <h3 className="font-extrabold text-lg sm:text-xl text-white">
                  {content.benefits.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-sans">
                  {content.benefits.note[lang]}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5 pt-2">
            {content.benefits.items[lang].map((benefit, idx) => (
              <span 
                key={idx}
                className="bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white/90"
              >
                ✓ {benefit}
              </span>
            ))}
          </div>
        </div>

        {/* Job Openings Section */}
        <div className="space-y-8 mb-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Briefcase className="w-6 h-6 text-brand-blue" />
              <h2 className="text-2xl font-black text-brand-navy">
                {lang === 'th' ? 'ตำแหน่งงานที่เปิดรับ' : 'Open Positions'}
              </h2>
            </div>
            {openings.length > 0 && (
              <span className="bg-brand-green/10 text-brand-green font-bold text-xs px-3 py-1 rounded-full">
                {openings.length} {lang === 'th' ? 'ตำแหน่ง' : 'Positions'}
              </span>
            )}
          </div>

          {openings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {openings.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-extrabold text-lg text-brand-navy leading-snug">
                        {job.title[lang]}
                      </h3>
                      <span className="bg-brand-blue/10 text-brand-blue font-bold text-[11px] px-2.5 py-1 rounded-md flex-shrink-0 uppercase tracking-wider">
                        {job.type[lang]}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-semibold text-brand-text/70">
                      <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0" />
                      <span>{job.location[lang]}</span>
                    </div>

                    <div className="pt-3 border-t border-gray-100 space-y-2">
                      <p className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                        {lang === 'th' ? 'คุณสมบัติผู้สมัคร:' : 'Requirements:'}
                      </p>
                      <ul className="space-y-1.5 pl-1">
                        {job.requirements[lang].map((req, rIdx) => (
                          <li key={rIdx} className="text-xs sm:text-sm text-brand-text/80 flex items-start space-x-2 font-sans">
                            <span className="text-brand-blue font-bold mt-0.5">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setApplyPosition(job.title[lang])}
                      className="w-full bg-brand-navy hover:bg-brand-blue text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{lang === 'th' ? 'ส่งประวัติสมัครตำแหน่งนี้' : 'Apply for this position'}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 sm:p-12 border border-gray-100 shadow-sm text-center max-w-2xl mx-auto space-y-4">
              <div className="w-12 h-12 bg-brand-surface rounded-full flex items-center justify-center mx-auto text-brand-navy">
                <UserCheck className="w-6 h-6" />
              </div>
              <p className="text-sm sm:text-base text-brand-text/80 font-sans leading-relaxed">
                {content.noOpenings[lang]}
              </p>
            </div>
          )}
        </div>

        {/* How to apply footer box */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm text-center max-w-3xl mx-auto space-y-6">
          <h3 className="font-extrabold text-xl text-brand-navy">
            {lang === 'th' ? 'วิธีการสมัครงาน' : 'How to Apply'}
          </h3>
          <p className="text-xs sm:text-sm text-brand-text/70 max-w-xl mx-auto">
            {lang === 'th' 
              ? 'ส่งประวัติส่วนตัว (Resume / CV) พร้อมระบุตำแหน่งงานและเงินเดือนที่คาดหวัง มาที่อีเมลของบริษัท หรือโทรสอบถามฝ่ายบุคคลได้โดยตรง'
              : 'Please send your Resume / CV specifying position and expected salary to our email, or call directly for inquiries.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`mailto:${companyInfo.email}?subject=${encodeURIComponent(lang === 'th' ? 'สมัครงาน THERMO' : 'THERMO Job Application')}`}
              className="w-full sm:w-auto bg-brand-green hover:bg-brand-green/90 text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span>{content.howToApply[lang]}: {companyInfo.email}</span>
            </a>
            <a
              href={`tel:${companyInfo.phone.replace(/[^0-9]/g, '')}`}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-brand-navy font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 flex-shrink-0 text-brand-blue" />
              <span>{companyInfo.phone}</span>
            </a>
          </div>
        </div>

      </div>

      {/* ฟอร์มสมัครงาน (เปิดเมื่อกดปุ่มสมัครตำแหน่งใดตำแหน่งหนึ่ง) */}
      <ApplyModal
        isOpen={applyPosition !== null}
        onClose={() => setApplyPosition(null)}
        lang={lang}
        positionTitle={applyPosition || ''}
      />
    </div>
  );
}
