import { useState } from "react";
import './App.css';

type Task = {
  completed: boolean;
  id: string;
  title: string;
};

function Tasks() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  function onSaveTask(event?: React.FormEvent<HTMLFormElement>) {
    if (event) event.preventDefault();
    if (!input.trim()) return;
    setTasks([
      ...tasks,
      { completed: false, id: crypto.randomUUID(), title: input },
    ]);
    setInput("");
  }


  function completeTask({ id }: Task) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      })
    );
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="app-container">
      <form className="text-and-button-fields" onSubmit={onSaveTask}>
        <input
          className="p-2 border-1"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="rounded p-2 bg-black" type="submit">
          Add
        </button>
      </form>
      <ul className="tasks-list">
        {tasks.length === 0 ? (
          <span style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '16px' }}>No tasks yet</span>
        ) : (
          tasks.map((task) => {
            return (
              <li
                className={`task-card${task.completed ? " task-completed" : ""}`}
                key={task.id}
              >
                <span className="task-title">{task.title}</span>
                <div className="task-actions">
                  <button className="task-btn task-btn-check" onClick={() => completeTask(task)}>V</button>
                  <button className="task-btn task-btn-x" onClick={() => deleteTask(task.id)}>X</button>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default function Pomodoro() {
  return (
    <div className="h-screen w-screen text-white">
      <h1 className="pomodoro-title">Tasks</h1>

      <Tasks />
    </div>
  );
}
