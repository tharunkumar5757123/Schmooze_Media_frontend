import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

export default function SubmitIdea() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitIdea = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("All fields are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await API.post("/ideas", { title, description });
      navigate("/dashboard");
    } catch (err) {
      setError("Submission failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-gray-100 px-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-xl sm:text-3xl font-bold text-center mb-2">
          AI Startup Idea Validator
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Validate your startup idea using AI
        </p>

        {error && (
          <p className="mb-4 text-center text-red-500 font-medium">
            {error}
          </p>
        )}

        <form onSubmit={submitIdea} className="space-y-4">
          <input
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Startup Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />

          <textarea
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Describe your startup idea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Analyzing..." : "Validate Idea"}
          </button>
        </form>
      </div>
    </div>
  );
}
