import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, CSS_COLORS, FONTS, RoomId, NpcId, NPC_NAMES, ROOM_NAMES, ROOM_DESCRIPTIONS } from '../config';
import { VHSEffect } from '../systems/VHSEffect';
import { StateManager } from '../systems/StateManager';
import { RoomManager, RoomDef } from '../systems/RoomManager';
import { EvidenceManager } from '../systems/EvidenceManager';
import { DialogueManager } from '../systems/DialogueManager';
import { getObjectById } from '../data/objects';
import { registerAllRooms } from '../rooms/index';
import { registerAllDialogues } from '../data/dialogue/index';

const ISO_TILE_W = 64;
const ISO_TILE_H = 32;

export class GameScene extends Phaser.Scene {
  private vhs!: VHSEffect;
  private player!: Phaser.GameObjects.Sprite;
  private playerGridX = 0;
  private playerGridY = 0;
  private currentRoom!: RoomDef;
  private floorTiles: Phaser.GameObjects.Image[] = [];
  private furnitureSprites: Phaser.GameObjects.Sprite[] = [];
  private npcSprites: Map<NpcId, Phaser.GameObjects.Sprite> = new Map();
  private hotspotZones: Phaser.GameObjects.Rectangle[] = [];
  private exitZones: Phaser.GameObjects.Container[] = [];
  private roomLabel!: Phaser.GameObjects.Text;
  private roomDesc!: Phaser.GameObjects.Text;
  private isMoving = false;
  private uiContainer!: Phaser.GameObjects.Container;
  private notificationText!: Phaser.GameObjects.Text;
  private notificationBg!: Phaser.GameObjects.Graphics;
  private miniMapContainer!: Phaser.GameObjects.Container;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    registerAllRooms();
    registerAllDialogues();

    this.vhs = new VHSEffect(this);

    const state = StateManager.get();
    const roomDef = RoomManager.get(state.currentRoom);
    if (!roomDef) {
      this.scene.start('MenuScene');
      return;
    }

    this.currentRoom = roomDef;
    this.renderRoom(roomDef);
    this.createPlayer(roomDef);
    this.createUI();
    this.createMiniMap();
    this.setupInput();

    this.cameras.main.fadeIn(500, 0x1A, 0x1A, 0x2E);
  }

  private toIso(gx: number, gy: number): { x: number; y: number } {
    const offsetX = GAME_WIDTH / 2;
    const offsetY = 120;
    return {
      x: offsetX + (gx - gy) * (ISO_TILE_W / 2),
      y: offsetY + (gx + gy) * (ISO_TILE_H / 2),
    };
  }

  private renderRoom(room: RoomDef): void {
    this.floorTiles.forEach(t => t.destroy());
    this.floorTiles = [];
    this.furnitureSprites.forEach(s => s.destroy());
    this.furnitureSprites = [];
    this.npcSprites.forEach(s => s.destroy());
    this.npcSprites.clear();
    this.hotspotZones.forEach(z => z.destroy());
    this.hotspotZones = [];
    this.exitZones.forEach(z => z.destroy());
    this.exitZones = [];

    const bg = this.add.graphics();
    bg.fillStyle(room.ambientColor, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    bg.setDepth(-10);

    const tileKeys = ['tile_wood', 'tile_stone', 'tile_carpet', 'tile_grass', 'tile_dark', 'tile_mirror', 'tile_marble'];
    for (let gy = 0; gy < room.height; gy++) {
      for (let gx = 0; gx < room.width; gx++) {
        const colorIdx = room.tileColors[gy]?.[gx] ?? 0;
        const tileKey = tileKeys[colorIdx % tileKeys.length];
        const { x, y } = this.toIso(gx, gy);
        const tile = this.add.image(x, y, tileKey).setDepth(gx + gy);
        this.floorTiles.push(tile);
      }
    }

    for (const hs of room.hotspots) {
      const { x, y } = this.toIso(hs.x, hs.y);
      const furnitureKey = this.getFurnitureKeyForHotspot(hs.label);
      const sprite = this.add.sprite(x, y - 16, furnitureKey).setDepth(hs.x + hs.y + 1);
      this.furnitureSprites.push(sprite);

      const zone = this.add.rectangle(x, y - 16, 48, 48, 0x000000, 0)
        .setInteractive({ useHandCursor: true })
        .setDepth(hs.x + hs.y + 2);

      zone.on('pointerover', () => {
        sprite.setTint(0x00FFFF);
        this.showTooltip(hs.label, x, y - 50);
      });
      zone.on('pointerout', () => {
        sprite.clearTint();
        this.hideTooltip();
      });
      zone.on('pointerdown', () => {
        this.handleHotspot(hs);
      });
      this.hotspotZones.push(zone);
    }

    for (const npcDef of room.npcs) {
      const { x, y } = this.toIso(npcDef.x, npcDef.y);
      const npcKey = `npc_${npcDef.npcId}`;
      const sprite = this.add.sprite(x, y - 24, npcKey).setDepth(npcDef.x + npcDef.y + 3);
      this.npcSprites.set(npcDef.npcId, sprite);

      const name = NPC_NAMES[npcDef.npcId];
      this.add.text(x, y - 52, name, {
        fontFamily: FONTS.BODY,
        fontSize: '16px',
        color: CSS_COLORS.NEON_PINK,
      }).setOrigin(0.5).setDepth(npcDef.x + npcDef.y + 4);

      this.tweens.add({
        targets: sprite,
        y: y - 24 - 3,
        duration: 1500 + Math.random() * 500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });

      const npcZone = this.add.rectangle(x, y - 24, 32, 48, 0x000000, 0)
        .setInteractive({ useHandCursor: true })
        .setDepth(npcDef.x + npcDef.y + 5);

      npcZone.on('pointerdown', () => {
        this.talkToNpc(npcDef.npcId);
      });
      npcZone.on('pointerover', () => {
        sprite.setTint(0xFFFFFF);
        this.showTooltip(`Поговорить: ${name}`, x, y - 70);
      });
      npcZone.on('pointerout', () => {
        sprite.clearTint();
        this.hideTooltip();
      });
      this.hotspotZones.push(npcZone);
    }

    const availableExits = RoomManager.getAvailableExits(room.id);
    for (const exit of availableExits) {
      const { x, y } = this.toIso(exit.x, exit.y);
      const container = this.add.container(x, y - 20);
      container.setDepth(900);

      const arrow = this.add.image(0, 0, 'arrow').setScale(0.8);
      const label = this.add.text(0, 20, exit.label, {
        fontFamily: FONTS.BODY,
        fontSize: '14px',
        color: CSS_COLORS.NEON_CYAN,
      }).setOrigin(0.5);

      container.add([arrow, label]);

      const exitZone = this.add.rectangle(x, y - 20, 48, 48, 0x000000, 0)
        .setInteractive({ useHandCursor: true })
        .setDepth(901);

      this.tweens.add({
        targets: arrow,
        alpha: 0.4,
        duration: 1000,
        yoyo: true,
        repeat: -1,
      });

      exitZone.on('pointerdown', () => {
        this.transitionToRoom(exit.targetRoom);
      });

      this.exitZones.push(container);
      this.hotspotZones.push(exitZone);
    }
  }

  private getFurnitureKeyForHotspot(label: string): string {
    const lower = label.toLowerCase();
    if (lower.includes('стол') || lower.includes('стойк') || lower.includes('стул')) return 'furniture_table';
    if (lower.includes('книг') || lower.includes('шкаф') || lower.includes('полк') || lower.includes('дневник')) return 'furniture_bookshelf';
    if (lower.includes('кроват') || lower.includes('диван') || lower.includes('плюш') || lower.includes('игруш')) return 'furniture_bed';
    if (lower.includes('зеркал') || lower.includes('осколок')) return 'furniture_mirror';
    if (lower.includes('свеч') || lower.includes('ламп') || lower.includes('фонар')) return 'furniture_candle';
    if (lower.includes('телевиз') || lower.includes('экран') || lower.includes('vhs') || lower.includes('кассет') || lower.includes('монитор') || lower.includes('камер')) return 'furniture_tv';
    if (lower.includes('коробк') || lower.includes('ящик') || lower.includes('сунд') || lower.includes('чемодан') || lower.includes('корзин') || lower.includes('письм')) return 'furniture_box';
    if (lower.includes('цвет') || lower.includes('раст') || lower.includes('куст') || lower.includes('фото')) return 'furniture_plant';
    if (lower.includes('торт') || lower.includes('еда') || lower.includes('тарелк') || lower.includes('бокал') || lower.includes('бутыл') || lower.includes('кошк') || lower.includes('кот')) return 'furniture_cake';
    if (lower.includes('дверь') || lower.includes('выход') || lower.includes('вход')) return 'furniture_door';
    if (lower.includes('кресл') || lower.includes('скаме') || lower.includes('блокнот') || lower.includes('записк') || lower.includes('награ')) return 'furniture_chair';
    if (lower.includes('костюм') || lower.includes('альбом') || lower.includes('вешал') || lower.includes('полотен') || lower.includes('косметик')) return 'furniture_box';
    return 'furniture_table';
  }

  private createPlayer(room: RoomDef): void {
    this.playerGridX = room.playerStart.x;
    this.playerGridY = room.playerStart.y;
    const { x, y } = this.toIso(this.playerGridX, this.playerGridY);

    this.player = this.add.sprite(x, y - 24, 'player')
      .setDepth(500);
  }

  private createUI(): void {
    this.uiContainer = this.add.container(0, 0).setDepth(950);

    const roomBg = this.add.graphics();
    roomBg.fillStyle(COLORS.DEEP_PURPLE, 0.85);
    roomBg.fillRect(0, 0, GAME_WIDTH, 50);
    roomBg.lineStyle(1, COLORS.NEON_PINK, 0.5);
    roomBg.lineBetween(0, 50, GAME_WIDTH, 50);
    this.uiContainer.add(roomBg);

    this.roomLabel = this.add.text(20, 10, ROOM_NAMES[this.currentRoom.id], {
      fontFamily: FONTS.TITLE,
      fontSize: '14px',
      color: CSS_COLORS.NEON_PINK,
    });
    this.uiContainer.add(this.roomLabel);

    this.roomDesc = this.add.text(20, 32, ROOM_DESCRIPTIONS[this.currentRoom.id], {
      fontFamily: FONTS.BODY,
      fontSize: '16px',
      color: CSS_COLORS.WHITE,
    }).setAlpha(0.7);
    this.uiContainer.add(this.roomDesc);

    // Journal button
    const journalBtn = this.add.graphics();
    journalBtn.fillStyle(COLORS.DARK_PURPLE, 0.9);
    journalBtn.fillRect(GAME_WIDTH - 140, 5, 130, 40);
    journalBtn.lineStyle(2, COLORS.NEON_CYAN, 0.8);
    journalBtn.strokeRect(GAME_WIDTH - 140, 5, 130, 40);
    this.uiContainer.add(journalBtn);

    const journalText = this.add.text(GAME_WIDTH - 75, 25, 'ДНЕВНИК', {
      fontFamily: FONTS.TITLE,
      fontSize: '11px',
      color: CSS_COLORS.NEON_CYAN,
    }).setOrigin(0.5);
    this.uiContainer.add(journalText);

    const journalZone = this.add.rectangle(GAME_WIDTH - 75, 25, 130, 40, 0x000000, 0)
      .setInteractive({ useHandCursor: true })
      .setDepth(960);
    journalZone.on('pointerdown', () => {
      this.scene.launch('JournalScene');
      this.scene.pause();
    });

    // Evidence counter
    const count = StateManager.getCollectedEvidenceCount();
    const counterText = this.add.text(GAME_WIDTH - 75, 55, `🔍 ${count}/10`, {
      fontFamily: FONTS.BODY,
      fontSize: '14px',
      color: CSS_COLORS.NEON_CYAN,
    }).setOrigin(0.5).setAlpha(0.7);
    this.uiContainer.add(counterText);

    // Notification area
    this.notificationBg = this.add.graphics().setAlpha(0).setDepth(970);
    this.notificationText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 60, '', {
      fontFamily: FONTS.BODY,
      fontSize: '22px',
      color: CSS_COLORS.NEON_CYAN,
      align: 'center',
    }).setOrigin(0.5).setAlpha(0).setDepth(971);
  }

  private createMiniMap(): void {
    this.miniMapContainer = this.add.container(10, GAME_HEIGHT - 160).setDepth(950);
    const bg = this.add.graphics();
    bg.fillStyle(COLORS.DEEP_PURPLE, 0.85);
    bg.fillRect(0, 0, 180, 150);
    bg.lineStyle(1, COLORS.NEON_PINK, 0.5);
    bg.strokeRect(0, 0, 180, 150);
    this.miniMapContainer.add(bg);

    const title = this.add.text(90, 10, 'КАРТА', {
      fontFamily: FONTS.TITLE,
      fontSize: '9px',
      color: CSS_COLORS.NEON_PINK,
    }).setOrigin(0.5);
    this.miniMapContainer.add(title);

    const state = StateManager.get();
    const allRooms = Object.values(RoomId);
    const cols = 4;
    allRooms.forEach((roomId, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const rx = 15 + col * 42;
      const ry = 25 + row * 40;
      const unlocked = state.roomFlags[roomId];
      const isCurrent = roomId === state.currentRoom;

      const dot = this.add.graphics();
      if (isCurrent) {
        dot.fillStyle(COLORS.NEON_CYAN, 1);
        dot.fillCircle(rx, ry, 8);
      } else if (unlocked) {
        dot.fillStyle(COLORS.NEON_PINK, 0.6);
        dot.fillCircle(rx, ry, 6);
      } else {
        dot.fillStyle(COLORS.GRAY, 0.3);
        dot.fillCircle(rx, ry, 5);
      }
      this.miniMapContainer.add(dot);

      if (unlocked) {
        const roomName = ROOM_NAMES[roomId];
        const short = roomName.substring(0, 5);
        const label = this.add.text(rx, ry + 12, short, {
          fontFamily: FONTS.BODY,
          fontSize: '10px',
          color: isCurrent ? CSS_COLORS.NEON_CYAN : CSS_COLORS.WHITE,
        }).setOrigin(0.5).setAlpha(0.6);
        this.miniMapContainer.add(label);

        if (!isCurrent) {
          const zone = this.add.rectangle(rx + 10, ry + 10 + (GAME_HEIGHT - 160), 30, 30, 0x000000, 0)
            .setInteractive({ useHandCursor: true })
            .setDepth(960);
          zone.on('pointerdown', () => {
            this.transitionToRoom(roomId);
          });
        }
      }
    });
  }

  private setupInput(): void {
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.isMoving) return;
      const isoPos = this.screenToGrid(pointer.x, pointer.y);
      if (isoPos && this.isValidTile(isoPos.gx, isoPos.gy)) {
        this.movePlayerTo(isoPos.gx, isoPos.gy);
      }
    });

    const cursors = this.input.keyboard!.createCursorKeys();
    const wasd = this.input.keyboard!.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    }) as Record<string, Phaser.Input.Keyboard.Key>;

    this.time.addEvent({
      delay: 200,
      loop: true,
      callback: () => {
        if (this.isMoving) return;
        let dx = 0, dy = 0;
        if (cursors.up.isDown || wasd.up.isDown) { dx = -1; dy = -1; }
        else if (cursors.down.isDown || wasd.down.isDown) { dx = 1; dy = 1; }
        else if (cursors.left.isDown || wasd.left.isDown) { dx = -1; dy = 1; }
        else if (cursors.right.isDown || wasd.right.isDown) { dx = 1; dy = -1; }

        if (dx !== 0 || dy !== 0) {
          const nx = this.playerGridX + dx;
          const ny = this.playerGridY + dy;
          if (this.isValidTile(nx, ny)) {
            this.movePlayerTo(nx, ny);
          }
        }
      },
    });

    this.input.keyboard!.on('keydown-ESC', () => {
      this.scene.launch('JournalScene');
      this.scene.pause();
    });
  }

  private screenToGrid(sx: number, sy: number): { gx: number; gy: number } | null {
    const offsetX = GAME_WIDTH / 2;
    const offsetY = 120;
    const rx = sx - offsetX;
    const ry = sy - offsetY;
    const gx = Math.round((rx / (ISO_TILE_W / 2) + ry / (ISO_TILE_H / 2)) / 2);
    const gy = Math.round((ry / (ISO_TILE_H / 2) - rx / (ISO_TILE_W / 2)) / 2);
    return { gx, gy };
  }

  private isValidTile(gx: number, gy: number): boolean {
    return gx >= 0 && gy >= 0 && gx < this.currentRoom.width && gy < this.currentRoom.height;
  }

  private movePlayerTo(gx: number, gy: number): void {
    this.isMoving = true;
    this.playerGridX = gx;
    this.playerGridY = gy;
    const { x, y } = this.toIso(gx, gy);

    this.tweens.add({
      targets: this.player,
      x: x,
      y: y - 24,
      duration: 250,
      ease: 'Power1',
      onComplete: () => {
        this.isMoving = false;
        this.player.setDepth(gx + gy + 10);
      },
    });
  }

  private transitionToRoom(roomId: RoomId): void {
    if (!StateManager.isRoomUnlocked(roomId)) {
      const count = StateManager.getCollectedEvidenceCount();
      this.showNotification(`Закрыто. Нужно больше улик (${count}/10)`);
      return;
    }

    this.vhs.triggerHeavyGlitch();
    this.cameras.main.fadeOut(400, 0x1A, 0x1A, 0x2E);

    this.time.delayedCall(400, () => {
      StateManager.set({ currentRoom: roomId });
      this.scene.restart();
    });
  }

  private talkToNpc(npcId: NpcId): void {
    this.scene.launch('DialogueScene', { npcId });
    this.scene.pause();
  }

  private handleHotspot(hs: { label: string; evidenceId?: string; action?: string; dialogueTriggerId?: string }): void {
    // Evidence items
    if (hs.evidenceId) {
      const evItem = EvidenceManager.getById(hs.evidenceId);

      // Check if this is a locked conditional item
      if (evItem && EvidenceManager.isLocked(hs.evidenceId)) {
        const lockedText = EvidenceManager.getLockedText(hs.evidenceId);
        this.showNotification(lockedText || 'Заперто.');
        return;
      }

      const item = EvidenceManager.collect(hs.evidenceId);
      if (item) {
        this.showNotification(`🔍 ${item.name}`);
        this.vhs.triggerGlitch();
      } else if (EvidenceManager.isCollected(hs.evidenceId)) {
        const collected = EvidenceManager.getById(hs.evidenceId);
        this.showNotification(collected ? collected.detailText.substring(0, 60) + '...' : hs.label);
      }
      return;
    }

    // Interactive objects with action IDs
    if (hs.action) {
      const obj = getObjectById(hs.action);
      if (obj) {
        const seen = StateManager.hasSeenDialogue('obj_' + obj.id);
        const lines = seen ? obj.repeatLines : obj.firstLines;
        if (!seen) {
          StateManager.markDialogueSeen('obj_' + obj.id);
        }
        // Show as dialogue
        this.scene.launch('DialogueScene', {
          objectLines: lines,
          objectLabel: obj.label,
          isVhs: obj.isVhs,
        });
        this.scene.pause();
        return;
      }
    }

    // Generic hotspot — just show label
    this.showNotification(hs.label);
  }

  private showNotification(text: string): void {
    this.notificationText.setText(text);
    this.notificationBg.clear();
    this.notificationBg.fillStyle(COLORS.DEEP_PURPLE, 0.9);
    const textW = Math.min(text.length * 12 + 40, GAME_WIDTH - 40);
    this.notificationBg.fillRect((GAME_WIDTH - textW) / 2, GAME_HEIGHT - 80, textW, 40);
    this.notificationBg.lineStyle(1, COLORS.NEON_CYAN, 0.6);
    this.notificationBg.strokeRect((GAME_WIDTH - textW) / 2, GAME_HEIGHT - 80, textW, 40);

    this.notificationBg.setAlpha(1);
    this.notificationText.setAlpha(1);

    this.tweens.add({
      targets: [this.notificationBg, this.notificationText],
      alpha: 0,
      delay: 2500,
      duration: 500,
    });
  }

  private tooltipText?: Phaser.GameObjects.Text;
  private tooltipBg?: Phaser.GameObjects.Graphics;

  private showTooltip(text: string, x: number, y: number): void {
    this.hideTooltip();
    this.tooltipBg = this.add.graphics().setDepth(980);
    const w = text.length * 9 + 16;
    this.tooltipBg.fillStyle(COLORS.DEEP_PURPLE, 0.9);
    this.tooltipBg.fillRect(x - w / 2, y - 12, w, 24);
    this.tooltipText = this.add.text(x, y, text, {
      fontFamily: FONTS.BODY,
      fontSize: '14px',
      color: CSS_COLORS.NEON_CYAN,
    }).setOrigin(0.5).setDepth(981);
  }

  private hideTooltip(): void {
    this.tooltipText?.destroy();
    this.tooltipBg?.destroy();
    this.tooltipText = undefined;
    this.tooltipBg = undefined;
  }

  update(time: number): void {
    this.vhs.update(time);

    // Check finale trigger — Secret Room with all evidence
    const state = StateManager.get();
    if (state.currentRoom === RoomId.SECRET_ROOM) {
      if (!state.dialoguesSeen['finale_triggered']) {
        StateManager.markDialogueSeen('finale_triggered');
        this.time.delayedCall(3000, () => {
          this.vhs.triggerHeavyGlitch();
          this.time.delayedCall(500, () => {
            this.scene.start('FinaleScene');
          });
        });
      }
    }
  }
}
