import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase";

export const signUp = ({ email, password }) => {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((res) => console.log(res))
    .catch((error) => console.error(error));
};
