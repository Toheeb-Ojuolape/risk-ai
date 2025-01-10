/* eslint-disable react/prop-types */
import { Button, Card, Stack, Text } from "@mantine/core";

function SuccessScreen({ title, description, btnTitle, handleClick}) {
  return (
    <Card
      radius={"lg"}
      px={"xl"}
      shadow={"md"}
      maw={"640px"}
      my={"xl"}
      mx={"auto"}
      align={"center"}
      py={"xl"}
    >
      <iframe src="https://lottie.host/embed/337e0415-b4d4-4b9f-b8f2-57cd0acee091/TcYh9MkycH.lottie"></iframe>

      <Stack my={"xl"}>
        <Text fz={"h1"} fw={"bold"}> {title}</Text>

        <Text>{description}</Text>
      </Stack>

      <Button size={"lg"} onClick={handleClick}> {btnTitle}</Button>
    </Card>
  );
}

export default SuccessScreen;
