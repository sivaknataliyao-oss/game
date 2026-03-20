import { RoomId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.BASEMENT,
  name: 'Подвал',
  description: 'Темно. Мерцает старый телевизор.',
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
    { x: 2, y: 1, width: 1, height: 1, label: 'Старые ящики' },
    { x: 5, y: 1, width: 1, height: 1, label: 'Паутина в углу' },
    { x: 3, y: 3, width: 1, height: 1, label: 'Старый телевизор с VHS', evidenceId: 'vhs_tape' },
    { x: 5, y: 3, width: 1, height: 1, label: 'Стеллаж с банками' },
    { x: 1, y: 5, width: 1, height: 1, label: 'Мокрые следы на полу' },
    { x: 6, y: 5, width: 1, height: 1, label: 'Запертая дверь' },
  ],
  npcs: [],
  ambientColor: 0x0A0A15,
  playerStart: { x: 4, y: 1 },
};

export function registerBasement(): void {
  RoomManager.register(room);
}
