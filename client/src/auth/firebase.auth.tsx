import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { auth } from "@/lib/firebase.config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

//user SignUp
export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const saveUserToMongoDB = async (user: {
    uid: string;
    name: string | null;
    email: string | null;
  }) => {
    try {
      await axios.post("/api/users", {
        uid: user.uid,
        name: user.name,
        email: user.email,
      });
    } catch (err) {
      console.error("Error saving user to MongoDB", err);
    }
  };

  const signupUser = async (email: string, password: string, name: string) => {
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //   const user = userCredential.user;

      //   await saveUserToMongoDB({
      //     uid: user.uid,
      //     name,
      //     email: user.email,
      //   });

      toast.success("Account created!");
      navigate("/");
    } catch (err: any) {
      setError(err.message);
      toast.error("Signup failed. " + err.message);
    }
  };

  //user googleSignUp
  const signupWithGoogle = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await saveUserToMongoDB({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      });

      toast.success("Signed up with Google!");
      navigate("/");
    } catch (err: any) {
      setError(err.message);
      toast.error("Google signup failed. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { signupUser, signupWithGoogle, loading, error };
};

//userLogin
export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loginUser = async (email: string, password: string) => {
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      //   const user = userCredential.user;

      //   await axios.post("/api/users", {
      //     uid: user.uid,
      //     email: user.email,
      //   });

      toast.success("Login successful!");
      navigate("/");
    } catch (err: any) {
      setError(err.message);
      toast.error("Login failed. " + err.message);
    }
  };

  //user googleLogin
  const googleLogin = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user);
      toast.success("Google login successful!");
      navigate("/");
    } catch (err: any) {
      setError(err.message);
      toast.error("Google login failed. " + err.message);
    }
  };

  return { loginUser, googleLogin, error };
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  const handleReset = async (email: string) => {
    if (!email) return toast.error("Please enter your email");
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset link sent to your email.");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to send reset link. Try again.");
      console.error(err);
    }
  };
  return { handleReset };
};

// src/auth/firebase.auth.ts
export const useLogout = () => {
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Try again.");
    }
  };
  return { logoutUser };
};

export const useAuth = () => {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return { user };
};
