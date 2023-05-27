import React, { useState, useCallback, useEffect } from "react";

import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import { Provider, useSelector } from "react-redux";

import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { store } from "./redux/store";
import { Main } from "./components/Main/Main";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Main />

        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // ...Platform.select({
    //   ios: { backgroundColor: "#000" },
    //   android: { backgroundColor: "#fff" },
    // }),
  },
});

// const [dimensions, setDimensions] = useState(
//   Dimensions.get("window").width - 8 * 2
// );

// useEffect(() => {
//   const onChangeWindow = () => {
//     const windowWidth = Dimensions.get("window").width - 8 * 2;
//     setDimensions(windowWidth);
//   };
//   Dimensions.addEventListener("change", onChangeWindow);
//   return () => {
//     Dimensions.removeEventListener("change", onChangeWindow);
//   };
// }, []);
