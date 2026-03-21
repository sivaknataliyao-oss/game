import { NpcId } from '../../config';
import { DialogueTree } from '../../systems/DialogueManager';

export const glamDialogue: DialogueTree = {
  npcId: NpcId.GLAM,
  startNode: 'glam_1',
  getStartNodeId: (state) => {
    const met = state.dialoguesSeen['met_glam'];
    const done = state.dialoguesSeen['glam_done'];
    if (done) return 'glam_post';
    if (met && state.clueCount >= 2) return 'glam_2';
    if (met) return 'glam_idle';
    return 'glam_1';
  },
  nodes: {
    glam_1: {
      id: 'glam_1',
      speaker: 'Гламурная',
      text: '',
      lines: [
        'О, новое лицо!',
        'Добро пожаловать!',
      ],
      choices: [
        { text: 'Ты знаешь Semiira?', next: 'glam_1a' },
        { text: 'Странная вечеринка.', next: 'glam_1b' },
        { text: 'Как ты сюда попала?', next: 'glam_1c' },
      ],
    },
    glam_1a: {
      id: 'glam_1a',
      speaker: 'Гламурная',
      text: '',
      lines: [
        'Конечно! Лучшие подруги!',
        'Ну… тусовались на ивентах.',
        'Посмотри на всё это!',
      ],
      setFlags: { met_glam: true },
      returnTo: 'glam_1',
    },
    glam_1b: {
      id: 'glam_1b',
      speaker: 'Гламурная',
      text: '',
      lines: [
        'Странная? Это арт!',
        'VHS-эстетика, неон…',
      ],
      setFlags: { met_glam: true },
      returnTo: 'glam_1',
    },
    glam_1c: {
      id: 'glam_1c',
      speaker: 'Гламурная',
      text: '',
      lines: [
        'Мне переслали приглашение.',
        'Но это же одно и то же?',
      ],
      setFlags: { met_glam: true },
      returnTo: 'glam_1',
    },
    glam_idle: {
      id: 'glam_idle',
      speaker: 'Гламурная',
      text: 'Отличная вечеринка!',
      isEnd: true,
    },
    glam_2: {
      id: 'glam_2',
      speaker: 'Гламурная',
      text: '',
      lines: [
        'А, ты опять.',
      ],
      choices: [
        { text: 'Книга гостей — все видят разное.', next: 'glam_2a' },
        { text: 'Ты знаешь Semiira или образ?', next: 'glam_2b' },
        { text: 'Ты что-то скрываешь.', next: 'glam_2c' },
      ],
    },
    glam_2a: {
      id: 'glam_2a',
      speaker: 'Гламурная',
      text: '',
      lines: [
        'Semiira — звезда. Точка.',
        'Не слушай ту девочку у бара.',
      ],
      setFlags: { glam_done: true },
      returnTo: 'glam_2',
    },
    glam_2b: {
      id: 'glam_2b',
      speaker: 'Гламурная',
      text: '',
      lines: [
        'Не все секреты нужно раскрывать.',
      ],
      setFlags: { glam_done: true },
      returnTo: 'glam_2',
    },
    glam_2c: {
      id: 'glam_2c',
      speaker: 'Гламурная',
      text: '',
      lines: [
        'Не лезь, куда не просят.',
      ],
      setFlags: { glam_done: true },
      returnTo: 'glam_2',
    },
    glam_post: {
      id: 'glam_post',
      speaker: 'Гламурная',
      text: 'Наслаждайся вечером.',
      isEnd: true,
    },
  },
};
