import { useEffect, useState } from "react";
import type { Challenge } from "../challenge/ChallengeGenerator";
import MCQChallenge from "../challenge/MCQChallenge";
import { useApi } from "../utils/api";

export default function HistoryP2anel() {
  const { makeRequest } = useApi();
  const [history, setHistory] = useState<[Challenge] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await makeRequest("my-history");
      setHistory(data.challenges);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "History was unable to load",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="history-panel">
      <h2>History</h2>
      {history.length === 0 ? (
        <p>No challenge history</p>
      ) : (
        <div className="history-list">
          {history.map((challenge: Challenge) => {
            return (
              <MCQChallenge
                challenge={challenge}
                key={challenge.id}
                showExplanation
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
