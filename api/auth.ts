import apiFetch from "@/helpers/interceptors";

export const logIn = async (body: object) => {
  const link = "auth/login";
  const { data } = await apiFetch.post(link, body);
  return data;
};
