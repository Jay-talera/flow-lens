import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeRepository } from "../api/repositoryApi";

export default function RepositoryPage() {
  const navigate = useNavigate();

  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [importResponse, setImportResponse] = useState(null);
  const [countdown, setCountdown] = useState(5); // ← add this

  // ─── Countdown Timer ─────────────────────
  useEffect(() => {
    if (!importResponse) return;

    // Reset countdown
    setCountdown(5);

    // Count down every second
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Redirect after 5 seconds
    const timeout = setTimeout(() => {
      navigate(
          `/dashboard?repoId=${importResponse.repositoryId}`
      );
    }, 5000);

    // Cleanup
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [importResponse]);

  // ─── Validate GitHub URL ─────────────────
  const isValidUrl = (url) => {
    const pattern =
        /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/;
    return pattern.test(url.trim());
  };

  // ─── Handle Enter Key ────────────────────
  const handleKeyDown = (e) => {
    if (
        e.key === "Enter" &&
        !loading &&
        repositoryUrl &&
        isValidUrl(repositoryUrl)
    ) {
      handleAnalyze();
    }
  };

  // ─── Handle Analyze ──────────────────────
  const handleAnalyze = async () => {
    if (!isValidUrl(repositoryUrl)) {
      setError(
          "Please enter a valid GitHub URL. " +
          "Example: https://github.com/owner/repository"
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setImportResponse(null);

      const response = await analyzeRepository(
          repositoryUrl
      );

      setImportResponse(response);

    } catch (err) {
      setError(
          err?.response?.data?.message ||
          "Failed to analyze repository. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ─── Handle Reset ────────────────────────
  const handleReset = () => {
    setRepositoryUrl("");
    setError("");
    setImportResponse(null);
    setCountdown(5);
  };

  return (
      <div className="max-w-2xl mx-auto mt-24 px-4">

        {/* ── Header ── */}
        <h1 className="text-4xl font-bold mb-2">
          FlowLens
        </h1>
        <p className="text-slate-600 mb-8">
          Analyze GitHub Actions workflows and
          discover CI/CD bottlenecks.
        </p>

        {/* ── Form Card ── */}
        <div className="bg-white rounded-xl shadow p-6">

          <label className="block mb-2 font-medium">
            GitHub Repository URL
          </label>

          {/* ── Input ── */}
          <input
              type="text"
              value={repositoryUrl}
              onChange={(e) => {
                setRepositoryUrl(e.target.value);
                setError("");
              }}
              onKeyDown={handleKeyDown}
              placeholder="https://github.com/owner/repository"
              disabled={loading}
              className={`w-full border rounded-lg p-3
                      transition-colors outline-none
                      focus:ring-2 focus:ring-indigo-500
                      disabled:bg-gray-50
                      disabled:cursor-not-allowed
                      ${error
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
          />

          {/* ── URL hint ── */}
          <p className="text-xs text-slate-400 mt-1">
            Example: https://github.com/facebook/react
          </p>

          {/* ── Buttons ── */}
          <div className="flex gap-3 mt-4">

            <button
                onClick={handleAnalyze}
                disabled={loading || !repositoryUrl}
                className="flex-1 bg-slate-900 text-white
                       px-6 py-3 rounded-lg
                       disabled:opacity-50
                       disabled:cursor-not-allowed
                       hover:bg-slate-700
                       transition-colors
                       flex items-center justify-center gap-2"
            >
              {loading && (
                  <div className="w-4 h-4 border-2
                              border-white
                              border-t-transparent
                              rounded-full animate-spin"
                  />
              )}
              {loading ? "Analyzing..." : "Analyze Repository"}
            </button>

            {(repositoryUrl || error) && !loading && (
                <button
                    onClick={handleReset}
                    className="px-4 py-3 rounded-lg
                         border border-gray-300
                         text-gray-600
                         hover:bg-gray-50
                         transition-colors"
                >
                  Clear
                </button>
            )}

          </div>

          {/* ── Loading Progress ── */}
          {loading && (
              <div className="mt-4 rounded-lg
                          bg-indigo-50
                          border border-indigo-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2
                              border-indigo-500
                              border-t-transparent
                              rounded-full animate-spin
                              flex-shrink-0"
                  />
                  <div>
                    <p className="text-indigo-700
                               font-medium text-sm">
                      Analyzing repository...
                    </p>
                    <p className="text-indigo-500 text-xs mt-0.5">
                      Fetching GitHub Actions workflows.
                      This may take a moment.
                    </p>
                  </div>
                </div>
              </div>
          )}

          {/* ── Error ── */}
          {error && (
              <div className="mt-4 rounded-lg
                          border border-red-200
                          bg-red-50 p-4">
                <div className="flex items-start gap-2">
              <span className="text-red-500 text-lg
                               leading-none flex-shrink-0">
                ✕
              </span>
                  <p className="text-red-600 text-sm">
                    {error}
                  </p>
                </div>
              </div>
          )}

          {/* ── Success Card ── */}
          {importResponse && (
              <div className="mt-6 rounded-xl
                          border border-green-200
                          bg-green-50 p-5">

                {/* Success Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full
                              bg-green-500
                              flex items-center
                              justify-center
                              flex-shrink-0">
                <span className="text-white text-xs">
                  ✓
                </span>
                  </div>
                  <h3 className="font-semibold text-green-800">
                    Repository Imported Successfully
                  </h3>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 text-sm">

                  <div>
                    <p className="text-slate-500">Repository</p>
                    <p className="font-medium truncate"
                       title={importResponse.repositoryName}>
                      {importResponse.repositoryName}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Workflow Runs</p>
                    <p className="font-medium">
                      {importResponse.workflowRunsImported}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Pipeline Steps</p>
                    <p className="font-medium">
                      {importResponse.pipelineStepsImported}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Successful Runs</p>
                    <p className="font-medium text-green-700">
                      {importResponse.successfulRuns}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Failed Runs</p>
                    <p className="font-medium text-red-600">
                      {importResponse.failedRuns}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Success Rate</p>
                    <p className="font-medium text-green-700">
                      {importResponse.successRate.toFixed(2)}%
                    </p>
                  </div>

                </div>

                {/* ── Countdown Redirect ── */}
                <div className="mt-4 flex items-center
                            justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2
                                border-green-500
                                border-t-transparent
                                rounded-full animate-spin"
                    />
                    <p className="text-sm text-slate-600">
                      Redirecting to dashboard in
                      <span className="font-bold
                                   text-green-700 mx-1">
                    {countdown}
                  </span>
                      seconds...
                    </p>
                  </div>

                  {/* Go now button */}
                  <button
                      onClick={() =>
                          navigate(
                              `/dashboard?repoId=${importResponse.repositoryId}`
                          )
                      }
                      className="text-sm text-indigo-600
                           hover:text-indigo-800
                           font-medium
                           transition-colors"
                  >
                    Go now →
                  </button>
                </div>

              </div>
          )}

        </div>

      </div>
  );
}