import axios from "axios";
import api from "./api";

const token = localStorage.getItem("vika_token");

const BASE_API = "https://vika-server.onrender.com/api";

export const createCharacter = async (data) => {
  const res = await axios.post(`${BASE_API}/items`, data, {
    headers: {
      Authorization: `Bearear: ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};

export const editCharacter = async (data) => {
  const res = await axios.put(`${BASE_API}/items`, data, {
    headers: {
      Authorization: `Bearear: ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};

export const getCharacters = async ({ name }) => {
  return await api.get(`/items?name=${name}`);
};

export const removeCharacter = async ({ characterId }) => {
  return await api.delete(`/items/${characterId}`);
};
