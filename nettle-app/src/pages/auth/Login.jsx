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
  Flex,
  Center,
  InputLabel,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { GoogleButton } from "../../elements/Buttons/GoogleButton";

function Login() {
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
          : null,
    },
  });

  return (
    <Box mt={"8%"} miw={"640px"} maw={"600px"}>
      <Card withBorder py={"50px"} px={"36px"} shadow={"xl"} radius={"lg"}>
        <Text size={"30px"} className="bold">
          Welcome Back
        </Text>

        <form className={"form"} onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <InputLabel className="label" fz={"18px"}>Email address</InputLabel>
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
            />
          </Stack>

          <Flex justify={"flex-end"}>
            <Anchor
              href="/forgot-password"
              size="md"
              fw={800}
              fz={"18px"}
            >
              Forgot password?
            </Anchor>
          </Flex>

          <Stack>
            <Button
              loading={false}
              radius={"md"}
              size={"lg"}
              type="submit"
              w={"100%"}
            >
              {" "}
              Login{" "}
            </Button>
          </Stack>
        </form>

        <Divider label="Or" labelPosition="center" mb="lg" />

        <GoogleButton size="md" radius="10px">
          Google
        </GoogleButton>

        <Center>
          <Text my={"lg"} fz={"19px"}>
            Don&apos;t have an account?{" "}
            <Anchor fz={"19px"} href="/signup">
              Signup
            </Anchor>
          </Text>
        </Center>
      </Card>
    </Box>
  );
}

export default Login;
