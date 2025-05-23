import { useMutation } from "@tanstack/react-query";
import { fetchApi } from "./fetch";

export const useSearch = () => {
  return useMutation({
    mutationFn: async ({ productName }) => {
      const data = await fetchApi("/v1/proponent/compare/suggest", {
        method: "POST",
        body: JSON.stringify({ productName: productName }),
      });
      return data;
    },
  });
};
