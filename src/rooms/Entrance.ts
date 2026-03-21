import { RoomId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.ENTRANCE,
  name: 'Прихожая',
  description: 'Парадный вход. Гирлянды мигают неровно. Книга гостей на столе.',
  width: 8,
  height: 6,
  tileColors: [
    [6, 6, 6, 6, 6, 6, 6, 6],
    [6, 0, 0, 0, 0, 0, 0, 6],
    [6, 0, 2, 2, 2, 2, 0, 6],
    [6, 0, 2, 2, 2, 2, 0, 6],
    [6, 0, 0, 0, 0, 0, 0, 6],
    [6, 6, 6, 6, 6, 6, 6, 6],
  ],
  exits: [
    { targetRoom: RoomId.LIVING_ROOM, x: 7, y: 3, label: '→ Гостиная' },
  ],
  hotspots: [
    { x: 1, y: 1, width: 1, height: 1, label: 'Вешалка с пальто', action: 'entrance_coats' },
    { x: 3, y: 1, width: 1, height: 1, label: 'Книга гостей', evidenceId: 'clue_guestbook' },
    { x: 5, y: 1, width: 1, height: 1, label: 'Зеркало у входа', action: 'hall_mirror' },
    { x: 2, y: 4, width: 1, height: 1, label: 'Свечи на полу' },
    { x: 5, y: 4, width: 1, height: 1, label: 'Сухие цветы', action: 'hall_flowers' },
  ],
  npcs: [],
  ambientColor: 0x1A1A2E,
  playerStart: { x: 1, y: 3 },
};

export function registerEntrance(): void {
  RoomManager.register(room);
}
