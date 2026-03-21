import { DialogueManager } from '../../systems/DialogueManager';
import { svetaDialogue } from './sveta';
import { glamDialogue } from './dima';
import { viewerDialogue } from './maks';

export function registerAllDialogues(): void {
  DialogueManager.registerTree(svetaDialogue);
  DialogueManager.registerTree(glamDialogue);
  DialogueManager.registerTree(viewerDialogue);
}
