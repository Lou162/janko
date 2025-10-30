import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

export default function WinnerDialog({ winner }: { winner: string | null }) {
  const { isOpen, onClose } = useDisclosure()
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Congratulations!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{winner} is the winner!</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
            
        </>
    );
}