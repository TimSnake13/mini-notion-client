import React from "react";
import { CognitoUserExt } from "./authTypes";

const AuthContext = React.createContext<{
  user: CognitoUserExt | null;
}>({ user: null });
export default AuthContext;
