import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signOut,
} from "firebase/auth";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;

    // setIsAuthenticated(true);
  }, []);

  const updateUserData = async (userId) => {
    const response = await getDoc(doc(db, "users", userId));
    if (response.exists()) {
      let data = response.data();
      setUser({
        ...user,
        name: data.name,
        profileUrl: data.profileUrl,
        userId: data.userId,
      });
    }
  };

  // Login Handler
  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, data: response?.user };
    } catch (error) {
      let msg = error.message;
      if (error.code === "auth/invalid-email") {
        msg = "Invalid email address";
      } else if (error.code === "auth/wrong-password") {
        msg = "Invalid password";
      } else if (error.code === "auth/user-not-found") {
        msg = "User not found";
      }

      return { success: false, msg };
    }
  };

  // Logout Handler
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  };

  // Register Handler
  const register = async (name, email, password) => {
    const nameRegex = /^[a-zA-Z -]+$/;
    const passRegex = /^\S+$/ ;
    try {
      if (!passRegex.test(password)) {
        return {success : false, msg : "Invalid password format. Cannot contain spaces"}
      } if (!nameRegex.test(name)) {
        return {success : false, msg : "Invalid name format. Only letters are allowed."}
      }
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log(response?.user);
      // setUser(response?.user)
      // setIsAuthencticated(true)

      await setDoc(doc(db, "users", response?.user?.uid), {
        name: name,
        email: email,
        role: "user",
        profileUrl: "",
        userId: response?.user?.uid,
      });

      return { success: true, data: response?.user };
    } catch (error) {
      let msg = error.message;
      if (error.code === "auth/weak-password") {
        msg = "Password should be at least 6 characters";
      } else if (error.code === "auth/invalid-email") {
        msg = "Invalid email address";
      } else if (error.code === "auth/email-already-in-use") {
        msg = "Email already in use";
      }

      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }

  return value;
};

export { useAuth, AuthContext, AuthContextProvider };
