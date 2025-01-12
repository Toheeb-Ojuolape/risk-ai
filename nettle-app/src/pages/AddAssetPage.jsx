import { useState } from "react";
import { Box, Stepper } from "@mantine/core";
import AssetForm from "../components/Assets/AssetForm";
import CustomizeReport from "../components/Assets/CustomizeReport";
import SuccessScreen from "../elements/SuccessScreen";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router";

function AddAssetPage() {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const navigate = useNavigate();

  return (
    <>
      <Box
        className="pointer"
        mb={"md"}
        onClick={(() => navigate(-1))}
      >
        <IconArrowLeft />
      </Box>
      <Stepper
        active={active}
        onStepClick={setActive}
        allowNextStepsSelect={false}
      >
        <Stepper.Step
          label="Asset Details"
          description="Tell us about your asset"
        >
          <AssetForm handleContinue={nextStep} />
        </Stepper.Step>
        <Stepper.Step
          label="Customize Report"
          description="Choose your factors/hazards"
        >
          <CustomizeReport prevStep={prevStep} handleContinue={nextStep} />
        </Stepper.Step>
        <Stepper.Step
          label="Download Report"
          description="Your report is ready"
        >
          <SuccessScreen
            title={"Your report is ready!"}
            btnTitle={"View Report"}
            handleClick={""}
            description={
              "Thank you for your patience, your report on your asset is now ready for youre review. Kindly tap the button below to view and download the report"
            }
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      {/* <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group> */}
    </>
  );
}

export default AddAssetPage;
