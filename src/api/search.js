import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "./fetch";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ username }) => {
      const data = await fetchApi("/v1/proponent/user/login", {
        method: "POST",
        body: JSON.stringify({ username: username }),
      });
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("username", data.data.username);
      navigate("/home");
    },
  });
};
