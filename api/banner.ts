import apiFetch from "@/helpers/interceptors";

export const uploadFileBanner = async (body: object) => {
  const link = "banner/uploadFile";
  const { data } = await apiFetch.post(link, body);
  return data;
};

export const getImageBanner = async () => {
  const link = "banner/list";
  const { data } = await apiFetch.get(link);
  return data;
};

export const deleteBanner = async (id: number) => {
  const link = `banner/remove/${id}`;
  const { data } = await apiFetch.delete(link);
  return data;
};
