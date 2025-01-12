/* eslint-disable react/prop-types */
import {
  Card,
  InputLabel,
  TextInput,
  Text,
  Stack,
  Grid,
  NumberInput,
  Button,
  Select,
} from "@mantine/core";
import { UploadImage } from "../../elements/UploadImage";
import LocationInput from "../../elements/Forms/LocationInput";
import { useForm } from "@mantine/form";
import assetsService from "../../services/assetsService";
import { useState } from "react";

function AssetForm({ handleContinue }) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      title: "",
      address: "",
      city: "",
      country: "",
      price: "",
      years_of_use: "",
      last_incident: "",
      location: null,
      type: "",
    },
    validate: {
      type: (val) => (val ? null : "Please select a type"),
      title: (val) => (val.length ? null : "Please enter asset name"),
      location: (val) => (val ? null : "Please enter asset location"),
      price: (val) => (val ? null : "Please enter asset price"),
      years_of_use: (val) => (val ? null : "Please enter Years of Use"),
      last_incident: (val) =>
        val ? null : "Please enter Asset's last incident date",
    },
  });

  async function addAsset() {
    console.log(form.values);
    const asset = {
      ...form.values,
      ...{
        address: form.values.location.address,
        city: form.values.location.city,
        country: form.values.location.country,
        latitude: form.values.location.lat,
        longitude: form.values.location.lng,
      },
    };
    delete asset.location;
    try {
      setLoading(true);
      await assetsService.addAsset(asset);
      handleContinue();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <Card
      radius={"lg"}
      px={"xl"}
      shadow={"md"}
      maw={"650px"}
      my={"xl"}
      mx={"auto"}
    >
      <Text fz={"h2"} fw={"bold"} pt={"md"}>
        Add Asset
      </Text>
      <form className="form" onSubmit={form.onSubmit(() => addAsset())}>
        <Stack>
          <InputLabel className="label">Asset Type</InputLabel>
          <Select
            data={["Automobiles/Locomotives","Furnitures", "Heavy Equipment", "Land/Building"]}
            onChange={(value) =>
              form.setFieldValue("type",value)
            }
            value={form.values.type}
            error={form.errors.type}
            variant={"filled"}
            size={"lg"}
          />
        </Stack>
        <Stack>
          <InputLabel className="label">Asset Name</InputLabel>
          <TextInput
            value={form.values.title}
            size={"lg"}
            variant={"filled"}
            onChange={(event) =>
              form.setFieldValue("title", event.currentTarget.value)
            }
            error={form.errors.title}
          />
        </Stack>

        <Stack>
          <InputLabel className="label">Asset Location</InputLabel>
          <LocationInput
            handleSelect={(location) =>
              form.setFieldValue("location", location)
            }
            error={form.errors.location}
          />
        </Stack>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <InputLabel className="label">Assets Years of Use</InputLabel>
            <NumberInput
              value={form.values.years_of_use}
              size={"lg"}
              variant={"filled"}
              onChange={(event) => form.setFieldValue("years_of_use", event)}
              error={form.errors.years_of_use}
              hideControls
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <InputLabel className="label">Asset Price</InputLabel>
            <NumberInput
              prefix={"$"}
              size={"lg"}
              variant={"filled"}
              value={form.values.price}
              onChange={(event) => form.setFieldValue("price", event)}
              error={form.errors.price}
              hideControls
            />
          </Grid.Col>
        </Grid>

        <Stack>
          <InputLabel className="label">Last Incident Date</InputLabel>
          <TextInput
            value={form.values.last_incident}
            size={"md"}
            variant={"filled"}
            type="date"
            onChange={(event) =>
              form.setFieldValue("last_incident", event.currentTarget.value)
            }
            error={form.errors.last_incident}
          />
        </Stack>

        <Stack>
          <InputLabel className="label">Upload Image of Asset</InputLabel>

          <UploadImage />
        </Stack>

        <Button loading={loading} type={"submit"} size={"lg"} w={"100%"}>
          {" "}
          Continue
        </Button>
      </form>
    </Card>
  );
}

export default AssetForm;
