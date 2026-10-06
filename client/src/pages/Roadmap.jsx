import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2, Circle, ArrowLeft } from "lucide-react";

import { getRoadmap } from "../services/roadmap.service"

function Roadmap() {
  const { goalId } = useParams();

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const data = await getRoadmap(goalId);
        setRoadmap(data.roadmap);
      } catch (error) {
        console.error("Fetch roadmap error:", error);
        setError(
          error.response?.data?.message ||
            "Failed to load roadmap"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [goalId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">
          Loading roadmap...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!roadmap) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="mb-10">
          <p className="text-sm text-purple-400 font-medium mb-2">
            NOVA ROADMAP
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            {roadmap.title}
          </h1>

          <p className="mt-4 text-slate-400 max-w-2xl">
            {roadmap.summary}
          </p>
        </div>

        <div className="space-y-5">
          {roadmap.steps.map((step) => (
            <div
              key={step._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
            >
              <div className="flex gap-4">

                <div className="pt-1">
                  {step.completed ? (
                    <CheckCircle2
                      className="text-green-400"
                      size={24}
                    />
                  ) : (
                    <Circle
                      className="text-slate-600"
                      size={24}
                    />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-purple-400 font-medium">
                      Step {step.order}
                    </span>

                    {step.completed && (
                      <span className="text-xs text-green-400">
                        Completed
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-semibold mt-2">
                    {step.title}
                  </h2>

                  <p className="text-slate-400 mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Roadmap;