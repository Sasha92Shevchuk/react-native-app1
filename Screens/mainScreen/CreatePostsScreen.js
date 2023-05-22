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
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import * as Location from "expo-location";

const windowWidth = Dimensions.get("window").width - 32;

export const CreatePostsScreen = ({ navigation }) => {
  const [namePost, setNamePost] = useState("");
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");

  // const [type, setType] = useState(CameraType.back);
  // const [cameraPermission, setCameraPermission] = useState(null);
  // const [mediaPermission, setMediaPermission] = useState(null);
  // const cameraRef = useRef(null);
  // const [photo, setPhoto] = useState(null);
  // const isFocused = useIsFocused();

  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

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

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
    console.log(type);
  };

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

  const handleGoMap = () => {
    navigation.navigate("Map");
  };

  const getCurrentLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    console.log("getCurrentLocation ~ location:", location);
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);

    let geocode = await Location.reverseGeocodeAsync(coords);
    if (geocode && geocode.length > 0) {
      const { city, region, country } = geocode[0];
      const locationName = `${city}, ${region}, ${country}`;
      setLocationName(locationName);
    }
  };

  const handleTakePhoto = async () => {
    const photo = await camera.takePictureAsync();
    getCurrentLocation();
    setPhoto(photo.uri);
    console.log("photo", photo);
  };

  const newPost = {
    photo,
    namePost,
    location,
    locationName,
  };
  const handlePhotoPublish = () => {
    // console.log(navigation);
    navigation.navigate("DefaultScreen", newPost);
  };
  const handleDelete = () => {
    Alert.alert("Deleted");
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
            // onSubmitEditing={() => {
            //   dismissKeyboard();
            // }}
          />
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
    height: 340,
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
