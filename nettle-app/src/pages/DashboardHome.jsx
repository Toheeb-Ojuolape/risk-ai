import { Text, Box, Grid, Card, Center } from "@mantine/core";
import StatCard from "../elements/Cards/StatCard";
import HalfDonut from "../elements/Graph/HalfDonut";
import { risk_data } from "../data";
import BarChartComponent from "../elements/Graph/BarChartComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAssets } from "../store/asset.slice";
import { getReports } from "../store/report.slice";
import RiskRange from "../elements/RIskRange";
import { getRisk } from "../utils";

function DashboardHome() {
  const { displayName } = useSelector((state) => state.auth.user);
  const { loading, assets } = useSelector((state) => state.asset);
  const { loading: isReportLoading, reports } = useSelector(
    (state) => state.report
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssets());
    dispatch(getReports());
  }, []);

  // Function to calculate the average risk score
  const calculateAverageRiskScore = (assets) => {
    if (!assets.length) return 0;
    const totalRiskScore = assets.reduce(
      (acc, asset) => acc + (asset.risk_score || 0),
      0
    );
    return (totalRiskScore / assets.length).toFixed(1); // Average risk score with 2 decimal places
  };

  // Dynamically calculate stats
  const stats = [
    {
      title: "Assets",
      description: "Since last week",
      icon: "IconAsset",
      value: loading ? "Loading..." : assets.length, // Dynamically load the asset count
    },
    {
      title: "Reports",
      description: "Since last week",
      icon: "IconReportAnalytics",
      value: isReportLoading ? "Loading..." : reports.length, // Dynamically load the report count
    },
    {
      title: "Average Risk Score",
      description: "Since last week",
      icon: "IconGraph",
      value:
        loading || isReportLoading
          ? "Loading..."
          : calculateAverageRiskScore(reports),
    },
  ];

  return (
    <Box>
      <Text fz={"h2"}>
        {" "}
        Hello <strong>{displayName}</strong> 👋
      </Text>
      <Text>Here are your current stats:</Text>

      {/* Dashboard Stat Cards */}
      <Grid my={"md"} gutter={{ base: 5, xs: "md", md: "xl", xl: 24 }}>
        {stats.map((stat, i) => (
          <Grid.Col key={i} span={{ base: 12, md: 6, lg: 4 }}>
            <StatCard
              title={stat.title}
              value={stat.value} // Dynamically display the value
              icon={stat.icon}
              description={stat.description}
              loading={stat.value === "Loading..."}
            />
          </Grid.Col>
        ))}
      </Grid>

      {/* Dashboard Graphs and charts */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Card radius={"lg"} py={"32px"} shadow="md">
            <Text my={"lg"} fz={"h5"} fw={"bold"}>
              Risk History
            </Text>
            <Center>
              <BarChartComponent data={reports} name={"History"} />
            </Center>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Card py={"32px"} shadow="md">
            <Text my={"md"} fw={"bold"} align={"center"}>
              Average Risk Score
            </Text>
            <Center>
              <HalfDonut
                data={risk_data}
                label={calculateAverageRiskScore(reports)}
                width={"400"}
              />
            </Center>

            <div
              className="risk-chip"
              style={{
                background: getRisk(calculateAverageRiskScore(reports)).color,
              }}
            >
              {" "}
              {getRisk(calculateAverageRiskScore(reports)).type}
            </div>

            <RiskRange />
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default DashboardHome;
