import { NpcId } from '../../config';
import { DialogueTree } from '../../systems/DialogueManager';

export const arinaDialogue: DialogueTree = {
  npcId: NpcId.ARINA,
  startNode: 'greeting',
  nodes: {
    // === ПРИВЕТСТВИЕ ===
    greeting: {
      id: 'greeting',
      speaker: 'Арина',
      text: 'Семиира!! Это лучшая вечеринка!! Ну, пока что... Шучу! Ты просто супер выглядишь!',
      choices: [
        { text: 'Спасибо! Как тебе тут?', next: 'how_is_party' },
        { text: 'Ты выглядишь нервной.', next: 'nervous_arina' },
        { text: 'Расскажи, что слышала от других.', next: 'gossip' },
      ],
    },

    // === О ВЕЧЕРИНКЕ ===
    how_is_party: {
      id: 'how_is_party',
      speaker: 'Арина',
      text: 'Офигенно! Вилла — просто вау. Только... Ты заметила, что тут много зеркал? Как будто дом хочет, чтобы ты на себя смотрела. Постоянно.',
      choices: [
        { text: 'Тебя пугают зеркала?', next: 'afraid_mirrors' },
        { text: 'Не обращала внимания.', next: 'not_noticed' },
        { text: 'Расскажи про сад.', next: 'about_garden' },
      ],
    },

    afraid_mirrors: {
      id: 'afraid_mirrors',
      speaker: 'Арина',
      text: 'Не то чтобы пугают... Просто... Я посмотрела в одно из зеркал, и оно улыбнулось мне. Только я не улыбалась. Ха-ха... Нет, серьёзно, не улыбалась.',
      trustChange: { npc: NpcId.ARINA, amount: 5 },
      choices: [
        { text: 'Зеркало улыбнулось?!', next: 'mirror_smiled' },
        { text: 'Тебе показалось.', next: 'imagined_mirror' },
      ],
    },

    mirror_smiled: {
      id: 'mirror_smiled',
      speaker: 'Арина',
      text: 'Да! И потом... я увидела не себя. Я увидела тебя. Семиира, в зеркале была ТЫ. С моей причёской, в моей одежде, но с твоими глазами. Мне стало жутко.',
      flagSet: 'arina_mirror_vision',
      choices: [
        { text: 'Это как у Димы...', next: 'like_dima', flagRequired: 'dima_saw_face' },
        { text: 'Ты серьёзно?', next: 'are_you_serious' },
      ],
    },

    like_dima: {
      id: 'like_dima',
      speaker: 'Арина',
      text: 'Дима тоже видел?! Ого... Значит, это не глюки. Этот дом действительно что-то делает с нами. Или... с тобой.',
      advanceStory: true,
      isEnd: true,
    },

    are_you_serious: {
      id: 'are_you_serious',
      speaker: 'Арина',
      text: 'Абсолютно. Я не вру. Ну, почти никогда не вру. Ладно, иногда вру. Но не сейчас!',
      isEnd: true,
    },

    imagined_mirror: {
      id: 'imagined_mirror',
      speaker: 'Арина',
      text: 'Может... Но Макс тоже что-то видел. Он мне не рассказал, но я заметила, что он избегает зеркало в библиотеке. Обходит его стороной.',
      isEnd: true,
    },

    // === СПЛЕТНИ ===
    gossip: {
      id: 'gossip',
      speaker: 'Арина',
      text: 'Ооо, сплетни! Значит так. Дима что-то мутит на кухне — слышно бормотание. Света постоянно за всеми следит. Макс пишет что-то тайное. А Лена... Ты знаешь, что она ходила на чердак?',
      choices: [
        { text: 'Лена была на чердаке?', next: 'lena_attic' },
        { text: 'Как Света за всеми следит?', next: 'sveta_watches' },
        { text: 'Ты сама ничего не скрываешь?', next: 'arina_hiding' },
      ],
    },

    lena_attic: {
      id: 'lena_attic',
      speaker: 'Арина',
      text: 'Да! Я видела, как она поднималась. Тихо, на цыпочках. Как будто не хотела, чтобы кто-то заметил. А вернулась с чем-то в руках — но спрятала в карман.',
      flagSet: 'arina_lena_attic',
      choices: [
        { text: 'Мне нужно проверить чердак.', next: 'check_attic' },
        { text: 'Может, это её вещи?', next: 'lena_stuff' },
      ],
    },

    check_attic: {
      id: 'check_attic',
      speaker: 'Арина',
      text: 'Сходи! Только осторожно — там темно и пыльно. И... я слышала звуки оттуда. Скрип. Будто кто-то качается на стуле.',
      isEnd: true,
    },

    lena_stuff: {
      id: 'lena_stuff',
      speaker: 'Арина',
      text: 'Её вещи? Семиира, она пришла без сумки. Без ничего. Откуда у неё вещи на чердаке?',
      isEnd: true,
    },

    sveta_watches: {
      id: 'sveta_watches',
      speaker: 'Арина',
      text: 'Она думает, что незаметна, но я-то вижу! Стоит в углу, смотрит на каждого. Записывает в телефон. Кто куда пошёл, с кем говорил. Это забота или паранойя?',
      trustChange: { npc: NpcId.SVETA, amount: -3 },
      choices: [
        { text: 'Она просто переживает.', next: 'sveta_cares' },
        { text: 'Это подозрительно.', next: 'sveta_suspicious' },
      ],
    },

    sveta_cares: {
      id: 'sveta_cares',
      speaker: 'Арина',
      text: 'Ну, может. Но переживать и контролировать — разные вещи. Смотри сама, кому доверять.',
      isEnd: true,
    },

    sveta_suspicious: {
      id: 'sveta_suspicious',
      speaker: 'Арина',
      text: 'Вот и я так думаю! Зачем записывать каждый шаг? Если только ты не... ведёшь расследование. Или ты не часть плана.',
      isEnd: true,
    },

    arina_hiding: {
      id: 'arina_hiding',
      speaker: 'Арина',
      text: 'Я? Нет! Ну... Ладно. Одну вещь. Я нашла фотографию. В гостиной, за рамкой другой картины. И на ней ты... но другая.',
      evidenceGrant: 'strange_photo',
      choices: [
        { text: 'Покажи!', next: 'show_photo' },
        { text: 'Другая — как?', next: 'different_how' },
      ],
    },

    show_photo: {
      id: 'show_photo',
      speaker: 'Арина',
      text: 'Вот. Смотри. Все на фото — мы. Но твоё лицо... размыто. Как будто фотоаппарат не мог тебя поймать. Или как будто на твоём месте — кто-то другой.',
      flagSet: 'arina_photo_shown',
      isEnd: true,
    },

    different_how: {
      id: 'different_how',
      speaker: 'Арина',
      text: 'Другие глаза. Другая улыбка. Как будто это... не ты, а твоё отражение. Которое забыли вернуть в зеркало.',
      choices: [
        { text: 'А ты уверена, что ты — это ты?', next: 'arina_identity' },
        { text: 'Это жутко.', next: 'creepy' },
      ],
    },

    arina_identity: {
      id: 'arina_identity',
      speaker: 'Арина',
      text: '...Знаешь, я об этом думала. Что если мы все тут — не настоящие? Что если настоящие — там, за зеркалами? А мы — просто воспоминания?',
      trustChange: { npc: NpcId.ARINA, amount: 15 },
      advanceStory: true,
      isEnd: true,
    },

    creepy: {
      id: 'creepy',
      speaker: 'Арина',
      text: 'Ещё как жутко. Но знаешь, что самое жуткое? Я не могу вспомнить, как я сюда приехала. Просто... была дома, и вдруг — тут. Как во сне.',
      isEnd: true,
    },

    // === САД ===
    about_garden: {
      id: 'about_garden',
      speaker: 'Арина',
      text: 'В саду красиво, правда? Я нашла странные цветы — они растут кругом. Как защитный символ. И пахнут... ностальгией? Не знаю, как объяснить.',
      choices: [
        { text: 'Цветы в форме круга?', next: 'circle_flowers' },
        { text: 'Ты разбираешься в цветах?', next: 'know_flowers' },
      ],
    },

    circle_flowers: {
      id: 'circle_flowers',
      speaker: 'Арина',
      text: 'Да! Идеальный круг. И они закрываются на ночь — как будто прячутся. Я попробовала сорвать один — и порезалась. Стебель был как стекло. Как зеркальное стекло.',
      flagSet: 'arina_circle_flowers',
      isEnd: true,
    },

    know_flowers: {
      id: 'know_flowers',
      speaker: 'Арина',
      text: 'Немного. Но таких — никогда не видела. Они холодные на ощупь, даже днём. И светятся ночью. Слабо, но видно. Фиолетовым.',
      isEnd: true,
    },

    // === НЕ ОБРАЩАЛА ВНИМАНИЯ ===
    not_noticed: {
      id: 'not_noticed',
      speaker: 'Арина',
      text: 'А ты уверена, что ты — это ты? Ну типа, вообще? Потому что я посмотрела в зеркало — и увидела совсем другого человека. И это была ты.',
      choices: [
        { text: 'Что ты имеешь в виду?!', next: 'mirror_smiled' },
        { text: 'Арина, хватит шутить.', next: 'stop_joking' },
      ],
    },

    stop_joking: {
      id: 'stop_joking',
      speaker: 'Арина',
      text: 'Я не шучу! Ну ладно, я часто шучу. Но не сейчас. Сейчас мне реально страшно. И тебе тоже должно быть.',
      isEnd: true,
    },
  },
};
