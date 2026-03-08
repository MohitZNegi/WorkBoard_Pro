//   - the list of users (for the dropdown)
//   - the currently selected user (acts as "who is logged in")

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/taskApi";

// Fetch all users from backend (populates dropdown)
export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async () => {
        const response = await api.fetchUsers();
        return response.data;
    }
);

// Seed demo users if DB is empty
export const seedUsers = createAsyncThunk(
    "users/seedUsers",
    async (_, { dispatch }) => {
        await api.seedUsers();
        dispatch(fetchUsers()); // reload dropdown after seeding
    }
);

const userSlice = createSlice({
    name: "users",
    initialState: {
        list: [],          // all users from DB
        currentUser: null, // the selected user (replaces "login")
        loading: false,
    },
    reducers: {
        // Dispatched when the dropdown changes
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
                // Auto-select first user if none selected yet
                if (!state.currentUser && action.payload.length > 0) {
                    state.currentUser = action.payload[0];
                }
            });
    },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;