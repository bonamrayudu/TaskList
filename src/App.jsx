import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState({
    Tasklist: false,
    Tasks: false,
    completeTask: false,
  });

  const [Tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState(null);

  function toggleSection(section) {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function addTask(task) {
    setTasks((prev) => [...prev, { ...task, complete: false, id: Date.now() }]);
  }

  function deleteTask(id) {
    setTasks(Tasks.filter((task) => task.id !== id));
  }

  function CompletedTask(id) {
    setTasks(
      Tasks.map((task) =>
        task.id === id ? { ...task, complete: true } : task,
      ),
    );
  }

  const activeTasks = Tasks.filter((task) => !task.complete);
  const completeTasks = Tasks.filter((task) => task.complete);

  // sorting logic
  let sortedTasks = [...activeTasks];

  if (sortBy === "date") {
    sortedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  }

  if (sortBy === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };

    sortedTasks.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
    );
  }

  return (
    <div className="app">
      <div className="task-container">
        <h1>Task list with priority</h1>
        <button
          className={`close-button ${isOpen.Tasklist ? "open" : ""}`}
          onClick={() => toggleSection("Tasklist")}
        >
          +
        </button>
        {isOpen.Tasklist && <TaskForm addTask={addTask} />}
      </div>

      <div className="task-container">
        <h2>Tasks</h2>
        <button
          className={`close-button ${isOpen.Tasks ? "open" : ""}`}
          onClick={() => toggleSection("Tasks")}
        >
          +
        </button>

        <div className="sort-controls">
          <button className="sort-button" onClick={() => setSortBy("date")}>
            By Date
          </button>

          <button className="sort-button" onClick={() => setSortBy("priority")}>
            By Priority
          </button>
        </div>

        {isOpen.Tasks && (
          <TaskList
            activeTasks={sortedTasks}
            deleteTask={deleteTask}
            CompletedTask={CompletedTask}
          />
        )}
      </div>

      <div className="completed-task-container">
        <h2>completed Task</h2>
        <button
          className={`close-button ${isOpen.completeTask ? "open" : ""}`}
          onClick={() => toggleSection("completeTask")}
        >
          +
        </button>

        {isOpen.completeTask && (
          <CompleteTaskList
            completeTasks={completeTasks}
            deleteTask={deleteTask}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() && deadline) {
      addTask({
        title: title.trim(),
        priority,
        deadline,
      });

      setTitle("");
      setPriority("Low");
      setDeadline("");
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Task title"
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />

      <button type="submit">Add task</button>
    </form>
  );
}

function TaskList({ activeTasks, deleteTask, CompletedTask }) {
  return (
    <ul className="task-list">
      {activeTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          CompletedTask={CompletedTask}
        />
      ))}
    </ul>
  );
}

function CompleteTaskList({ completeTasks, deleteTask }) {
  return (
    <ul className="complete-task-list">
      {completeTasks.map((task) => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

function TaskItem({ task, deleteTask, CompletedTask }) {
  return (
    <li className="task-item">
      <div className="task-info">
        <div>
          {task.title} <strong>{task.priority}</strong>
        </div>

        <div className="task-deadline">
          Due: {new Date(task.deadline).toLocaleString()}
        </div>
      </div>

      <div className="task-buttons">
        {!task.complete && (
          <button
            className="complete-button"
            onClick={() => CompletedTask(task.id)}
          >
            complete
          </button>
        )}

        <button className="delete-button" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        Technologies and React concepts used: React, JSX, props, useState,
        component composition, conditional rendering, array methods (map,
        filter), event handling and error hanling. and you can check the git
        commands nsdguagfuew hsadgashdA jgdusdsd
      </p>
    </footer>
  );
}

export default App;
