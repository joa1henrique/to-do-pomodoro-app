import { useState } from "react";

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
    <div className="app-container flex flex-col gap-8 rounded-[8px] items-center justify-center">
      <form className="text-and-button-fields flex justify-center items-center gap-3 mb-4" onSubmit={onSaveTask}>
        <input
          className="h-10 w-[300px] rounded-[10px] px-3 border-2 border-slate-200 text-white bg-slate-800 text-base focus:outline-none"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="h-10 w-[60px] rounded-[10px] bg-slate-200 text-[#222] hover:bg-slate-300 transition" type="submit">
          Add
        </button>
      </form>
      <ul className="tasks-list flex flex-col items-center w-full">
        {tasks.length === 0 ? (
          <span className="text-slate-400 text-lg mt-4">No tasks yet</span>
        ) : (
          tasks.map((task) => {
            return (
              <li
                className={`task-card flex items-center justify-between min-w-[280px] w-full bg-[#0d1321] rounded-[10px] shadow-md p-[16px_20px] mb-4 transition-shadow ${task.completed ? 'task-completed bg-[#25322f]' : ''}`}
                key={task.id}
              >
                <span className={`task-title text-[1.1rem] ${task.completed ? 'text-slate-100' : 'text-slate-100'}`}>{task.title}</span>
                <div className="task-actions flex gap-2">
                  <button
                    className="task-btn task-btn-check border-2 border-slate-200 rounded-[6px] h-8 w-8 flex items-center justify-center text-slate-200 bg-transparent hover:bg-emerald-500 transition text-base cursor-pointer"
                    onClick={() => completeTask(task)}
                  >V</button>
                  <button
                    className="task-btn task-btn-x border-2 border-slate-200 rounded-[6px] h-8 w-8 flex items-center justify-center text-slate-200 bg-transparent hover:bg-red-500 transition text-base cursor-pointer"
                    onClick={() => deleteTask(task.id)}
                  >X</button>
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
    <div className="min-h-screen w-full text-white bg-[#0f172a] flex flex-col items-center">
      <h1 className="pomodoro-title font-bold text-[2.5rem] tracking-wide mt-[10vh] mb-6 text-center drop-shadow">Tasks</h1>
      <Tasks />
    </div>
  );
}
