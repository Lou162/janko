import { Link } from "react-router-dom";
import "../../App.css";
import MenuBouton from "../../components/menuBouton/menuBouton";
import { Button } from "@chakra-ui/react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";
import { getAuth, signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const userLoginAnonymous = async () => {
    try {
      // connexion anonyme puis navigation vers /multiGame avec uid dans state
      const res = await signInAnonymously(getAuth());
      const uid = res.user.uid;
      navigate("/multiGame", { state: { uid } });
    } catch (error) {
      console.error("Erreur lors de la connexion anonyme :", error);
    }
  };
  return (
    <>
      <div className='containerApp'>
        <h1 className='titleApp'>JANKO</h1>

        <div className='menuApp'>
          <Link to='/game' state={{ gameState: "bot", uid: "p1" }}>
            <MenuBouton butonText='Jouez maintenant' />
          </Link>

          <Button
            onClick={userLoginAnonymous}
            colorScheme='pink'
            size={"lg"}
            variant='outline'>
            <RiArrowLeftDoubleLine />
            Multijoueurs
            <RiArrowRightDoubleLine />
          </Button>

          <MenuBouton butonText='Tournois' />
          <MenuBouton butonText='Paramètres' />
          <MenuBouton butonText='Règles du jeu' />
        </div>
      </div>
    </>
  );
}

export default App;

