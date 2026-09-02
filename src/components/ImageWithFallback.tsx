/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
  fallbackText?: string;
  overlayClass?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackIcon,
  fallbackText,
  overlayClass = '',
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div 
        className={`relative flex flex-col items-center justify-center text-center overflow-hidden min-h-[180px] bg-brand-surface/20 border border-brand-blue/10 rounded-xl ${className}`}
      >
        {/* Navy to Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy/95 to-brand-blue" />
        
        {/* Decorative Grid Mesh */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_14px]" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white p-6">
          {fallbackIcon ? (
            <div className="mb-2 text-brand-green">{fallbackIcon}</div>
          ) : (
            <svg 
              className="w-10 h-10 mb-2 text-brand-green" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" 
              />
            </svg>
          )}
          {fallbackText && (
            <span className="text-sm font-semibold tracking-wide font-sans text-brand-surface text-shadow">
              {fallbackText}
            </span>
          )}
          <span className="text-[10px] text-white/40 font-mono mt-1.5 bg-black/25 px-2 py-0.5 rounded-full">
            {src?.split('/').pop() || 'no-file.png'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setHasError(true)}
        referrerPolicy="no-referrer"
        {...props}
      />
      {overlayClass && (
        <div className={`absolute inset-0 pointer-events-none ${overlayClass}`} />
      )}
    </div>
  );
}
export default ImageWithFallback;
