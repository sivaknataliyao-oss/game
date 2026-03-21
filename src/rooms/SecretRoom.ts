import { RoomId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.SECRET_ROOM,
  name: 'Личная комната',
  description: 'Здесь она была собой. Без камер, без масок.',
  width: 6,
  height: 6,
  tileColors: [
    [4, 4, 4, 4, 4, 4],
    [4, 2, 0, 0, 2, 4],
    [4, 0, 2, 2, 0, 4],
    [4, 0, 2, 2, 0, 4],
    [4, 2, 0, 0, 2, 4],
    [4, 4, 4, 4, 4, 4],
  ],
  exits: [
    { targetRoom: RoomId.MIRROR_ROOM, x: 0, y: 3, label: '← Зеркальная' },
  ],
  hotspots: [
    { x: 3, y: 2, width: 1, height: 1, label: 'Рабочий стол', action: 'secret_desk' },
    { x: 1, y: 1, width: 1, height: 1, label: 'Рисунок на стене', action: 'secret_drawing' },
    { x: 4, y: 1, width: 1, height: 1, label: 'Старые записи' },
    { x: 1, y: 4, width: 1, height: 1, label: 'Чашка чая' },
    { x: 4, y: 4, width: 1, height: 1, label: 'Сломанные часы — полночь' },
  ],
  npcs: [],
  ambientColor: 0x0A0520,
  playerStart: { x: 1, y: 3 },
};

export function registerSecretRoom(): void {
  RoomManager.register(room);
}
