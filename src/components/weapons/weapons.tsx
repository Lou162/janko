import { FaFistRaised, FaHandScissors } from "react-icons/fa";
import { FaHand } from "react-icons/fa6";

export default function Weapons({
  weaponsMove,
}: {
  weaponsMove: "rock" | "paper" | "scissors" | "";
}) {
  const weaponsIcons = {
    rock: <FaFistRaised />,
    paper: <FaHand />,
    scissors: <FaHandScissors />,
  };
  if (weaponsMove === "") return null;
  return weaponsIcons[weaponsMove];
}
