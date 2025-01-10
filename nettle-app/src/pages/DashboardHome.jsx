import { Text, Box, Grid, Card, Center } from "@mantine/core";
import StatCard from "../elements/Cards/StatCard";
import DonutGraph from "../elements/Graph/DonutGraph";
import HalfDonut from "../elements/Graph/HalfDonut";
import { barchartdata, data } from "../data";
import BarChartComponent from "../elements/Graph/BarChartComponent";

function DashboardHome() {
  const name = "Toheeb";

  const stats = [
    {
      title: "Assets",
      description: "Since last week",
      icon: "IconAsset",
      value: 0,
    },
    {
      title: "Reports",
      description: "Since last week",
      icon: "IconReportAnalytics",
      value: 0,
    },
    {
      title: "Average Risk Score",
      description: "Since last week",
      icon: "IconGraph",
      value: 0,
    },
  ];
  return (
    <Box>
      <Text fz={"h2"}>
        {" "}
        Hello <strong>{name}</strong> 👋
      </Text>
      <Text>Here are your current stats:</Text>

      {/* Dashboard Stat Cards */}
      <Grid my={"md"} gutter={{ base: 5, xs: "md", md: "xl", xl: 24 }}>
        {stats.map((stat, i) => (
          <Grid.Col key={i} span={{ base: 12, md: 6, lg: 4 }}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              description={stat.description}
            />
          </Grid.Col>
        ))}
      </Grid>

      {/* Dashboard Graphs and charts */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Card radius={"lg"} py={"32px"} shadow="md">
            <Center>
              <DonutGraph data={data} label={"Natural Disaster"} />
            </Center>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Card py={"32px"} shadow="md">
            <Center>
              <HalfDonut data={data} label={"10"} />
            </Center>
          </Card>
        </Grid.Col>
      </Grid>

      <Grid my={"20px"}>
      <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
        <Card py={40} shadow={"md"}>
          <Center>
            <BarChartComponent data={barchartdata} name={"History"} />
          </Center>
        </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default DashboardHome;
