import { RoomId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.BEDROOM,
  name: 'Спальня Semiira',
  description: 'Её комната. Плюшевая игрушка на кровати. Блокнот.',
  width: 8,
  height: 7,
  tileColors: [
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 0, 0, 0, 0, 2, 2],
    [2, 0, 2, 2, 2, 2, 0, 2],
    [2, 0, 2, 2, 2, 2, 0, 2],
    [2, 0, 2, 2, 2, 2, 0, 2],
    [2, 2, 0, 0, 0, 0, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2],
  ],
  exits: [
    { targetRoom: RoomId.LIVING_ROOM, x: 0, y: 3, label: '← Гостиная' },
    { targetRoom: RoomId.BATHROOM, x: 7, y: 3, label: '→ Ванная' },
  ],
  hotspots: [
    { x: 3, y: 1, width: 1, height: 1, label: 'Плюшевая игрушка', action: 'plushie' },
    { x: 6, y: 1, width: 1, height: 1, label: 'Монитор', action: 'monitor' },
    { x: 1, y: 3, width: 1, height: 1, label: 'Блокнот', action: 'notebook' },
    { x: 5, y: 3, width: 1, height: 1, label: 'Осколок зеркала', evidenceId: 'clue_mirror' },
    { x: 5, y: 5, width: 1, height: 1, label: 'Ящик стола', evidenceId: 'clue_real_tape' },
    { x: 3, y: 5, width: 1, height: 1, label: 'Кровать' },
  ],
  npcs: [],
  ambientColor: 0x201520,
  playerStart: { x: 1, y: 3 },
};

export function registerBedroom(): void {
  RoomManager.register(room);
}
