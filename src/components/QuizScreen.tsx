import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { soundManager, speakText, stopSpeech } from '../utils/audio';

interface QuizScreenProps {
  onCompleteQuiz: (score: number) => void;
  isSlowAudio: boolean;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  onCompleteQuiz,
  isSlowAudio,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongOptionId, setWrongOptionId] = useState<string | null>(null);
  const [isSpeakingPrompt, setIsSpeakingPrompt] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  // Read prompt on question change
  const playPromptAudio = () => {
    stopSpeech();
    setIsSpeakingPrompt(true);
    speakText(currentQ.promptEn, {
      isSlow: isSlowAudio,
      onEnd: () => setIsSpeakingPrompt(false),
    });
  };

  useEffect(() => {
    setSelectedOptionId(null);
    setIsCorrect(null);
    setWrongOptionId(null);

    const timer = setTimeout(() => {
      playPromptAudio();
    }, 300);

    return () => {
      clearTimeout(timer);
      stopSpeech();
    };
  }, [currentIdx]);

  const handleSelectOption = (optionId: string) => {
    if (isCorrect === true) return; // Already answered correctly, waiting for next

    if (optionId === currentQ.correctOptionId) {
      // CORRECT ANSWER!
      setSelectedOptionId(optionId);
      setIsCorrect(true);
      setWrongOptionId(null);

      soundManager.playCorrectSound();
      soundManager.playSparkleSound();

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#EF4444', '#F97316', '#FACC15', '#22C55E', '#3B82F6', '#1E3A8A', '#9333EA'],
        });
      } catch {}

      // Advance to next question after celebration
      setTimeout(() => {
        if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
          setCurrentIdx((idx) => idx + 1);
        } else {
          onCompleteQuiz(QUIZ_QUESTIONS.length);
        }
      }, 1600);
    } else {
      // WRONG ANSWER: Gentle wobble, stay on question, let child try again until correct!
      setWrongOptionId(optionId);
      setIsCorrect(false);
      soundManager.playWrongSound();

      setTimeout(() => {
        setWrongOptionId(null);
        setIsCorrect(null);
      }, 1100);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between max-w-4xl mx-auto px-4 py-6 select-none">
      {/* Clean Quiz Progress Header (No paint tubes shown) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white/95 px-4 py-2 rounded-full border border-amber-200 shadow-sm">
          <span className="text-sm sm:text-base font-extrabold text-slate-800">
            문제 {currentIdx + 1} / {QUIZ_QUESTIONS.length}
          </span>
          <div className="flex items-center gap-1.5 ml-2">
            {QUIZ_QUESTIONS.map((q, idx) => (
              <div
                key={q.id}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIdx
                    ? 'w-5 bg-amber-500'
                    : idx < currentIdx
                    ? 'bg-emerald-400'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-amber-100 text-amber-900 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black border border-amber-300">
          색깔 퀴즈 (Color Quiz)
        </div>
      </div>

      {/* Main Question Audio & Title Section */}
      <div className="flex flex-col items-center text-center my-auto py-4">
        {/* Large Replay Speaker Button */}
        <motion.button
          onClick={playPromptAudio}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-lg border-4 transition-all cursor-pointer ${
            isSpeakingPrompt
              ? 'bg-amber-400 border-amber-300 text-amber-950 animate-bounce'
              : 'bg-white hover:bg-amber-50 border-amber-300 text-amber-700'
          }`}
          title="소리 다시 듣기"
        >
          <Volume2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </motion.button>

        {/* English Prompt */}
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-5 font-['Fredoka',sans-serif] tracking-wide">
          "{currentQ.promptEn}"
        </h2>

        {/* Korean Hint */}
        <p className="text-base sm:text-xl font-bold text-amber-800 mt-2 font-['Gaegu',cursive]">
          {currentQ.promptKo}
        </p>

        {/* Feedback Banner */}
        <div className="h-10 mt-3 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isCorrect === true && (
              <motion.div
                key="correct"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full font-black text-sm sm:text-base border border-emerald-300 shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Great job! 정답이에요! ⭐</span>
              </motion.div>
            )}

            {isCorrect === false && (
              <motion.div
                key="wrong"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 px-4 py-1.5 rounded-full font-black text-sm sm:text-base border border-rose-300 shadow-sm"
              >
                <RotateCcw className="w-5 h-5 text-rose-600 animate-spin" />
                <span>Oops! 맞출 때까지 다시 골라봐요! 🔁</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3 Interactive Monochrome Option Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 my-auto max-w-2xl mx-auto w-full">
        {currentQ.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isWrong = wrongOptionId === opt.id;

          return (
            <motion.button
              key={opt.id}
              onClick={() => handleSelectOption(opt.id)}
              animate={
                isWrong
                  ? { x: [-10, 10, -8, 8, -4, 4, 0] }
                  : isSelected
                  ? { scale: [1, 1.08, 1.03] }
                  : {}
              }
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-3xl transition-all border-4 shadow-md cursor-pointer ${
                isSelected
                  ? 'bg-white border-emerald-400 ring-4 ring-emerald-300 shadow-xl'
                  : isWrong
                  ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-300'
                  : 'bg-white hover:bg-amber-50/50 border-amber-200'
              }`}
            >
              {/* Option SVG Illustration */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                {opt.itemType === 'apple' && (
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                    <path d="M 50 15 C 50 5 58 2 64 0" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 60 5 C 70 0 80 8 72 14 C 65 12 60 5 60 5 Z" fill={isSelected ? '#22C55E' : '#CBD5E1'} />
                    <ellipse cx="40" cy="55" rx="25" ry="30" fill={isSelected ? '#EF4444' : '#FFFFFF'} stroke={isSelected ? '#B91C1C' : '#64748B'} strokeWidth="3" />
                    <ellipse cx="60" cy="55" rx="25" ry="30" fill={isSelected ? '#EF4444' : '#FFFFFF'} stroke={isSelected ? '#B91C1C' : '#64748B'} strokeWidth="3" />
                    {isSelected && <ellipse cx="32" cy="45" rx="4" ry="10" fill="#FFFFFF" opacity="0.6" transform="rotate(-20 32 45)" />}
                  </svg>
                )}

                {opt.itemType === 'carrot' && (
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                    <path d="M 50 20 C 40 5 25 5 25 5 C 25 5 40 15 48 24 Z" fill={isSelected ? '#16A34A' : '#94A3B8'} />
                    <path d="M 50 18 C 50 0 55 -5 55 -5 C 55 -5 58 10 52 20 Z" fill={isSelected ? '#22C55E' : '#CBD5E1'} />
                    <path d="M 52 20 C 62 5 75 5 75 5 C 75 5 60 15 54 24 Z" fill={isSelected ? '#16A34A' : '#94A3B8'} />
                    <path d="M 38 25 C 38 20 62 20 62 25 L 53 88 C 51 92 49 92 47 88 Z" fill={isSelected ? '#F97316' : '#FFFFFF'} stroke={isSelected ? '#EA580C' : '#64748B'} strokeWidth="3" />
                    <path d="M 42 40 Q 50 43 58 40 M 44 58 Q 50 61 56 58" stroke={isSelected ? '#EA580C' : '#94A3B8'} strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                )}

                {opt.itemType === 'banana' && (
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                    <rect x="42" y="8" width="12" height="10" rx="3" fill={isSelected ? '#65A30D' : '#94A3B8'} />
                    <path d="M 45 15 C 20 35 25 75 60 88 C 65 88 66 84 64 78 C 38 65 35 38 52 15 Z" fill={isSelected ? '#FACC15' : '#FFFFFF'} stroke={isSelected ? '#CA8A04' : '#64748B'} strokeWidth="3" />
                    <path d="M 48 15 C 40 40 45 75 75 82 C 78 80 77 75 72 70 C 50 62 48 35 56 15 Z" fill={isSelected ? '#FDE047' : '#FFFFFF'} stroke={isSelected ? '#CA8A04' : '#64748B'} strokeWidth="3" />
                  </svg>
                )}

                {opt.itemType === 'leaf' && (
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                    <path d="M 20 80 C 15 45 45 15 80 20 C 85 55 55 85 20 80 Z" fill={isSelected ? '#22C55E' : '#FFFFFF'} stroke={isSelected ? '#15803D' : '#64748B'} strokeWidth="3" />
                    <path d="M 20 80 Q 50 50 80 20" stroke={isSelected ? '#166534' : '#94A3B8'} strokeWidth="3" />
                    <path d="M 38 62 Q 35 48 26 44 M 50 50 Q 55 35 70 34" stroke={isSelected ? '#166534' : '#CBD5E1'} strokeWidth="2" />
                  </svg>
                )}

                {opt.itemType === 'water' && (
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                    <path d="M 50 15 C 50 15 20 50 20 70 C 20 86 33 92 50 92 C 67 92 80 86 80 70 C 80 50 50 15 50 15 Z" fill={isSelected ? '#38BDF8' : '#FFFFFF'} stroke={isSelected ? '#0284C7' : '#64748B'} strokeWidth="3" />
                    {isSelected && <ellipse cx="38" cy="65" rx="6" ry="12" fill="#FFFFFF" opacity="0.6" transform="rotate(-25 38 65)" />}
                  </svg>
                )}

                {opt.itemType === 'whale' && (
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                    <path d="M 15 50 C 15 25 55 22 75 38 C 88 48 95 60 92 68 C 88 74 80 70 65 72 C 35 75 15 70 15 50 Z" fill={isSelected ? '#1E3A8A' : '#FFFFFF'} stroke={isSelected ? '#172554' : '#64748B'} strokeWidth="3" />
                    <path d="M 22 55 C 35 68 60 70 75 66 C 60 72 35 70 22 55 Z" fill={isSelected ? '#93C5FD' : '#E2E8F0'} />
                    <circle cx="30" cy="45" r="3.5" fill={isSelected ? '#FFFFFF' : '#64748B'} />
                    {isSelected && <circle cx="31" cy="45" r="2" fill="#0F172A" />}
                  </svg>
                )}

                {opt.itemType === 'grapes' && (
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                    <path d="M 40 18 C 30 10 35 2 50 5 C 65 2 70 10 60 18 Z" fill={isSelected ? '#16A34A' : '#94A3B8'} />
                    <line x1="50" y1="12" x2="50" y2="28" stroke="#78350F" strokeWidth="3" />
                    {/* Grapes */}
                    <circle cx="38" cy="35" r="11" fill={isSelected ? '#7E22CE' : '#FFFFFF'} stroke={isSelected ? '#581C87' : '#64748B'} strokeWidth="2.5" />
                    <circle cx="62" cy="35" r="11" fill={isSelected ? '#9333EA' : '#FFFFFF'} stroke={isSelected ? '#581C87' : '#64748B'} strokeWidth="2.5" />
                    <circle cx="30" cy="52" r="11" fill={isSelected ? '#6B21A8' : '#FFFFFF'} stroke={isSelected ? '#581C87' : '#64748B'} strokeWidth="2.5" />
                    <circle cx="50" cy="52" r="11" fill={isSelected ? '#7E22CE' : '#FFFFFF'} stroke={isSelected ? '#581C87' : '#64748B'} strokeWidth="2.5" />
                    <circle cx="70" cy="52" r="11" fill={isSelected ? '#9333EA' : '#FFFFFF'} stroke={isSelected ? '#581C87' : '#64748B'} strokeWidth="2.5" />
                    <circle cx="40" cy="69" r="11" fill={isSelected ? '#7E22CE' : '#FFFFFF'} stroke={isSelected ? '#581C87' : '#64748B'} strokeWidth="2.5" />
                    <circle cx="60" cy="69" r="11" fill={isSelected ? '#9333EA' : '#FFFFFF'} stroke={isSelected ? '#581C87' : '#64748B'} strokeWidth="2.5" />
                    <circle cx="50" cy="85" r="11" fill={isSelected ? '#A855F7' : '#FFFFFF'} stroke={isSelected ? '#581C87' : '#64748B'} strokeWidth="2.5" />
                  </svg>
                )}

                {opt.itemType === 'umbrella' && (
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
                    <path d="M 50 20 L 10 60 Q 30 55 50 60 Q 70 55 90 60 Z" fill={isSelected ? '#EC4899' : '#FFFFFF'} stroke={isSelected ? '#BE185D' : '#64748B'} strokeWidth="3" />
                    <line x1="50" y1="20" x2="50" y2="80" stroke="#78350F" strokeWidth="4" />
                    <path d="M 50 80 C 50 88 42 88 42 82" stroke="#78350F" strokeWidth="4" fill="none" />
                  </svg>
                )}
              </div>

              {/* Label */}
              <div className="mt-3 text-center">
                <span className={`text-sm sm:text-base font-extrabold ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                  {isSelected ? opt.nameEn : '???'}
                </span>
              </div>

              {/* Sparkle on success */}
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Helpful Hint */}
      <div className="text-center pt-2">
        <p className="text-xs sm:text-sm text-slate-500 font-semibold">
          💡 스피커를 누르면 질문을 다시 들을 수 있어요! 틀려도 맞출 때까지 다시 골라봐요!
        </p>
      </div>
    </div>
  );
};
