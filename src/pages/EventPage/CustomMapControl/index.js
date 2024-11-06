import React, { useEffect, useRef, useState } from "react";
import { useToggleContext } from "context/ToggleContext";
import Button from "components/Buttons";

export const CustomMapControl = ({ searchType, onPlaceSelect }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const { setEventToggle } = useToggleContext();
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!window.google || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        fields: ["geometry", "name", "formatted_address"],
        types: [searchType],
        componentRestrictions: { country: "us" },
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        onPlaceSelect(place);
        setInputValue(place?.formatted_address);
      }
    });

    setPlaceAutocomplete(autocomplete);
  }, [onPlaceSelect]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === "") {
      onPlaceSelect(null);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row justify-between mb-5  items-center gap-[20px]">
        <div className="flex sm:flex-row justify-start w-full lg:w-auto flex-col gap-5">
          <input
            className="map-input"
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your Location"
          />
        </div>
      </div>
    </div>
  );
};
