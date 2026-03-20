import { RoomId, NpcId } from '../config';
import { RoomManager, RoomDef } from '../systems/RoomManager';

const room: RoomDef = {
  id: RoomId.GARDEN,
  name: 'Сад',
  description: 'Лунный свет. Цветы закрываются на ночь.',
  width: 10,
  height: 8,
  tileColors: [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 1, 1, 1, 1, 1, 1, 3, 3],
    [3, 1, 3, 3, 3, 3, 3, 3, 1, 3],
    [3, 1, 3, 3, 3, 3, 3, 3, 1, 3],
    [3, 1, 3, 3, 3, 3, 3, 3, 1, 3],
    [3, 1, 3, 3, 3, 3, 3, 3, 1, 3],
    [3, 3, 1, 1, 1, 1, 1, 1, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ],
  exits: [
    { targetRoom: RoomId.LIVING_ROOM, x: 5, y: 0, label: '↑ Гостиная' },
  ],
  hotspots: [
    { x: 2, y: 2, width: 1, height: 1, label: 'Кусты роз' },
    { x: 7, y: 2, width: 1, height: 1, label: 'Фонтан' },
    { x: 4, y: 4, width: 1, height: 1, label: 'Клумба со странными цветами', evidenceId: 'wilted_flowers' },
    { x: 8, y: 5, width: 1, height: 1, label: 'Скамейка под деревом' },
    { x: 2, y: 5, width: 1, height: 1, label: 'Беседка' },
    { x: 5, y: 6, width: 1, height: 1, label: 'Каменная дорожка' },
  ],
  npcs: [
    { npcId: NpcId.ARINA, x: 5, y: 3 },
  ],
  ambientColor: 0x0F1A20,
  playerStart: { x: 5, y: 1 },
};

export function registerGarden(): void {
  RoomManager.register(room);
}
