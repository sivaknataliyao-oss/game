import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, CSS_COLORS, FONTS } from '../config';
import { VHSEffect } from '../systems/VHSEffect';

interface Slide {
  text: string;
  subtext?: string;
  color: number;
  duration: number;
}

const SLIDES: Slide[] = [
  {
    text: 'Это была не просто вечеринка...',
    subtext: 'Это была история о том, как найти себя.',
    color: COLORS.NEON_PINK,
    duration: 5000,
  },
  {
    text: 'Каждый гость принёс часть правды...',
    subtext: 'Но только ты смогла собрать её воедино.',
    color: COLORS.NEON_CYAN,
    duration: 5000,
  },
  {
    text: 'Свете —',
    subtext: 'За то, что всегда была рядом.\nЛучшая подруга. Верный наблюдатель. Тот, кто никогда не предаст.',
    color: 0x4FC3F7,
    duration: 6000,
  },
  {
    text: 'Диме —',
    subtext: 'За тепло и заботу.\nЗа каждый торт, каждый ужин, каждую чашку чая.\nДаже если чай был с секретом.',
    color: 0xFF8A65,
    duration: 6000,
  },
  {
    text: 'Максу —',
    subtext: 'За мудрость в тишине.\nЗа книги, которые помогли понять.\nЗа вопросы, которые важнее ответов.',
    color: 0x81C784,
    duration: 6000,
  },
  {
    text: 'Арине —',
    subtext: 'За искренний смех.\nЗа сплетни, которые оказались правдой.\nЗа храбрость быть собой.',
    color: 0xF06292,
    duration: 6000,
  },
  {
    text: 'Лене —',
    subtext: 'За загадку, которая стала ответом.\nЗа отражение, которое стало другом.\nЗа память, которая не умирает.',
    color: 0xBA68C8,
    duration: 6000,
  },
  {
    text: 'А тебе, игрок —',
    subtext: 'Спасибо, что вспомнил меня правильно.\nСпасибо, что прошёл этот путь.\nСпасибо, что был рядом.',
    color: COLORS.NEON_PINK,
    duration: 7000,
  },
  {
    text: 'С днём рождения, Семиира.',
    subtext: 'Все три версии тебя — прекрасны.\nПраздничная. Истинная. Отражённая.\nТы — целая.',
    color: COLORS.NEON_CYAN,
    duration: 8000,
  },
  {
    text: '♡',
    subtext: 'semiira_game\n\nСпасибо за вашу поддержку.\nЭтот мир существует благодаря вам.',
    color: COLORS.NEON_PINK,
    duration: 10000,
  },
];

export class SlideshowScene extends Phaser.Scene {
  private vhs!: VHSEffect;
  private slideIndex = 0;
  private isTransitioning = false;

  constructor() {
    super({ key: 'SlideshowScene' });
  }

  create(): void {
    this.vhs = new VHSEffect(this);
    this.slideIndex = 0;
    this.showSlide(0);
  }

  private showSlide(index: number): void {
    if (index >= SLIDES.length) {
      this.showCredits();
      return;
    }

    this.isTransitioning = true;
    const slide = SLIDES[index];
    const colorHex = `#${slide.color.toString(16).padStart(6, '0')}`;

    // Fade in background
    this.cameras.main.fadeIn(800, 0x05, 0x05, 0x10);

    // Background
    const bg = this.add.graphics();
    bg.fillStyle(0x050510, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Decorative particles
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * GAME_WIDTH;
      const y = Math.random() * GAME_HEIGHT;
      const p = this.add.circle(x, y, Math.random() * 3 + 1, slide.color, 0.2);
      this.tweens.add({
        targets: p,
        y: y - 50 - Math.random() * 100,
        alpha: 0,
        duration: 3000 + Math.random() * 3000,
        repeat: -1,
      });
    }

    // Main text
    const mainText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 60, slide.text, {
      fontFamily: FONTS.TITLE,
      fontSize: slide.text.length <= 5 ? '72px' : '22px',
      color: colorHex,
      shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 10, fill: true },
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: mainText,
      alpha: 1,
      y: GAME_HEIGHT / 2 - 80,
      duration: 1500,
      ease: 'Power2',
    });

    // Subtext
    if (slide.subtext) {
      const subText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30, slide.subtext, {
        fontFamily: FONTS.BODY,
        fontSize: '20px',
        color: CSS_COLORS.WHITE,
        align: 'center',
        lineSpacing: 6,
        wordWrap: { width: 600 },
      }).setOrigin(0.5).setAlpha(0);

      this.tweens.add({
        targets: subText,
        alpha: 0.8,
        duration: 1500,
        delay: 1000,
      });
    }

    // Slide counter
    this.add.text(GAME_WIDTH - 30, GAME_HEIGHT - 30, `${index + 1}/${SLIDES.length}`, {
      fontFamily: FONTS.BODY,
      fontSize: '14px',
      color: CSS_COLORS.WHITE,
    }).setOrigin(1, 1).setAlpha(0.3);

    // Auto-advance or click to advance
    const advanceTimer = this.time.delayedCall(slide.duration, () => {
      this.nextSlide(index);
    });

    this.input.once('pointerdown', () => {
      if (!this.isTransitioning) return;
      advanceTimer.remove();
      this.nextSlide(index);
    });

    this.time.delayedCall(1000, () => {
      this.isTransitioning = false;
    });
  }

  private nextSlide(currentIndex: number): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.slideIndex = currentIndex + 1;

    this.cameras.main.fadeOut(600, 0x05, 0x05, 0x10);
    this.time.delayedCall(600, () => {
      // Clear everything except VHS
      this.children.removeAll(true);
      this.vhs = new VHSEffect(this);
      this.showSlide(this.slideIndex);
    });
  }

  private showCredits(): void {
    const bg = this.add.graphics();
    bg.fillStyle(0x050510, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    this.cameras.main.fadeIn(1000, 0x05, 0x05, 0x10);

    const title = this.add.text(GAME_WIDTH / 2, 200, 'SEMIIRA:\nWho Remembered Me Wrong', {
      fontFamily: FONTS.TITLE,
      fontSize: '20px',
      color: CSS_COLORS.NEON_PINK,
      align: 'center',
      lineSpacing: 8,
      shadow: { offsetX: 2, offsetY: 2, color: '#00FFFF', blur: 10, fill: true },
    }).setOrigin(0.5);

    const subtitle = this.add.text(GAME_WIDTH / 2, 280, 'Кто помнил меня неправильно', {
      fontFamily: FONTS.BODY,
      fontSize: '20px',
      color: CSS_COLORS.NEON_CYAN,
    }).setOrigin(0.5);

    const credits = this.add.text(GAME_WIDTH / 2, 380, [
      'Создано для semiira_game',
      '',
      'С любовью от подписчиков',
      '',
      'Персонажи: Света, Дима, Макс, Арина, Лена',
      '',
      'Спасибо, что играли.',
    ].join('\n'), {
      fontFamily: FONTS.BODY,
      fontSize: '18px',
      color: CSS_COLORS.WHITE,
      align: 'center',
      lineSpacing: 4,
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: credits,
      alpha: 0.7,
      duration: 2000,
      delay: 1000,
    });

    // Back to menu button
    this.time.delayedCall(4000, () => {
      const btn = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 60, 'В МЕНЮ', {
        fontFamily: FONTS.TITLE,
        fontSize: '14px',
        color: CSS_COLORS.NEON_CYAN,
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      btn.on('pointerover', () => btn.setColor(CSS_COLORS.NEON_PINK));
      btn.on('pointerout', () => btn.setColor(CSS_COLORS.NEON_CYAN));
      btn.on('pointerdown', () => this.scene.start('MenuScene'));
    });
  }

  update(time: number): void {
    this.vhs.update(time);
  }
}
