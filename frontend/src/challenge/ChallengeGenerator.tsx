import { useEffect, useState } from "react";
import { useApi } from "../utils/api";

export default function ChallengeGenerator() {
  const [difficulty, setDifficulty] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [quota, setQuota] = useState(null);

  const apiUse = useApi();

  useEffect(() => {
    fetchQuota();
  }, []);

  // Declare quota. Required to move forward with challenge generation
  const fetchQuota = async () => {
    try {
      const data = await apiUse.makeRequest("quota");
      console.log("DATA", data);
    } catch (err) {}
  };

  return (
    <div>
      <div>Generator</div>
    </div>
  );
}
