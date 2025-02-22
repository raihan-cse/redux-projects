import axios from "../../utils/axios";

export const getVideo = async (id) => {
  const response = await axios.get(`/videos/${id}`);
  return response.data;
};

export const editVideo = async (id, data) => {
  const response = await axios.patch(`/videos/${id}`, data);
  return response.data;
};
