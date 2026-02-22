import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

const Error: React.FC = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [glitchActive, setGlitchActive] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Random glitch effect
    const glitchInterval = setInterval((): void => {
      setGlitchActive(true);
      setTimeout((): void => setGlitchActive(false), 200);
    }, 3000);

    return (): void => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(glitchInterval);
    };
  }, []);

  const cursorStyle: CSSProperties = {
    left: mousePos.x + window.innerWidth / 2,
    top: mousePos.y + window.innerHeight / 2,
  };

  const big404Style: CSSProperties = {
    transform: `perspective(800px) rotateX(${mousePos.y * 0.03}deg) rotateY(${mousePos.x * 0.03}deg)`,
  };

  const errorLineRightStyle: CSSProperties = {
    background: 'linear-gradient(270deg, #00f0ff, transparent)',
  };

  const btnWrapStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-block',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Space+Mono:wght@400;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .error-root {
          min-height: 100vh;
          background: #080810;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Mono', monospace;
          overflow: hidden;
          position: relative;
          cursor: none;
        }

        /* Animated grid background */
        .grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,0,100,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,0,100,0.07) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridDrift 20s linear infinite;
        }
        @keyframes gridDrift {
          from { background-position: 0 0; }
          to { background-position: 60px 60px; }
        }

        /* Scanlines overlay */
        .scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.15) 2px,
            rgba(0,0,0,0.15) 4px
          );
          pointer-events: none;
        }

        /* Floating orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: orbFloat 8s ease-in-out infinite;
        }
        .orb-1 {
          width: 400px; height: 400px;
          background: #ff0064;
          top: -100px; left: -100px;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 300px; height: 300px;
          background: #00f0ff;
          bottom: -80px; right: -80px;
          animation-delay: -4s;
        }
        .orb-3 {
          width: 200px; height: 200px;
          background: #7000ff;
          top: 50%; left: 60%;
          animation-delay: -2s;
        }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.05); }
        }

        /* Custom cursor */
        .cursor {
          position: fixed;
          width: 12px;
          height: 12px;
          background: #ff0064;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: transform 0.1s ease;
        }

        /* Main content */
        .content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 2rem;
        }

        /* 404 Big number */
        .big-404 {
          font-family: 'Black Han Sans', sans-serif;
          font-size: clamp(120px, 25vw, 260px);
          line-height: 0.85;
          color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.1);
          position: relative;
          letter-spacing: -4px;
          user-select: none;
          transition: transform 0.1s ease-out;
        }

        /* Glitch layers */
        .big-404::before,
        .big-404::after {
          content: '404';
          position: absolute;
          inset: 0;
          font-family: 'Black Han Sans', sans-serif;
        }
        .big-404::before {
          color: #ff0064;
          clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
          transform: translateX(-4px);
          animation: glitch1 3s infinite;
          opacity: 0.8;
        }
        .big-404::after {
          color: #00f0ff;
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
          transform: translateX(4px);
          animation: glitch2 3s infinite;
          opacity: 0.8;
        }
        .big-404.glitching::before { animation: glitchActive1 0.2s steps(2) infinite; }
        .big-404.glitching::after  { animation: glitchActive2 0.2s steps(2) infinite; }

        @keyframes glitch1 {
          0%, 90%, 100% { transform: translateX(-4px); opacity: 0.8; }
          92% { transform: translateX(6px) skewX(10deg); opacity: 1; }
          94% { transform: translateX(-6px); opacity: 0.6; }
        }
        @keyframes glitch2 {
          0%, 90%, 100% { transform: translateX(4px); opacity: 0.8; }
          92% { transform: translateX(-6px) skewX(-10deg); opacity: 1; }
          94% { transform: translateX(6px); opacity: 0.6; }
        }
        @keyframes glitchActive1 {
          0% { transform: translateX(-10px) skewX(20deg); clip-path: polygon(0 20%, 100% 20%, 100% 45%, 0 45%); }
          50% { transform: translateX(10px) skewX(-10deg); clip-path: polygon(0 55%, 100% 55%, 100% 75%, 0 75%); }
        }
        @keyframes glitchActive2 {
          0% { transform: translateX(10px) skewX(-20deg); clip-path: polygon(0 50%, 100% 50%, 100% 70%, 0 70%); }
          50% { transform: translateX(-10px) skewX(10deg); clip-path: polygon(0 25%, 100% 25%, 100% 40%, 0 40%); }
        }

        /* Error label */
        .error-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .error-badge {
          background: #ff0064;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          padding: 4px 10px;
          text-transform: uppercase;
          animation: badgePulse 2s ease-in-out infinite;
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,0,100,0.5); }
          50% { box-shadow: 0 0 0 8px rgba(255,0,100,0); }
        }
        .error-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, #ff0064, transparent);
          width: 60px;
        }

        /* Title */
        .error-title {
          font-family: 'Space Mono', monospace;
          font-size: clamp(14px, 2.5vw, 20px);
          color: rgba(255,255,255,0.5);
          letter-spacing: 6px;
          text-transform: uppercase;
          margin-bottom: 2rem;
        }

        /* Typed text */
        .typed-text {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 2px;
          margin-bottom: 3rem;
        }
        .typed-text span {
          color: #00f0ff;
          border-right: 2px solid #00f0ff;
          animation: blink 0.8s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { border-color: #00f0ff; }
          50% { border-color: transparent; }
        }

        /* Button */
        .home-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 36px;
          background: transparent;
          border: 1px solid rgba(255,0,100,0.5);
          color: #fff;
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: none;
          overflow: hidden;
          transition: border-color 0.3s, color 0.3s;
        }
        .home-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #ff0064;
          transform: translateX(-110%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }
        .home-btn:hover::before { transform: translateX(0); }
        .home-btn:hover { border-color: #ff0064; }
        .home-btn span, .home-btn svg { position: relative; z-index: 1; }

        .btn-arrow {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        .home-btn:hover .btn-arrow { transform: translateX(4px); }

        /* Decorative corner brackets */
        .bracket {
          position: absolute;
          width: 30px;
          height: 30px;
          opacity: 0.3;
        }
        .bracket-tl { top: -20px; left: -20px; border-top: 2px solid #ff0064; border-left: 2px solid #ff0064; }
        .bracket-tr { top: -20px; right: -20px; border-top: 2px solid #ff0064; border-right: 2px solid #ff0064; }
        .bracket-bl { bottom: -20px; left: -20px; border-bottom: 2px solid #ff0064; border-left: 2px solid #ff0064; }
        .bracket-br { bottom: -20px; right: -20px; border-bottom: 2px solid #ff0064; border-right: 2px solid #ff0064; }

        /* Noise grain */
        .noise {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        /* Entrance animation */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .content > * {
          animation: fadeUp 0.8s ease forwards;
          opacity: 0;
        }
        .big-404      { animation-delay: 0.1s; }
        .error-label  { animation-delay: 0.3s; }
        .error-title  { animation-delay: 0.4s; }
        .typed-text   { animation-delay: 0.5s; }
        .btn-wrap     { animation-delay: 0.65s; }
      `}</style>

      {/* Custom cursor */}
      <div className="cursor" style={cursorStyle} />

      <div className="error-root">
        <div className="grid-bg" />
        <div className="scanlines" />
        <div className="noise" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="content">
          <div
            className={`big-404 ${glitchActive ? 'glitching' : ''}`}
            style={big404Style}
          >
            404
          </div>

          <div className="error-label">
            <div className="error-line" />
            <div className="error-badge">Error</div>
            <div className="error-line" style={errorLineRightStyle} />
          </div>

          <div className="error-title">Page Not Found</div>

          <div className="typed-text">
            The page you're looking for doesn't exist<span> </span>
          </div>

          <div className="btn-wrap" style={btnWrapStyle}>
            <div className="bracket bracket-tl" />
            <div className="bracket bracket-tr" />
            <div className="bracket bracket-bl" />
            <div className="bracket bracket-br" />
            <button
              className="home-btn"
              onClick={(): void => {
                navigate('/');
              }}
            >
              <span>Back to Home</span>
              <span className="btn-arrow">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
