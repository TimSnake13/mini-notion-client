import React, { useEffect, useState } from "react";
import NotesSection from "../src/components/NotesSection";
import AuthContext from "../src/components/auth/AuthContext";

import Amplify, { Auth } from "aws-amplify";
// import awsconfig from "../src/aws-exports";
// Amplify.configure(awsconfig);

const dashboard = () => {
  return (
    <div>
      <AuthContext.Consumer>
        {({ user }) => <div>user: {user?.attributes?.email}</div>}
      </AuthContext.Consumer>
      <NotesSection />
    </div>
  );
};

export default dashboard;
