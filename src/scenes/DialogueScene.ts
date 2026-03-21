import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS, CSS_COLORS, FONTS, NpcId, NPC_NAMES, NPC_COLORS } from '../config';
import { DialogueManager, DialogueNode, DialogueChoice } from '../systems/DialogueManager';
import { StateManager } from '../systems/StateManager';
import { EvidenceManager } from '../systems/EvidenceManager';

interface DialogueSceneData {
  npcId?: NpcId;
  objectLines?: string[];
  objectLabel?: string;
  isVhs?: boolean;
}

export class DialogueScene extends Phaser.Scene {
  private npcId?: NpcId;
  private currentNode!: DialogueNode;
  private dialogueBox!: Phaser.GameObjects.Graphics;
  private speakerText!: Phaser.GameObjects.Text;
  private bodyText!: Phaser.GameObjects.Text;
  private choiceTexts: Phaser.GameObjects.Text[] = [];
  private choiceZones: Phaser.GameObjects.Rectangle[] = [];
  private choiceBgs: Phaser.GameObjects.Graphics[] = [];
  private portrait!: Phaser.GameObjects.Graphics;
  private continueHint!: Phaser.GameObjects.Text;
  private overlay!: Phaser.GameObjects.Graphics;

  // Object dialogue mode
  private objectLines?: string[];
  private objectLabel?: string;
  private isVhs = false;
  private objectLineIndex = 0;

  // Multi-line NPC dialogue
  private currentLines?: string[];
  private currentLineIndex = 0;

  constructor() {
    super({ key: 'DialogueScene' });
  }

  init(data: DialogueSceneData): void {
    this.npcId = data.npcId;
    this.objectLines = data.objectLines;
    this.objectLabel = data.objectLabel;
    this.isVhs = data.isVhs || false;
    this.objectLineIndex = 0;
    this.currentLines = undefined;
    this.currentLineIndex = 0;
  }

  create(): void {
    // Semi-transparent overlay
    this.overlay = this.add.graphics();
    this.overlay.fillStyle(0x000000, 0.6);
    this.overlay.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Determine color scheme
    const accentColor = this.isVhs
      ? COLORS.NEON_CYAN
      : (this.npcId ? (NPC_COLORS[this.npcId] || COLORS.NEON_PINK) : COLORS.NEON_PINK);
    const accentHex = `#${accentColor.toString(16).padStart(6, '0')}`;

    // Dialogue box
    const boxY = GAME_HEIGHT - 280;
    const boxH = 260;
    this.dialogueBox = this.add.graphics();
    this.dialogueBox.fillStyle(this.isVhs ? 0x0A1A2A : COLORS.DEEP_PURPLE, 0.95);
    this.dialogueBox.fillRect(20, boxY, GAME_WIDTH - 40, boxH);
    this.dialogueBox.lineStyle(2, accentColor, 0.8);
    this.dialogueBox.strokeRect(20, boxY, GAME_WIDTH - 40, boxH);

    if (this.npcId) {
      // Portrait area for NPC mode
      this.portrait = this.add.graphics();
      this.portrait.fillStyle(accentColor, 0.3);
      this.portrait.fillRect(40, boxY + 15, 100, 100);
      this.portrait.lineStyle(2, accentColor, 0.8);
      this.portrait.strokeRect(40, boxY + 15, 100, 100);
      const initial = NPC_NAMES[this.npcId]?.[0] || '?';
      this.add.text(90, boxY + 65, initial, {
        fontFamily: FONTS.TITLE,
        fontSize: '36px',
        color: accentHex,
      }).setOrigin(0.5);
    }

    // Speaker name
    const speakerName = this.npcId
      ? NPC_NAMES[this.npcId]
      : (this.objectLabel || '');
    const speakerX = this.npcId ? 160 : 40;
    this.speakerText = this.add.text(speakerX, boxY + 15, speakerName, {
      fontFamily: FONTS.TITLE,
      fontSize: '14px',
      color: accentHex,
    });

    // Body text
    const bodyX = this.npcId ? 160 : 40;
    const bodyWidth = this.npcId ? GAME_WIDTH - 220 : GAME_WIDTH - 100;
    this.bodyText = this.add.text(bodyX, boxY + 45, '', {
      fontFamily: FONTS.BODY,
      fontSize: '22px',
      color: this.isVhs ? CSS_COLORS.NEON_CYAN : CSS_COLORS.WHITE,
      wordWrap: { width: bodyWidth },
      lineSpacing: 4,
    });

    // Continue hint
    this.continueHint = this.add.text(GAME_WIDTH - 60, boxY + boxH - 25, '▶', {
      fontFamily: FONTS.BODY,
      fontSize: '20px',
      color: this.isVhs ? CSS_COLORS.NEON_CYAN : CSS_COLORS.NEON_CYAN,
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: this.continueHint,
      alpha: { from: 0.3, to: 1 },
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    // VHS scanlines for tape objects
    if (this.isVhs) {
      const scanlines = this.add.graphics().setDepth(100);
      scanlines.setAlpha(0.08);
      for (let y = 0; y < GAME_HEIGHT; y += 3) {
        scanlines.fillStyle(0x00FFFF, 1);
        scanlines.fillRect(0, y, GAME_WIDTH, 1);
      }
    }

    // Route to object or NPC dialogue
    if (this.objectLines && this.objectLines.length > 0) {
      this.startObjectDialogue();
    } else if (this.npcId) {
      const startNode = DialogueManager.getStartNode(this.npcId);
      if (startNode) {
        this.showNode(startNode);
      } else {
        this.showFallbackDialogue();
      }
    } else {
      this.showFallbackDialogue();
    }

    // Close on ESC
    this.input.keyboard!.on('keydown-ESC', () => {
      this.closeDialogue();
    });
  }

  // === OBJECT DIALOGUE MODE ===
  private startObjectDialogue(): void {
    this.objectLineIndex = 0;
    this.showObjectLine();
  }

  private showObjectLine(): void {
    if (!this.objectLines || this.objectLineIndex >= this.objectLines.length) {
      this.continueHint.setText('✕');
      this.continueHint.setAlpha(1);
      this.input.once('pointerdown', () => this.closeDialogue());
      return;
    }

    const line = this.objectLines[this.objectLineIndex];
    this.typewriteText(line, () => {
      this.objectLineIndex++;
      if (this.objectLineIndex < this.objectLines!.length) {
        this.continueHint.setAlpha(1);
        this.input.once('pointerdown', () => {
          this.continueHint.setAlpha(0);
          this.showObjectLine();
        });
      } else {
        this.continueHint.setText('✕');
        this.continueHint.setAlpha(1);
        this.input.once('pointerdown', () => this.closeDialogue());
      }
    });
  }

  // === NPC DIALOGUE MODE ===
  private showNode(node: DialogueNode): void {
    if (!DialogueManager.shouldShowNode(node)) {
      if (node.next) {
        const nextNode = DialogueManager.getNode(this.npcId!, node.next);
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

    this.speakerText.setText(node.speaker);
    this.clearChoices();
    this.continueHint.setAlpha(0);

    // Check for multi-line dialogue
    if (node.lines && node.lines.length > 0) {
      this.currentLines = node.lines;
      this.currentLineIndex = 0;
      this.showCurrentLine(node);
    } else {
      this.currentLines = undefined;
      this.typewriteText(node.text, () => this.onTextComplete(node));
    }
  }

  private showCurrentLine(node: DialogueNode): void {
    if (!this.currentLines || this.currentLineIndex >= this.currentLines.length) {
      this.onTextComplete(node);
      return;
    }

    const line = this.currentLines[this.currentLineIndex];
    this.typewriteText(line, () => {
      this.currentLineIndex++;
      if (this.currentLineIndex < this.currentLines!.length) {
        this.continueHint.setAlpha(1);
        this.input.once('pointerdown', () => {
          this.continueHint.setAlpha(0);
          this.showCurrentLine(node);
        });
      } else {
        this.onTextComplete(node);
      }
    });
  }

  private typewriteText(fullText: string, onComplete: () => void): void {
    this.bodyText.setText('');
    let charIdx = 0;
    const typeTimer = this.time.addEvent({
      delay: 25,
      repeat: fullText.length - 1,
      callback: () => {
        charIdx++;
        this.bodyText.setText(fullText.substring(0, charIdx));
        if (charIdx >= fullText.length) {
          onComplete();
        }
      },
    });

    const skipHandler = () => {
      typeTimer.remove();
      this.bodyText.setText(fullText);
      onComplete();
      this.input.off('pointerdown', skipHandler);
    };
    this.input.once('pointerdown', skipHandler);
  }

  private onTextComplete(node: DialogueNode): void {
    if (node.evidenceGrant) {
      const ev = EvidenceManager.getById(node.evidenceGrant);
      if (ev) {
        this.showEvidencePopup(ev.name);
      }
    }

    const choices = DialogueManager.getAvailableChoices(node);
    if (choices.length > 0) {
      this.showChoices(choices, node);
    } else if (node.returnTo && this.npcId) {
      // returnTo: go back to parent node with choices
      this.continueHint.setAlpha(1);
      this.input.once('pointerdown', () => {
        const returnNode = DialogueManager.getNode(this.npcId!, node.returnTo!);
        if (returnNode) {
          this.showNode(returnNode);
        } else {
          this.closeDialogue();
        }
      });
    } else if (node.next) {
      this.continueHint.setAlpha(1);
      this.input.once('pointerdown', () => {
        const nextNode = DialogueManager.getNode(this.npcId!, node.next!);
        if (nextNode) {
          this.showNode(nextNode);
        } else {
          this.closeDialogue();
        }
      });
    } else if (node.isEnd) {
      this.continueHint.setText('✕');
      this.continueHint.setAlpha(1);
      this.input.once('pointerdown', () => this.closeDialogue());
    } else {
      this.continueHint.setText('✕');
      this.continueHint.setAlpha(1);
      this.input.once('pointerdown', () => this.closeDialogue());
    }
  }

  private showChoices(choices: DialogueChoice[], parentNode: DialogueNode): void {
    this.clearChoices();
    const boxY = GAME_HEIGHT - 280;
    const bodyX = this.npcId ? 160 : 40;
    const startY = boxY + 140;

    choices.forEach((choice, i) => {
      const cy = startY + i * 32;

      // Check if this choice has been used (via flagSet)
      const isUsed = choice.flagSet ? StateManager.hasSeenDialogue('choice_' + choice.flagSet) : false;

      const choiceBg = this.add.graphics();
      choiceBg.fillStyle(COLORS.DARK_PURPLE, isUsed ? 0.3 : 0.6);
      choiceBg.fillRect(bodyX, cy, GAME_WIDTH - bodyX - 60, 28);

      const prefix = isUsed ? '✓ ' : '▸ ';
      const text = this.add.text(bodyX + 10, cy + 4, `${prefix}${choice.text}`, {
        fontFamily: FONTS.BODY,
        fontSize: '18px',
        color: isUsed ? '#666666' : CSS_COLORS.NEON_CYAN,
      });

      if (isUsed) {
        text.setAlpha(0.5);
      }

      const zone = this.add.rectangle(bodyX + (GAME_WIDTH - bodyX - 60) / 2, cy + 14, GAME_WIDTH - bodyX - 60, 28, 0x000000, 0)
        .setInteractive({ useHandCursor: !isUsed });

      if (!isUsed) {
        zone.on('pointerover', () => {
          text.setColor(CSS_COLORS.NEON_PINK);
          choiceBg.clear();
          choiceBg.fillStyle(COLORS.NEON_PINK, 0.2);
          choiceBg.fillRect(bodyX, cy, GAME_WIDTH - bodyX - 60, 28);
        });

        zone.on('pointerout', () => {
          text.setColor(CSS_COLORS.NEON_CYAN);
          choiceBg.clear();
          choiceBg.fillStyle(COLORS.DARK_PURPLE, 0.6);
          choiceBg.fillRect(bodyX, cy, GAME_WIDTH - bodyX - 60, 28);
        });

        zone.on('pointerdown', () => {
          // Mark this choice as used
          if (choice.flagSet) {
            StateManager.markDialogueSeen('choice_' + choice.flagSet);
          }
          DialogueManager.applyChoice(choice);
          const nextNode = DialogueManager.getNode(this.npcId!, choice.next);
          if (nextNode) {
            this.showNode(nextNode);
          } else {
            this.closeDialogue();
          }
        });
      }

      this.choiceTexts.push(text);
      this.choiceZones.push(zone);
      this.choiceBgs.push(choiceBg);
    });
  }

  private clearChoices(): void {
    this.choiceTexts.forEach(t => t.destroy());
    this.choiceTexts = [];
    this.choiceZones.forEach(z => z.destroy());
    this.choiceZones = [];
    this.choiceBgs.forEach(b => b.destroy());
    this.choiceBgs = [];
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
