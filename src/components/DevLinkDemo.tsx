"use client";

import React from 'react';

/**
 * Simple test component - bypassing DevLink to debug visibility issue.
 */
export function DevLinkDemo() {
  const cardStyle: React.CSSProperties = {
    position: 'relative',
    borderRadius: '1rem',
    overflow: 'hidden',
    height: '350px',
    background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    color: 'white',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  };

  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: 600,
    textDecoration: 'none',
    cursor: 'pointer',
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: '#1A56DB',
    color: 'white',
  };

  const secondaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: 'white',
    color: '#1e293b',
    border: '1px solid #e2e8f0',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Grid of Simple Cards */}
      <div style={gridStyle}>
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Safety First</h3>
          <p style={{ margin: '0 0 1rem 0', opacity: 0.9 }}>Access safety newsletters, crisis management guides, and training resources.</p>
          <a href="/jewett-junction/safety/modern" style={primaryButtonStyle}>View Safety Resources →</a>
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>HR Resources</h3>
          <p style={{ margin: '0 0 1rem 0', opacity: 0.9 }}>Employee handbook, benefits information, payroll, and timesheets.</p>
          <a href="/jewett-junction/hr/modern" style={primaryButtonStyle}>View HR Resources →</a>
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>IT Helpdesk</h3>
          <p style={{ margin: '0 0 1rem 0', opacity: 0.9 }}>Submit tickets, access knowledge base, and get technical support.</p>
          <a href="/jewett-junction/it-helpdesk/modern" style={primaryButtonStyle}>Get IT Help →</a>
        </div>
      </div>

      {/* Button Row */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '1.5rem', flexWrap: 'wrap' }}>
        <a href="mailto:marketing@jewettconstruction.com?subject=Good%20News" style={primaryButtonStyle}>
          Share Good News
        </a>
        <a href="/jewett-junction/resources/modern" style={secondaryButtonStyle}>
          Browse Resources
        </a>
      </div>
    </div>
  );
}
