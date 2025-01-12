import {
  Card,
  Box,
  Text,
  Stack,
  TextInput,
  Button,
  InputLabel,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft } from "@tabler/icons-react";
import authService from "../../services/authService";
import { useState } from "react";

function ForgotPassword() {
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
    },
  });

  async function resetPassword() {
    try {
      setLoading(true);
      await authService.forgotPassword({
        email: form.values.email,
      });
      setLoading(false);
      form.reset()
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <Flex mt={"10%"} justify={"center"}>
      <Card
        w={"100%"}
        maw={"600px"}
        py={"50px"}
        px={"36px"}
        shadow={"xl"}
        radius={"lg"}
      >
        <Box
          className="pointer"
          onClick={() => window.history.go(-1)}
          my={"10px"}
        >
          <IconArrowLeft />
        </Box>
        <Text size={"30px"} className="bold">
          Reset Password
        </Text>

        <form
          className={"form"}
          onSubmit={form.onSubmit(() => resetPassword())}
        >
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
            <Button
              loading={loading}
              radius={"md"}
              size={"lg"}
              type="submit"
              w={"100%"}
            >
              {" "}
              Reset Password
            </Button>
          </Stack>
        </form>
      </Card>
    </Flex>
  );
}

export default ForgotPassword;
