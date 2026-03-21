import { RoomId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.BASEMENT,
  name: 'Подвал',
  description: 'Старая стриминговая студия. Сломанная камера.',
  width: 8,
  height: 7,
  tileColors: [
    [4, 4, 4, 4, 4, 4, 4, 4],
    [4, 1, 1, 1, 1, 1, 1, 4],
    [4, 1, 4, 4, 4, 4, 1, 4],
    [4, 1, 4, 1, 1, 4, 1, 4],
    [4, 1, 4, 4, 4, 4, 1, 4],
    [4, 1, 1, 1, 1, 1, 1, 4],
    [4, 4, 4, 4, 4, 4, 4, 4],
  ],
  exits: [
    { targetRoom: RoomId.KITCHEN, x: 4, y: 0, label: '↑ Кухня' },
  ],
  hotspots: [
    { x: 2, y: 1, width: 1, height: 1, label: 'Сломанная камера', action: 'basement_camera' },
    { x: 5, y: 1, width: 1, height: 1, label: 'Стриминговый стол', action: 'basement_setup' },
    { x: 3, y: 3, width: 1, height: 1, label: 'Разбитая награда', evidenceId: 'clue_broken_award' },
    { x: 5, y: 3, width: 1, height: 1, label: 'Стеллаж с кассетами' },
    { x: 1, y: 5, width: 1, height: 1, label: 'Старый VHS-плеер' },
    { x: 6, y: 5, width: 1, height: 1, label: 'Коробка с проводами' },
  ],
  npcs: [],
  ambientColor: 0x0A0A15,
  playerStart: { x: 4, y: 1 },
};

export function registerBasement(): void {
  RoomManager.register(room);
}
