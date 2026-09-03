import { useState } from "react";
import type { Challenge } from "./ChallengeGenerator";

export default function MCQChallenge({
  challenge,
  showExplanation = false,
}: {
  challenge: Challenge;
  showExplanation?: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState<null | number>(null);
  const [shouldShowExplanation, setShouldShowExplanation] =
    useState(showExplanation);

  const options =
    typeof challenge.options === "string"
      ? JSON.parse(challenge.options)
      : challenge.options;

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setShouldShowExplanation(true);
  };

  // Styling for Correct/Incorrect answer
  const getOptionClass = (index: number) => {
    if (selectedOption === null) return "option";

    if (index === challenge.correct_answer_id) {
      return "option correct";
    }
    if (selectedOption === index && index !== challenge.correct_answer_id) {
      return "option incorrect";
    }

    return "option";
  };

  return (
    <div className="challenge-display">
      <p>
        <strong>Difficulty</strong>: {challenge.difficulty}
      </p>
      <p className="challenge-title">{challenge.title}</p>

      <div className="options">
        {options.map((option: string, index: number) => (
          <div
            className={getOptionClass(index)}
            key={index}
            onClick={() => handleOptionSelect(index)}
          >
            {option}
          </div>
        ))}
      </div>

      {/* Show only if user has selected an option  */}
      {shouldShowExplanation && selectedOption !== null && (
        <div className="explanation">
          <h4>Explanation</h4>
          <p>{challenge.explanation}</p>
        </div>
      )}
    </div>
  );
}
