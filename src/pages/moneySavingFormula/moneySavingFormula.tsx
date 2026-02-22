import { useState, useEffect } from 'react';
import PageTitle from '../pageTitle/pageTitle';

const moneyData = [
  { id: 1, rule: 'যে জিনিসটি কিনবেন সে পরিমাণ টাকা আপনার কাছে আছে কি?' },
  { id: 2, rule: 'জিনিসটি সত্যিই প্রয়োজন কি?' },
  { id: 3, rule: 'জিনিসটির বিকল্প আছে কি?' },
  { id: 4, rule: 'প্রয়োজন অনুসারে জিনিসটি কিনুন!' },
];

const tipsData = [
  {
    id: 1,
    icon: '🗺️',
    title: 'বাজার পরিদর্শন',
    tips: 'বাজারের বিভিন্ন স্থান পরিদর্শন করুন। কোথায় কোন ধরনের পণ্য পাওয়া যায় তা ভালোভাবে জেনে নিন।',
  },
  {
    id: 2,
    icon: '🕐',
    title: 'সময়সূচী জানুন',
    tips: 'স্থানীয় বাজারের সময়সূচী জানুন। কোন সময় ভালো পণ্য পাওয়া যায়, ভিড় কম থাকে তা জানুন। বিক্রির শেষ সময়ে কিনুন।',
  },
  {
    id: 3,
    icon: '📊',
    title: 'দাম যাচাই করুন',
    tips: 'বিভিন্ন দোকানে ঘুরে একই পণ্যের গড় দাম জেনে নিন। পণ্যের উৎস ও মান জিজ্ঞাসা করুন। অনলাইনেও যাচাই করুন।',
  },
  {
    id: 4,
    icon: '🤝',
    title: 'দামদর করুন',
    tips: 'দামদর করার সময় ধৈর্য ধরুন। প্রথম প্রস্তাবে রাজি হবেন না। শান্তভাবে আলোচনা করুন।',
  },
  {
    id: 5,
    icon: '🔍',
    title: 'পণ্য যাচাই করুন',
    tips: 'পণ্য যাচাই করতে সময় নিন। গুণগত মান পরীক্ষা করুন। তাড়াহুড়ো করবেন না।',
  },
  {
    id: 6,
    icon: '📝',
    title: 'লিস্ট তৈরি করুন',
    tips: 'বাজার করার আগে প্রয়োজনীয় জিনিসের লিস্ট তৈরি করুন। লিস্টের বাইরে কিছু কিনবেন না।',
  },
];

const MoneySavingFormula = () => {
  const [visibleQ, setVisibleQ] = useState<number[]>([]);
  const [visibleTip, setVisibleTip] = useState<number[]>([]);
  const [checkedQ, setCheckedQ] = useState<number[]>([]);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  useEffect(() => {
    moneyData.forEach((_, i) =>
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

  const allChecked = checkedQ.length === moneyData.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;600;700&family=Cinzel:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .msf-root {
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
        .msf-header { text-align: center; margin-bottom: 2.5rem; }
        .msf-eyebrow {
          font-size: 0.65rem; letter-spacing: 0.3em;
          text-transform: uppercase; color: #c9a84c;
          margin-bottom: 0.6rem; font-family: 'DM Sans', sans-serif;
        }
        .msf-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.8rem, 5vw, 3rem); font-weight: 900;
          letter-spacing: 0.04em; line-height: 1.1; margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff 0%, #e8c96d 45%, #c9a84c 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .msf-subtitle { font-size: 0.8rem; color: #ee470a; letter-spacing: 0.1em; }

        /* ── Budget readiness meter ── */
        .msf-meter-wrap {
          max-width: 620px; margin: 0 auto 2.5rem;
          background: rgba(15,12,3,0.7);
          border: 1px solid rgba(184,150,65,0.12);
          border-radius: 12px; padding: 1rem 1.4rem;
          display: flex; align-items: center; gap: 1.2rem;
        }
        .msf-meter-icon { font-size: 1.3rem; flex-shrink: 0; }
        .msf-meter-label {
          font-size: 0.62rem; letter-spacing: 0.15em;
          text-transform: uppercase; color: #4a3f22;
          white-space: nowrap; font-family: 'DM Sans', sans-serif;
          flex-shrink: 0;
        }
        .msf-meter-track {
          flex: 1; height: 5px; background: rgba(184,150,65,0.1);
          border-radius: 3px; overflow: hidden;
        }
        .msf-meter-fill {
          height: 100%; border-radius: 3px;
          background: linear-gradient(90deg, #c9a84c, #e8c96d);
          transition: width 0.5s ease;
          box-shadow: 0 0 8px rgba(201,168,76,0.5);
        }
        .msf-meter-pct {
          font-family: 'Cinzel', serif; font-size: 0.85rem;
          color: #c9a84c; min-width: 36px; text-align: right;
        }

        /* ── Section label ── */
        .msf-section-label {
          font-size: 0.62rem; letter-spacing: 0.25em;
          text-transform: uppercase; color: #4a3f22;
          margin-bottom: 1rem; font-family: 'DM Sans', sans-serif;
          max-width: 620px; margin-left: auto; margin-right: auto;
          padding-left: 0.25rem;
        }

        /* ── 4Q Cards — slide from LEFT ── */
        .msf-4q-grid {
          display: flex; flex-direction: column; gap: 0.9rem;
          max-width: 620px; margin: 0 auto 2.5rem;
        }

        .msf-q-card {
          background: rgba(15,12,3,0.85);
          border: 1.5px solid rgba(184,150,65,0.13);
          border-radius: 14px; padding: 1.1rem 1.4rem;
          display: flex; align-items: center; gap: 1.1rem;
          cursor: pointer;
          opacity: 0; transform: translateX(-14px);
          transition: border-color .2s, box-shadow .2s, transform .2s, background .2s;
          user-select: none;
        }
        .msf-q-card.visible { animation: slideR 0.4s ease forwards; }
        @keyframes slideR { to { opacity: 1; transform: translateX(0); } }
        .msf-q-card:hover {
          border-color: rgba(184,150,65,0.38);
          transform: translateX(4px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }
        .msf-q-card.checked {
          border-color: rgba(184,150,65,0.45);
          background: rgba(184,150,65,0.05);
          box-shadow: 0 0 0 2px rgba(184,150,65,0.1), 0 4px 20px rgba(0,0,0,0.4);
        }

        .msf-q-num {
          font-family: 'Cinzel', serif; font-size: 1.6rem; font-weight: 900;
          line-height: 1; min-width: 34px;
          background: linear-gradient(135deg, #e8c96d, #c9a84c);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .msf-q-body { flex: 1; }
        .msf-q-sub {
          font-size: 0.57rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #4a3f22; margin-bottom: 0.3rem; font-family: 'DM Sans', sans-serif;
        }
        .msf-q-text {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.9rem; color: #e8d48a; line-height: 1.6; transition: color .2s;
        }
        .msf-q-card.checked .msf-q-text {
          color: #6a5820;
          text-decoration: line-through;
          text-decoration-color: rgba(201,168,76,0.35);
        }
        .msf-q-check {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          border: 1.5px solid rgba(184,150,65,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.72rem; transition: all .2s;
        }
        .msf-q-card.checked .msf-q-check {
          background: linear-gradient(135deg, #e8c96d, #c9a84c);
          border-color: #c9a84c; color: #0a0a0a; font-weight: 700;
        }

        /* all-checked banner */
        .msf-all-good {
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
        .msf-divider {
          max-width: 620px; margin: 2rem auto;
          display: flex; align-items: center; gap: 1rem;
        }
        .msf-divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(184,150,65,0.3), transparent);
        }
        .msf-divider-gem {
          font-size: 0.65rem; color: #c9a84c;
          letter-spacing: 0.2em; text-transform: uppercase;
          font-family: 'Cinzel', serif;
        }

        /* ── Tips — slide from RIGHT ── */
        .msf-tips-list {
          display: flex; flex-direction: column; gap: 0.75rem;
          max-width: 620px; margin: 0 auto;
        }

        .msf-tip-card {
          background: rgba(15,12,3,0.85);
          border: 1.5px solid rgba(184,150,65,0.1);
          border-radius: 14px; overflow: hidden; cursor: pointer;
          opacity: 0; transform: translateX(14px);
          transition: border-color .2s, box-shadow .2s, transform .2s;
        }
        .msf-tip-card.visible { animation: slideL 0.4s ease forwards; }
        @keyframes slideL { to { opacity: 1; transform: translateX(0); } }
        .msf-tip-card:hover {
          border-color: rgba(184,150,65,0.32);
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          transform: translateX(-3px);
        }
        .msf-tip-card.expanded {
          border-color: rgba(184,150,65,0.4);
          box-shadow: 0 0 0 2px rgba(184,150,65,0.08), 0 6px 24px rgba(0,0,0,0.5);
        }

        .msf-tip-head {
          display: flex; align-items: center;
          gap: 0.85rem; padding: 0.9rem 1.25rem;
        }
        .msf-tip-icon { font-size: 1.25rem; line-height: 1; flex-shrink: 0; }
        .msf-tip-meta { flex: 1; }
        .msf-tip-num {
          font-size: 0.57rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #4a3f22; font-family: 'DM Sans', sans-serif; margin-bottom: 0.15rem;
        }
        .msf-tip-title {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.88rem; font-weight: 700; color: #e8d48a;
        }
        .msf-tip-arrow {
          font-size: 0.65rem; color: #4a3f22;
          transition: transform .25s, color .2s;
        }
        .msf-tip-card.expanded .msf-tip-arrow { transform: rotate(90deg); color: #c9a84c; }

        .msf-tip-body {
          max-height: 0; overflow: hidden;
          transition: max-height .35s ease, padding .25s ease;
          padding: 0 1.25rem;
        }
        .msf-tip-body.open { max-height: 220px; padding: 0 1.25rem 1rem; }
        .msf-tip-divider { height: 1px; background: rgba(184,150,65,0.1); margin-bottom: 0.8rem; }
        .msf-tip-text {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.83rem; color: #c9b87a; line-height: 1.75;
        }

        @media (max-width: 560px) {
          .msf-4q-grid, .msf-tips-list { max-width: 100%; }
        }
      `}</style>

      <div className="msf-root">
        <PageTitle title="Money Saving Formula" />

        {/* Header */}
        <div className="msf-header">
          <div className="msf-eyebrow">Financial Wisdom</div>
          <h1 className="msf-title">
            Money Saving
            <br />
            Formula: 4Q
          </h1>
          <div className="msf-subtitle">কেনার আগে নিজেকে ৪টি প্রশ্ন করুন</div>
        </div>

        {/* Budget readiness meter */}
        <div className="msf-meter-wrap">
          <span className="msf-meter-icon">💰</span>
          <div className="msf-meter-label">Buy Ready</div>
          <div className="msf-meter-track">
            <div
              className="msf-meter-fill"
              style={{
                width: `${Math.round((checkedQ.length / moneyData.length) * 100)}%`,
              }}
            />
          </div>
          <div className="msf-meter-pct">
            {Math.round((checkedQ.length / moneyData.length) * 100)}%
          </div>
        </div>

        {/* 4Q Cards */}
        <div className="msf-section-label">// ৪টি প্রশ্ন — Before You Buy</div>
        <div className="msf-4q-grid">
          {moneyData.map((item, i) => {
            const isChecked = checkedQ.includes(item.id);
            return (
              <div
                key={item.id}
                className={`msf-q-card ${visibleQ.includes(i) ? 'visible' : ''} ${isChecked ? 'checked' : ''}`}
                style={{ animationDelay: `${i * 130}ms` }}
                onClick={() => toggleQ(item.id)}
              >
                <div className="msf-q-num">Q{item.id}</div>
                <div className="msf-q-body">
                  <div className="msf-q-sub">Question {item.id} of 4</div>
                  <div className="msf-q-text">{item.rule}</div>
                </div>
                <div className="msf-q-check">{isChecked ? '✓' : ''}</div>
              </div>
            );
          })}
        </div>

        {allChecked && (
          <div className="msf-all-good">
            ✦ সব প্রশ্নের উত্তর হ্যাঁ হলেই কেবল কিনুন — বুদ্ধিমান সিদ্ধান্ত নিন!
          </div>
        )}

        {/* Divider */}
        <div className="msf-divider">
          <div className="msf-divider-line" />
          <div className="msf-divider-gem">Smart Tips</div>
          <div className="msf-divider-line" />
        </div>

        {/* Tips */}
        <div className="msf-section-label">// বাজার করার স্মার্ট কৌশল</div>
        <div className="msf-tips-list">
          {tipsData.map((tip, i) => {
            const isExpanded = expandedTip === tip.id;
            return (
              <div
                key={tip.id}
                className={`msf-tip-card ${visibleTip.includes(i) ? 'visible' : ''} ${isExpanded ? 'expanded' : ''}`}
                style={{ animationDelay: `${500 + i * 90}ms` }}
                onClick={() => setExpandedTip(isExpanded ? null : tip.id)}
              >
                <div className="msf-tip-head">
                  <span className="msf-tip-icon">{tip.icon}</span>
                  <div className="msf-tip-meta">
                    <div className="msf-tip-num">Tips No: {tip.id}</div>
                    <div className="msf-tip-title">{tip.title}</div>
                  </div>
                  <span className="msf-tip-arrow">▶</span>
                </div>
                <div className={`msf-tip-body ${isExpanded ? 'open' : ''}`}>
                  <div className="msf-tip-divider" />
                  <div className="msf-tip-text">{tip.tips}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MoneySavingFormula;
