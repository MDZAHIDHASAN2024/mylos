import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import {
  FaBalanceScale,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import './index.css';

// ─── Types ───────────────────────────────────────────────────────────────────
interface DropdownItem {
  label: string;
  to: string;
}
interface NavItem {
  label: string;
  to: string;
  authRequired: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────
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

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getStoredEmail = (): string => {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}').email || '';
  } catch {
    return '';
  }
};

// ─── Component ───────────────────────────────────────────────────────────────
const Index = (): React.ReactElement => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => !!localStorage.getItem('user'),
  );
  const [userEmail, setUserEmail] = useState<string>(getStoredEmail);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [mobileFormulas, setMobileFormulas] = useState<boolean>(false);

  // ── Scroll hide / show state ────────────────────────────────────────────
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [navHidden, setNavHidden] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);

  const dropdownRef = useRef<HTMLLIElement>(null);

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // ── Scroll: shadow + hide/show ──────────────────────────────────────────
  useEffect((): (() => void) => {
    const HIDE_THRESHOLD = 80;
    const SHOW_UP_DELTA = 8;

    const onScroll = (): void => {
      const current = window.scrollY;
      const delta = current - lastScrollY.current;

      setScrolled(current > 10);

      if (current < HIDE_THRESHOLD) {
        setNavHidden(false);
      } else if (delta > 4) {
        setNavHidden(true);
        setDropdownOpen(false);
      } else if (delta < -SHOW_UP_DELTA) {
        setNavHidden(false);
      }

      lastScrollY.current = current;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
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

  // Sync login state
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

  const visibleItems: NavItem[] = NAV_ITEMS.filter(
    (item) => !item.authRequired || isLoggedIn,
  );

  const avatarLetter: string = userEmail ? userEmail[0].toUpperCase() : 'U';
  const displayName: string = userEmail ? userEmail.split('@')[0] : '';

  const navClass = [
    'nx-nav',
    scrolled ? 'nx-nav--scrolled' : '',
    navHidden ? 'nx-nav--hidden' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {/* ══════════════════════ NAVBAR ══════════════════════ */}
      <nav className={navClass}>
        <div className="nx-nav__topline" />

        <div className="nx-inner">
          {/* Brand */}
          <Link to="/" className="nx-brand" onClick={closeMobile}>
            <span className="nx-brand__orb">
              <FaBalanceScale />
            </span>
            <span className="nx-brand__word">MYLOS</span>
          </Link>

          {/* Desktop links */}
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

            {/* Formulas dropdown */}
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

          {/* Desktop Auth */}
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

          {/* Hamburger */}
          <button
            className={`nx-ham${mobileOpen ? ' nx-ham--open' : ''}`}
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* ✅ SPACER — এই div টা navbar এর height এর সমান জায়গা নেয়।
          যেকোনো page এ Index render হলে এই spacer সব content কে
          navbar এর নিচে ঠেলে দেবে। */}
      <div className="nx-spacer" />

      {/* Backdrop */}
      <div
        className={`nx-backdrop${mobileOpen ? ' nx-backdrop--open' : ''}`}
        onClick={closeMobile}
      />

      {/* ══════════════════════ MOBILE DRAWER ══════════════════════ */}
      <aside className={`nx-drawer${mobileOpen ? ' nx-drawer--open' : ''}`}>
        {/* Top bar */}
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
            <FaTimes />
          </button>
        </div>

        {/* User card */}
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

        {/* Nav */}
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

          {/* Accordion */}
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

        {/* Footer */}
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
