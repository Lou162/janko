import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import Weapons from "../../components/weapons/weapons";

function Game() {
  const move = ["rock", "paper", "scissors"] as const;
  const [randomMove, setRandomMove] = useState<
    "" | "rock" | "paper" | "scissors"
  >("");
  const [playerMove, setPlayerMove] = useState<
    "" | "rock" | "paper" | "scissors"
  >("");
  const [playerScore, setplayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [winAnswer, setwinAnswer] = useState("");

  function botGame(playerMove: string) {
    const botMove = move[Math.floor(Math.random() * move.length)];
    setPlayerMove(playerMove as "rock" | "paper" | "scissors");
    switch (playerMove) {
      case "rock":
        if (botMove === "rock") setwinAnswer("Egalité !");
        else if (botMove === "paper") {
          setBotScore(botScore + 1);
          setwinAnswer("Vous avez perdu !");
        } else {
          setplayerScore(playerScore + 1);
          setwinAnswer("Vous avez gagné !");
        }
        setRandomMove(botMove);
        break;
      case "paper":
        if (botMove === "rock") {
          setplayerScore(playerScore + 1);
          setwinAnswer("Vous avez gagné !");
        } else if (botMove === "paper") setwinAnswer("Egalité !");
        else {
          setBotScore(botScore + 1);
          setwinAnswer("Vous avez perdu !");
        }
        setRandomMove(botMove);
        break;
      case "scissors":
        if (botMove === "rock") {
          setBotScore(botScore + 1);
          setwinAnswer("Vous avez perdu !");
        } else if (botMove === "paper") {
          setplayerScore(playerScore + 1);
          setwinAnswer("Vous avez gagné !");
        } else setwinAnswer("Egalité !");
        setRandomMove(botMove);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div>
        <p>Bot : {botScore}</p>
        <Weapons weaponsMove={randomMove} />
      </div>
      <div>
        <p>Joueur : {playerScore} </p>
        <Weapons weaponsMove={playerMove} />
      </div>
      <ButtonGroup colorScheme='blue'>
        {move.map((m) => (
          <Button
            key={m}
            onClick={() => botGame(m)}>
            <Weapons weaponsMove={m} />
          </Button>
        ))}
      </ButtonGroup>
      <p>{winAnswer}</p>
    </>
  );
}

export default Game;
