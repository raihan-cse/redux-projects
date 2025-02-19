import axios from "../../utils/axios";

export const getTransactions = async () => {
  const response = await axios.get("/transctions");

  return response.data;
};

export const addTransaction = async (data) => {
  const response = await axios.get("/transctions", data);

  return response.data;
};

export const editTransaction = async (id, data) => {
  const response = await axios.get(`/transctions/${id}`, data);

  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await axios.get(`/transctions/${id}`);

  return response.data;
};
