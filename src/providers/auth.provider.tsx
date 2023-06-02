/* eslint-disable react/react-in-jsx-scope */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "@firebase/auth";
import { deleteDoc, doc, setDoc } from "@firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserById } from "../fetch/auth/getUserById";
import { User } from "../types/user.type";
import { auth, db } from "../firebase/config";
import { isEmailPending } from "../firebase/pendingUsers/isEmailPending";
import { toast } from "react-toastify";

export type NewUser = {
  name: string;
  role: "admin" | "supervisor" | "apprentice";
  supervisorId?: string;
  status: "active";
};

type AuthContextType = {
  user: User | null;
  registerUser: (email: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  forgotPassword: (email: string) => void;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const registerUser = async (email: string, password: string) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;

      if (!user) {
        toast.error("Failed to create user");
        throw new Error("Failed to create user.");
      }

      const pendingUser = await isEmailPending(email);

      const data: NewUser = {
        name: pendingUser.name,
        role: pendingUser.role,
        status: "active",
      };

      if (pendingUser.supervisorId) {
        data.supervisorId = pendingUser.supervisorId;
      }

      await setDoc(doc(db, "users", user.uid), data);
      await deleteDoc(doc(db, "pending users", pendingUser.id));

      getUserById(user.uid, (currentUser) => {
        if (!currentUser) {
          throw new Error("Failed to get user by id.");
        }
        setUser(currentUser);
      });
      toast.success("New account created");
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create user.");
    }
  };

  const loginUser = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Welcome back!");
      })
      .catch((err) => {
        toast.error("Incorrect email or password");
        console.error(err);
      });
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  const forgotPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent");
      })
      .catch((error) => {
        toast.error("Could not send reset email");
        console.error(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const unsubscribeUserData = getUserById(user.uid, (currentUser) => {
          setUser(currentUser);
        });
        return () => {
          unsubscribeUserData();
        };
      }
      setUser(null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, registerUser, loginUser, logout, forgotPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
