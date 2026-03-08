// Selecting a user sets them as currentUser in Redux.
// All task actions (create, complete) will use this user's ID.

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, seedUsers } from "../features/users/userSlice";

function UserSelector() {
    const dispatch = useDispatch();
    const { list, currentUser, loading } = useSelector((state) => state.users);

    const handleChange = (e) => {
        const selected = list.find((u) => u.id === parseInt(e.target.value));
        dispatch(setCurrentUser(selected));
    };

    // Determine if current user is admin based on EF Core discriminator
    // The backend returns userType: "Admin" or "Regular" (from the Discriminator column)
    const isAdmin = currentUser?.userType === "Admin";

    if (loading) return <p>Loading users...</p>;

    // If no users in DB yet, show seed button
    if (list.length === 0) {
        return (
            <div className="user-selector empty">
                <p>No users in database yet.</p>
                <button onClick={() => dispatch(seedUsers())}>
                    Seed Demo Users
                </button>
            </div>
        );
    }

    return (
        <div className="user-selector">
            <label htmlFor="user-select">Acting as:</label>
            <select
                id="user-select"
                value={currentUser?.id ?? ""}
                onChange={handleChange}
            >
                {list.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>

            {/* Role badge — shows the user what privileges they have */}
            <span className={`role-badge ${isAdmin ? "admin" : "regular"}`}>
                {isAdmin ? "Admin — can complete any task" : "Regular — own tasks only"}
            </span>
        </div>
    );
}

export default UserSelector;