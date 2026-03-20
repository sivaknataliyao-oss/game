import { RoomId, NpcId, ROOM_NAMES, ROOM_DESCRIPTIONS } from '../config';
import { StateManager } from './StateManager';

export interface RoomExit {
  targetRoom: RoomId;
  x: number;
  y: number;
  label: string;
}

export interface RoomHotspot {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  evidenceId?: string;
  dialogueTriggerId?: string;
  action?: string;
}

export interface RoomNpc {
  npcId: NpcId;
  x: number;
  y: number;
}

export interface RoomDef {
  id: RoomId;
  name: string;
  description: string;
  width: number;
  height: number;
  tileColors: number[][];
  exits: RoomExit[];
  hotspots: RoomHotspot[];
  npcs: RoomNpc[];
  ambientColor: number;
  playerStart: { x: number; y: number };
}

class RoomManagerClass {
  private rooms: Map<RoomId, RoomDef> = new Map();

  register(def: RoomDef): void {
    this.rooms.set(def.id, def);
  }

  get(id: RoomId): RoomDef | undefined {
    return this.rooms.get(id);
  }

  getUnlockedRooms(): RoomId[] {
    const state = StateManager.get();
    return Object.entries(state.roomFlags)
      .filter(([, unlocked]) => unlocked)
      .map(([id]) => id as RoomId);
  }

  getAvailableExits(roomId: RoomId): RoomExit[] {
    const room = this.rooms.get(roomId);
    if (!room) return [];
    return room.exits.filter(exit => StateManager.isRoomUnlocked(exit.targetRoom));
  }

  getRoomName(id: RoomId): string {
    return ROOM_NAMES[id] || id;
  }

  getRoomDescription(id: RoomId): string {
    return ROOM_DESCRIPTIONS[id] || '';
  }
}

export const RoomManager = new RoomManagerClass();
