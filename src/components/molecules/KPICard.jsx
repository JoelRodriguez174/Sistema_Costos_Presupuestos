import React from 'react';

function KPICard({ title, value, desc, trend, trendDirection, icon: Icon, className = '', style }) {
  return (
    <div className={`kpi-card ${className}`} style={style}>
      <div className="kpi-title">
        <span>{title}</span>
        {Icon && <Icon className="kpi-icon" size={16} />}
      </div>
      <div className="kpi-value">{value}</div>
      {desc && <div className="kpi-desc">{desc}</div>}
      {trend && (
        <div className={`kpi-trend ${trendDirection === 'up' ? 'up' : 'down'}`}>
          {trend}
        </div>
      )}
    </div>
  );
}

export default KPICard;
