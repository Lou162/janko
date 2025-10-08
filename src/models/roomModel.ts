export interface Room {
  id: string;
  status: "waiting" | "playing" | "finished";
  maxPlayers: number;
  currentPlayers: number;
  currentRound: number;
  maxRounds: number;
  winner: string | null;
  players: Record<string, Player>;
}

export interface Player {
  id: string;
  name: string;
  choice: "rock" | "paper" | "scissors" | null;
  ready: boolean;
  score: number;
}
