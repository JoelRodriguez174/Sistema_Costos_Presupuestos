import React from 'react';
import Logo from '../atoms/Logo';
import { Sun, Moon, RefreshCw, BarChart3, Package, FileText, Layers } from 'lucide-react';
import Button from '../atoms/Button';
import { NavLink } from 'react-router-dom';
import { routes } from '../../routes';

function Header({ theme, onThemeToggle, onReset }) {
  // Helper to map route paths to Lucide icons
  function getRouteIcon(path) {
    switch (path) {
      case '/': return <BarChart3 size={16} />;
      case '/productos': return <Package size={16} />;
      case '/comprobantes': return <FileText size={16} />;
      case '/costos': return <Layers size={16} />;
      default: return null;
    }
  }

  return (
    <>
      <header>
        <Logo />
        <div className="nav-actions">
          <Button variant="secondary" size="sm" onClick={onReset} title="Limpiar todos los datos">
            <RefreshCw size={14} /> Limpiar Datos
          </Button>
          
          <button className="theme-toggle" onClick={onThemeToggle} title="Cambiar tema">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Navigation Link Bar dynamically looping over centralized routes */}
      <nav className="tabs-nav">
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}
          >
            {getRouteIcon(route.path)}
            {route.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export default Header;
