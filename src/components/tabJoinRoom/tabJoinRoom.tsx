import { Button } from "@chakra-ui/react";
import { addPlayerInRoom } from "../../configs/fireBaseConfigs";

export default function TabJoinRoom() {
  return (
    <Button
      onClick={() => {
        addPlayerInRoom("ROOM-OFIBGF", "player2");
      }}>
      Join the room
    </Button>
  );
}
