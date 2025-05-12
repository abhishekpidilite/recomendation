import { useMutation } from "@tanstack/react-query";
import { fetchApi } from "./fetch";
// import { baseUrl } from "../../utils/baseurl";
import { useNavigate } from "react-router-dom";

// Login mutation
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

// Logout mutation
export const useLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      localStorage.removeItem("username");
      navigate("/login");
    },
    onSuccess: () => {},
  });
};
