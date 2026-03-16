// src/pages/BlogPostPage.tsx

import React, { useMemo } from 'react';
import { Calendar, Tag, ArrowLeft, Clock } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import type { BlogPost } from '../blog/blog.types';
import { loadPostById } from '../blog/blogLoader';

// Format content with simple markdown-like syntax
const formatContent = (content: string): React.ReactNode[] => {
  return content
    .split('\n\n')
    .map((paragraph, index) => {
      // Check for headings (## Heading)
      if (paragraph.startsWith('## ')) {
        return (
          <h3 key={index} className="h5 mt-4 mb-3" style={{ color: '#740E14' }}>
            {paragraph.replace('## ', '')}
          </h3>
        );
      }
      // Check for list items (- item or * item)
      if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
        const items = paragraph.split('\n').filter(line => line.trim().startsWith('- ') || line.trim().startsWith('* '));
        return (
          <ul key={index} className="mb-3">
            {items.map((item, i) => (
              <li key={i} style={{ color: '#5D5557', marginBottom: '0.5rem' }}>
                {item.replace(/^[-*]\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
              </li>
            ))}
          </ul>
        );
      }
      // Bold text (**text**)
      const boldText = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      return (
        <p 
          key={index} 
          className="mb-3" 
          style={{ 
            color: '#5D5557', 
            lineHeight: '1.8',
            whiteSpace: 'pre-wrap'
          }}
          dangerouslySetInnerHTML={{ __html: boldText }}
        />
      );
    });
};

// Blog Post Detail Component
interface BlogPostDetailProps {
  post: BlogPost;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post }) => {
  const formattedDate = useMemo(() => {
    return new Date(post.date).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [post.date]);

  const formattedContent = useMemo(() => formatContent(post.content), [post.content]);

  return (
    <article>
      {post.image && (
        <div 
          className="rounded overflow-hidden mb-4"
          style={{ maxHeight: '400px' }}
        >
          <img 
            src={post.image} 
            alt={post.title}
            className="w-100"
            style={{ objectFit: 'cover', maxHeight: '400px' }}
          />
        </div>
      )}

      <div className="d-flex flex-wrap align-items-center gap-3 mb-4 text-muted">
        <span className="d-flex align-items-center gap-1">
          <Calendar size={16} />
          {formattedDate}
        </span>
        <span className="d-flex align-items-center gap-1">
          <Clock size={16} />
          {Math.ceil(post.content.length / 1000)} min. Lesezeit
        </span>
      </div>

      <h1 className="display-5 mb-4" style={{ color: '#740E14' }}>
        {post.title}
      </h1>

      {post.tags && post.tags.length > 0 && (
        <div className="d-flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span 
              key={tag}
              className="badge"
              style={{ backgroundColor: '#A7754D' }}
            >
              <Tag size={12} className="me-1" />
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="fs-5">
        {formattedContent}
      </div>
    </article>
  );
};

// Main BlogPostPage Component
const BlogPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  
  const post = useMemo(() => {
    if (!postId) return null;
    return loadPostById(postId);
  }, [postId]);

  // Wenn Post nicht gefunden, zur News-Blog Übersicht weiterleiten
  if (!post) {
    return <Navigate to="/news-blog" replace />;
  }

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

      {/* Back Navigation */}
      <section className="py-3" style={{ backgroundColor: '#FFF9FB', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <div className="container">
          <Link 
            to="/news-blog"
            className="text-decoration-none d-flex align-items-center gap-2"
            style={{ color: '#740E14' }}
          >
            <ArrowLeft size={18} />
            <span>Zurück zu allen Beiträgen</span>
          </Link>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <BlogPostDetail post={post} />
            </div>
          </div>
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

export default BlogPostPage;
