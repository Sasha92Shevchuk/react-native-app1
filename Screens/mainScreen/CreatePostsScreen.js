import React, { useState, useRef, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  TextInput,
  Keyboard,
} from "react-native";

import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase/config";

import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import * as Location from "expo-location";
import { useSelector } from "react-redux";

const windowWidth = Dimensions.get("window").width - 32;

export const CreatePostsScreen = ({ navigation }) => {
  const [namePost, setNamePost] = useState("");
  const [location, setLocation] = useState(null);
  console.log("CreatePostsScreen ~ location:", location);
  const [locationName, setLocationName] = useState("");
  console.log("CreatePostsScreen ~ locationName:", locationName);

  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  // console.log("CreatePostsScreen ~ photo:", photo);

  const { userId, nickName } = useSelector((state) => state.auth);

  // записав у useEffect
  // const getLocationName = async () => {
  //   let geocode = await Location.reverseGeocodeAsync(location);
  //   if (geocode && geocode.length > 0) {
  //     const { city, region, country } = geocode[0];
  //     const locationName = `${city}, ${region}, ${country}`;
  //     setLocationName(locationName);
  //   }
  // };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let locationRes = await Location.getCurrentPositionAsync({});
      //console.log("getCurrentLocation ~ location:", location);
      const coords = {
        latitude: locationRes.coords.latitude,
        longitude: locationRes.coords.longitude,
      };
      console.log("конлось перед записом координат в стейт");
      setLocation(coords);
      // getLocationName();
      let geocode = await Location.reverseGeocodeAsync(coords);
      console.log("geocode:", geocode);
      console.log("конлось після прочитання координат зі стейт");

      if (geocode && geocode.length > 0) {
        const { city, region, country } = geocode[0];
        const locationName = `${city}, ${region}, ${country}`;
        console.log("конлось перед записом назви міста в стейт");

        setLocationName(locationName);
      }
    })();
  }, []);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
    console.log(type);
  };

  const handleGoMap = () => {
    navigation.navigate("Map");
  };

  const handleTakePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const newPost = {
    userId,
    nickName,
    photo,
    namePost,
    location,
    locationName,
  };
  const handlePhotoPublish = () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreen");
  };
  const handleDelete = () => {
    Alert.alert("Deleted");
  };

  const uploadPostToServer = async () => {
    const photoFromServer = await uploadPhotoToServer();
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        ...newPost,
        photo: photoFromServer,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `postImage/${uniquePostId}`);
    const data = await uploadBytes(storageRef, file, "postImage");
    //console.log("uploadPhotoToServer ~ data:", data);
    const processedPhoto = await getDownloadURL(
      ref(storage, `postImage/${uniquePostId}`)
    );
    return processedPhoto;
  };

  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.camera}
            // ref={cameraRef}
            ref={setCamera}
            // type={type}
            ratio="4:3"
            autoFocus={true}
          >
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image
                  source={{ uri: photo }}
                  style={{ height: 240, width: windowWidth }}
                />
              </View>
            )}
            <TouchableOpacity
              onPress={handleTakePhoto}
              style={styles.snapContainer}
            >
              <MaterialIcons
                style={styles.snap}
                name="photo-camera"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </Camera>
        </View>
        <View style={styles.imageEdit}>
          <Text>Edit the picture</Text>
        </View>
        <View style={styles.imageTitle}>
          <TextInput
            value={namePost}
            onChangeText={(value) => setNamePost(value)}
            placeholder="Title"
            style={styles.input}
            // onFocus={() => showKeyboard()}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
          />
        </View>
        <View style={styles.location}>
          <TouchableOpacity onPress={handleGoMap} style={styles.locationButton}>
            <EvilIcons name="location" size={24} color="#fff" />
            <TextInput
              style={styles.locationButtonText}
              value={locationName}
              placeholder="Location..."
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.buttonPublish}
        onPress={handlePhotoPublish}
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
  cameraContainer: {
    height: 240,
    width: windowWidth,
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  snap: {
    color: "#fff",
  },
  snapContainer: {
    backgroundColor: "#e9e9e9cc",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",

    borderColor: "#fff",
    borderWidth: 1,
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

//цю функцію розбив частину в useEffect і частину в getLocationName
// const getCurrentLocation = async () => {
//   let location = await Location.getCurrentPositionAsync({});
//   console.log("getCurrentLocation ~ location:", location);
//   const coords = {
//     latitude: location.coords.latitude,
//     longitude: location.coords.longitude,
//   };
//   setLocation(coords);
//   //можна цей метод винести там де потрібно вже саму назву, coords записуються в стейт, який пишеться на db
//   let geocode = await Location.reverseGeocodeAsync(coords);
//   if (geocode && geocode.length > 0) {
//     const { city, region, country } = geocode[0];
//     const locationName = `${city}, ${region}, ${country}`;
//     setLocationName(locationName);
//   }
// };

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815,
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
//   throw e;
// }
// вирізки для фото стара версія

// const [type, setType] = useState(CameraType.back);
// const [cameraPermission, setCameraPermission] = useState(null);
// const [mediaPermission, setMediaPermission] = useState(null);
// const cameraRef = useRef(null);
// const [photo, setPhoto] = useState(null);
// const isFocused = useIsFocused();

// useEffect(() => {
//   (async () => {
//     const { status: cameraStatus } =
//       await Camera.requestCameraPermissionsAsync();
//     setCameraPermission(cameraStatus === "granted");

//     const { status: mediaStatus } =
//       await MediaLibrary.requestPermissionsAsync();
//     setMediaPermission(mediaStatus === "granted");
//   })();
// }, []);

// useEffect(() => {
//   if (isFocused) {
//     startCamera();
//   } else {
//     stopCamera();
//   }
// }, [isFocused]);

// const startCamera = async () => {
//   if (cameraPermission) {
//     console.log("startCamera ~ cameraPermission:", cameraPermission);
//     console.log(await cameraRef.current.resumePreview());
//     await cameraRef.current.resumePreview();
//   }
// };

// const stopCamera = async () => {
//   if (cameraPermission) {
//     await cameraRef.current.pausePreview();
//   }
// };

// const handleTakePhoto = async () => {
//   if (cameraRef.current) {
//     const options = {
//       quality: 1,
//       pictureSize: { width: windowWidth, height: 240 },
//     };

//     const photo = await cameraRef.current.takePictureAsync(options);
//     setPhoto(photo.uri);
//     await MediaLibrary.createAssetAsync(photo.uri);
//     // console.log("photo", photo);
//   }
// };
