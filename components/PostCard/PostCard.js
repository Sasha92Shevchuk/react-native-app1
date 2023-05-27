import React from "react";

import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import { PostImage } from "../../components/PostImage/PostImage";

export const PostCard = ({ navigation, post }) => {
  const handleGoComments = () => {
    navigation.navigate("Comments");
  };
  const handleGoMap = () => {
    navigation.navigate("Map");
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={post}
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
                <EvilIcons name="comment" size={24} color="#FF6C00" />
                <Text style={styles.commentsButtonText}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleGoComments}
                style={styles.commentsButton}
              >
                <MaterialIcons name="thumb-up" size={24} color="#FF6C00" />
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
  postContainer: {
    flexGrow: 1,
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
    fontSize: 16,
    color: "#fff",
    textDecorationLine: "underline",
    marginLeft: 8,
  },
});
