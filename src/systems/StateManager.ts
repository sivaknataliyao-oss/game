import { RoomId, NpcId } from '../config';

export interface GameState {
  evidenceFlags: Record<string, boolean>;
  roomFlags: Record<RoomId, boolean>;
  currentRoom: RoomId;
  dialoguesSeen: Record<string, boolean>;
}

const STORAGE_KEY = 'semiira_save';

function createDefaultState(): GameState {
  return {
    evidenceFlags: {},
    roomFlags: {
      [RoomId.ENTRANCE]: true,
      [RoomId.LIVING_ROOM]: true,
      [RoomId.KITCHEN]: true,
      [RoomId.LIBRARY]: false,
      [RoomId.GARDEN]: false,
      [RoomId.BEDROOM]: false,
      [RoomId.BATHROOM]: false,
      [RoomId.BASEMENT]: false,
      [RoomId.ATTIC]: false,
      [RoomId.MIRROR_ROOM]: false,
      [RoomId.SECRET_ROOM]: false,
    } as Record<RoomId, boolean>,
    currentRoom: RoomId.ENTRANCE,
    dialoguesSeen: {},
  };
}

class StateManagerClass {
  private state: GameState;

  constructor() {
    this.state = this.load() || createDefaultState();
  }

  get(): GameState {
    return this.state;
  }

  set(partial: Partial<GameState>): void {
    Object.assign(this.state, partial);
    this.save();
  }

  collectEvidence(id: string): void {
    this.state.evidenceFlags[id] = true;
    this.updateRoomUnlocks();
    this.save();
  }

  hasEvidence(id: string): boolean {
    return !!this.state.evidenceFlags[id];
  }

  unlockRoom(room: RoomId): void {
    this.state.roomFlags[room] = true;
    this.save();
  }

  isRoomUnlocked(room: RoomId): boolean {
    return !!this.state.roomFlags[room];
  }

  markDialogueSeen(id: string): void {
    this.state.dialoguesSeen[id] = true;
    this.save();
  }

  hasSeenDialogue(id: string): boolean {
    return !!this.state.dialoguesSeen[id];
  }

  getCollectedEvidenceCount(): number {
    return Object.values(this.state.evidenceFlags).filter(Boolean).length;
  }

  getAllEvidenceCollected(): boolean {
    return this.getCollectedEvidenceCount() >= 10;
  }

  private updateRoomUnlocks(): void {
    const count = this.getCollectedEvidenceCount();
    if (count >= 2) {
      this.state.roomFlags[RoomId.LIBRARY] = true;
      this.state.roomFlags[RoomId.GARDEN] = true;
    }
    if (count >= 4) {
      this.state.roomFlags[RoomId.BEDROOM] = true;
      this.state.roomFlags[RoomId.BATHROOM] = true;
    }
    if (count >= 6) {
      this.state.roomFlags[RoomId.BASEMENT] = true;
      this.state.roomFlags[RoomId.ATTIC] = true;
    }
    if (count >= 8) {
      this.state.roomFlags[RoomId.MIRROR_ROOM] = true;
    }
    if (count >= 10) {
      this.state.roomFlags[RoomId.SECRET_ROOM] = true;
    }
  }

  save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch { /* ignore */ }
  }

  private load(): GameState | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch { /* ignore */ }
    return null;
  }

  reset(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.state = createDefaultState();
  }
}

export const StateManager = new StateManagerClass();
