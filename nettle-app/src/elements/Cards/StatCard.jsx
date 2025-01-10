/* eslint-disable react/prop-types */

import { Card, Text, Flex } from "@mantine/core";
import * as allIcons from "@tabler/icons-react";

function StatCard({ title, description, icon, value }) {
  const Icon = allIcons[icon];

  return (
    <Card
      h={"150px"}
      align={"start"}
      mb={"md"}
      w={"auto"}
      py={"lg"}
      px={"24px"}
      radius={"lg"}
      shadow={"sm"}
    >
      <Flex justify={"space-between"}>
        <Text>{title}</Text>
        {icon && <Icon />}
      </Flex>

      <Text fz={"h1"} fw={"bold"}>
        {value}
      </Text>

      <Text fz={"sm"} color={"gray"}>
        {description}
      </Text>
    </Card>
  );
}

export default StatCard;
