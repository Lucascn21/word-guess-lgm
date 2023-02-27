import { useState, createContext, useContext } from "react";

const GameContext = createContext();
export const useGameContext = () => useContext(GameContext);

export const GameContextProvider = (props) => {
  const [wordToGuess, setWordToGuess] = useState("test");
  const [attemptNumber, setAttemptNumber] = useState(0);
  const maxAttempts = 6;
  return (
    <GameContext.Provider
      value={{
        wordToGuess,
        attemptNumber,
        maxAttempts
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
