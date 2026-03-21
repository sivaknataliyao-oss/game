import { RoomId } from '../config';

export interface InteractiveObject {
  id: string;
  room: RoomId;
  label: string;
  firstLines: string[];
  repeatLines: string[];
  isVhs?: boolean;
}

export const ALL_OBJECTS: InteractiveObject[] = [
  // === ENTRANCE ===
  {
    id: 'hall_mirror',
    room: RoomId.ENTRANCE,
    label: 'Зеркало у входа',
    firstLines: ['Зеркало. Отражение… запаздывает?', 'Показалось.'],
    repeatLines: ['Обычное зеркало.'],
  },
  {
    id: 'hall_flowers',
    room: RoomId.ENTRANCE,
    label: 'Сухие цветы',
    firstLines: ['Сухие цветы. Красивые, но мёртвые.', '«С новосельем!» — два года назад.'],
    repeatLines: ['Сухие цветы.'],
  },
  {
    id: 'entrance_coats',
    room: RoomId.ENTRANCE,
    label: 'Вешалка с пальто',
    firstLines: ['Куртки, шарфы. Гостей было много.', 'В кармане одной — пустая флешка.'],
    repeatLines: ['Чужие куртки.'],
  },

  // === LIVING ROOM ===
  {
    id: 'disco',
    room: RoomId.LIVING_ROOM,
    label: 'Дискошар',
    firstLines: ['Дискошар. Пыльный.', 'Осколки света по стенам.'],
    repeatLines: ['Дискошар.'],
  },
  {
    id: 'living_sofa',
    room: RoomId.LIVING_ROOM,
    label: 'Большой диван',
    firstLines: ['Диван. Кто-то оставил бокал.', 'Помада на краю. Не её оттенок.'],
    repeatLines: ['Диван.'],
  },
  {
    id: 'living_garland',
    room: RoomId.LIVING_ROOM,
    label: 'Гирлянды',
    firstLines: ['Гирлянды мигают в такт музыке.', 'Или музыка в такт гирляндам.'],
    repeatLines: ['Мигают.'],
  },

  // === KITCHEN ===
  {
    id: 'bar_cat',
    room: RoomId.KITCHEN,
    label: 'Кошка',
    firstLines: ['Кошка. Мурлычет.', 'Ей не нужно «помнить правильно».'],
    repeatLines: ['Мурлычет.'],
  },
  {
    id: 'bar_tv',
    room: RoomId.KITCHEN,
    label: 'Телевизор',
    firstLines: ['Телевизор. Повтор стрима.', 'Улыбается как рекламный ролик.'],
    repeatLines: ['По кругу.'],
  },
  {
    id: 'bar_bottles',
    room: RoomId.KITCHEN,
    label: 'Бутылки',
    firstLines: ['Ряды бутылок. Ни одна не открыта.', 'Декорация. Как и всё здесь.'],
    repeatLines: ['Декорация.'],
  },

  // === LIBRARY ===
  {
    id: 'lib_screens',
    room: RoomId.LIBRARY,
    label: 'Экраны',
    firstLines: ['Три экрана. На каждом — другой стрим.', 'На каждом — другая Semiira.'],
    repeatLines: ['Три разных Semiira.'],
  },
  {
    id: 'lib_bookmarks',
    room: RoomId.LIBRARY,
    label: 'Книга с закладками',
    firstLines: ['Книга по психологии. Закладки на главах:', '«Деперсонализация», «Публичная идентичность», «Потеря себя».'],
    repeatLines: ['Закладки на мрачных главах.'],
  },

  // === GARDEN ===
  {
    id: 'garden_bench',
    room: RoomId.GARDEN,
    label: 'Скамейка',
    firstLines: ['Старая скамейка. Надпись вырезана:', '«Здесь я была собой. — С.»'],
    repeatLines: ['«Здесь я была собой.»'],
  },
  {
    id: 'garden_lanterns',
    room: RoomId.GARDEN,
    label: 'Фонарики',
    firstLines: ['Бумажные фонарики. Половина погасла.', 'Как и половина её улыбок.'],
    repeatLines: ['Половина погасла.'],
  },

  // === BEDROOM ===
  {
    id: 'plushie',
    room: RoomId.BEDROOM,
    label: 'Плюшевая игрушка',
    firstLines: ['Плюшевая. Из детства.', 'Единственное без эстетики.'],
    repeatLines: ['Единственное настоящее.'],
  },
  {
    id: 'notebook',
    room: RoomId.BEDROOM,
    label: 'Блокнот',
    firstLines: ['Автопортрет. Лицо зачёркнуто.', '«Я не помню, как выгляжу».'],
    repeatLines: ['Зачёркнутое лицо.'],
  },
  {
    id: 'monitor',
    room: RoomId.BEDROOM,
    label: 'Монитор',
    firstLines: ['«Удалить канал? Да/Нет»', 'Курсор на «Да». Не нажата.'],
    repeatLines: ['Курсор на «Да».'],
  },

  // === BATHROOM ===
  {
    id: 'bath_mirror',
    room: RoomId.BATHROOM,
    label: 'Запотевшее зеркало',
    firstLines: ['Зеркало запотело. Пальцем написано:', '«КТО Я»'],
    repeatLines: ['«КТО Я»'],
  },
  {
    id: 'bath_makeup',
    room: RoomId.BATHROOM,
    label: 'Косметика',
    firstLines: ['Куча косметики. Несколько «образов».', 'Каждый подписан: «Стрим», «Вечеринка», «Реальность».', '«Реальность» — пустая.'],
    repeatLines: ['«Реальность» — пустая.'],
  },

  // === BASEMENT ===
  {
    id: 'basement_camera',
    room: RoomId.BASEMENT,
    label: 'Сломанная камера',
    firstLines: ['Старая веб-камера. Объектив разбит.', 'Намеренно.'],
    repeatLines: ['Разбита намеренно.'],
  },
  {
    id: 'basement_setup',
    room: RoomId.BASEMENT,
    label: 'Стриминговый стол',
    firstLines: ['Стол со старым оборудованием.', 'Микрофон, кольцевая лампа, два монитора.', 'Всё покрыто пылью. Давно не использовалось.'],
    repeatLines: ['Забытая студия.'],
  },

  // === ATTIC ===
  {
    id: 'attic_costumes',
    room: RoomId.ATTIC,
    label: 'Костюмы',
    firstLines: ['Коробка с костюмами для стримов.', 'Каждый — для другого «образа».', 'Как гардероб для спектакля одного актёра.'],
    repeatLines: ['Гардероб для спектакля.'],
  },
  {
    id: 'attic_photos',
    room: RoomId.ATTIC,
    label: 'Фотоальбом',
    firstLines: ['Фотоальбом. Первые фото — живые, настоящие.', 'Последние — постановочные, идеальные.', 'Переход плавный. Незаметный.'],
    repeatLines: ['От живых к постановочным.'],
  },

  // === MIRROR ROOM ===
  {
    id: 'mirror_wall',
    room: RoomId.MIRROR_ROOM,
    label: 'Стена зеркал',
    firstLines: ['Десятки зеркал. В каждом — ты.', 'Но в каждом — чуть другой.', 'Как Semiira для каждого зрителя.'],
    repeatLines: ['Десятки разных отражений.'],
  },
  {
    id: 'mirror_broken',
    room: RoomId.MIRROR_ROOM,
    label: 'Разбитое зеркало',
    firstLines: ['Одно зеркало разбито. Трещина по центру.', 'Два отражения. Улыбающееся и плачущее.'],
    repeatLines: ['Два лица.'],
  },

  // === SECRET ROOM ===
  {
    id: 'secret_desk',
    room: RoomId.SECRET_ROOM,
    label: 'Рабочий стол',
    firstLines: ['Простой стол. Ни подсветки, ни камер.', 'Рисунки, записки, чашка чая.', 'Здесь она была просто… собой.'],
    repeatLines: ['Просто стол.'],
  },
  {
    id: 'secret_drawing',
    room: RoomId.SECRET_ROOM,
    label: 'Рисунок на стене',
    firstLines: ['Рисунок углём. Девушка без лица.', 'Вокруг — сотни маленьких лиц.', 'Каждое — чуть другое.'],
    repeatLines: ['Девушка без лица.'],
  },
];

export function getObjectsForRoom(room: RoomId): InteractiveObject[] {
  return ALL_OBJECTS.filter(o => o.room === room);
}

export function getObjectById(id: string): InteractiveObject | undefined {
  return ALL_OBJECTS.find(o => o.id === id);
}
