import API from "./axios-cient";

type registerType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type loginType = {
  email: string;
  password: string;
}

export const registerMutationFn = async (data: registerType) =>
  await API.post(`/auth/register`, data);

export const loginMutationFn = async (data: loginType) =>
  await API.post(`/auth/login`, data);
