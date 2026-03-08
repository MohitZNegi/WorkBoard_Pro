# WorkBoard Pro

A full-stack task management system built with **ASP.NET Core** and **React + Redux**.  
Built to demonstrate real-world OOP, clean architecture, and full-stack data flow.

---

## What It Does

- Users can create tasks
- Regular users can only complete their **own** tasks
- Admin users can complete **any** task
- Active user is selected via a dropdown
- Backend enforces all rules — frontend handles display only

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | ASP.NET Core Web API, C# |
| Database | SQL Server + Entity Framework Core |
| Frontend | React, Redux Toolkit, Axios |

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/MohitZNegi/WorkBoard_Pro
```

### 2. Set up the backend
```bash
cd WorkBoard_Pro
```
Update `appsettings.json` with your SQL Server connection string:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=WorkBoardPro;Trusted_Connection=True;"
}
```
Run migrations and start the API:
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
```

### 3. Seed demo users
Hit this endpoint once in Swagger or your browser:
```
POST /api/users/seed
```
This creates three users: **Alice (Admin)**, **Bob (Regular)**, **Carol (Regular)**.

### 4. Start the frontend
```bash
cd workboard-ui
npm install
npm start
```
React runs on `http://localhost:3000`. Make sure the API URL in `src/api/taskApi.js` matches your backend port.

---

## OOP Concepts Used

- **Encapsulation** — private setters on `Name` and `Title` protect data integrity
- **Inheritance** — `AdminUser` extends `User`, reusing all base properties
- **Polymorphism** — `CanCompleteTask()` behaves differently for Admin vs Regular users with no if-else role checking
- **Abstraction** — `MarkCompleted()` is the only controlled way to complete a task

---

## Project Structure

```
WorkBoard_Pro/
├── Controllers/      # HTTP endpoints
├── Services/         # Business logic (OOP rules)
├── Models/           # User, AdminUser, TaskItem
├── Data/             # AppDbContext (EF Core)
└── Program.cs        # DI registration, middleware

workboard-ui/
├── src/api/          # Axios calls (API layer)
├── src/app/          # Redux store
├── src/features/     # taskSlice, userSlice
└── src/components/   # UserSelector, TaskInput, TaskList, TaskItem
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/{id}/complete?userId=1` | Complete a task |
| DELETE | `/api/tasks/{id}` | Delete a task |
| GET | `/api/users` | Get all users |
| POST | `/api/users/seed` | Seed demo users |
