import api from "../api";

export const generateRoadmap = async (goalId) => {
  const response = await api.post(`/ai/roadmap/${goalId}`);
  return response.data;
};