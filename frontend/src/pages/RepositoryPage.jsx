import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeRepository } from "../api/repositoryApi";

export default function RepositoryPage() {
  const navigate = useNavigate();

  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [importResponse, setImportResponse] = useState(null);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await analyzeRepository(
        repositoryUrl
      );

      setImportResponse(response);

      // Show success card for 2 seconds
      setTimeout(() => {
        navigate(
          `/dashboard?repoId=${response.repositoryId}`
        );
      }, 2000);

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Failed to analyze repository."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-24">

      <h1 className="text-4xl font-bold mb-4">
        FlowLens
      </h1>

      <p className="text-slate-600 mb-8">
        Analyze GitHub Actions workflows and
        discover CI/CD bottlenecks.
      </p>

      <div className="bg-white rounded-xl shadow p-6">

        <label className="block mb-2 font-medium">
          GitHub Repository URL
        </label>

        <input
          type="text"
          value={repositoryUrl}
          onChange={(e) =>
            setRepositoryUrl(e.target.value)
          }
          placeholder="https://github.com/owner/repository"
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={handleAnalyze}
          disabled={loading || !repositoryUrl}
          className="mt-4 bg-slate-900 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {loading
            ? "Analyzing..."
            : "Analyze Repository"}
        </button>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-red-600">
              {error}
            </p>
          </div>
        )}

        {importResponse && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">

            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-600 text-xl">
                ✓
              </span>

              <h3 className="font-semibold text-green-800">
                Repository Imported Successfully
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">

              <div>
                <p className="text-slate-500">
                  Repository
                </p>
                <p className="font-medium">
                  {importResponse.repositoryName}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Workflow Runs
                </p>
                <p className="font-medium">
                  {importResponse.workflowRunsImported}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Pipeline Steps
                </p>
                <p className="font-medium">
                  {importResponse.pipelineStepsImported}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Successful Runs
                </p>
                <p className="font-medium text-green-700">
                  {importResponse.successfulRuns}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Failed Runs
                </p>
                <p className="font-medium text-red-600">
                  {importResponse.failedRuns}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Success Rate
                </p>
                <p className="font-medium text-green-700">
                  {importResponse.successRate.toFixed(2)}%
                </p>
              </div>

            </div>

            <p className="mt-4 text-sm text-slate-600">
              Redirecting to dashboard...
            </p>

          </div>
        )}

      </div>

    </div>
  );
}