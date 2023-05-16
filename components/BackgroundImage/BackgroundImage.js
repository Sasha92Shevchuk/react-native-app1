import { StyleSheet, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";

export const BackgroundImage = ({ children }) => {
  return (
    <ImageBackground
      source={require("../../assets/images/BG.jpg")}
      style={styles.backgroundImage}
    >
      {children}
      <StatusBar style="auto" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    // position: "absolute",
    // left: 0,
    // top: 0,
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    // resizeMode: "stretch",
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
