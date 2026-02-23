import { useState, useEffect } from 'react';
import PageTitle from '../pageTitle/pageTitle';

const timeData = [
  { id: 1, rule: 'যে কাজটি করবেন তা কি জরুরি বা গুরুত্বপূর্ণ?' },
  { id: 2, rule: 'কাজ শেষে যে ফলাফল আসবে তা কি উপকারী?' },
];

const tipsData = [
  {
    id: 1,
    icon: '📋',
    title: 'পরিকল্পনা করুন',
    tips: 'দিনের শুরুতে কাজের পরিকল্পনা ও লিস্ট তৈরি করুন। অগ্রাধিকার অনুযায়ী সাজান।',
  },
  {
    id: 2,
    icon: '⚡',
    title: 'দ্রুততা বাড়ান',
    tips: 'কীভাবে কাজ করলে সময় কম লাগে তা নিয়ে ভাবুন। শর্টকাট ও স্মার্ট পদ্ধতি শিখুন।',
  },
  {
    id: 3,
    icon: '🚫',
    title: 'অপ্রয়োজনীয় পরিহার',
    tips: 'যে কাজগুলো উপকারে আসবে না তা পরিহার করুন। "না" বলতে শিখুন।',
  },
  {
    id: 4,
    icon: '🔎',
    title: 'সময় নষ্ট খুঁজুন',
    tips: 'কোন কাজগুলোতে সময় বেশি খরচ হচ্ছে তা খুঁজে বের করুন এবং সে অনুযায়ী পদক্ষেপ নিন।',
  },
  {
    id: 5,
    icon: '🧘',
    title: 'স্বাস্থ্যের যত্ন নিন',
    tips: 'শারীরিক ও মানসিক স্বাস্থ্যের যত্ন নিন। সুস্থ শরীর ও মন উৎপাদনশীলতা বাড়ায়।',
  },
];

// Live clock
const useClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const TimeSavingFormula = () => {
  const [visibleQ, setVisibleQ] = useState<number[]>([]);
  const [visibleTip, setVisibleTip] = useState<number[]>([]);
  const [checkedQ, setCheckedQ] = useState<number[]>([]);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  const now = useClock();

  useEffect(() => {
    timeData.forEach((_, i) =>
      setTimeout(() => setVisibleQ((p) => [...p, i]), i * 150),
    );
    tipsData.forEach((_, i) =>
      setTimeout(() => setVisibleTip((p) => [...p, i]), 500 + i * 100),
    );
  }, []);

  const toggleQ = (id: number) =>
    setCheckedQ((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  const allChecked = checkedQ.length === timeData.length;

  // Day progress
  const totalMins = 24 * 60;
  const usedMins = now.getHours() * 60 + now.getMinutes();
  const dayPct = Math.round((usedMins / totalMins) * 100);
  const remainHrs = 24 - now.getHours() - (now.getMinutes() > 0 ? 1 : 0);
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <>
      {/* <PageTitle title="Time Saving Formula" subtitle="Time Saving Formula" /> */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;600;700&family=Cinzel:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .tsf-root {
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
        .tsf-header { text-align: center; margin-bottom: 2.5rem; }
        .tsf-eyebrow {
          font-size: 0.65rem; letter-spacing: 0.3em;
          text-transform: uppercase; color: #c9a84c;
          margin-bottom: 0.6rem;
        }
        .tsf-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.8rem, 5vw, 3rem); font-weight: 900;
          letter-spacing: 0.04em; line-height: 1.1; margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff 0%, #e8c96d 45%, #c9a84c 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .tsf-subtitle { font-size: 0.8rem; color: #ee470a; letter-spacing: 0.1em; }

        /* ── Live clock + day bar ── */
        .tsf-clock-panel {
          max-width: 580px; margin: 0 auto 2.5rem;
          background: rgba(15,12,3,0.85);
          border: 1.5px solid rgba(184,150,65,0.15);
          border-radius: 16px; padding: 1.25rem 1.5rem;
        }
        .tsf-clock-row {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;
        }
        .tsf-clock-time {
          font-family: 'Cinzel', serif; font-size: 1.8rem; font-weight: 900;
          background: linear-gradient(90deg, #e8c96d, #c9a84c);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          letter-spacing: 0.06em; line-height: 1;
        }
        .tsf-clock-meta { text-align: right; }
        .tsf-clock-date {
          font-size: 0.72rem; color: #c9a84c; letter-spacing: 0.1em;
          font-family: 'DM Sans', sans-serif; margin-bottom: 0.2rem;
        }
        .tsf-clock-remain {
          font-size: 0.65rem; color: #4a3f22; letter-spacing: 0.08em;
        }

        .tsf-bar-label {
          display: flex; justify-content: space-between;
          font-size: 0.6rem; color: #4a3f22; letter-spacing: 0.15em;
          text-transform: uppercase; margin-bottom: 0.45rem;
          font-family: 'DM Sans', sans-serif;
        }
        .tsf-bar-track {
          height: 6px; background: rgba(184,150,65,0.08);
          border-radius: 3px; overflow: hidden; position: relative;
        }
        .tsf-bar-fill {
          height: 100%; border-radius: 3px;
          background: linear-gradient(90deg, #8a6a1f, #c9a84c, #e8c96d);
          transition: width 1s linear;
          box-shadow: 0 0 10px rgba(201,168,76,0.4);
          position: relative;
        }
        .tsf-bar-fill::after {
          content: '';
          position: absolute; right: 0; top: 50%;
          transform: translateY(-50%);
          width: 10px; height: 10px; border-radius: 50%;
          background: #e8c96d;
          box-shadow: 0 0 8px rgba(232,201,109,0.8);
        }

        /* ── Section label ── */
        .tsf-section-label {
          font-size: 0.62rem; letter-spacing: 0.25em;
          text-transform: uppercase; color: #4a3f22;
          margin-bottom: 1rem;
          max-width: 580px; margin-left: auto; margin-right: auto;
          padding-left: 0.25rem;
        }

        /* ── 2Q Cards ── */
        .tsf-2q-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1rem; max-width: 580px; margin: 0 auto 2.5rem;
        }

        .tsf-q-card {
          background: rgba(15,12,3,0.85);
          border: 1.5px solid rgba(184,150,65,0.13);
          border-radius: 14px; padding: 1.3rem 1.4rem;
          cursor: pointer;
          opacity: 0; transform: translateY(16px);
          transition: border-color .2s, box-shadow .2s, transform .2s, background .2s;
          user-select: none;
          display: flex; flex-direction: column; gap: 0.85rem;
        }
        .tsf-q-card.visible { animation: cardUp 0.4s ease forwards; }
        @keyframes cardUp { to { opacity: 1; transform: translateY(0); } }
        .tsf-q-card:hover {
          border-color: rgba(184,150,65,0.38);
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.5);
        }
        .tsf-q-card.checked {
          border-color: rgba(184,150,65,0.45);
          background: rgba(184,150,65,0.05);
          box-shadow: 0 0 0 2px rgba(184,150,65,0.1), 0 6px 24px rgba(0,0,0,0.4);
        }

        .tsf-q-top { display: flex; align-items: center; justify-content: space-between; }
        .tsf-q-num {
          font-family: 'Cinzel', serif; font-size: 2rem; font-weight: 900; line-height: 1;
          background: linear-gradient(135deg, #e8c96d, #c9a84c);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .tsf-q-check {
          width: 24px; height: 24px; border-radius: 50%;
          border: 1.5px solid rgba(184,150,65,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; transition: all .2s; flex-shrink: 0;
        }
        .tsf-q-card.checked .tsf-q-check {
          background: linear-gradient(135deg, #e8c96d, #c9a84c);
          border-color: #c9a84c; color: #0a0a0a; font-weight: 700;
        }
        .tsf-q-sub {
          font-size: 0.57rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #4a3f22; font-family: 'DM Sans', sans-serif;
        }
        .tsf-q-text {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.9rem; color: #e8d48a; line-height: 1.65;
          transition: color .2s;
        }
        .tsf-q-card.checked .tsf-q-text {
          color: #6a5820;
          text-decoration: line-through;
          text-decoration-color: rgba(201,168,76,0.35);
        }

        .tsf-all-good {
          max-width: 580px; margin: -0.5rem auto 1.5rem;
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
        .tsf-divider {
          max-width: 580px; margin: 2rem auto;
          display: flex; align-items: center; gap: 1rem;
        }
        .tsf-divider-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(184,150,65,0.3), transparent);
        }
        .tsf-divider-gem {
          font-size: 0.65rem; color: #c9a84c;
          letter-spacing: 0.2em; text-transform: uppercase;
          font-family: 'Cinzel', serif;
        }

        /* ── Tips ── */
        .tsf-tips-list {
          display: flex; flex-direction: column; gap: 0.75rem;
          max-width: 580px; margin: 0 auto;
        }

        .tsf-tip-card {
          background: rgba(15,12,3,0.85);
          border: 1.5px solid rgba(184,150,65,0.1);
          border-radius: 14px; overflow: hidden; cursor: pointer;
          opacity: 0; transform: translateY(14px);
          transition: border-color .2s, box-shadow .2s, transform .2s;
        }
        .tsf-tip-card.visible { animation: cardUp 0.4s ease forwards; }
        .tsf-tip-card:hover {
          border-color: rgba(184,150,65,0.32);
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          transform: translateY(-2px);
        }
        .tsf-tip-card.expanded {
          border-color: rgba(184,150,65,0.4);
          box-shadow: 0 0 0 2px rgba(184,150,65,0.08), 0 6px 24px rgba(0,0,0,0.5);
        }

        .tsf-tip-head {
          display: flex; align-items: center;
          gap: 0.85rem; padding: 0.9rem 1.25rem;
        }
        .tsf-tip-icon { font-size: 1.25rem; line-height: 1; flex-shrink: 0; }
        .tsf-tip-meta { flex: 1; }
        .tsf-tip-num {
          font-size: 0.57rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #4a3f22; font-family: 'DM Sans', sans-serif; margin-bottom: 0.15rem;
        }
        .tsf-tip-title {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.88rem; font-weight: 700; color: #e8d48a;
        }
        .tsf-tip-arrow {
          font-size: 0.65rem; color: #4a3f22;
          transition: transform .25s, color .2s;
        }
        .tsf-tip-card.expanded .tsf-tip-arrow { transform: rotate(90deg); color: #c9a84c; }

        .tsf-tip-body {
          max-height: 0; overflow: hidden;
          transition: max-height .35s ease, padding .25s ease;
          padding: 0 1.25rem;
        }
        .tsf-tip-body.open { max-height: 200px; padding: 0 1.25rem 1rem; }
        .tsf-tip-divider { height: 1px; background: rgba(184,150,65,0.1); margin-bottom: 0.8rem; }
        .tsf-tip-text {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.83rem; color: #c9b87a; line-height: 1.75;
        }

        @media (max-width: 500px) {
          .tsf-2q-grid { grid-template-columns: 1fr; }
          .tsf-clock-time { font-size: 1.4rem; }
        }
      `}</style>

      <div className="tsf-root">
        <PageTitle title="Time Saving Formula" />

        {/* Header */}
        <div className="tsf-header">
          <div className="tsf-eyebrow">Master Your Time</div>
          <h1 className="tsf-title">
            Time Saving
            <br />
            Formula: 2Q
          </h1>
          <div className="tsf-subtitle">
            কাজ শুরুর আগে নিজেকে ২টি প্রশ্ন করুন
          </div>
        </div>

        {/* Live clock + day progress */}
        <div className="tsf-clock-panel">
          <div className="tsf-clock-row">
            <div className="tsf-clock-time">{timeStr}</div>
            <div className="tsf-clock-meta">
              <div className="tsf-clock-date">
                {now.toLocaleDateString('en-BD', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </div>
              <div className="tsf-clock-remain">
                আরও ~{remainHrs} ঘণ্টা বাকি আজকের
              </div>
            </div>
          </div>
          <div className="tsf-bar-label">
            <span>দিনের শুরু</span>
            <span>ব্যবহৃত {dayPct}%</span>
            <span>রাত ১২টা</span>
          </div>
          <div className="tsf-bar-track">
            <div className="tsf-bar-fill" style={{ width: `${dayPct}%` }} />
          </div>
        </div>

        {/* 2Q Cards */}
        <div className="tsf-section-label">
          // ২টি প্রশ্ন — Before You Start
        </div>
        <div className="tsf-2q-grid">
          {timeData.map((item, i) => {
            const isChecked = checkedQ.includes(item.id);
            return (
              <div
                key={item.id}
                className={`tsf-q-card ${visibleQ.includes(i) ? 'visible' : ''} ${isChecked ? 'checked' : ''}`}
                style={{ animationDelay: `${i * 150}ms` }}
                onClick={() => toggleQ(item.id)}
              >
                <div className="tsf-q-top">
                  <div className="tsf-q-num">Q{item.id}</div>
                  <div className="tsf-q-check">{isChecked ? '✓' : ''}</div>
                </div>
                <div className="tsf-q-sub">Question {item.id} of 2</div>
                <div className="tsf-q-text">{item.rule}</div>
              </div>
            );
          })}
        </div>

        {allChecked && (
          <div className="tsf-all-good">
            ✦ দুটো প্রশ্নের উত্তর হ্যাঁ — এখন কাজ শুরু করুন, সময় নষ্ট করবেন না!
          </div>
        )}

        {/* Divider */}
        <div className="tsf-divider">
          <div className="tsf-divider-line" />
          <div className="tsf-divider-gem">Smart Tips</div>
          <div className="tsf-divider-line" />
        </div>

        {/* Tips */}
        <div className="tsf-section-label">// সময় বাঁচানোর স্মার্ট কৌশল</div>
        <div className="tsf-tips-list">
          {tipsData.map((tip, i) => {
            const isExpanded = expandedTip === tip.id;
            return (
              <div
                key={tip.id}
                className={`tsf-tip-card ${visibleTip.includes(i) ? 'visible' : ''} ${isExpanded ? 'expanded' : ''}`}
                style={{ animationDelay: `${500 + i * 100}ms` }}
                onClick={() => setExpandedTip(isExpanded ? null : tip.id)}
              >
                <div className="tsf-tip-head">
                  <span className="tsf-tip-icon">{tip.icon}</span>
                  <div className="tsf-tip-meta">
                    <div className="tsf-tip-num">Tips No: {tip.id}</div>
                    <div className="tsf-tip-title">{tip.title}</div>
                  </div>
                  <span className="tsf-tip-arrow">▶</span>
                </div>
                <div className={`tsf-tip-body ${isExpanded ? 'open' : ''}`}>
                  <div className="tsf-tip-divider" />
                  <div className="tsf-tip-text">{tip.tips}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TimeSavingFormula;
