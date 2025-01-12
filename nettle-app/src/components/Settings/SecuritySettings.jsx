import {Card, Flex, Switch, Text } from "@mantine/core";


function SecuritySettings() {
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


      <Text fz={"h2"} fw={"bolder"} pt={"md"}>
        Security Settings
      </Text>

      <form className="form">
        <Flex justify={"space-between"}>
          <Text mt={"3"} color={"gray"} fz={"18"} fw={"500"}>
            Enable 2-Factor Authentication
          </Text>
          <Switch size="xl" onLabel="ON" offLabel="OFF" />
        </Flex>

        <Flex justify={"space-between"}>
          <Text mt={"3"} color={"gray"} fz={"18"} fw={"500"}>
            Enable Speech to Text
          </Text>
          <Switch checked={true} size="xl" onLabel="ON" offLabel="OFF" />
        </Flex>

        <Flex justify={"space-between"}>
          <Text mt={"3"} color={"gray"} fz={"18"} fw={"500"}>
            Enable Multi-session Login
          </Text>
          <Switch checked={true} size="xl" onLabel="ON" offLabel="OFF" />
        </Flex>

        <Flex justify={"space-between"}>
          <Text mt={"3"} color={"gray"} fz={"18"} fw={"500"}>
            Enable Report Download
          </Text>
          <Switch checked={true} size="xl" onLabel="ON" offLabel="OFF" />
        </Flex>
      </form>
    </Card>
  );
}

export default SecuritySettings;
