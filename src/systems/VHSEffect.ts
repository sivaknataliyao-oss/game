import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../config';

export class VHSEffect {
  private scene: Phaser.Scene;
  private scanlines!: Phaser.GameObjects.Graphics;
  private noise!: Phaser.GameObjects.Graphics;
  private vignette!: Phaser.GameObjects.Graphics;
  private glitchTimer: number = 0;
  private container!: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.create();
  }

  private create(): void {
    this.container = this.scene.add.container(0, 0);
    this.container.setDepth(1000);

    // Scanlines
    this.scanlines = this.scene.add.graphics();
    this.scanlines.setAlpha(0.08);
    for (let y = 0; y < GAME_HEIGHT; y += 2) {
      this.scanlines.fillStyle(0x000000, 1);
      this.scanlines.fillRect(0, y, GAME_WIDTH, 1);
    }
    this.container.add(this.scanlines);

    // Vignette
    this.vignette = this.scene.add.graphics();
    this.vignette.setAlpha(0.3);
    const gradient = [
      { r: 0, w: GAME_WIDTH, h: GAME_HEIGHT, a: 0 },
      { r: 40, w: GAME_WIDTH - 80, h: GAME_HEIGHT - 80, a: 0.1 },
    ];
    this.vignette.fillStyle(0x000000, 0.6);
    this.vignette.fillRect(0, 0, GAME_WIDTH, 40);
    this.vignette.fillRect(0, GAME_HEIGHT - 40, GAME_WIDTH, 40);
    this.vignette.fillRect(0, 0, 40, GAME_HEIGHT);
    this.vignette.fillRect(GAME_WIDTH - 40, 0, 40, GAME_HEIGHT);
    this.container.add(this.vignette);

    // Noise overlay
    this.noise = this.scene.add.graphics();
    this.noise.setAlpha(0.03);
    this.container.add(this.noise);
  }

  update(time: number): void {
    // Update noise
    this.glitchTimer += 1;
    if (this.glitchTimer % 6 === 0) {
      this.noise.clear();
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * GAME_WIDTH;
        const y = Math.random() * GAME_HEIGHT;
        const w = Math.random() * 20 + 2;
        this.noise.fillStyle(0xFFFFFF, Math.random() * 0.5);
        this.noise.fillRect(x, y, w, 1);
      }
    }

    // Occasional horizontal glitch
    if (Math.random() < 0.005) {
      this.triggerGlitch();
    }
  }

  triggerGlitch(): void {
    const y = Math.random() * GAME_HEIGHT;
    const h = Math.random() * 20 + 5;
    const offset = (Math.random() - 0.5) * 20;

    const glitch = this.scene.add.graphics();
    glitch.setDepth(999);
    glitch.fillStyle(0xFF69B4, 0.15);
    glitch.fillRect(offset, y, GAME_WIDTH, h);

    this.scene.tweens.add({
      targets: glitch,
      alpha: 0,
      duration: 150,
      onComplete: () => glitch.destroy(),
    });
  }

  triggerHeavyGlitch(): void {
    for (let i = 0; i < 5; i++) {
      this.scene.time.delayedCall(i * 50, () => this.triggerGlitch());
    }

    // Chromatic aberration simulation
    const redOverlay = this.scene.add.graphics();
    redOverlay.setDepth(998);
    redOverlay.fillStyle(0xFF0000, 0.05);
    redOverlay.fillRect(-3, 0, GAME_WIDTH, GAME_HEIGHT);

    const cyanOverlay = this.scene.add.graphics();
    cyanOverlay.setDepth(998);
    cyanOverlay.fillStyle(0x00FFFF, 0.05);
    cyanOverlay.fillRect(3, 0, GAME_WIDTH, GAME_HEIGHT);

    this.scene.tweens.add({
      targets: [redOverlay, cyanOverlay],
      alpha: 0,
      duration: 300,
      onComplete: () => {
        redOverlay.destroy();
        cyanOverlay.destroy();
      },
    });
  }

  setIntensity(alpha: number): void {
    this.scanlines.setAlpha(alpha * 0.08);
    this.noise.setAlpha(alpha * 0.03);
    this.vignette.setAlpha(alpha * 0.3);
  }

  destroy(): void {
    this.container.destroy(true);
  }
}
