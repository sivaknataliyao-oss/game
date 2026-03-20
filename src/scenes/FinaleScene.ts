import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, CSS_COLORS, FONTS, NpcId, NPC_NAMES, SemiiraVersion } from '../config';
import { VHSEffect } from '../systems/VHSEffect';
import { StateManager } from '../systems/StateManager';

type FinaleStep = 'intro' | 'question1' | 'question2' | 'question3' | 'result';

export class FinaleScene extends Phaser.Scene {
  private vhs!: VHSEffect;
  private step: FinaleStep = 'intro';
  private container!: Phaser.GameObjects.Container;

  constructor() {
    super({ key: 'FinaleScene' });
  }

  create(): void {
    this.vhs = new VHSEffect(this);
    this.container = this.add.container(0, 0);

    // Dark background
    const bg = this.add.graphics();
    bg.fillStyle(0x050510, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.container.add(bg);

    this.showIntro();
  }

  private clearContainer(): void {
    this.container.removeAll(true);
    const bg = this.add.graphics();
    bg.fillStyle(0x050510, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.container.add(bg);
  }

  // === ИНТРО ===
  private showIntro(): void {
    this.step = 'intro';
    this.vhs.triggerHeavyGlitch();

    const title = this.add.text(GAME_WIDTH / 2, 200, 'ЗЕРКАЛА ОТКРЫТЫ', {
      fontFamily: FONTS.TITLE,
      fontSize: '28px',
      color: CSS_COLORS.NEON_PINK,
      shadow: { offsetX: 2, offsetY: 2, color: '#00FFFF', blur: 10, fill: true },
    }).setOrigin(0.5).setAlpha(0);
    this.container.add(title);

    const subtitle = this.add.text(GAME_WIDTH / 2, 260, 'Пришло время ответить.', {
      fontFamily: FONTS.BODY,
      fontSize: '24px',
      color: CSS_COLORS.NEON_CYAN,
    }).setOrigin(0.5).setAlpha(0);
    this.container.add(subtitle);

    const hint = this.add.text(GAME_WIDTH / 2, 340, 'Три вопроса определят, какую правду ты увидишь.', {
      fontFamily: FONTS.BODY,
      fontSize: '18px',
      color: CSS_COLORS.WHITE,
    }).setOrigin(0.5).setAlpha(0);
    this.container.add(hint);

    this.tweens.add({ targets: title, alpha: 1, duration: 1500 });
    this.tweens.add({ targets: subtitle, alpha: 1, duration: 1500, delay: 800 });
    this.tweens.add({ targets: hint, alpha: 0.7, duration: 1500, delay: 1600 });

    // Continue button
    this.time.delayedCall(3000, () => {
      const btn = this.createButton(GAME_WIDTH / 2, 450, 'НАЧАТЬ', () => {
        this.clearContainer();
        this.showQuestion1();
      });
      this.container.add(btn);
    });
  }

  // === ВОПРОС 1: КТО ЛГАЛ БОЛЬШЕ ВСЕХ ===
  private showQuestion1(): void {
    this.step = 'question1';
    this.vhs.triggerGlitch();

    const q = this.add.text(GAME_WIDTH / 2, 100, 'Кто лгал больше всех?', {
      fontFamily: FONTS.TITLE,
      fontSize: '20px',
      color: CSS_COLORS.NEON_PINK,
    }).setOrigin(0.5);
    this.container.add(q);

    const desc = this.add.text(GAME_WIDTH / 2, 140, 'Выбери того, чьи слова были ложью.', {
      fontFamily: FONTS.BODY,
      fontSize: '18px',
      color: CSS_COLORS.WHITE,
    }).setOrigin(0.5).setAlpha(0.6);
    this.container.add(desc);

    const npcs: NpcId[] = [NpcId.SVETA, NpcId.DIMA, NpcId.MAKS, NpcId.ARINA, NpcId.LENA];
    const npcColors: Record<NpcId, number> = {
      [NpcId.SVETA]: 0x4FC3F7,
      [NpcId.DIMA]: 0xFF8A65,
      [NpcId.MAKS]: 0x81C784,
      [NpcId.ARINA]: 0xF06292,
      [NpcId.LENA]: 0xBA68C8,
    };

    npcs.forEach((npcId, i) => {
      const y = 220 + i * 70;
      const name = NPC_NAMES[npcId];
      const color = npcColors[npcId];
      const colorHex = `#${color.toString(16).padStart(6, '0')}`;

      const btnBg = this.add.graphics();
      btnBg.fillStyle(COLORS.DARK_PURPLE, 0.8);
      btnBg.fillRect(GAME_WIDTH / 2 - 180, y - 25, 360, 50);
      btnBg.lineStyle(2, color, 0.6);
      btnBg.strokeRect(GAME_WIDTH / 2 - 180, y - 25, 360, 50);
      this.container.add(btnBg);

      const txt = this.add.text(GAME_WIDTH / 2, y, name, {
        fontFamily: FONTS.TITLE,
        fontSize: '16px',
        color: colorHex,
      }).setOrigin(0.5);
      this.container.add(txt);

      const zone = this.add.rectangle(GAME_WIDTH / 2, y, 360, 50, 0x000000, 0)
        .setInteractive({ useHandCursor: true });
      zone.on('pointerover', () => {
        btnBg.clear();
        btnBg.fillStyle(color, 0.2);
        btnBg.fillRect(GAME_WIDTH / 2 - 180, y - 25, 360, 50);
        btnBg.lineStyle(2, color, 1);
        btnBg.strokeRect(GAME_WIDTH / 2 - 180, y - 25, 360, 50);
      });
      zone.on('pointerout', () => {
        btnBg.clear();
        btnBg.fillStyle(COLORS.DARK_PURPLE, 0.8);
        btnBg.fillRect(GAME_WIDTH / 2 - 180, y - 25, 360, 50);
        btnBg.lineStyle(2, color, 0.6);
        btnBg.strokeRect(GAME_WIDTH / 2 - 180, y - 25, 360, 50);
      });
      zone.on('pointerdown', () => {
        const state = StateManager.get();
        state.endingAnswers.liar = npcId;
        StateManager.set({ endingAnswers: state.endingAnswers });
        this.clearContainer();
        this.showQuestion2();
      });
      this.container.add(zone);
    });
  }

  // === ВОПРОС 2: КАКАЯ СЕМИИРА НАСТОЯЩАЯ ===
  private showQuestion2(): void {
    this.step = 'question2';
    this.vhs.triggerGlitch();

    const q = this.add.text(GAME_WIDTH / 2, 120, 'Какая Семиира настоящая?', {
      fontFamily: FONTS.TITLE,
      fontSize: '20px',
      color: CSS_COLORS.NEON_PINK,
    }).setOrigin(0.5);
    this.container.add(q);

    const versions: { label: string; value: SemiiraVersion; desc: string; color: number }[] = [
      { label: 'Праздничная', value: 'festive', desc: 'Та, что смеётся и веселит. Маска стримера.', color: 0xFFD700 },
      { label: 'Истинная', value: 'true', desc: 'Та, что молчит и думает. Скрытая от всех.', color: 0x00FFFF },
      { label: 'Отражённая', value: 'reflected', desc: 'Та, что живёт в зеркалах. Память дома.', color: 0xFF69B4 },
    ];

    versions.forEach((v, i) => {
      const y = 240 + i * 110;
      const colorHex = `#${v.color.toString(16).padStart(6, '0')}`;

      const btnBg = this.add.graphics();
      btnBg.fillStyle(COLORS.DARK_PURPLE, 0.8);
      btnBg.fillRect(GAME_WIDTH / 2 - 220, y - 35, 440, 80);
      btnBg.lineStyle(2, v.color, 0.6);
      btnBg.strokeRect(GAME_WIDTH / 2 - 220, y - 35, 440, 80);
      this.container.add(btnBg);

      const nameText = this.add.text(GAME_WIDTH / 2, y - 10, v.label, {
        fontFamily: FONTS.TITLE,
        fontSize: '16px',
        color: colorHex,
      }).setOrigin(0.5);
      this.container.add(nameText);

      const descText = this.add.text(GAME_WIDTH / 2, y + 18, v.desc, {
        fontFamily: FONTS.BODY,
        fontSize: '16px',
        color: CSS_COLORS.WHITE,
      }).setOrigin(0.5).setAlpha(0.7);
      this.container.add(descText);

      const zone = this.add.rectangle(GAME_WIDTH / 2, y, 440, 80, 0x000000, 0)
        .setInteractive({ useHandCursor: true });
      zone.on('pointerover', () => {
        btnBg.clear();
        btnBg.fillStyle(v.color, 0.15);
        btnBg.fillRect(GAME_WIDTH / 2 - 220, y - 35, 440, 80);
        btnBg.lineStyle(2, v.color, 1);
        btnBg.strokeRect(GAME_WIDTH / 2 - 220, y - 35, 440, 80);
      });
      zone.on('pointerout', () => {
        btnBg.clear();
        btnBg.fillStyle(COLORS.DARK_PURPLE, 0.8);
        btnBg.fillRect(GAME_WIDTH / 2 - 220, y - 35, 440, 80);
        btnBg.lineStyle(2, v.color, 0.6);
        btnBg.strokeRect(GAME_WIDTH / 2 - 220, y - 35, 440, 80);
      });
      zone.on('pointerdown', () => {
        const state = StateManager.get();
        state.endingAnswers.semiiraVersion = v.value;
        StateManager.set({ endingAnswers: state.endingAnswers });
        this.clearContainer();
        this.showQuestion3();
      });
      this.container.add(zone);
    });
  }

  // === ВОПРОС 3: ЧТО ПРОИЗОШЛО НА САМОМ ДЕЛЕ ===
  private showQuestion3(): void {
    this.step = 'question3';
    this.vhs.triggerGlitch();

    const q = this.add.text(GAME_WIDTH / 2, 100, 'Что произошло на самом деле?', {
      fontFamily: FONTS.TITLE,
      fontSize: '20px',
      color: CSS_COLORS.NEON_PINK,
    }).setOrigin(0.5);
    this.container.add(q);

    const options: { label: string; value: string; desc: string }[] = [
      {
        label: 'Дом украл мою память',
        value: 'house_stole',
        desc: 'Вилла — ловушка, которая забирает воспоминания и создаёт копии.',
      },
      {
        label: 'Гости помнили меня неправильно',
        value: 'wrong_memory',
        desc: 'Каждый гость создал свою версию меня, и они столкнулись.',
      },
      {
        label: 'Я забыла, кто я',
        value: 'forgot_myself',
        desc: 'Я сама разделилась на три версии и забыла, какая настоящая.',
      },
    ];

    options.forEach((opt, i) => {
      const y = 220 + i * 120;

      const btnBg = this.add.graphics();
      btnBg.fillStyle(COLORS.DARK_PURPLE, 0.8);
      btnBg.fillRect(GAME_WIDTH / 2 - 280, y - 40, 560, 90);
      btnBg.lineStyle(2, COLORS.NEON_CYAN, 0.5);
      btnBg.strokeRect(GAME_WIDTH / 2 - 280, y - 40, 560, 90);
      this.container.add(btnBg);

      const nameText = this.add.text(GAME_WIDTH / 2, y - 15, opt.label, {
        fontFamily: FONTS.TITLE,
        fontSize: '14px',
        color: CSS_COLORS.NEON_CYAN,
      }).setOrigin(0.5);
      this.container.add(nameText);

      const descText = this.add.text(GAME_WIDTH / 2, y + 15, opt.desc, {
        fontFamily: FONTS.BODY,
        fontSize: '16px',
        color: CSS_COLORS.WHITE,
        wordWrap: { width: 500 },
        align: 'center',
      }).setOrigin(0.5).setAlpha(0.6);
      this.container.add(descText);

      const zone = this.add.rectangle(GAME_WIDTH / 2, y, 560, 90, 0x000000, 0)
        .setInteractive({ useHandCursor: true });
      zone.on('pointerover', () => {
        btnBg.clear();
        btnBg.fillStyle(COLORS.NEON_CYAN, 0.1);
        btnBg.fillRect(GAME_WIDTH / 2 - 280, y - 40, 560, 90);
        btnBg.lineStyle(2, COLORS.NEON_CYAN, 1);
        btnBg.strokeRect(GAME_WIDTH / 2 - 280, y - 40, 560, 90);
      });
      zone.on('pointerout', () => {
        btnBg.clear();
        btnBg.fillStyle(COLORS.DARK_PURPLE, 0.8);
        btnBg.fillRect(GAME_WIDTH / 2 - 280, y - 40, 560, 90);
        btnBg.lineStyle(2, COLORS.NEON_CYAN, 0.5);
        btnBg.strokeRect(GAME_WIDTH / 2 - 280, y - 40, 560, 90);
      });
      zone.on('pointerdown', () => {
        const state = StateManager.get();
        state.endingAnswers.truth = opt.value;
        StateManager.set({ endingAnswers: state.endingAnswers });
        this.clearContainer();
        this.showResult();
      });
      this.container.add(zone);
    });
  }

  // === РЕЗУЛЬТАТ ===
  private showResult(): void {
    this.step = 'result';
    this.vhs.triggerHeavyGlitch();

    const state = StateManager.get();
    const answers = state.endingAnswers;

    // Determine ending
    const correctLiar = answers.liar === state.mainLiar;
    const correctVersion = answers.semiiraVersion === state.dominantSemiira;
    const correctTruth = answers.truth === 'forgot_myself'; // canonical answer
    const allEvidence = StateManager.getAllEvidenceCollected();

    let endingType: 'true' | 'bitter' | 'distorted' | 'secret';
    let title: string;
    let text: string;

    if (allEvidence && correctLiar && correctVersion && correctTruth) {
      endingType = 'secret';
      title = 'СЕКРЕТНЫЙ КОНЕЦ';
      text = 'Ты собрала все улики. Ты назвала лжеца. Ты узнала настоящую себя. И ты поняла правду.\n\nВсе три Семииры — это ты. Праздничная — для зрителей. Истинная — для себя. Отражённая — для дома.\n\nТы не разбита. Ты — целая.';
    } else if (correctLiar && correctVersion && correctTruth) {
      endingType = 'true';
      title = 'ИСТИННЫЙ КОНЕЦ';
      text = 'Ты вспомнила себя. Настоящую. Не ту, которую придумали другие.\n\nЗеркала закрываются. Отражённая улыбается — не от злости, а от облегчения. Она наконец может уснуть.\n\nС днём рождения, Семиира.';
    } else if (correctLiar || correctVersion || correctTruth) {
      endingType = 'bitter';
      title = 'ГОРЬКАЯ ПРАВДА';
      text = 'Правда — не всегда то, что хочешь услышать. Но ты справилась. Почти.\n\nЧасть зеркал закрылась. Часть — осталась открытой. Отражённая смотрит на тебя с грустью.\n\n«Ты почти вспомнила. Почти.»';
    } else {
      endingType = 'distorted';
      title = 'ИСКАЖЁННЫЙ КОНЕЦ';
      text = 'Зеркала разбиты. Отражения перемешались.\n\nТы не смогла найти правду. Или правда нашла не тебя.\n\nКто ты теперь? Праздничная, Истинная, Отражённая... или никто?\n\nДом продолжает помнить. Ждать. Звать.';
    }

    // Color scheme based on ending
    const endingColors: Record<string, number> = {
      secret: COLORS.NEON_CYAN,
      true: COLORS.NEON_PINK,
      bitter: COLORS.GOLD,
      distorted: COLORS.DARK_RED,
    };
    const endColor = endingColors[endingType] || COLORS.NEON_PINK;
    const endColorHex = `#${endColor.toString(16).padStart(6, '0')}`;

    // Animate title
    const titleText = this.add.text(GAME_WIDTH / 2, 150, title, {
      fontFamily: FONTS.TITLE,
      fontSize: '24px',
      color: endColorHex,
      shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 8, fill: true },
    }).setOrigin(0.5).setAlpha(0);
    this.container.add(titleText);

    const bodyText = this.add.text(GAME_WIDTH / 2, 350, text, {
      fontFamily: FONTS.BODY,
      fontSize: '20px',
      color: CSS_COLORS.WHITE,
      wordWrap: { width: 600 },
      align: 'center',
      lineSpacing: 6,
    }).setOrigin(0.5).setAlpha(0);
    this.container.add(bodyText);

    this.tweens.add({ targets: titleText, alpha: 1, duration: 2000 });
    this.tweens.add({ targets: bodyText, alpha: 1, duration: 2000, delay: 1500 });

    // Continue to slideshow or back to menu
    this.time.delayedCall(5000, () => {
      if (endingType === 'secret') {
        const btn = this.createButton(GAME_WIDTH / 2, GAME_HEIGHT - 80, 'СЛАЙДШОУ →', () => {
          this.scene.start('SlideshowScene');
        });
        this.container.add(btn);
      } else {
        const btn = this.createButton(GAME_WIDTH / 2, GAME_HEIGHT - 80, 'В МЕНЮ', () => {
          this.scene.start('MenuScene');
        });
        this.container.add(btn);
      }
    });
  }

  private createButton(x: number, y: number, label: string, onClick: () => void): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);

    const bg = this.add.graphics();
    bg.fillStyle(COLORS.DARK_PURPLE, 0.8);
    bg.fillRect(-120, -22, 240, 44);
    bg.lineStyle(2, COLORS.NEON_PINK, 0.8);
    bg.strokeRect(-120, -22, 240, 44);
    container.add(bg);

    const text = this.add.text(0, 0, label, {
      fontFamily: FONTS.TITLE,
      fontSize: '14px',
      color: CSS_COLORS.WHITE,
    }).setOrigin(0.5);
    container.add(text);

    const zone = this.add.rectangle(x, y, 240, 44, 0x000000, 0)
      .setInteractive({ useHandCursor: true });
    zone.on('pointerover', () => {
      text.setColor(CSS_COLORS.NEON_CYAN);
    });
    zone.on('pointerout', () => {
      text.setColor(CSS_COLORS.WHITE);
    });
    zone.on('pointerdown', onClick);

    return container;
  }

  update(time: number): void {
    this.vhs.update(time);
  }
}
