import api from "./api";

export const registerUser = async ({ phone, password, name }) => {
  return await api.post("/users/register", { phone, password, name });
};

export const loginUser = async ({ phone, password }) => {
  return await api.post("/users/login", { phone, password });
};

export const currentUser = async () => {
  return await api.get("/users");
};
