import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, FileText, ChevronUp, X, HeartHandshake } from 'lucide-react';
import { lineConfig } from '../content';

interface FloatingActionsProps {
  lang: 'th' | 'en';
  onOpenQuote: () => void;
  onNavigateToContact: () => void;
}

export function FloatingActions({ lang, onOpenQuote, onNavigateToContact }: FloatingActionsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Monitor scroll height to show scroll-to-top button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        // Also close the contact panel when scrolled back to top
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const contactOptions = [
    {
      id: 'quote',
      labelTh: 'ขอใบเสนอราคา',
      labelEn: 'Request Quote',
      icon: <FileText className="w-4.5 h-4.5 text-white" />,
      colorClass: 'bg-brand-blue hover:bg-brand-blue/95',
      action: () => {
        onOpenQuote();
        setIsOpen(false);
      }
    },
    ...(lineConfig.enabled ? [{
      id: 'line',
      labelTh: 'แชท LINE',
      labelEn: 'LINE Chat',
      icon: (
        <svg className="w-4.5 h-4.5 text-white fill-current" viewBox="0 0 24 24">
          <path d="M24 10.3c0-4.6-4.9-8.3-11-8.3S2 5.7 2 10.3c0 4.1 3.9 7.6 9.2 8.2.4 0 .8.2 1 .5l.2 1.3c.1.5-.1.8-.4.9l-1.9 1.1s-.2.1-.1.3c0 .1.1.2.2.2h.3c.4 0 .9-.2 1.3-.5l2.4-1.7c.3-.2.6-.3.9-.3 5.3-.2 8.8-3.7 8.8-7.9z" />
        </svg>
      ),
      colorClass: 'bg-[#06C755] hover:bg-[#06C755]/90',
      action: () => {
        window.open(lineConfig.url, '_blank', 'noopener,noreferrer');
        setIsOpen(false);
      }
    }] : []),
    {
      id: 'call',
      labelTh: 'โทร 02 717 8065-7',
      labelEn: 'Call 02 717 8065-7',
      icon: <Phone className="w-4.5 h-4.5 text-white" />,
      colorClass: 'bg-brand-navy hover:bg-brand-navy/95',
      action: () => {
        window.location.href = 'tel:027178065';
        setIsOpen(false);
      }
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3 pointer-events-none select-none font-sans">
      
      {/* Expanded Quick Contact Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="flex flex-col items-end space-y-2 mb-2 pointer-events-auto"
          >
            {contactOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={opt.action}
                className="flex items-center space-x-2.5 group cursor-pointer"
                aria-label={lang === 'th' ? opt.labelTh : opt.labelEn}
              >
                {/* Text Label */}
                <span className="bg-white text-brand-navy border border-gray-100 text-xs font-bold px-3.5 py-2 rounded-xl shadow-md group-hover:bg-brand-surface/30 group-hover:text-brand-blue transition-all duration-200">
                  {lang === 'th' ? opt.labelTh : opt.labelEn}
                </span>
                {/* Circular Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110 ${opt.colorClass}`}>
                  {opt.icon}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center space-x-3 pointer-events-auto">
        {/* Scroll-To-Top Button */}
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-brand-navy/90 hover:bg-brand-navy text-white flex items-center justify-center shadow-lg hover:shadow-brand-navy/20 cursor-pointer hover:-translate-y-1 transition-all"
              title={lang === 'th' ? 'เลื่อนขึ้นบน' : 'Scroll to Top'}
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating Contact Action Button (FAB) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-brand-green/20 cursor-pointer transition-all hover:scale-105 duration-300 relative ${
            isOpen 
              ? 'bg-brand-navy text-white rotate-90' 
              : 'bg-brand-green text-white hover:bg-brand-green/90 animate-pulse-subtle'
          }`}
          aria-label="Toggle contact menu"
          title={lang === 'th' ? 'ติดต่อสอบถามด่วน' : 'Quick Contact'}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <HeartHandshake className="w-6 h-6" />
              {/* Green notification indicator dot */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-blue border-2 border-brand-green rounded-full" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
