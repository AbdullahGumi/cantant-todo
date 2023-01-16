import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList } from "./types";

import TodoListScreen from "../screens/TodoListScreen";

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TodoList" component={TodoListScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
