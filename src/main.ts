import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, COLORS } from './config';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { PrologueScene } from './scenes/PrologueScene';
import { GameScene } from './scenes/GameScene';
import { DialogueScene } from './scenes/DialogueScene';
import { JournalScene } from './scenes/JournalScene';
import { FinaleScene } from './scenes/FinaleScene';
import { SlideshowScene } from './scenes/SlideshowScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: 'game-container',
  backgroundColor: `#${COLORS.DEEP_PURPLE.toString(16).padStart(6, '0')}`,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [BootScene, MenuScene, PrologueScene, GameScene, DialogueScene, JournalScene, FinaleScene, SlideshowScene],
};

new Phaser.Game(config);
