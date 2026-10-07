import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import useStore from './store/useStore';
import { routes } from './routes';

function AppContent() {
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const resetToDefaults = useStore((state) => state.resetToDefaults);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark-theme');
    } else {
      root.classList.add('dark-theme');
    }
  }, [theme]);

  return (
    <div className="app-container">
      {/* Global Header */}
      <Header 
        theme={theme}
        onThemeToggle={toggleTheme}
        onReset={resetToDefaults}
      />

      {/* Main Content Routed dynamically */}
      <main>
        <Routes>
          {routes.map((route) => (
            <Route 
              key={route.path} 
              path={route.path} 
              element={route.element} 
            />
          ))}
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router basename="/">
      <AppContent />
    </Router>
  );
}

export default App;
