//client/src/App.js
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

  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {isAuthenticated && (
        <div className="flex">
          {/* Mobile Overlay */}
          {isSidebarOpen && !isPinned && (
            <div 
              className="sidebar-overlay md:hidden" 
              onClick={closeSidebar}
              aria-hidden="true"
            />
          )}

          {/* Sidebar */}
          <div
            className={`sidebar transition-all duration-300 ${
              isSidebarOpen || isPinned ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            } w-64 ${isSidebarOpen ? 'sidebar-open' : ''}`}
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Header */}
            <div className="sidebar-header">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white dark:text-gray-900 font-bold text-sm">CP</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Creator Platform</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Content Management</p>
                  </div>
                </div>
                <button
                  className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
                  onClick={toggleSidebar}
                  aria-label="Close sidebar"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Profile Section */}
            <div className="sidebar-profile">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Test User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Content Creator</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav flex-1">
              <div className="space-y-1">
                <Link
                  to="/chat"
                  className={`sidebar-link ${location.pathname === '/chat' ? 'sidebar-link-active' : ''}`}
                  onClick={closeSidebar}
                  aria-current={location.pathname === '/chat' ? 'page' : undefined}
                >
                  <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
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
                      <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Content History
                    </div>
                    <svg 
                      className={`w-4 h-4 transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  
                  <div className={`submenu ${isSubmenuOpen ? 'submenu-open' : ''}`}>
                    <Link
                      to="/history"
                      className="sidebar-link"
                      onClick={closeSidebar}
                    >
                      <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                      </svg>
                      View All
                    </Link>
                    <Link
                      to="/history/recent"
                      className="sidebar-link"
                      onClick={closeSidebar}
                    >
                      <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Recent
                    </Link>
                  </div>
                </div>

                <Link
                  to="/analytics"
                  className={`sidebar-link ${location.pathname === '/analytics' ? 'sidebar-link-active' : ''}`}
                  onClick={closeSidebar}
                  aria-current={location.pathname === '/analytics' ? 'page' : undefined}
                >
                  <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                  Analytics
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                    setIsSidebarOpen(false);
                  }}
                  className="sidebar-link w-full text-left text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                  aria-label="Logout"
                >
                  <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                  </svg>
                  Sign Out
                </button>
              </div>
            </nav>

            {/* Settings Section */}
            <div className="sidebar-settings">
              <button
                onClick={toggleDarkMode}
                className="settings-button"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <>
                    <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                    Light Mode
                  </>
                ) : (
                  <>
                    <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                    </svg>
                    Dark Mode
                  </>
                )}
              </button>
              
              <button
                onClick={togglePin}
                className="settings-button hidden md:flex"
                aria-label={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
              >
                <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isPinned ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                  )}
                </svg>
                {isPinned ? 'Unpin Sidebar' : 'Pin Sidebar'}
              </button>
            </div>
          </div>

          {/* Mobile Toggle Button */}
          {!isSidebarOpen && (
            <button
              className="sidebar-toggle md:hidden"
              onClick={toggleSidebar}
              aria-label="Open sidebar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
            </button>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0 main-content-with-sidebar">
            <main className="p-6 md:p-8">
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
            </main>
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