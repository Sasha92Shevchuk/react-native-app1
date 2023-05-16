import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export const DeletePhotoButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Ionicons name="add" size={24} color="#FF6C00" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: -13,
    bottom: 14,
    width: 26,
    height: 26,
    borderWidth: 1,
    borderRadius: 13,
    borderColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    transform: [{ rotate: "45deg" }],
    // justifyContent: "center",
    // alignItems: "center",
  },
});
