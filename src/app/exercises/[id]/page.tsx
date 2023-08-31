"use client";
import ExerciseComponent from "@/app/features/exercise/exercise-component";
import { Exercise } from "@/app/types/types";
import LoadingSpinner from "@/components/loading-spinner";
import Link from "next/link";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [isLoading, setLoading] = React.useState(false);
  const [exercise, setExercise] = React.useState<Exercise>();

  React.useEffect(() => {
    setLoading(true);
    const getExercise = async () => {
      const res = await fetch(
        `http://localhost:3000/api/exercises/${params.id}`,
      );
      return res.json();
    };

    getExercise()
      .then((exercise) => {
        setExercise(exercise);
      })
      .catch(() => {
        alert("Fehler - Aufgabe konnte nicht geladen werden.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.id]);

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

  if (!exercise) {
    return (
      <div className="flex min-h-[calc(100vh-104px)] items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="text-2xl">{`Es wurde keine Aufgabe mit der Id: "${params.id}" gefunden.`}</div>
          <Link
            href="/"
            className="cursor-pointer rounded bg-slate-600 p-2 text-white transition-all hover:bg-slate-800"
          >
            {`<- Zurück zur Übersicht`}
          </Link>
        </div>
      </div>
    );
  }

  return <ExerciseComponent exercise={exercise} />;
}
