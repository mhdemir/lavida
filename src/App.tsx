// src/App.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import NewsBlogPage from './pages/NewsBlogPage';
import BlogPostPage from './pages/BlogPostPage';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import custom styles
import './styles/custom.css';

// asset paths - logo als png
const logoSrc = '/logo/logo.png';

// main app component with routing
const App: React.FC = () => {
  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#FFF9FB' }}>
      {/* navigation - visible on all pages */}
      <Navbar logoSrc={logoSrc} />

      {/* main content with routes */}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news-blog" element={<NewsBlogPage />} />
          <Route path="/news-blog/:postId" element={<BlogPostPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
