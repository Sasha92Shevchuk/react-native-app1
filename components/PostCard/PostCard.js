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
} from "react-native";

import { PostImage } from "../../components/PostImage/PostImage";

export const PostCard = ({ navigation }) => {
  const handleGoComments = () => {
    navigation.navigate("Comments");
  };
  const handleGoMap = () => {
    navigation.navigate("Map");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.postContainer}>
          <PostImage source={require("../../assets/images/post_1.jpg")} />

          <Text style={styles.imageTitle}>Forest</Text>

          <View style={styles.detailsBox}>
            <TouchableOpacity
              onPress={handleGoComments}
              style={styles.commentsButton}
            >
              <EvilIcons name="comment" size={24} color="#FF6C00" />
              <Text style={styles.commentsButtonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGoComments}
              style={styles.commentsButton}
            >
              <MaterialIcons name="thumb-up" size={24} color="#FF6C00" />
              <Text style={styles.commentsButtonText}>153</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGoMap}
              style={styles.locationButton}
            >
              <EvilIcons name="location" size={24} color="#fff" />
              <Text style={styles.locationButtonText}>Ukraine</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.postContainer}>
          <PostImage source={require("../../assets/images/post_2.jpg")} />

          <Text style={styles.imageTitle}>Sunset on the Black sea</Text>

          <View style={styles.detailsBox}>
            <TouchableOpacity
              onPress={handleGoComments}
              style={styles.commentsButton}
            >
              <EvilIcons name="comment" size={24} color="#FF6C00" />
              <Text style={styles.commentsButtonText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGoComments}
              style={styles.commentsButton}
            >
              <MaterialIcons name="thumb-up" size={24} color="#FF6C00" />
              <Text style={styles.commentsButtonText}>200</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGoMap}
              style={styles.locationButton}
            >
              <EvilIcons name="location" size={24} color="#fff" />
              <Text style={styles.locationButtonText}>Ukraine</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.postContainer}>
          <PostImage source={require("../../assets/images/post_3.jpg")} />

          <Text style={styles.imageTitle}>Old house in Venice</Text>

          <View style={styles.detailsBox}>
            <TouchableOpacity
              onPress={handleGoComments}
              style={styles.commentsButton}
            >
              <EvilIcons name="comment" size={24} color="#FF6C00" />
              <Text style={styles.commentsButtonText}>50</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGoComments}
              style={styles.commentsButton}
            >
              <MaterialIcons name="thumb-up" size={24} color="#FF6C00" />
              <Text style={styles.commentsButtonText}>200</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGoMap}
              style={styles.locationButton}
            >
              <EvilIcons name="location" size={24} color="#fff" />
              <Text style={styles.locationButtonText}>Italy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
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
