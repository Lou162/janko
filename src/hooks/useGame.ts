import { useEffect, useState } from "react";
import { Move } from "../types/game";
import { OUTCOMES } from "../constants/gameConstants";
import { setPlayerChoice } from "../configs/fireBaseConfigs";



type PlayerConfig = { id: string; name: string; isBot?: boolean };
type PlayerState = { id: string; name: string; isBot?: boolean; score: number; move: Move | null };

export default function useGame(initialPlayers: PlayerConfig[]) {
  useEffect(() => {
  setPlayers((prevPlayers) => {
    // On met à jour les noms existants sans toucher aux scores ou moves
    const updatedPlayers = initialPlayers.map((newP) => {
      const existing = prevPlayers.find((p) => p.id === newP.id);
      return existing
        ? { ...existing, name: newP.name } // garde score et move
        : { ...newP, score: 0, move: null }; // nouveau joueur
    });

    return updatedPlayers;
  });
}, [initialPlayers]);

  const [players, setPlayers] = useState<PlayerState[]>(
    initialPlayers.map((p) => ({ ...p, score: 0, move: null }))
  );
  const [roundResult, setRoundResult] = useState<string>("");

  
  const moves: Move[] = [Move.ROCK, Move.PAPER, Move.SCISSORS];
  function getRandomMove() {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  function ifWinner(p1: Move | "", p2: Move | "") {
    if (!p1 || !p2) return undefined;
    return OUTCOMES[p1][p2];
  }

    function messageChoice(player: PlayerState, id: string | undefined) {
      if (id && id === player.id) {
        console.log("Le joueur a gagné !");
        return `Gagné !`;
      }else if(id && id !== player.id) {
        console.log("Le joueur a perdu !");
        return `Perdu !`;
      }else {
        return `${player.name} gagne !`;
      }
  }

  function computeRound(nextPlayers: PlayerState[], id?: string) {
    console.log("Je suis là compute round");
    // For now we compute result for two players (easy to extend to n-player later)
    if (nextPlayers.length !== 2) return nextPlayers;
    const [a, b] = nextPlayers;
    if (!a.move || !b.move) return nextPlayers;

    const result = ifWinner(a.move, b.move);
    let resultMessage = "";
    let updated = nextPlayers.slice();
    if (result === 1) {
      resultMessage = messageChoice(a, id);
      updated = updated.map((p) => (p.id === a.id ? { ...p, score: p.score + 1 } : p));
    } else if (result === -1) {
      resultMessage = messageChoice(b, id);
      updated = updated.map((p) => (p.id === b.id ? { ...p, score: p.score + 1 } : p));
    } else {
      resultMessage = "Égalité !";
    }
    setRoundResult(resultMessage);
    if(a.score === 3 || b.score === 3) {
      // Si un joueur atteint 3 points, on termine le jeu
      setPlayers((prev) => prev.map((p) => ({ ...p, lastMove: "" })));
      setRoundResult("Fin du jeu !");
    }
  
    return updated;
  }

  function playMove(playerId: string, move: Move) {
    console.log("je suis dans le play move");
    // update player's move and, atomically, make bots play if all humans have moved
    setPlayers((prev) => {
      // set the current player's move
      let next = prev.map((p) => (p.id === playerId ? { ...p, move: move } : p));

      // if all humans have moved, fill bots' moves immediately
      const allHumansMoved = next.filter((p) => !p.isBot).every((p) => p.move !== null);
      if (allHumansMoved) {
        next = next.map((p) =>
          p.isBot ? { ...p, move: getRandomMove() } : p
        );
      }

      // if everyone has a move, compute the round
      if (next.every((p) => p.move !== null)) {
        next = computeRound(next);
      }

      return next;
    });
  }

  function nextRound() {
    setPlayers((prev) => prev.map((p) => ({ ...p, move: null })));
    setRoundResult("");
  }

  function playMoveRemote(playerId: string, move: Move, opponentMove: Move, id: string | undefined) {
    setPlayers((prev) => {
      let next = prev.map((p) => (p.id === playerId ? { ...p, move: move } : { ...p, move: opponentMove }));
      return computeRound(next, playerId);
    });
    console.log("je suis là dans le play move remote");
      
  }

  function receiveRemoteMove(move: Move, uid: string | undefined, roomId: string, playerId: string) {
    console.log("j'envoie le coup au back...")
    setPlayerChoice(roomId, uid, move);
    setPlayers((prev) => {
      let next = prev.map((p) => (p.id === playerId ? { ...p, move: move } : p));
      return next;
    });
    // applique le coup reçu (ne pas déclencher comportement bot)
  
    
  }

  // exposure: players state, actions and round result
  return { players, playMove, receiveRemoteMove, roundResult, nextRound, setPlayers, playMoveRemote };
}