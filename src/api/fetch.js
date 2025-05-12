const baseURL = ""; // Remove the direct ngrok URL since we're using proxy

const defaultHeaders = {
  "Content-Type": "application/json",
};

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchApi = async (endpoint, options = {}) => {
  const url = `${baseURL}${endpoint}`;
  const headers = {
    ...defaultHeaders,
    ...getAuthHeader(),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
    credentials: "include", // Add this to handle cookies if needed
  };

  try {
    const response = await fetch(url, config);
    return handleResponse(response);
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
