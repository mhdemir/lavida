// src/components/Navbar.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { Wine, UtensilsCrossed, Image as ImageIcon, Mail, Menu, X, Newspaper } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  isExternal?: boolean;
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

// Navigation links for homepage (anchor links)
const homeNavLinks: NavLink[] = [
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
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleScroll = useCallback((): void => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 50);

    // determine active section (only on homepage)
    if (isHomePage) {
      const sections = homeNavLinks.map(link => link.href.substring(1));
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
    }
  }, [isHomePage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Reset scroll state when changing pages
  useEffect(() => {
    setIsScrolled(window.scrollY > 50);
    setActiveSection('');
  }, [location.pathname]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
    if (!isHomePage) return; // Only handle anchor clicks on homepage
    
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsExpanded(false);
    }
  }, [isHomePage]);

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
        <Link 
          className="navbar-brand d-flex align-items-center gap-2" 
          to="/"
          onClick={() => {
            if (isHomePage) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <LogoBrand src={logoSrc} />
        </Link>

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
            {/* Homepage anchor links (only on homepage) */}
            {isHomePage && homeNavLinks.map((link) => (
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
            
            {/* News & Blog Link */}
            <li className="nav-item">
              <Link
                className={`nav-link d-flex align-items-center gap-2 ${location.pathname === '/news-blog' ? 'active' : ''}`}
                to="/news-blog"
                onClick={closeNavbar}
                aria-current={location.pathname === '/news-blog' ? 'page' : undefined}
              >
                <Newspaper size={18} />
                <span>news & blog</span>
              </Link>
            </li>
          </ul>

          {/* cta button (only on homepage) */}
          {isHomePage && (
            <div className="ms-lg-3 mt-3 mt-lg-0">
              <a
                href="#contact"
                className="btn btn-outline-light btn-sm"
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                reservieren
              </a>
            </div>
          )}
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
