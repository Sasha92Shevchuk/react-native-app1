import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const MapScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text>MapScreen</Text>
      <TouchableOpacity onPress={handleGoBack}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
