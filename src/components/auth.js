import { useEffect, useState } from "react";
import { auth, googleAuthProvide } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   useEffect(() => {
  //     console.log(auth?.currentUser?.email);
  //   }, []);
  //console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password); // this is the order first auth and email and password
    } catch (err) {
      console.error(err.message);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvide);
    } catch (err) {
      console.error(err);
    }
  };
  const logOut = async () => {
    try {
      await signOut(auth);
      alert("logged Out!");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};
