import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, CSS_COLORS, FONTS } from '../config';
import { VHSEffect } from '../systems/VHSEffect';
import { StateManager } from '../systems/StateManager';

export class FinaleScene extends Phaser.Scene {
  private vhs!: VHSEffect;
  private container!: Phaser.GameObjects.Container;

  constructor() {
    super({ key: 'FinaleScene' });
  }

  create(): void {
    this.vhs = new VHSEffect(this);
    this.container = this.add.container(0, 0);

    const bg = this.add.graphics();
    bg.fillStyle(0x050510, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.container.add(bg);

    this.vhs.triggerHeavyGlitch();

    const hasRealTape = StateManager.hasEvidence('clue_real_tape');

    if (hasRealTape) {
      this.showTrueEnding();
    } else {
      this.showNormalEnding();
    }
  }

  private showNormalEnding(): void {
    const title = this.add.text(GAME_WIDTH / 2, 180, 'ВЕЧЕРИНКА ПРОДОЛЖАЕТСЯ...', {
      fontFamily: FONTS.TITLE,
      fontSize: '20px',
      color: CSS_COLORS.NEON_PINK,
      shadow: { offsetX: 2, offsetY: 2, color: '#00FFFF', blur: 10, fill: true },
    }).setOrigin(0.5).setAlpha(0);
    this.container.add(title);

    const lines = [
      'Ты пришёл. Ты смотрел. Ты искал.',
      'Но настоящую кассету ты так и не нашёл.',
      '',
      'Вечеринка идёт дальше.',
      'Дискошар крутится. Гости смеются.',
      'Semiira улыбается — как всегда.',
      '',
      'Но за улыбкой… кто знает?',
      'Может, в следующий раз ты услышишь её голос.',
      'Настоящий.',
    ];

    const bodyText = this.add.text(GAME_WIDTH / 2, 340, lines.join('\n'), {
      fontFamily: FONTS.BODY,
      fontSize: '20px',
      color: CSS_COLORS.WHITE,
      wordWrap: { width: 600 },
      align: 'center',
      lineSpacing: 6,
    }).setOrigin(0.5).setAlpha(0);
    this.container.add(bodyText);

    this.tweens.add({ targets: title, alpha: 1, duration: 2000 });
    this.tweens.add({ targets: bodyText, alpha: 0.8, duration: 2000, delay: 1500 });

    this.time.delayedCall(5000, () => {
      const btn = this.createButton(GAME_WIDTH / 2, GAME_HEIGHT - 80, 'В МЕНЮ', () => {
        this.scene.start('MenuScene');
      });
      this.container.add(btn);
    });
  }

  private showTrueEnding(): void {
    const title = this.add.text(GAME_WIDTH / 2, 180, 'КАССЕТА КОНЧИЛАСЬ...', {
      fontFamily: FONTS.TITLE,
      fontSize: '20px',
      color: CSS_COLORS.NEON_CYAN,
      shadow: { offsetX: 2, offsetY: 2, color: '#FF69B4', blur: 10, fill: true },
    }).setOrigin(0.5).setAlpha(0);
    this.container.add(title);

    const lines = [
      'Ты нашёл её.',
      'Не ту, что на стримах. Не ту, что на вечеринке.',
      'Настоящую.',
      '',
      'Голос на кассете дрожит.',
      '«Я не помню, какая я без камеры...»',
      '',
      'Теперь ты знаешь.',
      'За улыбками, за неоном, за VHS-эстетикой —',
      'была просто девушка, которая забыла себя.',
      '',
      'Но ты — вспомнил.',
    ];

    const bodyText = this.add.text(GAME_WIDTH / 2, 340, lines.join('\n'), {
      fontFamily: FONTS.BODY,
      fontSize: '20px',
      color: CSS_COLORS.WHITE,
      wordWrap: { width: 600 },
      align: 'center',
      lineSpacing: 6,
    }).setOrigin(0.5).setAlpha(0);
    this.container.add(bodyText);

    this.tweens.add({ targets: title, alpha: 1, duration: 2000 });
    this.tweens.add({ targets: bodyText, alpha: 0.8, duration: 2000, delay: 1500 });

    this.time.delayedCall(5000, () => {
      const btn = this.createButton(GAME_WIDTH / 2, GAME_HEIGHT - 80, 'СЛАЙДШОУ →', () => {
        this.scene.start('SlideshowScene');
      });
      this.container.add(btn);
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
    zone.on('pointerover', () => text.setColor(CSS_COLORS.NEON_CYAN));
    zone.on('pointerout', () => text.setColor(CSS_COLORS.WHITE));
    zone.on('pointerdown', onClick);

    return container;
  }

  update(time: number): void {
    this.vhs.update(time);
  }
}
