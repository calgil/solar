/* eslint-disable react/react-in-jsx-scope */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { deleteDoc, doc, setDoc } from "@firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserById } from "../../fetch/auth/getUserById";
import { User } from "../../types/user.type";
import { auth, db } from "../config";
import { isEmailPending } from "../pendingUsers/isEmailPending";

type AuthContextType = {
  user: User | null;
  registerUser: (username: string, email: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const registerUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;

      if (!user) {
        throw new Error("Failed to create user.");
      }

      const pendingUser = await isEmailPending(email);

      const data = {
        name: username,
        role: pendingUser.user.role,
      };

      await setDoc(doc(db, "users", user.uid), data);
      await deleteDoc(doc(db, "pending users", pendingUser.id));

      const currentUser = (await getUserById(user.uid)) as User;

      if (!currentUser) {
        throw new Error("Failed to get user by id.");
      }

      setUser(currentUser);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create user.");
    }
  };

  const loginUser = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      // .then((userCredential) => {
      //   const user = userCredential.user;
      // })
      .catch((err) => {
        console.error(err);
      });
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const currentUser = (await getUserById(user.uid)) as User;
        if (!currentUser) {
          return setUser(null);
        }
        setUser(currentUser);
      }
      // console.log("auth state changed", user);
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
