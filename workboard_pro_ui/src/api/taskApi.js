// createTask sends { title, userId } as JSON object
//      This matches the new CreateTaskDto on the backend.

import axios from "axios";

const API_URL = "https://localhost:44363/api";

// ── Tasks ──────────────────────────────────────────────────────────────────

export const fetchTasks = () =>
    axios.get(`${API_URL}/tasks`);

// axios.post(API_URL, title, ...)
export const createTask = (title, userId) =>
    axios.post(`${API_URL}/tasks`, { title, userId });

export const completeTask = (id, userId) =>
    axios.put(`${API_URL}/tasks/${id}/complete?userId=${userId}`);

export const deleteTask = (id) =>
    axios.delete(`${API_URL}/tasks/${id}`);

// ── Users ──────────────────────────────────────────────────────────────────

export const fetchUsers = () =>
    axios.get(`${API_URL}/users`);

export const seedUsers = () =>
    axios.post(`${API_URL}/users/seed`);
