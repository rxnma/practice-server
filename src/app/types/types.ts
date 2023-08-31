export type Exercise = {
  id: number;
  category: string;
  level: string;
  question: string;
  solution: string;
  result: Record<string, any>[];
};

export type ExerciseListType = Exercise[];

export type Solution = { id: string; solution: string };

export type CompletedList = Solution[];

export type ResultSet = Record<string, string | number>[];

export type QueryServerResponse = {
  error: string | null;
  resultSet: ResultSet;
  solved: {
    sample: { title: string; solution: string };
    message: string;
  } | null;
};
