import { useState, useEffect, useMemo } from 'react';
import PageTitle from '../pageTitle/pageTitle';

const jannatData = [
  {
    id: 1,
    arabic:
      'فَلَا تَعْلَمُ نَفْسٌۭ مَّآ أُخْفِىَ لَهُم مِّن قُرَّةِ أَعْيُنٍۢ جَزَآءًۢ بِمَا كَانُوا۟ يَعْمَلُونَ',
    bangla:
      'কোনো প্রাণই জানে না, তাদের জন্য লুকিয়ে রাখা হয়েছে চোখ জুড়ানো কত সুখবর — যা তারা দুনিয়াতে করত তার প্রতিদানস্বরূপ।',
    ref: 'সূরা আস-সাজদাহ ৩২:১৭',
    type: 'quran',
    icon: '🌿',
  },
  {
    id: 2,
    arabic:
      'مَّثَلُ ٱلْجَنَّةِ ٱلَّتِى وُعِدَ ٱلْمُتَّقُونَ ۖ فِيهَآ أَنْهَـٰرٌۭ مِّن مَّآءٍ غَيْرِ ءَاسِنٍۢ وَأَنْهَـٰرٌۭ مِّن لَّبَنٍۢ لَّمْ يَتَغَيَّرْ طَعْمُهُۥ',
    bangla:
      'যে জান্নাত মুত্তাকীদের প্রতিশ্রুতি দেওয়া হয়েছে — তাতে থাকবে এমন নদী যার পানি কখনো দূষিত হবে না, দুধের নদী যার স্বাদ বদলাবে না, আনন্দদায়ক নদী, আর পরিশুদ্ধ মধুর নদী।',
    ref: 'সূরা মুহাম্মদ ৪৭:১৫',
    type: 'quran',
    icon: '🏞️',
  },
  {
    id: 3,
    arabic: '',
    bangla:
      'তারা জান্নাতে থাকবে উঁচু আসনে — রৌদ্রের উত্তাপ বা শীতলতা অনুভব করবে না। জান্নাতের ছায়া তাদের উপর ঝুঁকে থাকবে, ফল নাগালে থাকবে সহজেই।',
    ref: 'সূরা আল-ইনসান ৭৬:১৩-১৪',
    type: 'quran',
    icon: '☀️',
  },
  {
    id: 4,
    arabic: '',
    bangla:
      'আল্লাহ মুমিন পুরুষ ও নারীদেরকে এমন জান্নাতের প্রতিশ্রুতি দিয়েছেন — যার তলায় নদী প্রবাহিত, যেখানে তারা চিরকাল থাকবে। আর আল্লাহর সন্তুষ্টিই হবে সবচেয়ে বড় সফলতা।',
    ref: 'সূরা আত-তাওবা ৯:৭২',
    type: 'quran',
    icon: '💚',
  },
  {
    id: 5,
    arabic: '',
    bangla:
      'সেখানে থাকবে গালিচায় হেলান দিয়ে বসা মানুষ, সবুজ ঘন বাগান ও প্রবাহিত ঝর্ণা। সেখানে থাকবে লজ্জাশীলা হুর — যাদের দিকে আগে কেউ চোখ তুলে তাকায়নি।',
    ref: 'সূরা আর-রাহমান ৫৪-৫৬',
    type: 'quran',
    icon: '🌸',
  },
  {
    id: 6,
    arabic: '',
    bangla:
      'রাসুল ﷺ বলেছেন: আমি আমার নেক বান্দাদের জন্য এমন নিয়ামত প্রস্তুত করেছি — যা কোনো চোখ কখনো দেখেনি, কোনো কান কখনো শোনেনি, আর কোনো মানুষের হৃদয়ে কল্পনাও জাগেনি।',
    ref: 'সহিহ বুখারী: ৪৭৭৯, সহিহ মুসলিম: ২৮২৪',
    type: 'hadith',
    icon: '✨',
  },
  {
    id: 7,
    arabic: '',
    bangla:
      'রাসুল ﷺ বলেছেন: জান্নাতের একটি ধনুক পরিমাণ জায়গাও যদি দুনিয়ার সবকিছুর সঙ্গে তুলনা করা হয়, তবে সেটিই শ্রেষ্ঠ।',
    ref: 'সহিহ বুখারী ৬৫৮৮, মুসলিম ১৮৮০',
    type: 'hadith',
    icon: '🏹',
  },
  {
    id: 8,
    arabic: '',
    bangla:
      'রাসুল ﷺ বলেছেন: জান্নাতে এমন বাজার থাকবে যেখানে মানুষ প্রতি শুক্রবার যাবে। বাতাস বয়ে যাবে, চেহারা ও পোশাক আরও সুন্দর হবে। পরিবার বলবে — "তুমি আগের চেয়ে আরও সুন্দর হয়ে ফিরেছ!"',
    ref: 'সহিহ মুসলিম: ২৮৩৩',
    type: 'hadith',
    icon: '🛍️',
  },
  {
    id: 9,
    arabic: '',
    bangla:
      'রাসুল ﷺ বলেছেন: জান্নাতে প্রথম যে দল প্রবেশ করবে তাদের মুখমণ্ডল পূর্ণিমার চাঁদের মতো উজ্জ্বল হবে। তাদের থালাবাসন হবে সোনার, ঘাম হবে মিশকের মতো। চিরকাল যৌবন, সৌন্দর্য ও সুখে থাকবে।',
    ref: 'সহিহ বুখারী: ৩২৪৫, সহিহ মুসলিম: ২৮৩৪',
    type: 'hadith',
    icon: '🌕',
  },
];

const Jannat = () => {
  const [visible, setVisible] = useState<number[]>([]);
  const [filter, setFilter] = useState<'all' | 'quran' | 'hadith'>('all');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [highlighted, setHighlighted] = useState<number>(0);

  // ✅ useMemo — filtered আর re-create হবে না unnecessarily
  const filtered = useMemo(
    () => jannatData.filter((d) => filter === 'all' || d.type === filter),
    [filter],
  );

  // ✅ filtered এখন stable reference, dependency-তে দেওয়া safe
  useEffect(() => {
    setVisible([]);
    filtered.forEach((_, i) =>
      setTimeout(() => setVisible((p) => [...p, i]), i * 100),
    );
  }, [filtered]);

  // ✅ filtered.length dependency correct
  useEffect(() => {
    const id = setInterval(() => {
      setHighlighted((p) => (p + 1) % filtered.length);
    }, 5000);
    return () => clearInterval(id);
  }, [filtered.length]);

  return (
    <>
      <PageTitle title="Jannat" subtitle="Jannat" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;600;700&family=Amiri:wght@400;700&family=Cinzel:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .jn-root {
          min-height: 100vh;
          background: #080a06;
          background-image:
            radial-gradient(ellipse 80% 60% at 50% 0%,   rgba(34,197,94,0.1)  0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 5%  95%,  rgba(16,185,129,0.07) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 95% 60%,  rgba(5,150,105,0.05)  0%, transparent 50%);
          font-family: 'DM Sans', sans-serif;
          color: #d1fae5;
          padding: 2rem 1rem 4rem;
        }

        /* ── Header ── */
        .jn-header { text-align: center; margin-bottom: 2.5rem; }
        .jn-bismillah {
          font-family: 'Amiri', serif;
          font-size: clamp(1.6rem, 5vw, 2.4rem);
          color: #6ee7b7;
          margin-bottom: 0.75rem;
          letter-spacing: 0.05em;
          line-height: 1.4;
          direction: rtl;
        }
        .jn-eyebrow {
          font-size: 0.65rem; letter-spacing: 0.3em;
          text-transform: uppercase; color: #34d399;
          margin-bottom: 0.5rem;
        }
        .jn-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 900;
          letter-spacing: 0.04em; line-height: 1.05; margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff 0%, #6ee7b7 45%, #34d399 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .jn-subtitle {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.85rem; color: #065f46; letter-spacing: 0.04em;
        }

        /* ── Stats bar ── */
        .jn-stats {
          max-width: 680px; margin: 0 auto 2rem;
          display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
        }
        .jn-stat {
          background: rgba(6,78,59,0.4);
          border: 1px solid rgba(52,211,153,0.15);
          border-radius: 10px; padding: 0.6rem 1.2rem;
          text-align: center; flex: 1; min-width: 100px;
        }
        .jn-stat-val {
          font-family: 'Cinzel', serif; font-size: 1.4rem; font-weight: 900;
          background: linear-gradient(135deg, #6ee7b7, #34d399);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          line-height: 1;
        }
        .jn-stat-label {
          font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: #065f46; margin-top: 0.25rem;
        }

        /* ── Filter pills ── */
        .jn-filters {
          display: flex; gap: 0.5rem; justify-content: center;
          margin-bottom: 2rem; flex-wrap: wrap;
        }
        .jn-pill {
          font-size: 0.72rem; font-weight: 600; padding: 0.35rem 1rem;
          border-radius: 20px; border: 1.5px solid rgba(52,211,153,0.2);
          background: transparent; color: #065f46;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all .18s ease;
        }
        .jn-pill:hover { border-color: #34d399; color: #34d399; }
        .jn-pill.active {
          background: linear-gradient(135deg, #065f46, #047857);
          border-color: #34d399; color: #6ee7b7;
          box-shadow: 0 4px 14px rgba(52,211,153,0.25);
        }

        /* ── Cards ── */
        .jn-grid {
          display: flex; flex-direction: column; gap: 1rem;
          max-width: 680px; margin: 0 auto;
        }

        .jn-card {
          background: rgba(6,30,20,0.8);
          border: 1.5px solid rgba(52,211,153,0.1);
          border-radius: 16px; overflow: hidden; cursor: pointer;
          opacity: 0; transform: translateX(-16px);
          transition: border-color .25s, box-shadow .25s, transform .25s;
          backdrop-filter: blur(8px);
        }
        .jn-card.visible { animation: slideIn .4s ease forwards; }
        @keyframes slideIn { to { opacity: 1; transform: translateX(0); } }
        .jn-card:hover {
          border-color: rgba(52,211,153,0.35);
          transform: translateX(5px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.4);
        }
        .jn-card.highlighted {
          border-color: rgba(52,211,153,0.5);
          box-shadow: 0 0 0 2px rgba(52,211,153,0.1), 0 8px 32px rgba(0,0,0,0.5),
                      inset 0 0 40px rgba(52,211,153,0.03);
        }
        .jn-card.expanded {
          border-color: rgba(52,211,153,0.4);
          box-shadow: 0 0 0 2px rgba(52,211,153,0.08), 0 8px 32px rgba(0,0,0,0.5);
        }

        .jn-card-head {
          display: flex; align-items: center; gap: 1rem;
          padding: 1.1rem 1.3rem;
        }
        .jn-icon {
          font-size: 1.6rem; line-height: 1; flex-shrink: 0;
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(52,211,153,0.07);
          border: 1px solid rgba(52,211,153,0.12);
          display: flex; align-items: center; justify-content: center;
        }
        .jn-head-meta { flex: 1; min-width: 0; }
        .jn-type-badge {
          font-size: 0.55rem; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; padding: 0.15rem 0.5rem;
          border-radius: 20px; border: 1px solid; display: inline-block;
          margin-bottom: 0.3rem;
        }
        .jn-type-badge.quran {
          color: #34d399; border-color: rgba(52,211,153,0.3);
          background: rgba(52,211,153,0.07);
        }
        .jn-type-badge.hadith {
          color: #6ee7b7; border-color: rgba(110,231,183,0.3);
          background: rgba(110,231,183,0.06);
        }
        .jn-preview {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.85rem; color: #a7f3d0; line-height: 1.5;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .jn-arrow {
          font-size: 0.65rem; color: #065f46; flex-shrink: 0;
          transition: transform .25s, color .2s;
        }
        .jn-card.expanded .jn-arrow { transform: rotate(90deg); color: #34d399; }

        /* Expanded body */
        .jn-body {
          max-height: 0; overflow: hidden;
          transition: max-height .4s ease, padding .3s ease;
          padding: 0 1.3rem;
        }
        .jn-body.open { max-height: 600px; padding: 0 1.3rem 1.3rem; }
        .jn-divider { height: 1px; background: rgba(52,211,153,0.1); margin-bottom: 1rem; }

        .jn-arabic {
          font-family: 'Amiri', serif;
          font-size: clamp(1.1rem, 3vw, 1.5rem);
          color: #6ee7b7; text-align: right; direction: rtl;
          line-height: 2; margin-bottom: 1rem;
          padding: 0.75rem 1rem;
          background: rgba(52,211,153,0.04);
          border-radius: 10px;
          border-right: 3px solid rgba(52,211,153,0.3);
        }
        .jn-bangla {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.95rem; color: #a7f3d0; line-height: 1.85;
          margin-bottom: 1rem;
        }
        .jn-ref {
          font-size: 0.65rem; letter-spacing: 0.12em;
          font-family: 'DM Sans', sans-serif;
          color: #065f46; text-align: right;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(52,211,153,0.08);
        }

        /* Divider */
        .jn-section-div {
          max-width: 680px; margin: 1.5rem auto 0;
          display: flex; align-items: center; gap: 1rem;
        }
        .jn-sdl { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(52,211,153,0.25), transparent); }
        .jn-sdm { font-family: 'Cinzel', serif; font-size: 0.6rem; color: #34d399; letter-spacing: 0.2em; text-transform: uppercase; white-space: nowrap; }

        @media (max-width: 500px) {
          .jn-arabic { font-size: 1rem; }
          .jn-bangla { font-size: 0.88rem; }
        }
      `}</style>

      <div className="jn-root">
        <PageTitle title="Jannat" />

        {/* Header */}
        <div className="jn-header">
          <div className="jn-bismillah">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div className="jn-eyebrow">Descriptions of Paradise</div>
          <h1 className="jn-title">জান্নাতের বিবরণ</h1>
          <div className="jn-subtitle">
            কুরআন ও হাদিসের আলোকে জান্নাতের নিয়ামত
          </div>
        </div>

        {/* Stats */}
        <div className="jn-stats">
          <div className="jn-stat">
            <div className="jn-stat-val">{jannatData.length}</div>
            <div className="jn-stat-label">মোট বিবরণ</div>
          </div>
          <div className="jn-stat">
            <div className="jn-stat-val">
              {jannatData.filter((d) => d.type === 'quran').length}
            </div>
            <div className="jn-stat-label">কুরআনের আয়াত</div>
          </div>
          <div className="jn-stat">
            <div className="jn-stat-val">
              {jannatData.filter((d) => d.type === 'hadith').length}
            </div>
            <div className="jn-stat-label">হাদিস</div>
          </div>
        </div>

        {/* Filter */}
        <div className="jn-filters">
          {(['all', 'quran', 'hadith'] as const).map((f) => (
            <button
              key={f}
              className={`jn-pill ${filter === f ? 'active' : ''}`}
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
        <div className="jn-grid">
          {filtered.map((item, i) => {
            const isExpanded = expanded === item.id;
            const isHighlighted = highlighted === i && !isExpanded;
            return (
              <div
                key={item.id}
                className={[
                  'jn-card',
                  visible.includes(i) ? 'visible' : '',
                  isExpanded ? 'expanded' : '',
                  isHighlighted ? 'highlighted' : '',
                ].join(' ')}
                style={{ animationDelay: `${i * 100}ms` }}
                onClick={() => setExpanded(isExpanded ? null : item.id)}
              >
                <div className="jn-card-head">
                  <div className="jn-icon">{item.icon}</div>
                  <div className="jn-head-meta">
                    <span className={`jn-type-badge ${item.type}`}>
                      {item.type === 'quran' ? '📖 কুরআন' : '☪️ হাদিস'}
                    </span>
                    <div className="jn-preview">
                      {isExpanded ? item.ref : item.bangla}
                    </div>
                  </div>
                  <span className="jn-arrow">▶</span>
                </div>

                <div className={`jn-body ${isExpanded ? 'open' : ''}`}>
                  <div className="jn-divider" />
                  {item.arabic !== '' && (
                    <div className="jn-arabic">{item.arabic}</div>
                  )}
                  <div className="jn-bangla">{item.bangla}</div>
                  <div className="jn-ref">— {item.ref}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer divider */}
        <div className="jn-section-div" style={{ marginTop: '2.5rem' }}>
          <div className="jn-sdl" />
          <div className="jn-sdm">اللَّهُمَّ إِنَّا نَسْأَلُكَ الْجَنَّةَ</div>
          <div className="jn-sdl" />
        </div>
      </div>
    </>
  );
};

export default Jannat;
