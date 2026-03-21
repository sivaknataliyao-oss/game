import { RoomId } from '../config';
import { StateManager } from './StateManager';

export interface EvidenceItem {
  id: string;
  name: string;
  description: string;
  room: RoomId;
  detailText: string;
  conditional?: boolean;
  conditionFlag?: string;
  lockedText?: string;
}

const ALL_EVIDENCE: EvidenceItem[] = [
  {
    id: 'clue_guestbook',
    name: 'Гостевая книга',
    description: 'Найдена в прихожей',
    room: RoomId.ENTRANCE,
    detailText: '«Semiira — душа компании!» «S. была тихой. Рисовала в углу.» «10/10» — TrueViewer42. Все описывают разных людей.',
  },
  {
    id: 'clue_toast_tape',
    name: 'Тост-кассета',
    description: 'VHS-плеер в гостиной',
    room: RoomId.LIVING_ROOM,
    detailText: 'SEMIIRA: «Привет всем! Это лучший день…» [глитч] «…жизни.» [обрыв] Улыбка отрепетированная.',
  },
  {
    id: 'clue_photo',
    name: 'Фотография',
    description: 'На стене в гостиной',
    room: RoomId.LIVING_ROOM,
    detailText: 'Два лица на фото. Одно яркое. Другое размытое. «Которая из них я?»',
  },
  {
    id: 'clue_note',
    name: 'Записка',
    description: 'На барной стойке',
    room: RoomId.KITCHEN,
    detailText: 'Мятая записка. «Света, я забыла своё лицо. — С.»',
  },
  {
    id: 'clue_mirror',
    name: 'Осколок зеркала',
    description: 'В спальне на полу',
    room: RoomId.BEDROOM,
    detailText: 'Осколок зеркала. Отражение — грустнее. Отпечатки пальцев.',
  },
  {
    id: 'clue_real_tape',
    name: 'Настоящая кассета',
    description: 'В ящике стола в спальне',
    room: RoomId.BEDROOM,
    conditional: true,
    conditionFlag: 'sveta_told_tape',
    lockedText: 'Ящик заперт. Может, кто-то знает…',
    detailText: 'SEMIIRA: «Это… я. Настоящая.» «Я не помню, кто я.» «Все помнят разную.» «Кто помнит правильно?»',
  },
  {
    id: 'clue_diary',
    name: 'Дневник стримера',
    description: 'В библиотеке на полке',
    room: RoomId.LIBRARY,
    detailText: 'Записи за два года. Первые — живые, смешные. Последние — сухие, по шаблону. «Сегодня стрим #847. Улыбнуться. Поздороваться. Не забыть подписку.»',
  },
  {
    id: 'clue_fan_letters',
    name: 'Письма фанатов',
    description: 'В коробке на чердаке',
    room: RoomId.ATTIC,
    detailText: '«Ты такая весёлая!» «Ты такая загадочная...» «Ты такая грустная на самом деле.» Каждый описывает совершенно другого человека.',
  },
  {
    id: 'clue_old_photo',
    name: 'Старое фото',
    description: 'В саду, у скамейки',
    room: RoomId.GARDEN,
    detailText: 'Фото до стримов. Никакого неона, никакого макияжа. Обычная девушка в свитере. На обороте: «Последний нормальный день.»',
  },
  {
    id: 'clue_broken_award',
    name: 'Разбитая награда',
    description: 'В подвале, старая студия',
    room: RoomId.BASEMENT,
    detailText: 'Стриминговая награда «Лучший развлекательный канал». Сломана пополам. Рядом записка: «Это не я.»',
  },
];

class EvidenceManagerClass {
  getAll(): EvidenceItem[] {
    return ALL_EVIDENCE;
  }

  getForRoom(room: RoomId): EvidenceItem[] {
    return ALL_EVIDENCE.filter(e => e.room === room);
  }

  getCollected(): EvidenceItem[] {
    return ALL_EVIDENCE.filter(e => StateManager.hasEvidence(e.id));
  }

  getById(id: string): EvidenceItem | undefined {
    return ALL_EVIDENCE.find(e => e.id === id);
  }

  collect(id: string): EvidenceItem | undefined {
    const item = this.getById(id);
    if (!item) return undefined;

    if (item.conditional && item.conditionFlag) {
      if (!StateManager.hasSeenDialogue(item.conditionFlag)) {
        return undefined;
      }
    }

    if (!StateManager.hasEvidence(id)) {
      StateManager.collectEvidence(id);
      return item;
    }
    return undefined;
  }

  isCollected(id: string): boolean {
    return StateManager.hasEvidence(id);
  }

  isLocked(id: string): boolean {
    const item = this.getById(id);
    if (!item || !item.conditional || !item.conditionFlag) return false;
    return !StateManager.hasSeenDialogue(item.conditionFlag);
  }

  getLockedText(id: string): string | undefined {
    const item = this.getById(id);
    return item?.lockedText;
  }
}

export const EvidenceManager = new EvidenceManagerClass();
