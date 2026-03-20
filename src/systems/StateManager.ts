import { RoomId, NpcId, SeedVariant, SemiiraVersion } from '../config';

export interface GameState {
  storyProgress: number; // 0-11
  variantSeed: SeedVariant;
  mainLiar: NpcId;
  dominantSemiira: SemiiraVersion;
  trustFlags: Record<NpcId, number>;
  evidenceFlags: Record<string, boolean>;
  roomFlags: Record<RoomId, boolean>;
  endingAnswers: {
    liar: NpcId | null;
    semiiraVersion: SemiiraVersion | null;
    truth: string | null;
  };
  currentRoom: RoomId;
  dialoguesSeen: Record<string, boolean>;
}

const STORAGE_KEY = 'semiira_save';

function generateSeed(): SeedVariant {
  const variants: SeedVariant[] = ['A', 'B', 'C'];
  return variants[Math.floor(Math.random() * 3)];
}

function getLiarForSeed(seed: SeedVariant): NpcId {
  switch (seed) {
    case 'A': return NpcId.SVETA;
    case 'B': return NpcId.DIMA;
    case 'C': return NpcId.MAKS;
  }
}

function getSemiiraForSeed(seed: SeedVariant): SemiiraVersion {
  switch (seed) {
    case 'A': return 'festive';
    case 'B': return 'true';
    case 'C': return 'reflected';
  }
}

function createDefaultState(): GameState {
  const seed = generateSeed();
  return {
    storyProgress: 0,
    variantSeed: seed,
    mainLiar: getLiarForSeed(seed),
    dominantSemiira: getSemiiraForSeed(seed),
    trustFlags: {
      [NpcId.SVETA]: 50,
      [NpcId.DIMA]: 50,
      [NpcId.MAKS]: 50,
      [NpcId.ARINA]: 50,
      [NpcId.LENA]: 50,
    } as Record<NpcId, number>,
    evidenceFlags: {},
    roomFlags: {
      [RoomId.ENTRANCE]: true,
      [RoomId.LIVING_ROOM]: true,
      [RoomId.KITCHEN]: false,
      [RoomId.LIBRARY]: false,
      [RoomId.GARDEN]: false,
      [RoomId.BEDROOM]: false,
      [RoomId.BATHROOM]: false,
      [RoomId.BASEMENT]: false,
      [RoomId.ATTIC]: false,
      [RoomId.MIRROR_ROOM]: false,
      [RoomId.SECRET_ROOM]: false,
    } as Record<RoomId, boolean>,
    endingAnswers: { liar: null, semiiraVersion: null, truth: null },
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

  addTrust(npc: NpcId, amount: number): void {
    this.state.trustFlags[npc] = Math.max(0, Math.min(100, this.state.trustFlags[npc] + amount));
    this.save();
  }

  collectEvidence(id: string): void {
    this.state.evidenceFlags[id] = true;
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

  advanceStory(): void {
    this.state.storyProgress = Math.min(11, this.state.storyProgress + 1);
    this.unlockNextRooms();
    this.save();
  }

  private unlockNextRooms(): void {
    const unlockOrder: RoomId[] = [
      RoomId.ENTRANCE, RoomId.LIVING_ROOM, RoomId.KITCHEN,
      RoomId.LIBRARY, RoomId.GARDEN, RoomId.BEDROOM,
      RoomId.BATHROOM, RoomId.BASEMENT, RoomId.ATTIC,
      RoomId.MIRROR_ROOM, RoomId.SECRET_ROOM,
    ];
    const idx = Math.min(this.state.storyProgress + 2, unlockOrder.length);
    for (let i = 0; i < idx; i++) {
      this.state.roomFlags[unlockOrder[i]] = true;
    }
  }

  getCollectedEvidenceCount(): number {
    return Object.values(this.state.evidenceFlags).filter(Boolean).length;
  }

  getAllEvidenceCollected(): boolean {
    return this.getCollectedEvidenceCount() >= 10;
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
