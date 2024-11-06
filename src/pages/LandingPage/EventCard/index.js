import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { gql, useQuery } from "@apollo/client";
import { LIST_EVENTS } from "apollo/queries/events";
import { useScrollContext } from "context/ScrollContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoggedIn } from "context/LoggedInContext";
import { useModalContext } from "context/ModalContext";
import RightArrowIcon from "assets/icons/arrow-right.svg?react";
import { HorseProfile } from "../HorseProfile";
import { Loader } from "@aws-amplify/ui-react";
import "./style.css";
import { Gallery } from "../Gallery";

export const EventCard = () => {
  const { refs, scrollFunctions } = useScrollContext();
  const navigate = useNavigate();

  const {
    loading,
    error,
    data: EventsData,
    refetch,
  } = useQuery(gql(LIST_EVENTS));

  useEffect(() => {
    const fetchEvents = async () => {
      await refetch();
    };
    fetchEvents();
  }, []);

  const location = useLocation();
  // const { toggleModal } = useModalContext();
  const { user, setIsAction } = useLoggedIn();

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleCarouselTurn = (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  };

  const handleBookNowClick = () => {
    setIsAction("BookEvent");
  
    document.documentElement.scrollIntoView({
      behavior: "instant",  
      block: 'start', 
    });
  
    navigate("/event");
  };
  

  const sliderSettings = {
    dots: true,
    infinite: EventsData?.listEvents?.items?.length >= 2,
    autoplay: true,
    arrows: false,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: handleCarouselTurn,
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    if (location?.state?.scrollToSecFive) {
      scrollFunctions.scrollToSecFive();
    }
  }, [location?.state]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Original dimensions are taken from downloaded svg
  const SVG_ORIGINAL_WIDTH = 940;
  const SVG_ORIGINAL_HEIGHT = 1870;

  const ratio = SVG_ORIGINAL_HEIGHT / SVG_ORIGINAL_WIDTH;
  const svgWidth =
    window.innerWidth < 640 ? windowWidth * 0.5 : windowWidth * 0.35;
  const svgHeight = ratio * svgWidth;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderOverlayAndContentContainer = () => {
    return (
      <div style={{ ...styles.overlay }}>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="w-[80%] mx-auto">
            <h1 className="saddlefit-title text-[24px] sm:text-[32px] leading-none xl:text-[64px] font-bold text-wrap event-title max-w-[212.39px] sm:max-w-[277px] xl:max-w-[537px] ml-2">
              SCHEDULE YOUR SADDLEFIT
            </h1>
            <Slider className="slider-section" {...sliderSettings}>
              {EventsData?.listEvents?.items
                ?.slice(0, 4)
                ?.map((item, index) => {
                  const startDateFormatted = formatDate(item.startDate);
                  const endDateFormatted = formatDate(item.endDate);
                  const formattedDateRange = `${
                    startDateFormatted.split(" ")[0]
                  } ${startDateFormatted.split(" ")[1]} - ${
                    endDateFormatted.split(" ")[1]
                  }`;

                  return (
                    <div key={index}>
                      <h1 className="text-[16px] leading-none xl:text-[24px] font-bold text-wrap event-title md:max-w-[400px] lg:max-w-[601px] mt-6">
                        {item.eventName}
                      </h1>

                      <p className="mt-4 event-date">
                        {formattedDateRange} | {item?.state}
                      </p>
                    </div>
                  );
                })}
            </Slider>
            <div className="flex flex-col sm:flex-row flex-start sm:items-center gap-[6.189px] sm:gap-[11.522px] xl:gap-[24px] sm:mt-[11.05px] xl:!mt-[24px]">
              <button
                onClick={handleBookNowClick}
                className="book-now-btn"
                primary
                whiteOutline
              >
                View Events
              </button>
              {/* <button
                onClick={handleBookNowClick}
                className="view_all_events_btn"
              >
                View all events
                <RightArrowIcon className="arrow_icon w-[12px] h-[12px] sm:h-[11.522px] xl:w-6 xl:h-6" />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSvgAndImageInside = (imageUrl, index) => {
    return (
      <svg
        key={index}
        style={{
          position: "absolute",
          zIndex: 1,
          width: `${svgWidth}px`,
          height: `${svgHeight}px`,
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${SVG_ORIGINAL_WIDTH} ${SVG_ORIGINAL_HEIGHT}`}
        fill="none"
      >
        <defs>
          <clipPath id="clipShape">
            <path d="M-455 2152.92C-455 2157.88 -450.233 2161.47 -445.519 2159.92C-333.47 2123.16 -102.405 2009.37 203.805 1659.06C365.538 1473.99 514.435 1392.52 633.81 1327.09C706.974 1287 770.192 1252.36 823.782 1202.32C900.797 1130.16 939.626 1040.35 939.626 935.469C939.626 830.588 900.476 740.46 823.781 668.614C770.191 618.579 706.974 583.939 633.81 543.847C514.435 478.416 365.538 396.948 203.805 211.881C-102.405 -138.433 -333.47 -252.22 -445.52 -288.982C-450.233 -290.528 -455 -286.915 -455 -281.954C-455 625.123 -455 1333.84 -455 2152.92Z" />
          </clipPath>
        </defs>

        <g
          clipPath="url(#clipShape)"
          style={{ WebkitClipPath: "url(#clipShape)" }}
        >
          <image
            height="100%"
            href={imageUrl}
            preserveAspectRatio="xMidYMid slice"
            style={{
              WebkitClipPath: "url(#clipShape)",
              background: "transparent",
            }}
          />
        </g>

        <path
          d="M622.276 1306.05L622.274 1306.05L621.589 1306.42C501.729 1372.12 350.028 1455.27 185.735 1643.26C-98.793 1968.77 -316.411 2086.8 -431 2129.41V2128.95V2124.17V2119.38V2114.6L-431 2109.82V2105.05V2100.27V2095.5V2090.73V2085.97V2081.2V2076.44V2071.68L-431 2066.93V2062.17V2057.42V2052.67V2047.92V2043.17V2038.43V2033.69V2028.95V2024.21L-431 2019.48V2014.74V2010.01V2005.28V2000.56V1995.83V1991.11V1986.39V1981.67L-431 1976.96V1972.24V1967.53V1962.82V1958.11V1953.4V1948.7V1944V1939.3L-431 1934.6V1929.9V1925.21L-431 1850.33L-431 1845.67V1841V1836.34V1831.68V1827.02V1822.37V1817.71V1813.06V1808.4L-431 1803.75V1799.1V1794.46V1789.81V1785.17V1780.52V1775.88V1771.24V1766.6V1761.96L-431 1757.33V1738.79V1734.16V1729.53V1724.91V1720.28L-431 1715.66V1711.03V1706.41V1701.79V1697.17V1692.55V1687.93V1683.32V1678.7V1674.09L-431 1669.48V1664.86V1660.25V1655.64V1651.04V1646.43V1641.82V1637.22V1632.61L-431 1628.01V1623.41V1618.8V1614.2V1609.6V1605.01V1600.41V1595.81V1591.22V1586.62L-431 1582.03V1577.43V1572.84V1568.25V1563.66V1559.07V1554.48V1549.89V1545.3L-431 1540.71V1536.13V1531.54V1526.96V1522.37V1517.79V1513.21V1508.62V1504.04V1499.46L-431 1494.88V1490.3V1485.72V1481.14V1476.56V1471.98V1467.41V1462.83V1458.25V1453.68L-431 1449.1V1444.53V1439.95V1435.38V1430.81V1426.23V1421.66V1417.09V1412.51L-431 1407.94V1403.37V1398.8V1394.23V1389.66V1385.09V1380.52V1375.95V1371.38V1366.81L-431 1362.24V1357.67V1353.1V1348.53V1343.96V1339.39V1334.83V1330.26V1325.69L-431 1321.12V1316.55V1311.98V1307.42V1302.85V1298.28V1293.71V1289.14V1284.57V1280.01L-431 1275.44V1270.87V1266.3V1261.73V1257.16V1252.6V1248.03V1243.46V1238.89V1234.32L-431 1229.75V1225.18V1220.61V1216.04V1211.47V1206.9V1202.32V1197.75V1193.18L-431 1188.61V1184.04V1179.46V1174.89V1170.32V1165.74V1161.17V1156.59V1152.02V1147.44L-431 1142.86V1138.29V1133.71V1129.13V1124.55V1119.98V1115.4V1110.82V1106.24L-431 1101.65V1097.07V1092.49V1087.91V1083.32V1078.74V1074.15V1069.57V1064.98V1060.4L-431 1055.81V1051.22V1046.63V1042.04V1037.45V1032.86V1028.26V1023.67V1019.08V1014.48L-431 1009.89V1005.29V1000.69V996.093V991.493V986.893V982.291V977.689V973.085L-431 968.481L-431 -258.47C-316.412 -215.865 -98.7939 -97.8342 185.734 227.674C350.027 415.671 501.729 498.82 621.589 564.517L622.274 564.893L622.276 564.894C695.96 605.271 756.389 638.532 807.385 686.14C879.244 753.461 915.626 837.251 915.626 935.469C915.626 1033.7 879.552 1117.17 807.376 1184.81C756.381 1232.41 695.956 1265.67 622.276 1306.05ZM-453.001 2137.12C-452.976 2137.11 -452.951 2137.1 -452.925 2137.09C-452.951 2137.1 -452.976 2137.11 -453.001 2137.12L-453.001 2137.12Z"
          stroke="white"
          strokeOpacity="0.24"
          strokeWidth="48"
        />
      </svg>
    );
  };

  return (
    <div ref={refs.sectionFiveRef} className="flex flex-col relative">
      {loading ? (
        <div className="flex justify-center items-center h-full w-full">
          <Loader
            filledColor="#2b364b"
            className="!h-[60px] !flex !items-center !text-center !justify-center"
          />
        </div>
      ) : (
        <div
          style={{
            ...styles.child,
            flex: undefined,
            height:
              window.innerWidth > 1023
                ? svgHeight - svgHeight * 0.45
                : svgHeight - svgHeight * 0.2,
            justifyContent: "start",
          }}
        >
          {EventsData?.listEvents?.items?.slice(0, 4)?.map(
            (item, index) =>
              index === currentSlide && (
                <img
                  key={index}
                  src={item?.image}
                  style={{
                    height: `${svgHeight}px`,
                    zIndex: -1,
                    overflow: "hidden !important",
                    objectFit: "cover",
                    objectPosition: "left",
                  }}
                />
              )
          )}

          {renderOverlayAndContentContainer()}
          {EventsData?.listEvents?.items
            ?.slice(0, 4)
            ?.map(
              (item, index) =>
                index === currentSlide && renderSvgAndImageInside(item?.image, index)
            )}
        </div>
      )}
      <div style={{ ...styles.child, backgroundColor: "white" }}>
        <HorseProfile />
      </div>
      <div style={{ position: "relative", backgroundColor: "white" }}>
        <Gallery />
      </div>
    </div>
  );
};

const styles = {
  child: {
    flex: 1,
    width: "100%",
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    background:
      "linear-gradient(270deg, #5C80B6 17.38%, rgba(92, 128, 182, 0.00) 100%)",
  },
};
