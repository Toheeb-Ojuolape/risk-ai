import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Grid,
  InputLabel,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useSelector } from "react-redux";

function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const [firstName, lastName] = user.displayName.split(' ')

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
          Update Profile
        </Text>

        <form className="form">
          <Center my={"lg"}>
            <Avatar size={"120px"} src={user.photoUrl}></Avatar>
          </Center>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <InputLabel className="label">First Name</InputLabel>
              <TextInput readOnly value={firstName} size={"lg"} variant={"filled"} />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <InputLabel className="label">Last Name</InputLabel>
              <TextInput readOnly value={lastName} size={"lg"} variant={"filled"} />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <InputLabel className="label">Email Address</InputLabel>
              <TextInput readOnly value={user.email} size={"lg"} variant={"filled"} />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <InputLabel className="label">Phone Number</InputLabel>
              <NumberInput size={"lg"} variant={"filled"} />
            </Grid.Col>
          </Grid>

          <Stack>
            <InputLabel className="label">Company Name</InputLabel>
            <TextInput size={"lg"} variant={"filled"} />
          </Stack>

          <Button size={"lg"} w={"100%"}>
            Update Profile
          </Button>
        </form>
      </Card>
    </Box>
  );
}

export default ProfilePage;
