import { RoomId, NpcId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.KITCHEN,
  name: 'Кухня',
  description: 'Пахнет выпечкой. И чем-то ещё.',
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
    { x: 2, y: 1, width: 1, height: 1, label: 'Кухонная стойка' },
    { x: 5, y: 1, width: 1, height: 1, label: 'Плита с кастрюлями' },
    { x: 3, y: 3, width: 1, height: 1, label: 'Рецепт на столе', evidenceId: 'recipe_note' },
    { x: 6, y: 4, width: 1, height: 1, label: 'Холодильник' },
    { x: 2, y: 5, width: 1, height: 1, label: 'Корзина с травами' },
    { x: 5, y: 5, width: 1, height: 1, label: 'Тарелки с недоеденной едой' },
  ],
  npcs: [
    { npcId: NpcId.DIMA, x: 4, y: 2 },
  ],
  ambientColor: 0x2A1F1F,
  playerStart: { x: 1, y: 3 },
};

export function registerKitchen(): void {
  RoomManager.register(room);
}
