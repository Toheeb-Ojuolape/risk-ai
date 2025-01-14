/* eslint-disable react/prop-types */
import { Box, Card, Grid, Text, Stack, Center } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import HalfDonut from "../../elements/Graph/HalfDonut";
import { risk_data } from "../../data";
import Weather from "../../elements/Cards/Weather";
import NewsCard from "../../elements/Cards/NewsCard";
import RiskRange from "../../elements/RIskRange";
import { getHazardRisk, getRisk } from "../../utils";

function ReportContent({ data }) {
  const earthquakerisk =
    data.earthquake &&
    getHazardRisk(data.flood, data.weather.location.country, "earthquake");
  const floodrisk =
    data.flood &&
    getHazardRisk(data.flood, data.weather.location.country, "flood");
  const wildfirerisk =
    data.earthquake &&
    getHazardRisk(data.flood, data.weather.location.country, "wildfire");

  const risk = getRisk(data.risk_score);

  return (
    <Box my={"lg"}>
      <Grid>
        <Grid.Col span={{ base: 12, md: 12, lg: 8 }}>
          <Card p={"md"} radius={"md"}>
            <Text fw={"bold"} fz={"h4"}>
              Summary
            </Text>
            <ReactMarkdown>{data.summary}</ReactMarkdown>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 12, lg: 4 }}>
          {" "}
          <Card p={"md"} radius={"md"}>
            {" "}
            <Text my={"md"} fw={"bold"} align={"center"}>
              Risk Score
            </Text>
            <Center>
              <HalfDonut
                data={risk_data}
                label={data.risk_score}
                width={"300"}
              />
            </Center>
            <div className="risk-chip" style={{ background: risk.color }}>
              {" "}
              {risk.type}
            </div>
            <RiskRange />
          </Card>
        </Grid.Col>
      </Grid>

      <Stack mt={"md"}>
        <Text fw={"bold"} fz={"h2"}>
          Weather Report
        </Text>

        <Weather
          weather={data.weather}
          user_city={data.weather.location.region}
        />
      </Stack>

      {data.earthquake && data.earthquake.length && (
        <Stack>
          <Text fw={"bold"} fz={"h2"}>
            Earthquake:{" "}
            <span style={{ color: earthquakerisk.color }}>
              {earthquakerisk.type}
            </span>
          </Text>

          <div className="scroll">
            {data.earthquake.map((news, i) => (
              <NewsCard
                key={i}
                title={news.title}
                description={news.description}
                link={news.url}
                date={news["published date"]}
                publisher={
                  news.publisher.title.length > 30
                    ? news.publisher.title.slice(0, 20) + "..."
                    : news.publisher.title
                }
              />
            ))}
          </div>
        </Stack>
      )}

      {data.flood && data.flood.length && (
        <Stack my={"lg"}>
          <Text fw={"bold"} fz={"h2"}>
            Floods:{" "}
            <span style={{ color: floodrisk.color }}> {floodrisk.type}</span>
          </Text>

          <div className="scroll">
            {data.flood.map((news, i) => (
              <NewsCard
                key={i}
                title={news.title}
                description={news.description}
                link={news.url}
                date={news["published date"]}
                publisher={
                  news.publisher.title.length > 30
                    ? news.publisher.title.slice(0, 20) + "..."
                    : news.publisher.title
                }
              />
            ))}
          </div>
        </Stack>
      )}

      {data.wildfires && data.wildfires.length && (
        <Stack my={"lg"}>
          <Text fw={"bold"} fz={"h2"}>
            Wildfire:{" "}
            <span style={{ color: wildfirerisk.color }}>
              {wildfirerisk.type}
            </span>
          </Text>

          <div className="scroll">
            {data.wildfires.map((news, i) => (
              <NewsCard
                key={i}
                title={news.title}
                description={news.description}
                link={news.url}
                publisher={
                  news.publisher.title.length > 30
                    ? news.publisher.title.slice(0, 20) + "..."
                    : news.publisher.title
                }
              />
            ))}
          </div>
        </Stack>
      )}
    </Box>
  );
}

export default ReportContent;
