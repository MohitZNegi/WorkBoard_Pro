// completeTask dispatches { id, userId } — not just id.


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeTask, deleteTask } from "../features/tasks/taskSlice";

function TaskItem({ task }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.users.currentUser);
    const authError = useSelector((state) => state.tasks.authError);

    const handleComplete = () => {
        if (!currentUser) return;
        // pass both id and userId so backend can run OOP rule check
        dispatch(completeTask({ id: task.id, userId: currentUser.id }));
    };

    return (
        <li className="task-item">
            <div className="task-info">
                <span className={task.isCompleted ? "completed" : ""}>
                    {task.title}
                </span>
                {/* Show who owns the task */}
                <span className="task-owner">
                    {task.user?.name ?? `User #${task.userId}`}
                </span>
            </div>

            <div className="task-actions">
                {!task.isCompleted && (
                    <button onClick={handleComplete} disabled={!currentUser}>
                        ✓ Complete
                    </button>
                )}
                {task.isCompleted && (
                    <span className="done-label">Done</span>
                )}
                <button
                    className="delete-btn"
                    onClick={() => dispatch(deleteTask(task.id))}
                >
                    ✕
                </button>
            </div>
        </li>
    );
}

export default TaskItem;