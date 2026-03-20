import { RoomId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.BATHROOM,
  name: 'Ванная',
  description: 'Зеркало запотело. Кто-то написал на нём.',
  width: 6,
  height: 6,
  tileColors: [
    [6, 6, 6, 6, 6, 6],
    [6, 5, 5, 5, 5, 6],
    [6, 5, 1, 1, 5, 6],
    [6, 5, 1, 1, 5, 6],
    [6, 5, 5, 5, 5, 6],
    [6, 6, 6, 6, 6, 6],
  ],
  exits: [
    { targetRoom: RoomId.BEDROOM, x: 0, y: 3, label: '← Спальня' },
  ],
  hotspots: [
    { x: 3, y: 1, width: 1, height: 1, label: 'Запотевшее зеркало' },
    { x: 1, y: 2, width: 1, height: 1, label: 'Ванна с мутной водой' },
    { x: 4, y: 3, width: 1, height: 1, label: 'Шкафчик с лекарствами' },
    { x: 2, y: 4, width: 1, height: 1, label: 'Странный ключ на полу', evidenceId: 'mirror_key' },
    { x: 4, y: 4, width: 1, height: 1, label: 'Полотенца с пятнами' },
  ],
  npcs: [],
  ambientColor: 0x152025,
  playerStart: { x: 1, y: 3 },
};

export function registerBathroom(): void {
  RoomManager.register(room);
}
