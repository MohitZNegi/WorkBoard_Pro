// addTask accepts { title, userId } and passes userId to the API.
//      completeTask now accepts { id, userId } and passes userId to the API.
//      Previously userId was hardcoded to 1 in the API layer — now it comes from Redux state.

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/taskApi";

export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async () => {
        const response = await api.fetchTasks();
        return response.data;
    }
);

// accepts { title, userId } — not just title
export const addTask = createAsyncThunk(
    "tasks/addTask",
    async ({ title, userId }) => {
        const response = await api.createTask(title, userId);
        return response.data;
    }
);

// accepts { id, userId } — not just id
export const completeTask = createAsyncThunk(
    "tasks/completeTask",
    async ({ id, userId }, { rejectWithValue }) => {
        try {
            await api.completeTask(id, userId);
            return { id };
        } catch (err) {
            // 403 from backend — OOP rule blocked it
            const message =
                err.response?.data || "Not authorized to complete this task.";
            return rejectWithValue({ id, message });
        }
    }
);

export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (id) => {
        await api.deleteTask(id);
        return id;
    }
);

const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        items: [],
        loading: false,
        error: null,
        authError: null, // shown when OOP rule blocks a complete
    },
    reducers: {
        clearAuthError(state) {
            state.authError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(completeTask.fulfilled, (state, action) => {
                const task = state.items.find((t) => t.id === action.payload.id);
                if (task) task.isCompleted = true;
                state.authError = null;
            })
            // 403 from backend: show which task was blocked and why
            .addCase(completeTask.rejected, (state, action) => {
                state.authError = action.payload?.message || "Not authorized.";
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.items = state.items.filter((t) => t.id !== action.payload);
            });
    },
});

export const { clearAuthError } = taskSlice.actions;
export default taskSlice.reducer;