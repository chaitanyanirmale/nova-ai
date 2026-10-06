import { useEffect, useState } from "react";
import { createGoal, deleteGoal, getGoals, updateGoal } from "../services/authServices";
import Navbar from "../components/Navbar";
import { generateRoadmap } from "../services/aiServices";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate()
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalForm, setGoalForm] = useState({
    title: "",
    description: "",
  });
  const [goalError, setGoalError] = useState("");
  
  const handleGoalChange = (e) => {
    setGoalForm({
      ...goalForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    setGoalError("");
    try {
      const data = await createGoal(goalForm);
      setGoals((currentGoals) => [
        data.goal,
        ...currentGoals,
      ]);
      setGoalForm({
        title: "",
        description: "",
      });
      setShowGoalModal(false);
    } catch (error) {
      console.error("Create goal error:", error);
      setGoalError(error.response?.data?.message ||"Failed to create goal");
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const  goalsData = await getGoals();
        setGoals(goalsData.goals);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };
    loadDashboard();
  }, []);

  const activeGoals = goals.filter(
    (goal) => goal.status === "active"
  ).length;

  const completedGoals = goals.filter(
    (goal) => goal.status === "completed"
  ).length;

  const handleToggleGoal = async (goal) => {
    try {
      const newStatus =
        goal.status === "active" ? "completed" : "active";
      const data = await updateGoal(goal._id, {
        status: newStatus,
      });

      setGoals((currentGoals) =>
        currentGoals.map((item) =>
          item._id === goal._id ? data.goal : item
        )
      );
    } catch (error) {
      console.error("Update goal error:", error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await deleteGoal(goalId);
      setGoals((currentGoals) =>
        currentGoals.filter(
          (goal) => goal._id !== goalId
        )
      );
    } catch (error) {
      console.error("Delete goal error:", error);
    }
  };

  const handleGenerateRoadmap = async (goalId) => {
    try {
      const data = await generateRoadmap(goalId);
      console.log("Generated roadmap:", data.roadmap);
      alert("Roadmap generated successfully!");
    } catch (error) {
      console.error("Generate roadmap error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to generate roadmap"
      );
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">
            Your Dashboard
          </h2>
          <p className="mt-2 text-slate-400">
            Turn your goals into actionable progress.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">
              Active Goals
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {activeGoals}
            </h3>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">
              Tasks Completed
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {completedGoals}
            </h3>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="text-slate-400">
              Total Goals
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {goals.length}
            </h3>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold">
              Your Goals
            </h2>
            <button onClick={() => setShowGoalModal(true)} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-medium transition">
              + New Goal
            </button>
          </div>
          {goals.length === 0 ? (
            <div className="border border-dashed border-slate-700 rounded-2xl p-10 text-center">
              <h3 className="text-lg font-semibold">
                No goals yet
              </h3>
              <p className="text-slate-400 mt-2">
                Create your first goal and let NOVA build your roadmap.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => (
                <div key={goal._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold">
                      {goal.title}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">
                      {goal.status}
                    </span>
                  </div>
                  <p className="text-slate-400 mt-3 text-sm">
                    {goal.description || "No description"}
                  </p>
                  <div className="flex gap-2 mt-2 sm:grid grid-cols-2 items-start">
                    <button onClick={() => handleToggleGoal(goal)} className="px-3 py-2 rounded-sm bg-blue-700 hover:bg-blue-600 font-semibold text-sm transition" >
                      {goal.status === "active" ? "Complete" : "Mark Active"}
                    </button>
                    <button onClick={() => handleDeleteGoal(goal._id)} className="px-3 py-2 rounded-sm bg-red-600 text-white hover:bg-red-700 font-semibold text-sm transition" >
                      Delete
                    </button>
                    <button onClick={() => handleGenerateRoadmap(goal._id)} className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium hover:bg-purple-500 transition" >
                      Generate Roadmap
                    </button>
                    <button onClick={() => navigate(`/roadmap/${goal._id}`)} className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium hover:bg-slate-700 transition">
                      View Roadmap
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showGoalModal && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50">
              <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    Create New Goal
                  </h2>
                  <button onClick={() => setShowGoalModal(false)} className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <form onSubmit={handleCreateGoal} className="space-y-5">
                  <div>
                    <label className="block mb-2 text-sm text-slate-300">
                      Goal Title
                    </label>
                    <input type="text" name="title" value={goalForm.title} onChange={handleGoalChange} placeholder="e.g. Become a MERN Stack Developer" className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500" required/>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm text-slate-300">
                      Description
                    </label>
                    <textarea name="description" value={goalForm.description} onChange={handleGoalChange} placeholder="Describe what you want to achieve..."
                      rows="4" className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-blue-500 resize-none" />
                  </div>
                  {goalError && (
                    <p className="text-sm text-red-400">
                      {goalError}
                    </p>
                  )}
                  <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => setShowGoalModal(false)} className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition" >
                      Cancel
                    </button>

                    <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition font-medium">Create Goal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;