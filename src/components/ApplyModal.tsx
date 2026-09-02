/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { sendApplication } from '../sendApplication';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle, Phone, Mail, User, MessageCircle, UploadCloud, FileText, Trash2 } from 'lucide-react';
import { companyInfo, lineConfig } from '../content';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'th' | 'en';
  positionTitle: string;
}

const MAX_MB = 5;

export function ApplyModal({ isOpen, onClose, lang, positionTitle }: ApplyModalProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', line: '' });
  const [resume, setResume] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState({ name: false, phone: false, email: false, resume: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const phoneDigits = (companyInfo.phone || '02 717 8065-7').replace(/[^0-9]/g, '');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const isPdf =
      file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setResume(null);
      setFileError(lang === 'th' ? 'กรุณาแนบไฟล์ PDF เท่านั้น' : 'PDF files only, please.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setResume(null);
      setFileError(
        lang === 'th'
          ? `ไฟล์ใหญ่เกินไป (สูงสุด ${MAX_MB}MB)`
          : `File too large (max ${MAX_MB}MB).`
      );
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setResume(file);
    setErrors((prev) => ({ ...prev, resume: false }));
  };

  const removeFile = () => {
    setResume(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    const nextErrors = {
      name: !formData.name.trim(),
      phone: !formData.phone.trim(),
      email: !formData.email.trim() || !emailValid,
      resume: !resume,
    };
    setErrors(nextErrors);
    setSubmitError(null);

    if (nextErrors.name || nextErrors.phone || nextErrors.email || nextErrors.resume) {
      return;
    }

    setIsSubmitting(true);

    const payload = new FormData();
    payload.append('name', formData.name.trim());
    payload.append('phone', formData.phone.trim());
    payload.append('email', formData.email.trim());
    payload.append('line', formData.line.trim());
    payload.append('position', positionTitle);
    payload.append('resume', resume as File);

    const result = await sendApplication(payload, lang);

    if (result.ok) {
      setIsSuccess(true);
    } else {
      setSubmitError(
        result.error ||
          (lang === 'th'
            ? 'เกิดข้อผิดพลาด กรุณาลองใหม่ หรือส่งอีเมลมาที่ info@thermothailand.com'
            : 'An error occurred. Please try again or email info@thermothailand.com')
      );
    }
    setIsSubmitting(false);
  };

  const resetAndClose = () => {
    setFormData({ name: '', phone: '', email: '', line: '' });
    setResume(null);
    setFileError(null);
    setErrors({ name: false, phone: false, email: false, resume: false });
    setSubmitError(null);
    setIsSuccess(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onClose();
  };

  const inputBase =
    'w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none font-sans text-brand-text bg-gray-50/50';

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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-brand-blue/10 z-10"
          >
            {/* Header */}
            <div className="bg-brand-navy p-6 text-white flex justify-between items-center relative">
              <div className="relative z-10 pr-4">
                <h3 className="text-xl font-bold tracking-tight">
                  {lang === 'th' ? 'สมัครงานกับ THERMO' : 'Apply to THERMO'}
                </h3>
                <p className="text-xs text-brand-surface/80 mt-1 font-sans font-normal">
                  {lang === 'th' ? 'ตำแหน่ง: ' : 'Position: '}
                  <span className="font-bold text-white">{positionTitle}</span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors relative z-10 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-104px)]">
              {!isSuccess ? (
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                      {lang === 'th' ? 'ชื่อ-นามสกุล *' : 'Full Name *'}
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
                        className={`${inputBase} ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-brand-blue'}`}
                        placeholder={lang === 'th' ? 'สมชาย ใจดี' : 'John Doe'}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-[11px] mt-1 font-sans">
                        {lang === 'th' ? 'กรุณากรอกชื่อ-นามสกุล' : 'Please enter your full name'}
                      </p>
                    )}
                  </div>

                  {/* Phone / Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                        {lang === 'th' ? 'เบอร์โทรศัพท์ *' : 'Phone *'}
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
                          className={`${inputBase} ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-brand-blue'}`}
                          placeholder="081-234-5678"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-[11px] mt-1 font-sans">
                          {lang === 'th' ? 'กรุณากรอกเบอร์โทรศัพท์' : 'Please enter your phone'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                        {lang === 'th' ? 'อีเมล *' : 'Email *'}
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: false });
                          }}
                          className={`${inputBase} ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-brand-blue'}`}
                          placeholder="name@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-[11px] mt-1 font-sans">
                          {lang === 'th' ? 'กรุณากรอกอีเมลให้ถูกต้อง' : 'Please enter a valid email'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* LINE (optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                      {lang === 'th' ? 'LINE ID (ถ้ามี)' : 'LINE ID (optional)'}
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <MessageCircle className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        value={formData.line}
                        onChange={(e) => setFormData({ ...formData, line: e.target.value })}
                        className={`${inputBase} border-gray-200 focus:border-brand-blue`}
                        placeholder={lang === 'th' ? 'ไอดีไลน์ของคุณ' : 'Your LINE ID'}
                      />
                    </div>
                  </div>

                  {/* Resume upload */}
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                      {lang === 'th' ? 'แนบไฟล์ Resume (PDF) *' : 'Attach Resume (PDF) *'}
                    </label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {!resume ? (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full flex flex-col items-center justify-center gap-2 py-6 px-4 rounded-lg border-2 border-dashed cursor-pointer transition-colors bg-gray-50/50 hover:bg-brand-surface/30 ${
                          errors.resume ? 'border-red-400' : 'border-gray-300 hover:border-brand-blue'
                        }`}
                      >
                        <UploadCloud className="w-7 h-7 text-brand-blue" />
                        <span className="text-sm font-semibold text-brand-navy">
                          {lang === 'th' ? 'คลิกเพื่อเลือกไฟล์ PDF' : 'Click to choose a PDF file'}
                        </span>
                        <span className="text-[11px] text-brand-text/50 font-sans">
                          {lang === 'th' ? `ไฟล์ .pdf ขนาดไม่เกิน ${MAX_MB}MB` : `.pdf, up to ${MAX_MB}MB`}
                        </span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 py-3 px-4 rounded-lg border border-brand-green/30 bg-green-50/60">
                        <FileText className="w-6 h-6 text-brand-green flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-brand-navy truncate">{resume.name}</p>
                          <p className="text-[11px] text-brand-text/50 font-sans">
                            {(resume.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors flex-shrink-0"
                          aria-label={lang === 'th' ? 'ลบไฟล์' : 'Remove file'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {(fileError || errors.resume) && (
                      <p className="text-red-500 text-[11px] mt-1 font-sans">
                        {fileError ||
                          (lang === 'th' ? 'กรุณาแนบไฟล์ Resume (PDF)' : 'Please attach your resume (PDF)')}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="pt-1">
                    {submitError && (
                      <p className="text-red-500 text-xs text-center mb-3 font-semibold font-sans">
                        {submitError}
                      </p>
                    )}
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded-xl font-bold font-sans text-white bg-brand-green hover:bg-brand-green/90 shadow-md shadow-brand-green/10 cursor-pointer transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>{lang === 'th' ? 'กำลังส่งใบสมัคร...' : 'Sending...'}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{lang === 'th' ? 'ส่งใบสมัคร' : 'Submit Application'}</span>
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-brand-text/50 mt-3 font-sans">
                      {lang === 'th'
                        ? 'หรือโทรสอบถามฝ่ายบุคคลได้ที่ '
                        : 'Or call our HR team at '}
                      <a href={`tel:${phoneDigits}`} className="font-bold text-brand-blue hover:underline">
                        {companyInfo.phone || '02 717 8065-7'}
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                /* Success */
                <div className="text-center py-6 px-2 flex flex-col items-center">
                  <CheckCircle className="w-14 h-14 text-brand-green mb-4" />
                  <h4 className="text-lg font-bold text-brand-navy mb-2">
                    {lang === 'th' ? 'ส่งใบสมัครสำเร็จ!' : 'Application Sent!'}
                  </h4>
                  <div className="bg-green-50 p-4 rounded-xl border border-brand-green/20 mb-6 max-w-sm text-xs sm:text-sm text-brand-navy font-bold font-sans leading-relaxed text-center">
                    {lang === 'th'
                      ? 'ขอบคุณค่ะ เราได้รับใบสมัครและไฟล์ Resume ของคุณแล้ว ฝ่ายบุคคลจะพิจารณาและติดต่อกลับหากคุณสมบัติตรงกับตำแหน่ง'
                      : 'Thank you! We have received your application and resume. Our HR team will review it and contact you if your profile matches.'}
                  </div>

                  <div className={`grid ${lineConfig.enabled ? 'grid-cols-2' : 'grid-cols-1'} gap-3 w-full mb-6 max-w-xs`}>
                    <a
                      href={`tel:${phoneDigits}`}
                      className="flex items-center justify-center space-x-2 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold font-sans text-xs py-2.5 rounded-lg shadow-sm cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-green" />
                      <span>{companyInfo.phone || '02 717 8065-7'}</span>
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
                    onClick={resetAndClose}
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
