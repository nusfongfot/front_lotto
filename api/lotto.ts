import apiFetch from "@/helpers/interceptors";

export const dataFromGLO = async () => {
  const link = "bonus/list";
  const res = await apiFetch.post(link);
  return res.data.data.response;
};

export const getLottos = async () => {
  const link = "lotto/all";
  const { data } = await apiFetch.get(link);
  return data;
};

export const getLottosListForSale = async () => {
  const link = "lotto/listForSale";
  const { data } = await apiFetch.get(link);
  return data;
};

export const getLottosSearch = async (number: string, position: string) => {
  const link = `lotto/search?number=${number}&position=${position}`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const createLotto = async (body: object) => {
  const link = "lotto/insert";
  const { data } = await apiFetch.post(link, body);
  return data;
};

export const editLotto = async (id: number, body: object) => {
  const link = `lotto/edit/${id}`;
  const { data } = await apiFetch.put(link, body);
  return data;
};

export const deleteLotto = async (id: number) => {
  const link = `lotto/remove/${id}`;
  const { data } = await apiFetch.delete(link);
  return data;
};

export const changePriceLotto = async (body: object) => {
  const link = `lotto/changePrice`;
  const { data } = await apiFetch.put(link, body);
  return data;
};

export const createBillSale = async (body: object) => {
  const link = `lotto/confirmBuy`;
  const { data } = await apiFetch.post(link, body);
  return data;
};

export const getBillSales = async () => {
  const link = `lotto/billSale`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const deleteBillSale = async (id: number) => {
  const link = `lotto/removeBill/${id}`;
  const { data } = await apiFetch.delete(link);
  return data;
};

export const confirmPay = async (body: object) => {
  const link = `lotto/confirmPay`;
  const { data } = await apiFetch.put(link, body);
  return data;
};

export const getLottoInShops = async () => {
  const link = `lotto/lottoInShop`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const getLottoToSend = async () => {
  const link = `lotto/lottoToSend`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const createRecordDelivery = async (body: object) => {
  const link = `lotto/recordForSend`;
  const { data } = await apiFetch.post(link, body);
  return data;
};
