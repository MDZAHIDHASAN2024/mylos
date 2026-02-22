import { useState, useEffect } from 'react';
import PageTitle from '../pageTitle/pageTitle';

const speakData = [
  { id: 1, rule: 'আপনি যা বলতে চাচ্ছেন, তা কি সত্যিই দরকারী?' },
  {
    id: 2,
    rule: 'এই কথা বললে কি অন্যদের উপকার হবে? বা আপনার প্রয়োজন মেটাবে?',
  },
  { id: 3, rule: 'ধীরগতিতে, প্রয়োজনবোধে, চিন্তা করে কথা বলুন!' },
];

const tipsData = [
  {
    id: 1,
    icon: '✂️',
    title: 'সংক্ষেপে বলুন',
    tips: 'সংক্ষেপে কথা বলার অভ্যাস গড়ে তুলুন। অল্প কথায় স্পষ্টভাবে বেশি কিছু বোঝানোর চেষ্টা করুন।',
  },
  {
    id: 2,
    icon: '🤫',
    title: 'নীরব থাকুন',
    tips: 'সব জায়গায় কথা বলা জরুরি নয়। তাই নীরব থাকার অনুশীলন করুন।',
  },
  {
    id: 3,
    icon: '👂',
    title: 'মনোযোগে শুনুন',
    tips: 'কেউ যখন কথা বলে তখন তাকে বাধা না দেওয়ার অনুশীলন করুন। শোনার দক্ষতা বাড়ান।',
  },
  {
    id: 4,
    icon: '📓',
    title: 'নিজেকে বিশ্লেষণ করুন',
    tips: 'দিনের শেষে ভাবুন — কোথায় কোথায় অপ্রয়োজনীয় কথা বলেছেন। সেগুলো নোট করুন।',
  },
  {
    id: 5,
    icon: '🎯',
    title: 'পরিকল্পনা করুন',
    tips: 'কীভাবে কম কথা বলা যায় তা নিয়ে পরিকল্পনা করুন এবং সেই অনুযায়ী কাজ করুন।',
  },
  {
    id: 6,
    icon: '🌱',
    title: 'ধৈর্য ধরুন',
    tips: 'কম কথা বলার অভ্যাস রাতারাতি তৈরি হবে না। ধৈর্য ধরে ধীরে ধীরে নিজের পরিবর্তন লক্ষ্য করুন।',
  },
];

const ReduceSpeakingFormula = () => {
  const [visibleQ, setVisibleQ] = useState<number[]>([]);
  const [visibleTip, setVisibleTip] = useState<number[]>([]);
  const [checkedQ, setCheckedQ] = useState<number[]>([]);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  useEffect(() => {
    speakData.forEach((_, i) =>
      setTimeout(() => setVisibleQ((p) => [...p, i]), i * 130),
    );
    tipsData.forEach((_, i) =>
      setTimeout(() => setVisibleTip((p) => [...p, i]), 500 + i * 90),
    );
  }, []);

  const toggleQ = (id: number) =>
    setCheckedQ((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  const allChecked = checkedQ.length === speakData.length;

  return (
    <>
      <PageTitle
        title="Reduce Speaking Formula"
        subtitle="Reduce Speaking Formula"
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;600;700&family=Cinzel:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .rsf-root {
          min-height: 100vh;
          background: #0a0a0a;
          background-image:
            radial-gradient(ellipse 70% 50% at 50% 0%,  rgba(184,150,65,0.13) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 5%  95%, rgba(184,150,65,0.07) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 95% 50%, rgba(120,90,20,0.06)  0%, transparent 50%);
          font-family: 'DM Sans', sans-serif;
          color: #f0e6c8;
          padding: 2rem 1rem 4rem;
        }

        /* ── Header ── */
        .rsf-header { text-align: center; margin-bottom: 3rem; }
        .rsf-eyebrow {
          font-size: 0.65rem; letter-spacing: 0.3em;
          text-transform: uppercase; color: #c9a84c;
          margin-bottom: 0.6rem; font-family: 'DM Sans', sans-serif;
        }
        .rsf-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.8rem, 5vw, 3rem); font-weight: 900;
          letter-spacing: 0.04em; line-height: 1.1; margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff 0%, #e8c96d 45%, #c9a84c 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .rsf-subtitle { font-size: 0.8rem; color: #ee470a; letter-spacing: 0.1em; }

        /* Silence meter */
        .rsf-meter-wrap {
          max-width: 620px; margin: 0 auto 2.5rem;
          background: rgba(15,12,3,0.7);
          border: 1px solid rgba(184,150,65,0.12);
          border-radius: 12px; padding: 1rem 1.4rem;
          display: flex; align-items: center; gap: 1.2rem;
        }
        .rsf-meter-label {
          font-size: 0.62rem; letter-spacing: 0.15em;
          text-transform: uppercase; color: #4a3f22;
          white-space: nowrap; font-family: 'DM Sans', sans-serif;
        }
        .rsf-meter-track {
          flex: 1; height: 5px; background: rgba(184,150,65,0.1);
          border-radius: 3px; overflow: hidden;
        }
        .rsf-meter-fill {
          height: 100%; border-radius: 3px;
          background: linear-gradient(90deg, #c9a84c, #e8c96d);
          transition: width 0.5s ease;
          box-shadow: 0 0 8px rgba(201,168,76,0.5);
        }
        .rsf-meter-pct {
          font-family: 'Cinzel', serif; font-size: 0.85rem;
          color: #c9a84c; min-width: 36px; text-align: right;
        }

        /* ── Section label ── */
        .rsf-section-label {
          font-size: 0.62rem; letter-spacing: 0.25em;
          text-transform: uppercase; color: #4a3f22;
          margin-bottom: 1rem; font-family: 'DM Sans', sans-serif;
          max-width: 620px; margin-left: auto; margin-right: auto;
          padding-left: 0.25rem;
        }

        /* ── 3Q Cards ── */
        .rsf-3q-grid {
          display: flex; flex-direction: column; gap: 0.9rem;
          max-width: 620px; margin: 0 auto 2.5rem;
        }

        .rsf-q-card {
          background: rgba(15,12,3,0.85);
          border: 1.5px solid rgba(184,150,65,0.13);
          border-radius: 14px; padding: 1.1rem 1.4rem;
          display: flex; align-items: center; gap: 1.1rem;
          cursor: pointer;
          opacity: 0; transform: translateX(-14px);
          transition: border-color .2s, box-shadow .2s, transform .2s, background .2s;
          user-select: none;
        }
        .rsf-q-card.visible { animation: slideR 0.4s ease forwards; }
        @keyframes slideR { to { opacity: 1; transform: translateX(0); } }
        .rsf-q-card:hover {
          border-color: rgba(184,150,65,0.38);
          transform: translateX(4px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }
        .rsf-q-card.checked {
          border-color: rgba(184,150,65,0.45);
          background: rgba(184,150,65,0.05);
          box-shadow: 0 0 0 2px rgba(184,150,65,0.1), 0 4px 20px rgba(0,0,0,0.4);
        }

        .rsf-q-num {
          font-family: 'Cinzel', serif; font-size: 1.6rem; font-weight: 900;
          line-height: 1; min-width: 34px;
          background: linear-gradient(135deg, #e8c96d, #c9a84c);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .rsf-q-body { flex: 1; }
        .rsf-q-sub {
          font-size: 0.57rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #4a3f22; margin-bottom: 0.3rem; font-family: 'DM Sans', sans-serif;
        }
        .rsf-q-text {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.9rem; color: #e8d48a; line-height: 1.6;
          transition: color .2s;
        }
        .rsf-q-card.checked .rsf-q-text {
          color: #6a5820;
          text-decoration: line-through;
          text-decoration-color: rgba(201,168,76,0.35);
        }
        .rsf-q-check {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          border: 1.5px solid rgba(184,150,65,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.72rem; transition: all .2s;
        }
        .rsf-q-card.checked .rsf-q-check {
          background: linear-gradient(135deg, #e8c96d, #c9a84c);
          border-color: #c9a84c; color: #0a0a0a; font-weight: 700;
        }

        /* all-checked */
        .rsf-all-good {
          max-width: 620px; margin: -0.5rem auto 1.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(184,150,65,0.07);
          border: 1px solid rgba(184,150,65,0.22);
          border-radius: 10px; text-align: center;
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.82rem; color: #c9a84c;
          animation: fadeUp .3s ease;
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:none } }

        /* ── Divider ── */
        .rsf-divider {
          max-width: 620px; margin: 2rem auto;
          display: flex; align-items: center; gap: 1rem;
        }
        .rsf-divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(184,150,65,0.3), transparent);
        }
        .rsf-divider-gem {
          font-size: 0.65rem; color: #c9a84c;
          letter-spacing: 0.2em; text-transform: uppercase;
          font-family: 'Cinzel', serif;
        }

        /* ── Tips ── */
        .rsf-tips-list {
          display: flex; flex-direction: column; gap: 0.75rem;
          max-width: 620px; margin: 0 auto;
        }

        .rsf-tip-card {
          background: rgba(15,12,3,0.85);
          border: 1.5px solid rgba(184,150,65,0.1);
          border-radius: 14px; overflow: hidden; cursor: pointer;
          opacity: 0; transform: translateX(14px);
          transition: border-color .2s, box-shadow .2s, transform .2s;
        }
        .rsf-tip-card.visible { animation: slideL 0.4s ease forwards; }
        @keyframes slideL { to { opacity: 1; transform: translateX(0); } }
        .rsf-tip-card:hover {
          border-color: rgba(184,150,65,0.32);
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          transform: translateX(-3px);
        }
        .rsf-tip-card.expanded {
          border-color: rgba(184,150,65,0.4);
          box-shadow: 0 0 0 2px rgba(184,150,65,0.08), 0 6px 24px rgba(0,0,0,0.5);
        }

        .rsf-tip-head {
          display: flex; align-items: center;
          gap: 0.85rem; padding: 0.9rem 1.25rem;
        }
        .rsf-tip-icon { font-size: 1.25rem; line-height: 1; flex-shrink: 0; }
        .rsf-tip-meta { flex: 1; }
        .rsf-tip-num {
          font-size: 0.57rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #4a3f22; font-family: 'DM Sans', sans-serif; margin-bottom: 0.15rem;
        }
        .rsf-tip-title {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.88rem; font-weight: 700; color: #e8d48a;
        }
        .rsf-tip-arrow {
          font-size: 0.65rem; color: #4a3f22;
          transition: transform .25s, color .2s;
        }
        .rsf-tip-card.expanded .rsf-tip-arrow { transform: rotate(90deg); color: #c9a84c; }

        .rsf-tip-body {
          max-height: 0; overflow: hidden;
          transition: max-height .35s ease, padding .25s ease;
          padding: 0 1.25rem;
        }
        .rsf-tip-body.open { max-height: 200px; padding: 0 1.25rem 1rem; }
        .rsf-tip-divider { height: 1px; background: rgba(184,150,65,0.1); margin-bottom: 0.8rem; }
        .rsf-tip-text {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.83rem; color: #c9b87a; line-height: 1.75;
        }

        @media (max-width: 560px) {
          .rsf-3q-grid, .rsf-tips-list { max-width: 100%; }
        }
      `}</style>

      <div className="rsf-root">
        <PageTitle title="Reduce Speaking Formula" />

        {/* Header */}
        <div className="rsf-header">
          <div className="rsf-eyebrow">Wisdom of Silence</div>
          <h1 className="rsf-title">
            Reduce Speaking
            <br />
            Formula: 3Q
          </h1>
          <div className="rsf-subtitle">
            কথা বলার আগে নিজেকে ৩টি প্রশ্ন করুন
          </div>
        </div>

        {/* Silence meter */}
        <div className="rsf-meter-wrap">
          <div className="rsf-meter-label">Silence Progress</div>
          <div className="rsf-meter-track">
            <div
              className="rsf-meter-fill"
              style={{
                width: `${Math.round((checkedQ.length / speakData.length) * 100)}%`,
              }}
            />
          </div>
          <div className="rsf-meter-pct">
            {Math.round((checkedQ.length / speakData.length) * 100)}%
          </div>
        </div>

        {/* 3Q Cards */}
        <div className="rsf-section-label">
          // ৩টি প্রশ্ন — Before You Speak
        </div>
        <div className="rsf-3q-grid">
          {speakData.map((item, i) => {
            const isChecked = checkedQ.includes(item.id);
            return (
              <div
                key={item.id}
                className={`rsf-q-card ${visibleQ.includes(i) ? 'visible' : ''} ${isChecked ? 'checked' : ''}`}
                style={{ animationDelay: `${i * 130}ms` }}
                onClick={() => toggleQ(item.id)}
              >
                <div className="rsf-q-num">Q{item.id}</div>
                <div className="rsf-q-body">
                  <div className="rsf-q-sub">Question {item.id} of 3</div>
                  <div className="rsf-q-text">{item.rule}</div>
                </div>
                <div className="rsf-q-check">{isChecked ? '✓' : ''}</div>
              </div>
            );
          })}
        </div>

        {allChecked && (
          <div className="rsf-all-good">
            ✦ চমৎকার! এখন কথা বলুন — আপনার কথা মূল্যবান হবে।
          </div>
        )}

        {/* Divider */}
        <div className="rsf-divider">
          <div className="rsf-divider-line" />
          <div className="rsf-divider-gem">Smart Tips</div>
          <div className="rsf-divider-line" />
        </div>

        {/* Tips */}
        <div className="rsf-section-label">
          // কম কথা বলার অভ্যাস গড়ার কৌশল
        </div>
        <div className="rsf-tips-list">
          {tipsData.map((tip, i) => {
            const isExpanded = expandedTip === tip.id;
            return (
              <div
                key={tip.id}
                className={`rsf-tip-card ${visibleTip.includes(i) ? 'visible' : ''} ${isExpanded ? 'expanded' : ''}`}
                style={{ animationDelay: `${500 + i * 90}ms` }}
                onClick={() => setExpandedTip(isExpanded ? null : tip.id)}
              >
                <div className="rsf-tip-head">
                  <span className="rsf-tip-icon">{tip.icon}</span>
                  <div className="rsf-tip-meta">
                    <div className="rsf-tip-num">Tips No: {tip.id}</div>
                    <div className="rsf-tip-title">{tip.title}</div>
                  </div>
                  <span className="rsf-tip-arrow">▶</span>
                </div>
                <div className={`rsf-tip-body ${isExpanded ? 'open' : ''}`}>
                  <div className="rsf-tip-divider" />
                  <div className="rsf-tip-text">{tip.tips}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ReduceSpeakingFormula;
