import React, { useState } from "react";
import { doc, updateDoc, addDoc, collection, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import { PostImage } from "../../components/PostImage/PostImage";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export const CommentsScreen = ({ navigation, route }) => {
  const [comment, setComment] = useState("");
  console.log("CommentsScreen ~ comment:", comment);
  const { photo } = route.params;
  const { id } = route.params;

  const { nickName } = useSelector((state) => state.auth);

  const handleSendComment = async () => {
    try {
      const commentsRef = collection(db, "posts", id, "comments");

      await addDoc(commentsRef, {
        comment,
        nickName,
      });

      console.log("Comment added");
    } catch (error) {
      console.log(error);
    }
   
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Text>Go Back</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <PostImage source={{ uri: photo }} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={comment}
            onChangeText={(value) => setComment(value)}
            placeholder="Add comment..."
            style={styles.input}
            onSubmitEditing={Keyboard.dismiss}
          />
          <TouchableOpacity style={styles.sendComment}>
            <MaterialIcons
              name="keyboard-arrow-up"
              size={24}
              color="#000"
              onPress={handleSendComment}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  imageContainer: {
    marginTop: 34,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    height: 50,
    paddingHorizontal: 8,
    width: "100%",
    position: "absolute",
    bottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    marginBottom: 16,
    padding: 16,
    color: "red",
  },
  inputText: {
    color: "#fff",
    // marginBottom: 5,
    fontSize: 18,
  },

  sendComment: {
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
});
