/**
 * Poco's Magic Brush (포코의 요술 붓)
 * Interactive Pre-A1 English Picture Book App for 1st Graders
 */

import { useState } from 'react';
import { ScreenType } from './types';
import { STORY_PAGES } from './data/storyData';
import { CoverScreen } from './components/CoverScreen';
import { StoryPageScreen } from './components/StoryPageScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { WordBookModal } from './components/WordBookModal';
import { QUIZ_QUESTIONS } from './data/quizData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('cover');
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [paintedPages, setPaintedPages] = useState<Record<number, boolean>>({});
  const [recordings, setRecordings] = useState<Record<number, string | null>>({});
  const [quizScore, setQuizScore] = useState<number>(0);
  const [isSlowAudio, setIsSlowAudio] = useState<boolean>(false);
  const [isWordbookOpen, setIsWordbookOpen] = useState<boolean>(false);

  const currentPage = STORY_PAGES[currentPageIndex];

  // Screen Transitions
  const handleStartStory = () => {
    setCurrentPageIndex(0);
    setCurrentScreen('story');
  };

  const handlePaintCurrentPage = () => {
    setPaintedPages((prev) => ({
      ...prev,
      [currentPage.id]: true,
    }));
  };

  const handleNextStoryPage = () => {
    // 화면을 클릭해 색칠하기 전까지는 다음 페이지로 넘어가지 못함
    if (!paintedPages[currentPage.id]) {
      return;
    }

    if (currentPageIndex + 1 < STORY_PAGES.length) {
      setCurrentPageIndex((prev) => prev + 1);
    } else {
      // Transition to quiz after finishing story
      setCurrentScreen('quiz');
    }
  };

  const handlePrevStoryPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const handleGoHome = () => {
    setCurrentScreen('cover');
  };

  const handleCompleteQuiz = (finalScore: number) => {
    setQuizScore(finalScore);
    setCurrentScreen('result');
  };

  const handleReadAgain = () => {
    setCurrentPageIndex(0);
    setCurrentScreen('story');
  };

  const handleSaveAudioUrl = (pageId: number, url: string | null) => {
    setRecordings((prev) => ({
      ...prev,
      [pageId]: url,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-sky-50 to-amber-50 text-slate-800 flex flex-col justify-between">
      <main className="flex-1 w-full">
        {currentScreen === 'cover' && (
          <CoverScreen
            onStartStory={handleStartStory}
            onOpenWordbook={() => setIsWordbookOpen(true)}
          />
        )}

        {currentScreen === 'story' && (
          <StoryPageScreen
            page={currentPage}
            totalPages={STORY_PAGES.length}
            isPainted={!!paintedPages[currentPage.id]}
            onPaint={handlePaintCurrentPage}
            onPrevPage={handlePrevStoryPage}
            onNextPage={handleNextStoryPage}
            onGoHome={handleGoHome}
            onOpenWordbook={() => setIsWordbookOpen(true)}
            isSlowAudio={isSlowAudio}
            onToggleSlowAudio={() => setIsSlowAudio((s) => !s)}
            savedAudioUrl={recordings[currentPage.id]}
            onSaveAudioUrl={handleSaveAudioUrl}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizScreen
            onCompleteQuiz={handleCompleteQuiz}
            isSlowAudio={isSlowAudio}
          />
        )}

        {currentScreen === 'result' && (
          <ResultScreen
            score={quizScore}
            totalQuestions={QUIZ_QUESTIONS.length}
            onReadAgain={handleReadAgain}
            onOpenWordbook={() => setIsWordbookOpen(true)}
            onGoHome={handleGoHome}
          />
        )}
      </main>

      {/* Wordbook Sticker Album Modal */}
      <WordBookModal
        isOpen={isWordbookOpen}
        onClose={() => setIsWordbookOpen(false)}
        paintedPages={paintedPages}
        recordings={recordings}
        isSlowAudio={isSlowAudio}
      />
    </div>
  );
}
