import { NpcId } from '../../config';
import { DialogueTree } from '../../systems/DialogueManager';

export const svetaDialogue: DialogueTree = {
  npcId: NpcId.SVETA,
  startNode: 'greeting',
  nodes: {
    // === ПРИВЕТСТВИЕ ===
    greeting: {
      id: 'greeting',
      speaker: 'Света',
      text: 'Семиира! Наконец-то ты здесь. Слушай... тут что-то не так. Я чувствую.',
      choices: [
        { text: 'Что случилось?', next: 'whats_wrong' },
        { text: 'Расслабься, это просто вечеринка!', next: 'just_party' },
        { text: 'Расскажи про гостей', next: 'about_guests' },
      ],
    },

    // === ЧТО СЛУЧИЛОСЬ ===
    whats_wrong: {
      id: 'whats_wrong',
      speaker: 'Света',
      text: 'Не знаю, как объяснить... Гости ведут себя странно. Дима нервничает у плиты, Макс что-то прячет в библиотеке. А Лена... Ты вообще её знаешь?',
      trustChange: { npc: NpcId.SVETA, amount: 5 },
      choices: [
        { text: 'Лена? Я думала, ты её позвала.', next: 'about_lena' },
        { text: 'Ты преувеличиваешь.', next: 'exaggerating' },
        { text: 'Что именно Макс прячет?', next: 'about_maks_hint' },
      ],
    },

    just_party: {
      id: 'just_party',
      speaker: 'Света',
      text: 'Может, ты и права... Но я не могу отделаться от ощущения. Помнишь, как на прошлом стриме ты говорила про интуицию? Вот она сейчас кричит.',
      trustChange: { npc: NpcId.SVETA, amount: -5 },
      choices: [
        { text: 'Ладно, расскажи подробнее.', next: 'whats_wrong' },
        { text: 'Пойду осмотрюсь сама.', next: 'goodbye_early' },
      ],
    },

    // === О ГОСТЯХ ===
    about_guests: {
      id: 'about_guests',
      speaker: 'Света',
      text: 'Ну смотри. Дима весь день на кухне — нервничает, не подпускает никого к плите. Макс засел в библиотеке и что-то строчит в тетрадке. Арина болтает без умолку, но я заметила — она избегает тему про зеркала. А Лена... Лена вообще странная.',
      choices: [
        { text: 'Что с Леной?', next: 'about_lena' },
        { text: 'Почему Арина боится зеркал?', next: 'arina_mirrors' },
        { text: 'Я доверяю тебе. Что делать?', next: 'trust_sveta' },
      ],
    },

    // === О ЛЕНЕ ===
    about_lena: {
      id: 'about_lena',
      speaker: 'Света',
      text: 'Я её не звала. Никто её не звал. Она просто... появилась. Сказала, что «по приглашению». Но я готовила список гостей — её там не было.',
      trustChange: { npc: NpcId.SVETA, amount: 5 },
      choices: [
        { text: 'Может, кто-то другой пригласил?', next: 'lena_invited_by_whom' },
        { text: 'Это подозрительно...', next: 'lena_suspicious' },
      ],
    },

    lena_invited_by_whom: {
      id: 'lena_invited_by_whom',
      speaker: 'Света',
      text: 'Я спрашивала у всех. Дима говорит — не он. Макс пожимает плечами. Арина утверждает, что видела её «где-то раньше, но не помнит где». Это как сон, понимаешь?',
      next: 'what_to_do',
    },

    lena_suspicious: {
      id: 'lena_suspicious',
      speaker: 'Света',
      text: 'Ещё как подозрительно. И знаешь что? Она всё время смотрит на тебя. Не на вечеринку, не на гостей — на тебя. Как будто изучает.',
      next: 'what_to_do',
    },

    // === ЗЕРКАЛА И АРИНА ===
    arina_mirrors: {
      id: 'arina_mirrors',
      speaker: 'Света',
      text: 'Я упомянула зеркало в спальне, и она побледнела. Сказала: «Не смотри слишком долго». А потом засмеялась и перевела тему. Странно, правда?',
      choices: [
        { text: 'Очень. Пойду проверю зеркало.', next: 'goodbye_mirror' },
        { text: 'Ты сама-то в зеркала смотрела?', next: 'sveta_mirror' },
      ],
    },

    sveta_mirror: {
      id: 'sveta_mirror',
      speaker: 'Света',
      text: '...Да. И я видела... Не себя. То есть, себя, но... другую. Как будто отражение живёт своей жизнью. Мне стало страшно, и я ушла.',
      trustChange: { npc: NpcId.SVETA, amount: 10 },
      next: 'what_to_do',
    },

    // === ДОВЕРИЕ ===
    trust_sveta: {
      id: 'trust_sveta',
      speaker: 'Света',
      text: 'Спасибо, Семиир. Я всегда буду на твоей стороне. Помнишь наш первый стрим? Мы обещали друг другу — всегда честно. Я и сейчас честна с тобой.',
      trustChange: { npc: NpcId.SVETA, amount: 15 },
      flagSet: 'sveta_trusted',
      choices: [
        { text: 'Что ты советуешь?', next: 'sveta_advice' },
        { text: 'Я ценю это. Пойду разбираться.', next: 'goodbye_warm' },
      ],
    },

    sveta_advice: {
      id: 'sveta_advice',
      speaker: 'Света',
      text: 'Проверь библиотеку — Макс что-то прячет. Потом загляни на кухню к Диме. И... будь осторожна с зеркалами. Что-то в этом доме не то.',
      advanceStory: true,
      isEnd: true,
    },

    // === О МАКСЕ ===
    about_maks_hint: {
      id: 'about_maks_hint',
      speaker: 'Света',
      text: 'Я видела его с тетрадкой. Он писал что-то про «три версии». Три версии чего — не знаю. Но когда я подошла, он захлопнул тетрадь.',
      flagSet: 'sveta_maks_hint',
      choices: [
        { text: 'Три версии... Интересно.', next: 'what_to_do' },
        { text: 'Спасибо за подсказку!', next: 'goodbye_warm' },
      ],
    },

    // === SEED VARIANT A (Света — лжец) ===
    sveta_lie_a: {
      id: 'sveta_lie_a',
      speaker: 'Света',
      text: 'Я... должна тебе кое-что сказать. Приглашения... Я их подменила. Настоящие приглашения были другими. В них было написано: «Приходите вспоминать». Я испугалась и поменяла текст.',
      seedVariant: 'A',
      flagRequired: 'sveta_trusted',
      trustChange: { npc: NpcId.SVETA, amount: -20 },
      evidenceGrant: 'torn_invitation',
      choices: [
        { text: 'Зачем ты это сделала?!', next: 'sveta_why_lie' },
        { text: 'Что было в настоящих приглашениях?', next: 'real_invitations' },
      ],
    },

    sveta_why_lie: {
      id: 'sveta_why_lie',
      speaker: 'Света',
      text: 'Я хотела защитить тебя! Те приглашения... В них было что-то неправильное. Как будто их писала не ты. Другой почерк. Другие слова. Я испугалась.',
      isEnd: true,
    },

    real_invitations: {
      id: 'real_invitations',
      speaker: 'Света',
      text: '«Приходите вспоминать ту, которая забыла себя. Вилла ждёт. Зеркала готовы.» Это не ты писала, Семиира. Но это был твой почерк.',
      advanceStory: true,
      isEnd: true,
    },

    // === SEED VARIANT B (Света честна) ===
    sveta_honest_b: {
      id: 'sveta_honest_b',
      speaker: 'Света',
      text: 'Я нашла это в библиотеке, когда Макс отвернулся. Тебе стоит посмотреть.',
      seedVariant: 'B',
      flagRequired: 'sveta_trusted',
      evidenceGrant: 'maks_diary',
      isEnd: true,
    },

    // === SEED VARIANT C (Света знает, но боится) ===
    sveta_afraid_c: {
      id: 'sveta_afraid_c',
      speaker: 'Света',
      text: 'Семиира... Я знаю, что происходит. Но мне страшно говорить. Этот дом... он слушает. Найди ответы сама — в подвале. Там кассета. Посмотри её.',
      seedVariant: 'C',
      flagRequired: 'sveta_trusted',
      trustChange: { npc: NpcId.SVETA, amount: 10 },
      isEnd: true,
    },

    // === ПРОЩАНИЯ ===
    what_to_do: {
      id: 'what_to_do',
      speaker: 'Света',
      text: 'Осмотри дом. Поговори с каждым. Собери улики. Что-то здесь не так, и ты — единственная, кто может это разгадать.',
      choices: [
        { text: 'Я разберусь. Спасибо.', next: 'goodbye_warm' },
        { text: 'Пойдём вместе?', next: 'together' },
      ],
    },

    together: {
      id: 'together',
      speaker: 'Света',
      text: 'Мне лучше остаться здесь и наблюдать. Если замечу что-то — сразу скажу. Будь осторожна, подруга.',
      isEnd: true,
    },

    goodbye_warm: {
      id: 'goodbye_warm',
      speaker: 'Света',
      text: 'Удачи, Семиир. Я в тебя верю. Если что — я здесь.',
      isEnd: true,
    },

    goodbye_early: {
      id: 'goodbye_early',
      speaker: 'Света',
      text: 'Хорошо... Но будь осторожна. И если найдёшь что-то странное — приходи ко мне.',
      trustChange: { npc: NpcId.SVETA, amount: -5 },
      isEnd: true,
    },

    goodbye_mirror: {
      id: 'goodbye_mirror',
      speaker: 'Света',
      text: 'Только... не стой перед ним слишком долго. Обещаешь?',
      isEnd: true,
    },

    // === ПОВТОРНЫЙ РАЗГОВОР ===
    exaggerating: {
      id: 'exaggerating',
      speaker: 'Света',
      text: 'Ты мне не веришь? После всего? Ладно... Но когда увидишь сама — не говори, что я не предупреждала.',
      trustChange: { npc: NpcId.SVETA, amount: -10 },
      isEnd: true,
    },
  },
};
