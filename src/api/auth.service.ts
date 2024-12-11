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
type resetPasswordType = { verificationCode: string; password: string };

type SessionType = {
  id: string;
  userId: string;
  userAgent: string;
  createdAt: string;
  expiresAt: string;
  isCurrent: boolean;
};

type mfaType = {
  message: string;
  secret: string;
  qrImageUrl: string;
};

type verifyMFAType = { code: string; secretKey: string };

type SessionResponseType = {
  message: string;
  sessions: SessionType[];
};

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

export const logoutMutationFn = async () => await API.post(`/auth/logout`);

export const getUserSessionQueryFn = async () => await API.get(`/session/`);

export const sessionsQueryFn = async () => {
  const response = await API.get<SessionResponseType>(`/session/all`);
  return response.data;
};

export const mfaSetupQueryFn = async () => {
  const response = await API.get<mfaType>(`/mfa/setup`);
  return response.data;
};

export const revokeMFAMutationFn = async () => await API.put(`/mfa/revoke`, {});

export const verifyMFAMutationFn = async (data: verifyMFAType) =>
  await API.post(`/mfa/verify`, data);

export const sessionDelMutationFn = async (id: string) =>
  await API.delete(`/session/${id}`);
