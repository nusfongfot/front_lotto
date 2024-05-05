import { create } from "zustand";

const useInfo = create((set: any) => ({
  accInfo: {
    id: 0,
    email: "",
    level: "",
    name: "",
    phone: "",
    user: "",
  },
  setInfo: (value: object) =>
    set((state: any) => ({
      accInfo: value,
    })),
}));

export default useInfo;
