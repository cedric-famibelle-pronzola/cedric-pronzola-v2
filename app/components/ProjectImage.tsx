"use client";

import { useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProjectImage = ({ src, alt, className = '' }: ProjectImageProps) => {
  const [imageError, setImageError] = useState(false);

  return imageError ? (
    <div 
      className={`flex items-center justify-center bg-foreground/5 ${className}`}
      aria-label={alt}
    >
      <div className="text-center p-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="mx-auto mb-2 text-foreground/30"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
        <p className="text-sm text-foreground/50">{alt}</p>
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImageError(true)}
    />
  );
};

export default ProjectImage;
