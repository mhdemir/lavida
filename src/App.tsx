// src/App.tsx

import React, { useMemo, useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  Instagram,
  Music,
  Wine,
  UtensilsCrossed
} from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Specials from './components/Specials';
import MenuGrid from './components/MenuGrid';

import ImageGallery from './components/ImageGallery';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import custom styles
import './styles/custom.css';

// asset paths - logo als png
const logoSrc = '/logo/La%20Vida%20Logo.png';

// import images from /images folder
const galleryImages: string[] = [
  '/images/image2.jpeg',
  '/images/image3.jpeg',
  '/images/image4.jpeg',
  '/images/image5.jpeg',
  '/images/image6.jpeg',
  '/images/image9.jpeg',
  '/images/image10.jpeg',
  '/images/image12.jpeg',
  '/images/image13.jpeg',
  '/images/image15.jpeg',
  '/images/image16.jpeg',
  '/images/image18.jpeg',
  '/images/image19.jpeg',
  '/images/image20.jpeg',
  '/images/image21.jpeg',
  '/images/image22.jpeg',
  '/images/image23.jpeg',
];

// history section component
const HistorySection: React.FC = () => {
  return (
    <section 
      id="history"
      className="section-padding"
      aria-labelledby="history-heading"
      style={{ backgroundColor: '#070E0F', color: '#FFF9FB' }}
    >
      <div className="container">
        <div className="row align-items-center g-5">
          {/* text content */}
          <div className="col-12 col-lg-6">
            <h2 id="history-heading" className="display-5 mb-4">
              vom preußen-glanz zum kulturherz
            </h2>
            
            <div className="fs-5" style={{ color: '#9D9597', lineHeight: '1.8' }}>
              <p className="mb-4">
                wo heute im la vida die aromen vieler kulturen verschmelzen, pulsierte schon 1908 das leben. einst als repräsentativer prachtbau im jugendstil erbaut, war der bahnhof langendreer das tor zur welt für das aufstrebende ruhrgebiet. wo früher reisepäck verladen wurde und dampfloks schnauften, empfangen wir euch heute in historischem ambiente.
              </p>
              
              <p className="mb-4">
                nach dem ende der kohle-ära drohte dem gebäude der stillstand - doch 1986 begann eine neue epoche. aus dem stillgelegten bahnhof wurde ein wichtiges soziokulturelles zentrum nrws.
              </p>
              
              <p className="mb-4">
                heute ist der bahnhof mehr als nur ein denkmal: er ist ein ort der begegnung, der musik und der politik. und mittendrin laden wir euch ein, die reise fortzusetzen - nicht auf schienen, sondern auf dem teller.
              </p>
              
              <a 
                href="https://bahnhof-langendreer.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light mt-3"
              >
                mehr zum bahnhof langendreer
              </a>
            </div>
          </div>
          
          {/* image */}
          <div className="col-12 col-lg-6">
            <div className="position-relative">
              <img 
                src="/images-bahnhof/image14.jpeg"
                alt="bahnhof langendreer historisch"
                className="img-fluid rounded"
                style={{ 
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  width: '100%',
                  objectFit: 'cover'
                }}
              />
              {/* decorative border */}
              <div 
                className="position-absolute"
                style={{
                  top: '20px',
                  left: '20px',
                  right: '-20px',
                  bottom: '-20px',
                  border: '2px solid #A7754D',
                  borderRadius: '0.5rem',
                  zIndex: -1
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// culinary journey section component
const CulinaryJourneySection: React.FC = () => {
  return (
    <section 
      id="culinary-journey"
      className="section-padding"
      aria-labelledby="culinary-heading"
      style={{ backgroundColor: '#FFF9FB' }}
    >
      <div className="container">
        <div className="row align-items-center g-5">
          {/* image left */}
          <div className="col-12 col-lg-6 order-2 order-lg-1">
            <div className="position-relative text-center">
              <img 
                src="/images-archiv/image1.jpeg"
                alt="kulinarische weltreise bei la vida"
                className="img-fluid rounded"
                style={{ 
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                  maxWidth: '85%',
                  objectFit: 'cover'
                }}
              />
              {/* decorative border */}
              <div 
                className="position-absolute"
                style={{
                  top: '20px',
                  left: '-20px',
                  right: '20px',
                  bottom: '-20px',
                  border: '2px solid #740E14',
                  borderRadius: '0.5rem',
                  zIndex: -1
                }}
                aria-hidden="true"
              />
            </div>
          </div>
          
          {/* text content right */}
          <div className="col-12 col-lg-6 order-1 order-lg-2">
            <h2 id="culinary-heading" className="display-5 mb-4" style={{ color: '#740E14' }}>
              eine kulinarische weltreise bei la vida
            </h2>
            
            <div className="fs-5" style={{ color: '#5D5557', lineHeight: '1.8' }}>
              <p className="mb-4">
                unsere speisekarte ist so international wie die geschichten unserer gäste. von aromatischen meze aus dem arabischen und kurdischen raum über spezialitäten aus der türkei, armenien und griechenland bis hin zu mediterranen tapas aus spanien und portugal sowie fein abgestimmten aromen aus dem iran, bei uns verschmelzen kulturen zu einem einzigartigen geschmackserlebnis.
              </p>
              
              <p className="mb-4">
                jedes gericht erzählt seine eigene geschichte und lädt dazu ein, neues zu entdecken, zu teilen und gemeinsam zu genießen. la vida steht für vielfalt, gastfreundschaft und eine kulinarische reise rund um die welt, auf einem tisch.
              </p>
              
              <p className="mb-0 fw-semibold" style={{ color: '#740E14' }}>
                dein abenteuer beginnt mit dem nächsten bissen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// contact info component
const ContactInfo: React.FC = () => {
  const contactDetails = useMemo(() => [
    {
      icon: <MapPin size={24} />,
      title: 'adresse',
      content: 'Wallbaumweg 108\n44894 Bochum',
      href: 'https://maps.google.com',
    },
    {
      icon: <Phone size={24} />,
      title: 'telefon',
      content: '0234 64068110',
      href: 'tel:+4923464068110',
    },
    {
      icon: <Mail size={24} />,
      title: 'e-mail',
      content: 'info@lavidagmbh.de',
      href: 'mailto:info@lavidagmbh.de',
    },
    {
      icon: <Clock size={24} />,
      title: 'öffnungszeiten',
      content: 'di-so: 17:00 - 23:00 uhr\nmo: ruhetag',
      href: null,
    },
  ], []);

  return (
    <div className="row g-4">
      {contactDetails.map((item, index) => (
        <div key={index} className="col-12 col-md-6">
          <div className="d-flex gap-3">
            <div 
              className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle"
              style={{ 
                width: '50px', 
                height: '50px', 
                backgroundColor: 'rgba(116, 14, 20, 0.1)',
                color: '#740E14',
              }}
            >
              {item.icon}
            </div>
            <div>
              <h5 className="h6 mb-1">{item.title}</h5>
              {item.href ? (
                <a 
                  href={item.href}
                  className="text-decoration-none text-body"
                  style={{ whiteSpace: 'pre-line' }}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {item.content}
                </a>
              ) : (
                <p className="mb-0 text-muted" style={{ whiteSpace: 'pre-line' }}>
                  {item.content}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// impressum modal props
interface ImpressumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// impressum modal component
const ImpressumModal: React.FC<ImpressumModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="modal fade show d-block"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        onClick={onClose}
      >
        <div 
          className="modal-dialog modal-dialog-centered"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content" style={{ border: 'none', borderRadius: '8px' }}>
            {/* Header */}
            <div 
              className="modal-header"
              style={{ 
                backgroundColor: '#740E14', 
                color: '#FFF9FB',
                borderBottom: 'none',
                borderRadius: '8px 8px 0 0'
              }}
            >
              <h5 className="modal-title">Impressum</h5>
              <button 
                type="button" 
                className="btn-close btn-close-white"
                onClick={onClose}
                aria-label="Schließen"
              ></button>
            </div>
            
            {/* Body */}
            <div className="modal-body p-4" style={{ color: '#070E0F' }}>
              <div className="mb-3">
                <strong style={{ color: '#740E14' }}>La Vida GmbH</strong><br />
                Wallbaumweg 108<br />
                44894 Bochum
              </div>
              
              <div className="mb-3">
                <strong>Tel:</strong>{' '}
                <a href="tel:+4923464068110" style={{ color: '#740E14', textDecoration: 'none' }}>
                  0234 64068110
                </a>
              </div>
              
              <div className="mb-3">
                <strong>Mail:</strong>{' '}
                <a href="mailto:info@lavidagmbh.de" style={{ color: '#740E14', textDecoration: 'none' }}>
                  info@lavidagmbh.de
                </a>
              </div>
              
              <div className="mb-3">
                <strong>Vertreten durch:</strong><br />
                G. Ilbay
              </div>
              
              <div className="mb-3">
                <strong>Handelsregister:</strong><br />
                HR B 21242<br />
                Amtsgericht Bochum
              </div>
              
              <div className="mb-3">
                <strong>Umsatzsteuer ID:</strong><br />
                DE367253185
              </div>
              
              <div>
                <strong>St-Nr.:</strong><br />
                306/5858/1310
              </div>
            </div>
            
            {/* Footer */}
            <div 
              className="modal-footer"
              style={{ 
                backgroundColor: '#f8f9fa',
                borderTop: '1px solid #dee2e6',
                borderRadius: '0 0 8px 8px'
              }}
            >
              <button 
                type="button" 
                className="btn"
                onClick={onClose}
                style={{ 
                  backgroundColor: '#740E14',
                  color: '#FFF9FB',
                  border: 'none'
                }}
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// footer props
interface FooterProps {
  onImpressumClick: () => void;
}

// footer component
const Footer: React.FC<FooterProps> = ({ onImpressumClick }) => {
  const socialLinks = useMemo(() => [
    { icon: <Instagram size={20} />, href: 'https://www.instagram.com/lavida.tapas/?hl=de', label: 'instagram' },
    { icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ), href: 'https://www.tiktok.com/@lavida.tapas', label: 'tiktok' },
  ], []);

  const footerLinks = useMemo(() => [
    { label: 'impressum', href: '#impressum', onClick: onImpressumClick },
  ], [onImpressumClick]);

  return (
    <footer style={{ backgroundColor: '#070E0F', color: '#FFF9FB' }}>
      {/* Main Footer */}
      <div className="container py-5">
        <div className="row g-4">
          {/* brand */}
          <div className="col-12 col-md-4">
            <img 
              src={logoSrc}
              alt="la vida"
              className="mb-3"
              style={{ maxHeight: '60px', objectFit: 'contain' }}
            />
            <p className="mb-4" style={{ color: '#9D9597' }}>
              tapas, meze, vino, musik – erlebe mediterrane lebensart in entspannter atmosphäre.
            </p>
            <div className="d-flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center justify-content-center rounded-circle text-decoration-none"
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    backgroundColor: 'rgba(255,249,251,0.1)',
                    color: '#FFF9FB',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#740E14';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,249,251,0.1)';
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* quick links */}
          <div className="col-6 col-md-4">
            <h5 className="h6 mb-3" style={{ letterSpacing: '0.05em', color: '#FFF9FB' }}>
              links
            </h5>
            <ul className="list-unstyled">
              {footerLinks.map((link) => (
                <li key={link.label} className="mb-2">
                  <a 
                    href={link.href}
                    className="text-decoration-none"
                    style={{ color: '#9D9597', transition: 'color 0.3s ease', cursor: link.onClick !== undefined ? 'pointer' : 'default' }}
                    onClick={(e) => {
                      if (link.onClick) {
                        e.preventDefault();
                        link.onClick();
                      }
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FFF9FB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#9D9597';
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* features */}
          <div className="col-6 col-md-4">
            <h5 className="h6 mb-3" style={{ letterSpacing: '0.05em', color: '#FFF9FB' }}>
              highlights
            </h5>
            <ul className="list-unstyled" style={{ color: '#9D9597' }}>
              <li className="mb-2 d-flex align-items-center gap-2">
                <UtensilsCrossed size={16} /> authentische tapas
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <Wine size={16} /> internationaler wein
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <Music size={16} /> mediterranes ambiente
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div 
        className="py-3"
        style={{ borderTop: '1px solid rgba(255,249,251,0.1)' }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 text-center text-md-start">
              <p className="mb-0 small" style={{ color: '#9D9597' }}>
                &copy; 2024 la vida
              </p>
            </div>
            <div className="col-12 col-md-6 text-center text-md-end mt-2 mt-md-0">
              <p className="mb-0 small" style={{ color: '#9D9597' }}>
                mit <span style={{ color: '#740E14' }}>&hearts;</span> gemacht
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// main app component
const App: React.FC = () => {
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#FFF9FB' }}>
      {/* navigation */}
      <Navbar logoSrc={logoSrc} />

      {/* main content */}
      <main>
        {/* hero section */}
        <Hero logoSrc={logoSrc} />

        {/* history section */}
        <HistorySection />

        {/* culinary journey section */}
        <CulinaryJourneySection />

        {/* specials section */}
        <Specials />

        {/* menu grid section */}
        <MenuGrid />

        {/* image gallery */}
        <ImageGallery images={galleryImages} />

        {/* contact section */}
        <section 
          id="contact"
          className="section-padding"
          aria-labelledby="contact-heading"
        >
          <div className="container">
            <div className="section-header">
              <h2 id="contact-heading" className="display-5">
                kontakt & reservierung
              </h2>
              <p className="lead">
                wir freuen uns auf ihren besuch
              </p>
            </div>

            <div className="row g-5">
              {/* contact info */}
              <div className="col-12 col-lg-6">
                <ContactInfo />
              </div>

              {/* reservation form placeholder */}
              <div className="col-12 col-lg-6">
                <div className="card h-100">
                  <div className="card-body p-4 p-md-5">
                    <h4 className="card-title mb-4">tisch reservieren</h4>
                    <div className="d-grid gap-3">
                      <a 
                        href="https://www.google.com/maps/reserve/v/dine/c/Gk3GTf2u4kI?source=pa&opi=89978449&hl=de-DE&gei=a1yaacW7PMGAi-gPmNGU-QY&sourceurl=https://www.google.com/search?q%3Dla%2Bvida%2Bbochum%26oq%3Dla%2Bvida%26gs_lcrp%3DEgZjaHJvbWUqDwgAEAAYQxjjAhiABBiKBTIPCAAQABhDGOMCGIAEGIoFMhUIARAuGEMYrwEYxwEYgAQYigUYjgUyDAgCEEUYORixAxiABDISCAMQLhhDGK8BGMcBGIAEGIoFMhIIBBAuGEMYrwEYxwEYgAQYigUyDAgFEAAYQxiABBiKBTIGCAYQRRg8MgYIBxBFGD3SAQgxNDA3ajBqN6gCALACAA%26sourceid%3Dchrome%26ie%3DUTF-8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary d-flex align-items-center justify-content-center"
                      >
                        tisch reservieren
                      </a>
                      <a 
                        href="mailto:info@lavidagmbh.de"
                        className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2"
                      >
                        <Mail size={20} />
                        e-mail schreiben
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* footer */}
      <Footer onImpressumClick={() => setIsImpressumOpen(true)} />

      {/* impressum modal */}
      <ImpressumModal 
        isOpen={isImpressumOpen} 
        onClose={() => setIsImpressumOpen(false)} 
      />
    </div>
  );
};

export default App;
