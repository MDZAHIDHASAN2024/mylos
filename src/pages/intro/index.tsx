import { useEffect, useRef, useState } from 'react';
import { FaDownload, FaFilePdf, FaCheck } from 'react-icons/fa';
import profile from '../../assets/images/jahid.jpg';
import PageTitle from '../pageTitle/pageTitle';
import './index.css';

// ─── Types ────────────────────────────────────────────────────────────────────

interface InfoRow {
  label: string;
  value: string;
  icon: string;
}

interface StatItem {
  value: string;
  label: string;
}

type DownloadState = 'idle' | 'downloading' | 'done';

// ─── Data ─────────────────────────────────────────────────────────────────────

const INFO_ROWS: InfoRow[] = [
  { icon: '👤', label: 'নাম', value: 'MD. Zahid Hasan' },
  { icon: '👨', label: 'পিতার নাম', value: 'Md. Anwar Hossen' },
  { icon: '👩', label: 'মাতার নাম', value: 'Mst. Jamila Begum' },
  { icon: '🏡', label: 'গ্রাম', value: 'বেড়াগ্রাম (Beragram)' },
  { icon: '🏛️', label: 'থানা', value: 'সাঘাটা (Saghata)' },
  { icon: '📍', label: 'জেলা', value: 'গাইবান্ধা (Gaibandha)' },
  { icon: '🗺️', label: 'বিভাগ', value: 'রংপুর, বাংলাদেশ' },
  { icon: '📞', label: 'মোবাইল', value: '01745 94 00 65' },
];

const STATS: StatItem[] = [
  { value: '২০১৫', label: 'SSC পাশ' },
  { value: '২০১৭', label: 'HSC পাশ' },
  { value: '২০১৯', label: 'PRAN-RFL যোগ' },
  { value: '৪+৩', label: 'ভাই-বোন' },
];

const BIO = `আলহামদুলিল্লাহ আমি জন্ম সূত্রে একজন মুসলিম। আমরা ৪ ভাই ৩ বোন। আমার বাবা পেশায় একজন মাদ্রাসার শিক্ষক ছিলেন — তিনি অনেক ভালো মানুষ ছিলেন। ২২ সেপ্টেম্বর ২০১৫ সালে তিনি দুনিয়ার মায়া ত্যাগ করেন। আল্লাহ যেন তাকে জান্নাত দান করেন, আমিন।

আমাদের তেমন কোনো জায়গা-জমি ছিলো না, যেটুকু ছিলো তা ২০১১ সালে নদী গর্ভে চলে যায়। তবুও থেমে থাকিনি — ২০১৫ সালে SSC এবং ২০১৭ তে HSC পাশ করি। ২৮/০১/২০১৯ সালে প্রাণ-আর.এফ.এল. গ্রুপে চাকরিতে যোগ দিই।`;

// ─── Custom Hook ──────────────────────────────────────────────────────────────

function useReveal(): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect((): (() => void) => {
    const obs = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      obs.observe(ref.current);
    }

    return (): void => {
      obs.disconnect();
    };
  }, []);

  return [ref, visible];
}

// ─── Download CV Button ───────────────────────────────────────────────────────

const DownloadCV = (): React.ReactElement => {
  const [dlState, setDlState] = useState<DownloadState>('idle');

  const handleDownload = (): void => {
    setDlState('downloading');
    setTimeout((): void => {
      const link: HTMLAnchorElement = document.createElement('a');
      link.href = '/Zahid_CV.pdf'; // place PDF in /public folder
      link.download = 'Md_Zahid_Hasan_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDlState('done');
      setTimeout((): void => setDlState('idle'), 2500);
    }, 700);
  };

  const LABELS: Record<DownloadState, string> = {
    idle: 'Download CV',
    downloading: 'Preparing...',
    done: 'Downloaded!',
  };

  const ICONS: Record<DownloadState, React.ReactElement> = {
    idle: <FaDownload />,
    downloading: (
      <FaFilePdf style={{ animation: 'dcv-spin 0.8s linear infinite' }} />
    ),
    done: <FaCheck />,
  };

  const isDone: boolean = dlState === 'done';
  const isLoading: boolean = dlState === 'downloading';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        marginTop: 32,
      }}
    >
      <button
        onClick={handleDownload}
        disabled={dlState !== 'idle'}
        aria-label="Download Curriculum Vitae PDF"
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '13px 28px',
          borderRadius: 12,
          border: `1px solid ${isDone ? 'rgba(45,212,191,0.4)' : 'rgba(201,168,76,0.35)'}`,
          background: isDone
            ? 'rgba(45,212,191,0.08)'
            : 'rgba(201,168,76,0.10)',
          color: isDone ? '#2dd4bf' : '#e8c96a',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.4px',
          cursor: dlState !== 'idle' ? 'not-allowed' : 'pointer',
          transition: 'all 0.25s ease',
          overflow: 'hidden',
          boxShadow: isLoading ? 'none' : undefined,
        }}
      >
        {/* spinning ring while loading */}
        {isLoading && (
          <span
            style={{
              position: 'absolute',
              inset: -2,
              borderRadius: 13,
              border: '2px solid transparent',
              borderTopColor: '#c9a84c',
              animation: 'dcv-spin 0.9s linear infinite',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* icon */}
        <span style={{ fontSize: 15, flexShrink: 0, display: 'flex' }}>
          {ICONS[dlState]}
        </span>

        <span>{LABELS[dlState]}</span>

        {/* PDF badge */}
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '1.5px',
            padding: '2px 7px',
            borderRadius: 6,
            background: isDone
              ? 'rgba(45,212,191,0.1)'
              : 'rgba(201,168,76,0.15)',
            border: `1px solid ${isDone ? 'rgba(45,212,191,0.25)' : 'rgba(201,168,76,0.2)'}`,
            color: isDone ? '#2dd4bf' : '#c9a84c',
          }}
        >
          PDF
        </span>
      </button>

      <p
        style={{
          fontSize: 11,
          color: '#475569',
          letterSpacing: '0.5px',
          margin: 0,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Curriculum Vitae · Md. Zahid Hasan
      </p>

      {/* keyframes injected once */}
      <style>{`
        @keyframes dcv-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Intro = (): React.ReactElement => {
  const [heroRef, heroVisible] = useReveal();
  const [statsRef, statsVisible] = useReveal();
  const [bioRef, bioVisible] = useReveal();
  const [infoRef, infoVisible] = useReveal();
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  return (
    <div className="in-page">
      {/* ambient glows */}
      <div className="in-glow in-glow--1" />
      <div className="in-glow in-glow--2" />

      <div className="in-inner">
        <PageTitle title="Intro" subtitle="Intro" />

        {/* ══ HERO ══ */}
        <div
          ref={heroRef}
          className={`in-hero${heroVisible ? ' in-hero--visible' : ''}`}
        >
          {/* avatar */}
          <div className="in-avatar-wrap">
            <div className="in-avatar-ring" />
            <div className="in-avatar-ring in-avatar-ring--2" />
            <img
              src={profile}
              alt="MD. Zahid Hasan"
              className={`in-avatar${imgLoaded ? ' in-avatar--loaded' : ''}`}
              onLoad={(): void => setImgLoaded(true)}
            />
            <div className="in-avatar-badge">🕌</div>
          </div>

          {/* name & tags */}
          <div className="in-hero__info">
            <p className="in-hero__eyebrow">— Personal Introduction</p>
            <h1 className="in-hero__name">
              MD. Zahid
              <br />
              <span>Hasan</span>
            </h1>
            <div className="in-hero__tags">
              <span className="in-tag">🇧🇩 বাংলাদেশ</span>
              <span className="in-tag">☪️ মুসলিম</span>
              <span className="in-tag">💼 PRAN-RFL</span>
            </div>

            {/* ══ CV DOWNLOAD BUTTON (inside hero) ══ */}
            <DownloadCV />
          </div>
        </div>

        {/* ══ STATS ══ */}
        <div
          ref={statsRef}
          className={`in-stats${statsVisible ? ' in-stats--visible' : ''}`}
        >
          {STATS.map((s: StatItem, i: number) => (
            <div
              key={s.label}
              className="in-stat"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className="in-stat__val">{s.value}</span>
              <span className="in-stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ══ BIO ══ */}
        <div
          ref={bioRef}
          className={`in-bio${bioVisible ? ' in-bio--visible' : ''}`}
        >
          <div className="in-section-label">
            <span className="in-section-label__line" />
            <span>জীবন কথা</span>
            <span className="in-section-label__line" />
          </div>
          <div className="in-bio__card">
            <span className="in-bio__quote">"</span>
            {BIO.split('\n\n').map((para: string, i: number) => (
              <p key={i} className="in-bio__para">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* ══ INFO TABLE ══ */}
        <div
          ref={infoRef}
          className={`in-info${infoVisible ? ' in-info--visible' : ''}`}
        >
          <div className="in-section-label">
            <span className="in-section-label__line" />
            <span>ব্যক্তিগত তথ্য</span>
            <span className="in-section-label__line" />
          </div>
          <div className="in-info__grid">
            {INFO_ROWS.map((row: InfoRow, i: number) => (
              <div
                key={row.label}
                className="in-info__row"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <span className="in-info__icon">{row.icon}</span>
                <span className="in-info__label">{row.label}</span>
                <span className="in-info__value">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ DUA ══ */}
        <div className="in-dua">
          <p className="in-dua__arabic">رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ</p>
          <p className="in-dua__bangla">
            হে আল্লাহ! আমাকে ও আমার পিতা-মাতাকে ক্ষমা করুন — আমিন
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
