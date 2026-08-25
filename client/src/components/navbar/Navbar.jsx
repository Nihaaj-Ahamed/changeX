import "./navbar.scss";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useNotificationStore } from "../../lib/notificationStore";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [featureOn, setFeatureOn] = useState(() => localStorage.getItem("featureOn") === "true");

  const { currentUser } = useContext(AuthContext);
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (featureOn) {
      document.body.classList.add("feature-active");
    } else {
      document.body.classList.remove("feature-active");
    }
    localStorage.setItem("featureOn", String(featureOn));
  }, [featureOn]);

  useEffect(() => {
    if (currentUser) {
      fetch();
    }
  }, [currentUser, fetch]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleFeature = () => {
    setFeatureOn((prev) => !prev);
  };

  return (
    <nav className="navbar-container">
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>ChangeX</span>
        </a>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/support" className="nav-link">Support</Link>
        <Link 
  to="/list" 
  className="nav-link" 
  style={{
    fontWeight: "bold",
    textShadow: "0 0 8px rgba(16, 185, 129, 0.5)",
    background: "linear-gradient(135deg, #10b981 30%, #059669 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }}
>
  Products
</Link>      </div>
      <div className="right">
        {/* Desktop Controls */}
        <div className="controls">
          <div className="feature-toggle-container" title="Toggle premium features">
            <span className="toggle-label">Glow Mode</span>
            <div className={`switch-toggle ${featureOn ? "active" : ""}`} onClick={toggleFeature}>
              <div className="switch-handle" />
            </div>
          </div>
          <button onClick={toggleTheme} className="theme-btn" aria-label="Toggle Theme">
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {currentUser ? (
          <div className="user">
            <img
              src={currentUser.avatar || "/noAvathar.png"}
              alt={currentUser.username || "User avatar"}
            />
            <span className="username">{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <div className="auth-links">
            <a href="/login" className="signin">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </div>
        )}

        <div className="menuIcon">
          <div className={`hamburger ${open ? "open" : ""}`} onClick={() => setOpen((prev) => !prev)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Mobile Sliding Glass Drawer */}
        <div className={`menu ${open ? "active" : ""}`}>
          <div className="menu-header">
            <span className="menu-title">Navigation</span>
          </div>
          <div className="menu-links">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/support" onClick={() => setOpen(false)}>Support</Link>
            <Link
              to="/list"
              onClick={() => setOpen(false)}
              style={{
                color: "var(--accent-primary)",
                fontWeight: "bold",
                textShadow: "0 0 10px var(--accent-glow)"
              }}
            >
              Products
            </Link>            {!currentUser && (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>Sign in</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="register-mobile">Sign up</Link>
              </>
            )}
          </div>
          <div className="mobile-controls">
            <div className="control-item">
              <span>Theme</span>
              <button onClick={toggleTheme} className="theme-btn" aria-label="Toggle Theme">
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>
            <div className="control-item">
              <span>Glow Mode</span>
              <div className={`switch-toggle ${featureOn ? "active" : ""}`} onClick={toggleFeature}>
                <div className="switch-handle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
