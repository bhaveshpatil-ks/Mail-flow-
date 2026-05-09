export const getAuthToken = () => localStorage.getItem("token");

export const getAuthHeaders = (extraHeaders = {}) => {
  const token = getAuthToken();

  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
