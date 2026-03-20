import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, CSS_COLORS, FONTS, NpcId, NPC_NAMES, NPC_COLORS } from '../config';
import { DialogueManager, DialogueNode, DialogueChoice } from '../systems/DialogueManager';
import { StateManager } from '../systems/StateManager';
import { EvidenceManager } from '../systems/EvidenceManager';

export class DialogueScene extends Phaser.Scene {
  private npcId!: NpcId;
  private currentNode!: DialogueNode;
  private dialogueBox!: Phaser.GameObjects.Graphics;
  private speakerText!: Phaser.GameObjects.Text;
  private bodyText!: Phaser.GameObjects.Text;
  private choiceTexts: Phaser.GameObjects.Text[] = [];
  private choiceZones: Phaser.GameObjects.Rectangle[] = [];
  private portrait!: Phaser.GameObjects.Graphics;
  private continueHint!: Phaser.GameObjects.Text;
  private overlay!: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: 'DialogueScene' });
  }

  init(data: { npcId: NpcId }): void {
    this.npcId = data.npcId;
  }

  create(): void {
    // Semi-transparent overlay
    this.overlay = this.add.graphics();
    this.overlay.fillStyle(0x000000, 0.6);
    this.overlay.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Dialogue box
    const boxY = GAME_HEIGHT - 280;
    const boxH = 260;
    this.dialogueBox = this.add.graphics();
    this.dialogueBox.fillStyle(COLORS.DEEP_PURPLE, 0.95);
    this.dialogueBox.fillRect(20, boxY, GAME_WIDTH - 40, boxH);
    this.dialogueBox.lineStyle(2, COLORS.NEON_PINK, 0.8);
    this.dialogueBox.strokeRect(20, boxY, GAME_WIDTH - 40, boxH);

    // Portrait area
    this.portrait = this.add.graphics();
    const npcColor = NPC_COLORS[this.npcId] || COLORS.NEON_PINK;
    this.portrait.fillStyle(npcColor, 0.3);
    this.portrait.fillRect(40, boxY + 15, 100, 100);
    this.portrait.lineStyle(2, npcColor, 0.8);
    this.portrait.strokeRect(40, boxY + 15, 100, 100);
    // NPC initial in portrait
    const initial = NPC_NAMES[this.npcId]?.[0] || '?';
    this.add.text(90, boxY + 65, initial, {
      fontFamily: FONTS.TITLE,
      fontSize: '36px',
      color: `#${npcColor.toString(16).padStart(6, '0')}`,
    }).setOrigin(0.5);

    // Speaker name
    this.speakerText = this.add.text(160, boxY + 15, NPC_NAMES[this.npcId], {
      fontFamily: FONTS.TITLE,
      fontSize: '14px',
      color: `#${npcColor.toString(16).padStart(6, '0')}`,
    });

    // Body text
    this.bodyText = this.add.text(160, boxY + 45, '', {
      fontFamily: FONTS.BODY,
      fontSize: '22px',
      color: CSS_COLORS.WHITE,
      wordWrap: { width: GAME_WIDTH - 220 },
      lineSpacing: 4,
    });

    // Continue hint
    this.continueHint = this.add.text(GAME_WIDTH - 60, boxY + boxH - 25, '▶', {
      fontFamily: FONTS.BODY,
      fontSize: '20px',
      color: CSS_COLORS.NEON_CYAN,
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: this.continueHint,
      alpha: { from: 0.3, to: 1 },
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    // Start dialogue
    const startNode = DialogueManager.getStartNode(this.npcId);
    if (startNode) {
      this.showNode(startNode);
    } else {
      this.showFallbackDialogue();
    }

    // Close on ESC
    this.input.keyboard!.on('keydown-ESC', () => {
      this.closeDialogue();
    });
  }

  private showNode(node: DialogueNode): void {
    // Check seed variant
    if (!DialogueManager.shouldShowNode(node)) {
      if (node.next) {
        const nextNode = DialogueManager.getNode(this.npcId, node.next);
        if (nextNode) {
          this.showNode(nextNode);
          return;
        }
      }
      this.closeDialogue();
      return;
    }

    this.currentNode = node;
    DialogueManager.applyNode(node);

    // Update speaker if different
    this.speakerText.setText(node.speaker);

    // Typewriter effect for body text
    this.bodyText.setText('');
    this.clearChoices();
    this.continueHint.setAlpha(0);

    const fullText = node.text;
    let charIdx = 0;
    const typeTimer = this.time.addEvent({
      delay: 25,
      repeat: fullText.length - 1,
      callback: () => {
        charIdx++;
        this.bodyText.setText(fullText.substring(0, charIdx));
        if (charIdx >= fullText.length) {
          this.onTextComplete(node);
        }
      },
    });

    // Click to skip typewriter
    const skipHandler = () => {
      typeTimer.remove();
      this.bodyText.setText(fullText);
      this.onTextComplete(node);
      this.input.off('pointerdown', skipHandler);
    };
    this.input.once('pointerdown', skipHandler);
  }

  private onTextComplete(node: DialogueNode): void {
    // Show evidence notification if needed
    if (node.evidenceGrant) {
      const ev = EvidenceManager.getById(node.evidenceGrant);
      if (ev) {
        this.showEvidencePopup(ev.name);
      }
    }

    const choices = DialogueManager.getAvailableChoices(node);
    if (choices.length > 0) {
      this.showChoices(choices);
    } else if (node.next) {
      // Show continue prompt
      this.continueHint.setAlpha(1);
      this.input.once('pointerdown', () => {
        const nextNode = DialogueManager.getNode(this.npcId, node.next!);
        if (nextNode) {
          this.showNode(nextNode);
        } else {
          this.closeDialogue();
        }
      });
    } else if (node.isEnd) {
      this.continueHint.setText('✕');
      this.continueHint.setAlpha(1);
      this.input.once('pointerdown', () => {
        this.closeDialogue();
      });
    } else {
      // End of dialogue
      this.continueHint.setText('✕');
      this.continueHint.setAlpha(1);
      this.input.once('pointerdown', () => {
        this.closeDialogue();
      });
    }
  }

  private showChoices(choices: DialogueChoice[]): void {
    this.clearChoices();
    const boxY = GAME_HEIGHT - 280;
    const startY = boxY + 140;

    choices.forEach((choice, i) => {
      const cy = startY + i * 32;
      const choiceBg = this.add.graphics();
      choiceBg.fillStyle(COLORS.DARK_PURPLE, 0.6);
      choiceBg.fillRect(160, cy, GAME_WIDTH - 220, 28);

      const text = this.add.text(170, cy + 4, `▸ ${choice.text}`, {
        fontFamily: FONTS.BODY,
        fontSize: '18px',
        color: CSS_COLORS.NEON_CYAN,
      });

      const zone = this.add.rectangle(160 + (GAME_WIDTH - 220) / 2, cy + 14, GAME_WIDTH - 220, 28, 0x000000, 0)
        .setInteractive({ useHandCursor: true });

      zone.on('pointerover', () => {
        text.setColor(CSS_COLORS.NEON_PINK);
        choiceBg.clear();
        choiceBg.fillStyle(COLORS.NEON_PINK, 0.2);
        choiceBg.fillRect(160, cy, GAME_WIDTH - 220, 28);
      });

      zone.on('pointerout', () => {
        text.setColor(CSS_COLORS.NEON_CYAN);
        choiceBg.clear();
        choiceBg.fillStyle(COLORS.DARK_PURPLE, 0.6);
        choiceBg.fillRect(160, cy, GAME_WIDTH - 220, 28);
      });

      zone.on('pointerdown', () => {
        DialogueManager.applyChoice(choice);
        const nextNode = DialogueManager.getNode(this.npcId, choice.next);
        if (nextNode) {
          this.showNode(nextNode);
        } else {
          this.closeDialogue();
        }
      });

      this.choiceTexts.push(text);
      this.choiceZones.push(zone);
    });
  }

  private clearChoices(): void {
    this.choiceTexts.forEach(t => t.destroy());
    this.choiceTexts = [];
    this.choiceZones.forEach(z => z.destroy());
    this.choiceZones = [];
  }

  private showEvidencePopup(name: string): void {
    const popup = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 180, `✦ Улика найдена: ${name} ✦`, {
      fontFamily: FONTS.BODY,
      fontSize: '24px',
      color: CSS_COLORS.NEON_CYAN,
      backgroundColor: '#1A1A2E',
      padding: { left: 16, right: 16, top: 8, bottom: 8 },
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: popup,
      alpha: 1,
      y: GAME_HEIGHT / 2 - 200,
      duration: 500,
      hold: 2000,
      yoyo: true,
      onComplete: () => popup.destroy(),
    });
  }

  private showFallbackDialogue(): void {
    this.bodyText.setText('...');
    this.continueHint.setText('✕');
    this.continueHint.setAlpha(1);
    this.input.once('pointerdown', () => {
      this.closeDialogue();
    });
  }

  private closeDialogue(): void {
    this.scene.resume('GameScene');
    this.scene.stop();
  }
}
