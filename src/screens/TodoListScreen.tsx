import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useLayoutEffect, useState } from "react";

import { CommonScreenProps } from "../navigation/types";
import Todo from "../components/Todo";
import { AddIcon, CheckListUndraw } from "../../assets/svg";
import { ITodo } from "../types";

const TodoListScreen = ({ navigation }: CommonScreenProps<"TodoList">) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

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

  return (
    <SafeAreaView style={styles.container}>
      {true ? (
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
          style={{ width: "100%" }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#eee",
                marginTop: 15,
                marginBottom: 15,
              }}
            />
          )}
          data={Array(0).fill(0)}
          renderItem={() => <Todo todos={todos} setTodos={setTodos} />}
        />
      )}
      <TouchableOpacity style={styles.floatingButton}>
        <AddIcon />
      </TouchableOpacity>
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
    backgroundColor: "#c9c9c9",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "10%",
    right: "5%",
  },
});
