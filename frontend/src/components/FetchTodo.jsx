import React from "react";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { TbHttpDelete } from "react-icons/tb";
import { GoAlertFill } from "react-icons/go";

function FetchTodo({ todos, refreshTodos, onEdit }) {
  const token = localStorage.getItem("token");
  const BackendApi = import.meta.env.VITE_BACKEND_URL;

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${BackendApi}/delete-todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshTodos(); // 🔄 refresh after delete
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteAllTask = async () => {
    try {
      await axios.delete(`${BackendApi}/delete-all-todo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshTodos(); // 🔄 refresh after delete all
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-center pt-10 px-4">
      <div className="flex justify-between items-center w-[80%]">
        <h2 className="text-3xl text-center font-extrabold uppercase text-cyan-400 mb-6 drop-shadow-lg">
          TODO LIST
        </h2>
        <button
          onClick={deleteAllTask}
          className="flex items-center justify-evenly gap-2 border-1 text-lg text-red-500 shadow-md font-extrabold mb-2 shadow-cyan-800 rounded-lg border-white bg-cyan-400 py-2 px-5 hover:cursor-pointer"
        >
          <GoAlertFill />
          CLEAR
        </button>
      </div>

      {todos.length > 0 ? (
        <ul className="w-full max-w-4xl flex flex-col gap-4">
          {todos.map((task, ind) => (
            <li
              key={ind}
              className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-cyan-500 rounded-xl p-6 shadow-lg shadow-cyan-700 hover:shadow-cyan-400 transition-all duration-300"
            >
              {/* Task Content */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-cyan-400 drop-shadow-md">
                  {task.title}
                </h3>
                <p className="text-sm font-serif text-gray-200">{task.desc}</p>
                <p className="text-xs text-gray-400 italic">
                  {new Date(task.date).toLocaleDateString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-4 items-center text-2xl text-cyan-400">
                <button
                  onClick={() => onEdit(task)}
                  className="p-2 bg-gray-900 rounded-full border border-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
                >
                  <CiEdit />
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="p-2 bg-gray-900 rounded-full border border-cyan-400 hover:bg-red-500 hover:text-black transition-all"
                >
                  <TbHttpDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h4 className="text-center mt-4 text-gray-400 text-lg">
          No Todo's found
        </h4>
      )}
    </div>
  );
}

export default FetchTodo;
