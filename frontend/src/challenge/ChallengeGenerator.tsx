import { useEffect, useState } from "react";
import { useApi } from "../utils/api";
import MCQChallenge from "./MCQChallenge";

type Quota = {
  last_reset_date: string;
  quota_remaining: number;
  user_id: string;
};

export type Challenge = {
  correct_answer_id: number;
  created_by: string;
  date_created: string;
  difficulty: string;
  explanation: string;
  id: number;
  options: [string];
  title: string;
  timestamp: string;
};

export default function ChallengeGenerator() {
  const { makeRequest } = useApi();
  const [challenge, setChallenge] = useState(null);
  const [difficulty, setDifficulty] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [quota, setQuota] = useState<Quota>();

  useEffect(() => {
    fetchQuota();
  }, []);

  // Declare quota. Required to move forward with challenge generation
  const fetchQuota = async () => {
    try {
      const data: Quota = await makeRequest("quota");
      setQuota(data);
    } catch (err) {
      console.log(err);
    }
  };

  const generateChallenge = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await makeRequest("generate-challenge", {
        method: "POST",
        body: JSON.stringify({ difficulty }),
      });
      setChallenge(data);
      console.log(challenge);
      fetchQuota();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate quota");
    }
    setIsLoading(false);
  };

  // Display that shows when quota will be resetted
  const resetQuotaTime = () => {
    if (!quota?.last_reset_date) return null;
    const resetDate = new Date(quota.last_reset_date);
    resetDate.setHours(resetDate.getHours() + 24);
    return resetDate;
  };

  return (
    <div className="challenge-container">
      <h2>Coding Challenge Generator</h2>

      <div className="quota-display">
        <p>Challenges remaining today: {quota?.quota_remaining || 0}</p>
        {quota?.quota_remaining === 0 && (
          <p>Next reset: {resetQuotaTime()?.toLocaleString()}</p>
        )}
      </div>
      <div className="difficulty-selector">
        <label htmlFor="difficulty">Select Difficulty</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={isLoading}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button
        onClick={generateChallenge}
        disabled={isLoading || quota?.quota_remaining === 0}
        className="generate-button"
      >
        {isLoading ? "Generating..." : "Generate Challenge"}
      </button>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {challenge && <MCQChallenge challenge={challenge} />}
    </div>
  );
}
