import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, BookOpen, Sparkles, Trophy, Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PenguinPoco } from './PenguinPoco';
import { soundManager, speakText } from '../utils/audio';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onReadAgain: () => void;
  onOpenWordbook: () => void;
  onGoHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  onReadAgain,
  onOpenWordbook,
  onGoHome,
}) => {
  useEffect(() => {
    soundManager.playCheerSound();

    // Multicolored confetti shower
    const end = Date.now() + 2500;
    const colors = ['#EF4444', '#F97316', '#FACC15', '#22C55E', '#3B82F6', '#1E3A8A', '#9333EA'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    speakText('Wow! A rainbow! You did a great job!');
  }, []);

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between max-w-4xl mx-auto px-4 py-6 select-none text-center">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onGoHome}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white/90 hover:bg-white text-slate-700 border border-amber-200 shadow-sm transition-transform active:scale-95 cursor-pointer"
        >
          <Home className="w-4 h-4 text-amber-700" />
          <span>처음으로</span>
        </button>

        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full font-black text-sm border border-amber-300">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>9개 이야기 완독 완료!</span>
        </div>
      </div>

      {/* Main Rainbow Reward Visual */}
      <div className="flex flex-col items-center my-auto py-2">
        {/* Animated Wow Title */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 10 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black font-['Fredoka',sans-serif] tracking-tight bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          "Wow! A rainbow!"
        </motion.h1>

        <p className="text-xl sm:text-2xl font-bold text-slate-700 mt-2 font-['Gaegu',cursive]">
          와! 포코와 함께 완성한 아름다운 무지개 세상이에요!
        </p>

        {/* Large Animated Rainbow Arc */}
        <div className="relative w-full max-w-lg h-56 sm:h-72 my-4 flex items-center justify-center">
          <svg viewBox="0 0 500 280" className="w-full h-full drop-shadow-xl">
            <defs>
              <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
            </defs>

            {/* 7 Rainbow Ribbons */}
            <path d="M 50 250 A 200 200 0 0 1 450 250" stroke="#EF4444" strokeWidth="14" fill="none" />
            <path d="M 64 250 A 186 186 0 0 1 436 250" stroke="#F97316" strokeWidth="14" fill="none" />
            <path d="M 78 250 A 172 172 0 0 1 422 250" stroke="#FACC15" strokeWidth="14" fill="none" />
            <path d="M 92 250 A 158 158 0 0 1 408 250" stroke="#22C55E" strokeWidth="14" fill="none" />
            <path d="M 106 250 A 144 144 0 0 1 394 250" stroke="#3B82F6" strokeWidth="14" fill="none" />
            <path d="M 120 250 A 130 130 0 0 1 380 250" stroke="#1E3A8A" strokeWidth="14" fill="none" />
            <path d="M 134 250 A 116 116 0 0 1 366 250" stroke="#9333EA" strokeWidth="14" fill="none" />

            {/* Cloud Puffs */}
            <g transform="translate(30, 210)">
              <circle cx="20" cy="20" r="22" fill="url(#cloudGrad)" />
              <circle cx="45" cy="15" r="28" fill="url(#cloudGrad)" />
              <circle cx="70" cy="22" r="24" fill="url(#cloudGrad)" />
            </g>
            <g transform="translate(400, 210)">
              <circle cx="20" cy="20" r="22" fill="url(#cloudGrad)" />
              <circle cx="45" cy="15" r="28" fill="url(#cloudGrad)" />
              <circle cx="70" cy="22" r="24" fill="url(#cloudGrad)" />
            </g>
          </svg>

          {/* Cheerful Penguin Poco in center */}
          <div className="absolute -bottom-2 z-20">
            <PenguinPoco size="lg" mood="proud" brushColor="#9333EA" />
          </div>
        </div>

        {/* Celebratory Completion Badge (No paint tubes shown) */}
        <div className="inline-flex flex-col items-center bg-white/95 border-2 border-amber-300 rounded-3xl px-8 py-4 shadow-lg mt-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌟</span>
            <span className="text-xl sm:text-2xl font-black text-slate-800">
              색깔 퀴즈 {totalQuestions}문제를 모두 풀었어요!
            </span>
            <span className="text-2xl">🌟</span>
          </div>

          <p className="text-base sm:text-lg font-extrabold text-amber-700 mt-2 font-['Gaegu',cursive]">
            완벽해요! 알록달록 무지개 세상을 만든 색깔 마스터예요! 🎨
          </p>
        </div>
      </div>

      {/* Action Buttons: [다시 읽기] & [나만의 단어장 가기] */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto w-full pt-4">
        <motion.button
          onClick={onReadAgain}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-base sm:text-lg bg-white hover:bg-amber-50 text-slate-800 border-2 border-amber-300 shadow-md cursor-pointer transition-transform"
        >
          <RotateCcw className="w-5 h-5 text-amber-600" />
          <span>다시 읽기</span>
        </motion.button>

        <motion.button
          onClick={onOpenWordbook}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-base sm:text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-200 cursor-pointer transition-transform"
        >
          <BookOpen className="w-5 h-5" />
          <span>나만의 단어장 가기</span>
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </motion.button>
      </div>
    </div>
  );
};
