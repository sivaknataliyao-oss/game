import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, CSS_COLORS, FONTS } from '../config';
import { VHSEffect } from '../systems/VHSEffect';

const PROLOGUE_LINES = [
  'Ты получил приглашение.',
  'Конверт без обратного адреса.',
  'Внутри — одна строчка:',
  '',
  '«Приходи. Увидишь настоящую меня. — S.»',
  '',
  'Ты не помнишь, как сюда попал.',
  'Но дверь уже открыта.',
];

export class PrologueScene extends Phaser.Scene {
  private vhs!: VHSEffect;
  private lineIndex = 0;
  private charIndex = 0;
  private displayedTexts: Phaser.GameObjects.Text[] = [];
  private currentText?: Phaser.GameObjects.Text;
  private isTyping = false;
  private enterButton?: Phaser.GameObjects.Text;
  private typeTimer?: Phaser.Time.TimerEvent;
  private lineTimer?: Phaser.Time.TimerEvent;

  constructor() {
    super({ key: 'PrologueScene' });
  }

  create(): void {
    this.vhs = new VHSEffect(this);
    this.lineIndex = 0;
    this.charIndex = 0;
    this.displayedTexts = [];
    this.isTyping = false;

    // Background
    const bg = this.add.graphics();
    bg.fillStyle(0x000000, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Scanlines overlay
    const scanlines = this.add.graphics();
    scanlines.setDepth(100);
    scanlines.setAlpha(0.06);
    for (let y = 0; y < GAME_HEIGHT; y += 4) {
      scanlines.fillStyle(0x000000, 1);
      scanlines.fillRect(0, y, GAME_WIDTH, 2);
    }

    this.showNextLine();
  }

  private showNextLine(): void {
    if (this.lineIndex >= PROLOGUE_LINES.length) {
      this.showEnterButton();
      return;
    }

    const line = PROLOGUE_LINES[this.lineIndex];

    if (line === '') {
      this.lineIndex++;
      this.lineTimer = this.time.delayedCall(500, () => this.showNextLine());
      return;
    }

    const isQuote = line.startsWith('\u00ab');
    const y = 200 + this.displayedTexts.length * 40;

    this.currentText = this.add.text(GAME_WIDTH / 2, y, '', {
      fontFamily: FONTS.BODY,
      fontSize: isQuote ? '28px' : '22px',
      color: isQuote ? CSS_COLORS.NEON_PINK : CSS_COLORS.WHITE,
      align: 'center',
    }).setOrigin(0.5).setDepth(10);

    if (isQuote) {
      this.currentText.setShadow(0, 0, '#FF69B4', 10, false, true);
    }

    this.charIndex = 0;
    this.isTyping = true;
    this.typeCharacter(line);
  }

  private typeCharacter(line: string): void {
    if (this.charIndex >= line.length) {
      this.isTyping = false;
      this.displayedTexts.push(this.currentText!);
      this.lineIndex++;
      this.lineTimer = this.time.delayedCall(700, () => this.showNextLine());
      return;
    }

    this.charIndex++;
    this.currentText!.setText(line.substring(0, this.charIndex));
    this.typeTimer = this.time.delayedCall(40, () => this.typeCharacter(line));
  }

  private showEnterButton(): void {
    this.time.delayedCall(600, () => {
      this.enterButton = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 120, 'Войти', {
        fontFamily: FONTS.TITLE,
        fontSize: '18px',
        color: CSS_COLORS.NEON_PINK,
        padding: { left: 30, right: 30, top: 10, bottom: 10 },
      }).setOrigin(0.5).setDepth(10).setAlpha(0)
        .setInteractive({ useHandCursor: true });

      // Border
      const btnBg = this.add.graphics().setDepth(9);
      const bx = GAME_WIDTH / 2 - 80;
      const by = GAME_HEIGHT - 145;
      btnBg.lineStyle(2, COLORS.NEON_PINK, 0.8);
      btnBg.strokeRect(bx, by, 160, 50);
      btnBg.setAlpha(0);

      this.tweens.add({
        targets: [this.enterButton, btnBg],
        alpha: 1,
        duration: 800,
      });

      this.enterButton.on('pointerover', () => {
        this.enterButton!.setColor(CSS_COLORS.NEON_CYAN);
        btnBg.clear();
        btnBg.lineStyle(2, COLORS.NEON_CYAN, 1);
        btnBg.strokeRect(bx, by, 160, 50);
      });

      this.enterButton.on('pointerout', () => {
        this.enterButton!.setColor(CSS_COLORS.NEON_PINK);
        btnBg.clear();
        btnBg.lineStyle(2, COLORS.NEON_PINK, 0.8);
        btnBg.strokeRect(bx, by, 160, 50);
      });

      this.enterButton.on('pointerdown', () => {
        this.vhs.triggerHeavyGlitch();
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.time.delayedCall(500, () => {
          this.scene.start('GameScene');
        });
      });
    });
  }

  update(time: number): void {
    this.vhs.update(time);
  }
}
