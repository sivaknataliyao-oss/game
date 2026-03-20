import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, CSS_COLORS, FONTS } from '../config';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Generate all placeholder textures
    this.generateTextures();

    // Loading bar
    const barW = 400;
    const barH = 20;
    const barX = (GAME_WIDTH - barW) / 2;
    const barY = GAME_HEIGHT / 2 + 60;

    const bg = this.add.graphics();
    bg.fillStyle(COLORS.DARK_PURPLE, 1);
    bg.fillRect(barX, barY, barW, barH);

    const bar = this.add.graphics();

    const loadText = this.add.text(GAME_WIDTH / 2, barY - 30, 'ЗАГРУЗКА...', {
      fontFamily: FONTS.BODY,
      fontSize: '24px',
      color: CSS_COLORS.NEON_CYAN,
    }).setOrigin(0.5);

    this.load.on('progress', (value: number) => {
      bar.clear();
      bar.fillStyle(COLORS.NEON_PINK, 1);
      bar.fillRect(barX + 2, barY + 2, (barW - 4) * value, barH - 4);
    });

    this.load.on('complete', () => {
      bar.destroy();
      bg.destroy();
      loadText.destroy();
    });

    // Load a small dummy file to trigger progress
    this.load.json('_dummy', 'data:application/json,{}');
  }

  private generateTextures(): void {
    // Player sprite (32x48 pixel character)
    const playerGfx = this.make.graphics({ x: 0, y: 0 });
    // Body
    playerGfx.fillStyle(COLORS.NEON_PINK, 1);
    playerGfx.fillRect(8, 16, 16, 24);
    // Head
    playerGfx.fillStyle(0xFFDBB5, 1);
    playerGfx.fillRect(10, 4, 12, 12);
    // Hair
    playerGfx.fillStyle(0x4A0040, 1);
    playerGfx.fillRect(9, 2, 14, 6);
    // Eyes
    playerGfx.fillStyle(COLORS.NEON_CYAN, 1);
    playerGfx.fillRect(12, 8, 3, 3);
    playerGfx.fillRect(18, 8, 3, 3);
    // Legs
    playerGfx.fillStyle(0x2C2C4A, 1);
    playerGfx.fillRect(10, 40, 5, 8);
    playerGfx.fillRect(17, 40, 5, 8);
    playerGfx.generateTexture('player', 32, 48);
    playerGfx.destroy();

    // NPC sprites with different colors
    const npcColors: [string, number][] = [
      ['npc_sveta', 0x4FC3F7],
      ['npc_dima', 0xFF8A65],
      ['npc_maks', 0x81C784],
      ['npc_arina', 0xF06292],
      ['npc_lena', 0xBA68C8],
    ];

    for (const [key, color] of npcColors) {
      const g = this.make.graphics({ x: 0, y: 0 });
      g.fillStyle(color, 1);
      g.fillRect(8, 16, 16, 24);
      g.fillStyle(0xFFDBB5, 1);
      g.fillRect(10, 4, 12, 12);
      g.fillStyle(color, 0.8);
      g.fillRect(9, 2, 14, 6);
      g.fillStyle(0x000000, 1);
      g.fillRect(13, 8, 2, 2);
      g.fillRect(19, 8, 2, 2);
      g.fillStyle(0x2C2C4A, 1);
      g.fillRect(10, 40, 5, 8);
      g.fillRect(17, 40, 5, 8);
      g.generateTexture(key, 32, 48);
      g.destroy();
    }

    // Floor tiles
    const tileColors: [string, number][] = [
      ['tile_wood', 0x8B6914],
      ['tile_stone', 0x696969],
      ['tile_carpet', 0x4A0040],
      ['tile_grass', 0x2E5E1A],
      ['tile_dark', 0x1A1A2E],
      ['tile_mirror', 0x6A8CAF],
      ['tile_marble', 0xC0B0A0],
    ];

    for (const [key, color] of tileColors) {
      const g = this.make.graphics({ x: 0, y: 0 });
      // Isometric diamond tile
      g.fillStyle(color, 1);
      g.beginPath();
      g.moveTo(32, 0);
      g.lineTo(64, 16);
      g.lineTo(32, 32);
      g.lineTo(0, 16);
      g.closePath();
      g.fillPath();
      // Edge shading
      g.fillStyle(0x000000, 0.2);
      g.beginPath();
      g.moveTo(32, 32);
      g.lineTo(64, 16);
      g.lineTo(32, 20);
      g.closePath();
      g.fillPath();
      g.generateTexture(key, 64, 32);
      g.destroy();
    }

    // Wall segment
    const wallG = this.make.graphics({ x: 0, y: 0 });
    wallG.fillStyle(0x3D3D5C, 1);
    wallG.fillRect(0, 0, 64, 48);
    wallG.fillStyle(0x2C2C4A, 1);
    wallG.fillRect(2, 2, 60, 44);
    wallG.generateTexture('wall', 64, 48);
    wallG.destroy();

    // Interactive object highlight
    const hlG = this.make.graphics({ x: 0, y: 0 });
    hlG.lineStyle(2, COLORS.NEON_CYAN, 0.8);
    hlG.strokeRect(0, 0, 40, 40);
    hlG.generateTexture('highlight', 40, 40);
    hlG.destroy();

    // Furniture pieces
    this.generateFurniture('furniture_table', 0x8B4513, 48, 32);
    this.generateFurniture('furniture_chair', 0x654321, 24, 24);
    this.generateFurniture('furniture_bookshelf', 0x5C3317, 48, 64);
    this.generateFurniture('furniture_bed', 0xC8A2C8, 48, 64);
    this.generateFurniture('furniture_mirror', 0x87CEEB, 32, 48);
    this.generateFurniture('furniture_candle', 0xFFD700, 12, 24);
    this.generateFurniture('furniture_tv', 0x333333, 40, 32);
    this.generateFurniture('furniture_box', 0x8B7355, 28, 28);
    this.generateFurniture('furniture_plant', 0x228B22, 20, 36);
    this.generateFurniture('furniture_cake', 0xFFC0CB, 28, 24);
    this.generateFurniture('furniture_door', 0x654321, 32, 56);

    // Portrait placeholder
    const portG = this.make.graphics({ x: 0, y: 0 });
    portG.fillStyle(COLORS.DARK_PURPLE, 1);
    portG.fillRect(0, 0, 120, 120);
    portG.lineStyle(3, COLORS.NEON_PINK, 1);
    portG.strokeRect(0, 0, 120, 120);
    portG.generateTexture('portrait_default', 120, 120);
    portG.destroy();

    // Evidence icon
    const evG = this.make.graphics({ x: 0, y: 0 });
    evG.fillStyle(COLORS.NEON_CYAN, 1);
    evG.fillCircle(12, 12, 12);
    evG.fillStyle(COLORS.DEEP_PURPLE, 1);
    evG.fillRect(9, 6, 2, 8);
    evG.fillRect(13, 6, 2, 8);
    evG.generateTexture('evidence_icon', 24, 24);
    evG.destroy();

    // Arrow/exit indicator
    const arrowG = this.make.graphics({ x: 0, y: 0 });
    arrowG.fillStyle(COLORS.NEON_CYAN, 0.8);
    arrowG.beginPath();
    arrowG.moveTo(16, 0);
    arrowG.lineTo(32, 16);
    arrowG.lineTo(20, 16);
    arrowG.lineTo(20, 32);
    arrowG.lineTo(12, 32);
    arrowG.lineTo(12, 16);
    arrowG.lineTo(0, 16);
    arrowG.closePath();
    arrowG.fillPath();
    arrowG.generateTexture('arrow', 32, 32);
    arrowG.destroy();
  }

  private generateFurniture(key: string, color: number, w: number, h: number): void {
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(color, 1);
    g.fillRect(2, 2, w - 4, h - 4);
    g.fillStyle(0x000000, 0.2);
    g.fillRect(w / 2, h / 2, w / 2 - 2, h / 2 - 2);
    g.lineStyle(1, 0x000000, 0.3);
    g.strokeRect(2, 2, w - 4, h - 4);
    g.generateTexture(key, w, h);
    g.destroy();
  }

  create(): void {
    this.scene.start('MenuScene');
  }
}
