import { NpcId } from '../../config';
import { DialogueTree } from '../../systems/DialogueManager';

export const lenaDialogue: DialogueTree = {
  npcId: NpcId.LENA,
  startNode: 'greeting',
  nodes: {
    // === ПРИВЕТСТВИЕ ===
    greeting: {
      id: 'greeting',
      speaker: 'Лена',
      text: 'Привет. Мы ведь раньше не встречались, да? Или... нет, точно не встречались. Хотя...',
      choices: [
        { text: 'Кто ты? Я тебя не знаю.', next: 'who_are_you' },
        { text: 'Кто тебя пригласил?', next: 'who_invited' },
        { text: 'Мне кажется, я тебя где-то видела.', next: 'seen_before' },
      ],
    },

    // === КТО ТЫ ===
    who_are_you: {
      id: 'who_are_you',
      speaker: 'Лена',
      text: 'Лена. Просто Лена. Я... гостья. Как и все. Пришла на вечеринку.',
      choices: [
        { text: 'Но тебя не было в списке.', next: 'not_on_list' },
        { text: 'Откуда ты знаешь моё имя?', next: 'know_my_name' },
        { text: 'Ладно. Веселись.', next: 'goodbye_cold' },
      ],
    },

    not_on_list: {
      id: 'not_on_list',
      speaker: 'Лена',
      text: 'Списки... Кто-то составляет списки. Кто-то их меняет. А кто-то приходит, потому что дом позвал. Ты никогда не чувствовала, что место зовёт тебя?',
      choices: [
        { text: 'Дом позвал тебя?', next: 'house_called' },
        { text: 'Ты говоришь странные вещи.', next: 'strange_things' },
      ],
    },

    house_called: {
      id: 'house_called',
      speaker: 'Лена',
      text: 'Да. Этот дом помнит больше, чем его жители. Он помнит каждую вечеринку, каждого гостя. И каждую версию тебя. Я пришла, потому что дом сказал: «Пора».',
      trustChange: { npc: NpcId.LENA, amount: 10 },
      flagSet: 'lena_house_memory',
      choices: [
        { text: 'Каждую версию меня?', next: 'every_version' },
        { text: 'Ты не человек, да?', next: 'not_human' },
      ],
    },

    every_version: {
      id: 'every_version',
      speaker: 'Лена',
      text: 'Праздничная. Истинная. Отражённая. Дом видел их все. И каждый раз — гости помнили только одну. А остальные... оставались в зеркалах.',
      flagSet: 'lena_versions_knowledge',
      choices: [
        { text: 'Ты знаешь про три версии?!', next: 'knows_three' },
        { text: 'Как дом может помнить?', next: 'how_house_remembers' },
      ],
    },

    knows_three: {
      id: 'knows_three',
      speaker: 'Лена',
      text: 'Я знаю больше, чем три. Но три — это те, которые сейчас борются за тебя. Одна — та, что ты показываешь миру. Вторая — та, что ты прячешь. Третья — та, что помнит дом.',
      advanceStory: true,
      next: 'which_am_i',
    },

    which_am_i: {
      id: 'which_am_i',
      speaker: 'Лена',
      text: 'А я? Я — четвёртая. Та, которую ты забыла создать. Или... та, которую ты забыла забыть.',
      choices: [
        { text: 'Кто ты на самом деле?', next: 'true_identity' },
        { text: 'Мне страшно.', next: 'im_scared' },
      ],
    },

    true_identity: {
      id: 'true_identity',
      speaker: 'Лена',
      text: 'Я — это ты. Или ты — это я. Зависит от того, кто помнит. Когда ты смотришь в зеркало и видишь незнакомку — это я. Я всегда была здесь. По ту сторону.',
      trustChange: { npc: NpcId.LENA, amount: 20 },
      flagSet: 'lena_revealed',
      advanceStory: true,
      isEnd: true,
    },

    im_scared: {
      id: 'im_scared',
      speaker: 'Лена',
      text: 'Страх — хороший знак. Значит, ты ещё чувствуешь. Отражённая не чувствует — она только помнит. Пока ты боишься — ты настоящая.',
      isEnd: true,
    },

    // === НЕ ЧЕЛОВЕК ===
    not_human: {
      id: 'not_human',
      speaker: 'Лена',
      text: '...Интересный вопрос. А ты? Ты уверена, что человек? Или ты — воспоминание, которое слишком хорошо притворяется живым?',
      choices: [
        { text: 'Ответь на мой вопрос!', next: 'answer_question' },
        { text: 'Ты пугаешь.', next: 'im_scared' },
      ],
    },

    answer_question: {
      id: 'answer_question',
      speaker: 'Лена',
      text: 'Хорошо. Я — часть этого дома. Часть его памяти. Я существую, пока существуют зеркала. И я пришла, потому что сегодня — особенная ночь. Ночь, когда отражения могут выйти.',
      flagSet: 'lena_mirror_being',
      advanceStory: true,
      isEnd: true,
    },

    // === КТО ПРИГЛАСИЛ ===
    who_invited: {
      id: 'who_invited',
      speaker: 'Лена',
      text: 'Я здесь по приглашению. Но не тому, которое написала Света. Другому. Более старому.',
      choices: [
        { text: 'Покажи приглашение.', next: 'show_invitation' },
        { text: 'Старому? Насколько старому?', next: 'how_old' },
      ],
    },

    show_invitation: {
      id: 'show_invitation',
      speaker: 'Лена',
      text: 'Вот. Пожелтевшая бумага. «Приглашается та, что помнит. Вилла ждёт. Зеркала открыты.» Дата — десять лет назад. Но вилла выглядит так, будто её построили вчера.',
      evidenceGrant: 'torn_invitation',
      flagSet: 'lena_old_invitation',
      isEnd: true,
    },

    how_old: {
      id: 'how_old',
      speaker: 'Лена',
      text: 'Десять лет. Или сто. Или вечность. Время здесь... не работает как обычно. Ты заметила, что часы в доме показывают разное время?',
      choices: [
        { text: 'Нет, не заметила.', next: 'look_at_clocks' },
        { text: 'Покажи приглашение.', next: 'show_invitation' },
      ],
    },

    look_at_clocks: {
      id: 'look_at_clocks',
      speaker: 'Лена',
      text: 'Посмотри. В прихожей — полночь. На кухне — полдень. В библиотеке — часы стоят. А в спальне... часов нет. Как будто время забыло эту комнату.',
      flagSet: 'lena_clocks_clue',
      isEnd: true,
    },

    // === ВИДЕЛА РАНЬШЕ ===
    seen_before: {
      id: 'seen_before',
      speaker: 'Лена',
      text: 'Возможно. В зеркале. Ты когда-нибудь чувствовала, что кто-то помнит тебя... неправильно? Вот я — помню тебя правильно. Потому что я помню все версии.',
      trustChange: { npc: NpcId.LENA, amount: 10 },
      choices: [
        { text: 'Все версии?', next: 'every_version' },
        { text: 'В зеркале?', next: 'in_mirror' },
      ],
    },

    in_mirror: {
      id: 'in_mirror',
      speaker: 'Лена',
      text: 'Да. Ты видела меня. Каждый раз, когда смотрела в зеркало — на долю секунды, прежде чем появлялось твоё отражение, была я. Но ты никогда не замечала. До сегодняшней ночи.',
      flagSet: 'lena_in_mirror',
      choices: [
        { text: 'Это невозможно.', next: 'impossible_lena' },
        { text: 'Значит, ты... отражение?', next: 'true_identity' },
      ],
    },

    impossible_lena: {
      id: 'impossible_lena',
      speaker: 'Лена',
      text: 'В этом доме возможно всё. И невозможно — тоже. Решать тебе, во что верить. Но улики не врут. Найди их все — и поймёшь.',
      isEnd: true,
    },

    // === СТРАННЫЕ ВЕЩИ ===
    strange_things: {
      id: 'strange_things',
      speaker: 'Лена',
      text: 'Странные? Или правдивые? Когда реальность странная — может, странность и есть правда. Подумай об этом.',
      isEnd: true,
    },

    know_my_name: {
      id: 'know_my_name',
      speaker: 'Лена',
      text: 'Я знаю больше, чем имя. Я знаю, что ты любишь стримить по ночам. Что твой любимый цвет — неоновый розовый. Что Света — единственная, кому ты по-настоящему доверяешь. Я знаю всё.',
      trustChange: { npc: NpcId.LENA, amount: -5 },
      choices: [
        { text: 'Как?!', next: 'how_know_everything' },
        { text: 'Ты следила за мной?', next: 'stalker' },
      ],
    },

    how_know_everything: {
      id: 'how_know_everything',
      speaker: 'Лена',
      text: 'Потому что я — часть тебя. Не метафора. Буквально. Я — память, которая стала человеком. Когда дом помнит слишком сильно — воспоминания оживают.',
      advanceStory: true,
      isEnd: true,
    },

    stalker: {
      id: 'stalker',
      speaker: 'Лена',
      text: 'Не следила. Помнила. Это разные вещи. Следить — значит наблюдать со стороны. Помнить — значит быть внутри. Я была внутри твоих воспоминаний. Всегда.',
      isEnd: true,
    },

    // === SEED A (Лена — связана с зеркальной Семиирой) ===
    lena_mirror_a: {
      id: 'lena_mirror_a',
      speaker: 'Лена',
      text: 'Семиира... Отражённая просит меня передать. Она не враг. Она — та часть тебя, которую ты запретила себе быть. И сегодня... она хочет вернуться домой.',
      seedVariant: 'A',
      flagRequired: 'lena_revealed',
      isEnd: true,
    },

    // === SEED B (Лена — обычный гость с секретом) ===
    lena_secret_b: {
      id: 'lena_secret_b',
      speaker: 'Лена',
      text: 'Правда? Я была здесь десять лет назад. На другой вечеринке. Я была ребёнком, и дом показал мне девочку в зеркале. Эта девочка — ты. Я ждала этой встречи.',
      seedVariant: 'B',
      flagRequired: 'lena_old_invitation',
      isEnd: true,
    },

    // === SEED C (Лена знает правду о вилле) ===
    lena_truth_c: {
      id: 'lena_truth_c',
      speaker: 'Лена',
      text: 'Вилла — не просто дом. Она — ловушка для памяти. Построена, чтобы собирать воспоминания. Каждый гость отдаёт частичку себя. А взамен... получает ложные воспоминания. Поэтому никто не помнит, как сюда попал.',
      seedVariant: 'C',
      flagRequired: 'lena_house_memory',
      advanceStory: true,
      isEnd: true,
    },

    how_house_remembers: {
      id: 'how_house_remembers',
      speaker: 'Лена',
      text: 'Стены впитывают. Зеркала хранят. Пол помнит каждый шаг. Этот дом — живой архив. И сегодня ночью он открыл свои двери, потому что пришло время. Время вспомнить.',
      isEnd: true,
    },

    // === ПРОЩАНИЯ ===
    goodbye_cold: {
      id: 'goodbye_cold',
      speaker: 'Лена',
      text: 'Хорошо. Но мы ещё поговорим. Дом не отпустит, пока ты не вспомнишь.',
      isEnd: true,
    },
  },
};
