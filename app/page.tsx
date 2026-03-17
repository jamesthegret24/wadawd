"use client";

import { useState } from "react";
import { Cake, User, Key, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function Home() {
  const [userId, setUserId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/update-birthday", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, apiKey }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Birthday successfully updated to 1/21/2015!");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to update birthday. Please check your credentials and try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-4">
            <Cake className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-center">Roblox Birthday Updater</h1>
          <p className="text-neutral-400 text-sm text-center mt-2">
            Update your account birthday to 1/21/2015 using Roblox Open Cloud
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              User ID
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="e.g. 12345678"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              API Key
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                required
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Roblox API Key"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Birthday"
            )}
          </button>
        </form>

        {status !== "idle" && (
          <div className={`mt-6 p-4 rounded-lg flex items-start gap-3 ${
            status === "success" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : 
            status === "error" ? "bg-rose-500/10 border border-rose-500/20 text-rose-400" : ""
          }`}>
            {status === "success" ? (
              <CheckCircle className="w-5 h-5 shrink-0" />
            ) : status === "error" ? (
              <AlertCircle className="w-5 h-5 shrink-0" />
            ) : null}
            <p className="text-sm">{message}</p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-neutral-800">
          <h2 className="text-sm font-semibold text-neutral-300 mb-3">How to use:</h2>
          <ol className="text-xs text-neutral-500 space-y-2 list-decimal ml-4">
            <li>Go to the <a href="https://create.roblox.com/dashboard/credentials" className="text-blue-500 hover:underline">Roblox Creator Dashboard</a>.</li>
            <li>Create an API Key with the <strong>"Accounts"</strong> permission enabled.</li>
            <li>Copy your User ID from your profile URL.</li>
            <li>Enter both above and click Update.</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
