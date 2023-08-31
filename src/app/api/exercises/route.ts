import exercises from "@/app/api/data/exercises";
import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const connectionString =
  process.env.NODE_ENV === "development"
    ? "postgresql://admin:root@localhost:5432/practice-server-db"
    : "postgresql://admin:root@practice-server-db:5432/practice-server-db";
const pool = new Pool({ connectionString });

export async function GET(req: NextRequest) {
  return NextResponse.json(exercises, { status: 200 });
}

/* generate result list */
export async function POST(req: NextRequest) {
  const updatedExerciseList = await Promise.all(
    exercises.map(async (exercise) => {
      try {
        const result = await pool.query(`${exercise.solution}`);
        return { ...exercise, result: result.rows };
      } catch (error) {
        return { ...exercise };
      }
    }),
  );
  return NextResponse.json(updatedExerciseList, { status: 200 });
}
