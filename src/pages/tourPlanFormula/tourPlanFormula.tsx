import { useState, useEffect } from 'react';
import PageTitle from '../pageTitle/pageTitle';

const tourData = [
  { id: 1, rule: 'আপনি যেখানে যাবেন সেখানে যাওয়াটা কি খুবই জরুরি?' },
  { id: 2, rule: 'আপনি না গিয়ে বিকল্প আছে কি?' },
  {
    id: 3,
    rule: 'আপনি যেখানে যাবেন সেখানের রাস্তা ও জায়গা সম্পর্কে ধারণা আছে কি?',
  },
  { id: 4, rule: 'রোড ম্যাপ করেছেন তো?' },
];

const tipsData = [
  {
    id: 1,
    icon: '🗺️',
    title: 'গন্তব্য স্পষ্ট করুন',
    tips: 'যাতায়াতের আগে আপনার গন্তব্য সম্পর্কে স্পষ্ট ধারণা রাখুন। সেখানে পৌঁছানোর জন্য কোন পথটি সবচেয়ে ভালো ও সুবিধাজনক তা ঠিক করুন।',
  },
  {
    id: 2,
    icon: '💰',
    title: 'বাজেট তৈরি করুন',
    tips: 'যাতায়াতের জন্য একটি নির্দিষ্ট বাজেট তৈরি করুন। বাড়তি খরচের জন্য সামান্য রিজার্ভ রাখুন।',
  },
  {
    id: 3,
    icon: '🚌',
    title: 'গণপরিবহন ব্যবহার করুন',
    tips: 'গণপরিবহন ব্যবহার করুন। কাছাকাছি গন্তব্যের জন্য হেঁটেই যান — স্বাস্থ্য ও অর্থ দুটোই বাঁচবে।',
  },
  {
    id: 4,
    icon: '⚡',
    title: 'বিকল্প পথ রাখুন',
    tips: 'অতি দ্রুত কোনো গন্তব্যে পৌঁছানোর প্রয়োজন হলে আপনার পরিস্থিতি অনুযায়ী বিকল্প ব্যবস্থা গ্রহণ করুন।',
  },
  {
    id: 5,
    icon: '🚦',
    title: 'জ্যামে স্মার্ট সিদ্ধান্ত',
    tips: 'লোকাল বাসে ভাড়া যথাসম্ভব পরে দেওয়ার চেষ্টা করুন। দীর্ঘ জ্যামে কারণ বোঝার চেষ্টা করুন — সম্ভব হলে রাস্তা পেরিয়ে অন্য গাড়িতে যান।',
  },
];

const TourPlanFormula = () => {
  const [visibleQ, setVisibleQ] = useState<number[]>([]);
  const [visibleTip, setVisibleTip] = useState<number[]>([]);
  const [checkedQ, setCheckedQ] = useState<number[]>([]);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  useEffect(() => {
    tourData.forEach((_, i) =>
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

  const allChecked = checkedQ.length === tourData.length;

  return (
    <>
      <PageTitle title="Tour Plan Formula" subtitle="Tour Plan Formula" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;600;700&family=Cinzel:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .tpf-root {
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
        .tpf-header { text-align: center; margin-bottom: 2.5rem; }
        .tpf-eyebrow {
          font-size: 0.65rem; letter-spacing: 0.3em;
          text-transform: uppercase; color: #c9a84c;
          margin-bottom: 0.6rem; font-family: 'DM Sans', sans-serif;
        }
        .tpf-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.8rem, 5vw, 3rem); font-weight: 900;
          letter-spacing: 0.04em; line-height: 1.1; margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff 0%, #e8c96d 45%, #c9a84c 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .tpf-subtitle { font-size: 0.8rem; color: #ee470a; letter-spacing: 0.1em; }

        /* ── Journey progress meter ── */
        .tpf-meter-wrap {
          max-width: 620px; margin: 0 auto 2.5rem;
          background: rgba(15,12,3,0.7);
          border: 1px solid rgba(184,150,65,0.12);
          border-radius: 12px; padding: 1rem 1.4rem;
          display: flex; align-items: center; gap: 1.2rem;
        }
        .tpf-meter-icon { font-size: 1.3rem; flex-shrink: 0; }
        .tpf-meter-label {
          font-size: 0.62rem; letter-spacing: 0.15em;
          text-transform: uppercase; color: #4a3f22;
          white-space: nowrap; font-family: 'DM Sans', sans-serif;
          flex-shrink: 0;
        }
        .tpf-meter-track {
          flex: 1; height: 5px; background: rgba(184,150,65,0.1);
          border-radius: 3px; overflow: hidden;
        }
        .tpf-meter-fill {
          height: 100%; border-radius: 3px;
          background: linear-gradient(90deg, #c9a84c, #e8c96d);
          transition: width 0.5s ease;
          box-shadow: 0 0 8px rgba(201,168,76,0.5);
        }
        .tpf-meter-pct {
          font-family: 'Cinzel', serif; font-size: 0.85rem;
          color: #c9a84c; min-width: 36px; text-align: right;
        }

        /* ── Section label ── */
        .tpf-section-label {
          font-size: 0.62rem; letter-spacing: 0.25em;
          text-transform: uppercase; color: #4a3f22;
          margin-bottom: 1rem; font-family: 'DM Sans', sans-serif;
          max-width: 620px; margin-left: auto; margin-right: auto;
          padding-left: 0.25rem;
        }

        /* ── 4Q Cards — slide from LEFT like ReduceSpeaking ── */
        .tpf-4q-grid {
          display: flex; flex-direction: column; gap: 0.9rem;
          max-width: 620px; margin: 0 auto 2.5rem;
        }

        .tpf-q-card {
          background: rgba(15,12,3,0.85);
          border: 1.5px solid rgba(184,150,65,0.13);
          border-radius: 14px; padding: 1.1rem 1.4rem;
          display: flex; align-items: center; gap: 1.1rem;
          cursor: pointer;
          opacity: 0; transform: translateX(-14px);
          transition: border-color .2s, box-shadow .2s, transform .2s, background .2s;
          user-select: none;
        }
        .tpf-q-card.visible { animation: slideR 0.4s ease forwards; }
        @keyframes slideR { to { opacity: 1; transform: translateX(0); } }
        .tpf-q-card:hover {
          border-color: rgba(184,150,65,0.38);
          transform: translateX(4px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }
        .tpf-q-card.checked {
          border-color: rgba(184,150,65,0.45);
          background: rgba(184,150,65,0.05);
          box-shadow: 0 0 0 2px rgba(184,150,65,0.1), 0 4px 20px rgba(0,0,0,0.4);
        }

        .tpf-q-num {
          font-family: 'Cinzel', serif; font-size: 1.6rem; font-weight: 900;
          line-height: 1; min-width: 34px;
          background: linear-gradient(135deg, #e8c96d, #c9a84c);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .tpf-q-body { flex: 1; }
        .tpf-q-sub {
          font-size: 0.57rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #4a3f22; margin-bottom: 0.3rem; font-family: 'DM Sans', sans-serif;
        }
        .tpf-q-text {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.9rem; color: #e8d48a; line-height: 1.6;
          transition: color .2s;
        }
        .tpf-q-card.checked .tpf-q-text {
          color: #6a5820;
          text-decoration: line-through;
          text-decoration-color: rgba(201,168,76,0.35);
        }
        .tpf-q-check {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          border: 1.5px solid rgba(184,150,65,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.72rem; transition: all .2s;
        }
        .tpf-q-card.checked .tpf-q-check {
          background: linear-gradient(135deg, #e8c96d, #c9a84c);
          border-color: #c9a84c; color: #0a0a0a; font-weight: 700;
        }

        .tpf-all-good {
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
        .tpf-divider {
          max-width: 620px; margin: 2rem auto;
          display: flex; align-items: center; gap: 1rem;
        }
        .tpf-divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(184,150,65,0.3), transparent);
        }
        .tpf-divider-gem {
          font-size: 0.65rem; color: #c9a84c;
          letter-spacing: 0.2em; text-transform: uppercase;
          font-family: 'Cinzel', serif;
        }

        /* ── Tips — slide from RIGHT like ReduceSpeaking ── */
        .tpf-tips-list {
          display: flex; flex-direction: column; gap: 0.75rem;
          max-width: 620px; margin: 0 auto;
        }

        .tpf-tip-card {
          background: rgba(15,12,3,0.85);
          border: 1.5px solid rgba(184,150,65,0.1);
          border-radius: 14px; overflow: hidden; cursor: pointer;
          opacity: 0; transform: translateX(14px);
          transition: border-color .2s, box-shadow .2s, transform .2s;
        }
        .tpf-tip-card.visible { animation: slideL 0.4s ease forwards; }
        @keyframes slideL { to { opacity: 1; transform: translateX(0); } }
        .tpf-tip-card:hover {
          border-color: rgba(184,150,65,0.32);
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          transform: translateX(-3px);
        }
        .tpf-tip-card.expanded {
          border-color: rgba(184,150,65,0.4);
          box-shadow: 0 0 0 2px rgba(184,150,65,0.08), 0 6px 24px rgba(0,0,0,0.5);
        }

        .tpf-tip-head {
          display: flex; align-items: center;
          gap: 0.85rem; padding: 0.9rem 1.25rem;
        }
        .tpf-tip-icon { font-size: 1.25rem; line-height: 1; flex-shrink: 0; }
        .tpf-tip-meta { flex: 1; }
        .tpf-tip-num {
          font-size: 0.57rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #4a3f22; font-family: 'DM Sans', sans-serif; margin-bottom: 0.15rem;
        }
        .tpf-tip-title {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.88rem; font-weight: 700; color: #e8d48a;
        }
        .tpf-tip-arrow {
          font-size: 0.65rem; color: #4a3f22;
          transition: transform .25s, color .2s;
        }
        .tpf-tip-card.expanded .tpf-tip-arrow { transform: rotate(90deg); color: #c9a84c; }

        .tpf-tip-body {
          max-height: 0; overflow: hidden;
          transition: max-height .35s ease, padding .25s ease;
          padding: 0 1.25rem;
        }
        .tpf-tip-body.open { max-height: 220px; padding: 0 1.25rem 1rem; }
        .tpf-tip-divider { height: 1px; background: rgba(184,150,65,0.1); margin-bottom: 0.8rem; }
        .tpf-tip-text {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.83rem; color: #c9b87a; line-height: 1.75;
        }

        @media (max-width: 560px) {
          .tpf-4q-grid, .tpf-tips-list { max-width: 100%; }
        }
      `}</style>

      <div className="tpf-root">
        <PageTitle title="Tour Plan Formula" />

        {/* Header */}
        <div className="tpf-header">
          <div className="tpf-eyebrow">Smart Journey Planning</div>
          <h1 className="tpf-title">
            Tour Plan
            <br />
            Formula: 4Q
          </h1>
          <div className="tpf-subtitle">
            বের হওয়ার আগে নিজেকে ৪টি প্রশ্ন করুন
          </div>
        </div>

        {/* Journey readiness meter */}
        <div className="tpf-meter-wrap">
          <span className="tpf-meter-icon">🧭</span>
          <div className="tpf-meter-label">Journey Ready</div>
          <div className="tpf-meter-track">
            <div
              className="tpf-meter-fill"
              style={{
                width: `${Math.round((checkedQ.length / tourData.length) * 100)}%`,
              }}
            />
          </div>
          <div className="tpf-meter-pct">
            {Math.round((checkedQ.length / tourData.length) * 100)}%
          </div>
        </div>

        {/* 4Q Cards */}
        <div className="tpf-section-label">// ৪টি প্রশ্ন — Before You Go</div>
        <div className="tpf-4q-grid">
          {tourData.map((item, i) => {
            const isChecked = checkedQ.includes(item.id);
            return (
              <div
                key={item.id}
                className={`tpf-q-card ${visibleQ.includes(i) ? 'visible' : ''} ${isChecked ? 'checked' : ''}`}
                style={{ animationDelay: `${i * 130}ms` }}
                onClick={() => toggleQ(item.id)}
              >
                <div className="tpf-q-num">Q{item.id}</div>
                <div className="tpf-q-body">
                  <div className="tpf-q-sub">Question {item.id} of 4</div>
                  <div className="tpf-q-text">{item.rule}</div>
                </div>
                <div className="tpf-q-check">{isChecked ? '✓' : ''}</div>
              </div>
            );
          })}
        </div>

        {allChecked && (
          <div className="tpf-all-good">
            ✦ সব প্রস্তুতি সম্পন্ন — নিরাপদে যাত্রা করুন!
          </div>
        )}

        {/* Divider */}
        <div className="tpf-divider">
          <div className="tpf-divider-line" />
          <div className="tpf-divider-gem">Smart Tips</div>
          <div className="tpf-divider-line" />
        </div>

        {/* Tips */}
        <div className="tpf-section-label">// স্মার্ট যাতায়াত কৌশল</div>
        <div className="tpf-tips-list">
          {tipsData.map((tip, i) => {
            const isExpanded = expandedTip === tip.id;
            return (
              <div
                key={tip.id}
                className={`tpf-tip-card ${visibleTip.includes(i) ? 'visible' : ''} ${isExpanded ? 'expanded' : ''}`}
                style={{ animationDelay: `${500 + i * 90}ms` }}
                onClick={() => setExpandedTip(isExpanded ? null : tip.id)}
              >
                <div className="tpf-tip-head">
                  <span className="tpf-tip-icon">{tip.icon}</span>
                  <div className="tpf-tip-meta">
                    <div className="tpf-tip-num">Tips No: {tip.id}</div>
                    <div className="tpf-tip-title">{tip.title}</div>
                  </div>
                  <span className="tpf-tip-arrow">▶</span>
                </div>
                <div className={`tpf-tip-body ${isExpanded ? 'open' : ''}`}>
                  <div className="tpf-tip-divider" />
                  <div className="tpf-tip-text">{tip.tips}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TourPlanFormula;
