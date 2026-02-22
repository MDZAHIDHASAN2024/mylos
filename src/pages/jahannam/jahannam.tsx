import { useState, useEffect, useMemo } from 'react';
import PageTitle from '../pageTitle/pageTitle';

const jahannamData = [
  {
    id: 1,
    arabic:
      'إِنَّ ٱلَّذِينَ كَفَرُوا۟ بِـَٔايَٰتِنَا سَوْفَ نُصْلِيهِمْ نَارًۭا ۚ كُلَّمَا نَضِجَتْ جُلُودُهُم بَدَّلْنَـٰهُمْ جُلُودًا غَيْرَهَا لِيَذُوقُوا۟ ٱلْعَذَابَ',
    bangla:
      'যারা আমাদের আয়াতসমূহে অবিশ্বাস করে, আমি তাদের অচিরেই আগুনে নিক্ষেপ করব। তাদের চামড়া যখনই পুড়ে যাবে, আমি তাদের নতুন চামড়া দেব — যাতে তারা শাস্তির স্বাদ আস্বাদন করতে পারে।',
    ref: 'সূরা আন-নিসা ৪:৫৬',
    type: 'quran',
    icon: '🔥',
  },
  {
    id: 2,
    arabic: '',
    bangla:
      'যারা তাদের প্রভুর প্রতি অবিশ্বাস করেছে, তাদের জন্য জাহান্নামের শাস্তি রয়েছে। সেটা কতই না নিকৃষ্ট স্থান! যখন তাদের সেখানে নিক্ষেপ করা হবে, তখন তারা তার ভয়ংকর গর্জন শুনবে — সেটি যেন উত্তপ্ত হতে থাকে।',
    ref: 'সূরা আল-মুলক ৬৭:৬-৭',
    type: 'quran',
    icon: '⚡',
  },
  {
    id: 3,
    arabic: '',
    bangla:
      'যারা কাফের হয়েছে, তাদের জন্য আগুনের পোশাক তৈরি করা হয়েছে। তাদের মাথার উপর ঢালা হবে ফুটন্ত পানি — এর দ্বারা তাদের পেট ও চামড়া গলিয়ে ফেলা হবে। এবং তাদের জন্য থাকবে লোহার হাতুড়ি।',
    ref: 'সূরা আল-হাজ্জ ২২:১৯-২২',
    type: 'quran',
    icon: '⛓️',
  },
  {
    id: 4,
    arabic: '',
    bangla:
      'তারা প্রবেশ করবে দহনকারী আগুনে, তাদেরকে পান করতে দেওয়া হবে ফুটন্ত ঝর্ণার পানি। তাদের জন্য কোনো খাদ্য থাকবে না — শুধুমাত্র কাঁটা ঝোপ ব্যতীত, যা না পুষ্টি দেয়, না ক্ষুধা নিবারণ করে।',
    ref: 'সূরা আল-গাশিয়াহ ৮৮:৪-৭',
    type: 'quran',
    icon: '🌋',
  },
  {
    id: 5,
    arabic: '',
    bangla:
      'রাসুল ﷺ বলেছেন: জাহান্নামের আগুন দুনিয়ার আগুনের তুলনায় সত্তর গুণ বেশি উত্তপ্ত।',
    ref: 'সহিহ বুখারী: ৩২৬৫, সহিহ মুসলিম: ২৮৪৩',
    type: 'hadith',
    icon: '💀',
  },
  {
    id: 6,
    arabic: '',
    bangla:
      "রাসুল ﷺ বলেছেন: জাহান্নামের সবচেয়ে হালকা শাস্তি হবে এমন যে, একজনের পায়ের তলায় আগুনের দু'টি কয়লা রাখা হবে — যার কারণে তার মস্তিষ্ক ফুটতে থাকবে।",
    ref: 'সহিহ বুখারী: ৬৫৬২, সহিহ মুসলিম: ২১২',
    type: 'hadith',
    icon: '🩸',
  },
  {
    id: 7,
    arabic: '',
    bangla:
      'রাসুল ﷺ বলেছেন: যদি জাহান্নামের একটি শ্বাস দুনিয়ার দিকে পাঠানো হতো, তবে দুনিয়ার সব জীবিত প্রাণী ধ্বংস হয়ে যেত।',
    ref: 'তিরমিজি',
    type: 'hadith',
    icon: '☠️',
  },
  {
    id: 8,
    arabic: '',
    bangla:
      'রাসুল ﷺ বলেছেন: জাহান্নামের আগুন এক হাজার বছর জ্বালানো হয়েছে যতক্ষণ না তা লাল হয়েছে। তারপর এক হাজার বছর — যতক্ষণ না তা সাদা হয়েছে। তারপর আবার এক হাজার বছর — যতক্ষণ না তা কালো হয়েছে। এখন সেটি সম্পূর্ণ অন্ধকার ও ভয়াবহ কালো।',
    ref: 'তিরমিজি – হাদিসটি হাসান',
    type: 'hadith',
    icon: '🌑',
  },
];

const Jahannam = () => {
  const [visible, setVisible] = useState<number[]>([]);
  const [filter, setFilter] = useState<'all' | 'quran' | 'hadith'>('all');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [highlighted, setHighlighted] = useState<number>(0);

  const filtered = useMemo(
    () => jahannamData.filter((d) => filter === 'all' || d.type === filter),
    [filter],
  );

  useEffect(() => {
    setVisible([]);
    filtered.forEach((_, i) =>
      setTimeout(() => setVisible((p) => [...p, i]), i * 100),
    );
  }, [filtered]);

  useEffect(() => {
    const id = setInterval(() => {
      setHighlighted((p) => (p + 1) % filtered.length);
    }, 5000);
    return () => clearInterval(id);
  }, [filtered.length]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;600;700&family=Amiri:wght@400;700&family=Cinzel:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .jh-root {
          min-height: 100vh;
          background: #0a0604;
          background-image:
            radial-gradient(ellipse 80% 60% at 50% 0%,   rgba(220,60,10,0.13) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 5%  95%,  rgba(180,30,5,0.08)  0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 95% 60%,  rgba(150,20,0,0.06)  0%, transparent 50%);
          font-family: 'DM Sans', sans-serif;
          color: #fde8d8;
          padding: 2rem 1rem 4rem;
        }

        /* ── Header ── */
        .jh-header { text-align: center; margin-bottom: 2.5rem; }
        .jh-bismillah {
          font-family: 'Amiri', serif;
          font-size: clamp(1.6rem, 5vw, 2.4rem);
          color: #fca07a;
          margin-bottom: 0.75rem;
          letter-spacing: 0.05em;
          line-height: 1.4;
          direction: rtl;
        }
        .jh-eyebrow {
          font-size: 0.65rem; letter-spacing: 0.3em;
          text-transform: uppercase; color: #f97316;
          margin-bottom: 0.5rem;
        }
        .jh-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 900;
          letter-spacing: 0.04em; line-height: 1.05; margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff 0%, #fca07a 45%, #ef4444 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .jh-subtitle {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.85rem; color: #7c2d12; letter-spacing: 0.04em;
        }

        /* ── Stats bar ── */
        .jh-stats {
          max-width: 680px; margin: 0 auto 2rem;
          display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
        }
        .jh-stat {
          background: rgba(124,45,18,0.35);
          border: 1px solid rgba(249,115,22,0.15);
          border-radius: 10px; padding: 0.6rem 1.2rem;
          text-align: center; flex: 1; min-width: 100px;
        }
        .jh-stat-val {
          font-family: 'Cinzel', serif; font-size: 1.4rem; font-weight: 900;
          background: linear-gradient(135deg, #fca07a, #ef4444);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          line-height: 1;
        }
        .jh-stat-label {
          font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: #7c2d12; margin-top: 0.25rem;
        }

        /* ── Filter pills ── */
        .jh-filters {
          display: flex; gap: 0.5rem; justify-content: center;
          margin-bottom: 2rem; flex-wrap: wrap;
        }
        .jh-pill {
          font-size: 0.72rem; font-weight: 600; padding: 0.35rem 1rem;
          border-radius: 20px; border: 1.5px solid rgba(249,115,22,0.2);
          background: transparent; color: #7c2d12;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all .18s ease;
        }
        .jh-pill:hover { border-color: #f97316; color: #f97316; }
        .jh-pill.active {
          background: linear-gradient(135deg, #7c2d12, #991b1b);
          border-color: #f97316; color: #fca07a;
          box-shadow: 0 4px 14px rgba(249,115,22,0.25);
        }

        /* ── Cards ── */
        .jh-grid {
          display: flex; flex-direction: column; gap: 1rem;
          max-width: 680px; margin: 0 auto;
        }

        .jh-card {
          background: rgba(30,8,4,0.85);
          border: 1.5px solid rgba(249,115,22,0.1);
          border-radius: 16px; overflow: hidden; cursor: pointer;
          opacity: 0; transform: translateX(-16px);
          transition: border-color .25s, box-shadow .25s, transform .25s;
          backdrop-filter: blur(8px);
        }
        .jh-card.visible { animation: jhSlideIn .4s ease forwards; }
        @keyframes jhSlideIn { to { opacity: 1; transform: translateX(0); } }
        .jh-card:hover {
          border-color: rgba(249,115,22,0.35);
          transform: translateX(5px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.5);
        }
        .jh-card.highlighted {
          border-color: rgba(249,115,22,0.5);
          box-shadow: 0 0 0 2px rgba(239,68,68,0.1), 0 8px 32px rgba(0,0,0,0.6),
                      inset 0 0 40px rgba(249,115,22,0.04);
        }
        .jh-card.expanded {
          border-color: rgba(249,115,22,0.4);
          box-shadow: 0 0 0 2px rgba(249,115,22,0.08), 0 8px 32px rgba(0,0,0,0.6);
        }

        .jh-card-head {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.1rem 1.3rem;
        }
        .jh-icon {
          font-size: 1.6rem; line-height: 1; flex-shrink: 0;
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(249,115,22,0.07);
          border: 1px solid rgba(249,115,22,0.12);
          display: flex; align-items: center; justify-content: center;
        }
        .jh-head-meta { flex: 1; min-width: 0; }
        .jh-type-badge {
          font-size: 0.55rem; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; padding: 0.15rem 0.5rem;
          border-radius: 20px; border: 1px solid; display: inline-block;
          margin-bottom: 0.3rem;
        }
        .jh-type-badge.quran {
          color: #f97316; border-color: rgba(249,115,22,0.3);
          background: rgba(249,115,22,0.07);
        }
        .jh-type-badge.hadith {
          color: #fca07a; border-color: rgba(252,160,122,0.3);
          background: rgba(252,160,122,0.06);
        }
        .jh-preview {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.85rem; color: #fcd5bc; line-height: 1.5;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .jh-arrow {
          font-size: 0.65rem; color: #7c2d12; flex-shrink: 0;
          transition: transform .25s, color .2s;
        }
        .jh-card.expanded .jh-arrow { transform: rotate(90deg); color: #f97316; }

        /* Expanded body */
        .jh-body {
          max-height: 0; overflow: hidden;
          transition: max-height .4s ease, padding .3s ease;
          padding: 0 1.3rem;
        }
        .jh-body.open { max-height: 600px; padding: 0 1.3rem 1.3rem; }
        .jh-divider { height: 1px; background: rgba(249,115,22,0.1); margin-bottom: 1rem; }

        .jh-arabic {
          font-family: 'Amiri', serif;
          font-size: clamp(1.1rem, 3vw, 1.5rem);
          color: #fca07a; text-align: right; direction: rtl;
          line-height: 2; margin-bottom: 1rem;
          padding: 0.75rem 1rem;
          background: rgba(249,115,22,0.04);
          border-radius: 10px;
          border-right: 3px solid rgba(249,115,22,0.35);
        }
        .jh-bangla {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.95rem; color: #fcd5bc; line-height: 1.85;
          margin-bottom: 1rem;
        }
        .jh-ref {
          font-size: 0.65rem; letter-spacing: 0.12em;
          font-family: 'DM Sans', sans-serif;
          color: #7c2d12; text-align: right;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(249,115,22,0.08);
        }

        /* Footer divider */
        .jh-section-div {
          max-width: 680px; margin: 1.5rem auto 0;
          display: flex; align-items: center; gap: 1rem;
        }
        .jh-sdl { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent); }
        .jh-sdm { font-family: 'Cinzel', serif; font-size: 0.6rem; color: #f97316; letter-spacing: 0.2em; text-transform: uppercase; white-space: nowrap; }

        @media (max-width: 500px) {
          .jh-arabic { font-size: 1rem; }
          .jh-bangla { font-size: 0.88rem; }
        }
      `}</style>

      <div className="jh-root">
        <PageTitle title="Jahannam" />

        {/* Header */}
        <div className="jh-header">
          <div className="jh-bismillah">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div className="jh-eyebrow">Descriptions of Hellfire</div>
          <h1 className="jh-title">জাহান্নামের বিবরণ</h1>
          <div className="jh-subtitle">
            কুরআন ও হাদিসের আলোকে জাহান্নামের শাস্তি
          </div>
        </div>

        {/* Stats */}
        <div className="jh-stats">
          <div className="jh-stat">
            <div className="jh-stat-val">{jahannamData.length}</div>
            <div className="jh-stat-label">মোট বিবরণ</div>
          </div>
          <div className="jh-stat">
            <div className="jh-stat-val">
              {jahannamData.filter((d) => d.type === 'quran').length}
            </div>
            <div className="jh-stat-label">কুরআনের আয়াত</div>
          </div>
          <div className="jh-stat">
            <div className="jh-stat-val">
              {jahannamData.filter((d) => d.type === 'hadith').length}
            </div>
            <div className="jh-stat-label">হাদিস</div>
          </div>
        </div>

        {/* Filter */}
        <div className="jh-filters">
          {(['all', 'quran', 'hadith'] as const).map((f) => (
            <button
              key={f}
              className={`jh-pill ${filter === f ? 'active' : ''}`}
              onClick={() => {
                setFilter(f);
                setExpanded(null);
              }}
            >
              {f === 'all' ? '✦ সব' : f === 'quran' ? '📖 কুরআন' : '☪️ হাদিস'}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="jh-grid">
          {filtered.map((item, i) => {
            const isExpanded = expanded === item.id;
            const isHighlighted = highlighted === i && !isExpanded;
            return (
              <div
                key={item.id}
                className={[
                  'jh-card',
                  visible.includes(i) ? 'visible' : '',
                  isExpanded ? 'expanded' : '',
                  isHighlighted ? 'highlighted' : '',
                ].join(' ')}
                style={{ animationDelay: `${i * 100}ms` }}
                onClick={() => setExpanded(isExpanded ? null : item.id)}
              >
                <div className="jh-card-head">
                  <div className="jh-icon">{item.icon}</div>
                  <div className="jh-head-meta">
                    <span className={`jh-type-badge ${item.type}`}>
                      {item.type === 'quran' ? '📖 কুরআন' : '☪️ হাদিস'}
                    </span>
                    <div className="jh-preview">
                      {isExpanded ? item.ref : item.bangla}
                    </div>
                  </div>
                  <span className="jh-arrow">▶</span>
                </div>

                <div className={`jh-body ${isExpanded ? 'open' : ''}`}>
                  <div className="jh-divider" />
                  {item.arabic !== '' && (
                    <div className="jh-arabic">{item.arabic}</div>
                  )}
                  <div className="jh-bangla">{item.bangla}</div>
                  <div className="jh-ref">— {item.ref}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer divider */}
        <div className="jh-section-div" style={{ marginTop: '2.5rem' }}>
          <div className="jh-sdl" />
          <div className="jh-sdm">اللَّهُمَّ أَجِرْنَا مِنَ النَّارِ</div>
          <div className="jh-sdl" />
        </div>
      </div>
    </>
  );
};

export default Jahannam;
