import React from 'react';
import { RotateCcw } from 'lucide-react';

function SimControl({ 
  label, 
  value, 
  baseValue,
  min, 
  max, 
  step = 1, 
  onChange, 
  onReset,
  formatVal, 
  subtitle 
}) {
  const isModified = baseValue !== undefined && Math.abs(value - baseValue) > 0.001;
  const deltaPercent = baseValue > 0 ? ((value - baseValue) / baseValue) * 100 : 0;

  // Safe clamping handler
  const handleRangeChange = (e) => {
    const raw = Number(e.target.value);
    const clamped = Math.max(min, Math.min(max, raw));
    onChange(clamped);
  };

  return (
    <div className="form-group sim-control-group" style={{ marginBottom: '0.85rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {label}
          {isModified && (
            <span 
              className="delta-badge"
              style={{
                fontSize: '0.68rem',
                padding: '0.1rem 0.35rem',
                borderRadius: '4px',
                fontWeight: 600,
                background: deltaPercent > 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: deltaPercent > 0 ? 'var(--success, #10b981)' : 'var(--danger, #ef4444)'
              }}
            >
              {deltaPercent > 0 ? `+${deltaPercent.toFixed(0)}%` : `${deltaPercent.toFixed(0)}%`}
            </span>
          )}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span 
            className="slider-val" 
            style={{ 
              color: isModified ? 'var(--primary)' : 'var(--text-primary)', 
              fontWeight: isModified ? 700 : 600 
            }}
          >
            {formatVal ? formatVal(value) : value}
          </span>
          {isModified && onReset && (
            <button 
              type="button"
              onClick={onReset}
              title="Restablecer a valor base"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--text-muted)',
                borderRadius: '3px'
              }}
            >
              <RotateCcw size={11} />
            </button>
          )}
        </div>
      </div>

      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={handleRangeChange} 
        style={{ margin: '0.35rem 0', width: '100%' }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
        <span>Min: {formatVal ? formatVal(min) : min}</span>
        {subtitle && <span>{subtitle}</span>}
        <span>Max: {formatVal ? formatVal(max) : max}</span>
      </div>
    </div>
  );
}

export default SimControl;
