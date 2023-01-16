import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";

import { CheckIcon, EditIcon, TrashIcon } from "../../assets/svg";
import { ITodo } from "../types";

interface IProps {
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  todos: ITodo[];
  todoItem: ITodo;
}

const Todo = ({ setTodos, todos, todoItem }: IProps) => {
  console.log(todos);
  const [todo, setTodo] = useState(todoItem.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleDeletePress = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== todoItem.id)
    );
    Toast.show({
      type: "success",
      text1: "Deleted Successfully",
    });
  };

  const toggleCheck = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoItem.id
          ? { ...todo, completed: !todoItem.completed }
          : todo
      )
    );
  };

  const updateTitle = () => {
    setIsEditing(false);
    setTodos((prevTodos) =>
      prevTodos.map((items) =>
        items.id === todoItem.id ? { ...items, title: todo } : items
      )
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkMark} onPress={() => toggleCheck()}>
        {todoItem.completed && <CheckIcon />}
      </TouchableOpacity>
      <TextInput
        value={todo}
        onChangeText={(text) => setTodo(text)}
        returnKeyType="done"
        editable={isEditing}
        style={{
          flex: 1,
          textDecorationLine: todoItem.completed ? "line-through" : "none",
        }}
      />
      {isEditing ? (
        <TouchableOpacity style={{ marginRight: 5 }} onPress={updateTitle}>
          <Text>✔</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{ marginRight: 5 }} onPress={handleEditPress}>
          <EditIcon />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={{ marginLeft: 10 }} onPress={handleDeletePress}>
        <TrashIcon />
      </TouchableOpacity>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkMark: {
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    marginRight: 15,
  },
});
