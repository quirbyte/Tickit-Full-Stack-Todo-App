import axios from "axios";
import { authState } from "../state/authAtom";
import { useSetRecoilState } from "recoil";
import { useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useSetRecoilState(authState);
  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        email: email,
        password: password,
      });
      alert(response.data.msg);
    } catch (error) {
      if (error.response) {
        console.log("Backend Error:", error.response.data);
        alert(
          error.response.data.msg || "Check your email/password requirements"
        );
      } else {
        alert("Cannot connect to server");
      }
    }
  };
  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:3000/user/signin", {
        email: email,
        password: password,
      });

      const token = response.data.token;

      if (token) {
        setAuth({
          isAuthenticated: true,
          token: token,
        });
        localStorage.setItem("token", token);
        alert("Logged in successfully!");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg || "Invalid Credentials");
      } else {
        alert("Server Error");
      }
    }
  };
  return (
    <div>
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="bg-[#0a0505] p-10 rounded-3xl shadow-xl text-white w-full max-w-lg">
          <h1 className="text-center text-3xl font-bold mb-8">Tickit</h1>

          <div className="space-y-6">
            {/* Email Row */}
            <div className="flex items-center">
              <label className="w-1/3 text-lg font-semibold">Email :</label>
              <input
                className="w-2/3 bg-gray-300 rounded-lg p-2 text-black"
                placeholder="Enter your email here"
                value={email} // Controlled Component
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Row */}
            <div className="flex items-center">
              <label className="w-1/3 text-lg font-semibold">Password :</label>
              <input
                className="w-2/3 bg-gray-300 rounded-lg p-2 text-black"
                placeholder="Enter your password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Buttons Row */}
            <div className="flex justify-between gap-4 pt-4">
              <button
                onClick={handleSignUp}
                className="flex-1 bg-blue-700 hover:bg-blue-300 py-3 rounded-xl font-bold cursor-pointer"
              >
                Sign Up
              </button>
              <button
                onClick={handleSignIn}
                className="flex-1 bg-blue-700 hover:bg-blue-300 py-3 rounded-xl font-bold cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
