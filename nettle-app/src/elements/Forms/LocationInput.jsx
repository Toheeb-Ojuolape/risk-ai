/* eslint-disable react/prop-types */

import { useState } from "react";
import { Loader, TextInput } from "@mantine/core";
import { useJsApiLoader } from "@react-google-maps/api";
import { IconMapPin } from "@tabler/icons-react";

const LocationInput = ({ handleSelect, error }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
  });

  const fetchSuggestions = (value) => {
    if (!isLoaded || !value) {
      setSuggestions([]);
      return;
    }

    const service = new window.google.maps.places.AutocompleteService();
    setLoading(true);

    service.getPlacePredictions({ input: value }, (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSuggestions(
          predictions.map((pred) => ({
            description: pred.description,
            placeId: pred.place_id,
          }))
        );
      } else {
        setSuggestions([]);
      }
      setLoading(false);
    });
  };

  const fetchPlaceDetails = (placeId) => {
    if (!isLoaded || !placeId) return;

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div") // Dummy element for PlacesService
    );

    service.getDetails({ placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const { lat, lng } = place.geometry.location;
        const addressComponents = place.address_components;

        // Extract city, country, and formatted address
        const getAddressPart = (types) =>
          addressComponents.find((comp) =>
            types.every((type) => comp.types.includes(type))
          )?.long_name;

        const city =
          getAddressPart(["locality"]) ||
          getAddressPart(["administrative_area_level_1"]);
        const country = getAddressPart(["country"]);
        const formattedAddress = place.formatted_address;

        handleSelect({
          city,
          country,
          address: formattedAddress,
          lat: lat(),
          lng: lng(),
        });
      }
    });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.description);
    setSuggestions([]);
    fetchPlaceDetails(suggestion.placeId);
  };

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div style={{ position: "relative"}}>
      <TextInput
        value={input}
        onChange={handleInputChange}
        placeholder="Search for a location"
        rightSection={loading && <Loader size="xs" />}
        leftSection={<IconMapPin />}
        error={error}
        size={"lg"}
        variant={"filled"}
      />
      {suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: 4,
            marginTop: 4,
            zIndex: 1000,
            width: "100%",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              {suggestion.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
