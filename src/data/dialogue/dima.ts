import { NpcId } from '../../config';
import { DialogueTree } from '../../systems/DialogueManager';

export const dimaDialogue: DialogueTree = {
  npcId: NpcId.DIMA,
  startNode: 'greeting',
  nodes: {
    // === ПРИВЕТСТВИЕ ===
    greeting: {
      id: 'greeting',
      speaker: 'Дима',
      text: 'О, Семиира! Добро пожаловать! Торт уже в духовке, салаты нарезаны. Всё идёт по плану!',
      choices: [
        { text: 'Спасибо, Дима! Как продвигается?', next: 'cooking_status' },
        { text: 'Ты нервничаешь?', next: 'nervous' },
        { text: 'Что происходит на кухне?', next: 'kitchen_clues' },
      ],
    },

    // === ГОТОВКА ===
    cooking_status: {
      id: 'cooking_status',
      speaker: 'Дима',
      text: 'Отлично! Ну... почти отлично. Рецепт немного странный оказался. Я нашёл его на столе, но не помню, откуда он взялся. Там на обороте что-то написано, но я не разбирал.',
      choices: [
        { text: 'Можно посмотреть рецепт?', next: 'recipe_look' },
        { text: 'Что за блюда ты готовишь?', next: 'dishes' },
        { text: 'Откуда рецепт, если ты его не помнишь?', next: 'recipe_origin' },
      ],
    },

    recipe_look: {
      id: 'recipe_look',
      speaker: 'Дима',
      text: 'Конечно! Вот он, на стойке лежит. Только... не спрашивай, что на обороте. Я попытался прочитать — и голова закружилась.',
      evidenceGrant: 'recipe_note',
      choices: [
        { text: 'Спасибо! Пойду изучу.', next: 'goodbye_friendly' },
        { text: 'Тебе не кажется это странным?', next: 'strange_recipe' },
      ],
    },

    dishes: {
      id: 'dishes',
      speaker: 'Дима',
      text: 'Торт «Полночь» с фиолетовой глазурью — по твоему любимому рецепту. Салат «Звёздная пыль». И... чай. Особый чай. По рецепту с того листа.',
      choices: [
        { text: 'Особый чай? Что в нём?', next: 'special_tea' },
        { text: 'Звучит вкусно!', next: 'goodbye_friendly' },
      ],
    },

    special_tea: {
      id: 'special_tea',
      speaker: 'Дима',
      text: 'Травы... необычные. Я нашёл их в саду. Арина сказала, что они «для памяти». Не знаю, что это значит, но пахнет приятно.',
      choices: [
        { text: 'Для памяти? Это подозрительно.', next: 'tea_suspicious' },
        { text: 'Ладно, попробую позже.', next: 'goodbye_friendly' },
      ],
    },

    tea_suspicious: {
      id: 'tea_suspicious',
      speaker: 'Дима',
      text: 'Послушай, я просто повар! Мне сказали — приготовь. Я приготовил. Не ищи заговоры там, где их нет.',
      trustChange: { npc: NpcId.DIMA, amount: -5 },
      choices: [
        { text: 'Кто тебе сказал готовить этот чай?', next: 'who_ordered_tea' },
        { text: 'Хорошо, извини.', next: 'goodbye_friendly' },
      ],
    },

    who_ordered_tea: {
      id: 'who_ordered_tea',
      speaker: 'Дима',
      text: '...Я не помню. Честно. Как будто эта мысль была в голове уже когда я пришёл. «Завари чай. По рецепту.» И рецепт уже лежал на столе.',
      trustChange: { npc: NpcId.DIMA, amount: 5 },
      advanceStory: true,
      next: 'dima_confused',
    },

    dima_confused: {
      id: 'dima_confused',
      speaker: 'Дима',
      text: 'Подожди... Это действительно странно, да? Может, я тоже часть чего-то, что не понимаю?',
      isEnd: true,
    },

    // === НЕРВНИЧАЕТ ===
    nervous: {
      id: 'nervous',
      speaker: 'Дима',
      text: 'Нервничаю? Нет! С чего бы? Просто... ответственность. Это ведь твой день рождения. Всё должно быть идеально.',
      trustChange: { npc: NpcId.DIMA, amount: -3 },
      choices: [
        { text: 'Точно всё в порядке?', next: 'really_okay' },
        { text: 'Мне показалось. Извини.', next: 'goodbye_friendly' },
      ],
    },

    really_okay: {
      id: 'really_okay',
      speaker: 'Дима',
      text: 'Ну... Ладно. Не совсем. Я слышал звуки из подвала. Стук. Как будто кто-то ходит. Но когда спустился — никого. Только старый телевизор мерцал.',
      choices: [
        { text: 'Что было на экране?', next: 'basement_tv' },
        { text: 'Может, показалось?', next: 'maybe_imagined' },
      ],
    },

    basement_tv: {
      id: 'basement_tv',
      speaker: 'Дима',
      text: 'Помехи. И... на секунду — лицо. Твоё лицо, Семиира. Но не совсем твоё. Глаза другие. Я испугался и выбежал.',
      trustChange: { npc: NpcId.DIMA, amount: 10 },
      flagSet: 'dima_saw_face',
      choices: [
        { text: 'Мне нужно спуститься в подвал.', next: 'go_to_basement' },
        { text: 'Ты уверен, что видел моё лицо?', next: 'sure_face' },
      ],
    },

    go_to_basement: {
      id: 'go_to_basement',
      speaker: 'Дима',
      text: 'Не ходи в подвал. Там... просто темно. И этот телевизор... Он включился сам. Я не трогал его.',
      isEnd: true,
    },

    sure_face: {
      id: 'sure_face',
      speaker: 'Дима',
      text: 'Уверен. На все сто. Это было ты — но не ты. Как... отражение, которое живёт само по себе.',
      flagSet: 'dima_reflection_clue',
      isEnd: true,
    },

    maybe_imagined: {
      id: 'maybe_imagined',
      speaker: 'Дима',
      text: 'Может... Но я не пойду туда снова. Если хочешь — сама проверь. Только возьми фонарик.',
      isEnd: true,
    },

    // === КУХОННЫЕ УЛИКИ ===
    kitchen_clues: {
      id: 'kitchen_clues',
      speaker: 'Дима',
      text: 'На кухне? Нет, ничего странного. Просто готовил. Кастрюли, тарелки, специи... Обычная кухня.',
      choices: [
        { text: 'А что за рецепт на столе?', next: 'recipe_look' },
        { text: 'Можно я осмотрюсь?', next: 'look_around_kitchen' },
      ],
    },

    look_around_kitchen: {
      id: 'look_around_kitchen',
      speaker: 'Дима',
      text: 'Конечно, осматривайся! Только... не открывай нижний ящик. Там... крысы. Да, крысы.',
      choices: [
        { text: 'Крысы? В вилле?', next: 'rats' },
        { text: 'Хорошо, не буду.', next: 'goodbye_friendly' },
      ],
    },

    rats: {
      id: 'rats',
      speaker: 'Дима',
      text: '...Ладно, не крысы. Там записки. Я нашёл их в мусорке. Кто-то написал имена всех гостей и... зачеркнул их. Одно за другим. Осталось только твоё.',
      trustChange: { npc: NpcId.DIMA, amount: 10 },
      flagSet: 'dima_names_clue',
      advanceStory: true,
      isEnd: true,
    },

    strange_recipe: {
      id: 'strange_recipe',
      speaker: 'Дима',
      text: 'Конечно, странно! Рецепт, который никто не помнит, откуда взялся. Чай «для памяти». Записки с зачёркнутыми именами. Но я что могу? Я просто готовлю.',
      isEnd: true,
    },

    recipe_origin: {
      id: 'recipe_origin',
      speaker: 'Дима',
      text: 'Это самое странное. Он лежал на столе, когда я пришёл. Как будто ждал меня. Написан от руки — но почерк... знакомый. Может, твой?',
      choices: [
        { text: 'Мой почерк?!', next: 'my_handwriting' },
        { text: 'Покажи.', next: 'recipe_look' },
      ],
    },

    my_handwriting: {
      id: 'my_handwriting',
      speaker: 'Дима',
      text: 'Ну... похож. Но чуть другой. Как будто ты писала это левой рукой. Или... как будто это писала другая ты.',
      flagSet: 'dima_handwriting_clue',
      isEnd: true,
    },

    // === SEED B (Дима — лжец) ===
    dima_lie_b: {
      id: 'dima_lie_b',
      speaker: 'Дима',
      text: 'Семиира... я должен признаться. Чай. Я знал, что в нём. Это не просто «для памяти». Это чай, который заставляет забыть. Мне сказали добавить его.',
      seedVariant: 'B',
      flagRequired: 'dima_names_clue',
      trustChange: { npc: NpcId.DIMA, amount: -25 },
      choices: [
        { text: 'КТО тебе сказал?!', next: 'who_told_dima' },
        { text: 'Зачем?!', next: 'why_dima' },
      ],
    },

    who_told_dima: {
      id: 'who_told_dima',
      speaker: 'Дима',
      text: 'Голос. В голове. Когда я вошёл в эту виллу — он появился. «Сделай чай. Пусть она забудет.» Я пытался сопротивляться, но...',
      advanceStory: true,
      isEnd: true,
    },

    why_dima: {
      id: 'why_dima',
      speaker: 'Дима',
      text: 'Я не знаю зачем! Честно! Мне просто казалось, что так правильно. Как будто это — часть плана. Плана, который я не составлял.',
      advanceStory: true,
      isEnd: true,
    },

    // === ПРОЩАНИЯ ===
    goodbye_friendly: {
      id: 'goodbye_friendly',
      speaker: 'Дима',
      text: 'Приятного аппетита! Торт будет готов к полуночи. Если что — я на кухне!',
      isEnd: true,
    },
  },
};
