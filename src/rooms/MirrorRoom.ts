import { RoomId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.MIRROR_ROOM,
  name: 'Зеркальная комната',
  description: 'Всё отражено. Но неправильно.',
  width: 7,
  height: 7,
  tileColors: [
    [5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5],
    [5, 5, 5, 5, 5, 5, 5],
  ],
  exits: [
    { targetRoom: RoomId.BATHROOM, x: 0, y: 3, label: '← Ванная' },
    { targetRoom: RoomId.SECRET_ROOM, x: 6, y: 3, label: '→ ???' },
  ],
  hotspots: [
    { x: 3, y: 1, width: 1, height: 1, label: 'Огромное зеркало' },
    { x: 1, y: 3, width: 1, height: 1, label: 'Отражение — но не твоё' },
    { x: 5, y: 3, width: 1, height: 1, label: 'Зеркальный коридор' },
    { x: 3, y: 5, width: 1, height: 1, label: 'Три силуэта в зеркалах' },
    { x: 2, y: 2, width: 1, height: 1, label: 'Осколки на полу' },
    { x: 4, y: 4, width: 1, height: 1, label: 'Надпись на стене: «ПОМНИ»' },
  ],
  npcs: [],
  ambientColor: 0x0F0F25,
  playerStart: { x: 1, y: 3 },
};

export function registerMirrorRoom(): void {
  RoomManager.register(room);
}
