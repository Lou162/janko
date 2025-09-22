import { Button, HStack, Input, TabPanel, useToast } from "@chakra-ui/react";
import "./tabCreateRoom.css";
import { useState } from "react";

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
