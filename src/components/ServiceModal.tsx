/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Shield, Zap, RefreshCw } from 'lucide-react';
import { Translation } from '../types';
import ImageWithFallback from './ImageWithFallback';
import { serviceDetailsData } from '../content';

interface ServiceDetail {
  title: string;
  subTitle: string;
  img: string;
  features: string[];
  specs: { label: string; value: string }[];
  description: string;
}

interface ServiceModalProps {
  serviceId: string | null;
  onClose: () => void;
  lang: 'th' | 'en';
  translation: any;
}

export function ServiceModal({ serviceId, onClose, lang, translation }: ServiceModalProps) {
  if (!serviceId) return null;

  const detail = serviceDetailsData[lang][serviceId];
  if (!detail) return null;

  return (
    <AnimatePresence>
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
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-brand-blue/10 z-10 max-h-[90vh] flex flex-col"
        >
          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors backdrop-blur-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Content wrapper */}
          <div className="overflow-y-auto flex-1">
            {/* Service Banner Image */}
            <div className="h-64 relative bg-brand-navy">
              <ImageWithFallback
                src={`/${detail.img}`}
                alt={detail.title}
                className="w-full h-full"
                fallbackText={detail.title}
                overlayClass="bg-gradient-to-t from-brand-navy via-brand-navy/50 to-transparent"
              />
              <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                <span className="text-xs font-bold text-brand-green tracking-widest uppercase block mb-1">
                  {detail.subTitle}
                </span>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
                  {detail.title}
                </h3>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Description */}
              <div>
                <p className="text-brand-text/90 font-sans text-base leading-relaxed">
                  {detail.description}
                </p>
              </div>

              {/* Two Column details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Features (Checkmarks) */}
                <div>
                  <h4 className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-4 border-l-4 border-brand-blue pl-3 flex items-center">
                    <Zap className="w-4 h-4 mr-1.5 text-brand-blue" />
                    {lang === 'th' ? 'คุณสมบัติเด่น' : 'Key Features'}
                  </h4>
                  <ul className="space-y-3">
                    {detail.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-brand-text/80 font-sans">
                        <span className="bg-brand-green/10 text-brand-green p-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Specs (Table) */}
                <div>
                  <h4 className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-4 border-l-4 border-brand-blue pl-3 flex items-center">
                    <Shield className="w-4 h-4 mr-1.5 text-brand-blue" />
                    {lang === 'th' ? 'ข้อมูลทางเทคนิค' : 'Technical Specifications'}
                  </h4>
                  <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-50 bg-gray-50/20 font-sans text-sm">
                    {detail.specs.map((spec, idx) => (
                      <div key={idx} className="grid grid-cols-2 p-3 gap-2">
                        <span className="font-semibold text-brand-navy/80">{spec.label}</span>
                        <span className="text-brand-text/80 text-right md:text-left">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="bg-brand-surface p-4 border-t border-brand-blue/5 flex items-center justify-between">
            <span className="text-xs text-brand-text/60 font-mono flex items-center">
              <RefreshCw className="w-3 h-3 mr-1 animate-spin-slow text-brand-blue" />
              ISO 9001:2015 Certificated
            </span>
            <button
              onClick={onClose}
              className="bg-brand-navy hover:bg-brand-navy/90 text-white font-bold font-sans text-xs px-5 py-2 rounded-lg transition-colors cursor-pointer"
            >
              {lang === 'th' ? 'ปิดหน้านี้' : 'Close Details'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
export default ServiceModal;
