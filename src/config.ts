export const GAME_WIDTH = 1024;
export const GAME_HEIGHT = 768;

export const COLORS = {
  DARK_PURPLE: 0x2C2C4A,
  NEON_PINK: 0xFF69B4,
  NEON_CYAN: 0x00FFFF,
  DEEP_PURPLE: 0x1A1A2E,
  WHITE: 0xFFFFFF,
  BLACK: 0x000000,
  DARK_RED: 0x8B0000,
  GOLD: 0xFFD700,
  GRAY: 0x808080,
  LIGHT_GRAY: 0xC0C0C0,
};

export const CSS_COLORS = {
  DARK_PURPLE: '#2C2C4A',
  NEON_PINK: '#FF69B4',
  NEON_CYAN: '#00FFFF',
  DEEP_PURPLE: '#1A1A2E',
  WHITE: '#FFFFFF',
};

export const FONTS = {
  TITLE: 'Press Start 2P',
  BODY: 'VT323',
};

export const TILE_SIZE = 32;
export const ISO_TILE_WIDTH = 64;
export const ISO_TILE_HEIGHT = 32;

export enum RoomId {
  ENTRANCE = 'entrance',
  LIVING_ROOM = 'living_room',
  KITCHEN = 'kitchen',
  LIBRARY = 'library',
  GARDEN = 'garden',
  BEDROOM = 'bedroom',
  BATHROOM = 'bathroom',
  BASEMENT = 'basement',
  ATTIC = 'attic',
  MIRROR_ROOM = 'mirror_room',
  SECRET_ROOM = 'secret_room',
}

export enum NpcId {
  SVETA = 'sveta',
  GLAM = 'glam',
  VIEWER = 'viewer',
}

export const NPC_NAMES: Record<NpcId, string> = {
  [NpcId.SVETA]: 'Света',
  [NpcId.GLAM]: 'Гламурная',
  [NpcId.VIEWER]: 'Зритель',
};

export const NPC_COLORS: Record<NpcId, number> = {
  [NpcId.SVETA]: 0x2A8A8A,
  [NpcId.GLAM]: 0xCC4488,
  [NpcId.VIEWER]: 0x3A5A3A,
};

export const ROOM_NAMES: Record<RoomId, string> = {
  [RoomId.ENTRANCE]: 'Прихожая',
  [RoomId.LIVING_ROOM]: 'Гостиная',
  [RoomId.KITCHEN]: 'Кухня',
  [RoomId.LIBRARY]: 'Библиотека',
  [RoomId.GARDEN]: 'Сад',
  [RoomId.BEDROOM]: 'Спальня Semiira',
  [RoomId.BATHROOM]: 'Ванная',
  [RoomId.BASEMENT]: 'Подвал',
  [RoomId.ATTIC]: 'Чердак',
  [RoomId.MIRROR_ROOM]: 'Зеркальная комната',
  [RoomId.SECRET_ROOM]: 'Личная комната',
};

export const ROOM_DESCRIPTIONS: Record<RoomId, string> = {
  [RoomId.ENTRANCE]: 'Парадный вход. Гирлянды мигают неровно. Книга гостей на столе.',
  [RoomId.LIVING_ROOM]: 'Главный зал вечеринки. Дискошар, неон, VHS-эстетика.',
  [RoomId.KITCHEN]: 'Бар-зона. Бутылки, свечи. Кошка на стойке.',
  [RoomId.LIBRARY]: 'Тихо. Экраны со старыми стримами. Кто-то пересматривает.',
  [RoomId.GARDEN]: 'Лунный свет. Сухие цветы. Забытая скамейка.',
  [RoomId.BEDROOM]: 'Её комната. Плюшевая игрушка на кровати. Блокнот.',
  [RoomId.BATHROOM]: 'Зеркало запотело. Кто-то написал на нём.',
  [RoomId.BASEMENT]: 'Старая стриминговая студия. Сломанная камера.',
  [RoomId.ATTIC]: 'Архив. Коробки с фанатскими письмами и старыми костюмами.',
  [RoomId.MIRROR_ROOM]: 'Зеркала повсюду. Каждое показывает другую.',
  [RoomId.SECRET_ROOM]: 'Здесь она была собой. Без камер, без масок.',
};
