import apiClient from "./apiClient";

export const analyzeRepository = async (repositoryUrl) => {
  const response = await apiClient.post(
    "/repositories/analyze",
    {
      repositoryUrl,
    }
  );

  return response.data;
};