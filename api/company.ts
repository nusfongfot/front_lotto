import apiFetch from "@/helpers/interceptors";

export const getInfoCompany = async () => {
  const link = "company/info";
  const { data } = await apiFetch.get(link);
  return data;
};

export const createCompany = async (body: object) => {
  const link = "company/insert";
  const { data } = await apiFetch.post(link, body);
  return data;
};
