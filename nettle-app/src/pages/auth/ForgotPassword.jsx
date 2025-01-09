import {
  Card,
  Box,
  Text,
  Stack,
  TextInput,
  Button,
  InputLabel,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft } from "@tabler/icons-react";

function ForgotPassword() {
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
    <Box mt={"10%"} miw={"600px"} maw={"600px"}>
      <Card py={"50px"} px={"36px"} shadow={"xl"} radius={"lg"}>
        <Box className="pointer" onClick={() => window.history.go(-1)} my={"10px"}>
          <IconArrowLeft />
        </Box>
        <Text size={"30px"} className="bold">
          Reset Password
        </Text>

        <form className={"form"} onSubmit={form.onSubmit(() => {})}>
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
              loading={false}
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
    </Box>
  );
}

export default ForgotPassword;
