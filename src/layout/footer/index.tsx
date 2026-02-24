import { useEffect, useRef, useState } from 'react';
import { FaBalanceScale, FaGithub, FaHeart } from 'react-icons/fa';
import './index.css';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SECTIONS: FooterSection[] = [
  {
    title: 'Navigate',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Principles', href: '/Principles' },
      { label: 'Work Plans', href: '/Works' },
      { label: 'Intro', href: '/Intro' },
    ],
  },
  {
    title: 'Formulas',
    links: [
      { label: 'Money Saving', href: '/moneySavingFormula' },
      { label: 'Time Saving', href: '/timeSavingFormula' },
      { label: 'Reduce Speaking', href: '/reduceSpeakingFormula' },
      { label: 'Tour Plan', href: '/tourPlanFormula' },
    ],
  },
];

const SOCIAL: { icon: React.ReactElement; href: string; label: string }[] = [
  { icon: <FaGithub />, href: 'https://github.com', label: 'GitHub' },
];

const VERSION = 'v12.01';
const YEAR = new Date().getFullYear();

// ─── Component ────────────────────────────────────────────────────────────────

const Footer = (): React.ReactElement => {
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);

  // Reveal on scroll into view
  useEffect((): (() => void) => {
    const obs = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return (): void => obs.disconnect();
  }, []);

  return (
    <footer ref={ref} className={`ft${visible ? ' ft--visible' : ''}`}>
      {/* top glow line */}
      <div className="ft__topline" />

      <div className="ft__inner">
        {/* ── Brand col ── */}
        <div className="ft__brand-col">
          <div className="ft__logo">
            <FaBalanceScale className="ft__logo-icon" />
            <span className="ft__logo-text">MYLOS</span>
          </div>
          <p className="ft__tagline">
            Engineer your life with intention. Every system, every habit —
            Crafted by Zahid Hasan.
          </p>
          <div className="ft__socials">
            {SOCIAL.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="ft__social"
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </div>
          <div className="ft__badge">{VERSION}</div>
        </div>

        {/* ── Link cols ── */}
        {SECTIONS.map((section: FooterSection, si: number) => (
          <div
            key={section.title}
            className="ft__col"
            style={{ animationDelay: `${si * 0.08 + 0.1}s` }}
          >
            <h4 className="ft__col-title">{section.title}</h4>
            <ul className="ft__list">
              {section.links.map((link: FooterLink) => (
                <li key={link.href}>
                  <a href={link.href} className="ft__list-link">
                    <span className="ft__list-arrow">›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div className="ft__bottom">
        <div className="ft__divider" />
        <div className="ft__copy">
          <span>© {YEAR} All Rights Reserved</span>
          <span className="ft__dot">·</span>
          <span className="ft__dev">
            Designed and developed
            <FaHeart className="ft__heart" /> by <strong>Zahid Hasan</strong>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
