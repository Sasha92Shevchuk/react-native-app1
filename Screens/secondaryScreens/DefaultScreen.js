import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { PostsScreen } from "../mainScreen/PostsScreen";
import { CommentsScreen } from "./CommentsScreen";
import { MapScreen } from "./MapScreen";

const Stack = createStackNavigator();

export const DefaultScreen = ({ navigation, route }) => {
  console.log("defaultScreen", route.params);
  // const [posts, setPosts] = useState([]);
  // const photo = route.params;
  // console.log("DefaultScreen ~ photo:", photo);

  // useEffect(() => {
  //   setPosts((prevState) => {
  //     console.log("prevState", prevState);
  //     return [...prevState, photo];
  //   });
  // }, [photo]);
  // console.log("те що записується в стейт", posts);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PostsScreen"
        options={{ headerShown: false }}
        initialParams={{ post: route.params }}
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
        initialParams={{ location: route.params.location }}
        component={MapScreen}
      />
    </Stack.Navigator>
  );
};
