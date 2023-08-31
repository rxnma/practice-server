"use client";
import ExerciseList from "@/app/features/exercise-list/exercise-list";
import { ExerciseListType } from "@/app/types/types";
import LoadingSpinner from "@/components/loading-spinner";
import React from "react";

export default function Home() {
  const [isLoading, setLoading] = React.useState(false);
  const [list, setList] = React.useState<ExerciseListType>([]);

  React.useEffect(() => {
    setLoading(true);
    const getExerciseList = async () => {
      const res = await fetch("http://localhost:3000/api/exercises");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    };

    getExerciseList()
      .then((list: ExerciseListType) => {
        list.sort((a, b) => {
          return a.level.localeCompare(b.level);
        });
        setList(list);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert("Fehler - Aufgaben konnten nicht geladen werden.");
      });
  }, []);

  /* TODO -> loading component */
  if (isLoading) {
    return (
      <div
        role="status"
        className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white opacity-50"
      >
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return <ExerciseList list={list} />;
}
