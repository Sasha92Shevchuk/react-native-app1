import React, { useState, useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TouchableWithoutFeedback, // імпорт компонента обгортки
  Keyboard, // імпорт компонента клавіатури
  View,
  Platform,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  // Dimensions,
} from "react-native";
import * as Font from "expo-font";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import * as SplashScreen from "expo-splash-screen";
import { LoginScreen } from "./Screens/LoginScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
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

  const showKeyboard = () => {
    setIsShowKeyboard(true);
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.image}
          source={require("./assets/images/BG.jpg")}
        >
          {/* <RegistrationScreen
            isShowKeyboard={isShowKeyboard}
            showKeyboard={showKeyboard}
            dismissKeyboard={dismissKeyboard}
          /> */}
          <LoginScreen
            isShowKeyboard={isShowKeyboard}
            showKeyboard={showKeyboard}
            dismissKeyboard={dismissKeyboard}
          />

          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
