import { useEffect, useState } from "react";
import { Move } from "../types/game";
import { OUTCOMES } from "../constants/gameConstants";
import { setPlayerChoice } from "../configs/fireBaseConfigs";

type PlayerConfig = { id: string; name: string; isBot?: boolean };
type PlayerState = {
  id: string;
  name: string;
  isBot?: boolean;
  score: number;
  move: Move | null;
};

export default function useGame(
  initialPlayers: PlayerConfig[],
  maxRounds: number = 3,
) {
  const [currentRound, setCurrentRound] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

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
    initialPlayers.map((p) => ({ ...p, score: 0, move: null })),
  );
  const [roundResult, setRoundResult] = useState<string>("");

  // Réinitialiser la partie quand maxRounds change (nouvelle partie)
  useEffect(() => {
    setCurrentRound(0);
    setIsGameOver(false);
    setRoundResult("");
    setPlayers((prev) =>
      prev.map((p) => ({
        ...p,
        score: 0,
        move: null,
      })),
    );
  }, [maxRounds]);

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
    } else if (id && id !== player.id) {
      console.log("Le joueur a perdu !");
      return `Perdu !`;
    } else {
      return `${player.name} gagne !`;
    }
  }

  function computeRound(nextPlayers: PlayerState[], id?: string) {
    // For now we compute result for two players (easy to extend to n-player later)
    if (nextPlayers.length !== 2) return nextPlayers;
    const [a, b] = nextPlayers;
    if (!a.move || !b.move) return nextPlayers;

    const result = ifWinner(a.move, b.move);
    let resultMessage = "";
    let updated = nextPlayers.slice();
    if (result === 1) {
      resultMessage = messageChoice(a, id);
      updated = updated.map((p) =>
        p.id === a.id ? { ...p, score: p.score + 1 } : p,
      );
    } else if (result === -1) {
      resultMessage = messageChoice(b, id);
      updated = updated.map((p) =>
        p.id === b.id ? { ...p, score: p.score + 1 } : p,
      );
    } else {
      resultMessage = "Égalité !";
    }
    setRoundResult(resultMessage);
    setCurrentRound((prev) => prev + 1);

    // Vérifier si on a atteint le nombre de rounds maximum
    if (currentRound + 1 >= maxRounds) {
      // Si on atteint maxRounds, on termine le jeu SANS effacer les moves
      setIsGameOver(true);
      setRoundResult(
        `Fin du jeu ! ${a.score > b.score ? a.name : b.score > a.score ? b.name : "Égalité"} remporte la partie !`,
      );
    }

    return updated;
  }

  function playMove(playerId: string, move: Move) {
    // update player's move and, atomically, make bots play if all humans have moved
    setPlayers((prev) => {
      // set the current player's move
      let next = prev.map((p) =>
        p.id === playerId ? { ...p, move: move } : p,
      );

      // if all humans have moved, fill bots' moves immediately
      const allHumansMoved = next
        .filter((p) => !p.isBot)
        .every((p) => p.move !== null);
      if (allHumansMoved) {
        next = next.map((p) => (p.isBot ? { ...p, move: getRandomMove() } : p));
      }

      // if everyone has a move, compute the round
      if (next.every((p) => p.move !== null)) {
        next = computeRound(next);
      }

      return next;
    });
  }

  function nextRound() {
    // Si on a atteint le max de rounds, ne pas continuer
    if (currentRound >= maxRounds || isGameOver) return;

    setPlayers((prev) => prev.map((p) => ({ ...p, move: null })));
    setRoundResult("");
  }

  function playMoveRemote(playerId: string, move: Move, opponentMove: Move) {
    setPlayers((prev) => {
      const next = prev.map((p) =>
        p.id === playerId ? { ...p, move: move } : { ...p, move: opponentMove },
      );
      return computeRound(next, playerId);
    });
  }

  function receiveRemoteMove(
    move: Move,
    uid: string | undefined,
    roomId: string,
    playerId: string,
  ) {
    setPlayerChoice(roomId, uid, move);
    setPlayers((prev) => {
      const next = prev.map((p) =>
        p.id === playerId ? { ...p, move: move } : p,
      );
      return next;
    });
    // applique le coup reçu (ne pas déclencher comportement bot)
  }

  // exposure: players state, actions and round result
  return {
    players,
    playMove,
    receiveRemoteMove,
    roundResult,
    nextRound,
    setPlayers,
    playMoveRemote,
    currentRound,
    isGameOver,
  };
}
