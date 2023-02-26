import React from "react";

import { useGameContext } from "../context/GameContext";

export const Game = ({}) => {
  const { attemptNumber, wordToGuess, maxAttempts } = useGameContext();
  let maxAttemptsArray = Array.from(
    { length: maxAttempts },
    (value, index) => index
  );

  let wordLengthArray = Array.from(
    { length: wordToGuess.length },
    (value, index) => index
  );

  return (
    <>
      {attemptNumber} {wordToGuess}
      <form>
        {maxAttemptsArray.map((attempt, index) =>
          wordLengthArray.map((wordLength, indexWord) => (
            <input
              key={`${attempt}-letter-${indexWord}`}
              type="text"
              id={`${attempt}-letter-${indexWord}`}
              name={`${attempt}-letter-${indexWord}`}
              required
              minLength="1"
              maxLength="1"
              size="1"
              style={{ gridColumn: indexWord + 1 }}
              readOnly={index > attemptNumber}
            />
          ))
        )}
      </form>
    </>
  );
};
