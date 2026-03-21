import { RoomId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.GARDEN,
  name: 'Сад',
  description: 'Лунный свет. Сухие цветы. Забытая скамейка.',
  width: 10,
  height: 8,
  tileColors: [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 1, 1, 1, 1, 1, 1, 3, 3],
    [3, 1, 3, 3, 3, 3, 3, 3, 1, 3],
    [3, 1, 3, 3, 3, 3, 3, 3, 1, 3],
    [3, 1, 3, 3, 3, 3, 3, 3, 1, 3],
    [3, 1, 3, 3, 3, 3, 3, 3, 1, 3],
    [3, 3, 1, 1, 1, 1, 1, 1, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ],
  exits: [
    { targetRoom: RoomId.LIVING_ROOM, x: 5, y: 0, label: '↑ Гостиная' },
  ],
  hotspots: [
    { x: 2, y: 2, width: 1, height: 1, label: 'Сухие кусты' },
    { x: 7, y: 2, width: 1, height: 1, label: 'Фонарики', action: 'garden_lanterns' },
    { x: 4, y: 4, width: 1, height: 1, label: 'Старое фото', evidenceId: 'clue_old_photo' },
    { x: 8, y: 5, width: 1, height: 1, label: 'Скамейка', action: 'garden_bench' },
    { x: 2, y: 5, width: 1, height: 1, label: 'Каменная дорожка' },
    { x: 5, y: 6, width: 1, height: 1, label: 'Увядшие цветы' },
  ],
  npcs: [],
  ambientColor: 0x0F1A20,
  playerStart: { x: 5, y: 1 },
};

export function registerGarden(): void {
  RoomManager.register(room);
}
