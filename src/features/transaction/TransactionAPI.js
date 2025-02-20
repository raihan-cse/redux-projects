import axios from "../../utils/axios";

export const getTransactions = async () => {
  const response = await axios.get("/transctions");

  return response.data;
};

export const addTransaction = async (data) => {
  const response = await axios.post("/transctions", data);

  return response.data;
};

export const editTransaction = async (id, data) => {
  const response = await axios.put(`/transctions/${id}`, data);

  return response.data;
};

export const removeTransaction = async (id) => {
  const response = await axios.delete(`/transctions/${id}`);

  return response.data;
};
