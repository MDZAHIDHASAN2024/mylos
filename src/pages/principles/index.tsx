import { useEffect, useRef, useState } from 'react';

import './index.css';
import PageTitle from '../pageTitle/pageTitle';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Principle {
  id: number;
  rule: string;
  arabic?: string;
  icon: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const principles: Principle[] = [
  {
    id: 1,
    icon: '🤲',
    arabic: 'رِضَا ٱللَّٰهِ',
    rule: 'প্রতিটি কাজে আল্লাহর সন্তুষ্টি অর্জনের চেষ্টা করো।',
  },
  {
    id: 2,
    icon: '🌾',
    arabic: 'الرِّزْقُ الْحَلَالُ',
    rule: 'হালাল রুজি উপার্জন ও ভক্ষণ করো।',
  },
  {
    id: 3,
    icon: '🕌',
    arabic: 'إِقَامَةُ الصَّلَاةِ',
    rule: 'পাঁচ ওয়াক্ত সালাত নিয়মিত আদায় করো।',
  },
  {
    id: 4,
    icon: '🌙',
    arabic: 'صِيَامُ رَمَضَانَ',
    rule: 'রামাদান মাসে সিয়াম যথাযথভাবে পালন করো।',
  },
  {
    id: 5,
    icon: '💸',
    arabic: 'الصَّدَقَةُ',
    rule: 'সাধ্য মতো বেশি বেশি দান করো।',
  },
];

// ─── Card Component ───────────────────────────────────────────────────────────

interface CardProps {
  principle: Principle;
  index: number;
}

const PrincipleCard = ({ principle, index }: CardProps): React.ReactElement => {
  const [visible, setVisible] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) => {
    const obs = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return (): void => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`pr-card${visible ? ' pr-card--visible' : ''}${hovered ? ' pr-card--hovered' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      onMouseEnter={(): void => setHovered(true)}
      onMouseLeave={(): void => setHovered(false)}
    >
      {/* number ribbon */}
      <div className="pr-card__ribbon">
        <span className="pr-card__num">
          {String(principle.id).padStart(2, '0')}
        </span>
      </div>

      {/* glow blob */}
      <div className="pr-card__blob" />

      {/* icon */}
      <div className="pr-card__icon-wrap">
        <span className="pr-card__icon">{principle.icon}</span>
      </div>

      {/* content */}
      <div className="pr-card__body">
        {principle.arabic && (
          <p className="pr-card__arabic">{principle.arabic}</p>
        )}
        <p className="pr-card__rule">{principle.rule}</p>
      </div>

      {/* bottom accent */}
      <div className="pr-card__accent" />
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Principles = (): React.ReactElement => {
  const [headerVisible, setHeaderVisible] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) => {
    const obs = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.1 },
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return (): void => obs.disconnect();
  }, []);

  return (
    <div className="pr-page">
      <PageTitle title="Principle" subtitle="Principle" />
      {/* ambient background glows */}
      <div className="pr-page__glow pr-page__glow--1" />
      <div className="pr-page__glow pr-page__glow--2" />

      <div className="pr-page__inner">
        <PageTitle title="Principles" />

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className={`pr-header${headerVisible ? ' pr-header--visible' : ''}`}
        >
          <div className="pr-header__eyebrow">Core Foundation</div>
          <h1 className="pr-header__title">
            Principle <span className="pr-header__title-accent">of 5</span>
          </h1>
          <p className="pr-header__sub">
            পাঁচ মূল নীতি যা একটি পরিপূর্ণ জীবনের ভিত্তি গড়ে তোলে
          </p>
          <div className="pr-header__line" />
        </div>

        {/* ── Cards grid ── */}
        <div className="pr-grid">
          {principles.map((principle: Principle, i: number) => (
            <PrincipleCard key={principle.id} principle={principle} index={i} />
          ))}
        </div>

        {/* ── Footer note ── */}
        <div className="pr-footnote">
          <span className="pr-footnote__dot" />
          <span>এই পাঁচ নীতি অনুসরণ করাই সত্যিকারের সাফল্যের পথ</span>
          <span className="pr-footnote__dot" />
        </div>
      </div>
    </div>
  );
};

export default Principles;
