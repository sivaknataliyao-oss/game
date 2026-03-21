import { NpcId } from '../../config';
import { DialogueTree } from '../../systems/DialogueManager';

export const viewerDialogue: DialogueTree = {
  npcId: NpcId.VIEWER,
  startNode: 'viewer_1',
  getStartNodeId: (state) => {
    const met = state.dialoguesSeen['met_viewer'];
    const done = state.dialoguesSeen['viewer_done'];
    if (done) return 'viewer_post';
    if (met && state.clueCount >= 2) return 'viewer_2';
    if (met) return 'viewer_idle';
    return 'viewer_1';
  },
  nodes: {
    viewer_1: {
      id: 'viewer_1',
      speaker: 'Зритель',
      text: '',
      lines: [
        'Тш. Тише.',
        'Пересматриваю стрим.',
        'Ты из чата?',
      ],
      choices: [
        { text: 'Я получил приглашение.', next: 'viewer_1a' },
        { text: 'Давно смотришь?', next: 'viewer_1b' },
        { text: 'Это пугает.', next: 'viewer_1c' },
      ],
    },
    viewer_1a: {
      id: 'viewer_1a',
      speaker: 'Зритель',
      text: '',
      lines: [
        'Реальное? Повезло…',
        'Я написал 47 писем.',
      ],
      setFlags: { met_viewer: true },
      returnTo: 'viewer_1',
    },
    viewer_1b: {
      id: 'viewer_1b',
      speaker: 'Зритель',
      text: '',
      lines: [
        '847 дней подряд.',
        'На стриме #412 она моргнула не так.',
      ],
      setFlags: { met_viewer: true },
      returnTo: 'viewer_1',
    },
    viewer_1c: {
      id: 'viewer_1c',
      speaker: 'Зритель',
      text: '',
      lines: [
        'Кто-то должен помнить правильно.',
        'А я вижу ВСЁ.',
      ],
      setFlags: { met_viewer: true },
      returnTo: 'viewer_1',
    },
    viewer_idle: {
      id: 'viewer_idle',
      speaker: 'Зритель',
      text: 'Не мешай.',
      isEnd: true,
    },
    viewer_2: {
      id: 'viewer_2',
      speaker: 'Зритель',
      text: '',
      lines: [
        'Ты тоже заметил?',
      ],
      choices: [
        { text: 'Что ты имеешь в виду?', next: 'viewer_2a' },
        { text: 'Как помнить правильно?', next: 'viewer_2b' },
        { text: 'Тебе нужна помощь.', next: 'viewer_2c' },
      ],
    },
    viewer_2a: {
      id: 'viewer_2a',
      speaker: 'Зритель',
      text: '',
      lines: [
        'Зеркала. Я вижу другую.',
        'Или придумываю.',
      ],
      setFlags: { viewer_done: true },
      returnTo: 'viewer_2',
    },
    viewer_2b: {
      id: 'viewer_2b',
      speaker: 'Зритель',
      text: '',
      lines: [
        'Все помнят разную Semiira.',
        'Может, никто — правильно.',
      ],
      setFlags: { viewer_done: true },
      returnTo: 'viewer_2',
    },
    viewer_2c: {
      id: 'viewer_2c',
      speaker: 'Зритель',
      text: '',
      lines: [
        'ЕЙ нужна помощь.',
        'Она заперта в образе.',
      ],
      setFlags: { viewer_done: true },
      returnTo: 'viewer_2',
    },
    viewer_post: {
      id: 'viewer_post',
      speaker: 'Зритель',
      text: 'Я всё ещё здесь.',
      isEnd: true,
    },
  },
};
