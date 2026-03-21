import { NpcId } from '../config';
import { StateManager } from './StateManager';

export interface DialogueChoice {
  text: string;
  next: string;
  flagRequired?: string;
  flagSet?: string;
  evidenceGrant?: string;
  roomUnlock?: string;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  lines?: string[];
  choices?: DialogueChoice[];
  next?: string;
  returnTo?: string;
  flagRequired?: string;
  evidenceGrant?: string;
  isEnd?: boolean;
  flagSet?: string;
  setFlags?: Record<string, boolean>;
}

export interface DialogueTree {
  npcId: NpcId;
  startNode: string;
  nodes: Record<string, DialogueNode>;
  getStartNodeId?: (state: { dialoguesSeen: Record<string, boolean>; evidenceFlags: Record<string, boolean>; clueCount: number }) => string;
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

    if (tree.getStartNodeId) {
      const state = StateManager.get();
      const clueCount = StateManager.getCollectedEvidenceCount();
      const nodeId = tree.getStartNodeId({
        dialoguesSeen: state.dialoguesSeen,
        evidenceFlags: state.evidenceFlags,
        clueCount,
      });
      return tree.nodes[nodeId];
    }

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
    if (choice.evidenceGrant) {
      StateManager.collectEvidence(choice.evidenceGrant);
    }
  }

  applyNode(node: DialogueNode): void {
    if (node.evidenceGrant) {
      StateManager.collectEvidence(node.evidenceGrant);
    }
    if (node.setFlags) {
      for (const [key, value] of Object.entries(node.setFlags)) {
        if (value) StateManager.markDialogueSeen(key);
      }
    }
    if (node.flagSet) {
      StateManager.markDialogueSeen(node.flagSet);
    }
    StateManager.markDialogueSeen(node.id);
  }

  shouldShowNode(node: DialogueNode): boolean {
    const state = StateManager.get();
    if (node.flagRequired && !state.dialoguesSeen[node.flagRequired] && !state.evidenceFlags[node.flagRequired]) return false;
    return true;
  }
}

export const DialogueManager = new DialogueManagerClass();
