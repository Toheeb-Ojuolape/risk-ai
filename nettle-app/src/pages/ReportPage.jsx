import { useEffect } from "react";
import { Box, Button, Flex, Loader } from "@mantine/core";
import ReportContent from "../components/Report/ReportContent";
import { IconCloudDownload } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getReport } from "../store/report.slice";
import { usePDF } from "react-to-pdf";

function ReportPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, data } = useSelector((state) => state.report);
  const { toPDF, targetRef } = usePDF({
    filename: `Risk Report Asset ${id}.pdf`,
  });

  useEffect(() => {
    dispatch(getReport(id));
  }, []);

  return (
    <Box>
      <Flex justify={"end"}>
        {" "}
        <Button
          onClick={() => toPDF()}
          size={"lg"}
          leftSection={<IconCloudDownload />}
        >
          Download Report
        </Button>
      </Flex>
      {loading && <Loader />}
      {!loading && data && (
        <div ref={targetRef}>
          <ReportContent ref={targetRef} data={data} />
        </div>
      )}
    </Box>
  );
}

export default ReportPage;
