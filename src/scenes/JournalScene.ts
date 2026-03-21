import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, CSS_COLORS, FONTS } from '../config';
import { EvidenceManager, EvidenceItem } from '../systems/EvidenceManager';
import { StateManager } from '../systems/StateManager';

export class JournalScene extends Phaser.Scene {
  private selectedItem: EvidenceItem | null = null;
  private detailText!: Phaser.GameObjects.Text;
  private detailBg!: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: 'JournalScene' });
  }

  create(): void {
    // Background overlay
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.7);
    overlay.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Journal panel
    const panelX = 60;
    const panelY = 40;
    const panelW = GAME_WIDTH - 120;
    const panelH = GAME_HEIGHT - 80;

    const panel = this.add.graphics();
    panel.fillStyle(COLORS.DEEP_PURPLE, 0.95);
    panel.fillRect(panelX, panelY, panelW, panelH);
    panel.lineStyle(2, COLORS.NEON_PINK, 0.8);
    panel.strokeRect(panelX, panelY, panelW, panelH);

    // Title
    this.add.text(GAME_WIDTH / 2, panelY + 30, 'ДНЕВНИК', {
      fontFamily: FONTS.TITLE,
      fontSize: '20px',
      color: CSS_COLORS.NEON_PINK,
    }).setOrigin(0.5);

    // Subtitle - evidence count
    const collected = EvidenceManager.getCollected();
    const total = EvidenceManager.getAll().length;
    this.add.text(GAME_WIDTH / 2, panelY + 58, `Улики собраны: ${collected.length}/${total}`, {
      fontFamily: FONTS.BODY,
      fontSize: '18px',
      color: CSS_COLORS.NEON_CYAN,
    }).setOrigin(0.5);

    // Evidence grid
    const allEvidence = EvidenceManager.getAll();
    const cols = 5;
    const startX = panelX + 40;
    const startY = panelY + 90;
    const cellW = (panelW - 80) / cols;
    const cellH = 80;

    allEvidence.forEach((item, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cx = startX + col * cellW;
      const cy = startY + row * cellH;
      const isCollected = EvidenceManager.isCollected(item.id);

      const cellBg = this.add.graphics();
      if (isCollected) {
        cellBg.fillStyle(COLORS.DARK_PURPLE, 0.8);
        cellBg.lineStyle(1, COLORS.NEON_CYAN, 0.6);
      } else {
        cellBg.fillStyle(COLORS.DARK_PURPLE, 0.3);
        cellBg.lineStyle(1, COLORS.GRAY, 0.2);
      }
      cellBg.fillRect(cx, cy, cellW - 8, cellH - 8);
      cellBg.strokeRect(cx, cy, cellW - 8, cellH - 8);

      // Icon
      if (isCollected) {
        this.add.text(cx + (cellW - 8) / 2, cy + 20, '✦', {
          fontFamily: FONTS.BODY,
          fontSize: '24px',
          color: CSS_COLORS.NEON_CYAN,
        }).setOrigin(0.5);
      } else {
        this.add.text(cx + (cellW - 8) / 2, cy + 20, '?', {
          fontFamily: FONTS.TITLE,
          fontSize: '20px',
          color: CSS_COLORS.NEON_PINK,
        }).setOrigin(0.5).setAlpha(0.3);
      }

      // Name
      const name = isCollected ? item.name : '???';
      this.add.text(cx + (cellW - 8) / 2, cy + 48, name, {
        fontFamily: FONTS.BODY,
        fontSize: '12px',
        color: isCollected ? CSS_COLORS.WHITE : CSS_COLORS.NEON_PINK,
        wordWrap: { width: cellW - 16 },
        align: 'center',
      }).setOrigin(0.5).setAlpha(isCollected ? 0.9 : 0.3);

      // Click for details
      if (isCollected) {
        const zone = this.add.rectangle(cx + (cellW - 8) / 2, cy + (cellH - 8) / 2, cellW - 8, cellH - 8, 0x000000, 0)
          .setInteractive({ useHandCursor: true });
        zone.on('pointerdown', () => {
          this.showDetail(item);
        });
        zone.on('pointerover', () => {
          cellBg.clear();
          cellBg.fillStyle(COLORS.NEON_PINK, 0.2);
          cellBg.fillRect(cx, cy, cellW - 8, cellH - 8);
          cellBg.lineStyle(1, COLORS.NEON_PINK, 0.8);
          cellBg.strokeRect(cx, cy, cellW - 8, cellH - 8);
        });
        zone.on('pointerout', () => {
          cellBg.clear();
          cellBg.fillStyle(COLORS.DARK_PURPLE, 0.8);
          cellBg.fillRect(cx, cy, cellW - 8, cellH - 8);
          cellBg.lineStyle(1, COLORS.NEON_CYAN, 0.6);
          cellBg.strokeRect(cx, cy, cellW - 8, cellH - 8);
        });
      }
    });

    // Detail area
    this.detailBg = this.add.graphics();
    this.detailText = this.add.text(GAME_WIDTH / 2, panelY + panelH - 100, '', {
      fontFamily: FONTS.BODY,
      fontSize: '18px',
      color: CSS_COLORS.WHITE,
      wordWrap: { width: panelW - 100 },
      align: 'center',
    }).setOrigin(0.5);

    // Close button
    const closeBtn = this.add.text(panelX + panelW - 30, panelY + 10, '✕', {
      fontFamily: FONTS.BODY,
      fontSize: '24px',
      color: CSS_COLORS.NEON_PINK,
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    closeBtn.on('pointerdown', () => this.closeJournal());
    closeBtn.on('pointerover', () => closeBtn.setColor(CSS_COLORS.NEON_CYAN));
    closeBtn.on('pointerout', () => closeBtn.setColor(CSS_COLORS.NEON_PINK));

    // ESC to close
    this.input.keyboard!.on('keydown-ESC', () => this.closeJournal());
  }

  private showDetail(item: EvidenceItem): void {
    this.selectedItem = item;
    const panelY = 40;
    const panelH = GAME_HEIGHT - 80;

    this.detailBg.clear();
    this.detailBg.fillStyle(COLORS.DARK_PURPLE, 0.9);
    this.detailBg.fillRect(100, panelY + panelH - 140, GAME_WIDTH - 200, 100);
    this.detailBg.lineStyle(1, COLORS.NEON_CYAN, 0.5);
    this.detailBg.strokeRect(100, panelY + panelH - 140, GAME_WIDTH - 200, 100);

    this.detailText.setText(`${item.name}\n${item.detailText}`);
  }

  private closeJournal(): void {
    this.scene.resume('GameScene');
    this.scene.stop();
  }
}
