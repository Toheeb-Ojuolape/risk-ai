import {
  Card,
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
import { useNavigate } from "react-router";
import authService from "../../services/authService";
import { handleErrors } from "../../utils/handleResponse";
import {
  auth,
  signInWithEmailAndPassword,
} from "../../services/firebaseService";
import { useState } from "react";

function Login() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) =>
        /^\S+@\S+$/.test(val) ? null : "Please enter a valid email",
      password: (val) => (val.length ? null : "Please enter your password"),
    },
  });

  const navigate = useNavigate();

  async function loginUser() {
    try {
      setLoading(true);
      const response = await signInWithEmailAndPassword(
        auth,
        form.values.email,
        form.values.password
      );

      console.log(response);
      console.log(response.user.uid)
      await handleLogin(response.user);
    } catch (error) {
      setLoading(false);
      handleErrors(error.message);
    }
  }

  async function handleLogin(user) {
    try {
      setLoading(true);
      await authService.login({
        uid: user.uid,
      });
      window.location.href = "/dashboard";
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <Flex justify={"center"} pt={"30px"}>
      <Card
        withBorder
        radius={"lg"}
        px={"xl"}
        shadow={"md"}
        maw={"600px"}
        my={"xl"}
        w={"100%"}
      >
        <Text size={"30px"} className="bold">
          Welcome Back
        </Text>

        <form className={"form"} onSubmit={form.onSubmit(() => loginUser())}>
          <Stack>
            <InputLabel className="label" fz={"18px"}>
              Email address
            </InputLabel>
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
            <InputLabel className="label" fz={"18px"}>
              Password
            </InputLabel>
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
              onClick={(e) => {
                e.preventDefault(), navigate("/forgot-password");
              }}
              size="md"
              fw={800}
              fz={"18px"}
            >
              Forgot password?
            </Anchor>
          </Flex>

          <Stack>
            <Button
              loading={loading}
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

        <GoogleButton handleSignup={handleLogin} size="md" radius="10px">
          Google
        </GoogleButton>

        <Center>
          <Text my={"lg"} fz={"19px"}>
            Don&apos;t have an account?{" "}
            <Anchor
              fz={"19px"}
              onClick={(e) => {
                e.preventDefault(), navigate("/signup");
              }}
            >
              Signup
            </Anchor>
          </Text>
        </Center>
      </Card>
    </Flex>
  );
}

export default Login;
