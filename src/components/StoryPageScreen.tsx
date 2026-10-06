import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  ChevronLeft,
  ChevronRight,
  Mic,
  Square,
  Play,
  Sparkles,
  BookOpen,
  Home,
  CheckCircle2,
  RotateCcw,
  Lock,
} from 'lucide-react';
import { StoryPage } from '../types';
import { StoryIllustration } from './StoryIllustrations';
import { PenguinPoco } from './PenguinPoco';
import { soundManager, speakText, stopSpeech } from '../utils/audio';
import { useVoiceRecorder } from '../utils/useVoiceRecorder';

interface StoryPageScreenProps {
  page: StoryPage;
  totalPages: number;
  isPainted: boolean;
  onPaint: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onGoHome: () => void;
  onOpenWordbook: () => void;
  isSlowAudio: boolean;
  onToggleSlowAudio: () => void;
  savedAudioUrl?: string | null;
  onSaveAudioUrl: (pageId: number, url: string | null) => void;
}

export const StoryPageScreen: React.FC<StoryPageScreenProps> = ({
  page,
  totalPages,
  isPainted,
  onPaint,
  onPrevPage,
  onNextPage,
  onGoHome,
  onOpenWordbook,
  isSlowAudio,
  onToggleSlowAudio,
  savedAudioUrl,
  onSaveAudioUrl,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const [showKoreanTranslation, setShowKoreanTranslation] = useState(true);
  const [justPaintedCelebration, setJustPaintedCelebration] = useState(false);
  const [showPaintFirstHint, setShowPaintFirstHint] = useState(false);

  const recorder = useVoiceRecorder(savedAudioUrl);

  // Sync recorder url with parent
  useEffect(() => {
    if (recorder.audioUrl && recorder.audioUrl !== savedAudioUrl) {
      onSaveAudioUrl(page.id, recorder.audioUrl);
    }
  }, [recorder.audioUrl, page.id, savedAudioUrl, onSaveAudioUrl]);

  // Read story aloud
  const handleReadAloud = (customText?: string) => {
    stopSpeech();
    setIsPlayingAudio(true);
    setActiveWordIndex(0);

    const textToRead = customText || page.storyEn;
    speakText(textToRead, {
      isSlow: isSlowAudio,
      onWordIndex: (idx) => {
        setActiveWordIndex(idx);
      },
      onEnd: () => {
        setIsPlayingAudio(false);
        setActiveWordIndex(null);
      },
    });
  };

  // Auto-read on page enter
  const hasReadInitialRef = useRef(false);
  useEffect(() => {
    hasReadInitialRef.current = false;
    stopSpeech();
    recorder.stopPlayback();

    const timer = setTimeout(() => {
      handleReadAloud();
      hasReadInitialRef.current = true;
    }, 400);

    return () => {
      clearTimeout(timer);
      stopSpeech();
    };
  }, [page.id]);

  const handlePaintItem = () => {
    if (isPainted) return;

    soundManager.playSparkleSound();
    soundManager.playColorFillSound();
    onPaint();
    setJustPaintedCelebration(true);

    // Speak the target word with emphasis!
    setTimeout(() => {
      handleReadAloud(`${page.targetWord}! ${page.targetItemName}!`);
    }, 300);

    setTimeout(() => {
      setJustPaintedCelebration(false);
    }, 2500);
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-between max-w-4xl mx-auto px-3 sm:px-4 py-3 select-none">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-2 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              stopSpeech();
              onGoHome();
            }}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-sm border border-amber-200 flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
            title="처음으로"
          >
            <Home className="w-5 h-5 text-amber-700" />
          </button>

          {/* Page Indicators (1 / 6) */}
          <div className="flex items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-full border border-amber-200 shadow-sm">
            <span className="text-xs sm:text-sm font-extrabold text-slate-800">
              {page.id} / {totalPages}
            </span>
            <div className="flex items-center gap-1 ml-1">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx + 1 === page.id
                      ? 'w-5 bg-amber-500 shadow-sm'
                      : idx + 1 < page.id
                      ? 'bg-emerald-400'
                      : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Wordbook & Target Color Badge */}
        <div className="flex items-center gap-2">
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-sm border"
            style={{
              backgroundColor: `${page.targetColorHex}15`,
              borderColor: `${page.targetColorHex}50`,
              color: page.targetColorHex,
            }}
          >
            <span
              className="w-3 h-3 rounded-full shadow-sm"
              style={{ backgroundColor: page.targetColorHex }}
            />
            <span>{page.targetColorName}</span>
          </div>

          <button
            onClick={() => {
              stopSpeech();
              onOpenWordbook();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white/90 hover:bg-white text-indigo-700 border border-indigo-200 shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span className="hidden xs:inline">나만의 단어장</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative my-auto">
        <StoryIllustration
          pageId={page.id}
          isPainted={isPainted}
          onPaint={handlePaintItem}
        />

        {/* Poco mascot standing in bottom corner */}
        <div className="absolute -bottom-3 left-2 sm:left-4 z-20 pointer-events-none drop-shadow-md">
          <PenguinPoco
            size="md"
            brushColor={page.targetColorHex}
            isPainting={!isPainted}
            mood={isPainted ? 'excited' : 'happy'}
          />
        </div>

        {/* Paint Celebration Popup */}
        <AnimatePresence>
          {justPaintedCelebration && (
            <motion.div
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-8 right-6 z-30 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-xl border-3 border-emerald-400 flex items-center gap-2"
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-500 animate-bounce" />
              <div>
                <p className="text-sm font-black text-slate-800">
                  {page.targetWord}! ✨
                </p>
                <p className="text-xs font-bold text-emerald-600">
                  색칠 성공! 멋져요!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtitle & Word-by-Word Highlight Bar */}
      <div className="my-3 bg-white/95 rounded-2xl p-4 sm:p-5 shadow-md border-2 border-amber-200 text-center relative overflow-hidden">
        {/* Sentence with Word Highlighting & Emphasized Color and Object words */}
        <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-wide font-['Fredoka',sans-serif] flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          {page.speechTokens.map((token, idx) => {
            const isHighlight = isPlayingAudio && activeWordIndex === idx;
            const cleanToken = token.toLowerCase().replace(/[^a-z]/g, '');
            const isColorWord = cleanToken === page.colorWordKey.toLowerCase();
            const isObjectWord = cleanToken === page.objectWordKey.toLowerCase();

            let tokenClasses = 'transition-all duration-200 px-1 py-0.5 rounded-lg';
            const tokenStyle: React.CSSProperties = {};

            if (isColorWord) {
              // 1. 색깔을 의미하는 단어: 각 단어의 뜻에 맞게 색칠 + 밑줄 유지
              tokenClasses += ' underline decoration-[3.5px] underline-offset-[6px] decoration-current font-black';
              tokenStyle.color = page.targetColorHex;
            } else if (isObjectWord) {
              // 2. 색깔 별로 해당하는 물체 단어: 색깔에 맞게 글자 색깔 + 밑줄 유지 (ex. apple -> 빨간색으로 apple)
              tokenClasses += ' underline decoration-[3.5px] underline-offset-[6px] decoration-current font-black';
              tokenStyle.color = page.targetColorHex;
            } else {
              tokenClasses += ' text-slate-800';
            }

            if (isHighlight) {
              tokenClasses += ' bg-amber-300 !text-amber-950 scale-105 shadow-sm';
            }

            return (
              <span
                key={idx}
                className={tokenClasses}
                style={tokenStyle}
              >
                {token}
              </span>
            );
          })}
        </div>

        {/* Korean Translation for Pre-A1 Guidance */}
        {showKoreanTranslation && (
          <p className="text-sm sm:text-base text-amber-800/80 font-bold mt-2 font-['Gaegu',cursive]">
            {page.storyKo}
          </p>
        )}

        {/* Touch to paint reminder if unpainted */}
        {!isPainted && (
          <p className="text-xs font-bold text-rose-500 mt-1.5 animate-pulse">
            👆 {page.interactivePromptKo}
          </p>
        )}
      </div>

      {/* Control Bar: [Read to me], [Turtle/Slow], [Record voice], [Prev/Next] */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Left Controls: Audio & Speed */}
        <div className="flex items-center gap-2">
          {/* Read to Me Button */}
          <button
            onClick={() => handleReadAloud()}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-2xl font-black text-sm sm:text-base shadow-md transition-all active:scale-95 border-2 cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-400 text-amber-950 border-amber-500 animate-pulse'
                : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-300'
            }`}
          >
            <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'text-amber-900 animate-pulse' : 'text-amber-600'}`} />
            <span>Read to me</span>
            <span className="hidden xs:inline text-xs font-bold text-amber-800">
              (읽어주기)
            </span>
          </button>

          {/* Turtle / Slow Toggle */}
          <button
            onClick={() => {
              onToggleSlowAudio();
              soundManager.playClickSound();
            }}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 border-2 cursor-pointer ${
              isSlowAudio
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-200'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
            title="발음을 느리게 듣기"
          >
            <span className="text-lg">🐢</span>
            <span>{isSlowAudio ? '느리게 ON' : '보통 속도'}</span>
          </button>
        </div>

        {/* Center: Voice Recording ('내 목소리 녹음하기') */}
        <div className="flex items-center gap-2">
          {!recorder.isRecording && !recorder.hasRecorded && (
            <button
              onClick={() => recorder.startRecording()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-200 transition-all active:scale-95 cursor-pointer"
            >
              <Mic className="w-4 h-4" />
              <span>녹음하기 🎤</span>
            </button>
          )}

          {recorder.isRecording && (
            <button
              onClick={() => recorder.stopRecording()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm bg-rose-600 text-white shadow-lg animate-pulse cursor-pointer border-2 border-white"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>말하는 중... ({5 - recorder.recordingTime}초)</span>
            </button>
          )}

          {recorder.hasRecorded && !recorder.isRecording && (
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border-2 border-emerald-400 shadow-sm">
              <button
                onClick={() => recorder.playRecording()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm cursor-pointer transition-all ${
                  recorder.isPlaying
                    ? 'bg-emerald-500 text-white animate-pulse'
                    : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>내 목소리 듣기</span>
              </button>
              <button
                onClick={() => recorder.startRecording()}
                className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
                title="다시 녹음하기"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Right Navigation: Prev / Next */}
        <div className="relative flex items-center gap-2 ml-auto">
          {/* Hint popup when clicking Next before painting */}
          <AnimatePresence>
            {showPaintFirstHint && !isPainted && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: -45, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute right-0 z-40 bg-slate-900 text-white text-xs sm:text-sm font-extrabold px-3 py-1.5 rounded-xl shadow-xl border border-amber-400 whitespace-nowrap flex items-center gap-1.5"
              >
                <span>👆 화면 그림을 먼저 터치해 색칠해봐요! 🖌️</span>
              </motion.div>
            )}
          </AnimatePresence>

          {page.id > 1 && (
            <button
              onClick={() => {
                stopSpeech();
                soundManager.playClickSound();
                onPrevPage();
              }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 shadow-md border-2 border-slate-200 flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
              title="이전 페이지"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <motion.button
            onClick={() => {
              if (!isPainted) {
                soundManager.playWrongSound();
                setShowPaintFirstHint(true);
                setTimeout(() => setShowPaintFirstHint(false), 2400);
                return;
              }
              stopSpeech();
              soundManager.playClickSound();
              onNextPage();
            }}
            animate={showPaintFirstHint && !isPainted ? { x: [-6, 6, -4, 4, 0] } : {}}
            transition={{ duration: 0.4 }}
            className={`flex items-center gap-1.5 px-4 sm:px-6 py-2.5 rounded-2xl font-black text-sm sm:text-base border-2 transition-all ${
              isPainted
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-amber-300 shadow-md cursor-pointer active:scale-95 hover:scale-105'
                : 'bg-slate-100 text-slate-400 border-slate-300 cursor-not-allowed opacity-75 shadow-inner'
            }`}
          >
            {!isPainted && <Lock className="w-4 h-4 text-slate-400" />}
            <span>
              {isPainted
                ? page.id === totalPages
                  ? '퀴즈 풀기 🎨'
                  : '다음'
                : '먼저 색칠해요'}
            </span>
            {isPainted && <ChevronRight className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
