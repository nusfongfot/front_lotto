import apiFetch from "@/helpers/interceptors";

export const listDate = async () => {
  const link = `bonus/listDate`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const listBonusDetail = async (date: string) => {
  const link = `bonus/listDetailBonus/${date}`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const checkBonusLotto = async () => {
  const link = `bonus/checkBonus`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const checkLottoIsBonus = async () => {
  const link = `bonus/lottoIsBonus`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const getLottoIsBonusLists = async () => {
  const link = `bonus/lottoIsBonusLists`;
  const { data } = await apiFetch.get(link);
  return data;
};
