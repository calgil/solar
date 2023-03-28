/* eslint-disable react/react-in-jsx-scope */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserById } from "../../fetch/auth/getUserById";
import { auth, db } from "../config";

type AuthContextType = {
  user: User | null;
  registerUser: (username: string, email: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
};

type User = {
  name: string;
  role: "admin" | "supervisor" | "apprentice";
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const registerUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCred) => {
        const user = userCred.user;
        if (user) {
          console.log("change auth.provider before adding more users");

          // const data = {
          //   name: username,
          //   role: "admin",
          // };

          // await setDoc(doc(db, "users", user.uid), data);
        }
        console.log({ user });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const loginUser = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log({ user });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const logout = async () => await signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const currentUser = (await getUserById(user.uid)) as User;
        if (!currentUser) {
          return setUser(null);
        }
        console.log({ currentUser });
        // this is the drama here
        // need to create converter function like https://firebase.google.com/docs/firestore/query-data/get-data
        //  or https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945
        setUser(currentUser);
      }
      console.log("auth state changed", user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
