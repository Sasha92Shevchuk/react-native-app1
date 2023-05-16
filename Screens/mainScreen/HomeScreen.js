import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, Button } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CreatePostsScreen } from "../mainScreen/CreatePostsScreen";
import { ProfileScreen } from "../mainScreen/ProfileScreen";
import { DefaultScreen } from "../secondaryScreens/DefaultScreen";

const MainTab = createBottomTabNavigator();

export const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate("Login");
  };
  const handleGoBack = () => {
    navigation.navigate("DefaultScreen");
  };
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        // tabBarActiveBackgroundColor: "#FF6C00",
        // tabBarItemStyle: {
        //   width: 70,
        //   borderRadius: 20,
        // },
        // tabBarActiveTintColor: "#FFF",
      }}
      initialRouteName="DefaultScreen"
    >
      <MainTab.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="appstore-o" size={size} color={color} />;
          },
          headerRight: ({ color }) => (
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <MaterialIcons name="logout" size={24} color={color} />
            </TouchableOpacity>
          ),

          title: "Posts",
          headerTitleAlign: "center",
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesign name="plus" size={size} color={color} />;
          },
          headerLeft: ({ color }) => (
            <TouchableOpacity onPress={handleGoBack} style={styles.arrowBack}>
              <MaterialIcons name="arrow-back" size={24} color={color} />
            </TouchableOpacity>
          ),
          title: "Create Post",
          headerTitleAlign: "center",
          tabBarStyle: { display: "none" },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Feather name="user" size={size} color={color} />;
          },
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  arrowBack: {
    marginLeft: 20,
  },
});
