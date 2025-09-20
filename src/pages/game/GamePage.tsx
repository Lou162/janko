import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import Weapons from "../../components/weapons/weapons";
import GameCard from "../../components/gameCard/gameCard";
import "./gamePage.css";
import { Move } from "../../types/game";
import { OUTCOMES } from "../../constants/gameConstants";

function Game() {
  const move = [Move.ROCK, Move.PAPER, Move.SCISSORS];
  const [randomMove, setRandomMove] = useState<Move | "">("");
  const [playerMove, setPlayerMove] = useState<Move | "">("");
  const [playerScore, setplayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [winAnswer, setwinAnswer] = useState("");

  function getMove() {
    return move[Math.floor(Math.random() * move.length)];
  }

  function ifWinner(playerMove: Move | "", botMove: Move | "") {
    if (!playerMove || !botMove) return undefined;
    return OUTCOMES[playerMove][botMove];
  }

  function calculateScore(result: number | undefined) {
    if (result === 1) setplayerScore(playerScore + 1);
    else if (result === -1) setBotScore(botScore + 1);
  }

  function winPhrase(result: number | undefined) {
    if (result === 1) return "Vous avez gagné !";
    else if (result === -1) return "Vous avez perdu !";
    return "Égalité !";
  }

  function playGame(playerMove: Move | "") {
    const botMove = getMove();
    setPlayerMove(playerMove);
    calculateScore(ifWinner(playerMove, botMove));
    setRandomMove(botMove);
    setwinAnswer(winPhrase(ifWinner(playerMove, botMove)));
  }

  return (
    <>
      <div className='gamePageBackground'>
        <h1 className='titleGame'>JANKO</h1>
        <div className='gamePage'>
          <div className='gamePageContainer'>
            <GameCard
              playerScore={playerScore}
              playerMove={playerMove}
              playerName='Joueur 1'
            />

            <p className='winPhrase'>{winAnswer}</p>

            <GameCard
              playerScore={botScore}
              playerMove={randomMove}
              playerName='Bot'
            />
          </div>

          <ButtonGroup
            colorScheme='pink'
            size={"lg"}
            gap={40}>
            {move.map((m) => (
              <Button
                key={m}
                onClick={() => playGame(m)}>
                <Weapons weaponsMove={m} />
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}

export default Game;
