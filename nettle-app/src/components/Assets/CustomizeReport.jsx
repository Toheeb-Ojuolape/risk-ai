/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Button, Card, Flex, Switch, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

function CustomizeReport({ prevStep, handleContinue, loading }) {
  const [weather] = useState(true);
  const [earthquake, setEarthQuake] = useState(false);
  const [flood, setFlood] = useState(false);
  const [wildfire, setWildfire] = useState(false);

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
          <Switch
            checked={true}
            readOnly={true}
            size="xl"
            onLabel="ON"
            offLabel="OFF"
          />
        </Flex>

        <Flex justify={"space-between"}>
          <Text mt={"3"} color={"gray"} fz={"18"} fw={"500"}>
            Include Earthquake Risk
          </Text>
          <Switch
            checked={earthquake}
            onChange={(e) => setEarthQuake(e.target.checked)}
            size="xl"
            onLabel="ON"
            offLabel="OFF"
          />
        </Flex>

        <Flex justify={"space-between"}>
          <Text mt={"3"} color={"gray"} fz={"18"} fw={"500"}>
            Include Flood & Tsunami Risk
          </Text>
          <Switch
            checked={flood}
            onChange={(e) => setFlood(e.target.checked)}
            size="xl"
            onLabel="ON"
            offLabel="OFF"
          />
        </Flex>

        <Flex justify={"space-between"}>
          <Text mt={"3"} color={"gray"} fz={"18"} fw={"500"}>
            Include Wildfire Risk
          </Text>
          <Switch
            checked={wildfire}
            onChange={(e) => setWildfire(e.target.checked)}
            size="xl"
            onLabel="ON"
            offLabel="OFF"
          />
        </Flex>
      </form>

      <Button
        size={"lg"}
        loading={loading}
        onClick={() =>
          handleContinue({
            weather,
            earthquake,
            flood,
            wildfire,
          })
        }
      >
        {" "}
        Continue
      </Button>
    </Card>
  );
}

export default CustomizeReport;
