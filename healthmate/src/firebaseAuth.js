import { auth, db } from "./firebaseConfig"; // Ensure correct import
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Sign Up Function
export const signUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Save user data to Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    createdAt: new Date(),
  });

  return user;
};

// Login Function
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Logout Function
export const logout = async () => {
  await signOut(auth);
};
