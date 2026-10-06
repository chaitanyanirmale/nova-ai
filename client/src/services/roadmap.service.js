import api from "../api";

export const getRoadmap = async (goalId) => {
  const response = await api.get(`/roadmap/${goalId}`);
  return response.data;
};

export const deleteRoadmap = async (goalId) => {
  const response = await api.delete(`/roadmap/${goalId}`);
  return response.data;
};