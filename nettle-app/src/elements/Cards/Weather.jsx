/* eslint-disable react/prop-types */

import dayjs from "dayjs";
import {
  Card,
  Flex,
  Grid,
  SegmentedControl,
  Text,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import { setUnit } from "../../store/weather.slice";
import { conditions } from "../../config";
import {
  IconArrowDown,
  IconArrowUp,
  IconCurrentLocation,
} from "@tabler/icons-react";

const Weather = ({ weather, user_city }) => {
  const getIconUrl = (url) => url.replace("//cdn.weatherapi.com/", "/");
  const unit = useSelector((state) => state.weather.unit);
  const unit_title = useSelector((state) => state.weather.unit_title);
  const weather_unit = useSelector((state) => state.weather.unit);
  const dispatch = useDispatch();

  if (!weather) return null;

  const forecast = JSON.parse(JSON.stringify(weather.forecast.forecastday));

  const today_condition = conditions.find(
    (condition) => condition.code === weather.current.condition.code
  );


  return (
    <div>
      <Card>
        <Flex align="center" gap="md" justify="space-between">
          <Text fz={"h3"} fw={"bold"}>
            Today&apos;s Weather
          </Text>
          <Flex align="center" gap="sm" justify="flex-end">
            <SegmentedControl
              data={[
                { label: "°C", value: "cen" },
                { label: "°F", value: "far" },
              ]}
              value={weather_unit}
              onChange={(value) => dispatch(setUnit(value))}
            />
          </Flex>
        </Flex>
      </Card>

      <Card>
        <Flex
          align="center"
          className={`p-10 rounded-lg border border-gray-200 border-solid mb-10 mt-4 ${today_condition?.bg}`}
          direction={{ base: "column", sm: "row" }}
          gap="md"
          justify="space-between"
        >
          <Flex className="gap-1" direction="column">
            {user_city?.toLowerCase() ===
              weather.location.name.toLowerCase() && (
              <Flex
                align="center"
                className="bg-gray-100 rounded-lg px-2 py-1 w-fit"
                gap="xs"
                justify="flex-start"
              >
                <IconCurrentLocation />
                <span className="text-xs">Current Location</span>
              </Flex>
            )}
            <h1 className="m-0">{weather.location.name}</h1>
            <span className="text-lg font-medium">
              {weather.location.country}
            </span>
            <span className="text-xs font-light">
              {dayjs(weather.location.localtime).format(
                "dddd, MMM DD YYYY hh:mm A"
              )}
            </span>
          </Flex>

          <Flex
            align="flex-center"
            className="gap-4"
            direction="column"
            justify="center"
          >
            <Text fz={"40px"} fw={"bolder"}>
              {unit === "cen" ? weather.current.temp_c : weather.current.temp_f}
              {unit_title}
            </Text>
            <Flex align="center" className="gap-4" justify="start">
              <img
                alt={weather.current.condition.text}
                src={getIconUrl(weather.current.condition.icon)}
              />
              <Flex
                align="flex-start"
                className="gap-1"
                direction="column"
                justify="flex-start"
              >
                <span className="text-lg font-light">
                  {weather.current.condition.text}
                </span>
                <span className="text-sm font-medium">
                  Feels like{" "}
                  {unit === "cen"
                    ? weather.current.feelslike_c
                    : weather.current.feelslike_f}
                  {unit_title}
                </span>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>

      <Grid my={"md"} gutter="md">
        {forecast.map((day, index) => (
          <Grid.Col key={index} span={{ base: 12, md: 3 }}>
            <Card>
              <Flex
                key={index}
                align="flex-start"
                className="gap-2 bg-gray-50 rounded-lg border-solid border-gray-200 p-2"
                direction="column"
                justify="flex-start"
              >
                <Flex
                  align="center"
                  className="w-full flex-grow"
                  gap="sm"
                  justify="space-between"
                >
                  <span className="text-2xl font-light">
                    {dayjs(day.date).format("dddd")}
                  </span>
                  <span className="text-sm font-extralight">
                    {dayjs(day.date).format("MM/DD")}
                  </span>
                </Flex>

                <Flex
                  align="flex-end"
                  className="w-full flex-grow"
                  gap="sm"
                  justify="space-between"
                >
                  <Flex
                    align="flex-start"
                    className="gap-1"
                    direction="column"
                    justify="flex-start"
                  >
                    <Flex align="center" gap="xs" justify="flex-start">
                      <IconArrowUp />
                      <span className="text-base font-normal">
                        {unit === "cen" ? day.day.maxtemp_c : day.day.maxtemp_f}
                        {unit_title}
                      </span>
                    </Flex>
                    <Flex align="center" gap="xs" justify="flex-start">
                      <IconArrowDown />
                      <span className="text-base font-normal">
                        {unit === "cen" ? day.day.mintemp_c : day.day.mintemp_f}
                        {unit_title}
                      </span>
                    </Flex>
                  </Flex>

                  <Flex align="flex-end" direction="column" justify="flex-end">
                    <img
                      alt={day.day.condition.text}
                      src={getIconUrl(day.day.condition.icon)}
                    />
                    <span className="text-sm font-normal">
                      {day.day.condition.text}
                    </span>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default Weather;
