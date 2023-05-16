import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { DeletePhotoButton } from "../../components/DeletePhotoButton/DeletePhotoButton";
import { BackgroundImage } from "../../components/BackgroundImage/BackgroundImage";
import { PostCard } from "../../components/PostCard/PostCard";

export const ProfileScreen = () => {
  const handleLogout = () => {
    navigation.navigate("Login");
  };
  const addPhoto = () => {
    Alert.alert("Add Photo");
  };
  return (
    <BackgroundImage>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.delPhotoBox}>
              <View style={styles.photoProfile}>
                <Image
                  source={require("../../assets/images/photoProfile.jpg")}
                  style={styles.profileImage}
                />
                <DeletePhotoButton onPress={addPhoto} />
              </View>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <MaterialIcons name="logout" size={24} color="#E8E8E8" />
            </TouchableOpacity>
            <Text style={styles.nameProfile}>Natali Romanova</Text>
            <PostCard />
          </View>
        </View>
      </ScrollView>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 16,
  },
  wrapper: {
    marginTop: 147,
    paddingTop: 92,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  delPhotoBox: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
    borderColor: "#E8E8E8",
  },
  photoProfile: {
    position: "relative",
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    right: -50,
    transform: [{ translateX: -60 }],
    borderColor: "#E8E8E8",
  },
  nameProfile: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    color: "#212121",
  },
});
