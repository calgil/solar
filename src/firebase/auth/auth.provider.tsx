/* eslint-disable react/react-in-jsx-scope */
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "@firebase/auth";
import { deleteDoc, doc, DocumentData, setDoc } from "@firebase/firestore";
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
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCred) => {
        const user = userCred.user;
        if (user) {
          const pendingUser = await isEmailPending(email);
          if (!pendingUser) {
            return console.log("Email not found in pending users collection.");
          }
          const data = {
            name: username,
            role: pendingUser.role,
          };
          await Promise.all([
            setDoc(doc(db, "users", user.uid), data),
            // setCustomUserClaims(user.uid, { role: pendingUser.role }), // set custom user claim for role
            deleteDoc(doc(db, "pending users", pendingUser.id)),
            // setCustomUserClaims(user.uid, { role: pendingUser.role }), // set custom user claim for role
          ]);
          // console.log("User created and role set:", data.role); // this breaks shit

          const currentUser = (await getUserById(user.uid)) as User;
          if (!currentUser) {
            return console.log("no user");
          }
          setUser(currentUser);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    // this works don't fuck it up

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then(async (userCred) => {
    //     const user = userCred.user;
    //     if (user) {
    //       console.log("change auth.provider before adding more users");

    //       // const data = {
    //       //   name: username,
    //       //   role: "admin",
    //       // };

    //       // await setDoc(doc(db, "users", user.uid), data);
    //     }
    //     // console.log({ user });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
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
        // console.log({ currentUser });

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
