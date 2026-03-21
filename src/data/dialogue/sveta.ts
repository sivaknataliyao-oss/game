import { NpcId } from '../../config';
import { DialogueTree } from '../../systems/DialogueManager';

export const svetaDialogue: DialogueTree = {
  npcId: NpcId.SVETA,
  startNode: 'sveta_1',
  getStartNodeId: (state) => {
    const met = state.dialoguesSeen['met_sveta'];
    const done = state.dialoguesSeen['sveta_done'];
    if (done) return 'sveta_post';
    if (met && state.clueCount >= 2) return 'sveta_2';
    if (met) return 'sveta_idle';
    return 'sveta_1';
  },
  nodes: {
    sveta_1: {
      id: 'sveta_1',
      speaker: 'Света',
      text: '',
      lines: [
        'Привет.',
        'Ты новенький, да? Она тебя позвала.',
        'Странно… Я думала, знаю всех её друзей.',
      ],
      choices: [
        { text: 'Кто ты для Semiira?', next: 'sveta_1a' },
        { text: 'Что-то не так с вечеринкой?', next: 'sveta_1b' },
        { text: 'Тут все какие-то странные.', next: 'sveta_1c' },
      ],
    },
    sveta_1a: {
      id: 'sveta_1a',
      speaker: 'Света',
      text: '',
      lines: [
        'Подруга. Настоящая.',
        'Ещё до стримов, до всего этого.',
        'Когда она была просто… собой.',
        'Мне кажется, я единственная, кто помнит ту её.',
      ],
      setFlags: { met_sveta: true },
      returnTo: 'sveta_1',
    },
    sveta_1b: {
      id: 'sveta_1b',
      speaker: 'Света',
      text: '',
      lines: [
        'Не с вечеринкой. С ней.',
        'Она стала тем, кого от неё ждут.',
        'Обрати внимание на детали.',
        'Тут всё кричит — что-то не так.',
      ],
      setFlags: { met_sveta: true },
      returnTo: 'sveta_1',
    },
    sveta_1c: {
      id: 'sveta_1c',
      speaker: 'Света',
      text: '',
      lines: [
        'Странные? Может быть.',
        'Но хотя бы я не притворяюсь.',
      ],
      setFlags: { met_sveta: true },
      returnTo: 'sveta_1',
    },
    sveta_idle: {
      id: 'sveta_idle',
      speaker: 'Света',
      text: 'Присмотрись к деталям.',
      isEnd: true,
    },
    sveta_2: {
      id: 'sveta_2',
      speaker: 'Света',
      text: '',
      lines: [
        'Ты нашёл кое-что, да?',
        'Вижу по лицу.',
      ],
      choices: [
        { text: 'Расскажи правду о Semiira.', next: 'sveta_2a' },
        { text: 'Что на кассете в твоих руках?', next: 'sveta_2b' },
        { text: 'Почему ты не уйдёшь?', next: 'sveta_2c' },
      ],
    },
    sveta_2a: {
      id: 'sveta_2a',
      speaker: 'Света',
      text: '',
      lines: [
        'Она записывала кассеты. Не праздничные.',
        'На них она настоящая. Без маски.',
        'Одна — в её комнате. Найди.',
      ],
      setFlags: { sveta_told_tape: true, sveta_done: true },
      returnTo: 'sveta_2',
    },
    sveta_2b: {
      id: 'sveta_2b',
      speaker: 'Света',
      text: '',
      lines: [
        'Это копия. Хотела забрать.',
        'Оригинал — в комнате. Найди.',
      ],
      setFlags: { sveta_told_tape: true, sveta_done: true },
      returnTo: 'sveta_2',
    },
    sveta_2c: {
      id: 'sveta_2c',
      speaker: 'Света',
      text: '',
      lines: [
        'Она — моя подруга.',
        'В комнате есть кассета. Найди.',
      ],
      setFlags: { sveta_told_tape: true, sveta_done: true },
      returnTo: 'sveta_2',
    },
    sveta_post: {
      id: 'sveta_post',
      speaker: 'Света',
      text: 'Кассета в ящике стола.',
      isEnd: true,
    },
  },
};
