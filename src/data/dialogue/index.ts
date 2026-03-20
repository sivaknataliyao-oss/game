import { DialogueManager } from '../../systems/DialogueManager';
import { svetaDialogue } from './sveta';
import { dimaDialogue } from './dima';
import { maksDialogue } from './maks';
import { arinaDialogue } from './arina';
import { lenaDialogue } from './lena';

export function registerAllDialogues(): void {
  DialogueManager.registerTree(svetaDialogue);
  DialogueManager.registerTree(dimaDialogue);
  DialogueManager.registerTree(maksDialogue);
  DialogueManager.registerTree(arinaDialogue);
  DialogueManager.registerTree(lenaDialogue);
}
