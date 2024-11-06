import { LuPhone } from "react-icons/lu";
import ReactDOMServer from "react-dom/server";
import React, { useEffect, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { SaddlePinIcon, GlobeIcon, MapPinIcon } from "components/Icons";

const dealerIconUrl = `data:image/svg+xml,${encodeURIComponent(
  ReactDOMServer.renderToString(<SaddlePinIcon />)
)}`;

export const DealersMarker = ({
  map,
  dealers,
  toggle,
  dealerInfoWindowRef,
  dealerMarkerCluster,
  setDealerMarkerCluster,
}) => {
  const [activeMarker, setActiveMarker] = useState(null);

  useEffect(() => {
    if (!map || !dealers) return;

    const google = window.google;

    const markers = dealers
      ?.filter(
        (dealer) =>
          dealer.coordinates?.latitude && dealer.coordinates?.longitude
      )
      ?.map(
        (dealer) =>
          new google.maps.Marker({
            position: {
              lat: dealer.coordinates.latitude,
              lng: dealer.coordinates.longitude,
            },
            title: dealer.name,
            address: dealer?.address,
            website: dealer?.website,
            phone: dealer?.phone,
            map: toggle ? map : null,
            icon: dealerIconUrl,
          })
      );

    markers.forEach((marker) => {
      marker.addListener("click", () => {
        if (activeMarker === marker) {
          dealerInfoWindowRef.current.close();
          setActiveMarker(null);
        } else {
          const contentString = ReactDOMServer.renderToString(
            <div className="py-5 px-2">
              <h4 className="mb-2 AuthDealer_text !text-[#2B364B] text-[28px] font-normal">
                {marker.title}
              </h4>
              <div className="flex pt-3 flex-col gap-4">
                <div className="flex gap-3.5 ">
                  <MapPinIcon className="!w-auto !text-transparent" />
                  <p className="AuthDealer_text text-[14px] w-[288px] font-normal leading-[120%]">
                    {marker.address}
                  </p>
                </div>
                <div className="flex gap-3.5 ">
                  <GlobeIcon className="!w-auto !text-transparent" />
                  <p className="AuthDealer_text text-[14px] w-[288px] font-normal leading-[120%]">
                    {marker.website}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <LuPhone className="!bg-transparent !text-[18px] !text-[#5C80B6] !font-bold" />
                  <a
                    href={`tel:${marker.phone}`}
                    className="AuthDealer_text text-[14px] font-normal leading-[120%]"
                  >
                    {marker.phone}
                  </a>
                </div>
              </div>
            </div>
          );

          if (dealerInfoWindowRef.current) {
            dealerInfoWindowRef.current.setContent(contentString);
            dealerInfoWindowRef.current.open(map, marker);
            setActiveMarker(marker);
          }
        }
      });
    });

    let dealerMarkerClusterInstance = null;
    if (toggle) {
      dealerMarkerClusterInstance = new MarkerClusterer({
        map: map,
        markers: markers,
        renderer: {
          render({ count, position }) {
            const color = "#d11100";
            const svg = window.btoa(`
              <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
                  <circle cx="120" cy="120" opacity=".8" r="70" />    
              </svg>`);

            if (count > 1) {
              return new google.maps.Marker({
                position,
                icon: {
                  url: `data:image/svg+xml;base64,${svg}`,
                  scaledSize: new google.maps.Size(75, 75),
                },
                label: {
                  text: String(count),
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "12px",
                },
                zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
              });
            } else {
              return new google.maps.Marker({
                position,
                icon: {
                  url: `${window.location.origin}/location-pin.svg`,
                  scaledSize: new google.maps.Size(30, 30),
                },
              });
            }
          },
        },
      });
      setDealerMarkerCluster(dealerMarkerClusterInstance);
    } else {
      markers.forEach((marker) => marker.setMap(null));
      if (dealerMarkerCluster) {
        dealerMarkerCluster.clearMarkers();
      }
    }

    const handleMapClick = () => {
      if (dealerInfoWindowRef.current) {
        dealerInfoWindowRef.current.close();
        setActiveMarker(null);
      }
    };

    const mapClickListener = map.addListener("click", handleMapClick);

    return () => {
      markers.forEach((marker) => marker.setMap(null));
      if (dealerMarkerClusterInstance) {
        dealerMarkerClusterInstance.clearMarkers();
      }
      if (mapClickListener) {
        google.maps.event.removeListener(mapClickListener);
      }
    };
  }, [toggle, dealerInfoWindowRef]);

  return null;
};
