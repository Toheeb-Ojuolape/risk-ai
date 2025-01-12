import { Box, Button, Flex } from "@mantine/core";
import ChartTable from "../elements/Table/Table";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAssets } from "../store/asset.slice";

function AssetPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, assets } = useSelector((state) => state.asset);

  useEffect(() => {
    dispatch(getAssets());
  }, []); //

  return (
    <Box>
      <Flex my={"lg"} justify={"flex-end"}>
        <Button onClick={() => navigate("/add-asset")} size={"md"}>
          <IconPlus /> Add Asset
        </Button>
      </Flex>

      {loading ? "Loading assets..." : null}
      {!loading && <ChartTable loading={loading} assets={assets} />}
    </Box>
  );
}

export default AssetPage;
