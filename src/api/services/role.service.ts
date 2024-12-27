import API from "../axios-cient";

type roleType = {
  name: string;
  description?: string;
};

export const roleMutationFn = async (data: roleType) =>
  await API.post(`/roles`, data);
