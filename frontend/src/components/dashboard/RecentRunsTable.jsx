export default function RecentRunsTable({
  data
}) {

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-lg font-semibold mb-4">
        Recent Pipeline Runs
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Workflow
              </th>

              <th className="text-left py-3">
                Branch
              </th>

              <th className="text-left py-3">
                Status
              </th>

              <th className="text-left py-3">
                Duration
              </th>

              <th className="text-left py-3">
                Started
              </th>

            </tr>

          </thead>

          <tbody>

            {data.map((run) => (

              <tr
                key={run.runId}
                className="border-b hover:bg-slate-50"
              >

                <td className="py-3">
                  {run.workflowName}
                </td>

                <td className="py-3">
                  {run.branch}
                </td>

                <td className="py-3">

                  <span
                    className={
                      run.conclusion === "success"
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {run.conclusion}
                  </span>

                </td>

                <td className="py-3">
                  {Math.round(
                    run.durationMs / 1000
                  )}s
                </td>

                <td className="py-3">
                  {new Date(
                    run.startTime
                  ).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}