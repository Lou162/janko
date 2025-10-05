import "../../App.css";
import MenuBouton from "../../components/menuBouton/menuBouton";

function App() {
  console.log("Environment variable:", import.meta.env.MODE);
  console.log("Environment variable:", import.meta.env.VITE_SOME_KEY);
  console.log("Environment variable:", import.meta.env.VITE_TEST);
  return (
    <>
      <div className='containerApp'>
        <h1 className='titleApp'>JANKO</h1>

        {/* <h1>Welcome to Janko</h1> */}
        <div className='menuApp'>
          <MenuBouton
            butonText='Jouez maintenant'
            linkPage='/game'
          />

          <MenuBouton
            butonText='Multijoueurs'
            linkPage='/create-game'
          />

          <MenuBouton
            butonText='Tournois'
            linkPage='/'
          />

          <MenuBouton
            butonText='Paramètres'
            linkPage='/'
          />

          <MenuBouton
            butonText='Règles du jeu'
            linkPage='/'
          />
        </div>
      </div>
    </>
  );
}

export default App;
