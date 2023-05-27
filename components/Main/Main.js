import React, { useState, useCallback, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

import {} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import { useRoute } from "../../router";

import { authStateChangeUser } from "../../redux/auth/authOperations";

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [stateChange]);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
