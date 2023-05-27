import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import { authSignOut, authStateChange, updateUserProfile } from "./authReducer";
import { auth } from "../../firebase/config";

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, { displayName: login });
      }

      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, displayName } = user;
          dispatch(updateUserProfile({ userId: uid, nickName: displayName }));
        }
      });
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
  }

  console.log("функція виходу");
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        updateUserProfile({ userId: user.uid, nickName: user.displayName })
      );
      dispatch(authStateChange({ stateChange: true }));
      //   setUser(user);
      //   const uid = user.uid;
    } else {
      // User is signed out
    }
  });
};
