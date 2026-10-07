import React from 'react';

function PDFCard({ title, desc }) {
  return (
    <div className="pdf-card">
      <div className="pdf-icon">PDF</div>
      <div className="pdf-info">
        <h5>{title}</h5>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default PDFCard;
