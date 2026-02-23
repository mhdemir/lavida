// src/components/Specials.tsx

import React from 'react';
import { Star, Check, Gift, Sparkles } from 'lucide-react';
import { specialMenus, MenuItem } from '../data/menuData';

interface SpecialCardProps {
  menu: MenuItem;
  index: number;
}

const SpecialCard: React.FC<SpecialCardProps> = ({ menu, index }) => {
  // index 0 = la vida cuatro (19,90€) - das günstigere menü ist "beliebt"
  // index 1 = la vida menü (49,90€) - mit 6 tapas, wein, etc.
  const isPopular = index === 0; // la vida cuatro (index 0) ist das beliebtere angebot

  const features = isPopular 
    ? [
        '4 Tapas nach Wahl (exkl. Ausnahmen)',
        '1 Portion Brot',
        'Perfekt für 1 Person',
        'Täglich verfügbar',
        'Auch zum Mitnehmen',
        'Schnell serviert',
      ]
    : [
        '6 Tapas nach Wahl (exkl. Ausnahmen)',
        '1 Flasche Hauswein',
        '1 großes Wasser',
        '2 Portionen Brot',
        'Für 2 Personen ideal',
        'Auch zum Mitnehmen',
      ];

  return (
    <div 
      className={`card h-100 position-relative ${isPopular ? 'border-2' : ''}`}
      style={{ 
        borderColor: isPopular ? '#A7754D' : undefined,
        transform: isPopular ? 'scale(1.02)' : undefined,
        overflow: 'visible',
      }}
    >
      {/* popular badge - außerhalb der card für volle sichtbarkeit */}
      {isPopular && (
        <div 
          className="position-absolute start-50 translate-middle-x"
          style={{ 
            zIndex: 100,
            top: '-18px',
          }}
        >
          <span 
            className="badge d-flex align-items-center gap-1 px-3 py-2 shadow"
            style={{ backgroundColor: '#A7754D', color: '#FFF9FB', whiteSpace: 'nowrap' }}
          >
            <Star size={14} fill="currentColor" />
            beliebt
          </span>
        </div>
      )}

      <div className={`card-body p-4 p-md-5 d-flex flex-column ${isPopular ? 'pt-5' : ''}`}>
        {/* icon header */}
        <div className="text-center mb-4">
          <div 
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
            style={{ 
              width: '80px', 
              height: '80px', 
              backgroundColor: isPopular ? '#A7754D' : '#740E14',
              color: '#FFF9FB',
            }}
          >
            {isPopular ? <Sparkles size={40} /> : <Gift size={40} />}
          </div>
          <h3 className="card-title h2 mb-2">{menu.name}</h3>
          <p className="card-subtitle">{menu.description}</p>
        </div>

        {/* price */}
        <div className="text-center mb-4">
          <span 
            className="display-4 fw-bold"
            style={{ color: isPopular ? '#A7754D' : '#740E14' }}
          >
            {menu.price.toFixed(2)}
          </span>
          <span className="fs-4 text-muted ms-1">€</span>
          <p className="text-muted mt-1">pro person</p>
        </div>

        {/* features list */}
        <ul className="list-unstyled mb-0 flex-grow-1">
          {features.map((feature, idx) => (
            <li key={idx} className="d-flex align-items-center gap-2 mb-3">
              <Check 
                size={20} 
                style={{ color: isPopular ? '#A7754D' : '#002500' }}
                className="flex-shrink-0"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface SpecialsProps {
  className?: string;
}

export const Specials: React.FC<SpecialsProps> = ({ className = '' }) => {
  return (
    <section 
      id="specials"
      className={`section-padding bg-light ${className}`}
      aria-labelledby="specials-heading"
    >
      <div className="container">
        {/* section header */}
        <div className="section-header">
          <h2 id="specials-heading" className="display-5">
            unsere specials
          </h2>
          <p className="lead">
            perfekt kombinierte menüs für unvergessliche momente
          </p>
        </div>

        {/* cards grid */}
        <div className="row g-4 justify-content-center" style={{ paddingTop: '30px' }}>
          {specialMenus.map((menu, index) => (
            <div key={menu.id} className="col-12 col-md-6 col-lg-5">
              <SpecialCard menu={menu} index={index} />
            </div>
          ))}
        </div>

        {/* additional info */}
        <div className="mt-5 text-center">
          <div 
            className="d-inline-block p-4 rounded-3"
            style={{ backgroundColor: 'rgba(116, 14, 20, 0.05)' }}
          >
            <p className="mb-2">
              <strong>hinweis:</strong> alle speisen können auf wunsch auch vegan oder 
              vegetarisch zubereitet werden.
            </p>
            <p className="mb-0 text-muted small">
              bei allergien oder unverträglichkeiten sprechen sie uns bitte an.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specials;
