import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";
import type { Room } from "../../models/roomModel";
import { addPlayerInRoom, addRoom } from "../../configs/fireBaseConfigs";
import { useNavigate } from "react-router-dom";

function MultiGame() {
  // const toast = useToast()
  const uid = localStorage.getItem("uid") || undefined;
  const [value, setValue] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

//   useEffect(() => {
//   document.body.style.visibility = "hidden";
//   setTimeout(() => (document.body.style.visibility = "visible"), 0);
// }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  function makeRandomRoomId() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "ROOM-";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
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

  // Lancer la création en background
  createRoom(id).catch(console.error);

  // Copie asynchrone, pas bloquante
  navigator.clipboard.writeText(id).catch(() => {});

  // Naviguer immédiatement
  localStorage.setItem("roomId", id);
  localStorage.setItem("gameState", "multiplayer");
  navigate("/game");

  // toast({
  //   title: "Room created.",
  //   description: `Room ID ${id} copied to clipboard.`,
  //   status: "success",
  //   duration: 5000,
  //   isClosable: true,
  // });
  }

  function joinRoom() {
    // If you want to join using the input value set above
    const idToJoin = value || roomId;

    if (!idToJoin) return;
    addPlayerInRoom(idToJoin, "player2", uid);
    // navigate to game/join flow, pass uid + roomId
    localStorage.setItem("roomId", idToJoin);
    localStorage.setItem("gameState", "multiplayer");
    navigate("/game");
  }

  return (
    <>
      <Input
        value={value}
        onChange={handleChange}
        placeholder="Enter room id to join or leave empty to create"
        size="sm"
      />

      <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
        <Button
          colorScheme="pink"
          size={"lg"}
          variant="outline"
          onClick={() => {
            generateRoomId();
          }}
        >
          <RiArrowLeftDoubleLine />
          Create room
          <RiArrowRightDoubleLine />
        </Button>

        <Button
          colorScheme="pink"
          size={"lg"}
          variant="outline"
          onClick={joinRoom}
        >
          <RiArrowLeftDoubleLine />
          Join room
          <RiArrowRightDoubleLine />
        </Button>
      </div>
    </>
  );
}
export default MultiGame;