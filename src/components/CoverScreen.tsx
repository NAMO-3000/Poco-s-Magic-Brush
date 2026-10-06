import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles, Volume2, BookOpen } from 'lucide-react';
import { PenguinPoco } from './PenguinPoco';
import { soundManager, speakText } from '../utils/audio';

interface CoverScreenProps {
  onStartStory: () => void;
  onOpenWordbook: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({
  onStartStory,
  onOpenWordbook,
}) => {
  const [isPlayingWelcome, setIsPlayingWelcome] = useState(false);

  const handleTestSound = () => {
    soundManager.playSparkleSound();
    setIsPlayingWelcome(true);
    speakText("Welcome! I am Poco! Let's paint the world!", {
      onEnd: () => setIsPlayingWelcome(false),
    });
  };

  const handleStart = () => {
    soundManager.playColorFillSound();
    onStartStory();
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-between py-6 px-4 max-w-4xl mx-auto select-none">
      {/* Top Header & Helper Info */}
      <div className="w-full flex items-center justify-between pt-2">
        <button
          onClick={handleTestSound}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all border ${
            isPlayingWelcome
              ? 'bg-amber-400 text-amber-950 border-amber-300 animate-pulse'
              : 'bg-white/80 hover:bg-white text-slate-700 border-amber-200'
          }`}
          title="소리 테스트"
        >
          <Volume2 className="w-4 h-4 text-amber-600" />
          <span>소리 듣기 🔊</span>
        </button>

        <button
          onClick={onOpenWordbook}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white/80 hover:bg-white text-indigo-700 border border-indigo-200 shadow-sm transition-transform active:scale-95"
        >
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span>나만의 단어장 📒</span>
        </button>
      </div>

      {/* Main Title & Character Hero */}
      <div className="flex flex-col items-center text-center my-auto py-4">
        {/* Adorable Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 bg-amber-200/80 text-amber-900 text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full mb-3 shadow-sm border border-amber-300"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>초등 1학년 상호작용형 영어 동화 (9개 이야기)</span>
        </motion.div>

        {/* Big Bouncy Title */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 font-['Fredoka',sans-serif] leading-tight"
        >
          <span className="text-sky-500">Poco's </span>
          <span className="text-amber-500">Magic </span>
          <span className="text-rose-500">Brush</span>
        </motion.h1>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-600 mt-2 font-['Gaegu',cursive]">
          포코의 요술 붓과 알록달록 무지개 세상
        </h2>

        {/* Cute Mascot Poco */}
        <div className="relative mt-4 mb-4">
          <PenguinPoco size="xl" brushColor="#EF4444" mood="excited" />

          {/* Speech Bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute -top-3 -right-12 sm:-right-20 bg-white px-3 py-2 rounded-2xl shadow-md border-2 border-amber-300 text-left max-w-[170px]"
          >
            <p className="text-xs sm:text-sm font-extrabold text-slate-800">
              "Touch and paint with me! 🎨"
            </p>
            <p className="text-[11px] text-amber-700 font-semibold">
              하얀 세상을 색칠해줘!
            </p>
          </motion.div>
        </div>

        {/* 7 Colors Preview Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl my-2">
          <span className="flex items-center gap-1 text-xs font-black text-red-600 bg-red-100 px-2 py-0.5 rounded-full border border-red-200">
            <span className="w-2 h-2 rounded-full bg-red-500" /> Red
          </span>
          <span className="flex items-center gap-1 text-xs font-black text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full border border-orange-200">
            <span className="w-2 h-2 rounded-full bg-orange-500" /> Orange
          </span>
          <span className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-yellow-400" /> Yellow
          </span>
          <span className="flex items-center gap-1 text-xs font-black text-green-600 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-500" /> Green
          </span>
          <span className="flex items-center gap-1 text-xs font-black text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Blue
          </span>
          <span className="flex items-center gap-1 text-xs font-black text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded-full border border-indigo-200">
            <span className="w-2 h-2 rounded-full bg-indigo-900" /> Navy
          </span>
          <span className="flex items-center gap-1 text-xs font-black text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200">
            <span className="w-2 h-2 rounded-full bg-purple-500" /> Purple
          </span>
        </div>
      </div>

      {/* Start Button: Big Brush Button */}
      <div className="w-full flex flex-col items-center pb-4">
        <motion.button
          onClick={handleStart}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="relative group bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white text-xl sm:text-2xl font-black px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all border-4 border-white flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Play className="w-6 h-6 fill-white text-white ml-0.5" />
          </div>
          <span>Start Story</span>
          <span className="text-base sm:text-lg font-bold opacity-90">
            (이야기 시작)
          </span>
          <Sparkles className="w-6 h-6 text-yellow-300 animate-bounce" />
        </motion.button>

        <p className="text-xs text-slate-500 mt-3 font-semibold">
          💡 화면을 탭하며 신나게 따라 말해보세요! (소리를 켜주세요)
        </p>
      </div>
    </div>
  );
};
