import type { Move } from "../types/game";

export interface Room {
  hostId: string | undefined;
  guestId: string | undefined;
  id: string | null;
  status: "waiting" | "playing" | "finished" | null;
  maxPlayers: number | null;
  currentPlayers: number | null;
  currentRound: number;
  maxRounds: number;
  winner: string | null;
  players: Record<string, Player>;
}

export interface Player {
  id: string;
  name: string;
  choice: Move | null;
  ready: boolean;
  score: number;
}
