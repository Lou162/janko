import { Button, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { Link } from "react-router";

export default function CardGameDefault() {
  return (
    <>
      <Card>
        <CardHeader>
          <Heading size='md'>
            <span>🤖</span>
            <br></br>
            Contre l'IA
          </Heading>
        </CardHeader>
        <CardBody>
          <p>
            {" "}
            Entraînez-vous contre notre intelligence artificielle avec
            différents niveaux de difficulté.
          </p>
          <Link to='/game'>
            <Button colorScheme='blue'>Jouez maintenant</Button>
          </Link>
        </CardBody>
      </Card>
    </>
  );
}
