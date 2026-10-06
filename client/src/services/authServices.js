import api from "../api";

export const signUp = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

export const signIn = async (userData) => {
  const response = await api.post("/auth/signin", userData);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

export const getGoals = async () => {
  const response = await api.get("/goals/get-goal");
  return response.data;
};

export const createGoal = async (goalData) => {
  const response = await api.post("/goals/create-goal", goalData);
  return response.data;
};

export const updateGoal = async (goalId, goalData) => {
  const response = await api.put(`/goals/update-goal/${goalId}`,goalData);
  return response.data;
};

export const deleteGoal = async (goalId) => {
  const response = await api.delete(`/goals/delete-goal/${goalId}`);
  return response.data;
};