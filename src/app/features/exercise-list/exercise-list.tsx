"use client";
import useCompletedList from "@/app/features/completed-list/use-completed-list";
import { ExerciseListType } from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

type ExerciseListProps = {
  list: ExerciseListType;
};

export default function ExerciseList({ list }: ExerciseListProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { completedListOnlyId, resetCompletedList } = useCompletedList();
  const router = useRouter();
  const headers = Array.from(new Set(list.flatMap((obj) => Object.keys(obj))));

  const deleteProgress = () => {
    resetCompletedList();
    window.location.reload();
  };

  if (!list.length) {
    return (
      <main className="flex h-[75vh] flex-col items-center justify-center gap-10 p-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <Emoji />
          <div className="flex gap-2">
            Es wurden keine aufgaben unter
            <code className="rounded-md bg-slate-100 px-2">{`src/app/api/data/exercises.ts`}</code>
            hinterlegt.
          </div>
          <div>Gehe zur &quot;Testarea&quot; um deine Datenbank abzufragen</div>
          <Link
            href="/testarea"
            className="rounded px-2 py-1 text-lg font-bold transition-all hover:bg-slate-700 hover:text-white"
          >
            {`-> Zur Testarea`}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-10 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold uppercase">Aufgaben</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-xs transition-all hover:text-red-500"
          >
            Fortschritt zurücksetzen
          </button>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {["", ...headers.slice(0, 4)].map((header) => (
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
              {list.map((exercise, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="cursor-pointer border-b bg-white hover:bg-slate-100 dark:border-gray-700 dark:bg-gray-800"
                  onClick={() => router.push(`/exercises/${exercise.id}`)}
                >
                  <td className="px-6 py-4">
                    {completedListOnlyId.includes(exercise.id.toString()) ? (
                      <IoCheckmarkCircleSharp size={24} color={"#427ef5"} />
                    ) : null}
                  </td>
                  <td className="px-6 py-4">{exercise.id}</td>
                  <td className="px-6 py-4">
                    {exercise.category.toUpperCase()}
                  </td>
                  <td className="px-6 py-4">{exercise.level}</td>
                  <td className="px-6 py-4">{exercise.question}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          onAccept={() => deleteProgress()}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
}

const Emoji = () => {
  return (
    <Image
      width={100}
      height={100}
      src={
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaWQ9IkxheWVyXzEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDkxIDkxOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgOTEgOTEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzRFN0E5RTt9Cjwvc3R5bGU+PGc+PGc+PGc+PHBhdGggY2xhc3M9InN0MCIgZD0iTTI0LjgsMzAuOWMwLDAuOCwwLDEuNiwwLDIuNGMwLDIuNi0wLjIsNS4zLDAuMyw3LjljMC42LDMuMyw1LjQsMi4zLDUuNi0wLjhjMC4xLTIuMS0wLjMtNC4yLTAuNC02LjIgICAgIGMtMC4xLTEtMC4xLTEuOS0wLjItMi45YzAtMC4yLDAtMC4zLTAuMS0wLjVjMi4yLDAsNC4zLTAuMSw2LjQtMC41YzIuOC0wLjUsMi45LTUuNCwwLTUuOGMtNC4xLTAuNi04LjMtMC4xLTEyLjUsMCAgICAgYy00LDAuMS04LjUsMC0xMi4yLDEuNGMtMiwwLjctMi4yLDMuNiwwLDQuMkMxNS42LDMxLjMsMjAsMzEsMjQsMzAuOUMyNC4zLDMwLjksMjQuNiwzMC45LDI0LjgsMzAuOXoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNNzguMywyNC41Yy00LjEtMC42LTguMy0wLjEtMTIuNSwwYy00LDAuMS04LjUsMC0xMi4yLDEuNGMtMiwwLjctMi4yLDMuNiwwLDQuMmMzLjgsMS4yLDguMywwLjksMTIuMiwwLjggICAgIGMwLjMsMCwwLjYsMCwwLjgsMGMwLDAuOCwwLDEuNiwwLDIuNGMwLDIuNi0wLjIsNS4zLDAuMyw3LjljMC42LDMuMyw1LjQsMi4zLDUuNi0wLjhjMC4xLTIuMS0wLjMtNC4yLTAuNC02LjIgICAgIGMtMC4xLTEtMC4xLTEuOS0wLjItMi45YzAtMC4yLDAtMC4zLTAuMS0wLjVjMi4yLDAsNC4zLTAuMSw2LjQtMC41QzgxLjEsMjkuOCw4MS4yLDI0LjksNzguMywyNC41eiIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02OS40LDYyLjdjLTguNC0xLjEtMTYuOC0xLjgtMjUuMy0xLjZjLTQuMSwwLjEtOC4xLDAuNC0xMi4yLDAuOWMtMy42LDAuNS04LjcsMC44LTExLjcsMy4xICAgICBjLTEuMSwwLjktMSwyLjQsMC40LDNjMy4zLDEuMyw3LjgsMC41LDExLjMsMC40YzMuOC0wLjEsNy43LTAuMiwxMS41LTAuMmM4LDAuMSwxNiwwLjYsMjMuOSwxLjdjMi4xLDAuMyw0LjEtMC41LDQuNy0yLjcgICAgIEM3Mi42LDY1LjYsNzEuNCw2Myw2OS40LDYyLjd6Ii8+PC9nPjwvZz48L2c+PC9zdmc+"
      }
      alt={"emoji"}
    />
  );
};

const Modal = ({
  onAccept,
  onCancel,
}: {
  onAccept: () => void;
  onCancel: () => void;
}) => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-white p-6 shadow-lg">
        <p>Möchtest du wirklich deinen Fortschritt zurücksetzen?</p>
        <div className="flex justify-end gap-4">
          <button
            className="mt-4 rounded bg-slate-500 px-4 py-2 font-bold text-white transition-all hover:bg-slate-600"
            onClick={onCancel}
          >
            Close
          </button>
          <button
            onClick={onAccept}
            className="mt-4 rounded bg-red-500 px-4 py-2 font-bold text-white transition-all hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
