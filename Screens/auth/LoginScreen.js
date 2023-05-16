import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
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
import { BackgroundImage } from "../../components/BackgroundImage/BackgroundImage";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = () => {
  const [state, setState] = useState(initialState);
  const navigation = useNavigation();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
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

  const onLogIn = () => {
    dismissKeyboard();
    Keyboard.dismiss();
    setState(initialState);
    // Alert.alert("Credentials", `${state.email} + ${state.password}`);
    navigation.navigate("HomeScreen", { email: state.email });
  };

  return (
    <BackgroundImage>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View
          style={{ ...styles.form, marginBottom: isShowKeyboard ? -240 : 0 }}
        >
          <View style={styles.wrapperForm}>
            <Text style={styles.title}>Log In</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
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
              style={styles.buttonLogIn}
              onPress={onLogIn}
            >
              <Text style={styles.buttonTitle}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Registration");
              }}
            >
              <Text style={styles.underText}>
                Don't have an account? Register
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
  form: {
    paddingTop: 32,
    paddingBottom: 144,
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
    marginBottom: 32,
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
  buttonLogIn: {
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
