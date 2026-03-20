import { RoomId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.BEDROOM,
  name: 'Спальня',
  description: 'Твоя комната. Но что-то изменилось.',
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
    { x: 3, y: 1, width: 1, height: 1, label: 'Кровать с балдахином' },
    { x: 6, y: 1, width: 1, height: 1, label: 'Туалетный столик' },
    { x: 1, y: 3, width: 1, height: 1, label: 'Шкаф с одеждой' },
    { x: 5, y: 3, width: 1, height: 1, label: 'Зеркало в раме', evidenceId: 'mirror_shard' },
    { x: 3, y: 5, width: 1, height: 1, label: 'Коробка с фотографиями' },
    { x: 6, y: 5, width: 1, height: 1, label: 'Лампа на тумбочке' },
  ],
  npcs: [],
  ambientColor: 0x201520,
  playerStart: { x: 1, y: 3 },
};

export function registerBedroom(): void {
  RoomManager.register(room);
}
