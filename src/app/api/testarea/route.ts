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
    const result = await pool.query(`${body.query}`);
    return NextResponse.json(
      { error: null, resultSet: result.rows, solved: null },
      { status: 200 },
    );
  } catch (error) {
    const response: QueryServerResponse = {
      error: `${error}`,
      resultSet: [],
      solved: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
