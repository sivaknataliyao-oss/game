import { RoomId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.SECRET_ROOM,
  name: 'Секретная комната',
  description: 'Ты нашла правду. Или она нашла тебя.',
  width: 6,
  height: 6,
  tileColors: [
    [4, 4, 4, 4, 4, 4],
    [4, 2, 5, 5, 2, 4],
    [4, 5, 2, 2, 5, 4],
    [4, 5, 2, 2, 5, 4],
    [4, 2, 5, 5, 2, 4],
    [4, 4, 4, 4, 4, 4],
  ],
  exits: [
    { targetRoom: RoomId.MIRROR_ROOM, x: 0, y: 3, label: '← Зеркальная' },
  ],
  hotspots: [
    { x: 3, y: 2, width: 1, height: 1, label: 'Постамент с книгой', evidenceId: 'last_page' },
    { x: 1, y: 1, width: 1, height: 1, label: 'Портрет Семииры (Праздничная)' },
    { x: 4, y: 1, width: 1, height: 1, label: 'Портрет Семииры (Истинная)' },
    { x: 1, y: 4, width: 1, height: 1, label: 'Портрет Семииры (Отражённая)' },
    { x: 4, y: 4, width: 1, height: 1, label: 'Сломанные часы — полночь' },
  ],
  npcs: [],
  ambientColor: 0x0A0520,
  playerStart: { x: 1, y: 3 },
};

export function registerSecretRoom(): void {
  RoomManager.register(room);
}
