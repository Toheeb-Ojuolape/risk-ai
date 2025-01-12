/* eslint-disable react/prop-types */
import { Button } from "@mantine/core";
import GoogleIcon from "../../assets/icons/GoogleIcon.jsx";
import {
  auth,
  signInWithPopup,
  googleProvider,
} from "../../services/firebaseService.js";
import { handleErrors } from "../../utils/handleResponse.js";

export function GoogleButton({ handleSignup, loading }) {
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      handleSignup(user);
    } catch (error) {
      handleErrors("Error occured while signin up with Google", error);
    }
  };

  return (
    <Button
      onClick={handleGoogleSignup}
      radius={"md"}
      variant={"outline"}
      color="grey"
      size={"xl"}
      loading={loading}
    >
      <GoogleIcon /> <span style={{ paddingLeft: "10px" }}>Google</span>
    </Button>
  );
}
