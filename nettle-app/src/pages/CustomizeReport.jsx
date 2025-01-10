/* eslint-disable react/prop-types */
import { Box, Button, Card, Flex, Switch, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

function CustomizeReport({ prevStep, handleContinue }) {
  return (
    <Card
      radius={"lg"}
      px={"xl"}
      shadow={"md"}
      maw={"650px"}
      my={"xl"}
      mx={"auto"}
      pb={"xl"}
    >
      <Box className="pointer" onClick={prevStep}>
        <IconArrowLeft />
      </Box>

      <Text fz={"h2"} fw={"bolder"} pt={"md"}>
        Customize Report
      </Text>

      <form className="form">
        <Flex justify={"space-between"}>
          <Text mt={"3"} color={"gray"} fz={"18"} fw={"500"}>
            Include Extreme weather Risk
          </Text>
          <Switch size="xl" onLabel="ON" offLabel="OFF" />
        </Flex>

        <Flex justify={"space-between"}>
          <Text mt={"3"} color={"gray"} fz={"18"} fw={"500"}>
            Include Earthquake Risk
          </Text>
          <Switch size="xl" onLabel="ON" offLabel="OFF" />
        </Flex>

        <Flex justify={"space-between"}>
          <Text mt={"3"} color={"gray"} fz={"18"} fw={"500"}>
            Include Flood Risk
          </Text>
          <Switch size="xl" onLabel="ON" offLabel="OFF" />
        </Flex>

        <Flex justify={"space-between"}>
          <Text mt={"3"} color={"gray"} fz={"18"} fw={"500"}>
            Include Wildfire Risk
          </Text>
          <Switch size="xl" onLabel="ON" offLabel="OFF" />
        </Flex>
      </form>

      <Button size={"lg"} onClick={handleContinue}>
        {" "}
        Continue
      </Button>
    </Card>
  );
}

export default CustomizeReport;
