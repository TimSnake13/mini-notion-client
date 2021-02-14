import { useState } from "react";
import { auth, db } from "../auth/firebase";
// Provider hook that creates an auth object and handles it's state
const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const createUser = (user) => {
    return db
      .collection("users")
      .doc(user.uid)
      .set(user)
      .then(() => {
        setUser(user);
        return user;
      })
      .catch((error) => {
        return { error };
      });
  };
  const signUp = ({ name, email, password }) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        auth.currentUser.sendEmailVerification();
        return createUser({ uid: response.user.uid, email, name });
      })
      .catch((error) => {
        return { error };
      });
  };
  return {
    user,
    signUp,
  };
};
