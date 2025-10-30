import { Button } from "@chakra-ui/react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";

export default function MenuBouton({
  butonText,
}: {
  butonText?: string;
}) {
  return (
    <>
        <Button
          colorScheme='pink'
          size={"lg"}
          variant='outline'>
          <RiArrowLeftDoubleLine />
          {butonText}
          <RiArrowRightDoubleLine />
        </Button>
    </>
  );
}
