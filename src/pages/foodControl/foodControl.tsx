import { useState, useEffect, useMemo } from 'react';
import PageTitle from '../pageTitle/pageTitle';

interface FoodItem {
  id: number;
  time: string;
  breakfast: string;
  lunch: string;
  snacks: string;
  dinner: string;
}

const foodData: FoodItem[] = [
  {
    id: 1,
    time: 'Saturday',
    breakfast: 'Rice + Vorta Item || Sweet Potato',
    lunch: 'Rice + Fish Curry + Dal + Salad',
    snacks: '3 Date + ½ Cucumber',
    dinner: 'Rice + Vegetables',
  },
  {
    id: 2,
    time: 'Sunday',
    breakfast: 'Rice + Any Vorta Items',
    lunch: 'Rice + Egg Curry + Salad',
    snacks: '3 Date + 3 Almond',
    dinner: 'Rice + 100ml Milk',
  },
  {
    id: 3,
    time: 'Monday',
    breakfast: '2 Boil Egg + 7 Dates',
    lunch: 'Rice + Chicken + Salad',
    snacks: '3 Date + Tea',
    dinner: 'Rice + Kalojira Vorta / Any Curry',
  },
  {
    id: 4,
    time: 'Tuesday',
    breakfast: 'Rice + Vegetables + Dal || Sweet Potato',
    lunch: 'Rice + Fish Curry + Salad',
    snacks: '3 Date + 3 Almond',
    dinner: 'Rice + Any Curry',
  },
  {
    id: 5,
    time: 'Wednesday',
    breakfast: 'Roti + Vegetable',
    lunch: 'Rice + Chicken + Salad',
    snacks: '3 Date + Coffee',
    dinner: 'Rice + Vegetables',
  },
  {
    id: 6,
    time: 'Thursday',
    breakfast: 'Rice + Dal + Vegetables',
    lunch: 'Rice + Egg Curry + Salad',
    snacks: '3 Date + 3 Almond',
    dinner: 'Roti + 100ml Milk',
  },
  {
    id: 7,
    time: 'Friday',
    breakfast: 'Rice + Any Curry',
    lunch: 'Rice + Chicken / Beef Curry + Salad',
    snacks: '3 Date + 3 Almond + Any Fruits',
    dinner: 'Potato Fry / Half Boil Duck Egg || Sweet Potato',
  },
];

const tips = [
  {
    bn: '১ জনের খাবার ২ জন, ২ জনের খাবার ৩ জনের জন্য যথেষ্ট!',
    en: 'Eat less than you think you need.',
  },
  {
    bn: 'দিনে ৩.৫ লিটার পানি পান করো!',
    en: 'Drink 3.5 litres of water daily.',
  },
  {
    bn: 'রাতের খাবার ঘুমের ২–৩ ঘণ্টা আগে!',
    en: 'Eat dinner 2–3 hours before sleep.',
  },
  { bn: 'চিনি ও সফট ড্রিংক খাবেন না!', en: 'Avoid sugar and soft drinks.' },
];

const mealMeta: Record<string, { icon: string; color: string; bg: string }> = {
  breakfast: { icon: '🌅', color: '#c9a84c', bg: 'rgba(184,150,65,0.1)' },
  lunch: { icon: '☀️', color: '#eab308', bg: 'rgba(234,179,8,0.08)' },
  snacks: { icon: '🍃', color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
  dinner: { icon: '🌙', color: '#818cf8', bg: 'rgba(129,140,248,0.08)' },
};

const days = foodData.map((f) => f.time);

// Today highlight
const todayName = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
][new Date().getDay()];

const FoodControl = () => {
  const [selected, setSelected] = useState<string>('');
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('card');

  const filtered = useMemo(
    () => (selected ? foodData.filter((f) => f.time === selected) : foodData),
    [selected],
  );

  useEffect(() => {
    setVisibleCards([]);
    filtered.forEach((_, i) => {
      setTimeout(() => setVisibleCards((prev) => [...prev, i]), i * 60);
    });
  }, [filtered, viewMode]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;600&family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .fc-root {
          min-height: 100vh;
          background: #0a0a0a;
          background-image:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(184,150,65,0.13) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 5% 95%, rgba(184,150,65,0.07) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 95% 50%, rgba(120,90,20,0.06) 0%, transparent 50%);
          font-family: 'DM Sans', sans-serif;
          padding: 2rem 1rem 4rem;
          color: #f0e6c8;
        }

        /* ── Header ── */
        .fc-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .fc-eyebrow {
          font-size: 0.68rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c9a84c;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .fc-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 900;
          line-height: 1.05;
          color: #f0e6c8;
          margin-bottom: 0.5rem;
        }
        .fc-title span { background: linear-gradient(90deg,#e8c96d,#c9a84c); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .fc-subtitle {
          font-size: 0.82rem;
          color: #6b5f3e;
          letter-spacing: 0.04em;
        }

        /* ── Controls ── */
        .fc-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.75rem;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }
        .fc-day-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .fc-pill {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          border: 1.5px solid rgba(184,150,65,0.15);
          background: #111008;
          color: #8a7a50;
          cursor: pointer;
          transition: all .18s ease;
          font-family: 'DM Sans', sans-serif;
          position: relative;
        }
        .fc-pill:hover {
          border-color: #c9a84c;
          color: #c9a84c;
          transform: translateY(-1px);
        }
        .fc-pill.active {
          background: #c9a84c;
          border-color: #c9a84c;
          color: #fff;
          box-shadow: 0 4px 12px rgba(184,150,65,0.3);
        }
        .fc-pill.today-pill::after {
          content: '●';
          font-size: 0.45rem;
          position: absolute;
          top: 2px;
          right: 4px;
          color: #22c55e;
        }
        .fc-pill.active.today-pill::after { color: #fff; }

        .fc-view-toggle {
          display: flex;
          gap: 0.3rem;
          background: #1a1608;
          border-radius: 8px;
          padding: 3px;
        }
        .fc-toggle-btn {
          font-size: 0.68rem;
          padding: 0.3rem 0.7rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: all .15s;
          background: transparent;
          color: #6b5f3e;
        }
        .fc-toggle-btn.active {
          background: #111008;
          color: #c9a84c;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }

        /* ── Card Grid ── */
        .fc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem;
          max-width: 900px;
          margin: 0 auto 2rem;
        }

        .fc-card {
          background: #111008;
          border-radius: 16px;
          border: 1.5px solid rgba(184,150,65,0.15);
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          opacity: 0;
          transform: translateY(16px);
          transition: box-shadow .2s, transform .2s, border-color .2s;
        }
        .fc-card.visible {
          animation: cardIn 0.4s ease forwards;
        }
        @keyframes cardIn {
          to { opacity: 1; transform: translateY(0); }
        }
        .fc-card:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.08);
          border-color: #c9a84c;
          transform: translateY(-3px);
        }
        .fc-card.today-card {
          border-color: #c9a84c;
          box-shadow: 0 0 0 3px rgba(184,150,65,0.15), 0 4px 20px rgba(184,150,65,0.1);
        }

        .fc-card-head {
          padding: 1rem 1.25rem 0.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(184,150,65,0.1);
        }
        .fc-day-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #f0e6c8;
        }
        .fc-today-badge {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: linear-gradient(135deg,#e8c96d,#c9a84c);
          color: #0a0a0a;
          padding: 0.2rem 0.55rem;
          border-radius: 20px;
        }

        .fc-meals {
          padding: 0.9rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .fc-meal-row {
          display: flex;
          gap: 0.6rem;
          align-items: flex-start;
          padding: 0.55rem 0.7rem;
          border-radius: 10px;
          transition: background .15s;
        }
        .fc-meal-row:hover { background: #0d0c07; }
        .fc-meal-icon {
          font-size: 1rem;
          line-height: 1.4;
          flex-shrink: 0;
        }
        .fc-meal-body {}
        .fc-meal-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 0.15rem;
        }
        .fc-meal-text {
          font-size: 0.8rem;
          color: #c9b87a;
          line-height: 1.5;
        }

        /* ── Table view ── */
        .fc-table-wrap {
          max-width: 900px;
          margin: 0 auto 2rem;
          background: #111008;
          border-radius: 16px;
          border: 1.5px solid rgba(184,150,65,0.15);
          overflow: hidden;
          box-shadow: 0 2px 16px rgba(0,0,0,0.05);
        }
        .fc-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.8rem;
        }
        .fc-table thead tr {
          background: #0f0e06;
          border-bottom: 2px solid rgba(184,150,65,0.15);
        }
        .fc-table th {
          padding: 0.85rem 1rem;
          text-align: left;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #6b5f3e;
          font-weight: 600;
        }
        .fc-table td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid rgba(184,150,65,0.1);
          vertical-align: top;
          color: #c9b87a;
          line-height: 1.5;
        }
        .fc-table tr:last-child td { border-bottom: none; }
        .fc-table tr.today-row { background: rgba(184,150,65,0.06); }
        .fc-table tr.today-row td:first-child {
          font-weight: 700;
          color: #c9a84c;
        }
        .fc-table tr { transition: background .15s; }
        .fc-table tr:hover:not(thead tr) { background: #0d0c07; }

        /* ── Tips ── */
        .fc-tips {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.9rem;
        }
        .fc-tips-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #f0e6c8;
          margin-bottom: 1rem;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          padding-top: 0.5rem;
        }
        .fc-tip {
          background: #111008;
          border: 1.5px solid rgba(184,150,65,0.15);
          border-radius: 12px;
          padding: 1rem;
          transition: border-color .2s, transform .2s;
        }
        .fc-tip:hover {
          border-color: #c9a84c;
          transform: translateY(-2px);
        }
        .fc-tip-bn {
          font-family: 'Noto Serif Bengali', serif;
          font-size: 0.82rem;
          color: #f0e6c8;
          line-height: 1.6;
          margin-bottom: 0.35rem;
        }
        .fc-tip-en {
          font-size: 0.68rem;
          color: #6b5f3e;
          line-height: 1.5;
        }
        .fc-tip-num {
          font-size: 1.4rem;
          font-weight: 900;
          font-family: 'Playfair Display', serif;
          color: rgba(184,150,65,0.15);
          margin-bottom: 0.4rem;
        }

        @media (max-width: 560px) {
          .fc-controls { flex-direction: column; align-items: flex-start; }
          .fc-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="fc-root">
        <PageTitle title="Food Controls" />

        {/* Header */}
        <div className="fc-header">
          <div className="fc-eyebrow">Weekly Nutrition Plan</div>
          <h1 className="fc-title">
            Daily <span>Food</span> Control
          </h1>
          <p className="fc-subtitle">
            Balanced meals · Clean eating · Healthy habits
          </p>
        </div>

        {/* Controls */}
        <div className="fc-controls">
          <div className="fc-day-pills">
            <button
              className={`fc-pill ${selected === '' ? 'active' : ''}`}
              onClick={() => setSelected('')}
            >
              All Days
            </button>
            {days.map((d) => (
              <button
                key={d}
                className={`fc-pill ${selected === d ? 'active' : ''} ${d === todayName ? 'today-pill' : ''}`}
                onClick={() => setSelected(d === selected ? '' : d)}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="fc-view-toggle">
            <button
              className={`fc-toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
            >
              ⊞ Cards
            </button>
            <button
              className={`fc-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              ≡ Table
            </button>
          </div>
        </div>

        {/* Card View */}
        {viewMode === 'card' && (
          <div className="fc-grid">
            {filtered.map((food, i) => {
              const isToday = food.time === todayName;
              return (
                <div
                  key={food.id}
                  className={`fc-card ${visibleCards.includes(i) ? 'visible' : ''} ${isToday ? 'today-card' : ''}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="fc-card-head">
                    <div className="fc-day-name">{food.time}</div>
                    {isToday && <span className="fc-today-badge">Today</span>}
                  </div>
                  <div className="fc-meals">
                    {(['breakfast', 'lunch', 'snacks', 'dinner'] as const).map(
                      (meal) => {
                        const meta = mealMeta[meal];
                        return (
                          <div
                            key={meal}
                            className="fc-meal-row"
                            style={{
                              background: visibleCards.includes(i)
                                ? meta.bg
                                : 'transparent',
                            }}
                          >
                            <span className="fc-meal-icon">{meta.icon}</span>
                            <div className="fc-meal-body">
                              <div
                                className="fc-meal-label"
                                style={{ color: meta.color }}
                              >
                                {meal}
                              </div>
                              <div className="fc-meal-text">{food[meal]}</div>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="fc-table-wrap">
            <table className="fc-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>🌅 Breakfast</th>
                  <th>☀️ Lunch</th>
                  <th>🍃 Snacks</th>
                  <th>🌙 Dinner</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((food) => (
                  <tr
                    key={food.id}
                    className={food.time === todayName ? 'today-row' : ''}
                  >
                    <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {food.time}
                      {food.time === todayName && (
                        <div
                          style={{
                            fontSize: '0.58rem',
                            color: '#c9a84c',
                            letterSpacing: '0.1em',
                            marginTop: '2px',
                          }}
                        >
                          TODAY
                        </div>
                      )}
                    </td>
                    <td>{food.breakfast}</td>
                    <td>{food.lunch}</td>
                    <td>{food.snacks}</td>
                    <td>{food.dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tips */}
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="fc-tips-title">💡 Health Tips</div>
          <div className="fc-tips">
            {tips.map((tip, i) => (
              <div key={i} className="fc-tip">
                <div className="fc-tip-num">0{i + 1}</div>
                <div className="fc-tip-bn">{tip.bn}</div>
                <div className="fc-tip-en">{tip.en}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodControl;
