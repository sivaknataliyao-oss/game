// Ending logic is implemented in FinaleScene.ts
// Slideshow data is in SlideshowScene.ts
// This file documents the ending types for reference

export const ENDING_TYPES = {
  TRUE: {
    title: 'Истинный конец',
    condition: 'Правильно назвал лжеца + версию + правду',
  },
  BITTER: {
    title: 'Горькая правда',
    condition: 'Хотя бы один правильный ответ',
  },
  DISTORTED: {
    title: 'Искажённый конец',
    condition: 'Все ответы неправильные',
  },
  SECRET: {
    title: 'Секретный конец',
    condition: 'Все улики собраны + все ответы правильные',
  },
} as const;
