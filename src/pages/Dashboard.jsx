import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../api";

export default function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await API.get("/ideas");
        setIdeas(res.data);
      } catch (err) {
        setError("Failed to load ideas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading ideas...</p>
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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Submitted Ideas
      </h2>

      {ideas.length === 0 ? (
        <p className="text-center text-gray-500">
          No ideas submitted yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {ideas.map((idea) => (
            <Link
              key={idea._id}
              to={`/ideas/${idea._id}`}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <h3 className="font-bold text-lg mb-1">
                {idea.title}
              </h3>

              <p className="text-gray-500 text-sm line-clamp-2">
                {idea.description}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Score
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {idea.analysis?.profitability_score ?? "N/A"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
