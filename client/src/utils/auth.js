export const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Check if token exists
};

export const getToken = () => {
  return localStorage.getItem("token");
};
