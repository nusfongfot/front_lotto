import apiFetch from "@/helpers/interceptors";

export const createTransferMoney = async (body: object) => {
  const link = "billSale/transferMoney";
  const { data } = await apiFetch.post(link, body);
  return data;
};

export const createDeliveryMoney = async (body: object) => {
  const link = "billSale/deliveryMoney";
  const { data } = await apiFetch.post(link, body);
  return data;
};

export const getIncomes = async (startDate: string, endDate: string) => {
  const link = `billSale/income?startDate=${startDate}&endDate=${endDate}`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const getProfit = async (startDate: string, endDate: string) => {
  const link = `billSale/profit?startDate=${startDate}&endDate=${endDate}`;
  const { data } = await apiFetch.get(link);
  return data;
};
