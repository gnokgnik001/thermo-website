/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { sendQuote, prewarmMailer } from '../sendQuote';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle, Phone, Mail, Building, User } from 'lucide-react';
import { Translation } from '../types';
import { lineConfig } from '../content';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'th' | 'en';
  translation: any;
}

export function QuoteModal({ isOpen, onClose, lang, translation }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    service: 'coldroom',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => { if (isOpen) prewarmMailer(); }, [isOpen]);
  const [errors, setErrors] = useState({ name: false, phone: false });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleCustomSubmit = async () => {
    const hasNameError = !formData.name.trim();
    const hasPhoneError = !formData.phone.trim();

    setErrors({ name: hasNameError, phone: hasPhoneError });
    setSubmitError(null);

    if (hasNameError || hasPhoneError) {
      return;
    }

    setIsSubmitting(true);

    const serviceLabelMap: Record<string, string> = {
      coldroom: lang === 'th' ? "ห้องเย็น (Cold Room)" : "Cold Room",
      chiller: lang === 'th' ? "ระบบชิลเลอร์ (Chiller System)" : "Chiller System",
      special: lang === 'th' ? "ห้องควบคุมสภาวะแวดล้อม & งานเฉพาะทาง" : "Environment Control & Specialist Rooms",
      hispeeddoor: lang === 'th' ? "ประตูความเร็วสูง (Hi-Speed Door)" : "Hi-Speed Door",
      monitoring: lang === 'th' ? "ระบบมอนิเตอร์ริ่ง (Monitoring System)" : "Monitoring System",
      others: lang === 'th' ? "อื่นๆ" : "Others"
    };

    const serviceType = serviceLabelMap[formData.service] || formData.service;

    const result = await sendQuote({
      name: formData.name,
      company: formData.company,
      phone: formData.phone,
      email: formData.email,
      serviceType: serviceType,
      message: formData.details
    }, lang);

    if (result.ok) {
      setIsSuccess(true);
      setFormData({
        company: '',
        name: '',
        phone: '',
        email: '',
        service: 'coldroom',
        details: ''
      });
      setErrors({ name: false, phone: false });
    } else {
      setSubmitError(result.error || (lang === 'th' ? "เกิดข้อผิดพลาด กรุณาลองใหม่ หรือโทร 02 717 8065-7" : "An error occurred. Please try again or call 02 717 8065-7"));
    }
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({
      company: '',
      name: '',
      phone: '',
      email: '',
      service: 'coldroom',
      details: ''
    });
    setErrors({ name: false, phone: false });
    setSubmitError(null);
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-brand-blue/10 z-10"
          >
            {/* Header */}
            <div className="bg-brand-navy p-6 text-white flex justify-between items-center relative">
              {/* Subtle background snowflake */}
              <div className="absolute right-4 top-4 text-white/5 opacity-10 pointer-events-none">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 11h-4.14l2.42-2.42c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0L13 10.02V5c0-.55-.45-1-1-1s-1 .45-1 1v5.02L8.13 7.16a.996.996 0 0 0-1.41 0c-.39.39-.39 1.03 0 1.42L9.14 11H5c-.55 0-1 .45-1 1s.45 1 1 1h4.14l-2.42 2.42c-.39.39-.39 1.03 0 1.42.2.2.45.3.71.3.26 0 .51-.1.71-.3L11 13.98V19c0 .55.45 1 1 1s1-.45 1-1v-5.02l2.87 2.87c.2.2.45.3.71.3.26 0 .51-.1.71-.3.39-.39.39-1.03 0-1.42L14.86 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold tracking-tight">
                  {lang === 'th' ? 'ขอใบเสนอราคาระบบทำความเย็น' : 'Request a Cooling System Quote'}
                </h3>
                <p className="text-xs text-brand-surface/80 mt-1 font-sans font-normal">
                  {lang === 'th' ? 'กรุณากรอกข้อมูลเพื่อรับคำปรึกษาจากวิศวกรผู้เชี่ยวชาญ' : 'Please provide details for expert engineer consultation.'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
              {/* Quick-action buttons at the top - Prominent for Phone/LINE */}
              <div className="mb-6 bg-[#EAF1F8]/40 border border-brand-blue/10 p-4 rounded-xl">
                <p className="text-center text-xs font-bold text-brand-navy mb-3">
                  {lang === 'th' ? 'ติดต่อด่วนผ่าน โทรศัพท์ หรือ LINE (แนะนำ)' : 'Quick Contact via Phone or LINE (Recommended)'}
                </p>
                <div className={`grid ${lineConfig.enabled ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                  <a
                    href="tel:027178065"
                    className="flex items-center justify-center space-x-2 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold font-sans text-xs py-3 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 text-center cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-green" />
                    <span>02-717-8065-7</span>
                  </a>
                  {lineConfig.enabled && (
                    <a
                      href={lineConfig.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-brand-green hover:bg-brand-green/90 text-white font-bold font-sans text-xs py-3 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 text-center cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 10.3c0-4.6-4.9-8.3-11-8.3S2 5.7 2 10.3c0 4.1 3.9 7.6 9.2 8.2.4 0 .8.2 1 .5l.2 1.3c.1.5-.1.8-.4.9l-1.9 1.1s-.2.1-.1.3c0 .1.1.2.2.2h.3c.4 0 .9-.2 1.3-.5l2.4-1.7c.3-.2.6-.3.9-.3 5.3-.2 8.8-3.7 8.8-7.9zm-15.3 2.9H7.2c-.3 0-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5h1.5c.3 0 .5.2.5.5s-.2.5-.5.5H7.7v1.2h1c.3 0 .5.2.5.5s-.2.5-.5.5h-1v1.3h1.5c.3 0 .5.2.5.5s-.2.5-.5.5zm4 0h-1.5c-.3 0-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5s.5.2.5.5v3.5h1c.3 0 .5.2.5.5s-.2.5-.5.5zm3.1-.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5s.5.2.5.5v4.5zm5.1.5H19c-.3 0-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5h2.1c.3 0 .5.2.5.5s-.2.5-.5.5h-1.6v1.2H21c.3 0 .5.2.5.5s-.2.5-.5.5h-1v1.3H21c.3 0 .5.2.5.5s-.2.5-.5.5z"/>
                      </svg>
                      <span>LINE Official</span>
                    </a>
                  )}
                </div>
                <div className="flex items-center my-3.5">
                  <div className="flex-grow border-t border-brand-blue/10"></div>
                  <span className="flex-shrink mx-3 text-[9px] text-brand-text/50 uppercase font-black tracking-widest">
                    {lang === 'th' ? 'หรือ กรอกข้อมูลด้านล่าง' : 'OR FILL OUT THE FORM'}
                  </span>
                  <div className="flex-grow border-t border-brand-blue/10"></div>
                </div>
              </div>

              {!isSuccess ? (
                <div className="space-y-4">
                  {/* Company */}
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                      {lang === 'th' ? 'ชื่อบริษัท / หน่วยงาน' : 'Company / Organization'}
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Building className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue font-sans text-brand-text bg-gray-50/50"
                        placeholder={lang === 'th' ? 'บริษัท ของคุณ จำกัด' : 'Your Company Co., Ltd.'}
                      />
                    </div>
                  </div>

                  {/* Contact Name */}
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                      {lang === 'th' ? 'ชื่อผู้ติดต่อ *' : 'Contact Person *'}
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: false });
                        }}
                        className={`w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none font-sans text-brand-text bg-gray-50/50 ${
                          errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-brand-blue'
                        }`}
                        placeholder={lang === 'th' ? 'สมชาย ใจดี' : 'John Doe'}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-[11px] mt-1 font-sans">
                        {lang === 'th' ? 'กรุณากรอกชื่อผู้ติดต่อ' : 'Please enter contact person name'}
                      </p>
                    )}
                  </div>

                  {/* Grid Phone / Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                        {lang === 'th' ? 'เบอร์โทรศัพท์ *' : 'Phone Number *'}
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                          <Phone className="w-4 h-4" />
                        </span>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: false });
                          }}
                          className={`w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none font-sans text-brand-text bg-gray-50/50 ${
                            errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-brand-blue'
                          }`}
                          placeholder="081-234-5678"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-[11px] mt-1 font-sans">
                          {lang === 'th' ? 'กรุณากรอกเบอร์โทรศัพท์' : 'Please enter phone number'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                        {lang === 'th' ? 'อีเมล' : 'Email Address'}
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue font-sans text-brand-text bg-gray-50/50"
                          placeholder="name@company.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Select */}
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                      {lang === 'th' ? 'ระบบทำความเย็นที่สนใจ' : 'Interested Cooling Solution'}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue font-sans text-brand-text bg-gray-50/50 cursor-pointer"
                    >
                      <option value="coldroom">{lang === 'th' ? 'ห้องเย็น (Cold Room)' : 'Cold Room'}</option>
                      <option value="chiller">{lang === 'th' ? 'ระบบชิลเลอร์ (Chiller System)' : 'Chiller System'}</option>
                      <option value="special">{lang === 'th' ? 'ห้องควบคุมสภาวะแวดล้อม & งานเฉพาะทาง' : 'Environment Control & Specialist Rooms'}</option>
                      <option value="door">{lang === 'th' ? 'ประตูความเร็วสูง (Hi-Speed Door)' : 'Hi-Speed Door'}</option>
                      <option value="monitor">{lang === 'th' ? 'ระบบมอนิเตอร์ริ่ง (Monitoring System)' : 'Monitoring System'}</option>
                    </select>
                  </div>

                  {/* Details */}
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                      {lang === 'th' ? 'รายละเอียดเพิ่มเติม (ขนาด หรือ อุณหภูมิที่ต้องการ)' : 'Additional Details (Dimensions or Required Temperature)'}
                    </label>
                    <textarea
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-blue font-sans text-brand-text bg-gray-50/50 h-20 resize-none"
                      placeholder={lang === 'th' ? 'ตัวอย่าง: ห้องเย็นขนาด 6x8 เมตร ควบคุมอุณหภูมิที่ -18 องศาเซลเซียส สำหรับเก็บเนื้อสัตว์แช่แข็ง' : 'Example: Cold room size 6x8m, temperature controlled at -18°C for frozen meat storage.'}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    {submitError && (
                      <p className="text-red-500 text-xs text-center mb-3 font-semibold font-sans">
                        {submitError}
                      </p>
                    )}
                    <button
                      onClick={handleCustomSubmit}
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded-xl font-bold font-sans text-white bg-brand-green hover:bg-brand-green/90 shadow-md shadow-brand-green/10 cursor-pointer transition-all flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>{lang === 'th' ? 'กำลังส่ง...' : 'Sending...'}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{translation.btnQuote}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Success Screen */
                <div className="text-center py-6 px-2 flex flex-col items-center">
                  <CheckCircle className="w-14 h-14 text-brand-green mb-4" />
                  <h4 className="text-lg font-bold text-brand-navy mb-2">
                    {lang === 'th' ? 'ส่งข้อมูลสำเร็จ!' : 'Submitted Successfully!'}
                  </h4>
                  <div className="bg-green-50 p-4 rounded-xl border border-brand-green/20 mb-6 max-w-sm text-xs sm:text-sm text-brand-navy font-bold font-sans leading-relaxed text-center">
                    {lang === 'th' 
                      ? 'ขอบคุณค่ะ เราได้รับข้อมูลแล้ว จะติดต่อกลับโดยเร็วที่สุด' 
                      : 'Thank you, we have received your information. We will contact you back as soon as possible.'}
                  </div>

                  {/* Prominent Phone & LINE for Success Modal too */}
                  <div className={`grid ${lineConfig.enabled ? 'grid-cols-2' : 'grid-cols-1'} gap-3 w-full mb-6 max-w-xs`}>
                    <a
                      href="tel:027178065"
                      className="flex items-center justify-center space-x-2 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold font-sans text-xs py-2.5 rounded-lg shadow-sm cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-green" />
                      <span>02-717-8065-7</span>
                    </a>
                    {lineConfig.enabled && (
                      <a
                        href={lineConfig.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 bg-brand-green hover:bg-brand-green/90 text-white font-bold font-sans text-xs py-2.5 rounded-lg shadow-sm cursor-pointer"
                      >
                        <span>LINE Official</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={resetForm}
                    className="bg-brand-navy hover:bg-brand-navy/90 text-white font-semibold px-6 py-2 rounded-lg text-sm transition-all shadow-md cursor-pointer"
                  >
                    {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close Window'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
