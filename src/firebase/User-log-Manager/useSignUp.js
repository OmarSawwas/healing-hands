import { useState } from "react";
import { auth } from "../config";
import { createUserWithEmailAndPassword } from "firebase/auth";
export const useSignup = () => {
  const [error, setError] = useState(null);
  2;
  const signup = (email, password) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("Successfully signedup");
      })
      .catch((err) => {
        setError(err);
      });
  };

  return { error, signup };
};
