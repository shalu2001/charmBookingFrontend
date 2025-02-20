import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";

export default function Login() {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');
  const [subLoading, setSubLoading] = useState(false);

  const handleLogin = async () => {
    setSubLoading(true);
    setError('');
    try {
      if (!formData.identifier || !formData.password) {
        throw new Error('Both fields are required');
      }
      const res = await axios.post('http://localhost:3000/api/login', formData);
      if (res.status === 200) {
        alert("Login successful");
        // Handle successful login (e.g., redirect to dashboard)
      }
    } catch (error: unknown) {
      // Handle Axios errors separately from other errors
      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.error?.message || 'An error occurred';
        setError(backendMessage);
      } else if (error instanceof Error) {
        // Handle other errors
        setError(error.message);
      } else {
        // Fallback for any other unknown error types
        setError('An unknown error occurred');
      }
    } finally {
      setSubLoading(false); // Stop loading spinner
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear the error state
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full p-5 flex items-center justify-center">
        <div className="w-5/6 text-center mx-50 my-10 bg-white shadow-xl rounded-3xl py-8 px-5">
          <div className="text-center text-primary font-extrabold text-5xl mb-10">
            <h1>Login</h1>
          </div>
          <div className="flex flex-col gap-4 space-y-3 mr-6 ml-6">
            <Input
              type="text"
              label="Email or Username"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {error && <p className="text-red-600 font-light text-sm">{error}</p>}
          </div>
            <>
              <p className="mt-5">
                <a href="/signup" className="text-blue-400">
                  Don't have an account? Sign Up
                </a>
              </p>
              <Button
                onClick={handleLogin}
                color="secondary"
                radius="lg"
                variant="shadow"
                className="mt-5 text-center"
              >
                {subLoading ? <Spinner color="white" size="sm" /> : 'Login'}

              </Button>
            </>
        </div>
      </div>
      <div className="w-1/2 h-full">
        <img className="object-cover w-full h-full" src="signup-drawing.avif" alt="Login Illustration" />
      </div>
    </div>
  );
}