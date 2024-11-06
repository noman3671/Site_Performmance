import ReactDOMServer from "react-dom/server";
import { AuthDealersPinIcon } from "components/Icons";
import React, { useEffect, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useToggleContext } from "context/ToggleContext";
import { useModalContext } from "context/ModalContext";

const iconUrl = `data:image/svg+xml,${encodeURIComponent(
  ReactDOMServer.renderToString(<AuthDealersPinIcon />)
)}`;

export const EventsMarker = ({
  map,
  events,
  eventInfoWindowRef,
  markerCluster,
  setMarkerCluster,
}) => {
  const { toggleModal } = useModalContext();
  const [activeMarker, setActiveMarker] = useState(null);
  const { eventToggle, setSelectedEvents } = useToggleContext();



  useEffect(() => {
    if (!map || !events) return;

    const google = window.google;

    const markers = events
      ?.filter(
        (event) => event.coordinates?.latitude && event.coordinates?.longitude
      )
      ?.map(
        (event, index) =>
          new google.maps.Marker({
            position: {
              lat: event.coordinates.latitude,
              lng: event.coordinates.longitude,
            },
            title: event?.name,
            image: event?.image,
            map: eventToggle ? map : null,
            icon: iconUrl,
            customInfo: index,
          })
      );

    markers.forEach((marker) => {
      marker.addListener("click", () => {
        if (eventInfoWindowRef.current) {
          eventInfoWindowRef.current.close();
        }
        setActiveMarker(null);

        const elementsAtLocation = events.filter(
          (el) =>
            el.coordinates?.latitude === marker.getPosition().lat() &&
            el.coordinates?.longitude === marker.getPosition().lng()
        );
        if(window.innerWidth < 1024) {
          setSelectedEvents(elementsAtLocation);
          toggleModal("isEventModalOpen");
        } else {
          setSelectedEvents(elementsAtLocation);
        }
      });
    });

    let markerClusterInstance = null;
    if (eventToggle) {
      markerClusterInstance = new MarkerClusterer({
        map: map,
        markers: markers,
      });
      setMarkerCluster(markerClusterInstance);
    } else {
      markers.forEach((marker) => marker.setMap(null));
      if (markerCluster) {
        markerCluster.clearMarkers();
      }
    }

    const handleMapClick = () => {
      if (eventInfoWindowRef.current) {
        eventInfoWindowRef.current.close();
        setActiveMarker(null);
      }
    };

    const mapClickListener = map.addListener("click", handleMapClick);

    return () => {
      markers.forEach((marker) => {
        marker.setMap(null);
        google.maps.event.clearInstanceListeners(marker);
      });
      if (markerClusterInstance) {
        markerClusterInstance.clearMarkers();
      }
      if (mapClickListener) {
        google.maps.event.removeListener(mapClickListener);
      }
    };
  }, [map, events, eventToggle, eventInfoWindowRef]);
};
