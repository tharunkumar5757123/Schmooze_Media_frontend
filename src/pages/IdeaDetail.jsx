import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api";

export default function IdeaDetail() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const res = await API.get(`/ideas/${id}`);
        setIdea(res.data);
      } catch (err) {
        setError("Failed to load idea details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdea();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading idea...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!idea) return null;

  const analysis = idea.analysis || {};

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white max-w-3xl mx-auto p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">{idea.title}</h2>

        <p className="mb-2">
          <span className="font-semibold">Problem:</span>{" "}
          {analysis.problem || "N/A"}
        </p>

        <p className="mb-2">
          <span className="font-semibold">Customer:</span>{" "}
          {analysis.customer || "N/A"}
        </p>

        <p className="mb-2">
          <span className="font-semibold">Market:</span>{" "}
          {analysis.market || "N/A"}
        </p>

        <div className="mt-4">
          <p className="font-semibold">Competitors:</p>
          {analysis.competitor?.length ? (
            <ul className="list-disc ml-6 mt-1">
              {analysis.competitor.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">None listed</p>
          )}
        </div>

        <p className="mt-3">
          <span className="font-semibold">Tech Stack:</span>{" "}
          {analysis.tech_stack?.join(", ") || "N/A"}
        </p>

        <p className="mt-3">
          <span className="font-semibold">Risk Level:</span>{" "}
          <span
            className={`px-2 py-1 rounded text-sm font-medium ${
              analysis.risk_level === "High"
                ? "bg-red-200 text-red-800"
                : analysis.risk_level === "Medium"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {analysis.risk_level || "N/A"}
          </span>
        </p>

        <p className="mt-3">
          <span className="font-semibold">Profitability Score:</span>{" "}
          <span className="font-bold text-green-600">
            {analysis.profitability_score ?? "N/A"}
          </span>
        </p>

        <p className="mt-4">
          <span className="font-semibold">Justification:</span>{" "}
          {analysis.justification || "N/A"}
        </p>
      </div>
    </div>
  );
}
