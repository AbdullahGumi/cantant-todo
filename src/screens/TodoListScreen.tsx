import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";

import { CommonScreenProps } from "../navigation/types";
import Todo from "../components/Todo";
import { AddIcon, CheckListUndraw } from "../../assets/svg";
import { ITodo } from "../types";
import AddTodoModal from "../components/AddTodoModal";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TodoListScreen = ({ navigation }: CommonScreenProps<"TodoList">) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [todos, setTodos] = useState<ITodo[]>([]);

  const { getTodos, saveTodos } = useLocalStorage();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          style={{
            fontSize: 25,
            fontWeight: "600",
          }}
        >
          TodoList
        </Text>
      ),
      headerBackVisible: false,
      headerTitleAlign: "center",
      headerShadowVisible: false,
    });
  }, []);

  useEffect(() => {
    const loadTodos = async () => {
      const storedTodos = await getTodos();
      if (storedTodos) setTodos(storedTodos);
    };
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <SafeAreaView style={styles.container}>
      {todos.length === 0 ? (
        <View style={styles.emptyListContainer}>
          <View style={{ marginTop: "auto" }}>
            <CheckListUndraw />
          </View>
          <View style={{ marginBottom: "auto" }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              What do you want to do today?
            </Text>
            <Text style={{ fontWeight: "500", textAlign: "center" }}>
              Tap + to add to do items
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          style={{ width: "100%", paddingHorizontal: 15 }}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          data={todos}
          renderItem={({ item }) => (
            <Todo todoItem={item} todos={todos} setTodos={setTodos} />
          )}
        />
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <AddIcon />
      </TouchableOpacity>
      <AddTodoModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setTodos={setTodos}
      />
    </SafeAreaView>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  emptyListContainer: {
    width: "100%",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  floatingButton: {
    width: 50,
    height: 50,
    backgroundColor: "#0997a0",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "10%",
    right: "5%",
  },
  listSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: 15,
    marginBottom: 15,
  },
});
