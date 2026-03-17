import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View , Pressable } from "react-native";
 
import Home from "./app/Home";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

  

export default function App() {
 
  return (
    <SafeAreaProvider>
 <StatusBar style="auto" translucent={true} />

      <Home />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#051d1f",
    alignItems: "center",
    justifyContent: "center",
  },
});
