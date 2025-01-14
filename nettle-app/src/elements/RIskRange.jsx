import { Box, Flex, Text } from "@mantine/core";

function RiskRange() {
  return (
    <Box>
      <Text>Key</Text>

      <Flex gap={"lg"}>
        <div className="green-box"></div>
        <Text>Low Risk (0 - 5)</Text>
      </Flex>

      <Flex gap={"lg"}>
        <div className="yellow-box"></div>
        <Text>Medium Risk (6 - 15)</Text>
      </Flex>

      <Flex gap={"lg"}>
        <div className="red-box"></div>
        <Text>High Risk (15 and greater)</Text>
      </Flex>
    </Box>
  );
}

export default RiskRange;
