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
};

type verifyEmailType = { code: string };
type forgotPasswordType = { email: string };
type resetPasswordType = { verificationCode: string, password: string };

export const registerMutationFn = async (data: registerType) =>
  await API.post(`/auth/register`, data);

export const loginMutationFn = async (data: loginType) =>
  await API.post(`/auth/login`, data);

export const verifyEmailMutationFn = async (data: verifyEmailType) =>
  await API.post(`/auth/verify/email`, data);

export const forgotPasswordMutationFn = async (data: forgotPasswordType) =>
  await API.post(`/auth/password/forgot`, data);

export const resetPasswordMutationFn = async (data: resetPasswordType) =>
  await API.post(`/auth/password/reset`, data);
