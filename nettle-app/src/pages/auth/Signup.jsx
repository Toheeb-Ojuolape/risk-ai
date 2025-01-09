import {
  Card,
  Box,
  Text,
  Stack,
  TextInput,
  PasswordInput,
  Button,
  Divider,
  Anchor,
  Center,
  InputLabel,
  Grid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { GoogleButton } from "../../elements/Buttons/GoogleButton";

function Signup() {
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Please enter a valid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : ""
    },
  });

  return (
    <Box mt={"20px"} miw={"640px"} maw={"600px"}>
      <Card withBorder py={"24px"} px={"36px"} shadow={"xl"} radius={"lg"}>
        <Text size={"30px"} className="bold">
          Signup on Risk AI
        </Text>

        <form className={"form"} onSubmit={form.onSubmit(() => {})}>
          <Grid>
            <Grid.Col span={6}>
              <Stack>
                <InputLabel className="label" fz={"18px"}>First Name</InputLabel>
                <TextInput
                  size={"lg"}
                  value={form.values.email}
                  onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                  error={form.errors.email}
                  variant={"filled"}
                ></TextInput>
              </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
              <Stack>
                <InputLabel className="label" fz={"18px"}>Last Name</InputLabel>
                <TextInput
                  size={"lg"}
                  value={form.values.email}
                  onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                  error={form.errors.email}
                  variant={"filled"}
                ></TextInput>
              </Stack>
            </Grid.Col>
          </Grid>

          <Stack>
            <InputLabel className="label" fz={"18px"}>Email Address</InputLabel>
            <TextInput
              size={"lg"}
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email}
              variant={"filled"}
            ></TextInput>
          </Stack>

          <Stack>
            <InputLabel className="label" fz={"18px"}>Company</InputLabel>
            <TextInput
              size={"lg"}
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email}
              variant={"filled"}
            ></TextInput>
          </Stack>

          <Stack>
            <InputLabel className="label" fz={"18px"}>Password</InputLabel>
            <PasswordInput
              size={"lg"}
              variant={"filled"}
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={form.errors.password}
            />
          </Stack>

          <Stack>
            <InputLabel className="label" fz={"18px"}>Confirm Password</InputLabel>
            <PasswordInput
              size={"lg"}
              variant={"filled"}
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }

              error={form.errors.password}
            />
          </Stack>

          <Stack>
            <Button
              loading={false}
              radius={"md"}
              size={"lg"}
              type="submit"
              w={"100%"}
            >
              {" "}
              Signup
            </Button>
          </Stack>
        </form>

        <Divider label="Or" labelPosition="center" mb="lg" />

        <GoogleButton size="md" radius="10px">
          Google
        </GoogleButton>

        <Center>
          <Text my={"lg"} fz={"19px"}>
           Already have an account?{" "}
            <Anchor fz={"19px"} href="/login">
              Login
            </Anchor>
          </Text>
        </Center>
      </Card>
    </Box>
  );
}

export default Signup;
