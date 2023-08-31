"use client";
import { QueryServerResponse } from "@/app/types/types";
import LoadingSpinner from "@/components/loading-spinner";
import React from "react";

const executeQuery = async (query: string): Promise<QueryServerResponse> => {
  const response = await fetch("/api/testarea", {
    method: "POST",
    body: JSON.stringify({ query }),
  });
  return await response.json();
};

const initialServerResposneState = { error: null, resultSet: [], solved: null };

export default function TestAreaPage() {
  const [isLoading, setLoading] = React.useState(false);
  const [serverResposne, setServerResponse] =
    React.useState<QueryServerResponse>(initialServerResposneState);

  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const headers = Array.from(
    new Set(serverResposne.resultSet.flatMap((obj) => Object.keys(obj))),
  );

  const onClick = async () => {
    setLoading(true);
    const query = textAreaRef.current?.value;
    if (!query) {
      alert(
        "Query darf nicht leer sein. Gib ein SQL Statement ein und versuche es erneut.",
      );
      setLoading(false);
      return;
    }
    const serverResponse = await executeQuery(query);
    setServerResponse(serverResponse);
    setLoading(false);
  };

  return (
    <main className="p-4">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="font-bold">Query:</div>
          <textarea
            ref={textAreaRef}
            rows={6}
            defaultValue={""}
            className="rounded border-2 px-4 py-1 focus:outline-slate-900"
          />
          <button
            className="flex h-[50px] w-[200px] items-center justify-center rounded bg-slate-600 p-2 text-white"
            onClick={onClick}
          >
            {isLoading ? <LoadingSpinner /> : "Anfrage abschicken"}
          </button>
        </div>
        {serverResposne.error && (
          <div className="text-sm">
            <div className="rounded bg-red-300 p-4 text-red-800">
              <div className="font-bold">{serverResposne.error}</div>
            </div>
          </div>
        )}
        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-yellow-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {headers.map((header) => (
                  <th
                    scope="col"
                    className="px-6 py-3 text-slate-400"
                    key={header}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {serverResposne.resultSet.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  {headers.map((header, headerIndex) => (
                    <td className="px-6 py-4" key={headerIndex}>
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
