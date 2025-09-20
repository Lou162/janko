export const Move = {
  ROCK: 'ROCK',
  PAPER: 'PAPER',
  SCISSORS: 'SCISSORS'
} as const;

export type Move = typeof Move[keyof typeof Move];

export interface GameState {
  playerMove: Move | "";
  botMove: Move | "";
  playerScore: number;
  botScore: number;
  winMessage: string;
}
