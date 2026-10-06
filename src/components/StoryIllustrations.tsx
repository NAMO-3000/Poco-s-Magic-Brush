import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface StoryIllustrationProps {
  pageId: number;
  isPainted: boolean;
  onPaint: () => void;
}

export const StoryIllustration: React.FC<StoryIllustrationProps> = ({
  pageId,
  isPainted,
  onPaint,
}) => {
  const [paintEffectTrigger, setPaintEffectTrigger] = useState(false);

  const handleTargetClick = () => {
    if (!isPainted) {
      setPaintEffectTrigger(true);
      setTimeout(() => setPaintEffectTrigger(false), 1200);
      onPaint();
    }
  };

  return (
    <div
      onClick={!isPainted ? handleTargetClick : undefined}
      className={`relative w-full h-[320px] md:h-[400px] bg-gradient-to-b from-sky-100 to-amber-50 rounded-3xl overflow-hidden border-4 border-amber-200 shadow-inner flex items-center justify-center select-none ${
        !isPainted ? 'cursor-pointer hover:border-amber-400' : ''
      }`}
    >
      {/* Dynamic Magical Brush Splash Flash Effect */}
      <AnimatePresence>
        {paintEffectTrigger && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1.8 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center bg-white/20 backdrop-blur-[1px]"
          >
            <div className="w-64 h-64 rounded-full bg-radial from-yellow-300 via-pink-400 to-transparent opacity-80 blur-xl animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Prompt if not painted */}
      {!isPainted && (
        <motion.button
          onClick={handleTargetClick}
          initial={{ y: 0 }}
          animate={{ y: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold px-4 py-2 rounded-full shadow-lg border-2 border-white flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
        >
          <Sparkles className="w-5 h-5 text-white" />
          <span className="text-sm md:text-base font-extrabold tracking-wide">
            여기를 터치해 색칠해봐요! 🖌️
          </span>
        </motion.button>
      )}

      {/* Page 1: Red Apple & Bear */}
      {pageId === 1 && (
        <svg viewBox="0 0 800 480" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="480" fill={isPainted ? '#E0F2FE' : '#F1F5F9'} />
          <path d="M 0 380 Q 200 320 400 360 T 800 350 L 800 480 L 0 480 Z" fill={isPainted ? '#BAE6FD' : '#E2E8F0'} />
          <path d="M 0 420 Q 300 370 600 410 T 800 400 L 800 480 L 0 480 Z" fill={isPainted ? '#FFFFFF' : '#CBD5E1'} />

          {/* Tree */}
          <path d="M 520 420 L 540 260 C 540 220 520 180 500 150 L 530 150 C 560 190 570 230 570 420 Z" fill="#78350F" />
          <path d="M 535 240 C 470 210 430 180 390 170 C 420 180 470 230 535 260 Z" fill="#92400E" />
          <path d="M 545 220 C 620 180 670 160 720 150 C 670 175 620 220 550 240 Z" fill="#92400E" />

          {/* Friendly Bear */}
          <g transform="translate(180, 200)">
            <circle cx="80" cy="50" r="24" fill="#92400E" />
            <circle cx="80" cy="50" r="14" fill="#FDE68A" />
            <circle cx="180" cy="50" r="24" fill="#92400E" />
            <circle cx="180" cy="50" r="14" fill="#FDE68A" />
            <ellipse cx="130" cy="190" rx="90" ry="100" fill="#B45309" />
            <ellipse cx="130" cy="205" rx="60" ry="70" fill="#FDE68A" />
            <circle cx="130" cy="100" r="70" fill="#B45309" />
            <ellipse cx="130" cy="120" rx="35" ry="25" fill="#FDE68A" />
            <ellipse cx="130" cy="112" rx="14" ry="10" fill="#451A03" />
            <path d="M 124 122 Q 130 128 136 122" stroke="#451A03" strokeWidth="4" strokeLinecap="round" />
            {isPainted ? (
              <g>
                <circle cx="105" cy="90" r="8" fill="#451A03" />
                <circle cx="102" cy="87" r="3" fill="#FFFFFF" />
                <circle cx="155" cy="90" r="8" fill="#451A03" />
                <circle cx="152" cy="87" r="3" fill="#FFFFFF" />
                <ellipse cx="95" cy="110" rx="10" ry="6" fill="#F87171" opacity="0.8" />
                <ellipse cx="165" cy="110" rx="10" ry="6" fill="#F87171" opacity="0.8" />
              </g>
            ) : (
              <g>
                <circle cx="105" cy="90" r="7" fill="#64748B" />
                <circle cx="155" cy="90" r="7" fill="#64748B" />
              </g>
            )}
            <ellipse cx="40" cy="140" rx="25" ry="32" fill="#B45309" transform="rotate(-30 40 140)" />
            <circle cx="35" cy="128" r="14" fill="#FDE68A" />
          </g>

          {/* Interactive Target: APPLE (NO moving/spinning circle) */}
          <g onClick={handleTargetClick} className="cursor-pointer transition-transform hover:scale-110 active:scale-95" transform="translate(390, 170)">
            <path d="M 0 0 C 0 -25 15 -35 25 -40" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
            <path d="M 15 -32 C 35 -45 50 -25 35 -15 C 20 -20 15 -32 15 -32 Z" fill={isPainted ? '#22C55E' : '#94A3B8'} stroke="#475569" strokeWidth="2" />
            {isPainted ? (
              <g>
                <ellipse cx="-20" cy="15" rx="35" ry="42" fill="#DC2626" />
                <ellipse cx="20" cy="15" rx="35" ry="42" fill="#EF4444" />
                <ellipse cx="0" cy="20" rx="38" ry="40" fill="#EF4444" />
                <path d="M -25 -5 C -35 15 -30 35 -20 40" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
                <circle cx="-16" cy="-8" r="4" fill="#FFFFFF" opacity="0.9" />
              </g>
            ) : (
              <g>
                <ellipse cx="-20" cy="15" rx="35" ry="42" fill="#FFFFFF" stroke="#64748B" strokeWidth="4" />
                <ellipse cx="20" cy="15" rx="35" ry="42" fill="#FFFFFF" stroke="#64748B" strokeWidth="4" />
                <ellipse cx="0" cy="20" rx="38" ry="40" fill="#FFFFFF" stroke="#64748B" strokeWidth="4" />
              </g>
            )}
          </g>
        </svg>
      )}

      {/* Page 2: Orange Carrot & Rabbit */}
      {pageId === 2 && (
        <svg viewBox="0 0 800 480" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="480" fill={isPainted ? '#FFF7ED' : '#F1F5F9'} />
          <path d="M 0 350 Q 250 300 500 340 T 800 330 L 800 480 L 0 480 Z" fill={isPainted ? '#BBF7D0' : '#E2E8F0'} />
          <path d="M 0 400 Q 300 360 600 390 T 800 380 L 800 480 L 0 480 Z" fill={isPainted ? '#86EFAC' : '#CBD5E1'} />

          {/* Cute Bunny Rabbit */}
          <g transform="translate(180, 160)">
            {/* Long Rabbit Ears */}
            <ellipse cx="65" cy="50" rx="16" ry="60" fill={isPainted ? '#FFFFFF' : '#E2E8F0'} stroke="#CBD5E1" strokeWidth="3" transform="rotate(-10 65 50)" />
            <ellipse cx="65" cy="50" rx="9" ry="45" fill={isPainted ? '#FECDD3' : '#F1F5F9'} transform="rotate(-10 65 50)" />
            <ellipse cx="115" cy="50" rx="16" ry="60" fill={isPainted ? '#FFFFFF' : '#E2E8F0'} stroke="#CBD5E1" strokeWidth="3" transform="rotate(10 115 50)" />
            <ellipse cx="115" cy="50" rx="9" ry="45" fill={isPainted ? '#FECDD3' : '#F1F5F9'} transform="rotate(10 115 50)" />
            {/* Body */}
            <ellipse cx="90" cy="190" rx="60" ry="70" fill={isPainted ? '#FFFFFF' : '#E2E8F0'} stroke="#CBD5E1" strokeWidth="3" />
            <circle cx="90" cy="120" r="50" fill={isPainted ? '#FFFFFF' : '#E2E8F0'} stroke="#CBD5E1" strokeWidth="3" />
            {/* Eyes */}
            <circle cx="75" cy="115" r="7" fill="#0F172A" />
            <circle cx="73" cy="112" r="2.5" fill="#FFFFFF" />
            <circle cx="105" cy="115" r="7" fill="#0F172A" />
            <circle cx="103" cy="112" r="2.5" fill="#FFFFFF" />
            {/* Nose & Mouth */}
            <polygon points="90,126 84,120 96,120" fill="#FB7185" />
            <path d="M 85 130 Q 90 136 95 130" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            {isPainted && (
              <>
                <ellipse cx="65" cy="128" rx="8" ry="5" fill="#FDA4AF" />
                <ellipse cx="115" cy="128" rx="8" ry="5" fill="#FDA4AF" />
              </>
            )}
          </g>

          {/* Interactive Target: ORANGE CARROT (NO moving/spinning circle) */}
          <g onClick={handleTargetClick} className="cursor-pointer transition-transform hover:scale-110 active:scale-95" transform="translate(480, 160)">
            {/* Carrot Top Leaves */}
            <path d="M 60 50 C 40 10 10 0 10 0 C 10 0 35 25 50 55 Z" fill={isPainted ? '#16A34A' : '#94A3B8'} />
            <path d="M 60 48 C 60 5 70 -15 70 -15 C 70 -15 75 15 65 50 Z" fill={isPainted ? '#22C55E' : '#CBD5E1'} />
            <path d="M 65 50 C 85 10 115 0 115 0 C 115 0 90 25 75 55 Z" fill={isPainted ? '#16A34A' : '#94A3B8'} />

            {/* Carrot Body */}
            {isPainted ? (
              <g>
                <path d="M 35 55 C 35 45 90 45 90 55 L 70 230 C 65 240 60 240 55 230 Z" fill="#F97316" stroke="#EA580C" strokeWidth="3" />
                {/* Horizontal Carrot Ridges */}
                <path d="M 45 80 Q 62 85 80 80 M 48 120 Q 62 125 76 120 M 52 160 Q 62 165 72 160" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
                {/* White highlight */}
                <path d="M 45 65 L 54 180" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
              </g>
            ) : (
              <g>
                <path d="M 35 55 C 35 45 90 45 90 55 L 70 230 C 65 240 60 240 55 230 Z" fill="#FFFFFF" stroke="#64748B" strokeWidth="4" />
                <path d="M 45 80 Q 62 85 80 80 M 48 120 Q 62 125 76 120" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
              </g>
            )}
          </g>
        </svg>
      )}

      {/* Page 3: Yellow Banana & Monkey */}
      {pageId === 3 && (
        <svg viewBox="0 0 800 480" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="480" fill={isPainted ? '#FEF08A' : '#F1F5F9'} opacity={isPainted ? 0.4 : 1} />
          <path d="M 0 350 Q 250 300 500 350 T 800 340 L 800 480 L 0 480 Z" fill={isPainted ? '#86EFAC' : '#E2E8F0'} />
          <path d="M 100 0 Q 300 120 500 90 L 520 120 Q 300 150 100 30 Z" fill={isPainted ? '#A16207' : '#94A3B8'} />

          {/* Monkey */}
          <g transform="translate(480, 80)">
            <path d="M 50 140 C 20 180 30 240 60 260 C 80 270 95 240 75 230" stroke={isPainted ? '#92400E' : '#64748B'} strokeWidth="12" strokeLinecap="round" />
            <ellipse cx="100" cy="160" rx="45" ry="55" fill={isPainted ? '#B45309' : '#94A3B8'} />
            <ellipse cx="100" cy="165" rx="30" ry="38" fill={isPainted ? '#FED7AA' : '#E2E8F0'} />
            <circle cx="50" cy="80" r="18" fill={isPainted ? '#FED7AA' : '#E2E8F0'} stroke={isPainted ? '#B45309' : '#64748B'} strokeWidth="4" />
            <circle cx="150" cy="80" r="18" fill={isPainted ? '#FED7AA' : '#E2E8F0'} stroke={isPainted ? '#B45309' : '#64748B'} strokeWidth="4" />
            <circle cx="100" cy="80" r="42" fill={isPainted ? '#B45309' : '#94A3B8'} />
            <path d="M 80 75 C 65 55 90 45 100 65 C 110 45 135 55 120 75 C 130 95 70 95 80 75 Z" fill={isPainted ? '#FED7AA' : '#E2E8F0'} />
            <circle cx="90" cy="72" r="5" fill="#1E293B" />
            <circle cx="110" cy="72" r="5" fill="#1E293B" />
            <path d="M 94 88 Q 100 95 106 88" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            {isPainted && (
              <>
                <ellipse cx="80" cy="85" rx="6" ry="4" fill="#FCA5A5" />
                <ellipse cx="120" cy="85" rx="6" ry="4" fill="#FCA5A5" />
              </>
            )}
          </g>

          {/* Interactive Target: BANANA BUNCH (NO moving/spinning circle) */}
          <g onClick={handleTargetClick} className="cursor-pointer transition-transform hover:scale-110 active:scale-95" transform="translate(260, 110)">
            <rect x="35" y="-10" width="18" height="15" rx="4" fill={isPainted ? '#65A30D' : '#64748B'} />
            {isPainted ? (
              <g>
                <path d="M 40 5 C 10 30 10 90 45 120 C 50 120 52 115 48 105 C 25 80 25 35 45 5 Z" fill="#EAB308" stroke="#CA8A04" strokeWidth="2" />
                <path d="M 45 5 C 30 40 35 110 80 135 C 85 135 88 128 82 120 C 50 95 45 35 52 5 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
                <path d="M 50 5 C 55 45 75 100 115 115 C 120 112 118 105 110 98 C 80 85 68 35 55 5 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
                <circle cx="45" cy="118" r="4" fill="#713F12" />
                <circle cx="80" cy="133" r="4" fill="#713F12" />
                <circle cx="114" cy="113" r="4" fill="#713F12" />
              </g>
            ) : (
              <g>
                <path d="M 40 5 C 10 30 10 90 45 120 C 50 120 52 115 48 105 C 25 80 25 35 45 5 Z" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
                <path d="M 45 5 C 30 40 35 110 80 135 C 85 135 88 128 82 120 C 50 95 45 35 52 5 Z" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
                <path d="M 50 5 C 55 45 75 100 115 115 C 120 112 118 105 110 98 C 80 85 68 35 55 5 Z" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
              </g>
            )}
          </g>
        </svg>
      )}

      {/* Page 4: Green Leaf & Frog */}
      {pageId === 4 && (
        <svg viewBox="0 0 800 480" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="480" fill={isPainted ? '#ECFDF5' : '#F8FAFC'} />
          <path d="M 0 300 Q 400 240 800 310 L 800 480 L 0 480 Z" fill={isPainted ? '#A7F3D0' : '#E2E8F0'} />
          <path d="M 680 340 L 690 180 M 710 360 L 730 160 M 740 370 L 750 200" stroke={isPainted ? '#059669' : '#94A3B8'} strokeWidth="6" strokeLinecap="round" />

          {/* Frog */}
          <g transform="translate(180, 180)">
            <ellipse cx="40" cy="130" rx="35" ry="18" fill={isPainted ? '#16A34A' : '#94A3B8'} />
            <ellipse cx="140" cy="130" rx="35" ry="18" fill={isPainted ? '#16A34A' : '#94A3B8'} />
            <ellipse cx="90" cy="110" rx="55" ry="45" fill={isPainted ? '#22C55E' : '#CBD5E1'} />
            <ellipse cx="90" cy="118" rx="36" ry="28" fill={isPainted ? '#BBF7D0' : '#F1F5F9'} />
            <circle cx="60" cy="65" r="22" fill={isPainted ? '#22C55E' : '#CBD5E1'} />
            <circle cx="120" cy="65" r="22" fill={isPainted ? '#22C55E' : '#CBD5E1'} />
            <circle cx="60" cy="65" r="14" fill="#FFFFFF" />
            <circle cx="120" cy="65" r="14" fill="#FFFFFF" />
            <circle cx="60" cy="65" r="7" fill="#0F172A" />
            <circle cx="120" cy="65" r="7" fill="#0F172A" />
            <path d="M 68 105 Q 90 125 112 105" stroke="#14532D" strokeWidth="4" strokeLinecap="round" />
            {isPainted && (
              <>
                <ellipse cx="55" cy="100" rx="8" ry="5" fill="#F472B6" />
                <ellipse cx="125" cy="100" rx="8" ry="5" fill="#F472B6" />
              </>
            )}
          </g>

          {/* Interactive Target: LEAF (NO moving/spinning circle) */}
          <g onClick={handleTargetClick} className="cursor-pointer transition-transform hover:scale-105 active:scale-95" transform="translate(420, 220)">
            {isPainted ? (
              <g>
                <ellipse cx="100" cy="80" rx="130" ry="75" fill="#15803D" />
                <ellipse cx="100" cy="76" rx="122" ry="70" fill="#22C55E" />
                <path d="M 100 76 L 220 60 L 220 95 Z" fill={isPainted ? '#A7F3D0' : '#E2E8F0'} />
                <path d="M 100 76 Q 50 30 10 50 M 100 76 Q 50 110 20 120 M 100 76 Q 140 25 170 35 M 100 76 Q 150 120 180 120" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
                <g transform="translate(60, 20)">
                  <ellipse cx="40" cy="30" rx="20" ry="32" fill="#F472B6" transform="rotate(-30 40 30)" />
                  <ellipse cx="40" cy="30" rx="20" ry="32" fill="#F472B6" transform="rotate(30 40 30)" />
                  <ellipse cx="40" cy="25" rx="16" ry="30" fill="#FB7185" />
                  <circle cx="40" cy="32" r="8" fill="#FDE047" />
                </g>
              </g>
            ) : (
              <g>
                <ellipse cx="100" cy="80" rx="130" ry="75" fill="#FFFFFF" stroke="#64748B" strokeWidth="4" />
                <path d="M 100 80 L 225 65 L 225 95 Z" fill="#E2E8F0" />
                <path d="M 100 80 Q 50 30 10 50 M 100 80 Q 50 110 20 120 M 100 80 Q 140 25 170 35" stroke="#94A3B8" strokeWidth="3" />
              </g>
            )}
          </g>
        </svg>
      )}

      {/* Page 5: Blue Water & Dolphin */}
      {pageId === 5 && (
        <svg viewBox="0 0 800 480" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="480" fill={isPainted ? '#E0F2FE' : '#F8FAFC'} />

          {/* Dolphin */}
          <g transform="translate(420, 100)">
            <path d="M 0 140 C 30 60 140 40 220 90 C 260 120 280 170 290 190 C 270 170 240 160 210 160 C 140 160 80 200 0 140 Z" fill={isPainted ? '#0284C7' : '#94A3B8'} />
            <path d="M 20 140 C 70 180 140 170 200 155 C 130 145 60 135 20 140 Z" fill={isPainted ? '#BAE6FD' : '#E2E8F0'} />
            <path d="M 120 55 C 135 20 165 30 160 70 Z" fill={isPainted ? '#0369A1' : '#64748B'} />
            <path d="M 90 145 C 80 175 110 185 125 155 Z" fill={isPainted ? '#0369A1' : '#64748B'} />
            <path d="M 285 185 C 310 160 325 185 300 205 C 320 225 300 240 280 205 Z" fill={isPainted ? '#0284C7' : '#94A3B8'} />
            <circle cx="45" cy="115" r="6" fill="#0F172A" />
            <circle cx="43" cy="112" r="2" fill="#FFFFFF" />
            <path d="M 25 130 Q 35 136 45 130" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            {isPainted && (
              <g>
                <circle cx="30" cy="70" r="6" fill="#38BDF8" />
                <circle cx="90" cy="40" r="5" fill="#38BDF8" />
                <circle cx="270" cy="80" r="7" fill="#38BDF8" />
              </g>
            )}
          </g>

          {/* Sailboat */}
          <g transform="translate(140, 180)">
            <polygon points="50,10 50,75 10,75" fill={isPainted ? '#EF4444' : '#E2E8F0'} stroke="#64748B" strokeWidth="2" />
            <polygon points="55,25 55,75 85,75" fill={isPainted ? '#FACC15' : '#E2E8F0'} stroke="#64748B" strokeWidth="2" />
            <path d="M 0 78 L 95 78 L 80 96 L 15 96 Z" fill={isPainted ? '#92400E' : '#CBD5E1'} stroke="#64748B" strokeWidth="2" />
          </g>

          {/* Interactive Target: BLUE WAVES (NO moving/spinning circle) */}
          <g onClick={handleTargetClick} className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.99]" transform="translate(0, 260)">
            {isPainted ? (
              <g>
                <path d="M 0 40 Q 100 10 200 40 T 400 40 T 600 40 T 800 40 L 800 220 L 0 220 Z" fill="#38BDF8" />
                <path d="M 0 70 Q 100 100 200 70 T 400 70 T 600 70 T 800 70 L 800 220 L 0 220 Z" fill="#0284C7" />
                <path d="M 0 110 Q 100 80 200 110 T 400 110 T 600 110 T 800 110 L 800 220 L 0 220 Z" fill="#0369A1" />
                <path d="M 180 40 Q 200 30 220 40 M 380 40 Q 400 30 420 40 M 580 40 Q 600 30 620 40" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              </g>
            ) : (
              <g>
                <path d="M 0 40 Q 100 10 200 40 T 400 40 T 600 40 T 800 40 L 800 220 L 0 220 Z" fill="#FFFFFF" stroke="#64748B" strokeWidth="4" />
                <path d="M 0 90 Q 100 120 200 90 T 400 90 T 600 90 T 800 90" stroke="#94A3B8" strokeWidth="4" strokeDasharray="12 12" />
              </g>
            )}
          </g>
        </svg>
      )}

      {/* Page 6: Navy Whale */}
      {pageId === 6 && (
        <svg viewBox="0 0 800 480" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Deep Twilight Navy Sky / Ocean */}
          <rect width="800" height="480" fill={isPainted ? '#0F172A' : '#F1F5F9'} />
          {/* Distant starry sky if painted */}
          {isPainted && (
            <g>
              <circle cx="120" cy="80" r="2.5" fill="#FDE047" />
              <circle cx="340" cy="60" r="2" fill="#FDE047" />
              <circle cx="680" cy="90" r="3" fill="#FDE047" />
              <circle cx="720" cy="150" r="2" fill="#FDE047" />
              <path d="M 740 60 L 743 68 L 751 71 L 743 74 L 740 82 L 737 74 L 729 71 L 737 68 Z" fill="#FDE047" />
            </g>
          )}

          {/* Deep Sea Waters */}
          <path d="M 0 280 Q 200 250 400 280 T 800 270 L 800 480 L 0 480 Z" fill={isPainted ? '#172554' : '#E2E8F0'} />
          <path d="M 0 340 Q 250 310 500 340 T 800 330 L 800 480 L 0 480 Z" fill={isPainted ? '#1E3A8A' : '#CBD5E1'} />

          {/* Interactive Target: NAVY WHALE (NO moving/spinning circle) */}
          <g onClick={handleTargetClick} className="cursor-pointer transition-transform hover:scale-105 active:scale-95" transform="translate(180, 140)">
            {/* Water Spout */}
            {isPainted && (
              <g>
                <path d="M 170 50 C 160 10 130 5 110 20 M 170 50 C 170 5 190 -5 210 15 M 170 50 C 180 15 210 30 230 45" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" fill="none" />
                <circle cx="110" cy="20" r="4" fill="#BFDBFE" />
                <circle cx="210" cy="15" r="4" fill="#BFDBFE" />
                <circle cx="230" cy="45" r="4" fill="#BFDBFE" />
              </g>
            )}

            {/* Whale Body */}
            {isPainted ? (
              <g>
                {/* Main Body */}
                <path d="M 50 140 C 50 60 220 50 340 100 C 400 130 440 170 480 150 C 495 140 505 160 485 180 C 470 195 440 190 380 200 C 260 220 50 200 50 140 Z" fill="#1E3A8A" stroke="#172554" strokeWidth="4" />
                {/* Whale Belly Grooves */}
                <path d="M 70 150 C 120 180 220 190 300 180 C 220 195 120 190 70 150 Z" fill="#93C5FD" />
                {/* Flipper */}
                <path d="M 200 160 C 220 200 260 215 270 200 C 260 180 230 165 200 160 Z" fill="#172554" />
                {/* Eye & Smile */}
                <circle cx="100" cy="120" r="7" fill="#FFFFFF" />
                <circle cx="102" cy="120" r="4" fill="#0F172A" />
                <path d="M 85 145 Q 115 155 135 142" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
                {/* Rosy Cheek */}
                <ellipse cx="120" cy="135" rx="8" ry="5" fill="#38BDF8" opacity="0.6" />
              </g>
            ) : (
              <g>
                <path d="M 50 140 C 50 60 220 50 340 100 C 400 130 440 170 480 150 C 495 140 505 160 485 180 C 470 195 440 190 380 200 C 260 220 50 200 50 140 Z" fill="#FFFFFF" stroke="#64748B" strokeWidth="4" />
                <circle cx="100" cy="120" r="6" fill="#64748B" />
                <path d="M 85 145 Q 115 155 135 142" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
              </g>
            )}
          </g>
        </svg>
      )}

      {/* Page 7: Purple Grapes & Fox */}
      {pageId === 7 && (
        <svg viewBox="0 0 800 480" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="480" fill={isPainted ? '#FAF5FF' : '#F1F5F9'} />
          <path d="M 0 360 Q 250 320 500 350 T 800 340 L 800 480 L 0 480 Z" fill={isPainted ? '#E9D5FF' : '#E2E8F0'} />
          <path d="M 0 410 Q 300 380 600 400 T 800 390 L 800 480 L 0 480 Z" fill={isPainted ? '#D8B4FE' : '#CBD5E1'} />

          {/* Grape Vine Trellis & Branch */}
          <path d="M 200 40 Q 400 60 600 30 L 620 50 Q 400 85 200 60 Z" fill="#78350F" />
          <path d="M 400 60 C 400 90 410 110 405 130" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />

          {/* Friendly Fox looking up */}
          <g transform="translate(160, 200)">
            <ellipse cx="100" cy="180" rx="60" ry="70" fill={isPainted ? '#EA580C' : '#94A3B8'} />
            <ellipse cx="100" cy="190" rx="35" ry="45" fill={isPainted ? '#FFFFFF' : '#E2E8F0'} />
            <polygon points="55,110 40,50 80,85" fill={isPainted ? '#EA580C' : '#94A3B8'} />
            <polygon points="55,100 48,65 72,85" fill={isPainted ? '#FFFFFF' : '#E2E8F0'} />
            <polygon points="145,110 160,50 120,85" fill={isPainted ? '#EA580C' : '#94A3B8'} />
            <polygon points="145,100 152,65 128,85" fill={isPainted ? '#FFFFFF' : '#E2E8F0'} />
            <ellipse cx="100" cy="115" rx="45" ry="38" fill={isPainted ? '#EA580C' : '#94A3B8'} />
            <polygon points="100,140 85,120 115,120" fill={isPainted ? '#FFFFFF' : '#E2E8F0'} />
            <circle cx="100" cy="138" r="6" fill="#0F172A" />
            <circle cx="85" cy="110" r="5" fill="#0F172A" />
            <circle cx="115" cy="110" r="5" fill="#0F172A" />
          </g>

          {/* Interactive Target: PURPLE GRAPES (NO moving/spinning circle) */}
          <g onClick={handleTargetClick} className="cursor-pointer transition-transform hover:scale-110 active:scale-95" transform="translate(360, 110)">
            {/* Vine Leaves */}
            <path d="M 45 30 C 15 10 25 -20 60 -5 C 95 -20 105 10 75 30 Z" fill={isPainted ? '#16A34A' : '#94A3B8'} />
            <path d="M 45 25 C 20 40 10 65 30 75" stroke={isPainted ? '#15803D' : '#64748B'} strokeWidth="4" strokeLinecap="round" fill="none" />

            {isPainted ? (
              <g>
                {/* 10 Grape Spheres cluster */}
                {/* Row 1 */}
                <circle cx="35" cy="50" r="18" fill="#7E22CE" />
                <circle cx="65" cy="50" r="18" fill="#9333EA" />
                <circle cx="95" cy="50" r="18" fill="#A855F7" />
                {/* Row 2 */}
                <circle cx="25" cy="78" r="18" fill="#6B21A8" />
                <circle cx="55" cy="78" r="18" fill="#7E22CE" />
                <circle cx="85" cy="78" r="18" fill="#9333EA" />
                <circle cx="105" cy="78" r="18" fill="#A855F7" />
                {/* Row 3 */}
                <circle cx="45" cy="106" r="18" fill="#7E22CE" />
                <circle cx="75" cy="106" r="18" fill="#9333EA" />
                {/* Row 4 */}
                <circle cx="60" cy="134" r="18" fill="#A855F7" />

                {/* Highlights on spheres */}
                <circle cx="30" cy="45" r="4" fill="#FFFFFF" opacity="0.6" />
                <circle cx="60" cy="45" r="4" fill="#FFFFFF" opacity="0.6" />
                <circle cx="90" cy="45" r="4" fill="#FFFFFF" opacity="0.6" />
                <circle cx="50" cy="72" r="4" fill="#FFFFFF" opacity="0.6" />
                <circle cx="80" cy="72" r="4" fill="#FFFFFF" opacity="0.6" />
                <circle cx="55" cy="128" r="4" fill="#FFFFFF" opacity="0.6" />
              </g>
            ) : (
              <g>
                {/* Unpainted white grape outlines */}
                <circle cx="35" cy="50" r="18" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
                <circle cx="65" cy="50" r="18" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
                <circle cx="95" cy="50" r="18" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
                <circle cx="25" cy="78" r="18" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
                <circle cx="55" cy="78" r="18" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
                <circle cx="85" cy="78" r="18" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
                <circle cx="105" cy="78" r="18" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
                <circle cx="45" cy="106" r="18" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
                <circle cx="75" cy="106" r="18" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
                <circle cx="60" cy="134" r="18" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
              </g>
            )}
          </g>
        </svg>
      )}

      {/* Page 8: Colorful Umbrella */}
      {pageId === 8 && (
        <svg viewBox="0 0 800 480" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="480" fill={isPainted ? '#EDE9FE' : '#F1F5F9'} />

          {/* Rain Clouds */}
          <g transform="translate(100, 20)">
            <ellipse cx="150" cy="60" rx="70" ry="40" fill={isPainted ? '#93C5FD' : '#94A3B8'} />
            <ellipse cx="220" cy="50" rx="80" ry="50" fill={isPainted ? '#60A5FA' : '#CBD5E1'} />
            <ellipse cx="300" cy="65" rx="60" ry="35" fill={isPainted ? '#93C5FD' : '#94A3B8'} />
          </g>
          <g transform="translate(450, 10)">
            <ellipse cx="150" cy="60" rx="70" ry="40" fill={isPainted ? '#93C5FD' : '#94A3B8'} />
            <ellipse cx="220" cy="50" rx="80" ry="50" fill={isPainted ? '#60A5FA' : '#CBD5E1'} />
          </g>

          {/* Rain Drops */}
          {[120, 200, 280, 520, 600, 680, 750].map((x, i) => (
            <line key={i} x1={x} y1={130 + (i % 3) * 20} x2={x - 15} y2={180 + (i % 3) * 20} stroke={isPainted ? '#38BDF8' : '#94A3B8'} strokeWidth="3" strokeDasharray="6 6" className="animate-pulse" />
          ))}

          {/* Animal Friends huddled safely */}
          <g transform="translate(300, 280)">
            <ellipse cx="40" cy="80" rx="35" ry="45" fill="#B45309" />
            <circle cx="40" cy="40" r="30" fill="#B45309" />
            <ellipse cx="110" cy="85" rx="25" ry="35" fill="#D97706" />
            <circle cx="110" cy="50" r="22" fill="#D97706" />
            <circle cx="170" cy="90" r="22" fill="#22C55E" />
            {isPainted && (
              <g>
                <path d="M 32 45 Q 40 52 48 45" stroke="#451A03" strokeWidth="2.5" />
                <path d="M 104 55 Q 110 60 116 55" stroke="#451A03" strokeWidth="2.5" />
                <path d="M 164 94 Q 170 99 176 94" stroke="#14532D" strokeWidth="2.5" />
              </g>
            )}
          </g>

          {/* Interactive Target: BIG UMBRELLA (NO moving/spinning circle) */}
          <g onClick={handleTargetClick} className="cursor-pointer transition-transform hover:scale-105 active:scale-95" transform="translate(230, 110)">
            <line x1="170" y1="90" x2="170" y2="280" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
            <path d="M 170 280 C 170 305 145 305 145 285" stroke="#78350F" strokeWidth="8" strokeLinecap="round" fill="none" />
            {isPainted ? (
              <g>
                <path d="M 170 40 L 0 140 Q 45 130 90 140 Z" fill="#EF4444" />
                <path d="M 170 40 L 90 140 Q 130 130 170 140 Z" fill="#FACC15" />
                <path d="M 170 40 L 170 140 Q 210 130 250 140 Z" fill="#22C55E" />
                <path d="M 170 40 L 250 140 Q 295 130 340 140 Z" fill="#3B82F6" />
                <polygon points="170,25 162,45 178,45" fill="#F59E0B" />
                <path d="M 0 140 Q 45 130 90 140 Q 130 130 170 140 Q 210 130 250 140 Q 295 130 340 140" stroke="#FFFFFF" strokeWidth="3" fill="none" />
              </g>
            ) : (
              <g>
                <path d="M 170 40 L 0 140 Q 45 130 90 140 Q 130 130 170 140 Q 210 130 250 140 Q 295 130 340 140 Z" fill="#FFFFFF" stroke="#64748B" strokeWidth="4" />
                <line x1="170" y1="40" x2="90" y2="140" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="170" y1="40" x2="170" y2="140" stroke="#CBD5E1" strokeWidth="2" />
                <line x1="170" y1="40" x2="250" y2="140" stroke="#CBD5E1" strokeWidth="2" />
              </g>
            )}
          </g>
        </svg>
      )}

      {/* Page 9: Rainbow World */}
      {pageId === 9 && (
        <svg viewBox="0 0 800 480" className="w-full h-full object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="480" fill={isPainted ? '#E0F2FE' : '#F8FAFC'} />
          <path d="M 0 340 Q 200 280 400 320 T 800 300 L 800 480 L 0 480 Z" fill={isPainted ? '#86EFAC' : '#E2E8F0'} />
          <path d="M 0 390 Q 300 340 600 380 T 800 370 L 800 480 L 0 480 Z" fill={isPainted ? '#4ADE80' : '#CBD5E1'} />

          {/* Smiling Sun */}
          <g transform="translate(640, 40)">
            {isPainted ? (
              <g>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <line
                    key={angle}
                    x1="60"
                    y1="60"
                    x2={60 + 55 * Math.cos((angle * Math.PI) / 180)}
                    y2={60 + 55 * Math.sin((angle * Math.PI) / 180)}
                    stroke="#F59E0B"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                ))}
                <circle cx="60" cy="60" r="38" fill="#FACC15" />
                <circle cx="50" cy="54" r="5" fill="#78350F" />
                <circle cx="70" cy="54" r="5" fill="#78350F" />
                <path d="M 50 68 Q 60 78 70 68" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
              </g>
            ) : (
              <circle cx="60" cy="60" r="38" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="4" />
            )}
          </g>

          {/* Interactive Target: THE RAINBOW (NO moving/spinning circle) */}
          <g onClick={handleTargetClick} className="cursor-pointer transition-transform hover:scale-105 active:scale-95" transform="translate(100, 40)">
            {isPainted ? (
              <g>
                <path d="M 50 260 A 250 250 0 0 1 550 260" stroke="#EF4444" strokeWidth="16" fill="none" />
                <path d="M 66 260 A 234 234 0 0 1 534 260" stroke="#F97316" strokeWidth="16" fill="none" />
                <path d="M 82 260 A 218 218 0 0 1 518 260" stroke="#FACC15" strokeWidth="16" fill="none" />
                <path d="M 98 260 A 202 202 0 0 1 502 260" stroke="#22C55E" strokeWidth="16" fill="none" />
                <path d="M 114 260 A 186 186 0 0 1 486 260" stroke="#3B82F6" strokeWidth="16" fill="none" />
                <path d="M 130 260 A 170 170 0 0 1 470 260" stroke="#1E3A8A" strokeWidth="16" fill="none" />
                <path d="M 146 260 A 154 154 0 0 1 454 260" stroke="#9333EA" strokeWidth="16" fill="none" />
                <ellipse cx="50" cy="260" rx="45" ry="30" fill="#FFFFFF" />
                <ellipse cx="550" cy="260" rx="45" ry="30" fill="#FFFFFF" />
              </g>
            ) : (
              <g>
                <path d="M 50 260 A 250 250 0 0 1 550 260" stroke="#94A3B8" strokeWidth="20" strokeDasharray="10 10" fill="none" />
              </g>
            )}
          </g>

          {/* Celebratory Animal Friends */}
          <g transform="translate(180, 310)">
            <circle cx="60" cy="40" r="30" fill={isPainted ? '#B45309' : '#CBD5E1'} />
            <ellipse cx="60" cy="85" rx="35" ry="35" fill={isPainted ? '#B45309' : '#CBD5E1'} />
            <circle cx="150" cy="48" r="22" fill={isPainted ? '#D97706' : '#94A3B8'} />
            <ellipse cx="150" cy="85" rx="25" ry="30" fill={isPainted ? '#D97706' : '#94A3B8'} />
            <circle cx="230" cy="65" r="22" fill={isPainted ? '#22C55E' : '#94A3B8'} />
            {isPainted && (
              <g>
                <circle cx="30" cy="-20" r="16" fill="#EF4444" />
                <line x1="30" y1="-4" x2="35" y2="40" stroke="#64748B" strokeWidth="2" />
                <circle cx="270" cy="-30" r="16" fill="#3B82F6" />
                <line x1="270" y1="-14" x2="250" y2="40" stroke="#64748B" strokeWidth="2" />
              </g>
            )}
          </g>
        </svg>
      )}
    </div>
  );
};
