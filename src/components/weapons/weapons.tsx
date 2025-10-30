import { FaFistRaised, FaHandScissors } from "react-icons/fa";
import { FaHand } from "react-icons/fa6";
import type { Move } from "../../types/game";

export default function Weapons({ weaponsMove }: { weaponsMove: Move | null }) {
  const weaponsIcons = {
    ROCK: <FaFistRaised />,
    PAPER: <FaHand />,
    SCISSORS: <FaHandScissors />,
  };
  if (weaponsMove === null) return null;
  return weaponsIcons[weaponsMove];
}
