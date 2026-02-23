// src/components/Hero.tsx

import React, { useCallback } from 'react';
import { ChevronDown, Wine, Music, UtensilsCrossed, Sparkles } from 'lucide-react';

interface HeroProps {
  backgroundImage?: string;
  logoSrc?: string;
}

export const Hero: React.FC<HeroProps> = ({ 
  backgroundImage = '/images/image1.jpeg',
  logoSrc 
}) => {
  const scrollToMenu = useCallback((): void => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToSpecials = useCallback((): void => {
    const specialsSection = document.getElementById('specials');
    if (specialsSection) {
      specialsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section 
      className="position-relative d-flex align-items-center justify-content-center min-vh-100 overflow-hidden"
      style={{
        backgroundColor: '#070E0F',
      }}
      aria-label="willkommen bei la vida"
    >
      {/* blurred background image */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) brightness(0.4)',
          transform: 'scale(1.1)', // verhindert weiße ränder durch blur
        }}
        aria-hidden="true"
      />

      {/* gradient overlay für bessere lesbarkeit */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: 'linear-gradient(135deg, rgba(116, 14, 20, 0.6) 0%, rgba(0, 37, 0, 0.6) 100%)',
        }}
        aria-hidden="true"
      />

      {/* decorative elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" aria-hidden="true">
        <div 
          className="position-absolute rounded-circle opacity-10"
          style={{
            width: '600px',
            height: '600px',
            top: '-200px',
            right: '-200px',
            background: 'radial-gradient(circle, rgba(255,249,251,0.3) 0%, transparent 70%)',
          }}
        />
        <div 
          className="position-absolute rounded-circle opacity-10"
          style={{
            width: '400px',
            height: '400px',
            bottom: '-100px',
            left: '-100px',
            background: 'radial-gradient(circle, rgba(255,249,251,0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* content */}
      <div className="container position-relative z-1 text-center text-white px-4">
        {/* logo */}
        {logoSrc ? (
          <img 
            src={logoSrc} 
            alt="la vida" 
            className="mb-4"
            style={{ 
              maxHeight: '120px', 
              maxWidth: '80%',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))',
              objectFit: 'contain'
            }}
          />
        ) : (
          <div className="mb-4">
            <Sparkles size={64} className="mb-3" style={{ color: '#A7754D' }} />
          </div>
        )}

        {/* subtitle */}
        <p className="fs-2 fw-light mb-4" style={{ letterSpacing: '0.05em' }}>
          tapas, meze, vino, musik
        </p>

        {/* tagline */}
        <p className="fs-5 mb-5 mx-auto" style={{ maxWidth: '600px', opacity: 0.9 }}>
          erlebe mediterrane lebensart in entspannter atmosphäre. 
          authentische tapas, frische meze, erlesene weine und mediterranes ambiente.
        </p>

        {/* feature icons */}
        <div className="d-flex justify-content-center gap-4 gap-md-5 mb-5 flex-wrap">
          <div className="text-center">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2"
              style={{ 
                width: '60px', 
                height: '60px', 
                backgroundColor: 'rgba(255,249,251,0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <UtensilsCrossed size={28} />
            </div>
            <p className="small mb-0 opacity-75">Tapas & Meze</p>
          </div>
          <div className="text-center">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2"
              style={{ 
                width: '60px', 
                height: '60px', 
                backgroundColor: 'rgba(255,249,251,0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Wine size={28} />
            </div>
            <p className="small mb-0 opacity-75">erlesene weine</p>
          </div>
          <div className="text-center">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2"
              style={{ 
                width: '60px', 
                height: '60px', 
                backgroundColor: 'rgba(255,249,251,0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Music size={28} />
            </div>
            <p className="small mb-0 opacity-75">mediterranes ambiente</p>
          </div>
        </div>

        {/* cta buttons */}
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <button 
            onClick={scrollToMenu}
            className="btn btn-lg px-4"
            style={{ 
              backgroundColor: '#A7754D', 
              color: '#FFF9FB',
              border: 'none'
            }}
          >
            <UtensilsCrossed size={20} className="me-2" />
            zur speisekarte
          </button>
          <button 
            onClick={scrollToSpecials}
            className="btn btn-outline-light btn-lg px-4"
          >
            <Sparkles size={20} className="me-2" />
            unsere specials
          </button>
        </div>
      </div>

      {/* scroll indicator */}
      <div 
        className="position-absolute bottom-0 start-50 translate-middle-x mb-4 text-white text-center"
        style={{ cursor: 'pointer' }}
        onClick={scrollToSpecials}
        role="button"
        aria-label="nach unten scrollen"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            scrollToSpecials();
          }
        }}
      >
        <p className="small mb-2 opacity-75">entdecke mehr</p>
        <ChevronDown size={32} className="animate-bounce" />
      </div>

      {/* custom animation styles */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
