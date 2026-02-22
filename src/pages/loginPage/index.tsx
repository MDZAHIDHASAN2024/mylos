import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import {
  FaBalanceScale,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaUserPlus,
} from 'react-icons/fa';
import './login.css';

// ─── Types ───────────────────────────────────────────────────────────────────
type Tab = 'signin' | 'register';

interface SignInForm {
  email: string;
  password: string;
}
interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirm: string;
}
interface StoredUser {
  email: string;
  name: string;
  password: string;
  createdAt: string;
}

// ─── Seeded admin account ────────────────────────────────────────────────────
const SEED_EMAIL = 'zahidbinanwar3@gmail.com';
const SEED_PASSWORD = 'Jahid@1234';
const SEED_NAME = 'Zahid';

const initUsers = (): void => {
  const existing: StoredUser[] = JSON.parse(
    localStorage.getItem('mylos_users') || '[]',
  );
  if (!existing.find((u) => u.email === SEED_EMAIL)) {
    existing.push({
      email: SEED_EMAIL,
      name: SEED_NAME,
      password: SEED_PASSWORD,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('mylos_users', JSON.stringify(existing));
  }
};
initUsers();

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getUsers = (): StoredUser[] =>
  JSON.parse(localStorage.getItem('mylos_users') || '[]');
const saveUsers = (users: StoredUser[]): void =>
  localStorage.setItem('mylos_users', JSON.stringify(users));

const loginUser = (user: StoredUser): void => {
  localStorage.setItem(
    'user',
    JSON.stringify({
      email: user.email,
      name: user.name,
      loggedInAt: new Date().toISOString(),
    }),
  );
  window.dispatchEvent(new Event('userLoggedIn'));
};

// ─── Component ───────────────────────────────────────────────────────────────
const Login = (): React.ReactElement => {
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>('signin');

  // Sign-in state
  const [si, setSi] = useState<SignInForm>({ email: '', password: '' });
  const [siError, setSiError] = useState<string>('');
  const [siLoading, setSiLoading] = useState<boolean>(false);
  const [siShowPw, setSiShowPw] = useState<boolean>(false);

  // Register state
  const [reg, setReg] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [regError, setRegError] = useState<string>('');
  const [regLoading, setRegLoading] = useState<boolean>(false);
  const [regShowPw, setRegShowPw] = useState<boolean>(false);
  const [regShowCf, setRegShowCf] = useState<boolean>(false);
  const [regSuccess, setRegSuccess] = useState<boolean>(false);

  // ── Sign In ────────────────────────────────────────────────────────────────
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSiError('');
    if (!si.email.trim()) {
      setSiError('Email is required.');
      return;
    }
    if (!si.password.trim()) {
      setSiError('Password is required.');
      return;
    }
    setSiLoading(true);
    setTimeout(() => {
      const user = getUsers().find(
        (u) => u.email === si.email && u.password === si.password,
      );
      if (user) {
        loginUser(user);
        navigate('/');
      } else setSiError('Invalid email or password.');
      setSiLoading(false);
    }, 600);
  };

  // ── Register ───────────────────────────────────────────────────────────────
  const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setRegError('');
    if (!reg.name.trim()) {
      setRegError('Full name is required.');
      return;
    }
    if (!reg.email.trim()) {
      setRegError('Email is required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(reg.email)) {
      setRegError('Enter a valid email.');
      return;
    }
    if (reg.password.length < 6) {
      setRegError('Password must be at least 6 characters.');
      return;
    }
    if (reg.password !== reg.confirm) {
      setRegError('Passwords do not match.');
      return;
    }

    const users = getUsers();
    if (users.find((u) => u.email === reg.email)) {
      setRegError('An account with this email already exists.');
      return;
    }

    setRegLoading(true);
    setTimeout(() => {
      const newUser: StoredUser = {
        email: reg.email,
        name: reg.name,
        password: reg.password,
        createdAt: new Date().toISOString(),
      };
      saveUsers([...users, newUser]);
      setRegSuccess(true);
      setTimeout(() => {
        loginUser(newUser);
        navigate('/');
      }, 1200);
      setRegLoading(false);
    }, 700);
  };

  return (
    <div className="lp-page">
      {/* ── Decorative background ── */}
      <div className="lp-bg">
        <div className="lp-bg__grid" />
        <div className="lp-bg__orb lp-bg__orb--1" />
        <div className="lp-bg__orb lp-bg__orb--2" />
        <div className="lp-bg__orb lp-bg__orb--3" />
        <div className="lp-bg__line lp-bg__line--1" />
        <div className="lp-bg__line lp-bg__line--2" />
      </div>

      {/* ── Card ── */}
      <div className="lp-card">
        {/* Card inner glow border */}
        <div className="lp-card__border" />

        {/* Brand */}
        <Link to="/" className="lp-brand">
          <span className="lp-brand__orb">
            <FaBalanceScale />
            <span className="lp-brand__orb-ring" />
          </span>
          <div className="lp-brand__text-wrap">
            <span className="lp-brand__text">MYLOS</span>
            <span className="lp-brand__sub">Premium Access</span>
          </div>
        </Link>

        {/* Gold divider */}
        <div className="lp-divider" />

        {/* Tabs */}
        <div className="lp-tabs">
          <button
            className={`lp-tab${tab === 'signin' ? ' lp-tab--active' : ''}`}
            onClick={() => {
              setTab('signin');
              setSiError('');
            }}
          >
            <FaUser className="lp-tab__ico" />
            <span>Sign In</span>
          </button>
          <button
            className={`lp-tab${tab === 'register' ? ' lp-tab--active' : ''}`}
            onClick={() => {
              setTab('register');
              setRegError('');
              setRegSuccess(false);
            }}
          >
            <FaUserPlus className="lp-tab__ico" />
            <span>Create Account</span>
          </button>
          <span
            className="lp-tab__indicator"
            style={{
              transform:
                tab === 'register' ? 'translateX(100%)' : 'translateX(0)',
            }}
          />
        </div>

        {/* ══ SIGN IN ══ */}
        {tab === 'signin' && (
          <div className="lp-form-wrap" key="signin">
            <div className="lp-form-head">
              <h1 className="lp-title">Welcome Back</h1>
              <p className="lp-sub">Enter your credentials to continue</p>
            </div>

            {siError && (
              <div className="lp-error">
                <span className="lp-error__dot" />
                {siError}
              </div>
            )}

            <form onSubmit={handleSignIn} className="lp-form" noValidate>
              <div className="lp-field">
                <label htmlFor="si-email" className="lp-label">
                  Email Address
                </label>
                <div className="lp-input-wrap">
                  <FaEnvelope className="lp-input-ico" />
                  <input
                    id="si-email"
                    type="email"
                    name="email"
                    value={si.email}
                    onChange={(e) =>
                      setSi((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className="lp-input"
                    autoComplete="email"
                    disabled={siLoading}
                  />
                </div>
              </div>

              <div className="lp-field">
                <label htmlFor="si-pw" className="lp-label">
                  Password
                </label>
                <div className="lp-input-wrap">
                  <FaLock className="lp-input-ico" />
                  <input
                    id="si-pw"
                    type={siShowPw ? 'text' : 'password'}
                    name="password"
                    value={si.password}
                    onChange={(e) =>
                      setSi((p) => ({ ...p, password: e.target.value }))
                    }
                    placeholder="••••••••"
                    className="lp-input"
                    autoComplete="current-password"
                    disabled={siLoading}
                  />
                  <button
                    type="button"
                    className="lp-eye"
                    onClick={() => setSiShowPw((p) => !p)}
                    tabIndex={-1}
                    aria-label="Toggle password"
                  >
                    {siShowPw ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="lp-submit" disabled={siLoading}>
                <span className="lp-submit__bg" />
                <span className="lp-submit__shine" />
                <span className="lp-submit__content">
                  {siLoading ? (
                    <>
                      <span className="lp-spinner" /> Signing in…
                    </>
                  ) : (
                    <>
                      <FaUser /> Sign In{' '}
                      <span className="lp-submit__arr">›</span>
                    </>
                  )}
                </span>
              </button>
            </form>

            <p className="lp-switch">
              No account?{' '}
              <button
                className="lp-switch__btn"
                onClick={() => setTab('register')}
              >
                Create one →
              </button>
            </p>
          </div>
        )}

        {/* ══ REGISTER ══ */}
        {tab === 'register' && (
          <div className="lp-form-wrap" key="register">
            {regSuccess ? (
              <div className="lp-success">
                <div className="lp-success__ring">
                  <span className="lp-success__check">✓</span>
                </div>
                <p className="lp-success__title">Account Created!</p>
                <p className="lp-success__msg">Signing you in to MYLOS…</p>
              </div>
            ) : (
              <>
                <div className="lp-form-head">
                  <h1 className="lp-title">Join MYLOS</h1>
                  <p className="lp-sub">Create your premium account</p>
                </div>

                {regError && (
                  <div className="lp-error">
                    <span className="lp-error__dot" />
                    {regError}
                  </div>
                )}

                <form onSubmit={handleRegister} className="lp-form" noValidate>
                  <div className="lp-field">
                    <label htmlFor="reg-name" className="lp-label">
                      Full Name
                    </label>
                    <div className="lp-input-wrap">
                      <FaUser className="lp-input-ico" />
                      <input
                        id="reg-name"
                        type="text"
                        name="name"
                        value={reg.name}
                        onChange={(e) =>
                          setReg((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="Your name"
                        className="lp-input"
                        autoComplete="name"
                        disabled={regLoading}
                      />
                    </div>
                  </div>

                  <div className="lp-field">
                    <label htmlFor="reg-email" className="lp-label">
                      Email Address
                    </label>
                    <div className="lp-input-wrap">
                      <FaEnvelope className="lp-input-ico" />
                      <input
                        id="reg-email"
                        type="email"
                        name="email"
                        value={reg.email}
                        onChange={(e) =>
                          setReg((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="your@email.com"
                        className="lp-input"
                        autoComplete="email"
                        disabled={regLoading}
                      />
                    </div>
                  </div>

                  <div className="lp-field">
                    <label htmlFor="reg-pw" className="lp-label">
                      Password
                    </label>
                    <div className="lp-input-wrap">
                      <FaLock className="lp-input-ico" />
                      <input
                        id="reg-pw"
                        type={regShowPw ? 'text' : 'password'}
                        name="password"
                        value={reg.password}
                        onChange={(e) =>
                          setReg((p) => ({ ...p, password: e.target.value }))
                        }
                        placeholder="Min. 6 characters"
                        className="lp-input"
                        autoComplete="new-password"
                        disabled={regLoading}
                      />
                      <button
                        type="button"
                        className="lp-eye"
                        onClick={() => setRegShowPw((p) => !p)}
                        tabIndex={-1}
                      >
                        {regShowPw ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="lp-field">
                    <label htmlFor="reg-cf" className="lp-label">
                      Confirm Password
                    </label>
                    <div className="lp-input-wrap">
                      <FaLock className="lp-input-ico" />
                      <input
                        id="reg-cf"
                        type={regShowCf ? 'text' : 'password'}
                        name="confirm"
                        value={reg.confirm}
                        onChange={(e) =>
                          setReg((p) => ({ ...p, confirm: e.target.value }))
                        }
                        placeholder="Repeat password"
                        className="lp-input"
                        autoComplete="new-password"
                        disabled={regLoading}
                      />
                      <button
                        type="button"
                        className="lp-eye"
                        onClick={() => setRegShowCf((p) => !p)}
                        tabIndex={-1}
                      >
                        {regShowCf ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="lp-submit lp-submit--register"
                    disabled={regLoading}
                  >
                    <span className="lp-submit__bg" />
                    <span className="lp-submit__shine" />
                    <span className="lp-submit__content">
                      {regLoading ? (
                        <>
                          <span className="lp-spinner" /> Creating…
                        </>
                      ) : (
                        <>
                          <FaUserPlus /> Create Account{' '}
                          <span className="lp-submit__arr">›</span>
                        </>
                      )}
                    </span>
                  </button>
                </form>

                <p className="lp-switch">
                  Have an account?{' '}
                  <button
                    className="lp-switch__btn"
                    onClick={() => setTab('signin')}
                  >
                    Sign in →
                  </button>
                </p>
              </>
            )}
          </div>
        )}

        {/* Back link */}
        <div className="lp-footer">
          <Link to="/" className="lp-back">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
