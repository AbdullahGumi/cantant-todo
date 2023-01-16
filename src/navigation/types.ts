import { NativeStackScreenProps } from "@react-navigation/native-stack";

/* Common screens */

export type StackParamList = {
  TodoList: undefined;
};

export type CommonScreenProps<Screen extends keyof StackParamList> =
  NativeStackScreenProps<StackParamList, Screen>;
