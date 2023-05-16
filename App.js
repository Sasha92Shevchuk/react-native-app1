import React, { useState, useCallback, useEffect } from "react";

import {
  StyleSheet,
  TouchableWithoutFeedback, // імпорт компонента обгортки
  Keyboard, // імпорт компонента клавіатури
  View,
  Platform,
  ImageBackground,
  Image,
  Text,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import * as Font from "expo-font";
import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { LoginScreen } from "./Screens/auth/LoginScreen";
import { BackgroundImage } from "./components/BackgroundImage/BackgroundImage";
import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "./router";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const routing = useRoute(false);

  const [fontsLoaded] = Font.useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
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

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>{routing}</NavigationContainer>

      <StatusBar style="auto" />
    </View>
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
