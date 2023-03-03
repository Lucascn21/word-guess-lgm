import { useGameContext } from "../context/GameContext";

export const Game = ({}) => {
  const {
    attemptNumber,
    wordToGuess,
    maxAttempts,
    setAttemptNumber,
    foundLettersByIndex,
    setFoundLettersByIndex,
  } = useGameContext();

  const wordLettersArray = [...wordToGuess];

  let lettersToCompare = [];
  const maxAttemptsArray = Array.from(
    { length: maxAttempts },
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
    //console.log(formJson);

    setAttemptNumber(attemptNumber + 1);
  }

  const letterCount = (array, letter) => {
    return array.filter((currentLetter) => currentLetter === letter).length;
  };

  function handleLetterInput(letterInput, inputId) {
    lettersToCompare.push(letterInput);
    const positionInBoard = inputId.charAt(inputId.length - 1);
    const letterBelongsToWord = [...wordToGuess].includes(letterInput);
    const thereAreMoreOccurrences =
      letterCount(lettersToCompare, letterInput) <=
      letterCount([...wordToGuess], letterInput);
    const letterInPlace = [...wordToGuess][positionInBoard] === letterInput;

    if (letterInPlace && thereAreMoreOccurrences) {
      let updatedFoundLetters = { ...foundLettersByIndex };
      updatedFoundLetters[positionInBoard] = letterInput;
      setFoundLettersByIndex(updatedFoundLetters);
      return "green";
    }

    if (letterBelongsToWord && thereAreMoreOccurrences) return "yellow";
    if (!letterBelongsToWord) return "red";
  }

  return (
    <>
      {attemptNumber} {wordToGuess}
      <form onSubmit={handleSubmit}>
        {maxAttemptsArray.map((attempt, index) =>
          wordLettersArray.map((letter, wordIndex) => (
            <input
              key={`${attempt}-letter-${wordIndex}`}
              type="text"
              id={`${attempt}-letter-${wordIndex}`}
              name={`${attempt}-letter-${wordIndex}`}
              required
              minLength="1"
              maxLength="1"
              size="1"
              style={{
                gridColumn: wordIndex + 1,
                backgroundColor: foundLettersByIndex[wordIndex]
                  ? "green"
                  : "grey",
              }}
              readOnly={
                index !== attemptNumber || foundLettersByIndex[wordIndex]
              }
              disabled={index > attemptNumber}
              onChange={(evt) => {
                //console.log(evt.target.value);
                //console.dir(evt.target.id);
                evt.target.style.backgroundColor = handleLetterInput(
                  evt.target.value,
                  evt.target.id
                );
                evt.target.readOnly = true;
              }}
              defaultValue={foundLettersByIndex[wordIndex]}
            />
          ))
        )}
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
