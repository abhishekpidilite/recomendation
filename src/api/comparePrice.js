import { useMutation } from "@tanstack/react-query";
import { fetchApi } from "./fetch";

export const useComparePrice = () => {
  return useMutation({
    mutationFn: async ({ productName }) => {
      const data = await fetchApi("/v1/proponent/compare/comparePrices", {
        method: "POST",
        body: JSON.stringify({ productName: productName }),
      });
      console.log("comparePriceData", data);
      return data;
    },
  });
};
