import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { PostsScreen } from "../mainScreen/PostsScreen";
import { CommentsScreen } from "./CommentsScreen";
import { MapScreen } from "./MapScreen";

const Stack = createStackNavigator();

export const DefaultScreen = ({ navigation, route }) => {
  // console.log("DefaultScreen ~ route:", route);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PostsScreen"
        options={{ headerShown: false }}
        component={PostsScreen}
      />
      <Stack.Screen
        name="Comments"
        options={{ headerShown: false }}
        component={CommentsScreen}
      />
      <Stack.Screen
        name="Map"
        options={{ headerShown: false }}
        component={MapScreen}
      />
    </Stack.Navigator>
  );
};
