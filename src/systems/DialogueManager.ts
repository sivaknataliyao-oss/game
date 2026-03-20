import { NpcId } from '../config';
import { StateManager } from './StateManager';

export interface DialogueChoice {
  text: string;
  next: string;
  flagRequired?: string;
  flagSet?: string;
  trustChange?: { npc: NpcId; amount: number };
  evidenceGrant?: string;
  roomUnlock?: string;
  advanceStory?: boolean;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  choices?: DialogueChoice[];
  next?: string;
  flagRequired?: string;
  seedVariant?: string; // 'A', 'B', 'C' or undefined for all
  evidenceGrant?: string;
  trustChange?: { npc: NpcId; amount: number };
  advanceStory?: boolean;
  isEnd?: boolean;
  flagSet?: string;
}

export interface DialogueTree {
  npcId: NpcId;
  startNode: string;
  nodes: Record<string, DialogueNode>;
}

class DialogueManagerClass {
  private trees: Map<NpcId, DialogueTree> = new Map();

  registerTree(tree: DialogueTree): void {
    this.trees.set(tree.npcId, tree);
  }

  getTree(npcId: NpcId): DialogueTree | undefined {
    return this.trees.get(npcId);
  }

  getNode(npcId: NpcId, nodeId: string): DialogueNode | undefined {
    const tree = this.trees.get(npcId);
    if (!tree) return undefined;
    return tree.nodes[nodeId];
  }

  getStartNode(npcId: NpcId): DialogueNode | undefined {
    const tree = this.trees.get(npcId);
    if (!tree) return undefined;
    return tree.nodes[tree.startNode];
  }

  getAvailableChoices(node: DialogueNode): DialogueChoice[] {
    if (!node.choices) return [];
    const state = StateManager.get();
    return node.choices.filter(choice => {
      if (choice.flagRequired) {
        return state.dialoguesSeen[choice.flagRequired] || state.evidenceFlags[choice.flagRequired];
      }
      return true;
    });
  }

  applyChoice(choice: DialogueChoice): void {
    if (choice.flagSet) {
      StateManager.markDialogueSeen(choice.flagSet);
    }
    if (choice.trustChange) {
      StateManager.addTrust(choice.trustChange.npc, choice.trustChange.amount);
    }
    if (choice.evidenceGrant) {
      StateManager.collectEvidence(choice.evidenceGrant);
    }
    if (choice.advanceStory) {
      StateManager.advanceStory();
    }
  }

  applyNode(node: DialogueNode): void {
    if (node.evidenceGrant) {
      StateManager.collectEvidence(node.evidenceGrant);
    }
    if (node.trustChange) {
      StateManager.addTrust(node.trustChange.npc, node.trustChange.amount);
    }
    if (node.advanceStory) {
      StateManager.advanceStory();
    }
    StateManager.markDialogueSeen(node.id);
  }

  shouldShowNode(node: DialogueNode): boolean {
    const state = StateManager.get();
    if (node.seedVariant && node.seedVariant !== state.variantSeed) return false;
    if (node.flagRequired && !state.dialoguesSeen[node.flagRequired] && !state.evidenceFlags[node.flagRequired]) return false;
    return true;
  }
}

export const DialogueManager = new DialogueManagerClass();
