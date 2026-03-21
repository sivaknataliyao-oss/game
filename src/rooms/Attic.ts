import { RoomId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.ATTIC,
  name: 'Чердак',
  description: 'Архив. Коробки с фанатскими письмами и старыми костюмами.',
  width: 8,
  height: 6,
  tileColors: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 4, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 4, 4, 0, 0, 0],
    [0, 0, 4, 0, 0, 4, 0, 0],
    [0, 4, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  exits: [
    { targetRoom: RoomId.LIBRARY, x: 0, y: 3, label: '← Библиотека' },
  ],
  hotspots: [
    { x: 2, y: 1, width: 1, height: 1, label: 'Костюмы', action: 'attic_costumes' },
    { x: 5, y: 1, width: 1, height: 1, label: 'Фотоальбом', action: 'attic_photos' },
    { x: 3, y: 2, width: 1, height: 1, label: 'Письма фанатов', evidenceId: 'clue_fan_letters' },
    { x: 6, y: 3, width: 1, height: 1, label: 'Пыльное окно' },
    { x: 1, y: 4, width: 1, height: 1, label: 'Старые игрушки' },
    { x: 4, y: 4, width: 1, height: 1, label: 'Чемодан с надписью' },
  ],
  npcs: [],
  ambientColor: 0x15120F,
  playerStart: { x: 1, y: 3 },
};

export function registerAttic(): void {
  RoomManager.register(room);
}
