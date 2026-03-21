import { RoomId, NpcId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.KITCHEN,
  name: 'Кухня',
  description: 'Бар-зона. Бутылки, свечи. Кошка на стойке.',
  width: 8,
  height: 7,
  tileColors: [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 6, 6, 6, 6, 6, 6, 1],
    [1, 6, 0, 0, 0, 0, 6, 1],
    [1, 6, 0, 0, 0, 0, 6, 1],
    [1, 6, 0, 0, 0, 0, 6, 1],
    [1, 6, 6, 6, 6, 6, 6, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  exits: [
    { targetRoom: RoomId.LIVING_ROOM, x: 0, y: 3, label: '← Гостиная' },
    { targetRoom: RoomId.BASEMENT, x: 4, y: 6, label: '↓ Подвал' },
  ],
  hotspots: [
    { x: 2, y: 1, width: 1, height: 1, label: 'Барная стойка', action: 'bar_bottles' },
    { x: 5, y: 1, width: 1, height: 1, label: 'Телевизор', action: 'bar_tv' },
    { x: 3, y: 3, width: 1, height: 1, label: 'Записка', evidenceId: 'clue_note' },
    { x: 6, y: 2, width: 1, height: 1, label: 'Кошка', action: 'bar_cat' },
    { x: 2, y: 5, width: 1, height: 1, label: 'Свечи на столе' },
    { x: 5, y: 5, width: 1, height: 1, label: 'Бокалы' },
  ],
  npcs: [
    { npcId: NpcId.SVETA, x: 4, y: 2 },
  ],
  ambientColor: 0x2A1F1F,
  playerStart: { x: 1, y: 3 },
};

export function registerKitchen(): void {
  RoomManager.register(room);
}
