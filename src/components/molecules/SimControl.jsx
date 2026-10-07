import React from 'react';

function SimControl({ 
  label, 
  value, 
  min, 
  max, 
  step = 1, 
  onChange, 
  formatVal, 
  subtitle 
}) {
  return (
    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
        <span>{label}</span>
        <span className="slider-val" style={{ color: 'var(--primary)' }}>
          {formatVal ? formatVal(value) : value}
        </span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))} 
        style={{ margin: '0.4rem 0' }}
      />
      {subtitle && (
        <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          {subtitle}
        </span>
      )}
    </div>
  );
}

export default SimControl;
