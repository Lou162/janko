import "../../App.css";
import MenuBouton from "../../components/menuBouton/menuBouton";

function App() {
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
            linkPage='https://vercel.com/docs/deploy-hooks'
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
