import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Chat from './pages/Chat';
import History from './pages/History';
import Analytics from './pages/Analytics';
import { BrowserRouter as Router } from 'react-router-dom';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(() => JSON.parse(localStorage.getItem('sidebarPinned') || 'false'));
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const togglePin = () => {
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    localStorage.setItem('sidebarPinned', JSON.stringify(newPinnedState));
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {isAuthenticated && (
        <div className="flex">
          {/* Sidebar */}
          <div
            className={`sidebar backdrop-blur-md bg-opacity-90 transition-all duration-300 ${
              isSidebarOpen || isPinned ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            } md:w-64 h-screen md:h-auto p-6 ${isSidebarOpen ? 'sidebar-open' : ''}`}
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <span className="text-2xl mr-2">✨</span>
                <h1 className="text-xl font-bold">Creator Platform</h1>
              </div>
              <button
                className="md:hidden text-white"
                onClick={toggleSidebar}
                aria-label="Close sidebar"
              >
                <span className="text-xl">❌</span>
              </button>
            </div>

            {/* Profile Section */}
            <div className="flex items-center mb-6 p-3 bg-blue-800 bg-opacity-20 rounded-xl">
              <span className="text-2xl mr-2">👤</span>
              <div>
                <p className="text-sm font-semibold">Test User</p>
                <p className="text-xs text-gray-300">Creator</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav space-y-2">
              <Link
                to="/chat"
                className={`sidebar-link ${location.pathname === '/chat' ? 'sidebar-link-active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
                aria-current={location.pathname === '/chat' ? 'page' : undefined}
              >
                <span className="sidebar-icon text-xl">💬</span>
                New Chat
              </Link>
              <div>
                <button
                  className={`sidebar-link w-full text-left flex items-center justify-between ${
                    location.pathname.startsWith('/history') ? 'sidebar-link-active' : ''
                  }`}
                  onClick={toggleSubmenu}
                  aria-expanded={isSubmenuOpen}
                >
                  <div className="flex items-center">
                    <span className="sidebar-icon text-xl">🕒</span>
                    Content History
                  </div>
                  <span className={`text-xl transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>
                <div className={`submenu ${isSubmenuOpen ? 'submenu-open' : ''}`}>
                  <Link
                    to="/history"
                    className="sidebar-link text-sm"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    View All
                  </Link>
                  <Link
                    to="/history/recent"
                    className="sidebar-link text-sm"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Recent
                  </Link>
                </div>
              </div>
              <Link
                to="/analytics"
                className={`sidebar-link ${location.pathname === '/analytics' ? 'sidebar-link-active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
                aria-current={location.pathname === '/analytics' ? 'page' : undefined}
              >
                <span className="sidebar-icon text-xl">📊</span>
                Analytics
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  setIsAuthenticated(false);
                  setIsSidebarOpen(false);
                }}
                className="sidebar-link text-red-400 hover:text-red-300"
                aria-label="Logout"
              >
                <span className="sidebar-icon text-xl">🚪</span>
                Logout
              </button>
            </nav>

            {/* Dark Mode & Pin */}
            <div className="mt-6 space-y-2">
              <button
                onClick={toggleDarkMode}
                className="flex items-center p-4 w-full text-left rounded-xl bg-gray-800 bg-opacity-50 hover:bg-gray-700 text-white"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <>
                    <span className="sidebar-icon text-xl">☀️</span>
                    Light Mode
                  </>
                ) : (
                  <>
                    <span className="sidebar-icon text-xl">🌙</span>
                    Dark Mode
                  </>
                )}
              </button>
              <button
                onClick={togglePin}
                className="flex items-center p-4 w-full text-left rounded-xl bg-gray-800 bg-opacity-50 hover:bg-gray-700 text-white hidden md:flex"
                aria-label={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
              >
                <span className="sidebar-icon text-xl">{isPinned ? '📍' : '📌'}</span>
                {isPinned ? 'Unpin Sidebar' : 'Pin Sidebar'}
              </button>
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden fixed top-4 left-4 z-50 text-white bg-blue-600 p-2 rounded-full"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <span className="text-xl">☰</span>
          </button>

          {/* Main Content */}
          <div className="flex-1 p-6 md:p-8">
            <Routes>
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route
                path="/chat"
                element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}
              />
              <Route
                path="/history"
                element={isAuthenticated ? <History /> : <Navigate to="/login" />}
              />
              <Route
                path="/history/recent"
                element={isAuthenticated ? <History /> : <Navigate to="/login" />}
              />
              <Route
                path="/analytics"
                element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />}
              />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      )}
      {!isAuthenticated && (
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;