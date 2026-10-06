export type ItemType =
  | 'apple'
  | 'carrot'
  | 'banana'
  | 'leaf'
  | 'water'
  | 'whale'
  | 'grapes'
  | 'umbrella'
  | 'rainbow';

export interface StoryPage {
  id: number;
  title: string;
  storyEn: string;
  storyKo: string;
  targetWord: string;
  targetColorName: string;
  targetColorHex: string;
  targetItemName: string;
  targetItemKo: string;
  interactivePromptKo: string;
  speechTokens: string[];
  colorWordKey: string;
  objectWordKey: string;
}

export interface QuizQuestion {
  id: number;
  promptEn: string;
  promptKo: string;
  targetColor: string;
  correctOptionId: string;
  options: {
    id: string;
    nameEn: string;
    nameKo: string;
    colorHex: string;
    itemType: ItemType;
  }[];
}

export interface WordbookItem {
  id: string;
  wordEn: string;
  wordKo: string;
  colorName: string;
  colorHex: string;
  pageId: number;
  itemType: ItemType;
}

export type ScreenType = 'cover' | 'story' | 'quiz' | 'result';
