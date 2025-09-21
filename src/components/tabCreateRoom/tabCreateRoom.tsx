import { Button, Input, TabPanel, useToast } from "@chakra-ui/react";
import "./tabCreateRoom.css";
import { useState } from "react";

export default function TabCreateRoom() {
  const toast = useToast();
  const [roomName, setRoomName] = useState("");
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
  }
  const handleRoomName = (event) => setRoomName(event.target.value);
  return (
    <>
      <TabPanel>
        <Input
          onChange={handleRoomName}
          color={"white"}
          htmlSize={80}
          width='auto'
          placeholder='Choisissez votre pseudo'
          size='lg'
        />
        <div>
          <h1
            className='text'
            onClick={() => {
              navigator.clipboard.writeText(roomId);
              toast({
                title: "Room link copied.",
                description: "Invite your friends to join the room.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            }}>
            {roomId}
          </h1>
          <Button
            colorScheme='pink'
            size={"lg"}
            variant='outline'
            onClick={() => {
              navigator.clipboard.writeText(roomId);
              toast({
                title: "Room link copied.",
                description: "Invite your friends to join the room.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            }}>
            copy room link
          </Button>
        </div>
        <Button
          colorScheme='pink'
          size={"lg"}
          variant='outline'
          onClick={() => {
            generateRoomId();
          }}>
          Create Room
        </Button>
      </TabPanel>
    </>
  );
}
