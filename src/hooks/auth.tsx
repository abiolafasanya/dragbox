"use client";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FirestoreError } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuth {
  user: User | null;
  status: StatusType;
  login: (body: { email: string; password: string }) => void;
  register: (body: { email: string; password: string }) => void;
  logout: () => void;
}

type StatusType = "loading" | "success" | "error";

const AuthContext = createContext({} as IAuth);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<StatusType>("loading");

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(auth.currentUser);
    });
    return unSubscribe;
  }, []);

  async function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
        setStatus("loading");
        toast({ title: "Signed out" });
      })
      .catch((error) => {
        toast({ title: "An error occured", description: error?.message });
        // An error happened.
      });
  }

  async function register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      setStatus("loading");
      const loginRequest = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(loginRequest.user);
      setStatus("success");
      toast({ title: "Registration Successful" });
    } catch (error) {
      if (error instanceof Error) {
        toast({ title: "Error", description: error.message});
        console.log(error);
      }
      setStatus("error");
    }
  }
  function login({ email, password }: { email: string; password: string }) {
    setStatus("loading");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        setStatus("success");
        toast({ title: "You are logged In" });
        // ...
      })
      .catch((error) => {
        setStatus("error");
        if (error instanceof Error) {
          console.error(error);
          toast({ title: "Error", description: error.message });
        }
      });
  }

  const value = {
    user,
    status,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
