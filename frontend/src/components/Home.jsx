import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { GiCrossedBones } from "react-icons/gi";
import FetchTodo from "./FetchTodo";

function Home() {
  const token = localStorage.getItem("token");
  const BackendApi = import.meta.env.VITE_BACKEND_URL;

  const [todos, setTodos] = useState([]);
  const [getWork, setWork] = useState({
    title: "",
    desc: "",
    tags: "",
    date: "",
  });

  const [isOpen, setIsopen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  // 🔄 Fetch all todos
  const refreshTodos = async () => {
    try {
      const res = await axios.get(`${BackendApi}/get-all-todo`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data.todo || []);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const handleChange = (e) => {
    setWork({
      ...getWork,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      if (isEditing) {
        await axios.post(`${BackendApi}/edit-todo/${editId}`, getWork, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("✨ Task updated successfully!");
      } else {
        const res = await axios.post(`${BackendApi}/create-todo`, getWork, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("✅ " + res.data.message);
      }

      setWork({ title: "", desc: "", tags: "", date: "" });
      setIsopen(false);
      setIsEditing(false);
      setEditId(null);

      refreshTodos(); // 🔄 Refresh after add/edit
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Something went wrong");
      console.log(error);
    }
  };

  const handleEdit = (task) => {
    setWork({
      title: task.title,
      desc: task.desc,
      tags: task.tags || "",
      date: task.date.split("T")[0],
    });
    setEditId(task._id);
    setIsEditing(true);
    setIsopen(true);
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 min-h-screen flex flex-col items-center">
      {/* Todo List */}
      <div
        className={`w-full flex justify-center pt-12 ${
          isOpen ? "blur-sm" : ""
        } transition-all duration-300`}
      >
        <div className="w-[85%] max-w-5xl">
          <h1 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wide drop-shadow-lg">
            🎮 My Quest Board
          </h1>
          <FetchTodo
            todos={todos}
            refreshTodos={refreshTodos}
            onEdit={handleEdit}
          />
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => {
          setIsopen(true);
          setIsEditing(false);
          setWork({ title: "", desc: "", tags: "", date: "" });
        }}
        className="p-5 border-4 border-purple-400 rounded-full 
        text-white bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400
        shadow-[0_0_20px_rgba(168,85,247,0.7)]
        font-bold text-sm fixed bottom-10 right-10
        hover:scale-110 hover:shadow-[0_0_30px_rgba(236,72,153,0.9)]
        transition-all duration-300"
      >
        + Add Quest
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
            onClick={() => setIsopen(false)}
          ></div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col gap-5 bg-gradient-to-br from-gray-800 to-gray-900 
            text-white rounded-2xl w-[90%] max-w-lg p-10 shadow-2xl z-10 border border-purple-500/30"
          >
            {/* Close button */}
            <div className="absolute right-5 top-4">
              <GiCrossedBones
                className="text-gray-300 text-xl hover:text-red-500 hover:scale-110 transition-all cursor-pointer"
                onClick={() => setIsopen(false)}
              />
            </div>

            {/* Title */}
            <input
              type="text"
              name="title"
              placeholder="🎯 Quest Title"
              value={getWork.title}
              onChange={handleChange}
              className="p-3 rounded-lg outline-none text-gray-100 bg-gray-700/60 border border-gray-600 focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
            />

            {/* Description */}
            <textarea
              name="desc"
              placeholder="📜 Quest Description"
              value={getWork.desc}
              onChange={handleChange}
              className="p-3 rounded-lg outline-none text-gray-100 bg-gray-700/60 border border-gray-600 focus:ring-2 focus:ring-purple-400 placeholder-gray-400 resize-none"
              rows={4}
            />

            {/* Tags */}
            <select
              name="tags"
              value={getWork.tags}
              onChange={handleChange}
              className="p-3 rounded-lg outline-none text-gray-100 bg-gray-700/60 border border-gray-600 focus:ring-2 focus:ring-purple-400"
            >
              <option value="">🏷️ Select Tag</option>
              <option value="important">🔥 Important</option>
              <option value="urgent">⚡ Urgent</option>
              <option value="normal">🌱 Normal</option>
            </select>

            {/* Date */}
            <input
              type="date"
              min={today}
              name="date"
              value={getWork.date}
              onChange={handleChange}
              className="p-3 rounded-lg outline-none text-gray-100 bg-gray-700/60 border border-gray-600 focus:ring-2 focus:ring-purple-400"
            />

            {/* Submit */}
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 
              text-black font-extrabold px-6 py-3 rounded-xl 
              shadow-[0_0_20px_rgba(236,72,153,0.8)]
              hover:scale-105 hover:shadow-[0_0_30px_rgba(250,204,21,0.9)]
              transition-all duration-300"
            >
              {isEditing ? "⚔️ Update Quest" : "🪄 Add Quest"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Home;
