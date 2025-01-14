/* eslint-disable react/prop-types */

import { Card, Chip, Text } from "@mantine/core";

function NewsCard({ title, description, date, publisher, link }) {
  return (
    <Card
      className="pointer"
      align={"start"}
      mb={"md"}
      maw={"300px"}
      py={"lg"}
      px={"24px"}
      radius={"lg"}
      shadow={"sm"}
      onClick={()=>window.open(link, "_blank")}
    >
      <Text fw={"bold"} fz={"h4"}>{title.slice(0,50)}...</Text>

      <Text fz={"sm"} color={"gray"}>
        {description.slice(0,300)}...
      </Text>

      <Text  my={"lg"} fz={"xs"} color={"gray"}>{date}</Text>

      <Chip radius={"xs"}>{publisher}</Chip>
    </Card>
  );
}

export default NewsCard;
