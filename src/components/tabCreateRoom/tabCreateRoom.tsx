import { Button, HStack, Input, TabPanel, useToast } from "@chakra-ui/react";
import "./tabCreateRoom.css";
import { useState } from "react";
import type { Room } from "../../models/roomModel";
import { addRoom } from "../../configs/fireBaseConfigs";

export default function TabCreateRoom() {
  const toast = useToast();
  const [roomId, setRoomId] = useState("");

  function generateRoomId() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "ROOM-";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setRoomId(result);
    createRoom(result);
  }

  function createRoom(roomId: string) {
    const roomData: Room = {
      id: roomId,
      status: "waiting",
      maxPlayers: 2,
      currentPlayers: 1,
      currentRound: 0,
      maxRounds: 3,
      winner: null,
      players: {
        player1: {
          id: "player1",
          name: "Host",
          choice: null,
          ready: true,
          score: 0,
        },
      },
    };
    addRoom(roomData, roomId);
    console.log("Room created with ID:", roomId);
  }
  return (
    <>
      <TabPanel className='tabPanel'>
        <Input
          color={"white"}
          htmlSize={75}
          width='auto'
          placeholder='Choisissez votre pseudo'
          size='lg'
        />
        <div
          className='roomIdContainer'
          onClick={() => {
            navigator.clipboard.writeText(roomId);
            toast({
              title: "Room link copied.",
              variant: "subtle",
              description: "Invite your friends to join the room.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }}>
          <h1 className='text'>{roomId}</h1>
        </div>
        <HStack
          spacing={4}
          mt={4}
          mb={4}>
          <Button
            colorScheme='pink'
            size={"lg"}
            onClick={() => {
              generateRoomId();
            }}>
            Generate code
          </Button>

          <Button
            colorScheme='pink'
            size={"lg"}
            variant='outline'>
            Annuler
          </Button>
        </HStack>
      </TabPanel>
    </>
  );
}
