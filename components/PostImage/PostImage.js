import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export const PostImage = ({ source }) => {
  return <Image source={source} style={styles.image} resizeMode="cover" />;
};

const styles = StyleSheet.create({
  image: {
    height: 240,
    width: windowWidth - 32,
    borderRadius: 8,
  },
});
