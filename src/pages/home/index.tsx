import { useState, useEffect, useRef, useCallback } from 'react';
import myAudio from '../../assets/audio/my-heart.mp3';
import PageTitle from '../pageTitle/pageTitle';

// ─── Types ──────────────────────────────────────────────────────────────────
interface Ayat {
  id: number;
  ayatNo: string;
  arabic: string;
  bangla: string;
  startTime: number;
}

interface Quote {
  text: string;
  ref: string;
}

type Section = 'all' | 'jahannam' | 'jannat';

// ─── Data ────────────────────────────────────────────────────────────────────
const data: Ayat[] = [
  {
    id: 1,
    ayatNo: '40',
    startTime: 0,
    arabic: 'إِنَّ يَوْمَ الْفَصْلِ مِيقَاتُهُمْ أَجْمَعِينَ',
    bangla: 'নিশ্চয় ফয়সালার দিন তাদের সবারই নির্ধারিত সময়।',
  },
  {
    id: 2,
    ayatNo: '41',
    startTime: 7.8,
    arabic:
      'يَوْمَ لَا يُغْنِي مَوْلًى عَن مَّوْلًى شَيْئًا وَلَا هُمْ يُنصَرُونَ',
    bangla:
      'যেদিন কোন বন্ধুই কোন বন্ধুর উপকারে আসবে না এবং তারা সাহায্যপ্রাপ্তও হবে না।',
  },
  {
    id: 3,
    ayatNo: '42',
    startTime: 22.31,
    arabic: 'إِلَّا مَن رَّحِمَ اللَّهُ ۚ إِنَّهُ هُوَ الْعَزِيزُ الرَّحِيمُ',
    bangla:
      'তবে আল্লাহ যার প্রতি দয়া করেন, তার কথা ভিন্ন। নিশ্চয় তিনি পরাক্রমশালী দয়াময়।',
  },
  {
    id: 4,
    ayatNo: '43',
    startTime: 34.95,
    arabic: 'إِنَّ شَجَرَتَ الزَّقُّومِ',
    bangla: 'নিশ্চয় যাক্কুম বৃক্ষ',
  },
  {
    id: 5,
    ayatNo: '44',
    startTime: 38.87,
    arabic: 'طَعَامُ الْأَثِيمِ',
    bangla: 'পাপীর খাদ্য হবে',
  },
  {
    id: 6,
    ayatNo: '45',
    startTime: 42.65,
    arabic: 'كَالْمُهْلِ يَغْلِي فِي الْبُطُونِ',
    bangla: 'গলিত তাম্রের মত পেটে ফুটতে থাকবে।',
  },
  {
    id: 7,
    ayatNo: '46',
    startTime: 49.27,
    arabic: 'كَغَلْيِ الْحَمِيمِ',
    bangla: 'যেমন ফুটে পানি।',
  },
  {
    id: 8,
    ayatNo: '47',
    startTime: 53.92,
    arabic: 'خُذُوهُ فَاعْتِلُوهُ إِلَىٰ سَوَاءِ الْجَحِيمِ',
    bangla: 'একে ধর এবং টেনে নিয়ে যাও জাহান্নামের মধ্যস্থলে,',
  },
  {
    id: 9,
    ayatNo: '48',
    startTime: 62.22,
    arabic: 'ثُمَّ صُبُّوا فَوْقَ رَأْسِهِ مِنْ عَذَابِ الْحَمِيمِ',
    bangla: 'অতঃপর তার মাথার উপর ফুটন্ত পানির আযাব ঢেলে দাও',
  },
  {
    id: 10,
    ayatNo: '49',
    startTime: 70.86,
    arabic: 'ذُقْ إِنَّكَ أَنتَ الْعَزِيزُ الْكَرِيمُ',
    bangla: 'স্বাদ গ্রহণ কর, তুমি তো সম্মানিত, সম্ভ্রান্ত।',
  },
  {
    id: 11,
    ayatNo: '50',
    startTime: 79.93,
    arabic: 'إِنَّ هَـٰذَا مَا كُنتُم بِهِ تَمْتَرُونَ',
    bangla: 'এ সম্পর্কে তোমরা সন্দেহে পতিত ছিলে।',
  },
  {
    id: 12,
    ayatNo: '51',
    startTime: 89.43,
    arabic: 'إِنَّ الْمُتَّقِينَ فِي مَقَامٍ أَمِينٍ',
    bangla: 'নিশ্চয়ই মুত্তাকীরা থাকবে নিরাপদ স্থানে,',
  },
  {
    id: 13,
    ayatNo: '52',
    startTime: 98.33,
    arabic: 'فِي جَنَّاتٍ وَعُيُونٍ',
    bangla: 'বাগান আর ঝরণার মাঝে',
  },
  {
    id: 14,
    ayatNo: '53',
    startTime: 106.63,
    arabic: 'يَلْبَسُونَ مِن سُندُسٍ وَإِسْتَبْرَقٍ مُّتَقَابِلِينَ',
    bangla: 'তারা পরিধান করবে পাতলা ও পুরু রেশমী কাপড়, আর বসবে মুখোমুখী হয়ে।',
  },
  {
    id: 15,
    ayatNo: '54',
    startTime: 125.7,
    arabic: 'كَذَٰلِكَ وَزَوَّجْنَاهُم بِحُورٍ عِينٍ',
    bangla:
      'এ রকমই হবে, আর তাদের বিয়ে দিয়ে দেব ডাগর ডাগর সুন্দর উজ্জ্বল চোখওয়ালা কুমারীদের সাথে।',
  },
  {
    id: 16,
    ayatNo: '55',
    startTime: 133.61,
    arabic: 'يَدْعُونَ فِيهَا بِكُلِّ فَاكِهَةٍ آمِنِينَ',
    bangla: 'তারা সেখানে শান্ত মনে বিভিন্ন ফল-মূল আনতে বলবে।',
  },
  {
    id: 17,
    ayatNo: '56',
    startTime: 141.1,
    arabic:
      'لَا يَذُوقُونَ فِيهَا الْمَوْتَ إِلَّا الْمَوْتَةَ الْأُولَىٰ ۖ وَوَقَاهُمْ عَذَابَ الْجَحِيمِ',
    bangla:
      'তারা সেখানে মৃত্যু আস্বাদন করবে না, প্রথম মৃত্যু ব্যতীত এবং আল্লাহ তাদেরকে জাহান্নামের আযাব থেকে রক্ষা করবেন।',
  },
  {
    id: 18,
    ayatNo: '57',
    startTime: 153.23,
    arabic: 'فَضْلًا مِّن رَّبِّكَ ۚ ذَٰلِكَ هُوَ الْفَوْزُ الْعَظِيمُ',
    bangla: 'আপনার পালনকর্তার কৃপায় এটাই মহা সাফল্য।',
  },
  {
    id: 19,
    ayatNo: '58',
    startTime: 164.19,
    arabic: 'فَإِنَّمَا يَسَّرْنَاهُ بِلِسَانِكَ لَعَلَّهُمْ يَتَذَكَّرُونَ',
    bangla: 'আমি আপনার ভাষায় কোরআনকে সহজ করে দিয়েছি, যাতে তারা স্মরণ রাখে।',
  },
  {
    id: 20,
    ayatNo: '59',
    startTime: 174.15,
    arabic: 'فَارْتَقِبْ إِنَّهُم مُّرْتَقِبُونَ',
    bangla: 'অতএব, আপনি অপেক্ষা করুন, তারাও অপেক্ষা করছে।',
  },
];

const quotes: Quote[] = [
  {
    text: 'এই পার্থিব জীবণ খেল-তামাশা ব্যতীত কিছুই নয়!',
    ref: 'সুরা আনকাবুত (২৯:৬৪)',
  },
  {
    text: 'জাহান্নামকে প্রবৃত্তি এবং জান্নাত কষ্ট দ্বারা পরিবেষ্টন করা হয়েছে!',
    ref: 'বুখারী-মুসলিম ২৮২২',
  },
  {
    text: 'দুনিয়াতে এমনভাবে জীবণ-যাপন করো যেন তুমি একজন অপরিচিত মুসাফির!',
    ref: 'মিশকাত ৫২৭৪',
  },
];

// ─── Style helpers ────────────────────────────────────────────────────────────
const navBtnStyle = (active: boolean, color: string): React.CSSProperties => ({
  padding: '8px 20px',
  borderRadius: 24,
  border: `1px solid ${active ? color : 'rgba(255,255,255,0.1)'}`,
  background: active ? `${color}22` : 'transparent',
  color: active ? color : '#8a8a8a',
  cursor: 'pointer',
  fontSize: 13,
  letterSpacing: 1,
  transition: 'all 0.3s ease',
  fontFamily: 'inherit',
});

const actionBtnStyle = (color: string): React.CSSProperties => ({
  padding: '5px 14px',
  borderRadius: 20,
  border: `1px solid ${color}44`,
  background: `${color}11`,
  color,
  cursor: 'pointer',
  fontSize: 12,
  letterSpacing: 1,
  fontFamily: 'inherit',
  transition: 'all 0.2s',
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getActiveIdFromTime = (time: number): number => {
  let active = data[0].id;
  for (let i = 0; i < data.length; i++) {
    if (time >= data[i].startTime) active = data[i].id;
    else break;
  }
  return active;
};

const fmtTime = (s: number): string => {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

// ─── AudioPlayer ──────────────────────────────────────────────────────────────
interface AudioPlayerProps {
  src: string;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  onTimeUpdate: (time: number) => void;
}

const AudioPlayer = ({ src, audioRef, onTimeUpdate }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlay = (): void => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) a.pause();
    else a.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (): void => {
    const a = audioRef.current;
    if (!a) return;
    setCurrentTime(a.currentTime);
    onTimeUpdate(a.currentTime);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const a = audioRef.current;
    if (!a) return;
    const val = Number(e.target.value);
    a.currentTime = val;
    setCurrentTime(val);
    onTimeUpdate(val);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const a = audioRef.current;
    if (!a) return;
    const val = Number(e.target.value);
    a.volume = val;
    setVolume(val);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(212,175,55,0.2)',
        borderRadius: 14,
        padding: '16px 20px',
        marginBottom: 24,
      }}
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      {/* Row 1: play + info + time */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginBottom: 12,
        }}
      >
        <button
          onClick={togglePlay}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '1px solid rgba(212,175,55,0.4)',
            background: 'rgba(212,175,55,0.12)',
            color: '#d4af37',
            cursor: 'pointer',
            fontSize: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: '#d4af37',
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 2,
            }}
          >
            🎵 সূরা আদ-দুখান তিলাওয়াত
          </div>
          <div style={{ color: '#666', fontSize: 11 }}>
            অডিও চললে আয়াত স্বয়ংক্রিয়ভাবে হাইলাইট ও স্ক্রল হবে
          </div>
        </div>
        <div
          style={{
            color: '#888',
            fontSize: 12,
            fontVariantNumeric: 'tabular-nums',
            flexShrink: 0,
          }}
        >
          {fmtTime(currentTime)} / {fmtTime(duration)}
        </div>
      </div>
      {/* Progress bar */}
      <div style={{ position: 'relative', marginBottom: 10 }}>
        <div
          style={{
            height: 4,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #d4af37, #f0c860)',
              borderRadius: 2,
              transition: 'width 0.3s',
            }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            cursor: 'pointer',
            width: '100%',
          }}
        />
      </div>
      {/* Volume */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14 }}>
          {volume === 0 ? '🔇' : volume < 0.5 ? '🔈' : '🔊'}
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolume}
          style={{ width: 80, cursor: 'pointer' }}
        />
        <span style={{ color: '#666', fontSize: 11 }}>
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Home = () => {
  const [search, setSearch] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('all');
  const [manualAyat, setManualAyat] = useState<number | null>(null);
  const [audioActiveId, setAudioActiveId] = useState<number | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [copied, setCopied] = useState<number | null>(null);
  const [visibleAyats, setVisibleAyats] = useState<Record<number, boolean>>({});
  const [jahannamHover, setJahannamHover] = useState(false);
  const [jannatHover, setJannatHover] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const ayatRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Auto-rotate quotes
  useEffect(() => {
    const t = setInterval(
      () => setQuoteIdx((i) => (i + 1) % quotes.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);

  // Scroll-reveal observer
  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = Number((e.target as HTMLElement).dataset.id);
            setVisibleAyats((prev) => ({ ...prev, [id]: true }));
          }
        }),
      { threshold: 0.05 },
    );
    document
      .querySelectorAll('[data-id]')
      .forEach((c) => observerRef.current!.observe(c));
    return () => observerRef.current?.disconnect();
  }, [search, activeSection]);

  // Track audio play/pause
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = (): void => setIsAudioPlaying(true);
    const onPause = (): void => setIsAudioPlaying(false);
    const onEnded = (): void => {
      setIsAudioPlaying(false);
      setAudioActiveId(null);
    };
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('ended', onEnded);
    return () => {
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('ended', onEnded);
    };
  }, []);

  // Time → active ayat + auto-scroll
  const handleTimeUpdate = useCallback((time: number) => {
    const newId = getActiveIdFromTime(time);
    setAudioActiveId((prev) => {
      if (prev === newId) return prev;
      ayatRefs.current[newId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return newId;
    });
  }, []);

  // Click on ayat card → seek audio
  const handleAyatClick = (item: Ayat): void => {
    if (!isAudioPlaying) {
      setManualAyat((prev) => (prev === item.id ? null : item.id));
    }
    const a = audioRef.current;
    if (a) {
      a.currentTime = item.startTime;
      handleTimeUpdate(item.startTime);
      if (a.paused) a.play();
    }
  };

  const activeId = isAudioPlaying ? audioActiveId : manualAyat;

  const filtered: Ayat[] = data.filter((item) => {
    const n = parseInt(item.ayatNo, 10);
    const matchSearch =
      search === '' ||
      item.ayatNo.includes(search) ||
      item.bangla.includes(search) ||
      item.arabic.includes(search);
    const matchSection =
      activeSection === 'all' ||
      (activeSection === 'jahannam' && n <= 50) ||
      (activeSection === 'jannat' && n >= 51);
    return matchSearch && matchSection;
  });

  const handleCopy = (text: string, id: number): void => {
    navigator.clipboard.writeText(text).catch(console.error);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(160deg, #0a0a0f 0%, #0d1117 50%, #0a0a0f 100%)',
        color: '#e8e8e8',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        padding: '0 0 60px',
      }}
    >
      <PageTitle title="Home" subtitle="Home" />
      {/* Background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '5%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(100,150,255,0.03) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── FLOATING SIDE BUTTONS ── */}
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; text-shadow: 0 0 8px rgba(255,80,40,0.8); }
          50% { opacity: 0.85; text-shadow: 0 0 16px rgba(255,80,40,1); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 12px rgba(40,200,100,0.3); }
          50% { box-shadow: 0 0 24px rgba(40,200,100,0.55); }
        }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.1); } 50% { box-shadow: 0 0 20px 4px rgba(212,175,55,0.12); } }
        @keyframes soundBar { from { opacity: 0.4; } to { opacity: 1; } }
      `}</style>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 720,
          margin: '0 auto',
          padding: '0 16px',
        }}
      >
        {/* ── HEADER ── */}
        <div style={{ textAlign: 'center', padding: '48px 0 32px' }}>
          <div
            style={{
              fontSize: 13,
              letterSpacing: 4,
              color: '#888',
              marginBottom: 16,
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              marginBottom: 8,
            }}
          >
            {/* বাম — জাহান্নাম */}
            <button
              onClick={() => (window.location.href = '/jahannam')}
              onMouseEnter={() => setJahannamHover(true)}
              onMouseLeave={() => setJahannamHover(false)}
              style={{
                padding: '4px 10px',
                borderRadius: 16,
                border: '1px solid rgba(220,80,40,0.5)',
                background: jahannamHover
                  ? 'rgba(220,60,20,0.28)'
                  : 'rgba(180,40,10,0.12)',
                color: jahannamHover ? '#ff9977' : '#ff6644',
                cursor: 'pointer',
                fontSize: 13,
                letterSpacing: 0.5,
                fontFamily: 'inherit',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                animation: 'glow 3s ease-in-out infinite',
              }}
            >
              🔥 জাহান্নাম দেখো
            </button>

            {/* মাঝে — Surah */}
            <div
              style={{
                fontSize: 11,
                letterSpacing: 6,
                color: '#555',
                textTransform: 'uppercase',
              }}
            >
              Surah
            </div>

            {/* ডান — জান্নাত */}
            <button
              onClick={() => (window.location.href = '/jannat')}
              onMouseEnter={() => setJannatHover(true)}
              onMouseLeave={() => setJannatHover(false)}
              style={{
                padding: '4px 10px',
                borderRadius: 16,
                border: '1px solid rgba(40,180,80,0.5)',
                background: jannatHover
                  ? 'rgba(20,160,70,0.28)'
                  : 'rgba(10,130,55,0.12)',
                color: jannatHover ? '#77ffbb' : '#44ee88',
                cursor: 'pointer',
                fontSize: 13,
                letterSpacing: 0.5,
                fontFamily: 'inherit',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                animation: 'glow 3s ease-in-out infinite',
              }}
            >
              🌿 জান্নাত দেখো
            </button>
          </div>
          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 42px)',
              fontWeight: 300,
              color: '#d4af37',
              margin: '0 0 8px',
              letterSpacing: 2,
            }}
          >
            الدُّخَان — Ad-Dukhan
          </h1>
          <div style={{ fontSize: 13, color: '#666', letterSpacing: 2 }}>
            আয়াত ৪০ – ৫৯
          </div>
          <div
            style={{
              width: 60,
              height: 1,
              background:
                'linear-gradient(90deg, transparent, #d4af37, transparent)',
              margin: '20px auto 0',
            }}
          />
        </div>

        {/* ── AUDIO PLAYER ── */}
        <AudioPlayer
          src={myAudio}
          audioRef={audioRef}
          onTimeUpdate={handleTimeUpdate}
        />

        {/* Now-playing banner */}
        {isAudioPlaying && audioActiveId && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(212,175,55,0.06)',
              border: '1px solid rgba(212,175,55,0.15)',
              borderRadius: 10,
              padding: '10px 16px',
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 2,
                height: 20,
              }}
            >
              {[0.5, 1, 0.7, 0.9, 0.4, 1, 0.6].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: 3,
                    borderRadius: 2,
                    background: '#d4af37',
                    height: `${h * 100}%`,
                    animation: `soundBar 0.8s ease-in-out ${i * 0.1}s infinite alternate`,
                  }}
                />
              ))}
            </div>
            <div>
              <div style={{ color: '#d4af37', fontSize: 13, fontWeight: 500 }}>
                এখন পড়া হচ্ছে — আয়াত{' '}
                {data.find((d) => d.id === audioActiveId)?.ayatNo}
              </div>
              <div style={{ color: '#666', fontSize: 11, marginTop: 2 }}>
                যেকোনো আয়াতে ক্লিক করলে সেখান থেকে শুরু হবে
              </div>
            </div>
          </div>
        )}

        {/* ── ROTATING QUOTE ── */}
        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(212,175,55,0.12)',
            borderRadius: 12,
            padding: '20px 24px',
            marginBottom: 28,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: 'rgba(212,175,55,0.3)',
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            "
          </div>
          <div
            style={{
              fontSize: 15,
              color: '#ccc',
              lineHeight: 1.7,
              marginBottom: 8,
              minHeight: 48,
            }}
          >
            {quotes[quoteIdx].text}
          </div>
          <div style={{ fontSize: 11, color: '#666', letterSpacing: 1 }}>
            {quotes[quoteIdx].ref}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 6,
              marginTop: 14,
            }}
          >
            {quotes.map((_, i) => (
              <div
                key={i}
                onClick={() => setQuoteIdx(i)}
                style={{
                  width: i === quoteIdx ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background:
                    i === quoteIdx ? '#d4af37' : 'rgba(212,175,55,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── NAV FILTER ── */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 20,
            flexWrap: 'wrap',
          }}
        >
          {(
            [
              { key: 'all', label: '🌟 সকল আয়াত', color: '#d4af37' },
              {
                key: 'jahannam',
                label: '🔥 জাহান্নাম (৪০–৫০)',
                color: '#e05020',
              },
              { key: 'jannat', label: '🌿 জান্নাত (৫১–৫৯)', color: '#20a060' },
            ] as { key: Section; label: string; color: string }[]
          ).map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              style={navBtnStyle(activeSection === key, color)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── SEARCH ── */}
        <div style={{ position: 'relative', marginBottom: 8 }}>
          <span
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#555',
              fontSize: 14,
            }}
          >
            🔍
          </span>
          <input
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="আয়াত নম্বর বা বাংলা শব্দ দিয়ে খুঁজুন..."
            style={{
              width: '100%',
              padding: '11px 40px 11px 42px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              color: '#ddd',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#555',
                cursor: 'pointer',
                fontSize: 16,
              }}
            >
              ✕
            </button>
          )}
        </div>
        <div
          style={{
            color: '#555',
            fontSize: 12,
            marginBottom: 16,
            textAlign: 'right',
          }}
        >
          {filtered.length} টি আয়াত পাওয়া গেছে
        </div>

        {/* ── AYAT LIST ── */}
        {filtered.map((item) => {
          const n = parseInt(item.ayatNo, 10);
          const isJahannam = n <= 50;
          const isActive = activeId === item.id;
          const isVisible = visibleAyats[item.id] ?? false;
          const accentColor = isJahannam ? '#ff5533' : '#33cc77';
          const borderColor = isJahannam
            ? 'rgba(220,80,40,0.55)'
            : 'rgba(40,180,80,0.55)';
          const bgActive = isJahannam
            ? 'linear-gradient(135deg, rgba(220,60,20,0.16), rgba(100,20,5,0.10))'
            : 'linear-gradient(135deg, rgba(20,160,70,0.16), rgba(5,80,30,0.10))';

          return (
            <div
              key={item.id}
              data-id={item.id}
              ref={(el) => {
                ayatRefs.current[item.id] = el;
              }}
              onClick={() => handleAyatClick(item)}
              style={{
                background: isActive ? bgActive : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isActive ? borderColor : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 12,
                padding: '20px 24px',
                marginBottom: 12,
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                position: 'relative',
                overflow: 'hidden',
                animation:
                  isActive && isAudioPlaying
                    ? 'pulse 2s ease-in-out infinite'
                    : 'none',
              }}
            >
              {/* Color strip bg */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: isActive
                    ? `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
                    : 'transparent',
                  transition: 'all 0.3s',
                }}
              />

              {/* Left accent bar when active */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: accentColor,
                    borderRadius: '12px 0 0 12px',
                  }}
                />
              )}

              {/* Ayat badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: `1px solid ${isActive ? accentColor + '66' : 'rgba(255,255,255,0.1)'}`,
                  background: isActive
                    ? `${accentColor}11`
                    : 'rgba(255,255,255,0.02)',
                  color: isActive ? accentColor : '#888',
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 14,
                  transition: 'all 0.3s',
                }}
              >
                {item.ayatNo}
              </div>

              {/* Arabic */}
              <div
                style={{
                  fontSize: 'clamp(18px, 3vw, 24px)',
                  lineHeight: 1.8,
                  color: isActive ? '#fff' : '#ddd',
                  direction: 'rtl',
                  textAlign: 'right',
                  marginBottom: 12,
                  fontFamily: "'Scheherazade New', 'Traditional Arabic', serif",
                  transition: 'color 0.3s',
                }}
              >
                {item.arabic}
              </div>

              {/* Bangla */}
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: isActive ? '#bbb' : '#777',
                  transition: 'color 0.3s',
                }}
              >
                {item.bangla}
              </div>

              {/* Playing indicator */}
              {isActive && isAudioPlaying && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: accentColor,
                      animation: 'pulse 1s infinite',
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      color: accentColor,
                      letterSpacing: 1,
                    }}
                  >
                    ● এখন তিলাওয়াত হচ্ছে
                  </span>
                </div>
              )}

              {/* Manual expand — copy + tag */}
              {isActive && !isAudioPlaying && (
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    marginTop: 12,
                    alignItems: 'center',
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(`${item.arabic}\n${item.bangla}`, item.id);
                    }}
                    style={actionBtnStyle('#d4af37')}
                  >
                    {copied === item.id ? '✓ কপি হয়েছে' : 'কপি করুন'}
                  </button>
                  <span style={{ fontSize: 11, color: accentColor + 'aa' }}>
                    {isJahannam ? '🔥 জাহান্নামের আয়াত' : '🌿 জান্নাতের আয়াত'}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div
            style={{ textAlign: 'center', padding: '60px 20px', color: '#444' }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>☽</div>
            <div style={{ fontSize: 14 }}>কোনো আয়াত পাওয়া যায়নি</div>
          </div>
        )}

        {/* ── DATE SECTION ── */}
        <div style={{ marginTop: 32 }}>
          <button
            onClick={() => setShowDate(!showDate)}
            style={{
              ...actionBtnStyle('#888'),
              width: '100%',
              padding: '10px',
              marginBottom: showDate ? 12 : 0,
            }}
          >
            {showDate ? '📅 তারিখ লুকান' : '📅 অ্যাপ শুরুর তারিখ দেখুন'}
          </button>
          {showDate && (
            <div
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12,
                padding: '16px 20px',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 3,
                  color: '#555',
                  marginBottom: 14,
                  textTransform: 'uppercase',
                }}
              >
                শুরুর তারিখ
              </div>
              {(
                [
                  { label: 'English', value: '13/03/2026', icon: '🌍' },
                  {
                    label: 'Bangla (Bangladesh)',
                    value: '28/11/1432',
                    icon: '🇧🇩',
                  },
                  {
                    label: 'Hijri (Saudi Arabia)',
                    value: '23/09/1447',
                    icon: '🇸🇦',
                  },
                  { label: 'Friday' },
                ] as { label: string; value: string; icon: string }[]
              ).map(({ label, value, icon }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{icon}</span>
                  <span style={{ color: '#666', fontSize: 12, width: 60 }}>
                    {label}
                  </span>
                  <span style={{ color: '#aaa', fontSize: 14 }}>{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        <div
          style={{ textAlign: 'center', padding: '48px 0 20px', color: '#333' }}
        >
          <div style={{ fontSize: 16, letterSpacing: 8, marginBottom: 10 }}>
            ❖ ✦ ❖
          </div>
          <div
            style={{
              fontSize: 10,
              letterSpacing: 4,
              marginBottom: 6,
              textTransform: 'uppercase',
            }}
          >
            SURA AD-DUKHAN · AYAT 40–59
          </div>
          <div style={{ fontSize: 18, color: '#2a2a2a' }}>سورة الدخان</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
