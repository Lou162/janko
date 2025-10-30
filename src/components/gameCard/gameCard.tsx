import { Avatar } from "@chakra-ui/react";
import Weapons from "../weapons/weapons";
import style from "./gameCard.module.css";
import { IconContext } from "react-icons";
import type { Move } from "../../types/game";

export default function GameCard({
  playerScore,
  playerMove,
  playerName = "Player",
}: {
  playerScore: number;
  playerMove: Move | null;
  playerName?: string;
  margin?: string;
}) {
  return (
    <div className={style.gameCard}>
      <div className={style.playerInfo}>
        <div className={style.playerAvatar}>
          <Avatar size={"xs"} />
          <h3>{playerName}</h3>
        </div>

        <h2 className={style.word}>Score: {playerScore}</h2>
      </div>
      <IconContext.Provider value={{ className: style.weaponIcon }}>
        <Weapons weaponsMove={playerMove} />
      </IconContext.Provider>
    </div>
  );
}
