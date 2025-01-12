import { Box } from "@mantine/core";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReports } from "../store/report.slice";
import ReportTable from "../elements/Table/ReportsTable";

function AssetPage() {
  const dispatch = useDispatch();
  const { loading, reports } = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(getReports());
  }, []); //

  return (
    <Box>
    

      {loading ? "Loading assets..." : null}
      {!loading && <ReportTable loading={loading} data={reports} />}
    </Box>
  );
}

export default AssetPage;
