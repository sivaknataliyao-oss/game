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
  DIMA = 'dima',
  MAKS = 'maks',
  ARINA = 'arina',
  LENA = 'lena',
}

export const NPC_NAMES: Record<NpcId, string> = {
  [NpcId.SVETA]: 'Света',
  [NpcId.DIMA]: 'Дима',
  [NpcId.MAKS]: 'Макс',
  [NpcId.ARINA]: 'Арина',
  [NpcId.LENA]: 'Лена',
};

export const NPC_COLORS: Record<NpcId, number> = {
  [NpcId.SVETA]: 0x4FC3F7,
  [NpcId.DIMA]: 0xFF8A65,
  [NpcId.MAKS]: 0x81C784,
  [NpcId.ARINA]: 0xF06292,
  [NpcId.LENA]: 0xBA68C8,
};

export const ROOM_NAMES: Record<RoomId, string> = {
  [RoomId.ENTRANCE]: 'Прихожая',
  [RoomId.LIVING_ROOM]: 'Гостиная',
  [RoomId.KITCHEN]: 'Кухня',
  [RoomId.LIBRARY]: 'Библиотека',
  [RoomId.GARDEN]: 'Сад',
  [RoomId.BEDROOM]: 'Спальня',
  [RoomId.BATHROOM]: 'Ванная',
  [RoomId.BASEMENT]: 'Подвал',
  [RoomId.ATTIC]: 'Чердак',
  [RoomId.MIRROR_ROOM]: 'Зеркальная комната',
  [RoomId.SECRET_ROOM]: 'Секретная комната',
};

export const ROOM_DESCRIPTIONS: Record<RoomId, string> = {
  [RoomId.ENTRANCE]: 'Парадный вход. Гирлянды мигают неровно.',
  [RoomId.LIVING_ROOM]: 'Главный зал. Гости шепчутся по углам.',
  [RoomId.KITCHEN]: 'Пахнет выпечкой. И чем-то ещё.',
  [RoomId.LIBRARY]: 'Книги от пола до потолка. Тишина давит.',
  [RoomId.GARDEN]: 'Лунный свет. Цветы закрываются на ночь.',
  [RoomId.BEDROOM]: 'Твоя комната. Но что-то изменилось.',
  [RoomId.BATHROOM]: 'Зеркало запотело. Кто-то написал на нём.',
  [RoomId.BASEMENT]: 'Темно. Мерцает старый телевизор.',
  [RoomId.ATTIC]: 'Пыль и забытые вещи. Коробки с воспоминаниями.',
  [RoomId.MIRROR_ROOM]: 'Всё отражено. Но неправильно.',
  [RoomId.SECRET_ROOM]: 'Ты нашла правду. Или она нашла тебя.',
};

export type SeedVariant = 'A' | 'B' | 'C';
export type SemiiraVersion = 'festive' | 'true' | 'reflected';
