import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, CSS_COLORS, FONTS } from '../config';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    this.generateTextures();

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

    this.load.json('_dummy', 'data:application/json;base64,e30=');
  }

  private generateTextures(): void {
    // Player sprite (32x48)
    const playerGfx = this.make.graphics({ x: 0, y: 0 });
    playerGfx.fillStyle(0x3D2060, 1);
    playerGfx.fillRect(8, 16, 16, 24);
    playerGfx.fillStyle(0x4D3570, 1);
    playerGfx.fillRect(9, 17, 14, 6);
    playerGfx.fillStyle(0xE8C4A0, 1);
    playerGfx.fillRect(10, 4, 12, 12);
    playerGfx.fillStyle(0x1A5C5C, 1);
    playerGfx.fillRect(9, 2, 14, 5);
    playerGfx.fillRect(8, 5, 4, 8);
    playerGfx.fillRect(20, 5, 4, 8);
    playerGfx.fillStyle(COLORS.NEON_CYAN, 1);
    playerGfx.fillRect(12, 8, 3, 3);
    playerGfx.fillRect(18, 8, 3, 3);
    playerGfx.fillStyle(0x2A5555, 1);
    playerGfx.fillRect(13, 9, 1, 1);
    playerGfx.fillRect(19, 9, 1, 1);
    playerGfx.fillStyle(0x2C2C4A, 1);
    playerGfx.fillRect(10, 40, 5, 8);
    playerGfx.fillRect(17, 40, 5, 8);
    playerGfx.generateTexture('player', 32, 48);
    playerGfx.destroy();

    // NPC sprites with distinct looks
    const npcDefs: [string, number, number, number][] = [
      ['npc_sveta', 0x2A8A8A, 0x1A5C5C, 0xE8C4A0],
      ['npc_glam', 0xCC4488, 0xE8A0C0, 0xF0D0B8],
      ['npc_viewer', 0x3A5A3A, 0x2A4A2A, 0xD4B090],
    ];

    for (const [key, bodyColor, hairColor, skinColor] of npcDefs) {
      const g = this.make.graphics({ x: 0, y: 0 });
      // Body
      g.fillStyle(bodyColor, 1);
      g.fillRect(8, 16, 16, 24);
      // Detail stripe
      g.fillStyle(hairColor, 0.6);
      g.fillRect(9, 17, 14, 3);
      // Head
      g.fillStyle(skinColor, 1);
      g.fillRect(10, 4, 12, 12);
      // Hair
      g.fillStyle(hairColor, 1);
      g.fillRect(9, 2, 14, 5);
      // Eyes
      g.fillStyle(0xFFFFFF, 1);
      g.fillRect(12, 7, 4, 4);
      g.fillRect(17, 7, 4, 4);
      g.fillStyle(0x222222, 1);
      g.fillRect(13, 8, 2, 2);
      g.fillRect(18, 8, 2, 2);
      // Highlight
      g.fillStyle(0xFFFFFF, 0.7);
      g.fillRect(14, 8, 1, 1);
      g.fillRect(19, 8, 1, 1);
      // Legs
      g.fillStyle(0x2C2C4A, 1);
      g.fillRect(10, 40, 5, 8);
      g.fillRect(17, 40, 5, 8);
      g.generateTexture(key, 32, 48);
      g.destroy();
    }

    // Floor tiles — more realistic
    this.generateWoodTile();
    this.generateStoneTile();
    this.generateCarpetTile();
    this.generateGrassTile();
    this.generateDarkTile();
    this.generateMirrorTile();
    this.generateMarbleTile();

    // Wall
    const wallG = this.make.graphics({ x: 0, y: 0 });
    wallG.fillStyle(0x3D3D5C, 1);
    wallG.fillRect(0, 0, 64, 48);
    wallG.fillStyle(0x2C2C4A, 1);
    wallG.fillRect(2, 2, 60, 44);
    wallG.lineStyle(1, 0x4D4D6C, 0.3);
    wallG.lineBetween(2, 24, 62, 24);
    wallG.generateTexture('wall', 64, 48);
    wallG.destroy();

    // Highlight
    const hlG = this.make.graphics({ x: 0, y: 0 });
    hlG.lineStyle(2, COLORS.NEON_CYAN, 0.8);
    hlG.strokeRect(0, 0, 40, 40);
    hlG.generateTexture('highlight', 40, 40);
    hlG.destroy();

    // Furniture
    this.generateDetailedFurniture('furniture_table', 0x8B4513, 48, 32, 'table');
    this.generateDetailedFurniture('furniture_chair', 0x654321, 24, 24, 'chair');
    this.generateDetailedFurniture('furniture_bookshelf', 0x5C3317, 48, 64, 'bookshelf');
    this.generateDetailedFurniture('furniture_bed', 0xC8A2C8, 48, 64, 'bed');
    this.generateDetailedFurniture('furniture_mirror', 0x87CEEB, 32, 48, 'mirror');
    this.generateDetailedFurniture('furniture_candle', 0xFFD700, 12, 24, 'candle');
    this.generateDetailedFurniture('furniture_tv', 0x333333, 40, 32, 'tv');
    this.generateDetailedFurniture('furniture_box', 0x8B7355, 28, 28, 'box');
    this.generateDetailedFurniture('furniture_plant', 0x228B22, 20, 36, 'plant');
    this.generateDetailedFurniture('furniture_cake', 0xFFC0CB, 28, 24, 'cake');
    this.generateDetailedFurniture('furniture_door', 0x654321, 32, 56, 'door');

    // Portrait
    const portG = this.make.graphics({ x: 0, y: 0 });
    portG.fillStyle(COLORS.DARK_PURPLE, 1);
    portG.fillRect(0, 0, 120, 120);
    portG.lineStyle(3, COLORS.NEON_PINK, 1);
    portG.strokeRect(0, 0, 120, 120);
    portG.fillStyle(COLORS.NEON_PINK, 0.15);
    portG.fillCircle(60, 50, 30);
    portG.generateTexture('portrait_default', 120, 120);
    portG.destroy();

    // Evidence icon
    const evG = this.make.graphics({ x: 0, y: 0 });
    evG.fillStyle(COLORS.NEON_CYAN, 1);
    evG.fillCircle(12, 12, 12);
    evG.fillStyle(COLORS.DEEP_PURPLE, 1);
    evG.fillRect(10, 5, 4, 6);
    evG.fillRect(10, 14, 4, 4);
    evG.generateTexture('evidence_icon', 24, 24);
    evG.destroy();

    // Arrow
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

  private generateWoodTile(): void {
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(0x8B6914, 1);
    g.beginPath(); g.moveTo(32, 0); g.lineTo(64, 16); g.lineTo(32, 32); g.lineTo(0, 16); g.closePath(); g.fillPath();
    // Wood grain lines
    g.lineStyle(1, 0x7A5A0A, 0.3);
    g.lineBetween(10, 10, 54, 10); g.lineBetween(8, 16, 56, 16); g.lineBetween(12, 22, 52, 22);
    // Knot
    g.fillStyle(0x7A5A0A, 0.4);
    g.fillCircle(28, 14, 3);
    // Edge shadow
    g.fillStyle(0x000000, 0.15);
    g.beginPath(); g.moveTo(32, 32); g.lineTo(64, 16); g.lineTo(32, 20); g.closePath(); g.fillPath();
    g.generateTexture('tile_wood', 64, 32);
    g.destroy();
  }

  private generateStoneTile(): void {
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(0x696969, 1);
    g.beginPath(); g.moveTo(32, 0); g.lineTo(64, 16); g.lineTo(32, 32); g.lineTo(0, 16); g.closePath(); g.fillPath();
    // Mortar lines
    g.lineStyle(1, 0x555555, 0.5);
    g.lineBetween(16, 8, 48, 8); g.lineBetween(32, 8, 32, 24);
    g.lineBetween(8, 16, 56, 16);
    // Roughness spots
    g.fillStyle(0x7A7A7A, 0.3);
    g.fillRect(20, 10, 4, 3); g.fillRect(40, 18, 5, 3);
    // Edge
    g.fillStyle(0x000000, 0.2);
    g.beginPath(); g.moveTo(32, 32); g.lineTo(64, 16); g.lineTo(32, 20); g.closePath(); g.fillPath();
    g.generateTexture('tile_stone', 64, 32);
    g.destroy();
  }

  private generateCarpetTile(): void {
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(0x4A0040, 1);
    g.beginPath(); g.moveTo(32, 0); g.lineTo(64, 16); g.lineTo(32, 32); g.lineTo(0, 16); g.closePath(); g.fillPath();
    // Weave pattern
    for (let i = 0; i < 8; i++) {
      g.fillStyle(i % 2 === 0 ? 0x5A0050 : 0x3A0030, 0.3);
      g.fillRect(8 + i * 6, 6, 3, 20);
    }
    // Border decoration
    g.lineStyle(1, 0xFF69B4, 0.15);
    g.lineBetween(16, 8, 48, 8); g.lineBetween(12, 24, 52, 24);
    g.fillStyle(0x000000, 0.1);
    g.beginPath(); g.moveTo(32, 32); g.lineTo(64, 16); g.lineTo(32, 20); g.closePath(); g.fillPath();
    g.generateTexture('tile_carpet', 64, 32);
    g.destroy();
  }

  private generateGrassTile(): void {
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(0x2E5E1A, 1);
    g.beginPath(); g.moveTo(32, 0); g.lineTo(64, 16); g.lineTo(32, 32); g.lineTo(0, 16); g.closePath(); g.fillPath();
    // Grass tufts
    g.fillStyle(0x3A7A2A, 0.5);
    g.fillRect(14, 8, 3, 5); g.fillRect(26, 12, 2, 4); g.fillRect(42, 10, 3, 5);
    g.fillRect(18, 20, 2, 3); g.fillRect(38, 18, 3, 4);
    // Dirt spots
    g.fillStyle(0x4A3A1A, 0.2);
    g.fillCircle(30, 16, 4);
    g.fillStyle(0x000000, 0.1);
    g.beginPath(); g.moveTo(32, 32); g.lineTo(64, 16); g.lineTo(32, 20); g.closePath(); g.fillPath();
    g.generateTexture('tile_grass', 64, 32);
    g.destroy();
  }

  private generateDarkTile(): void {
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(0x1A1A2E, 1);
    g.beginPath(); g.moveTo(32, 0); g.lineTo(64, 16); g.lineTo(32, 32); g.lineTo(0, 16); g.closePath(); g.fillPath();
    // Subtle crack pattern
    g.lineStyle(1, 0x252540, 0.4);
    g.lineBetween(20, 8, 44, 24); g.lineBetween(32, 4, 28, 18);
    g.fillStyle(0x000000, 0.2);
    g.beginPath(); g.moveTo(32, 32); g.lineTo(64, 16); g.lineTo(32, 20); g.closePath(); g.fillPath();
    g.generateTexture('tile_dark', 64, 32);
    g.destroy();
  }

  private generateMirrorTile(): void {
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(0x6A8CAF, 1);
    g.beginPath(); g.moveTo(32, 0); g.lineTo(64, 16); g.lineTo(32, 32); g.lineTo(0, 16); g.closePath(); g.fillPath();
    // Reflection streaks
    g.fillStyle(0x8AACDF, 0.4);
    g.fillRect(16, 8, 12, 2); g.fillRect(28, 14, 16, 2); g.fillRect(20, 20, 10, 2);
    // Shine spot
    g.fillStyle(0xFFFFFF, 0.2);
    g.fillCircle(24, 12, 5);
    g.fillStyle(0x000000, 0.15);
    g.beginPath(); g.moveTo(32, 32); g.lineTo(64, 16); g.lineTo(32, 20); g.closePath(); g.fillPath();
    g.generateTexture('tile_mirror', 64, 32);
    g.destroy();
  }

  private generateMarbleTile(): void {
    const g = this.make.graphics({ x: 0, y: 0 });
    g.fillStyle(0xC0B0A0, 1);
    g.beginPath(); g.moveTo(32, 0); g.lineTo(64, 16); g.lineTo(32, 32); g.lineTo(0, 16); g.closePath(); g.fillPath();
    // Marble veining
    g.lineStyle(1, 0xB0A090, 0.5);
    g.lineBetween(12, 6, 36, 18); g.lineBetween(36, 18, 52, 14);
    g.lineStyle(1, 0xA09080, 0.3);
    g.lineBetween(20, 22, 44, 10);
    // Polished highlight
    g.fillStyle(0xFFFFFF, 0.1);
    g.fillCircle(30, 14, 6);
    g.fillStyle(0x000000, 0.12);
    g.beginPath(); g.moveTo(32, 32); g.lineTo(64, 16); g.lineTo(32, 20); g.closePath(); g.fillPath();
    g.generateTexture('tile_marble', 64, 32);
    g.destroy();
  }

  private generateDetailedFurniture(key: string, color: number, w: number, h: number, type: string): void {
    const g = this.make.graphics({ x: 0, y: 0 });

    switch (type) {
      case 'table':
        g.fillStyle(color, 1);
        g.fillRect(2, h / 3, w - 4, h / 3);
        g.fillStyle(0x000000, 0.15);
        g.fillRect(2, h / 3, w - 4, 3);
        g.fillStyle(color, 0.8);
        g.fillRect(4, h * 2 / 3, 4, h / 3 - 2);
        g.fillRect(w - 8, h * 2 / 3, 4, h / 3 - 2);
        break;
      case 'tv':
        g.fillStyle(0x222222, 1);
        g.fillRect(2, 2, w - 4, h - 8);
        g.fillStyle(0x0A0A14, 1);
        g.fillRect(5, 5, w - 10, h - 14);
        // Screen glow
        g.fillStyle(0x00FFFF, 0.08);
        g.fillRect(5, 5, w - 10, h - 14);
        // Stand
        g.fillStyle(0x333333, 1);
        g.fillRect(w / 2 - 4, h - 6, 8, 6);
        break;
      case 'mirror':
        g.fillStyle(0x5A4A6A, 1);
        g.fillRect(2, 2, w - 4, h - 4);
        g.fillStyle(0x87CEEB, 0.4);
        g.fillRect(5, 5, w - 10, h - 10);
        g.fillStyle(0xFFFFFF, 0.15);
        g.fillRect(8, 8, (w - 16) / 2, h - 16);
        break;
      case 'candle':
        g.fillStyle(0xDDCCAA, 1);
        g.fillRect(2, h / 3, w - 4, h * 2 / 3 - 2);
        g.fillStyle(0xFFAA33, 1);
        g.fillCircle(w / 2, h / 3 - 2, 4);
        g.fillStyle(0xFFCC55, 0.6);
        g.fillCircle(w / 2, h / 3 - 4, 2);
        break;
      case 'bookshelf':
        g.fillStyle(color, 1);
        g.fillRect(2, 2, w - 4, h - 4);
        // Shelves
        for (let i = 0; i < 4; i++) {
          const sy = 8 + i * (h - 16) / 4;
          g.fillStyle(0x000000, 0.15);
          g.fillRect(4, sy, w - 8, 2);
          // Books
          const bookColors = [0xCC4466, 0x4466CC, 0xCCCC44, 0x44CC66];
          for (let j = 0; j < 4; j++) {
            g.fillStyle(bookColors[(i + j) % 4], 0.6);
            g.fillRect(6 + j * 9, sy + 3, 7, (h - 16) / 4 - 5);
          }
        }
        break;
      case 'plant':
        g.fillStyle(0x3D2050, 1);
        g.fillRect(2, h * 2 / 3, w - 4, h / 3 - 2);
        g.fillStyle(color, 1);
        g.fillCircle(w / 2, h / 2, w / 2 - 2);
        g.fillStyle(0x3A8A3A, 0.5);
        g.fillCircle(w / 2 - 3, h / 2 - 3, w / 4);
        break;
      case 'bed':
        g.fillStyle(0x351D58, 1);
        g.fillRect(2, h / 4, w - 4, h * 3 / 4 - 2);
        g.fillStyle(0x3D2060, 1);
        g.fillRect(4, 2, w - 8, h / 4);
        g.fillStyle(0x452570, 0.5);
        g.fillRect(6, h / 3, w / 3, h / 4);
        break;
      case 'box':
        g.fillStyle(color, 1);
        g.fillRect(2, 2, w - 4, h - 4);
        g.lineStyle(1, 0x000000, 0.2);
        g.strokeRect(2, 2, w - 4, h - 4);
        g.fillStyle(0x6D5B8E, 0.5);
        g.fillRect(w / 2 - 4, h / 2 - 1, 8, 3);
        break;
      default:
        g.fillStyle(color, 1);
        g.fillRect(2, 2, w - 4, h - 4);
        g.fillStyle(0x000000, 0.15);
        g.fillRect(w / 2, h / 2, w / 2 - 2, h / 2 - 2);
        g.lineStyle(1, 0x000000, 0.2);
        g.strokeRect(2, 2, w - 4, h - 4);
    }

    g.generateTexture(key, w, h);
    g.destroy();
  }

  create(): void {
    this.scene.start('MenuScene');
  }
}
