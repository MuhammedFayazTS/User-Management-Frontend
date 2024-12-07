import API from "./axios-cient";

type registerType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const registerMutationFn = async (data: registerType) =>
  await API.post(`/auth/register`, data);
