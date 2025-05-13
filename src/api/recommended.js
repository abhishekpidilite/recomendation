import { useMutation } from "@tanstack/react-query";
import { fetchApi } from "./fetch";

export const useRecommended = () => {
  return useMutation({
    mutationFn: async ({ username, categoryId = null }) => {
      const data = await fetchApi("/v1/proponent/recommend/products", {
        method: "POST",
        body: JSON.stringify({ username: username, categoryId: categoryId }),
      });
      return data;
    },
  });
};
