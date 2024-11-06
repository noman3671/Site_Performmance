  import React, { useEffect, useRef, useState } from "react";
  import { Map, GoogleApiWrapper } from "google-maps-react";
  import { CustomMapControl } from "../CustomMapControl";
  import { DealersMarker } from "../DealersMarker";
  import { EventsMarker } from "../EventsMarker";
  import { useToggleContext } from "context/ToggleContext";

  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

  const MapWrapper = ({
    google,
    events,
    dealers,
    eventToggle,
    toggle,
    markerCluster,
    setMarkerCluster,
    dealerMarkerCluster,
    setDealerMarkerCluster,
    selectedPlace,
    setSelectedPlace,
  }) => {
    const mapRef = useRef(null);
    const eventInfoWindowRef = useRef(null);
    const dealerInfoWindowRef = useRef(null);
    const [currentMarker, setCurrentMarker] = useState(null);

    useEffect(() => {
      if (selectedPlace && mapRef.current) {
        const google = window.google;

        if (currentMarker) {
          currentMarker.setMap(null);
        }

        if (selectedPlace) {
          const marker = new google.maps.Marker({
            position: selectedPlace.geometry.location,
            map: mapRef.current,
            title: selectedPlace.name,
          });

          setCurrentMarker(marker);

          mapRef.current.setCenter(selectedPlace.geometry.location);
          mapRef.current.setZoom(15); 
        }
      }

      if (!selectedPlace && currentMarker) {
        currentMarker.setMap(null);
        setCurrentMarker(null);
      }
    }, [selectedPlace]); 

    const onMapReady = (mapProps, map) => {
      mapRef.current = map;
      eventInfoWindowRef.current = new mapProps.google.maps.InfoWindow({
        disableAutoPan: false,
      });
      dealerInfoWindowRef.current = new mapProps.google.maps.InfoWindow({
        disableAutoPan: false,
      });
    };

    const { setEventToggle } = useToggleContext();

    useEffect(() => {
      setEventToggle(true);
    }, []);

    return (
      <>
        <CustomMapControl onPlaceSelect={setSelectedPlace} />
        <Map
          google={google}
          onReady={onMapReady}
          zoomControl={false}
          streetViewControl={false}
          initialCenter={{
            lat: 37.09024,
            lng: -95.712891,
          }}
          zoom={3}
          mapTypeControl={false}
          fullscreenControl={false}
          containerStyle={{
            width: "100%",
            height: "623px",
            position: "relative",
            borderRadius: "10px",
            overflow: "hidden",
          }}
          style={{
            borderRadius: "10px",
            overflow: "hidden",
          }}
        
        >
          <EventsMarker
            map={mapRef.current}
            events={events}
            eventToggle={eventToggle}
            eventInfoWindowRef={eventInfoWindowRef}
            markerCluster={markerCluster}
            setMarkerCluster={setMarkerCluster}
          />
          <DealersMarker
            map={mapRef.current}
            dealers={dealers}
            toggle={toggle}
            dealerInfoWindowRef={dealerInfoWindowRef}
            dealerMarkerCluster={dealerMarkerCluster}
            setDealerMarkerCluster={setDealerMarkerCluster}
          />

          <div className="gradient-container h-[150px] flex lg:static overflow-hidden rounded-[10px] justify-center lg:bg-none bg-slate-0 items-center absolute w-full"></div>
        </Map>
      </>
    );
  };

  export default GoogleApiWrapper({
    apiKey: API_KEY,
    LoadingContainer: "div",
  })(MapWrapper);
