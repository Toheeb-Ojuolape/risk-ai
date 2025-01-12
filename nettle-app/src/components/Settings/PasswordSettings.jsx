import {
  Box,
  Button,
  Card,
  InputLabel,
  Stack,
  Text,
  PasswordInput,
} from "@mantine/core";

function PasswordSettings() {
  return (
    <Box>
      <Card
        radius={"lg"}
        px={"xl"}
        shadow={"md"}
        maw={"650px"}
        my={"xl"}
        mx={"auto"}
      >
        <Text fz={"h2"} fw={"bold"}>
          {" "}
          Change your Password
        </Text>

        <form className="form">
          <Stack>
            <InputLabel className="label">Current Password</InputLabel>
            <PasswordInput size={"lg"} variant={"filled"} />
          </Stack>

          <Stack>
            <InputLabel className="label">New Password</InputLabel>
            <PasswordInput size={"lg"} variant={"filled"} />
          </Stack>


          <Stack>
            <InputLabel className="label">Confirm New Password</InputLabel>
            <PasswordInput size={"lg"} variant={"filled"} />
          </Stack>


          <Button size={"lg"} w={"100%"}>
            Reset Password
          </Button>
        </form>
      </Card>
    </Box>
  );
}

export default PasswordSettings;
