import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authState } from "../state/authAtom";

export default function TodoPage() {
  const setAuth = useSetRecoilState(authState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  
  // Retrieve token from localStorage
  const token = localStorage.getItem("token");
  // 1. GET ALL TODOS
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todo", {
        headers: { token: token }, // Header key must match middleware
      });
      // Backend routes/todo.js returns the array directly
      setTodos(Array.isArray(response.data) ? response.data : response.data.todos || []);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  // 2. CREATE TODO
  const handleAddTodo = async () => {
    if (!title.trim()) return alert("Please enter a title");
    try {
      await axios.post(
        "http://localhost:3000/todo",
        { title, description },
        { headers: { token: token } }
      );
      setTitle("");
      setDescription("");
      fetchTodos(); // Refresh list to see the new item
    } catch (error) {
      alert("Failed to create todo");
    }
  };

  // 3. UPDATE TODO (Toggle Completion)
  const handleToggleComplete = async (todo) => {
    try {
      await axios.put(
        `http://localhost:3000/todo/${todo._id}`,
        { completed: !todo.completed },
        { headers: { token: token } }
      );
      fetchTodos();
    } catch (error) {
      alert("Update failed");
    }
  };

  // 4. DELETE ONE TODO
  const handleDeleteOne = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todo/${id}`, {
        headers: { token: token },
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (e) {
      alert("Delete failed");
    }
  };

  // 5. DELETE ALL TODOS
  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete ALL todos?")) return;
    try {
      await axios.delete("http://localhost:3000/todo", {
        headers: { token: token },
      });
      setTodos([]);
    } catch (e) {
      alert("Clear All failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth({ isAuthenticated: false, token: null });
  };

  return (
    <div className="min-h-screen bg-stone-100 font-serif pb-20">
      <nav className="bg-[#c2bcbc] p-4 flex justify-between items-center px-12 shadow-md mb-8">
        <h1 className="text-2xl font-bold tracking-tighter">Tickit</h1>
        <div className="flex gap-6 items-center">
          <button className="hover:underline font-semibold cursor-pointer">Home</button>
          <button onClick={handleLogout} className="bg-red-900 text-white px-4 py-1 rounded hover:bg-red-700 cursor-pointer transition-colors">Logout</button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-[#d9d9d9] flex flex-col rounded-2xl p-6 border-2 border-gray-300 shadow-lg">
          <input
            type="text"
            placeholder="What needs to be done?"
            className="bg-transparent px-4 py-2 outline-none font-bold text-xl text-black border-b border-gray-400 mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Add a description (optional)..."
            className="px-4 py-2 outline-none text-black resize-none h-24 mb-4 border border-gray-400 rounded-lg bg-gray-50/50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={handleAddTodo}
            className="bg-[#240a0a] text-white py-3 rounded-full font-bold hover:bg-black transition-all active:scale-95 cursor-pointer shadow-md"
          >
            Add to Tickit
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 px-4">
        <div className="bg-[#240a0a] rounded-3xl p-8 text-white shadow-2xl min-h-[400px]">
          <div className="flex justify-between items-center mb-10 border-b border-white/20 pb-4">
            <div className="w-24"></div>
            <h2 className="text-xl tracking-widest uppercase">Your Todos</h2>
            <button 
              onClick={handleDeleteAll}
              className="text-xs bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1 rounded border border-red-500/50 transition-all cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-4">
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <div 
                  key={todo._id} 
                  className={`p-4 rounded-lg flex justify-between items-center transition-all ${todo.completed ? 'bg-gray-600/50 opacity-60' : 'bg-[#d9d9d9]'}`}
                >
                  <div className={`flex flex-col ${todo.completed ? 'text-gray-300' : 'text-black'}`}>
                    <h3 className={`font-bold text-lg ${todo.completed ? 'line-through decoration-2' : ''}`}>
                      {index + 1}. {todo.title}
                    </h3>
                    <p className="text-sm italic opacity-80">{todo.description}</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleToggleComplete(todo)}
                      className={`text-xs px-4 py-2 rounded font-bold cursor-pointer transition-colors ${todo.completed ? 'bg-green-700 text-white' : 'bg-gray-800 text-white hover:bg-green-800'}`}
                    >
                      {todo.completed ? "✓ Done" : "Complete"}
                    </button>
                    <button 
                      onClick={() => handleDeleteOne(todo._id)}
                      className="bg-red-800 text-white text-xs px-4 py-2 rounded hover:bg-red-600 cursor-pointer transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 opacity-30 italic">
                No tasks found. Your Tickit is clear!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}