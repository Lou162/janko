import { Button, ButtonGroup } from "@chakra-ui/react";
import useGame from "../../hooks/useGame";
import Weapons from "../../components/weapons/weapons";
import GameCard from "../../components/gameCard/gameCard";
import "./gamePage.css";
import { Move } from "../../types/game";
import { useLocation } from "react-router-dom";
import { clearChoiceFor, db } from "../../configs/fireBaseConfigs";
import { doc, onSnapshot } from "firebase/firestore";
import type { Player } from "../../models/roomModel";
import { useEffect, useState } from "react";

function Game() {
  // configure players here — pour passer en multijoueur, ajouter un second joueur non-bot
  const location = useLocation();
  const [room, setRoom] = useState<Record<string, Player>>({});
  const [gamePlayers, setPlayers] = useState<{ id: string; name: string; isBot?: boolean }[]>([{ id: "player1", name: "Machin" },
      { id: "player2", name: "Bot", isBot: true },]);
  // const [playersState, setPlayersState] = useState(gamePlayers);
  const navState = (location.state as { gameState?: string; roomId?: string; uid?: string }) || {};
  const { gameState = "bot", roomId, uid } = navState;

  useEffect(()=>{
    if(roomId) {
      const roomRef = doc(db, "rooms", roomId);
      const unsub = onSnapshot(roomRef, (doc) => {
        if(doc.exists()) {
          console.log("le doc existe")
          const data = doc.data();
          setRoom(data.players || {});

        }
      });
      return () => unsub();
    }
  }, [roomId]);

  useEffect(() => {
    getPlayersInformations(room);
}, [room, gameState]);

// useEffect(() => {
//   setPlayersState(gamePlayers);
// }, [gamePlayers]);

  function getPlayersInformations(players: Record<string, Player>) {
  if (gameState === "multiplayer") {
    const ChoiceAdversaire = Object.keys(players).find((id) => id !== uid);
    const newPlayers = Object.entries(players).map(([_, value]) => ({
      id: value.id,
      name: value.name,
      isBot: false,
    }));
    setPlayers(newPlayers);
    if(room[ChoiceAdversaire!]?.ready && room[uid!]?.ready){
      console.log("Les deux joueurs sont prêts");
      playMoveRemote(room[uid!]?.id, room[uid!]?.choice!, room[ChoiceAdversaire!]?.choice!);
      clearChoiceFor(roomId!, uid);
    } // ✅ un seul setState !
  }
}

  const { players, playMove, roundResult, nextRound, receiveRemoteMove, playMoveRemote } = useGame(
    gamePlayers
  );
  
  const player = players.find((p) => p.id === "player1")!;
  const opponent = players.find((p) => p.id === "player2")!;

  function launchGameMove(playerId: string, uid: string, move: Move) {
    if (gameState === "bot") {
      console.log("je suis dans le bot");
      playMove(playerId, move);  
    }
    else{
      receiveRemoteMove(move, uid, roomId!, playerId);
    }
  }
  const moves: Move[] = [Move.ROCK, Move.PAPER, Move.SCISSORS];

  return (
    <>
      <div className="gamePageBackground">
        <h1 className="titleGame">JANKO</h1>
        <div className="gamePage">
          <div className="gamePageContainer">
            <GameCard playerScore={player?.score} playerMove={player?.move} playerName={player?.name} />

            <p className="winPhrase">{roundResult}</p>

            <GameCard playerScore={opponent?.score} playerMove={opponent?.move} playerName={opponent?.name} />
          </div>

          <ButtonGroup colorScheme="pink" size={"lg"} gap={40}>
            {moves.map((m) => (
              <Button key={m} onClick={() => launchGameMove(player?.id, uid!, m)}>
                <Weapons weaponsMove={m} />
              </Button>
            ))}
          </ButtonGroup>

          <div style={{ marginTop: 16 }}>
            <Button onClick={() => nextRound()}>Round suivant</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
