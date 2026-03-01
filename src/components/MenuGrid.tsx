// src/components/MenuGrid.tsx

import React, { useState, useMemo, useCallback } from 'react';
import { 
  Search, 
  Filter, 
  Leaf, 
  Fish, 
  Beef, 
  Flame, 
  WheatOff,
  X,
  Wine,
  Coffee,
  Beer,
  GlassWater,
  UtensilsCrossed,
  Download,
  FileText
} from 'lucide-react';
import { 
  menuData, 
  MenuSection, 
  MenuItem, 
  MenuCategory, 
  MenuTag,
  menuCategories,
  filterTags 
} from '../data/menuData';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const getTagIcon = useCallback((tag: MenuTag): React.ReactNode => {
    switch (tag) {
      case 'vegan':
      case 'vegetarisch':
        return <Leaf size={12} />;
      case 'fisch':
        return <Fish size={12} />;
      case 'fleisch':
        return <Beef size={12} />;
      case 'scharf':
        return <Flame size={12} />;
      case 'glutenfrei':
        return <WheatOff size={12} />;
      case 'alkoholfrei':
        return <GlassWater size={12} />;
      default:
        return null;
    }
  }, []);

  const formatPrice = useCallback((price: number): string => {
    return `${price.toFixed(2).replace('.', ',')} €`;
  }, []);

  return (
    <div className="card h-100">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0" style={{ fontFamily: 'var(--lavida-font-heading)' }}>
            {item.name}
          </h5>
          <span className="price text-nowrap ms-2">{formatPrice(item.price)}</span>
        </div>
        
        <p className="card-text text-muted small mb-3">
          {item.description}
        </p>
        
        <div className="d-flex flex-wrap gap-1">
          {item.tags.map((tag) => {
            const tagInfo = filterTags.find(t => t.id === tag);
            return (
              <span 
                key={tag}
                className={`tag-badge ${tag}`}
                title={tagInfo?.label || tag}
              >
                {getTagIcon(tag)}
                <span>{tagInfo?.label || tag}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// tapas subcategory section
interface TapasSubSectionProps {
  title: string;
  items: MenuItem[];
  searchQuery: string;
  selectedTags: MenuTag[];
}

const TapasSubSection: React.FC<TapasSubSectionProps> = ({ 
  title, 
  items, 
  searchQuery, 
  selectedTags 
}) => {
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => item.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [items, searchQuery, selectedTags]);

  if (filteredItems.length === 0) return null;

  // Farbe je nach Kategorie
  const getTitleColor = (t: string): string => {
    if (t === 'fleisch') return '#740E14';
    if (t === 'fisch') return '#1e3a5f';
    if (t === 'vegan & vegetarisch') return '#1a4a1a';
    return '#A7754D';
  };

  return (
    <div className="mb-4">
      <h4 className="h5 mb-3" style={{ color: getTitleColor(title) }}>{title.toLowerCase()}</h4>
      <div className="row g-3">
        {filteredItems.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4">
            <MenuItemCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

interface MenuSectionComponentProps {
  section: MenuSection;
  searchQuery: string;
  selectedTags: MenuTag[];
}

const MenuSectionComponent: React.FC<MenuSectionComponentProps> = ({ 
  section, 
  searchQuery,
  selectedTags 
}) => {
  // special handling for tapas section with subcategories
  if (section.id === 'tapas') {
    const fleischItems = section.items.filter(item => item.subCategory === 'fleisch');
    const fischItems = section.items.filter(item => item.subCategory === 'fisch');
    const veggieItems = section.items.filter(item => item.subCategory === 'veggie');

    const hasAnyItems = fleischItems.length > 0 || fischItems.length > 0 || veggieItems.length > 0;
    if (!hasAnyItems) return null;

    return (
      <div className="mb-5">
        <h3 
          className="h4 mb-2 pb-2 border-bottom"
          style={{ color: '#740E14', borderColor: '#740E14 !important' }}
        >
          {section.title}
        </h3>
        <p className="text-muted mb-4">{section.subtitle}</p>
        
        <TapasSubSection 
          title="fleisch" 
          items={fleischItems} 
          searchQuery={searchQuery}
          selectedTags={selectedTags}
        />
        <TapasSubSection 
          title="fisch" 
          items={fischItems} 
          searchQuery={searchQuery}
          selectedTags={selectedTags}
        />
        <TapasSubSection 
          title="vegan & vegetarisch" 
          items={veggieItems} 
          searchQuery={searchQuery}
          selectedTags={selectedTags}
        />
      </div>
    );
  }

  // default handling for other sections
  const filteredItems = useMemo(() => {
    return section.items.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => item.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [section.items, searchQuery, selectedTags]);

  if (filteredItems.length === 0) return null;

  return (
    <div className="mb-5">
      <h3 
        className="h4 mb-2 pb-2 border-bottom"
        style={{ color: '#740E14', borderColor: '#740E14 !important' }}
      >
        {section.title}
      </h3>
      <p className="text-muted mb-4">{section.subtitle}</p>
      
      <div className="row g-3">
        {filteredItems.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4">
            <MenuItemCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

interface MenuGridProps {
  className?: string;
}

export const MenuGrid: React.FC<MenuGridProps> = ({ className = '' }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [selectedTags, setSelectedTags] = useState<MenuTag[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleTag = useCallback((tag: MenuTag): void => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  const clearFilters = useCallback((): void => {
    setActiveCategory('all');
    setSelectedTags([]);
    setSearchQuery('');
  }, []);

  const filteredSections = useMemo(() => {
    if (activeCategory === 'all') {
      return menuData;
    }
    return menuData.filter(section => section.id === activeCategory);
  }, [activeCategory]);

  const hasActiveFilters = activeCategory !== 'all' || selectedTags.length > 0 || searchQuery !== '';

  const getCategoryIcon = (categoryId: MenuCategory) => {
    switch(categoryId) {
      case 'bier': return <Beer size={16} />;
      case 'cocktails': return <Wine size={16} />;
      case 'heisse-getraenke': return <Coffee size={16} />;
      case 'angebote': return <UtensilsCrossed size={16} />;
      case 'tapas': return <UtensilsCrossed size={16} />;
      default: return null;
    }
  };

  return (
    <section 
      id="menu"
      className={`section-padding ${className}`}
      aria-labelledby="menu-heading"
    >
      <div className="container">
        {/* section header */}
        <div className="section-header">
          <h2 id="menu-heading" className="display-5">
            unsere speisekarte
          </h2>
          <p className="lead">
            entdecke unsere vielfältigen tapas, getränke und spezialitäten
          </p>
        </div>

        {/* pdf download section */}
        <div className="mb-5 pb-4 border-bottom">
          <div className="text-center">
            <FileText size={32} className="mb-3" style={{ color: '#740E14' }} />
            <h3 className="h5 mb-2">speisekarte als pdf</h3>
            <p className="text-muted mb-3">
              laden sie unsere komplette speisekarte als pdf herunter
            </p>
            <a
              href="/Speisekarte/La_Vida_Speisekarte.pdf"
              download
              className="btn btn-primary d-inline-flex align-items-center gap-2"
            >
              <Download size={18} />
              pdf herunterladen
            </a>
          </div>
        </div>

        {/* search bar */}
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-6 mx-auto">
            <div className="position-relative">
              <Search 
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" 
                size={20}
              />
              <input
                type="text"
                className="form-control ps-5"
                placeholder="suche nach gerichten oder getränken..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="suche nach gerichten"
              />
              {searchQuery && (
                <button
                  className="position-absolute top-50 end-0 translate-middle-y me-2 btn btn-link text-muted p-1"
                  onClick={() => setSearchQuery('')}
                  aria-label="suche löschen"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* category filter */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          <button
            className={`btn ${activeCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveCategory('all')}
          >
            alle
          </button>
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              className={`btn ${activeCategory === cat.id ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center gap-2`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {getCategoryIcon(cat.id)}
              {cat.label}
            </button>
          ))}
        </div>

        {/* tag filter */}
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-3 flex-wrap">
            <Filter size={18} className="text-muted" />
            <span className="text-muted">filter nach:</span>
          </div>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {filterTags.map((tag) => (
              <button
                key={tag.id}
                className={`btn btn-sm ${selectedTags.includes(tag.id) ? 'btn-secondary' : 'btn-outline-secondary'}`}
                onClick={() => toggleTag(tag.id)}
                style={{
                  backgroundColor: selectedTags.includes(tag.id) ? tag.color : undefined,
                  borderColor: tag.color,
                  color: selectedTags.includes(tag.id) ? '#FFF9FB' : tag.color,
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* clear filters */}
        {hasActiveFilters && (
          <div className="text-center mb-4">
            <button 
              className="btn btn-link text-muted"
              onClick={clearFilters}
            >
              alle filter zurücksetzen
            </button>
          </div>
        )}

        {/* menu sections */}
        <div className="mt-5">
          {filteredSections.map((section) => (
            <MenuSectionComponent
              key={section.id}
              section={section}
              searchQuery={searchQuery}
              selectedTags={selectedTags}
            />
          ))}
        </div>

        {/* empty state */}
        {filteredSections.every(section => {
          if (section.id === 'tapas') {
            // for tapas, check all subcategories
            return section.items.every(item => {
              const matchesSearch = searchQuery === '' || 
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesTags = selectedTags.length === 0 || 
                selectedTags.some(tag => item.tags.includes(tag));
              return !(matchesSearch && matchesTags);
            });
          }
          return section.items.every(item => {
            const matchesSearch = searchQuery === '' || 
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTags = selectedTags.length === 0 || 
              selectedTags.some(tag => item.tags.includes(tag));
            return !(matchesSearch && matchesTags);
          });
        }) && (
          <div className="text-center py-5">
            <p className="text-muted mb-3">keine einträge gefunden.</p>
            <button className="btn btn-primary" onClick={clearFilters}>
              filter zurücksetzen
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuGrid;
