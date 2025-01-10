import { Box, Button, Flex } from "@mantine/core";
import ChartTable from "../elements/Table/Table";
import { IconPlus } from "@tabler/icons-react";

function AssetPage() {
  return (
    <Box>
      <Flex my={"lg"} justify={"flex-end"}>
        <Button onClick={()=>window.location.href="/add-asset"} size={"lg"}>
          <IconPlus /> Add Asset
        </Button>
      </Flex>
      <ChartTable />
    </Box>
  );
}

export default AssetPage;
