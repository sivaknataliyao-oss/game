import { NpcId } from '../../config';
import { DialogueTree } from '../../systems/DialogueManager';

export const maksDialogue: DialogueTree = {
  npcId: NpcId.MAKS,
  startNode: 'greeting',
  nodes: {
    // === ПРИВЕТСТВИЕ ===
    greeting: {
      id: 'greeting',
      speaker: 'Макс',
      text: 'О, ты здесь. Я как раз читал кое-что интересное. Эта библиотека... В ней книги, которых не должно быть.',
      choices: [
        { text: 'Какие книги?', next: 'what_books' },
        { text: 'Ты тут всё время сидишь?', next: 'always_here' },
        { text: 'Что ты пишешь в тетрадке?', next: 'notebook' },
      ],
    },

    // === КНИГИ ===
    what_books: {
      id: 'what_books',
      speaker: 'Макс',
      text: 'Книги о зеркалах. О памяти. О людях, которые забыли, кто они. И одна... одна книга — с твоим именем на обложке.',
      choices: [
        { text: 'Книга с моим именем?!', next: 'my_book' },
        { text: 'Расскажи о зеркалах.', next: 'about_mirrors' },
        { text: 'Это вилла сумасшедшего.', next: 'crazy_villa' },
      ],
    },

    my_book: {
      id: 'my_book',
      speaker: 'Макс',
      text: '«Семиира: три лица». Автор не указан. Внутри — описание трёх версий тебя. Праздничная, Истинная, Отражённая. Как будто кто-то разобрал тебя на части и записал каждую.',
      evidenceGrant: 'maks_diary',
      flagSet: 'maks_book_revealed',
      choices: [
        { text: 'Три версии меня? Объясни.', next: 'three_versions' },
        { text: 'Кто это написал?', next: 'who_wrote' },
      ],
    },

    three_versions: {
      id: 'three_versions',
      speaker: 'Макс',
      text: 'Праздничная Семиира — та, что смеётся и веселит зрителей. Маска для стримов. Истинная — та, что молчит ночами и думает о смысле. А Отражённая... та, что живёт по ту сторону зеркала. И она хочет выйти.',
      trustChange: { npc: NpcId.MAKS, amount: 10 },
      choices: [
        { text: 'Отражённая хочет выйти?', next: 'reflected_wants_out' },
        { text: 'Откуда ты всё это знаешь?', next: 'how_do_you_know' },
      ],
    },

    reflected_wants_out: {
      id: 'reflected_wants_out',
      speaker: 'Макс',
      text: 'Так написано в книге. «Отражённая — не тень. Она — память дома о тебе. Когда гости помнят тебя неправильно, Отражённая становится сильнее. А ты — слабее.»',
      advanceStory: true,
      choices: [
        { text: 'Как мне остановить это?', next: 'how_to_stop' },
        { text: 'Это просто книга. Выдумка.', next: 'just_fiction' },
      ],
    },

    how_to_stop: {
      id: 'how_to_stop',
      speaker: 'Макс',
      text: '«Помни себя правильно — и зеркала закроются.» Это цитата из книги. Я думаю, тебе нужно вспомнить, кто ты на самом деле. Не кем тебя видят другие.',
      flagSet: 'maks_solution_hint',
      isEnd: true,
    },

    just_fiction: {
      id: 'just_fiction',
      speaker: 'Макс',
      text: 'Может, и выдумка. Но почему тогда зеркала в этом доме показывают не то, что должны? Почему Лена знает твоё имя, хотя вы не знакомы? Слишком много совпадений.',
      isEnd: true,
    },

    // === О ЗЕРКАЛАХ ===
    about_mirrors: {
      id: 'about_mirrors',
      speaker: 'Макс',
      text: 'Зеркала не лгут. Они показывают то, что мы не хотим видеть. В этом доме зеркала — не просто стекло. Они помнят. Каждое отражение — это чей-то взгляд на тебя.',
      choices: [
        { text: 'Чей взгляд?', next: 'whose_gaze' },
        { text: 'Ты говоришь загадками.', next: 'riddles' },
      ],
    },

    whose_gaze: {
      id: 'whose_gaze',
      speaker: 'Макс',
      text: 'Гостей. Каждый гость помнит тебя по-своему. Света видит подругу. Дима — хозяйку праздника. Арина — звезду. Лена видит... я не знаю, что Лена видит. Но это пугает.',
      flagSet: 'maks_gaze_clue',
      isEnd: true,
    },

    riddles: {
      id: 'riddles',
      speaker: 'Макс',
      text: 'Кто помнит тебя неправильно — тот создал другую тебя. Это не загадка. Это факт. Посмотри на гостей — они все помнят разную Семииру. А настоящая... может, ты и есть настоящая. А может — нет.',
      choices: [
        { text: 'Ты пугаешь меня, Макс.', next: 'scary_maks' },
        { text: 'Мне нужно подумать.', next: 'goodbye_thoughtful' },
      ],
    },

    scary_maks: {
      id: 'scary_maks',
      speaker: 'Макс',
      text: 'Хорошо. Страх — значит ты чувствуешь. Значит ты — настоящая. Отражённая не боится. Она ждёт.',
      isEnd: true,
    },

    // === ТЕТРАДКА ===
    notebook: {
      id: 'notebook',
      speaker: 'Макс',
      text: '...Записи. Наблюдения. Я пытаюсь понять закономерность. Каждый раз, когда кто-то входит в комнату с зеркалом, что-то меняется. Мелочь, но...',
      choices: [
        { text: 'Что именно меняется?', next: 'what_changes' },
        { text: 'Можно почитать?', next: 'read_notebook' },
      ],
    },

    what_changes: {
      id: 'what_changes',
      speaker: 'Макс',
      text: 'Положение предметов. Цвет стен. Иногда — лица людей. Я посмотрел на Арину в зеркале — и на секунду увидел не её. А тебя. Тебя в образе Арины.',
      flagSet: 'maks_changes_clue',
      choices: [
        { text: 'Это невозможно.', next: 'impossible' },
        { text: 'Продолжай.', next: 'continue_changes' },
      ],
    },

    impossible: {
      id: 'impossible',
      speaker: 'Макс',
      text: 'В обычном доме — невозможно. Но эта вилла не обычная. Она помнит всех, кто в ней был. И создаёт отражения. Мы все тут — чьи-то отражения. Включая меня.',
      isEnd: true,
    },

    continue_changes: {
      id: 'continue_changes',
      speaker: 'Макс',
      text: 'Я думаю, дом создал нас — гостей — из твоей памяти. Мы такие, какими ты нас помнишь. А когда память путается... путаемся и мы.',
      advanceStory: true,
      isEnd: true,
    },

    read_notebook: {
      id: 'read_notebook',
      speaker: 'Макс',
      text: 'Возьми. Но предупреждаю — некоторые записи... тяжёлые.',
      evidenceGrant: 'maks_diary',
      isEnd: true,
    },

    // === ВСЕГДА ЗДЕСЬ ===
    always_here: {
      id: 'always_here',
      speaker: 'Макс',
      text: 'Здесь тихо. И книги не врут — в отличие от людей. Я заметил, что каждый гость что-то скрывает. Даже Света.',
      choices: [
        { text: 'Даже Света?', next: 'even_sveta' },
        { text: 'А ты? Ты что скрываешь?', next: 'maks_secret' },
      ],
    },

    even_sveta: {
      id: 'even_sveta',
      speaker: 'Макс',
      text: 'Особенно Света. Она наблюдательная — это правда. Но наблюдать можно за двумя причинами. Чтобы помочь. Или чтобы контролировать.',
      trustChange: { npc: NpcId.SVETA, amount: -5 },
      isEnd: true,
    },

    maks_secret: {
      id: 'maks_secret',
      speaker: 'Макс',
      text: '...Я помню другую вечеринку. Здесь. В этой вилле. Ты была. Мы все были. Но... это было давно. Очень давно. И тебя тогда звали иначе.',
      trustChange: { npc: NpcId.MAKS, amount: 15 },
      flagSet: 'maks_other_party',
      advanceStory: true,
      isEnd: true,
    },

    // === SEED C (Макс — лжец) ===
    maks_lie_c: {
      id: 'maks_lie_c',
      speaker: 'Макс',
      text: 'Я должен тебе кое-что рассказать. Книга... Я её не нашёл. Я её написал. Все «улики», которые ты находишь, — это я их раскладываю. Мне велели.',
      seedVariant: 'C',
      flagRequired: 'maks_book_revealed',
      trustChange: { npc: NpcId.MAKS, amount: -30 },
      choices: [
        { text: 'ЧТО?! Зачем?!', next: 'why_maks_lie' },
        { text: 'Кто тебе велел?', next: 'who_commanded_maks' },
      ],
    },

    why_maks_lie: {
      id: 'why_maks_lie',
      speaker: 'Макс',
      text: 'Чтобы направить тебя по ложному следу. Настоящая правда — не в книгах. Она в зеркалах. Но мне сказали: «Уведи её от зеркал». Я пытался...',
      isEnd: true,
    },

    who_commanded_maks: {
      id: 'who_commanded_maks',
      speaker: 'Макс',
      text: 'Отражённая. Она говорит через зеркала. Тихий шёпот, когда никого нет рядом. Она боится, что ты вспомнишь правду. Потому что тогда... она исчезнет.',
      advanceStory: true,
      isEnd: true,
    },

    // === КРОВАВАЯ ВИЛЛА ===
    crazy_villa: {
      id: 'crazy_villa',
      speaker: 'Макс',
      text: 'Не сумасшедшего. Одинокого. Этот дом построен кем-то, кто хотел запомнить всё. Каждый момент, каждое лицо. И когда хозяйка ушла... дом продолжил помнить сам.',
      isEnd: true,
    },

    how_do_you_know: {
      id: 'how_do_you_know',
      speaker: 'Макс',
      text: 'Я читаю. Наблюдаю. И я... помню больше, чем должен. Может, потому что я тут не впервые.',
      flagSet: 'maks_not_first_time',
      isEnd: true,
    },

    // === ПРОЩАНИЯ ===
    goodbye_thoughtful: {
      id: 'goodbye_thoughtful',
      speaker: 'Макс',
      text: 'Подумай. Но не слишком долго. Зеркала не ждут.',
      isEnd: true,
    },
  },
};
