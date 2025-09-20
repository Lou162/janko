import { Button } from "@chakra-ui/react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function MenuBouton({
  butonText,
  linkPage,
}: {
  butonText?: string;
  linkPage: string;
}) {
  return (
    <>
      <Link to={linkPage}>
        <Button
          colorScheme='pink'
          size={"lg"}
          variant='outline'>
          <RiArrowLeftDoubleLine />
          {butonText}
          <RiArrowRightDoubleLine />
        </Button>
      </Link>
    </>
  );
}
