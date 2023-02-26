import { Game } from "./components/Game";
import "./App.scss";
import { GameContextProvider } from "./context/GameContext";

function App() {
  return (
    <>
      <nav>nav</nav>
      <main>
        <GameContextProvider>
          <Game></Game>
        </GameContextProvider>
      </main>
      <footer>footer</footer>
    </>
  );
}

export default App;
