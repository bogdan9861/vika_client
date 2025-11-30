import axios from "axios";
import api from "./api";

const token = localStorage.getItem("vika_token");

export const createCharacter = async (data) => {
  const res = await axios.post("http://localhost:8080/api/items", data, {
    headers: {
      Authorization: `Bearear: ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};

export const editCharacter = async (data) => {
  const res = await axios.put("http://localhost:8080/api/items", data, {
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
