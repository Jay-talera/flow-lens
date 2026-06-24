import apiClient from "./apiClient";

export const getDashboardSummary = async (
  repositoryId
) => {

  const response = await apiClient.get(
    `/dashboard/${repositoryId}/summary`
  );

  return response.data;
};

export const getSuccessTrend = async (
  repositoryId
) => {

  const response = await apiClient.get(
    `/dashboard/${repositoryId}/success-trend`
  );

  return response.data;
};

export const getDurationTrend = async (
  repositoryId
) => {

  const response = await apiClient.get(
    `/dashboard/${repositoryId}/duration-trend`
  );

  return response.data;
};

export const getBottlenecks = async (
  repositoryId
) => {

  const response = await apiClient.get(
    `/dashboard/${repositoryId}/bottlenecks`
  );

  return response.data;
};

export const getWorkflowDistribution =
  async (repositoryId) => {

    const response =
      await apiClient.get(
        `/dashboard/${repositoryId}/workflow-distribution`
      );

    return response.data;
};

export const getBranchActivity = async (
  repositoryId
) => {

  const response =
    await apiClient.get(
      `/dashboard/${repositoryId}/branch-activity`
    );

  return response.data;
};

export const getRecentRuns = async (
  repositoryId
) => {

  const response =
    await apiClient.get(
      `/dashboard/${repositoryId}/recent-runs`
    );

  return response.data;
};