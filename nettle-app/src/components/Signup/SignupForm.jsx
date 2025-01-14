/* eslint-disable react/prop-types */
import {
  Card,
  Flex,
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
import { useNavigate } from "react-router";
import { useState } from "react";
import authService from "../../services/authService";

function SignupForm({ handleNext }) {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      password: "",
      confirmpassword: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      firstName: (val) =>
        val.length ? null : "Please enter a valid first name",
      lastName: (val) => (val.length ? null : "Please enter a valid last name"),
      company: (val) =>
        val.length ? null : "Please enter a valid company name",
      password: (val) => (val.length ? null : "Please enter a valid password"),
      confirmpassword: (val) =>
        val == form.values.password
          ? null
          : "Password and Confirm Password do not match",
    },
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSignup() {
    try {
      setLoading(true);
      await authService.signup({
        display_name: `${form.values.firstName} ${form.values.lastName}`,
        company_name: form.values.company,
        email: form.values.email,
        password: form.values.password,
      });
      handleNext(2);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  async function handleGoogleSignup(user) {
    try {
      setGoogleLoading(true);
      await authService.signupWithGoogle({
        email: user.email,
        display_name: user.displayName,
        uid: user.uid,
      });
      sessionStorage.setItem("authUser",JSON.stringify(user))
      window.location.href = "/dashboard"
      setGoogleLoading(false);
    } catch (error) {
      setGoogleLoading(false);
      console.log(error);
    }
  }

  return (
    <Flex justify={"center"}>
      <Card
        maw={"660px"}
        withBorder
        py={"24px"}
        px={"36px"}
        shadow={"xl"}
        radius={"lg"}
      >
        <Text size={"30px"} className="bold">
          Signup on Risk AI
        </Text>

        <form className={"form"} onSubmit={form.onSubmit(() => handleSignup())}>
          <Grid>
            <Grid.Col span={6}>
              <Stack>
                <InputLabel className="label" fz={"18px"}>
                  First Name
                </InputLabel>
                <TextInput
                  size={"lg"}
                  value={form.values.firstName}
                  onChange={(event) =>
                    form.setFieldValue("firstName", event.currentTarget.value)
                  }
                  error={form.errors.firstName}
                  variant={"filled"}
                ></TextInput>
              </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
              <Stack>
                <InputLabel className="label" fz={"18px"}>
                  Last Name
                </InputLabel>
                <TextInput
                  size={"lg"}
                  value={form.values.lastName}
                  onChange={(event) =>
                    form.setFieldValue("lastName", event.currentTarget.value)
                  }
                  error={form.errors.lastName}
                  variant={"filled"}
                ></TextInput>
              </Stack>
            </Grid.Col>
          </Grid>

          <Stack>
            <InputLabel className="label" fz={"18px"}>
              Email Address
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
              Company
            </InputLabel>
            <TextInput
              size={"lg"}
              value={form.values.company}
              onChange={(event) =>
                form.setFieldValue("company", event.currentTarget.value)
              }
              error={form.errors.company}
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
              error={form.errors.password}
            />
          </Stack>

          <Stack>
            <InputLabel className="label" fz={"18px"}>
              Confirm Password
            </InputLabel>
            <PasswordInput
              size={"lg"}
              variant={"filled"}
              value={form.values.confirmpassword}
              onChange={(event) =>
                form.setFieldValue("confirmpassword", event.currentTarget.value)
              }
              error={form.errors.confirmpassword}
            />
          </Stack>

          <Stack>
            <Button
              loading={loading}
              radius={"md"}
              size={"lg"}
              type="submit"
              w={"100%"}
              // onClick={handleSignup}
            >
              {" "}
              Signup
            </Button>
          </Stack>
        </form>

        <Divider label="Or" labelPosition="center" mb="lg" />

        <GoogleButton
          loading={googleLoading}
          handleSignup={handleGoogleSignup}
          size="md"
          radius="10px"
        >
          Google
        </GoogleButton>

        <Center>
          <Text my={"lg"} fz={"19px"}>
            Already have an account?{" "}
            <Anchor
              fz={"19px"}
              onClick={(e) => {
                e.preventDefault(), navigate("/login");
              }}
            >
              Login
            </Anchor>
          </Text>
        </Center>
      </Card>
    </Flex>
  );
}

export default SignupForm;
