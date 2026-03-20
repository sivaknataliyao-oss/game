import { RoomId, NpcId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.LIBRARY,
  name: 'Библиотека',
  description: 'Книги от пола до потолка. Тишина давит.',
  width: 9,
  height: 7,
  tileColors: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 0, 0, 0, 0, 0, 4, 0],
    [0, 0, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 2, 0, 0, 0, 2, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 0, 0],
    [0, 4, 0, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  exits: [
    { targetRoom: RoomId.LIVING_ROOM, x: 4, y: 6, label: '↓ Гостиная' },
    { targetRoom: RoomId.ATTIC, x: 8, y: 0, label: '↑ Чердак' },
  ],
  hotspots: [
    { x: 1, y: 1, width: 1, height: 1, label: 'Полка с древними книгами' },
    { x: 7, y: 1, width: 1, height: 1, label: 'Полка с фолиантами' },
    { x: 4, y: 3, width: 1, height: 1, label: 'Дневник на столе', evidenceId: 'maks_diary' },
    { x: 2, y: 5, width: 1, height: 1, label: 'Свечи на подставке' },
    { x: 6, y: 5, width: 1, height: 1, label: 'Кресло с пледом' },
    { x: 1, y: 3, width: 1, height: 1, label: 'Глобус' },
    { x: 7, y: 3, width: 1, height: 1, label: 'Старинные часы' },
  ],
  npcs: [
    { npcId: NpcId.MAKS, x: 5, y: 3 },
  ],
  ambientColor: 0x1A1520,
  playerStart: { x: 4, y: 5 },
};

export function registerLibrary(): void {
  RoomManager.register(room);
}
