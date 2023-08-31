import exercises from "@/app/api/data/exercises";
import { QueryServerResponse } from "@/app/types/types";
import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const connectionString =
  process.env.NODE_ENV === "development"
    ? "postgresql://admin:root@localhost:5432/practice-server-db"
    : "postgresql://admin:root@practice-server-db:5432/practice-server-db";
const pool = new Pool({ connectionString });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, exerciseId } = body;
    const result = await pool.query(`${query}`);
    const exercise = exercises.find(
      (exercise) => exercise.id.toString() === exerciseId,
    );
    if (!exercise) {
      const response: QueryServerResponse = {
        error: `No exercise with the id: "${exerciseId}" was found.`,
        resultSet: result.rows,
        solved: null,
      };

      return NextResponse.json(response, { status: 500 });
    }

    const solved =
      JSON.stringify(exercise.result) === JSON.stringify(result.rows)
        ? {
            sample: { title: "Musterlösung", solution: exercise.solution },
            message: "Alle Achtung! Aufgabe gemeistert! Glückwunsch!",
          }
        : null;

    const response: QueryServerResponse = {
      error: null,
      resultSet: result.rows,
      solved,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const response: QueryServerResponse = {
      error: `${error}`,
      resultSet: [],
      solved: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
