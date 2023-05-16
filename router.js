import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, Button } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import { LoginScreen } from "./Screens/auth/LoginScreen";
import { HomeScreen } from "./Screens/mainScreen/HomeScreen";
import { DefaultScreen } from "./Screens/secondaryScreens/DefaultScreen";

const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

export const useRoute = (isAuth) => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      {!isAuth && (
        <>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={RegistrationScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="HomeScreen"
            component={HomeScreen}
          />
        </>
      )}
      {isAuth && (
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        />
      )}
      {/* {
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        />
      } */}
    </AuthStack.Navigator>
  );

  // if (!isAuth) {
  //   return (
  //     <AuthStack.Navigator initialRouteName="Login">
  //       <AuthStack.Screen
  //         options={{ headerShown: false }}
  //         name="Registration"
  //         component={RegistrationScreen}
  //       />
  //       <AuthStack.Screen
  //         options={{ headerShown: false }}
  //         name="Login"
  //         component={LoginScreen}
  //       />
  //     </AuthStack.Navigator>
  //   );
  // }
  // return <HomeScreen />;
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
  },
  logoutButton: {
    // marginLeft: "auto",
    marginRight: 10,
  },
});
