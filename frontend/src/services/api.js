import axios from "axios";
import { BASE_URL } from "./config.js";

const API_URL = BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const projectsAPI = {
  getAll: () => api.get("/projects"),
  getOne: (id) => api.get(`/projects/${id}`),
  create: (formData) =>
    api.post("/projects", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, formData) =>
    api.put(`/projects/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const clientsAPI = {
  getAll: () => api.get("/clients"),
  getOne: (id) => api.get(`/clients/${id}`),
  create: (formData) =>
    api.post("/clients", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, formData) =>
    api.put(`/clients/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/clients/${id}`),
};

export const contactsAPI = {
  getAll: () => api.get("/contacts"),
  create: (data) => api.post("/contacts", data),
  delete: (id) => api.delete(`/contacts/${id}`),
};

export const newsletterAPI = {
  getAll: () => api.get("/newsletters"),
  subscribe: (data) => api.post("/newsletters", data),
  delete: (id) => api.delete(`/newsletters/${id}`),
};

export default api;
