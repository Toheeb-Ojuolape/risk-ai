import { Box } from "@mantine/core";
import SignupForm from "../../components/Signup/SignupForm";
import SuccessScreen from "../../elements/SuccessScreen";
import { useState } from "react";

function Signup() {
  const [step, setStep] = useState(1);
  return (
    <Box>
      {step === 1 && <SignupForm handleNext={setStep} />}

      {step === 2 && (
        <SuccessScreen
          title={"Complete your signup"}
          btnTitle={"Open Email"}
          handleClick={() => window.open("https://gmail.com", "_blank")}
          description={
            "We just sent you an email with a verification link. Kindly tap the link in your email to complete your signup."
          }
        />
      )}
    </Box>
  );
}

export default Signup;
