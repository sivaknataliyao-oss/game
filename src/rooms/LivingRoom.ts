import { RoomId, NpcId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.LIVING_ROOM,
  name: 'Гостиная',
  description: 'Главный зал вечеринки. Дискошар, неон, VHS-эстетика.',
  width: 10,
  height: 8,
  tileColors: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 0, 2, 2, 2, 2, 0, 2, 0],
    [0, 2, 0, 2, 2, 2, 2, 0, 2, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  exits: [
    { targetRoom: RoomId.ENTRANCE, x: 0, y: 3, label: '← Прихожая' },
    { targetRoom: RoomId.KITCHEN, x: 9, y: 3, label: '→ Кухня' },
    { targetRoom: RoomId.LIBRARY, x: 5, y: 0, label: '↑ Библиотека' },
    { targetRoom: RoomId.GARDEN, x: 5, y: 7, label: '↓ Сад' },
    { targetRoom: RoomId.BEDROOM, x: 0, y: 6, label: '↗ Спальня' },
  ],
  hotspots: [
    { x: 3, y: 2, width: 1, height: 1, label: 'VHS-плеер', evidenceId: 'clue_toast_tape' },
    { x: 7, y: 2, width: 1, height: 1, label: 'Фотография на стене', evidenceId: 'clue_photo' },
    { x: 5, y: 1, width: 1, height: 1, label: 'Дискошар', action: 'disco' },
    { x: 2, y: 5, width: 1, height: 1, label: 'Большой диван', action: 'living_sofa' },
    { x: 7, y: 5, width: 1, height: 1, label: 'Гирлянды', action: 'living_garland' },
    { x: 8, y: 1, width: 1, height: 1, label: 'Торт на столе' },
  ],
  npcs: [
    { npcId: NpcId.GLAM, x: 5, y: 3 },
  ],
  ambientColor: 0x1E1E35,
  playerStart: { x: 1, y: 3 },
};

export function registerLivingRoom(): void {
  RoomManager.register(room);
}
