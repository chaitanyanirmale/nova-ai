import React from 'react'
import { useState } from 'react';
import { signUp } from '../services/authServices';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const data = await signUp(formData);
      setMessage(data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate('/signin')
    } catch (error) {
      setError(
        error.response?.data?.message || "Registration failed"
      );
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">NOVA</h1>
          <p className="mt-2 text-slate-400">
            Start building your future
          </p>
        </div>
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div>
            <label className="block mb-2 text-sm text-slate-300">Name
            </label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"/>
          </div>

          <div>
            <label className="block mb-2 text-sm text-slate-300">Email
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"/>
          </div>

          <div>
            <label className="block mb-2 text-sm text-slate-300">
              Password
            </label>

            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500"/>
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
            Create Account
          </button>

          <p className='text-sm text-center'>Already have an account? <span className='text-blue-500 cursor-pointer' onClick={()=> navigate('/signin')}>Sign in</span></p>
          
        </form>
      </div>
    </div>
  )
}

export default SignUp