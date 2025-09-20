import { Move } from "../types/game";

export const MOVES = [Move.ROCK, Move.PAPER, Move.SCISSORS];

export const OUTCOMES: Record<Move, Record<Move, number>> = {
  [Move.ROCK]: { [Move.ROCK]: 0, [Move.PAPER]: -1, [Move.SCISSORS]: 1 },
  [Move.PAPER]: { [Move.ROCK]: 1, [Move.PAPER]: 0, [Move.SCISSORS]: -1 },
  [Move.SCISSORS]: { [Move.ROCK]: -1, [Move.PAPER]: 1, [Move.SCISSORS]: 0 },
};
