import React, { useEffect, useState } from "react";

import { EvilIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import * as Location from "expo-location";

import { PostImage } from "../../components/PostImage/PostImage";

export const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const { post } = route.params;
  console.log("PostsScreen ~ post:", post);
  const { location } = route.params.post;
  console.log("PostsScreen ~ location:", location);

  useEffect(() => {
    if (post) {
      setPosts((prevState) => [...prevState, post]);
    }
  }, [post]);
  console.log("те що записується в стейт", posts);

  const handleGoComments = () => {
    navigation.navigate("Comments");
  };
  const handleGoMap = () => {
    navigation.navigate("Map");
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://ui-avatars.com/api/?name=Natali+Romanuik&background=random",
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Natali Romanuik</Text>
            <Text style={styles.profileEmail}>email@example.com</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <PostImage source={{ uri: item.photo }} />
            <Text style={styles.imageTitle}>{item.namePost}</Text>
            <View style={styles.detailsBox}>
              <TouchableOpacity
                onPress={handleGoComments}
                style={styles.commentsButton}
              >
                <EvilIcons name="comment" size={24} color="#fff" />
                <Text style={styles.commentsButtonText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleGoMap}
                style={styles.locationButton}
              >
                <EvilIcons name="location" size={24} color="#fff" />
                <Text style={styles.locationButtonText}>
                  {item.locationName}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {/* <View style={styles.postContainer}>
          <PostImage source={require("../../assets/images/post_1.jpg")} />

          <Text style={styles.imageTitle}>Forest</Text>

          <View style={styles.detailsBox}>
            <TouchableOpacity
              onPress={handleGoComments}
              style={styles.commentsButton}
            >
              <EvilIcons name="comment" size={24} color="#fff" />
              <Text style={styles.commentsButtonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGoMap}
              style={styles.locationButton}
            >
              <EvilIcons name="location" size={24} color="#fff" />
              <Text style={styles.locationButtonText}>
                Ivano-Frankivs'k Region, Ukraine
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.postContainer}>
          <PostImage source={require("../../assets/images/post_2.jpg")} />

          <Text style={styles.imageTitle}>Sunset</Text>

          <View style={styles.detailsBox}>
            <TouchableOpacity
              onPress={handleGoComments}
              style={styles.commentsButton}
            >
              <EvilIcons name="comment" size={24} color="#fff" />
              <Text style={styles.commentsButtonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGoMap}
              style={styles.locationButton}
            >
              <EvilIcons name="location" size={24} color="#fff" />
              <Text style={styles.locationButtonText}>
                Ivano-Frankivs'k Region, Ukraine
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 32,
    marginBottom: 32,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  profileInfo: {
    flexDirection: "column",
    alignItems: "center",
  },
  profileName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#212121",
  },
  profileEmail: {
    fontSize: 11,
    color: "#212121cc",
  },
  postContainer: {
    marginTop: 34,
  },
  imageTitle: {
    fontFamily: "Roboto-Medium",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#212121",
  },
  detailsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 11,
  },
  commentsButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsButtonText: {
    color: "#fff",
    marginLeft: 8,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationButtonText: {
    color: "#fff",
    textDecorationLine: "underline",
    marginLeft: 8,
  },
});
