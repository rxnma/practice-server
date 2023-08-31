import { CompletedList, Solution } from "@/app/types/types";
import React from "react";

const LOCAL_STORAGE_KEY = "completed";

export default function useCompletedList(id?: string) {
  const [completedList, setCompletedList] = React.useState<CompletedList>([]);

  const updateList = (solution: Solution) => {
    setCompletedList((prev) => {
      const newCompletedList = [...prev, solution];
      setCompletedListInStorage(newCompletedList);
      return newCompletedList;
    });
  };

  const resetCompletedList = () => {
    setCompletedListInStorage([]);
  };

  React.useEffect(() => {
    const completedList = getCompletedList();
    if (!completedList) {
      setCompletedListInStorage([]);
      setCompletedList([]);
      return;
    }
    setCompletedList(completedList);
  }, []);

  return {
    completedList,
    completedListOnlyId: completedList.map((item) => item.id),
    completedExercise:
      completedList.find((solution) => solution.id === id) ?? null,
    updateList,
    resetCompletedList,
  };
}

const setCompletedListInStorage = (value: CompletedList) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
};

const getCompletedList = (): CompletedList | null => {
  try {
    const completedList = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!completedList) {
      return null;
    }
    return JSON.parse(completedList);
  } catch (error) {
    alert(error);
    return null;
  }
};
