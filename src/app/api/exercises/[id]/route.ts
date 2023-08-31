import exercises from "@/app/api/data/exercises";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const exercise = exercises.find(
    (exercise) => exercise.id.toString() === params.id,
  );

  if (!exercise) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(exercise, { status: 200 });
}
