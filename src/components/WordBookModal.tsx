import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, Play, Mic, Sparkles, CheckCircle2 } from 'lucide-react';
import { WORDBOOK_ITEMS } from '../data/wordBookData';
import { soundManager, speakText } from '../utils/audio';

interface WordBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  paintedPages: Record<number, boolean>;
  recordings: Record<number, string | null>;
  isSlowAudio: boolean;
}

export const WordBookModal: React.FC<WordBookModalProps> = ({
  isOpen,
  onClose,
  paintedPages,
  recordings,
  isSlowAudio,
}) => {
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [playingMyVoiceId, setPlayingMyVoiceId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePronounce = (itemId: string, wordEn: string) => {
    soundManager.playClickSound();
    setPlayingAudioId(itemId);
    speakText(wordEn, {
      isSlow: isSlowAudio,
      onEnd: () => setPlayingAudioId(null),
    });
  };

  const handlePlayMyVoice = (itemId: string, audioUrl: string) => {
    setPlayingMyVoiceId(itemId);
    const audio = new Audio(audioUrl);
    audio.play();
    audio.onended = () => setPlayingMyVoiceId(null);
    audio.onerror = () => setPlayingMyVoiceId(null);
  };

  const totalCollected = WORDBOOK_ITEMS.filter((item) => paintedPages[item.pageId]).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-sm select-none">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-amber-50 rounded-3xl border-4 border-amber-300 shadow-2xl p-5 sm:p-6 overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b-2 border-amber-200">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">📒</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka',sans-serif]">
                  Poco's Wordbook (나만의 단어장)
                </h2>
                <p className="text-xs sm:text-sm font-bold text-amber-800 font-['Gaegu',cursive]">
                  동화 속에서 칠한 색깔 스티커와 내 목소리가 모여요!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-amber-200 text-amber-950 px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold">
                수집: {totalCollected} / {WORDBOOK_ITEMS.length}
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 flex items-center justify-center cursor-pointer transition-transform active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sticker Album Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 overflow-y-auto py-4 pr-1">
            {WORDBOOK_ITEMS.map((item) => {
              const isUnlocked = !!paintedPages[item.pageId];
              const voiceUrl = recordings[item.pageId];
              const isSpeaking = playingAudioId === item.id;
              const isPlayingVoice = playingMyVoiceId === item.id;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col items-center p-3 sm:p-4 rounded-2xl border-2 transition-all ${
                    isUnlocked
                      ? 'bg-white border-amber-300 shadow-sm hover:shadow-md'
                      : 'bg-slate-100/80 border-dashed border-slate-300 opacity-60'
                  }`}
                >
                  {/* Sticker Visual Badge */}
                  <div
                    onClick={() => isUnlocked && handlePronounce(item.id, item.wordEn)}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center p-2 mb-2 transition-transform cursor-pointer ${
                      isUnlocked ? 'hover:scale-105 active:scale-95' : 'cursor-not-allowed'
                    }`}
                    style={
                      isUnlocked
                        ? { backgroundColor: `${item.colorHex}15` }
                        : { backgroundColor: '#F1F5F9' }
                    }
                  >
                    {item.itemType === 'apple' && (
                      <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm">
                        <ellipse cx="32" cy="45" rx="20" ry="24" fill={isUnlocked ? '#EF4444' : '#94A3B8'} />
                        <ellipse cx="48" cy="45" rx="20" ry="24" fill={isUnlocked ? '#EF4444' : '#94A3B8'} />
                        <path d="M 40 18 C 40 10 46 8 50 6" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="48" cy="12" r="5" fill={isUnlocked ? '#22C55E' : '#CBD5E1'} />
                      </svg>
                    )}

                    {item.itemType === 'carrot' && (
                      <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm">
                        <path d="M 40 16 C 32 4 20 4 20 4 C 20 4 32 12 38 20 Z" fill={isUnlocked ? '#16A34A' : '#94A3B8'} />
                        <path d="M 42 16 C 50 4 62 4 62 4 C 62 4 50 12 44 20 Z" fill={isUnlocked ? '#16A34A' : '#94A3B8'} />
                        <path d="M 30 20 C 30 16 50 16 50 20 L 42 72 C 41 74 39 74 38 72 Z" fill={isUnlocked ? '#F97316' : '#94A3B8'} stroke={isUnlocked ? '#EA580C' : '#64748B'} strokeWidth="2" />
                      </svg>
                    )}

                    {item.itemType === 'banana' && (
                      <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm">
                        <path
                          d="M 35 15 C 15 35 20 65 50 72 C 55 72 55 68 53 62 C 32 50 30 30 42 15 Z"
                          fill={isUnlocked ? '#FACC15' : '#94A3B8'}
                        />
                        <path
                          d="M 40 15 C 32 35 35 65 62 68 C 65 66 64 62 60 58 C 42 50 40 30 46 15 Z"
                          fill={isUnlocked ? '#FDE047' : '#94A3B8'}
                        />
                      </svg>
                    )}

                    {item.itemType === 'leaf' && (
                      <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm">
                        <path
                          d="M 18 65 C 14 36 38 12 66 16 C 70 44 46 68 18 65 Z"
                          fill={isUnlocked ? '#22C55E' : '#94A3B8'}
                        />
                        <path d="M 18 65 Q 42 40 66 16" stroke={isUnlocked ? '#15803D' : '#64748B'} strokeWidth="3" />
                      </svg>
                    )}

                    {item.itemType === 'water' && (
                      <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm">
                        <path
                          d="M 40 12 C 40 12 18 42 18 56 C 18 68 28 74 40 74 C 52 74 62 68 62 56 C 62 42 40 12 40 12 Z"
                          fill={isUnlocked ? '#38BDF8' : '#94A3B8'}
                        />
                      </svg>
                    )}

                    {item.itemType === 'whale' && (
                      <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm">
                        <path d="M 12 40 C 12 20 44 18 60 30 C 70 38 76 48 74 54 C 70 60 64 56 52 58 C 28 60 12 56 12 40 Z" fill={isUnlocked ? '#1E3A8A' : '#94A3B8'} />
                        <path d="M 18 44 C 28 54 48 56 60 52 C 48 58 28 56 18 44 Z" fill={isUnlocked ? '#93C5FD' : '#E2E8F0'} />
                        <circle cx="24" cy="36" r="3" fill="#FFFFFF" />
                        <circle cx="25" cy="36" r="1.5" fill="#0F172A" />
                      </svg>
                    )}

                    {item.itemType === 'grapes' && (
                      <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm">
                        <path d="M 32 14 C 24 8 28 2 40 4 C 52 2 56 8 48 14 Z" fill={isUnlocked ? '#16A34A' : '#94A3B8'} />
                        <line x1="40" y1="8" x2="40" y2="22" stroke="#78350F" strokeWidth="2.5" />
                        <circle cx="30" cy="28" r="9" fill={isUnlocked ? '#7E22CE' : '#94A3B8'} />
                        <circle cx="50" cy="28" r="9" fill={isUnlocked ? '#9333EA' : '#CBD5E1'} />
                        <circle cx="24" cy="42" r="9" fill={isUnlocked ? '#6B21A8' : '#94A3B8'} />
                        <circle cx="40" cy="42" r="9" fill={isUnlocked ? '#7E22CE' : '#CBD5E1'} />
                        <circle cx="56" cy="42" r="9" fill={isUnlocked ? '#9333EA' : '#94A3B8'} />
                        <circle cx="32" cy="56" r="9" fill={isUnlocked ? '#7E22CE' : '#CBD5E1'} />
                        <circle cx="48" cy="56" r="9" fill={isUnlocked ? '#9333EA' : '#94A3B8'} />
                        <circle cx="40" cy="68" r="8" fill={isUnlocked ? '#A855F7' : '#CBD5E1'} />
                      </svg>
                    )}

                    {item.itemType === 'leaf' && (
                      <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm">
                        <path
                          d="M 18 65 C 14 36 38 12 66 16 C 70 44 46 68 18 65 Z"
                          fill={isUnlocked ? '#22C55E' : '#94A3B8'}
                        />
                        <path d="M 18 65 Q 42 40 66 16" stroke={isUnlocked ? '#15803D' : '#64748B'} strokeWidth="3" />
                      </svg>
                    )}

                    {item.itemType === 'umbrella' && (
                      <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm">
                        <path
                          d="M 40 16 L 8 48 Q 24 44 40 48 Q 56 44 72 48 Z"
                          fill={isUnlocked ? '#EC4899' : '#94A3B8'}
                        />
                        <line x1="40" y1="16" x2="40" y2="64" stroke="#78350F" strokeWidth="4" />
                      </svg>
                    )}

                    {item.itemType === 'rainbow' && (
                      <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-sm">
                        <path d="M 10 65 A 30 30 0 0 1 70 65" stroke={isUnlocked ? '#EF4444' : '#94A3B8'} strokeWidth="5" fill="none" />
                        <path d="M 16 65 A 24 24 0 0 1 64 65" stroke={isUnlocked ? '#FACC15' : '#CBD5E1'} strokeWidth="5" fill="none" />
                        <path d="M 22 65 A 18 18 0 0 1 58 65" stroke={isUnlocked ? '#22C55E' : '#94A3B8'} strokeWidth="5" fill="none" />
                        <path d="M 28 65 A 12 12 0 0 1 52 65" stroke={isUnlocked ? '#3B82F6' : '#CBD5E1'} strokeWidth="5" fill="none" />
                      </svg>
                    )}
                  </div>

                  {/* Word Details */}
                  {isUnlocked ? (
                    <>
                      <button
                        onClick={() => handlePronounce(item.id, item.wordEn)}
                        className="flex items-center gap-1 text-sm sm:text-base font-extrabold text-slate-900 hover:text-amber-600 transition-colors"
                      >
                        <span>{item.wordEn}</span>
                        <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'text-amber-500 animate-pulse' : 'text-slate-400'}`} />
                      </button>

                      <span className="text-xs font-bold text-slate-500 font-['Gaegu',cursive]">
                        {item.wordKo}
                      </span>

                      {/* Child Voice Recording Button */}
                      {voiceUrl ? (
                        <button
                          onClick={() => handlePlayMyVoice(item.id, voiceUrl)}
                          className={`mt-2 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black transition-all cursor-pointer ${
                            isPlayingVoice
                              ? 'bg-rose-500 text-white animate-pulse'
                              : 'bg-rose-100 hover:bg-rose-200 text-rose-700'
                          }`}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>내 목소리 🎤</span>
                        </button>
                      ) : (
                        <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-400 font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>스티커 획득</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-bold text-slate-400">???</span>
                      <span className="text-xs text-slate-400 font-semibold mt-1">
                        동화에서 색칠해봐요
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Instruction */}
          <div className="pt-3 border-t border-amber-200 text-center">
            <p className="text-xs sm:text-sm text-amber-900 font-semibold">
              💡 카드를 터치하면 원어민 발음을 다시 들을 수 있어요!
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
