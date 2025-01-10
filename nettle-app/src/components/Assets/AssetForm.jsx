/* eslint-disable react/prop-types */
import {
  Card,
  InputLabel,
  TextInput,
  Text,
  Stack,
  Grid,
  NumberInput,
  Button,
} from "@mantine/core";
import { IconEyeDollar } from "@tabler/icons-react";
import { UploadImage } from "../../elements/UploadImage";

function AssetForm({ handleContinue }) {
  return (
    <Card
      radius={"lg"}
      px={"xl"}
      shadow={"md"}
      maw={"650px"}
      my={"xl"}
      mx={"auto"}
    >
      <Text fz={"h2"} fw={"bold"} pt={"md"}>
        Add Asset
      </Text>
      <form className="form">
        <Stack>
          <InputLabel className="label">Asset Name</InputLabel>
          <TextInput size={"lg"} variant={"filled"} />
        </Stack>

        <Stack>
          <InputLabel className="label">Asset Location</InputLabel>
          <TextInput size={"lg"} variant={"filled"} />
        </Stack>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <InputLabel className="label">Assets Years of Use</InputLabel>
            <NumberInput size={"lg"} variant={"filled"} />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <InputLabel className="label">Asset Price</InputLabel>
            <NumberInput
              leftSection={<IconEyeDollar />}
              size={"lg"}
              variant={"filled"}
            />
          </Grid.Col>
        </Grid>

        <Stack>
          <InputLabel className="label">
            What year was your asset acquired?
          </InputLabel>
          <TextInput size={"md"} variant={"filled"} type="date" />
        </Stack>

        <Stack>
          <InputLabel className="label">
            Upload Image of Asset
          </InputLabel>

          <UploadImage />
        </Stack>

        <Button onClick={handleContinue} size={"lg"} w={"100%"}>
          {" "}
          Continue
        </Button>
      </form>
    </Card>
  );
}

export default AssetForm;
