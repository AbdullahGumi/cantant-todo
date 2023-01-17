import AsyncStorage from "@react-native-async-storage/async-storage";

import { ITodo } from "../types";

export const useLocalStorage = () => {
  const saveTodos = async (todos: ITodo[]) => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    } catch (e) {
      console.log("Error saving todos: ", e);
    }
  };

  const getTodos = async () => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      return todos !== null ? JSON.parse(todos) : [];
    } catch (e) {
      console.log("Error getting todos: ", e);
    }
  };

  return { saveTodos, getTodos };
};
