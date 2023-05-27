import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";

import { authSignOutUser } from "../../redux/auth/authOperations";

import { MaterialIcons } from "@expo/vector-icons";
import { db, storage } from "../../firebase/config";

import { DeletePhotoButton } from "../../components/DeletePhotoButton/DeletePhotoButton";
import { BackgroundImage } from "../../components/BackgroundImage/BackgroundImage";
import { PostCard } from "../../components/PostCard/PostCard";

export const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState();
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const postsRef = await collection(db, "posts");
    const q = query(postsRef, where("userId", "==", userId));
    onSnapshot(q, (snapshot) => {
      setUserPosts(snapshot.docs.map((doc) => ({ ...doc.data() })));
    });
  };

  const handleLogOut = () => {
    dispatch(authSignOutUser());
  };
  const addPhoto = () => {
    Alert.alert("Add Photo");
  };
  return (
    <BackgroundImage>
      <FlatList
        data={userPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
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
                onPress={handleLogOut}
                style={styles.logoutButton}
              >
                <MaterialIcons name="logout" size={24} color="#E8E8E8" />
              </TouchableOpacity>
              <Text style={styles.nameProfile}>{item.nickName}</Text>
              <PostCard post={userPosts} />
            </View>
          </View>
        )}
      />
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
