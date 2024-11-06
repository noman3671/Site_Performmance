import React, { useEffect, useMemo, useRef, useState } from "react";

const RangeSlider = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
  const sliderWidth = 281;
  const minLimit = 250;
  const maxLimit = 6999000;

  const getPositionFromValue = useMemo(
    () => (value) => 24 + ((value - minLimit) / (maxLimit - minLimit)) * sliderWidth,
    [minLimit, maxLimit, sliderWidth]
  );

  const getValueFromPosition = useMemo(
    () => (position) => Math.round(minLimit + ((position - 24) / sliderWidth) * (maxLimit - minLimit)),
    [minLimit, maxLimit, sliderWidth]
  );

  const [leftThumbPosition, setLeftThumbPosition] = useState(getPositionFromValue(minPrice));
  const [rightThumbPosition, setRightThumbPosition] = useState(getPositionFromValue(maxPrice));
  const [draggingThumb, setDraggingThumb] = useState(null);
  const lastMovedThumb = useRef(null);

  useEffect(() => {
    setLeftThumbPosition(getPositionFromValue(minPrice));
    setRightThumbPosition(getPositionFromValue(maxPrice));
  }, [minPrice, maxPrice, getPositionFromValue]);

  const handleThumbMove = (event, isMinThumb) => {
    event.preventDefault();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const boundingRect = event.target.closest("svg").getBoundingClientRect();
    const newPosition = Math.min(sliderWidth + 24, Math.max(24, clientX - boundingRect.left));
    const newValue = getValueFromPosition(newPosition);

    if (isMinThumb) {
      if (newValue < maxPrice && newValue >= minLimit) {
        requestAnimationFrame(() => {
          setMinPrice(newValue);
          setLeftThumbPosition(newPosition);
          lastMovedThumb.current = "min";
        });
      } else if (newValue >= maxPrice) {
        requestAnimationFrame(() => {
          setMinPrice(maxPrice);
          setLeftThumbPosition(rightThumbPosition);
        });
      }
    } else {
      if (newValue > minPrice && newValue <= maxLimit) {
        requestAnimationFrame(() => {
          setMaxPrice(newValue);
          setRightThumbPosition(newPosition);
          lastMovedThumb.current = "max";
        });
      } else if (newValue <= minPrice) {
        requestAnimationFrame(() => {
          setMaxPrice(minPrice);
          setRightThumbPosition(leftThumbPosition);
        });
      }
    }
  };

  const attachThumbEvents = (isMinThumb) => (event) => {
    event.preventDefault();
    setDraggingThumb(isMinThumb ? "left" : "right"); 
    const handleMove = (e) => handleThumbMove(e, isMinThumb);
    const handleEnd = () => {
      setDraggingThumb(null); 
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);
  };

  return (
    <svg
      width="329"
      height="24"
      viewBox="0 0 329 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="24" y1="12" x2="305" y2="12" stroke="#B0B0B0" strokeWidth="2" />
      <line
        x1={leftThumbPosition}
        y1="12"
        x2={rightThumbPosition}
        y2="12"
        stroke="#2B364B"
        strokeWidth="2"
      />
      {lastMovedThumb.current === "max" ? (
        <>
          <circle
            cx={leftThumbPosition}
            cy="12"
            r="11"
            fill={draggingThumb === "left" ? "#2B364B" : "white"}
            stroke="#2B364B"
            strokeWidth="2"
            onMouseDown={attachThumbEvents(true)}
            onTouchStart={attachThumbEvents(true)}
            style={{ cursor: "pointer" }}
          />
          <circle
            cx={rightThumbPosition}
            cy="12"
            r="11"
            fill={draggingThumb === "right" ? "#2B364B" : "white"}
            stroke="#2B364B"
            strokeWidth="2"
            onMouseDown={attachThumbEvents(false)}
            onTouchStart={attachThumbEvents(false)}
            style={{ cursor: "pointer" }}
          />
        </>
      ) : (
        <>
          <circle
            cx={rightThumbPosition}
            cy="12"
            r="11"
            fill={draggingThumb === "right" ? "#2B364B" : "white"}
            stroke="#2B364B"
            strokeWidth="2"
            onMouseDown={attachThumbEvents(false)}
            onTouchStart={attachThumbEvents(false)}
            style={{ cursor: "pointer" }}
          />
          <circle
            cx={leftThumbPosition}
            cy="12"
            r="11"
            fill={draggingThumb === "left" ? "#2B364B" : "white"}
            stroke="#2B364B"
            strokeWidth="2"
            onMouseDown={attachThumbEvents(true)}
            onTouchStart={attachThumbEvents(true)}
            style={{ cursor: "pointer" }}
          />
        </>
      )}
    </svg>
  );
};

export default RangeSlider;
