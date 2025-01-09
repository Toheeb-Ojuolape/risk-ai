import { Button } from "@mantine/core";
import GoogleIcon from "../../assets/icons/GoogleIcon.jsx";

export function GoogleButton() {
  return (
    <Button radius={"md"} variant={"outline"} color="grey"  size={"xl"}>
      <GoogleIcon />  <span style={{paddingLeft:"10px"}}>Google</span>
    </Button>
  );
}
