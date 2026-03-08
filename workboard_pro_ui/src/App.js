// fetches users on mount (for the dropdown).
//      Shows an error banner when OOP rule blocks a complete (403 from backend).

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./features/tasks/taskSlice";
import { fetchUsers } from "./features/users/userSlice";
import { clearAuthError } from "./features/tasks/taskSlice";

import UserSelector from "./components/UserSelector";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

import "./App.css";

function App() {
    const dispatch = useDispatch();
    const authError = useSelector((state) => state.tasks.authError);

    useEffect(() => {
        dispatch(fetchUsers()); // load dropdown
        dispatch(fetchTasks()); // load task list
    }, [dispatch]);

    return (
        <div className="app">
            <h1>WorkBoard Pro</h1>

            {/* Role switcher — replaces login */}
            <UserSelector />

            {/* OOP rule violation banner */}
            {authError && (
                <div className="auth-error">
                    ⚠ {authError}
                    <button onClick={() => dispatch(clearAuthError())}>✕</button>
                </div>
            )}

            <TaskInput />
            <TaskList />
        </div>
    );
}

export default App;