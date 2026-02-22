import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import {
  FaBalanceScale,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
  FaTimes,
} from 'react-icons/fa';
import './index.css';

interface DropdownItem {
  label: string;
  to: string;
}
interface NavItem {
  label: string;
  to: string;
  authRequired: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/', authRequired: false },
  { label: 'Intro', to: '/Intro', authRequired: true },
  { label: 'Food Controls', to: '/FoodControl', authRequired: true },
  { label: 'Work Plans', to: '/Works', authRequired: true },
  { label: 'Principles', to: '/Principles', authRequired: false },
  { label: 'General Rules', to: '/generalRules', authRequired: true },
];

const FORMULA_ITEMS: DropdownItem[] = [
  { label: 'Money Saving', to: '/moneySavingFormula' },
  { label: 'Reduce Speaking', to: '/reduceSpeakingFormula' },
  { label: 'Time Saving', to: '/timeSavingFormula' },
  { label: 'Tour Plan', to: '/tourPlanFormula' },
];

const getStoredEmail = (): string => {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}').email || '';
  } catch {
    return '';
  }
};

const Index = (): React.ReactElement => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => !!localStorage.getItem('user'),
  );
  const [userEmail, setUserEmail] = useState<string>(getStoredEmail);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [mobileFormulas, setMobileFormulas] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [navHidden, setNavHidden] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect((): (() => void) => {
    const onScroll = (): void => {
      const current = window.scrollY;
      const delta = current - lastScrollY.current;
      setScrolled(current > 10);
      if (current < 80) setNavHidden(false);
      else if (delta > 4) {
        setNavHidden(true);
        setDropdownOpen(false);
      } else if (delta < -8) setNavHidden(false);
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect((): (() => void) => {
    const fn = (e: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setDropdownOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  useEffect((): (() => void) => {
    const sync = (): void => {
      setIsLoggedIn(!!localStorage.getItem('user'));
      setUserEmail(getStoredEmail());
    };
    window.addEventListener('storage', sync);
    window.addEventListener('userLoggedIn', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('userLoggedIn', sync);
    };
  }, []);

  const handleLogout = (): void => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserEmail('');
    setMobileOpen(false);
    navigate('/login');
  };

  const closeMobile = (): void => setMobileOpen(false);
  const goLogin = (): void => {
    navigate('/login');
    closeMobile();
  };

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.authRequired || isLoggedIn,
  );
  const avatarLetter = userEmail ? userEmail[0].toUpperCase() : 'U';
  const displayName = userEmail ? userEmail.split('@')[0] : '';

  const navClass = [
    'nx-nav',
    scrolled ? 'nx-nav--scrolled' : '',
    navHidden ? 'nx-nav--hidden' : '',
  ]
    .filter(Boolean)
    .join(' ');

  // ── Hamburger inline style — position:fixed দিয়ে সব overflow bypass ──
  const hamStyle: React.CSSProperties = {
    position: 'fixed',
    top: '13px',
    right: '1rem',
    zIndex: 1100,
    width: '40px',
    height: '40px',
    borderRadius: '9px',
    border: '1px solid rgba(201,168,76,0.14)',
    background: mobileOpen ? 'rgba(201,168,76,0.12)' : 'rgba(201,168,76,0.05)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transform: mobileOpen ? 'rotate(90deg)' : 'rotate(0deg)',
    transition:
      'transform 0.22s ease, background 0.22s ease, border-color 0.22s ease',
    flexShrink: 0,
    padding: 0,
  };

  return (
    <>
      <nav className={navClass}>
        <div className="nx-nav__topline" />
        <div className="nx-inner">
          <Link to="/" className="nx-brand" onClick={closeMobile}>
            <span className="nx-brand__orb">
              <FaBalanceScale />
            </span>
            <span className="nx-brand__word">MYLOS</span>
          </Link>

          <ul className="nx-links">
            {visibleItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `nx-link${isActive ? ' nx-link--active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="nx-dd" ref={dropdownRef}>
              <button
                className={`nx-link nx-dd__trigger${dropdownOpen ? ' nx-link--active' : ''}`}
                onClick={() => setDropdownOpen((p) => !p)}
                aria-expanded={dropdownOpen}
              >
                Formulas
                <FaChevronDown
                  className={`nx-dd__chevron${dropdownOpen ? ' nx-dd__chevron--open' : ''}`}
                />
              </button>
              <div
                className={`nx-dd__panel${dropdownOpen ? ' nx-dd__panel--open' : ''}`}
              >
                <p className="nx-dd__caption">✦ Life-Changing Formulas</p>
                {FORMULA_ITEMS.map((f, i) => (
                  <NavLink
                    key={f.to}
                    to={f.to}
                    className={({ isActive }) =>
                      `nx-dd__item${isActive ? ' nx-dd__item--active' : ''}`
                    }
                    style={{ '--delay': `${i * 0.05}s` } as React.CSSProperties}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span className="nx-dd__dot" />
                    {f.label}
                  </NavLink>
                ))}
              </div>
            </li>
          </ul>

          <div className="nx-auth">
            {isLoggedIn ? (
              <div className="nx-user-pill">
                <span className="nx-avatar">{avatarLetter}</span>
                <span className="nx-user-pill__name">{displayName}</span>
                <button
                  className="nx-user-pill__logout"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            ) : (
              <button className="nx-signin-btn" onClick={goLogin}>
                <span className="nx-signin-btn__fill" />
                <span className="nx-signin-btn__shimmer" />
                <FaUser className="nx-signin-btn__ico" />
                <span>Sign In</span>
                <span className="nx-signin-btn__arr">›</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hamburger — fixed position, সব overflow এর বাইরে */}
      <button
        className="nx-ham-fixed"
        style={hamStyle}
        onClick={() => setMobileOpen((p) => !p)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? (
          // X icon
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ) : (
          // Bars icon
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="6" width="18" height="2" rx="1" fill="#ffffff" />
            <rect x="3" y="11" width="18" height="2" rx="1" fill="#ffffff" />
            <rect x="3" y="16" width="18" height="2" rx="1" fill="#ffffff" />
          </svg>
        )}
      </button>

      <div className="nx-spacer" />

      <div
        className={`nx-backdrop${mobileOpen ? ' nx-backdrop--open' : ''}`}
        onClick={closeMobile}
      />

      <aside className={`nx-drawer${mobileOpen ? ' nx-drawer--open' : ''}`}>
        <div className="nx-drawer__topbar">
          <Link to="/" className="nx-brand" onClick={closeMobile}>
            <span className="nx-brand__orb nx-brand__orb--sm">
              <FaBalanceScale />
            </span>
            <span className="nx-brand__word">MYLOS</span>
          </Link>
          <button
            className="nx-drawer__x"
            onClick={closeMobile}
            aria-label="Close"
          >
            <span>
              <FaTimes />
            </span>
          </button>
        </div>

        <div className="nx-drawer__card">
          {isLoggedIn ? (
            <>
              <span className="nx-avatar nx-avatar--lg">{avatarLetter}</span>
              <div className="nx-drawer__card-info">
                <span className="nx-drawer__card-name">{displayName}</span>
                <span className="nx-drawer__card-email">{userEmail}</span>
              </div>
            </>
          ) : (
            <span className="nx-drawer__card-guest">👋 Welcome, Guest</span>
          )}
        </div>

        <nav className="nx-drawer__nav">
          {visibleItems.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nx-drawer__link${isActive ? ' nx-drawer__link--active' : ''}`
              }
              style={{ '--i': i } as React.CSSProperties}
              onClick={closeMobile}
            >
              {item.label}
            </NavLink>
          ))}

          <div className="nx-acc">
            <button
              className="nx-acc__btn"
              onClick={() => setMobileFormulas((p) => !p)}
            >
              Formulas
              <FaChevronDown
                className={`nx-acc__chevron${mobileFormulas ? ' nx-acc__chevron--open' : ''}`}
              />
            </button>
            <div
              className={`nx-acc__body${mobileFormulas ? ' nx-acc__body--open' : ''}`}
            >
              {FORMULA_ITEMS.map((f) => (
                <NavLink
                  key={f.to}
                  to={f.to}
                  className={({ isActive }) =>
                    `nx-acc__link${isActive ? ' nx-acc__link--active' : ''}`
                  }
                  onClick={closeMobile}
                >
                  <span className="nx-acc__dot" />
                  {f.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <div className="nx-drawer__footer">
          {isLoggedIn ? (
            <button className="nx-drawer__logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Log Out
            </button>
          ) : (
            <button
              className="nx-signin-btn nx-signin-btn--full"
              onClick={goLogin}
            >
              <span className="nx-signin-btn__fill" />
              <span className="nx-signin-btn__shimmer" />
              <FaUser />
              <span>Sign In</span>
              <span className="nx-signin-btn__arr">›</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Index;
