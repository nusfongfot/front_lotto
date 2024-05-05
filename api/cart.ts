import apiFetch from "@/helpers/interceptors";

export const createCart = async (body: object) => {
  const link = "cart/insert";
  const { data } = await apiFetch.post(link, body);
  return data;
};

export const removeCart = async (id: number) => {
  const link = `cart/remove/${id}`;
  const { data } = await apiFetch.delete(link);
  return data;
};

export const listCart = async (userId: number) => {
  const link = `cart/list?userId=${userId}`;
  const { data } = await apiFetch.get(link);
  return data;
};
