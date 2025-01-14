import { useState } from "react";
import { Box, Stepper } from "@mantine/core";
import AssetForm from "../components/Assets/AssetForm";
import CustomizeReport from "../components/Assets/CustomizeReport";
import SuccessScreen from "../elements/SuccessScreen";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import reportService from "../services/reportService";

function AddAssetPage() {
  const [active, setActive] = useState(0);
  const [assetId, setAssetId] = useState("");
  const [loading, setLoading] = useState(false);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const navigate = useNavigate();

  const handleAddAsset = (id) => {
    setAssetId(id);
    nextStep();
  };

  const generateReport = async (settings) => {
    const { weather, earthquake, flood, wildfire } = settings;
    const generateUrl = `${assetId}?weather=${weather}&earthquake=${earthquake}&flood=${flood}&wildfire=${wildfire}`;

    try {
      setLoading(true);
      setTimeout(() => {
        nextStep();
        setLoading(false);
      }, 2000);
      await reportService.generateReport(generateUrl);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Box className="pointer" mb={"md"} onClick={() => navigate(-1)}>
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
          <AssetForm handleContinue={handleAddAsset} />
        </Stepper.Step>
        <Stepper.Step
          label="Customize Report"
          description="Choose your factors/hazards"
        >
          <CustomizeReport
            prevStep={prevStep}
            handleContinue={generateReport}
            loading={loading}
          />
        </Stepper.Step>
        <Stepper.Step
          label="Report In Progress"
          description="Your report is on the way!"
        >
          <SuccessScreen
            title={"We're working on it!"}
            btnTitle={"Open Email"}
            handleClick={""}
            description={
              "Hi there. We're currently working on your report. We would send you a notification in your email once the report is ready!"
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
