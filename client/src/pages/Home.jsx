import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/styles.scss";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Fetch all tasks from the backend
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debugging

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new task and refetch the task list
  const addTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("Token before adding task:", token); // Debugging

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/tasks/add",
        { title, date, time },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      fetchTasks(); // Fetch updated tasks
      setTitle("");
      setDate("");
      setTime("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.filter((task) => task._id !== id)); // Update UI
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="task-form">
        <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className="no-task">No tasks available. Add some tasks to get started!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <div>
                <strong>{task.title}</strong> <br />
                {task.date} at {task.time}
              </div>
              <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
