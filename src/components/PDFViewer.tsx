// src/components/PDFViewer.tsx

import React, { useState, useCallback } from 'react';
import { FileText, Download, ExternalLink, AlertCircle } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  title?: string;
  className?: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ 
  pdfUrl, 
  title = 'Speisekarte',
  className = '' 
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleLoad = useCallback((): void => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback((): void => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const handleDownload = useCallback((): void => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'La_Vida_Speisekarte.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [pdfUrl]);

  const handleOpenInNewTab = useCallback((): void => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  }, [pdfUrl]);

  return (
    <section 
      className={`section-padding bg-light ${className}`}
      aria-labelledby="pdf-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 id="pdf-heading" className="display-5">
            {title}
          </h2>
          <p className="lead">
            Unsere komplette Speisekarte als PDF zum Durchblättern oder Downloaden
          </p>
        </div>

        {/* PDF Viewer Container */}
        <div className="card shadow-lg overflow-hidden">
          {/* Toolbar */}
          <div 
            className="d-flex flex-wrap justify-content-between align-items-center p-3 border-bottom"
            style={{ backgroundColor: '#FFF9FB' }}
          >
            <div className="d-flex align-items-center gap-2 mb-2 mb-md-0">
              <FileText size={24} style={{ color: '#740E14' }} />
              <span className="fw-semibold">La_Vida_Speisekarte.pdf</span>
            </div>
            
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
                onClick={handleDownload}
                aria-label="PDF herunterladen"
              >
                <Download size={16} />
                <span className="d-none d-sm-inline">Download</span>
              </button>
              
              <button
                className="btn btn-primary btn-sm d-flex align-items-center gap-2"
                onClick={handleOpenInNewTab}
                aria-label="PDF in neuem Tab öffnen"
              >
                <ExternalLink size={16} />
                <span className="d-none d-sm-inline">Öffnen</span>
              </button>
            </div>
          </div>

          {/* Iframe Container */}
          <div 
            className="position-relative"
            style={{ height: '70vh', minHeight: '500px' }}
          >
            {/* Loading Spinner */}
            {isLoading && !hasError && (
              <div 
                className="position-absolute top-50 start-50 translate-middle text-center"
                style={{ zIndex: 1 }}
              >
                <div 
                  className="spinner-border mb-3"
                  style={{ color: '#740E14', width: '3rem', height: '3rem' }}
                  role="status"
                  aria-label="Laden..."
                >
                  <span className="visually-hidden">PDF wird geladen...</span>
                </div>
                <p className="text-muted">Speisekarte wird geladen...</p>
              </div>
            )}

            {/* Error State */}
            {hasError && (
              <div 
                className="position-absolute top-50 start-50 translate-middle text-center p-4"
                style={{ zIndex: 1 }}
              >
                <AlertCircle size={48} className="mb-3" style={{ color: '#740E14' }} />
                <h5 className="mb-2">PDF konnte nicht geladen werden</h5>
                <p className="text-muted mb-3">
                  Die Speisekarte ist möglicherweise nicht verfügbar oder Ihr Browser 
                  unterstützt keine PDF-Einbettung.
                </p>
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    className="btn btn-primary"
                    onClick={handleOpenInNewTab}
                  >
                    <ExternalLink size={16} className="me-2" />
                    In neuem Tab öffnen
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleDownload}
                  >
                    <Download size={16} className="me-2" />
                    Herunterladen
                  </button>
                </div>
              </div>
            )}

            {/* PDF Iframe */}
            <iframe
              src={pdfUrl}
              title={title}
              className="w-100 h-100 border-0"
              style={{ 
                opacity: isLoading || hasError ? 0 : 1,
                transition: 'opacity 0.3s ease',
              }}
              onLoad={handleLoad}
              onError={handleError}
              sandbox="allow-scripts allow-same-origin allow-forms"
              aria-label={`${title} PDF Dokument`}
            >
              <p className="p-4 text-center">
                Ihr Browser unterstützt keine PDF-Einbettung. 
                Sie können die <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Speisekarte hier öffnen</a>.
              </p>
            </iframe>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 text-center">
          <p className="text-muted small mb-0">
            <strong>Hinweis:</strong> Preise und Angebote können sich ändern. 
            Aktuelle Informationen erhalten Sie vor Ort.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PDFViewer;
