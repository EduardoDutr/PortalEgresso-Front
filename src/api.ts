import axios from "axios";

const apiUrl = import.meta.env.VITE_BACK_API_URL;
console.log(apiUrl)

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
// Interceptor para incluir o token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Pega o token salvo
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   localStorage.removeItem("token"); // Remove o token se for 401
    //   window.location.href = "/login"; // Redireciona para login
    // }
    return Promise.reject(error);
  }
);

export default api;
