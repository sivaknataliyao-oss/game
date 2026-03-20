import { RoomId, NpcId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.LIVING_ROOM,
  name: 'Гостиная',
  description: 'Главный зал. Гости шепчутся по углам.',
  width: 10,
  height: 8,
  tileColors: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 0, 2, 2, 2, 2, 0, 2, 0],
    [0, 2, 0, 2, 2, 2, 2, 0, 2, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  exits: [
    { targetRoom: RoomId.ENTRANCE, x: 0, y: 3, label: '← Прихожая' },
    { targetRoom: RoomId.KITCHEN, x: 9, y: 3, label: '→ Кухня' },
    { targetRoom: RoomId.LIBRARY, x: 5, y: 0, label: '↑ Библиотека' },
    { targetRoom: RoomId.GARDEN, x: 5, y: 7, label: '↓ Сад' },
    { targetRoom: RoomId.BEDROOM, x: 0, y: 6, label: '↗ Спальня' },
  ],
  hotspots: [
    { x: 3, y: 2, width: 1, height: 1, label: 'Большой диван' },
    { x: 6, y: 2, width: 1, height: 1, label: 'Камин' },
    { x: 4, y: 5, width: 1, height: 1, label: 'Журнальный столик с фотоальбомом', evidenceId: 'strange_photo' },
    { x: 7, y: 5, width: 1, height: 1, label: 'Торт на столе' },
    { x: 2, y: 3, width: 1, height: 1, label: 'Гирлянды мигают' },
    { x: 8, y: 1, width: 1, height: 1, label: 'Книжная полка' },
  ],
  npcs: [
    { npcId: NpcId.SVETA, x: 5, y: 3 },
    { npcId: NpcId.ARINA, x: 7, y: 4 },
  ],
  ambientColor: 0x1E1E35,
  playerStart: { x: 1, y: 3 },
};

export function registerLivingRoom(): void {
  RoomManager.register(room);
}
