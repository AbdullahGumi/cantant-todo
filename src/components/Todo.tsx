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
}

const Todo = ({ setTodos }: IProps) => {
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  const handleDeletePress = () => {
    Toast.show({
      type: "success",
      text1: "Deleted Successfully",
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkMark}
        onPress={() => setIsChecked(!isChecked)}
      >
        {isChecked && <CheckIcon />}
      </TouchableOpacity>
      <TextInput
        value={todo}
        onChangeText={(text) => setTodo(text)}
        returnKeyType="done"
        editable={isEditing}
        style={{
          flex: 1,
          textDecorationLine: isChecked ? "line-through" : "none",
        }}
      />
      <TouchableOpacity style={{ marginRight: 5 }} onPress={handleEditPress}>
        {isEditing ? <Text>✔</Text> : <EditIcon />}
      </TouchableOpacity>
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
