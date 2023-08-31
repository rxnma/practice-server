"use client";
import useCompletedList from "@/app/features/completed-list/use-completed-list";
import { Exercise, QueryServerResponse } from "@/app/types/types";
import LoadingSpinner from "@/components/loading-spinner";
import React from "react";

type ExerciseProps = { exercise: Exercise };

const executeQuery = async (
  query: string,
  id: string,
): Promise<QueryServerResponse> => {
  const response = await fetch("/api/database", {
    method: "POST",
    body: JSON.stringify({ query, exerciseId: id }),
  });
  return await response.json();
};

const initialServerResposneState = { error: null, resultSet: [], solved: null };

export default function ExerciseComponent({ exercise }: ExerciseProps) {
  const [init, setInit] = React.useState(true);
  const [isLoading, setLoading] = React.useState(true);
  const [serverResposne, setServerResponse] =
    React.useState<QueryServerResponse>(initialServerResposneState);
  const { completedExercise, updateList } = useCompletedList(
    exercise.id.toString(),
  );

  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const isCompletedExercise = !!completedExercise;
  const headers = Array.from(
    new Set(serverResposne.resultSet.flatMap((obj) => Object.keys(obj))),
  );

  const onClick = async () => {
    setLoading(true);
    setInit(false);
    const query = textAreaRef.current?.value;
    if (!query) {
      alert(
        "Query darf nicht leer sein. Gib ein SQL Statement ein und versuche es erneut.",
      );
      setLoading(false);
      return;
    }
    const serverResponse = await executeQuery(query, exercise.id.toString());
    if (serverResponse.solved) {
      updateList({ id: exercise.id.toString(), solution: query });
    }
    setServerResponse(serverResponse);
    setLoading(false);
  };

  React.useEffect(() => {
    if (!completedExercise?.solution) {
      return;
    }
    const autoExecuteQuery = async () => {
      return await executeQuery(
        completedExercise.solution,
        exercise.id.toString(),
      );
    };
    autoExecuteQuery().then((serverResponse) => {
      setServerResponse(serverResponse);
      setLoading(false);
    });

    return () => {};
  }, [completedExercise?.solution, exercise.id]);

  return (
    <main className="p-4">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div>
            <div className="opacity-50">{`ExerciseID: ${exercise.id} (category: ${exercise.category}, level: ${exercise.level})`}</div>
            <p className="text-2xl font-semibold">{exercise.question}</p>
          </div>
          <div className="font-bold">Query:</div>
          <textarea
            ref={textAreaRef}
            rows={6}
            defaultValue={
              isCompletedExercise && serverResposne.solved
                ? completedExercise.solution
                : ""
            }
            className="rounded border-2 px-4 py-1 focus:outline-slate-900"
          />
          <button
            className="flex h-[50px] w-[200px] items-center justify-center rounded bg-slate-600 p-2 text-white"
            onClick={onClick}
          >
            {isLoading && !init ? (
              <LoadingSpinner />
            ) : isCompletedExercise ? (
              "Lösung anzeigen"
            ) : (
              "Anfrage abschicken"
            )}
          </button>
        </div>
        {serverResposne.error && (
          <div className="text-sm">
            <div className="rounded bg-red-300 p-4 text-red-800">
              <div className="font-bold">{serverResposne.error}</div>
            </div>
          </div>
        )}
        {serverResposne.solved && (
          <div className="text-sm">
            <div className="rounded bg-green-300 p-4 text-green-800">
              <div className="font-bold">
                {serverResposne.solved.sample.title}
              </div>
              <br />
              <div> {serverResposne.solved.sample.solution}</div>
            </div>
            <div className="mt-2 rounded bg-green-300 p-4 text-green-800">
              <div> {serverResposne.solved.message}</div>
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
