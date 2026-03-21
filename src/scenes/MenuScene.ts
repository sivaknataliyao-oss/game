import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, CSS_COLORS, FONTS } from '../config';
import { VHSEffect } from '../systems/VHSEffect';
import { StateManager } from '../systems/StateManager';

export class MenuScene extends Phaser.Scene {
  private vhs!: VHSEffect;

  constructor() {
    super({ key: 'MenuScene' });
  }

  create(): void {
    this.vhs = new VHSEffect(this);

    // Background gradient
    const bg = this.add.graphics();
    bg.fillStyle(COLORS.DEEP_PURPLE, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Decorative floating particles
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * GAME_WIDTH;
      const y = Math.random() * GAME_HEIGHT;
      const particle = this.add.circle(x, y, Math.random() * 2 + 1, COLORS.NEON_PINK, 0.3);
      this.tweens.add({
        targets: particle,
        y: y - 100 - Math.random() * 200,
        alpha: 0,
        duration: 3000 + Math.random() * 4000,
        repeat: -1,
        yoyo: false,
        onRepeat: () => {
          particle.setPosition(Math.random() * GAME_WIDTH, GAME_HEIGHT + 10);
          particle.setAlpha(0.3);
        },
      });
    }

    // Title
    const title = this.add.text(GAME_WIDTH / 2, 180, 'SEMIIRA', {
      fontFamily: FONTS.TITLE,
      fontSize: '48px',
      color: CSS_COLORS.NEON_PINK,
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#00FFFF',
        blur: 8,
        fill: true,
      },
    }).setOrigin(0.5);

    // Subtitle with glitch
    const subtitle = this.add.text(GAME_WIDTH / 2, 250, 'Who Remembered Me Wrong', {
      fontFamily: FONTS.BODY,
      fontSize: '32px',
      color: CSS_COLORS.NEON_CYAN,
    }).setOrigin(0.5);

    // Subtitle glitch effect
    this.time.addEvent({
      delay: 3000,
      loop: true,
      callback: () => {
        const original = subtitle.x;
        subtitle.x += (Math.random() - 0.5) * 10;
        subtitle.setAlpha(0.5);
        this.time.delayedCall(100, () => {
          subtitle.x = original;
          subtitle.setAlpha(1);
        });
      },
    });

    // Russian subtitle
    this.add.text(GAME_WIDTH / 2, 290, 'Кто помнил меня неправильно', {
      fontFamily: FONTS.BODY,
      fontSize: '20px',
      color: CSS_COLORS.WHITE,
    }).setOrigin(0.5).setAlpha(0.6);

    // Menu buttons
    const buttonY = 400;
    const buttonSpacing = 70;

    this.createButton(GAME_WIDTH / 2, buttonY, 'НАЧАТЬ', () => {
      StateManager.reset();
      this.vhs.triggerHeavyGlitch();
      this.time.delayedCall(500, () => {
        this.scene.start('PrologueScene');
      });
    });

    const hasSave = localStorage.getItem('semiira_save') !== null;
    if (hasSave) {
      this.createButton(GAME_WIDTH / 2, buttonY + buttonSpacing, 'ПРОДОЛЖИТЬ', () => {
        this.scene.start('GameScene');
      });
    }

    // Footer
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 40, 'semiira_game birthday special', {
      fontFamily: FONTS.BODY,
      fontSize: '16px',
      color: CSS_COLORS.NEON_PINK,
    }).setOrigin(0.5).setAlpha(0.4);

    // Title pulse
    this.tweens.add({
      targets: title,
      scaleX: 1.02,
      scaleY: 1.02,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  private createButton(x: number, y: number, label: string, onClick: () => void): void {
    const bg = this.add.graphics();
    bg.fillStyle(COLORS.DARK_PURPLE, 0.8);
    bg.fillRect(x - 140, y - 25, 280, 50);
    bg.lineStyle(2, COLORS.NEON_PINK, 0.8);
    bg.strokeRect(x - 140, y - 25, 280, 50);

    const text = this.add.text(x, y, label, {
      fontFamily: FONTS.TITLE,
      fontSize: '18px',
      color: CSS_COLORS.WHITE,
    }).setOrigin(0.5);

    const hitArea = this.add.rectangle(x, y, 280, 50, 0x000000, 0)
      .setInteractive({ useHandCursor: true });

    hitArea.on('pointerover', () => {
      bg.clear();
      bg.fillStyle(COLORS.NEON_PINK, 0.3);
      bg.fillRect(x - 140, y - 25, 280, 50);
      bg.lineStyle(2, COLORS.NEON_CYAN, 1);
      bg.strokeRect(x - 140, y - 25, 280, 50);
      text.setColor(CSS_COLORS.NEON_CYAN);
    });

    hitArea.on('pointerout', () => {
      bg.clear();
      bg.fillStyle(COLORS.DARK_PURPLE, 0.8);
      bg.fillRect(x - 140, y - 25, 280, 50);
      bg.lineStyle(2, COLORS.NEON_PINK, 0.8);
      bg.strokeRect(x - 140, y - 25, 280, 50);
      text.setColor(CSS_COLORS.WHITE);
    });

    hitArea.on('pointerdown', onClick);
  }

  update(time: number): void {
    this.vhs.update(time);
  }
}
