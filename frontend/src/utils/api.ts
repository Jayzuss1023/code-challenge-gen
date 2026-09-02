import { useAuth } from "@clerk/react";

export const useApi = () => {
  const { getToken } = useAuth();

  const makeRequest = async (endpoint: string, options?: {}) => {
    const token = await getToken();
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`http://localhost:8000/api/${endpoint}`, {
      ...defaultOptions,
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (response.status === 429) {
        throw new Error("Daily quota exceeded");
      }

      throw new Error(errorData?.detail || "An unexpected error occured");
    }

    return response.json();
  };

  return { makeRequest };
};
