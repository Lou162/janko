import { Button, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";
import type { Room } from "../../models/roomModel";
import {
  addPlayerInRoom,
  addRoom,
  getRoomPlayerCounts,
} from "../../configs/fireBaseConfigs";
import { useLocation, useNavigate } from "react-router-dom";

function MultiGame() {
  const toast = useToast();
  const location = useLocation();
  const { uid } = location.state as { uid?: string };
  const [value, setValue] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  function makeRandomRoomId() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "ROOM-";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }

  async function createRoom(roomId: string) {
    if (!uid) {
      console.error("No uid available. User must be authenticated.");
      return;
    }

    const roomData: Room = {
      hostId: uid,
      guestId: "",
      id: roomId,
      status: "waiting",
      maxPlayers: 2,
      currentPlayers: 1,
      currentRound: 0,
      maxRounds: 3,
      winner: null,
      players: {
        [uid]: {
          id: "player1",
          name: "Host",
          choice: null,
          ready: false,
          score: 0,
        },
      },
    };

    try {
      await addRoom(roomData, roomId);
      console.log("Room created with ID:", roomId);
    } catch (err) {
      console.error("Error creating room:", err);
      return;
    }
  }

  async function generateRoomId() {
    const id = makeRandomRoomId();
    setRoomId(id);

    await createRoom(id);

    // copy to clipboard for easy copy/paste
    try {
      await navigator.clipboard.writeText(id);
      console.log("Room id copied to clipboard:", id);
    } catch (err) {
      console.warn("Could not copy to clipboard:", err);
    }

    // navigate directly to the game page with the room info
    // adapt route/state to your GamePage expectations
    navigate("/game", {
      state: { gameState: "multiplayer", roomId: id, uid: uid },
    });
  }

  async function joinRoom() {
    // If you want to join using the input value set above
    const idToJoin = value || roomId;

    if (!idToJoin) return;

    try {
      const counts = await getRoomPlayerCounts(idToJoin);
      console.log("Current players in room:", counts.currentPlayers);
      console.log("Max players allowed in room:", counts.maxPlayers);
      if (counts.currentPlayers >= counts.maxPlayers) {
        toast({
          title: "Room is full.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      await addPlayerInRoom(idToJoin, "player2", uid);
    } catch (error) {
      console.error("Erreur lors de la jointure:", error);
    }

    // navigate to game/join flow, pass uid + roomId
    navigate("/game", {
      state: { gameState: "multiplayer", roomId: idToJoin, uid: uid },
    });
  }

  return (
    <>
      <Input
        value={value}
        onChange={handleChange}
        placeholder='Enter room id to join or leave empty to create'
        size='sm'
      />

      <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
        <Button
          colorScheme='pink'
          size={"lg"}
          variant='outline'
          onClick={() => {
            toast({
              title: "Room created.",
              description:
                "We've created your room with id :" +
                roomId +
                " for you. And we've copied the room ID to your clipboard.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            generateRoomId();
          }}>
          <RiArrowLeftDoubleLine />
          Create room
          <RiArrowRightDoubleLine />
        </Button>

        <Button
          colorScheme='pink'
          size={"lg"}
          variant='outline'
          onClick={joinRoom}>
          <RiArrowLeftDoubleLine />
          Join room
          <RiArrowRightDoubleLine />
        </Button>
      </div>
    </>
  );
}
export default MultiGame;
