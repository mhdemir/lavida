// src/pages/NewsBlogPage.tsx

import React, { useState, useMemo } from 'react';
import { Calendar, Tag, ArrowLeft, ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../blog/blog.types';
import { BLOG_CATEGORIES } from '../blog/blog.types';
import { loadAllPosts, searchPosts } from '../blog/blogLoader';

// Blog Card Component
interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formattedDate = useMemo(() => {
    return new Date(post.date).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [post.date]);

  return (
    <Link 
      to={`/news-blog/${post.id}`}
      className="text-decoration-none"
    >
      <article 
        className="card h-100 border-0 shadow-sm"
        style={{ 
          backgroundColor: '#FFF9FB',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '';
        }}
      >
        {post.image && (
          <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
            <img 
              src={post.image} 
              alt={post.title}
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
            {post.featured && (
              <span 
                className="position-absolute top-0 end-0 m-2 badge"
                style={{ backgroundColor: '#740E14' }}
              >
                Highlight
              </span>
            )}
          </div>
        )}
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-2 mb-3 text-muted small">
            <Calendar size={14} />
            {formattedDate}
          </div>
          
          <h3 className="h5 card-title mb-3" style={{ color: '#740E14' }}>
            {post.title}
          </h3>
          
          <p className="card-text text-muted" style={{ lineHeight: '1.6' }}>
            {post.excerpt}
          </p>
          
          <div className="d-flex align-items-center gap-2 mt-3" style={{ color: '#A7754D' }}>
            <span className="small fw-medium">Weiterlesen</span>
            <ChevronRight size={16} />
          </div>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="card-footer bg-transparent border-0 p-4 pt-0">
            <div className="d-flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="badge bg-light text-dark"
                  style={{ fontWeight: 'normal' }}
                >
                  <Tag size={12} className="me-1" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="badge bg-light text-muted" style={{ fontWeight: 'normal' }}>
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </article>
    </Link>
  );
};

// Main NewsBlogPage Component - Nur Übersicht
const NewsBlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allPosts = useMemo(() => loadAllPosts(), []);

  // Suche und Filter kombinieren
  const filteredPosts = useMemo(() => {
    let posts = allPosts;
    
    // Zuerst nach Suchbegriff filtern (falls vorhanden)
    if (searchQuery.trim()) {
      posts = searchPosts(searchQuery);
    }
    
    // Dann nach Kategorie filtern (falls ausgewählt)
    if (selectedCategory) {
      posts = posts.filter(post => post.tags?.includes(selectedCategory));
    }
    
    return posts;
  }, [allPosts, selectedCategory, searchQuery]);

  const featuredPosts = useMemo(() => {
    return allPosts.filter(post => post.featured);
  }, [allPosts]);

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#FFF9FB', paddingTop: '76px' }}>
      {/* Header Section - direkt unter Navbar, kein Abstand */}
      <section 
        className="py-5"
        style={{ 
          backgroundColor: '#740E14',
          color: '#FFF9FB',
          marginTop: '0px',
          paddingTop: '100px',
          paddingBottom: '3rem'
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-8">
              <h1 className="display-4 mb-3">News & Blog</h1>
              <p className="lead mb-0">
                Bleiben Sie auf dem Laufenden über Neuigkeiten, Events und kulinarische Highlights bei La Vida.
              </p>
            </div>
            <div className="col-12 col-lg-4 text-lg-end mt-3 mt-lg-0">
              <Link 
                to="/"
                className="btn btn-outline-light"
              >
                <ArrowLeft size={18} className="me-2" />
                Zurück zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && !selectedCategory && !searchQuery && (
        <section className="py-5" style={{ backgroundColor: '#070E0F' }}>
          <div className="container">
            <h2 className="h4 mb-4" style={{ color: '#A7754D' }}>Highlights</h2>
            <div className="row g-4">
              {featuredPosts.map((post) => (
                <div key={post.id} className="col-12 col-md-6 col-lg-4">
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-5">
        <div className="container">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="position-relative" style={{ maxWidth: '500px' }}>
              <Search 
                className="position-absolute" 
                style={{ 
                  left: '1rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#9D9597'
                }} 
                size={20} 
              />
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Nach Schlagwörtern suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  paddingLeft: '3rem',
                  borderColor: '#A7754D',
                  borderRadius: '8px'
                }}
              />
            </div>
            {searchQuery && (
              <p className="text-muted mt-2 small">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'Ergebnis' : 'Ergebnisse'} für &quot;{searchQuery}&quot;
              </p>
            )}
          </div>

          {/* Category Filter - Nur Events und Neuigkeiten */}
          <div className="mb-4">
            <div className="d-flex flex-wrap align-items-center gap-2">
              <span className="text-muted me-2">Kategorien:</span>
              <button
                className={`btn btn-sm ${selectedCategory === null ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setSelectedCategory(null)}
                style={selectedCategory === null ? { backgroundColor: '#740E14', borderColor: '#740E14' } : {}}
              >
                Alle
              </button>
              {BLOG_CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={`btn btn-sm ${selectedCategory === category ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setSelectedCategory(category)}
                  style={selectedCategory === category ? { backgroundColor: '#740E14', borderColor: '#740E14' } : {}}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="row g-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="col-12 col-md-6 col-lg-4">
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">
                {searchQuery 
                  ? `Keine Beiträge gefunden für "${searchQuery}".` 
                  : 'Keine Beiträge in dieser Kategorie vorhanden.'}
              </p>
              {(searchQuery || selectedCategory) && (
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                >
                  Filter zurücksetzen
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-4" style={{ backgroundColor: '#070E0F', color: '#9D9597' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 text-center text-md-start">
              <p className="mb-0 small">
                &copy; 2024 La Vida
              </p>
            </div>
            <div className="col-12 col-md-6 text-center text-md-end mt-2 mt-md-0">
              <Link 
                to="/"
                className="text-decoration-none small"
                style={{ color: '#A7754D' }}
              >
                Zurück zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsBlogPage;
