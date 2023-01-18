import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";

import { ITodo } from "../types";

interface IProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const AddTodoModal = ({ modalVisible, setModalVisible, setTodos }: IProps) => {
  const [text, setText] = useState<string>("");

  const generateId = () => {
    return Math.random().toString(36).substring(2, 5);
  };

  const addItem = () => {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: generateId(),
        completed: false,
        title: text,
      },
    ]);
    setText("");
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add Item</Text>
          <TextInput
            autoFocus
            style={styles.input}
            value={text}
            onChangeText={(t) => setText(t)}
          />
          <TouchableOpacity
            style={[
              styles.addButton,
              { backgroundColor: text.length < 1 ? "#EEE" : "black" },
            ]}
            disabled={text.length < 1}
            onPress={addItem}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(false);
              setText("");
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddTodoModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    position: "relative",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  addButton: {
    width: "50%",
    marginTop: 20,
    borderRadius: 7,
    padding: 5,
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderColor: "#eee",
    borderWidth: 2,
    borderRadius: 8,
    padding: 5,
  },
  closeButton: {
    position: "absolute",
    top: 1,
    left: 1,
    backgroundColor: "red",
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
