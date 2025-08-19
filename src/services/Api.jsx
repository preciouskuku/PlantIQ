 import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api"; // your FastAPI base URL

export const getDiscussions = async () => {
  const res = await axios.get(`${API_BASE_URL}/discussions`);
  return res.data;
};

export const createDiscussion = async (payload) => {
  const res = await axios.post(`${API_BASE_URL}/discussions`, payload);
  return res.data;
};
