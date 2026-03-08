import React from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

function TaskList() {
    const { items, loading } = useSelector(
        (state) => state.tasks
    );

    if (loading) return <p>Loading tasks...</p>;

    return (
        <ul className="task-list">
            {items.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </ul>
    );
}

export default TaskList;