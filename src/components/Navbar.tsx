// src/components/Navbar.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { Wine, UtensilsCrossed, Image as ImageIcon, Mail, Menu, X } from 'lucide-react';

interface NavLink {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavbarProps {
  logoSrc?: string;
}

// logo component with pdf fallback
const LogoBrand: React.FC<{ src?: string }> = ({ src }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <span 
        className="fs-4 fw-bold"
        style={{ 
          color: '#FFF9FB', 
          fontFamily: 'var(--lavida-font-heading, "Playfair Display", Georgia, serif)'
        }}
      >
        <span style={{ color: '#A7754D' }}>la</span> vida
      </span>
    );
  }

  return (
    <img 
      src={src} 
      alt="la vida logo" 
      height="40"
      className="d-inline-block"
      onError={() => setHasError(true)}
      style={{ maxHeight: '40px', objectFit: 'contain' }}
    />
  );
};

const navLinks: NavLink[] = [
  {
    id: 'specials',
    label: 'specials',
    href: '#specials',
    icon: <Wine size={18} />,
  },
  {
    id: 'menu',
    label: 'karte',
    href: '#menu',
    icon: <UtensilsCrossed size={18} />,
  },
  {
    id: 'gallery',
    label: 'galerie',
    href: '#gallery',
    icon: <ImageIcon size={18} />,
  },
  {
    id: 'contact',
    label: 'kontakt',
    href: '#contact',
    icon: <Mail size={18} />,
  },
];

export const Navbar: React.FC<NavbarProps> = ({ logoSrc }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const handleScroll = useCallback((): void => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 50);

    // determine active section
    const sections = navLinks.map(link => link.href.substring(1));
    for (const sectionId of sections.reverse()) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsExpanded(false);
    }
  }, []);

  const toggleNavbar = useCallback((): void => {
    setIsExpanded(prev => !prev);
  }, []);

  const closeNavbar = useCallback((): void => {
    setIsExpanded(false);
  }, []);

  return (
    <nav 
      className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="hauptnavigation"
    >
      <div className="container">
        {/* logo / brand */}
        <a 
          className="navbar-brand d-flex align-items-center gap-2" 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <LogoBrand src={logoSrc} />
        </a>

        {/* mobile toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-expanded={isExpanded}
          aria-label="navigation umschalten"
          aria-controls="navbarNav"
        >
          {isExpanded ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* navigation links */}
        <div 
          className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.id}>
                <a
                  className={`nav-link d-flex align-items-center gap-2 ${activeSection === link.id ? 'active' : ''}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* cta button */}
          <div className="ms-lg-3 mt-3 mt-lg-0">
            <a
              href="#reservation"
              className="btn btn-outline-light btn-sm"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              reservieren
            </a>
          </div>
        </div>
      </div>

      {/* backdrop for mobile */}
      {isExpanded && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
          style={{ 
            zIndex: -1, 
            backgroundColor: 'rgba(7, 14, 15, 0.5)',
            opacity: 0.5
          }}
          onClick={closeNavbar}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;
