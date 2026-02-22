import { useState, useEffect } from 'react';
import PageTitle from '../pageTitle/pageTitle';

interface WorkItem {
  start: string;
  end: string;
  task: string;
  hours: number;
  category: 'spiritual' | 'health' | 'work' | 'personal' | 'rest';
  startMinutes: number;
  endMinutes: number;
}

const parseTime = (t: string): number => {
  const [time, meridiem] = t.split(' ');
  const parts = time.split(':').map(Number);
  let h = parts[0];
  const m = parts[1];
  if (meridiem === 'PM' && h !== 12) h += 12;
  if (meridiem === 'AM' && h === 12) h = 0;
  return h * 60 + m;
};

const rawPlans = [
  {
    start: '4:00 AM',
    end: '5:00 AM',
    task: 'Salat, Quran, Water',
    hours: 1,
    category: 'spiritual',
  },
  {
    start: '5:00 AM',
    end: '6:00 AM',
    task: 'Exercise, English',
    hours: 1,
    category: 'health',
  },
  {
    start: '6:00 AM',
    end: '7:00 AM',
    task: 'Web Development Practice',
    hours: 1,
    category: 'work',
  },
  {
    start: '7:00 AM',
    end: '8:00 AM',
    task: 'Breakfast & Office Preparation',
    hours: 1,
    category: 'personal',
  },
  {
    start: '8:00 AM',
    end: '8:00 PM',
    task: 'Office Work · Salat · Power Nap · English Listening · Typing Practice',
    hours: 12,
    category: 'work',
  },
  {
    start: '8:00 PM',
    end: '9:00 PM',
    task: 'Salat & Dinner',
    hours: 1,
    category: 'spiritual',
  },
  {
    start: '9:00 PM',
    end: '10:00 PM',
    task: 'Family Time & Review',
    hours: 1,
    category: 'personal',
  },
  {
    start: '10:00 PM',
    end: '4:00 AM',
    task: 'Sleep',
    hours: 6,
    category: 'rest',
  },
] as const;

const workPlans: WorkItem[] = rawPlans.map((p) => ({
  ...p,
  category: p.category as WorkItem['category'],
  startMinutes: parseTime(p.start),
  endMinutes: parseTime(p.end),
}));

const extraGoals = [
  { icon: '🗣️', label: 'English', detail: '5 New Words' },
  { icon: '🐧', label: 'Linux', detail: '1 Command Practice' },
  { icon: '💡', label: 'Learn', detail: 'Something New' },
  { icon: '🧘', label: 'Meditation', detail: 'Mindful Reset' },
];

const categoryConfig: Record<
  WorkItem['category'],
  { color: string; glow: string; dot: string; bg: string }
> = {
  spiritual: {
    color: '#c084fc',
    glow: 'rgba(192,132,252,0.25)',
    dot: '#a855f7',
    bg: 'rgba(168,85,247,0.07)',
  },
  health: {
    color: '#34d399',
    glow: 'rgba(52,211,153,0.25)',
    dot: '#10b981',
    bg: 'rgba(16,185,129,0.07)',
  },
  work: {
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.25)',
    dot: '#3b82f6',
    bg: 'rgba(59,130,246,0.07)',
  },
  personal: {
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.25)',
    dot: '#f59e0b',
    bg: 'rgba(245,158,11,0.07)',
  },
  rest: {
    color: '#94a3b8',
    glow: 'rgba(148,163,184,0.15)',
    dot: '#64748b',
    bg: 'rgba(100,116,139,0.07)',
  },
};

const getNowMinutes = () => {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
};

const getActiveIndex = (nowMins: number) =>
  workPlans.findIndex((w) => {
    if (w.endMinutes > w.startMinutes)
      return nowMins >= w.startMinutes && nowMins < w.endMinutes;
    return nowMins >= w.startMinutes || nowMins < w.endMinutes;
  });

const getBlockProgress = (nowMins: number, w: WorkItem) => {
  let elapsed = nowMins - w.startMinutes;
  let total = w.endMinutes - w.startMinutes;
  if (total <= 0) total += 1440;
  if (elapsed < 0) elapsed += 1440;
  return Math.min(Math.max(elapsed / total, 0), 1);
};

const getRowProgress = (
  nowMins: number,
  w: WorkItem,
  idx: number,
  activeIdx: number,
): number => {
  if (idx < activeIdx) return 1;
  if (idx === activeIdx) return getBlockProgress(nowMins, w);
  return 0;
};

const totalHours = workPlans.reduce((a, w) => a + w.hours, 0);

export default function Works() {
  const [visibleRows, setVisibleRows] = useState<number[]>([]);
  const [nowMins, setNowMins] = useState(getNowMinutes);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    workPlans.forEach((_, i) =>
      setTimeout(() => setVisibleRows((prev) => [...prev, i]), i * 80),
    );
  }, []);

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setNowMins(n.getHours() * 60 + n.getMinutes());
      setTimeStr(
        n.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const activeIdx = getActiveIndex(nowMins);
  const activeWork = activeIdx >= 0 ? workPlans[activeIdx] : null;
  const progress = activeWork ? getBlockProgress(nowMins, activeWork) : 0;
  const activeCfg = activeWork ? categoryConfig[activeWork.category] : null;

  return (
    <>
      <PageTitle title="Work" subtitle="Work" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .wr {
          min-height: 100vh;
          width: 100%;
          background: #050810;
          background-image:
            radial-gradient(ellipse 60% 40% at 20% 10%, rgba(96,165,250,.07) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 80% 80%, rgba(192,132,252,.06) 0%, transparent 60%);
          font-family: 'Syne', sans-serif;
          padding: 2rem 2.5rem 3rem;
          color: #e2e8f0;
        }

        /* ── Header ── */
        .hdr {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.8rem;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .ttl {
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 800;
          letter-spacing: -.03em;
          line-height: 1;
          background: linear-gradient(135deg, #e2e8f0 0%, #60a5fa 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sub {
          font-family: 'Space Mono', monospace;
          font-size: .8rem;
          color: #475569;
          letter-spacing: .15em;
          text-transform: uppercase;
          margin-top: .35rem;
        }
        .clk {
          font-family: 'Space Mono', monospace;
          font-size: 1.05rem;
          color: #60a5fa;
          background: rgba(96,165,250,.07);
          border: 1px solid rgba(96,165,250,.25);
          border-radius: 10px;
          padding: .55rem 1.2rem;
          letter-spacing: .06em;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: .5rem;
        }
        .clk-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #60a5fa;
          animation: pdot 1s ease-in-out infinite;
        }
        @keyframes pdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.6)} }

        /* ── Now banner ── */
        .now-banner {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          background: rgba(15,20,35,.8);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 12px;
          padding: .9rem 1.4rem;
          margin-bottom: 1.4rem;
          backdrop-filter: blur(12px);
        }
        .now-tag {
          font-family: 'Space Mono', monospace;
          font-size: .7rem;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
          padding: .28rem .75rem;
          border-radius: 20px;
          border: 1px solid;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: .4rem;
        }
        .now-tag-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          animation: pdot 1s ease-in-out infinite;
        }
        .now-task { font-weight: 700; font-size: 1.05rem; color: #e2e8f0; flex: 1; min-width: 80px; }
        .now-prow { display: flex; align-items: center; gap: .6rem; min-width: 180px; flex: 1; }
        .now-track { flex: 1; height: 4px; background: rgba(255,255,255,.07); border-radius: 2px; overflow: hidden; }
        .now-fill { height: 100%; border-radius: 2px; transition: width 1s linear; }
        .now-pct { font-family: 'Space Mono', monospace; font-size: .72rem; color: #64748b; white-space: nowrap; }

        /* ── Panel / table ── */
        .panel {
          background: rgba(13,18,30,.85);
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 16px;
          overflow: hidden;
          backdrop-filter: blur(14px);
          box-shadow: 0 0 80px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.05);
          margin-bottom: 1.8rem;
          width: 100%;
        }
        table { width: 100%; border-collapse: collapse; }
        thead tr { background: rgba(255,255,255,.025); border-bottom: 1px solid rgba(255,255,255,.06); }
        th {
          font-family: 'Space Mono', monospace;
          font-size: .72rem;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #475569;
          padding: .9rem 1.4rem;
          text-align: left;
          font-weight: 400;
        }
        th:last-child { text-align: center; }

        /* ── Rows ── */
        .row {
          border-bottom: 1px solid rgba(255,255,255,.035);
          position: relative;
          opacity: 0;
          transform: translateX(-14px);
          transition: background .2s;
        }
        .row.vis { animation: sli .38s ease forwards; }
        @keyframes sli { to { opacity:1; transform:translateX(0); } }
        .row:last-child { border-bottom: none; }
        .row:hover { background: rgba(255,255,255,.022); }

        /* active row */
        .row.active {
          background: var(--abg) !important;
          border-left: 3px solid var(--ac);
          box-shadow: inset 5px 0 28px var(--ag);
        }
        .row.active .tc { color: var(--ac) !important; }

        td { padding: .95rem 1.4rem; vertical-align: middle; }

        /* time cells */
        .tc {
          font-family: 'Space Mono', monospace;
          font-size: .82rem;
          color: #475569;
          white-space: nowrap;
          width: 96px;
          transition: color .25s;
        }

        /* task cell */
        .task-wrap { display: flex; align-items: center; gap: .8rem; flex-wrap: nowrap; }
        .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .row.active .dot { animation: pring 1.8s ease-in-out infinite; }
        @keyframes pring {
          0%   { box-shadow: 0 0 0 0 var(--ag); }
          70%  { box-shadow: 0 0 0 7px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
        .task-name {
          font-size: .98rem;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color .2s;
        }

        /* badges */
        .badge {
          font-family: 'Space Mono', monospace;
          font-size: .58rem;
          font-weight: 700;
          letter-spacing: .18em;
          padding: .2rem .6rem;
          border-radius: 20px;
          border: 1px solid;
          text-transform: uppercase;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .badge-now { animation: bpulse 2s ease-in-out infinite; }
        @keyframes bpulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        .badge-done { opacity: .7; }

        /* progress bar under task name */
        .pbar-wrap {
          margin-top: .4rem;
          height: 3px;
          background: rgba(255,255,255,.05);
          border-radius: 2px;
          overflow: hidden;
        }
        .pbar-fill { height: 100%; border-radius: 2px; transition: width 1s linear; }
        .pbar-pct {
          font-family: 'Space Mono', monospace;
          font-size: .58rem;
          margin-top: .22rem;
          letter-spacing: .08em;
          opacity: .75;
        }

        /* hrs badge */
        .hcell { text-align: center; width: 80px; }
        .hbadge {
          font-family: 'Space Mono', monospace;
          font-size: .85rem;
          font-weight: 700;
          padding: .35rem .85rem;
          border-radius: 20px;
          border: 1px solid;
          display: inline-block;
          letter-spacing: .04em;
          transition: box-shadow .2s;
        }
        .row:hover .hbadge, .row.active .hbadge { box-shadow: 0 0 14px var(--bg,transparent); }

        /* active progress strip at bottom of row */
        .strip {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          transition: width 1s linear;
          border-radius: 0 2px 0 0;
          pointer-events: none;
        }

        /* ── Legend ── */
        .legend {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          padding: .85rem 1.4rem;
          border-top: 1px solid rgba(255,255,255,.04);
          background: rgba(255,255,255,.01);
        }
        .leg-item {
          display: flex; align-items: center; gap: .4rem;
          font-size: .68rem;
          font-family: 'Space Mono', monospace;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: .1em;
        }
        .leg-dot { width: 7px; height: 7px; border-radius: 50%; }

        /* ── Extra goals ── */
        .gtitle {
          font-family: 'Space Mono', monospace;
          font-size: .7rem;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #334155;
          margin-bottom: .75rem;
        }
        .ggrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 1rem;
          margin-bottom: 1.8rem;
        }
        .gcard {
          background: rgba(13,18,30,.7);
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 12px;
          padding: 1.1rem 1.3rem;
          display: flex; align-items: center; gap: .75rem;
          transition: border-color .2s, transform .2s;
        }
        .gcard:hover { border-color: rgba(96,165,250,.3); transform: translateY(-2px); }
        .gicon { font-size: 1.5rem; line-height: 1; }
        .glabel { font-size: .95rem; font-weight: 700; color: #cbd5e1; }
        .gdetail { font-family: 'Space Mono', monospace; font-size: .65rem; color: #475569; margin-top: .12rem; letter-spacing: .04em; }

        /* ── Footer ── */
        .fbar {
          display: flex; align-items: center;
          justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
        }
        .ftlabel { font-family: 'Space Mono', monospace; font-size: .75rem; color: #475569; letter-spacing: .15em; text-transform: uppercase; }
        .ftval {
          font-size: 2.6rem; font-weight: 800;
          background: linear-gradient(90deg, #60a5fa, #c084fc);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          line-height: 1;
        }
        .pbar-total-wrap { flex: 1; min-width: 200px; height: 5px; background: rgba(255,255,255,.06); border-radius: 2px; overflow: hidden; }
        .pbar-total-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg,#3b82f6,#a855f7); width: 0; animation: fb 1.5s .6s ease forwards; }
        @keyframes fb { to { width: ${Math.round((totalHours / 24) * 100)}%; } }
        .ftcount { font-family: 'Space Mono', monospace; font-size: .75rem; color: #334155; }

        @media (max-width: 600px) { .tc { display: none; } .task-name { white-space: normal; } }
      `}</style>

      <div className="wr">
        {/* ── Header ── */}
        <div className="hdr">
          <div>
            <div className="ttl">Daily Blueprint</div>
            <div className="sub">// Structured Day Plan — 24h Cycle</div>
          </div>
          <div className="clk">
            <span className="clk-dot" />
            {timeStr}
          </div>
        </div>

        {/* ── Now banner ── */}
        {activeWork && activeCfg && (
          <div className="now-banner">
            <span
              className="now-tag"
              style={{
                color: activeCfg.color,
                borderColor: activeCfg.color + '55',
                background: activeCfg.bg,
              }}
            >
              <span
                className="now-tag-dot"
                style={{ background: activeCfg.color }}
              />
              NOW
            </span>
            <span className="now-task">{activeWork.task}</span>
            <div className="now-prow">
              <div className="now-track">
                <div
                  className="now-fill"
                  style={{
                    width: `${Math.round(progress * 100)}%`,
                    background: activeCfg.color,
                  }}
                />
              </div>
              <span className="now-pct">{Math.round(progress * 100)}%</span>
            </div>
          </div>
        )}

        {/* ── Table ── */}
        <div className="panel">
          <table>
            <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Task</th>
                <th>Hrs</th>
              </tr>
            </thead>
            <tbody>
              {workPlans.map((w, i) => {
                const cfg = categoryConfig[w.category];
                const isActive = i === activeIdx;
                const isDone = i < activeIdx;
                const isFuture = i > activeIdx;
                const rowProgress = getRowProgress(nowMins, w, i, activeIdx);

                return (
                  <tr
                    key={i}
                    className={[
                      'row',
                      visibleRows.includes(i) ? 'vis' : '',
                      isActive ? 'active' : '',
                    ].join(' ')}
                    style={
                      {
                        animationDelay: `${i * 80}ms`,
                        ...(isActive
                          ? {
                              ['--ac' as string]: cfg.color,
                              ['--ag' as string]: cfg.glow,
                              ['--abg' as string]: cfg.bg,
                            }
                          : {}),
                      } as React.CSSProperties
                    }
                  >
                    <td className="tc">{w.start}</td>
                    <td className="tc">{w.end}</td>
                    <td>
                      {/* Task row */}
                      <div className="task-wrap">
                        <span
                          className="dot"
                          style={
                            {
                              background: cfg.dot,
                              ...(isActive
                                ? { ['--ag' as string]: cfg.glow }
                                : {}),
                            } as React.CSSProperties
                          }
                        />
                        <span
                          className="task-name"
                          style={{
                            color: isActive
                              ? cfg.color
                              : isDone
                                ? cfg.color + 'bb'
                                : '#cbd5e1',
                          }}
                        >
                          {w.task}
                        </span>
                        {isActive && (
                          <span
                            className="badge badge-now"
                            style={{
                              color: cfg.color,
                              borderColor: cfg.color + '55',
                              background: cfg.bg,
                            }}
                          >
                            Now
                          </span>
                        )}
                        {isDone && (
                          <span
                            className="badge badge-done"
                            style={{
                              color: cfg.color + 'cc',
                              borderColor: cfg.color + '33',
                              background: cfg.bg,
                            }}
                          >
                            ✓ Done
                          </span>
                        )}
                      </div>

                      {/* Progress bar */}
                      {!isFuture && (
                        <>
                          <div className="pbar-wrap">
                            <div
                              className="pbar-fill"
                              style={{
                                width: `${Math.round(rowProgress * 100)}%`,
                                background: isDone
                                  ? cfg.color + '66'
                                  : cfg.color,
                                boxShadow: isActive
                                  ? `0 0 8px ${cfg.color}88`
                                  : 'none',
                              }}
                            />
                          </div>
                          <div
                            className="pbar-pct"
                            style={{ color: cfg.color }}
                          >
                            {Math.round(rowProgress * 100)}% ·{' '}
                            {isDone ? 'complete' : 'in progress'}
                          </div>
                        </>
                      )}
                    </td>

                    {/* Hrs */}
                    <td className="hcell">
                      <span
                        className="hbadge"
                        style={
                          {
                            color: cfg.color,
                            borderColor: cfg.color + '40',
                            background: cfg.bg,
                            ['--bg' as string]: cfg.glow,
                          } as React.CSSProperties
                        }
                      >
                        {w.hours}h
                      </span>
                    </td>

                    {/* Active row bottom strip */}
                    {isActive && (
                      <span
                        className="strip"
                        style={{
                          width: `${Math.round(rowProgress * 100)}%`,
                          background: cfg.color,
                          opacity: 0.5,
                        }}
                      />
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Legend */}
          <div className="legend">
            {(Object.keys(categoryConfig) as WorkItem['category'][]).map(
              (k) => (
                <div className="leg-item" key={k}>
                  <span
                    className="leg-dot"
                    style={{ background: categoryConfig[k].dot }}
                  />
                  {k}
                </div>
              ),
            )}
          </div>
        </div>

        {/* ── Extra Goals ── */}
        <div className="gtitle">// Daily Extra Goals</div>
        <div className="ggrid">
          {extraGoals.map((g, i) => (
            <div className="gcard" key={i}>
              <span className="gicon">{g.icon}</span>
              <div>
                <div className="glabel">{g.label}</div>
                <div className="gdetail">{g.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="fbar">
          <div>
            <div className="ftlabel">Total Productive Hours</div>
            <div className="ftval">{totalHours}h</div>
          </div>
          <div className="pbar-total-wrap">
            <div className="pbar-total-fill" />
          </div>
          <div className="ftcount">{totalHours}/24 hrs</div>
        </div>
      </div>
    </>
  );
}
