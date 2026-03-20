import { RoomId } from '../config';
import { StateManager } from './StateManager';

export interface EvidenceItem {
  id: string;
  name: string;
  description: string;
  room: RoomId;
  seedVariant?: string;
  detailText: string;
}

const ALL_EVIDENCE: EvidenceItem[] = [
  {
    id: 'torn_invitation',
    name: 'Разорванное приглашение',
    description: 'Найдено в прихожей',
    room: RoomId.ENTRANCE,
    detailText: 'Половина приглашения на вечеринку. Текст обрывается на: «...не приходи, если помнишь...»',
  },
  {
    id: 'recipe_note',
    name: 'Рецепт с запиской',
    description: 'Кухня, на обороте зашифрованное сообщение',
    room: RoomId.KITCHEN,
    detailText: 'На лицевой — рецепт торта. На обороте неразборчивым почерком: «Она не та, за кого себя выдаёт. Проверь зеркала.»',
  },
  {
    id: 'strange_photo',
    name: 'Странная фотография',
    description: 'Семиира выглядит иначе',
    room: RoomId.LIVING_ROOM,
    detailText: 'Групповое фото с прошлой вечеринки. Все улыбаются, но лицо Семииры... размыто. Как будто фотоаппарат не смог её запечатлеть.',
  },
  {
    id: 'maks_diary',
    name: 'Дневник Макса',
    description: 'Записи о трёх версиях',
    room: RoomId.LIBRARY,
    detailText: '«Я заметил три Семииры. Праздничная — та, что смеётся. Истинная — та, что молчит. Отражённая — та, что смотрит из зеркал. Какая из них настоящая?»',
  },
  {
    id: 'wilted_flowers',
    name: 'Увядшие цветы',
    description: 'Необычные растения в саду',
    room: RoomId.GARDEN,
    detailText: 'Цветы, которые цветут только при лунном свете. Кто-то посадил их кругом, как защитный символ. Лепестки холодные на ощупь.',
  },
  {
    id: 'mirror_shard',
    name: 'Осколок зеркала',
    description: 'Показывает отражение не того, кто смотрит',
    room: RoomId.BEDROOM,
    detailText: 'Маленький осколок от большого зеркала. Когда смотришь в него, видишь не себя — а кого-то похожего. Но с другими глазами.',
  },
  {
    id: 'vhs_tape',
    name: 'VHS-кассета',
    description: 'Запись прошлого праздника',
    room: RoomId.BASEMENT,
    detailText: 'Кассета с надписью «ДР — НЕ СМОТРЕТЬ». На записи — вечеринка, которой ты не помнишь. Все гости те же. Но ты на ней — другая.',
  },
  {
    id: 'old_letter',
    name: 'Старое письмо',
    description: 'От неизвестного отправителя',
    room: RoomId.ATTIC,
    detailText: '«Дорогая Семиира, если ты читаешь это — значит, ты снова забыла. Зеркала помнят. Гости помнят. Только ты — нет. Но так было нужно.»',
  },
  {
    id: 'mirror_key',
    name: 'Зеркальный ключ',
    description: 'Открывает зеркальную комнату',
    room: RoomId.BATHROOM,
    detailText: 'Ключ из отражающего металла. На нём выгравировано: «Правда — за отражением». Подходит к двери, которую ты раньше не замечала.',
  },
  {
    id: 'last_page',
    name: 'Последняя страница',
    description: 'Разгадка всей истории',
    room: RoomId.SECRET_ROOM,
    detailText: '«Все три Семииры — это ты. Праздничная — та, которую видят гости. Истинная — та, которую видишь ты сама. Отражённая — та, которую помнит дом. Ты не разбита. Ты — целая.»',
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
    if (item && !StateManager.hasEvidence(id)) {
      StateManager.collectEvidence(id);
      return item;
    }
    return undefined;
  }

  isCollected(id: string): boolean {
    return StateManager.hasEvidence(id);
  }
}

export const EvidenceManager = new EvidenceManagerClass();
