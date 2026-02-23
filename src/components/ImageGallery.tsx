// src/components/ImageGallery.tsx

import React, { useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Image as ImageIcon } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  className?: string;
}

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelect: (index: number) => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onSelect,
}) => {
  if (!isOpen) return null;

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.95)', 
        zIndex: 9999 
      }}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="bildergalerie"
    >
      {/* close button */}
      <button
        className="position-absolute top-0 end-0 m-4 btn btn-link text-white"
        onClick={onClose}
        aria-label="schließen"
      >
        <X size={32} />
      </button>

      {/* navigation - previous */}
      <button
        className="position-absolute start-0 m-4 btn btn-link text-white"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="vorheriges bild"
      >
        <ChevronLeft size={48} />
      </button>

      {/* main image */}
      <div 
        className="d-flex align-items-center justify-content-center"
        style={{ maxWidth: '90%', maxHeight: '85vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`galeriebild ${currentIndex + 1} von ${images.length}`}
          className="img-fluid rounded"
          style={{ maxHeight: '85vh', objectFit: 'contain' }}
        />
      </div>

      {/* navigation - next */}
      <button
        className="position-absolute end-0 m-4 btn btn-link text-white"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="nächstes bild"
      >
        <ChevronRight size={48} />
      </button>

      {/* image counter */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 text-white">
        <span className="fs-5">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* thumbnail strip */}
      <div 
        className="position-absolute bottom-0 start-50 translate-middle-x mb-5 pb-4 d-none d-md-flex gap-2 px-3 py-2 rounded"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflowX: 'auto', maxWidth: '80%' }}
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, idx) => (
          <button
            key={idx}
            className={`p-0 border-0 rounded overflow-hidden ${idx === currentIndex ? 'ring-2 ring-white' : 'opacity-50'}`}
            style={{ 
              width: '60px', 
              height: '60px',
              flexShrink: 0,
              outline: idx === currentIndex ? '2px solid white' : 'none',
            }}
            onClick={() => onSelect(idx)}
            aria-label={`bild ${idx + 1} anzeigen`}
            aria-current={idx === currentIndex ? 'true' : undefined}
          >
            <img
              src={img}
              alt=""
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  className = '' 
}) => {
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openLightbox = useCallback((index: number): void => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback((): void => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const goToNext = useCallback((): void => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback((): void => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const selectImage = useCallback((index: number): void => {
    setCurrentIndex(index);
  }, []);

  if (images.length === 0) {
    return (
      <section className={`section-padding ${className}`}>
        <div className="container text-center">
          <ImageIcon size={48} className="text-muted mb-3" />
          <p className="text-muted">keine bilder verfügbar</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section 
        id="gallery"
        className={`section-padding ${className}`}
        aria-labelledby="gallery-heading"
      >
        <div className="container">
          {/* section header */}
          <div className="section-header">
            <h2 id="gallery-heading" className="display-5">
              galerie
            </h2>
            <p className="lead">
              eindrücke aus unserem lokal
            </p>
          </div>

          {/* image grid */}
          <div className="row g-3">
            {images.map((image, index) => (
              <div 
                key={index} 
                className={`col-6 col-md-4 col-lg-3 ${index === 0 ? 'col-lg-6' : ''}`}
              >
                <div 
                  className="position-relative overflow-hidden rounded cursor-pointer"
                  style={{ 
                    aspectRatio: index === 0 ? '16/9' : '1/1',
                    cursor: 'pointer',
                  }}
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`bild ${index + 1} in großansicht öffnen`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      openLightbox(index);
                    }
                  }}
                >
                  <img
                    src={image}
                    alt={`la vida impression ${index + 1}`}
                    className="w-100 h-100 object-cover transition-transform"
                    style={{ 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    loading={index > 3 ? 'lazy' : 'eager'}
                  />
                  
                  {/* hover overlay */}
                  <div 
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0 transition-opacity"
                    style={{ 
                      backgroundColor: 'rgba(139, 0, 0, 0.7)',
                      transition: 'opacity 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0';
                    }}
                  >
                    <ZoomIn size={32} color="white" />
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* lightbox */}
      <Lightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={goToNext}
        onPrev={goToPrev}
        onSelect={selectImage}
      />
    </>
  );
};

export default ImageGallery;
