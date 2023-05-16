import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { PostImage } from "../../components/PostImage/PostImage";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export const CreatePostsScreen = ({ navigation }) => {
  const handleGoMap = () => {
    navigation.navigate("Map");
  };
  const onPublish = () => {
    Alert.alert("Publishing photo");
  };
  const handleDelete = () => {
    Alert.alert("Deleted");
  };
  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <PostImage source={require("../../assets/images/post_1.jpg")} />
        <View style={styles.imageEdit}>
          <Text>Edit the picture</Text>
        </View>
        <View style={styles.imageTitle}>
          <Text>Forest</Text>
        </View>
        <View style={styles.location}>
          <TouchableOpacity onPress={handleGoMap} style={styles.locationButton}>
            <EvilIcons name="location" size={24} color="#fff" />
            <Text style={styles.locationButtonText}>
              Ivano-Frankivs'k Region, Ukraine
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.buttonPublish}
        onPress={onPublish}
      >
        <Text style={styles.buttonTitle}>Publish</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <MaterialIcons name="delete" size={24} color={"#DADADA"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  postContainer: {
    marginTop: 34,
  },
  imageEdit: {
    fontFamily: "Roboto-Medium",
    marginTop: 8,
    fontSize: 16,
    fontWeight: 400,
    color: "#BDBDBD",
  },
  imageTitle: {
    borderBottomColor: Platform.OS === "ios" ? "#F6F6F6" : "#E8E8E8",
    borderBottomWidth: 1,
    paddingBottom: 15,
    fontFamily: "Roboto-Medium",
    marginTop: 48,
    fontSize: 16,
    fontWeight: 500,
    color: "#212121",
  },
  location: {
    borderBottomColor: Platform.OS === "ios" ? "#F6F6F6" : "#E8E8E8",
    borderBottomWidth: 1,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 32,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationButtonText: {
    color: "#212121",
    fontSize: 16,
    marginLeft: 8,
  },
  buttonPublish: {
    backgroundColor: "#FF6C00",
    height: 50,
    marginTop: 32,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "#fff",
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120,
    alignSelf: "center",
  },
});
