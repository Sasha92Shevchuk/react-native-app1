import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { useDispatch } from "react-redux";

import { AddPhotoButton } from "../../components/AddPhotoButton/AddPhotoButton";
import { BackgroundImage } from "../../components/BackgroundImage/BackgroundImage";

import { authSignUpUser } from "../../redux/auth/authOperations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useDispatch();

  const showKeyboard = () => {
    setIsShowKeyboard(true);
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onRegistered = () => {
    dismissKeyboard();
    Keyboard.dismiss();
    dispatch(authSignUpUser(state));
    setState(initialState);

    navigation.navigate("HomeScreen");
  };
  // const onGoLogIn = () => {
  //   navigation.navigate("Login");
  // };
  const addPhoto = () => {
    Alert.alert("Add Photo");
  };
  return (
    <BackgroundImage>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View
          style={{ ...styles.form, marginBottom: isShowKeyboard ? -170 : 0 }}
        >
          <View style={styles.addPhotoBox}>
            <View style={styles.photoProfile}>
              <AddPhotoButton onPress={addPhoto} />
            </View>
          </View>
          <View style={styles.wrapperForm}>
            <Text style={styles.title}>Registration</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View>
                <TextInput
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                  placeholder="Login"
                  style={styles.input}
                  onFocus={() => showKeyboard()}
                  onSubmitEditing={() => {
                    dismissKeyboard();
                  }}
                />
              </View>
              <View>
                <TextInput
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  placeholder="Email"
                  style={styles.input}
                  onFocus={() => showKeyboard()}
                  onSubmitEditing={() => {
                    dismissKeyboard();
                  }}
                />
              </View>
              <View style={{ position: "relative" }}>
                <TextInput
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  placeholder="Password"
                  secureTextEntry={!isPasswordVisible}
                  style={[styles.input, styles.lastInput]}
                  onFocus={() => showKeyboard()}
                  onSubmitEditing={() => {
                    dismissKeyboard();
                  }}
                />
                <TouchableOpacity
                  style={styles.showPassword}
                  onPress={togglePasswordVisibility}
                >
                  <Text style={styles.showPasswordText}>
                    {isPasswordVisible ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonSignIn}
              onPress={onRegistered}
            >
              <Text style={styles.buttonTitle}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.underText}>
                Already have an account? Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  addPhotoBox: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
  },
  photoProfile: {
    position: "relative",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  form: {
    paddingTop: 92,
    paddingBottom: 78,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  wrapperForm: {
    marginHorizontal: 16,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    color: "#212121",
  },
  input: {
    fontFamily: "Roboto-Regular",
    height: 50,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderColor: Platform.OS === "ios" ? "#F6F6F6" : "#E8E8E8",
    borderColor: "#000",
    marginBottom: 16,
  },
  lastInput: {
    marginBottom: 43,
  },
  inputText: {
    color: "#fff",
    marginBottom: 5,
    fontSize: 18,
  },
  showPassword: {
    position: "absolute",
    top: 15,
    right: 16,
  },
  showPasswordText: {
    fontSize: 16,
    color: "#1B4371",
  },
  buttonSignIn: {
    backgroundColor: "#FF6C00",
    height: 50,
    marginBottom: 16,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "#fff",
    fontSize: 18,
  },
  underText: {
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});
