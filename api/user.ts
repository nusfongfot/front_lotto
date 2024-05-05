import apiFetch from "@/helpers/interceptors";

export const getInfoOfUser = async () => {
  const link = "users/info";
  const { data } = await apiFetch.get(link);
  return data;
};

export const getUsers = async () => {
  const link = "users/all";
  const { data } = await apiFetch.get(link);
  return data;
};

export const createUsers = async (body: object) => {
  const link = "users/insert";
  const { data } = await apiFetch.post(link, body);
  return data;
};

export const deleteUser = async (id: number) => {
  const link = `users/remove/${id}`;
  const { data } = await apiFetch.delete(link);
  return data;
};
