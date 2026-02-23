import { useEffect, useRef } from 'react';

type Title = {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumb?: string[];
};

const PageTitle = ({ title, subtitle, badge, breadcrumb }: Title) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.title = `${title} | MYLOS`;
  }, [title]);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.classList.remove('pt-animate');
    void el.offsetWidth;
    el.classList.add('pt-animate');
  }, [title]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

        .pt-root {
          font-family: 'Jost', sans-serif;
          background: #0d0d0d;
          padding: 1rem 1.25rem 1rem;
          position: relative;
          overflow: hidden;
        }

        /* gold shimmer top border — matches the navbar bottom line */
        .pt-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg,
            transparent 0%,
            #c9a84c 20%,
            #e8c96a 50%,
            #c9a84c 80%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: pt-gold 4s linear infinite;
        }

        @keyframes pt-gold {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── BRAND ── */
        .pt-brand {
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c9a84c;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          margin-bottom: 0.4rem;
        }

        .pt-brand::before {
          content: '';
          display: inline-block;
          width: 14px;
          height: 1.5px;
          background: #c9a84c;
          border-radius: 2px;
        }

        /* ── BREADCRUMB ── */
        .pt-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.68rem;
          color: #888;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
          font-weight: 400;
          letter-spacing: 0.03em;
        }

        .pt-breadcrumb .bc-link {
          color: #c9a84c;
          cursor: pointer;
          opacity: 0.75;
          transition: opacity 0.15s;
        }
        .pt-breadcrumb .bc-link:hover { opacity: 1; }

        .pt-breadcrumb .bc-sep {
          color: #555;
          font-size: 0.6rem;
        }

        .pt-breadcrumb .bc-current {
          color: #aaa;
        }

        /* ── TITLE ROW ── */
        .pt-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .pt-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.3rem, 3vw, 1.75rem);
          font-weight: 600;
          font-style: italic;
          color: #e8dfc8;
          margin: 0;
          line-height: 1.2;
          letter-spacing: 0.01em;
          opacity: 0;
          transform: translateY(6px);
        }

        .pt-title.pt-animate {
          animation: pt-rise 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes pt-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        .pt-badge {
          font-family: 'Jost', sans-serif;
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.2rem 0.65rem;
          border-radius: 3px;
          background: transparent;
          color: #c9a84c;
          border: 1px solid #c9a84c55;
          flex-shrink: 0;
        }

        /* ── SUBTITLE ── */
        .pt-subtitle {
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          color: #777;
          margin: 0.35rem 0 0;
          font-weight: 300;
          line-height: 1.55;
          max-width: 480px;
          letter-spacing: 0.02em;
          animation: pt-rise 0.5s 0.07s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* bottom fade line */
        .pt-root::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 1px;
          background: linear-gradient(90deg, #c9a84c33, #c9a84c11 60%, transparent);
        }
      `}</style>

      <div className="pt-root">
        <div className="pt-brand">MYLOS</div>

        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="pt-breadcrumb" aria-label="Breadcrumb">
            <span className="bc-link">Home</span>
            {breadcrumb.map((crumb, i) => (
              <span key={i} style={{ display: 'contents' }}>
                <span className="bc-sep">›</span>
                <span className="bc-link">{crumb}</span>
              </span>
            ))}
            <span className="bc-sep">›</span>
            <span className="bc-current">{title}</span>
          </nav>
        )}

        <div className="pt-row">
          <h1 className="pt-title" ref={titleRef}>
            {title}
          </h1>
          {badge && <span className="pt-badge">{badge}</span>}
        </div>

        {subtitle && <p className="pt-subtitle">{subtitle}</p>}
      </div>
    </>
  );
};

export default PageTitle;
