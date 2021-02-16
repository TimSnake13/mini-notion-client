import { CognitoUser } from "@aws-amplify/auth";

export interface UserAttributes {
  sub: string;
  email: string;
}

export interface CognitoUserExt extends CognitoUser {
  attributes: UserAttributes;
}
