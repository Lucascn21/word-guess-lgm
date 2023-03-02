import React from "react";

import { useGameContext } from "../context/GameContext";

export const Game = ({}) => {
  const { attemptNumber, wordToGuess, maxAttempts, setAttemptNumber } =
    useGameContext();
  let remaningLettersToGuess = [];

  let maxAttemptsArray = Array.from(
    { length: maxAttempts },
    (value, index) => index
  );

  let wordLengthArray = Array.from(
    { length: wordToGuess.length },
    (value, index) => index
  );

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    setAttemptNumber(attemptNumber + 1);
  }

  const letterCount = (array, letter) => {
    return array.filter((currentLetter) => currentLetter === letter).length;
  };

  function handleLetterInput(letterInput, inputId) {
    remaningLettersToGuess.push(letterInput);
    const positionInBoard = inputId.charAt(inputId.length - 1);
    const letterBelongsToWord = [...wordToGuess].includes(letterInput);
    const thereAreMoreOccurrences =
      letterCount(remaningLettersToGuess, letterInput) <=
      letterCount([...wordToGuess], letterInput);
    const letterInPlace = [...wordToGuess][positionInBoard] === letterInput;
    if (letterInPlace && thereAreMoreOccurrences) return "green";
    if (letterBelongsToWord && thereAreMoreOccurrences) return "yellow";
    if (!letterBelongsToWord) return "red";
    if (!thereAreMoreOccurrences) return "grey";
  }

  return (
    <>
      {attemptNumber} {wordToGuess}
      <form onSubmit={handleSubmit}>
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
              readOnly={index !== attemptNumber}
              onChange={(evt) => {
                //console.log(evt.target.value);
                //console.dir(evt.target);
                evt.target.style.backgroundColor = handleLetterInput(
                  evt.target.value,
                  evt.target.id
                );
              }}
            />
          ))
        )}
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
