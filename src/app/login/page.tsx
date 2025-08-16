"use client";
import { Card } from "@/components/ui/card";
import { LOGIN_USER } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ message?: string }>({});
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError({});
    setLoading(true);
    try {
      const response: {
        loginUser: boolean;
      } = await gqlClient.request(LOGIN_USER, {
        userCred: username,
        password,
      });
      if (response.loginUser) {
        window.location.href = "/";
        toast.success("Login successful");
      } else {
        setError({ message: "Login failed. Please check your credentials." });
      }
    } catch (error) {
      setError({ message: "something went wrong.please try again later." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-indigo-50 to-indigo-900">
      <Card className="w-full max-w-md p-8 shadow-xl rounded-2xl bg-white">
        <h1 className="text-center font-extrabold text-3xl text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mt-2 text-sm">
          Please log in to continue
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username..."
            className="border text-black border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
            className="border text-black border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md transition-all hover:scale-[1.02]"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-indigo-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>

        {error.message && (
          <p className="text-red-600 text-center mt-4 text-sm">
            {error.message}
          </p>
        )}
      </Card>
    </main>
  );
}
