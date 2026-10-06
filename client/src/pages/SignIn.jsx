import React, { useState } from 'react'
import { signIn } from '../services/authServices';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    try {
      const data = await signIn(formData);
      localStorage.setItem("nova_token", data.token);
      setMessage("Login successful");
      console.log("Logged in user:", data.user);
      navigate('/dashboard')
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">NOVA</h1>
          <p className="mt-2 text-slate-400">
            Welcome back
          </p>
        </div>
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5" >
          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Email
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Password
            </label>

            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500" />
          </div>

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          {message && (
            <p className="text-sm text-green-400">
              {message}
            </p>
          )}

          <button type="submit" className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 py-3 font-semibold transition">
            Login
          </button>
          <p className='text-sm text-center'>Don't have an account? <span className='text-blue-500 cursor-pointer' onClick={()=> navigate('/signup')}>Sign up</span></p>
        </form>
      </div>
    </div>
  );
}

export default SignIn