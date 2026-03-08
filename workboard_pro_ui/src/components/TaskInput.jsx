// reads currentUser from Redux and passes userId when creating a task.


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";

function TaskInput() {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();

    // Get the currently selected user from Redux
    const currentUser = useSelector((state) => state.users.currentUser);

    const handleAdd = () => {
        if (!title.trim()) return;
        if (!currentUser) {
            alert("Please select a user first.");
            return;
        }

        // pass userId alongside title
        dispatch(addTask({ title, userId: currentUser.id }));
        setTitle("");
    };

    return (
        <div className="task-input">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                placeholder="Enter a new task..."
                disabled={!currentUser}
            />
            <button onClick={handleAdd} disabled={!currentUser}>
                Add Task
            </button>
        </div>
    );
}

export default TaskInput;