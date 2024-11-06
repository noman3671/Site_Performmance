import React from "react";
import GaugeComponent from "react-gauge-component";
import "./styles.css";

const Gauge = ({ score, label, horseName,style }) => {
  return (
    <div className="gauge-container">
      <p className="gauge-label line-clamp-1">{label}</p>
      <GaugeComponent
        style={style}
        className="table-saddle__title"
        type="semicircle"
        arc={{
          colorArray: [
            "#EF4444",
            "#EF4444",
            "#FBBF24",
            "#FBBF24",
            "#22C55E",
            "#22C55E",
            "#22C55E",
          ],
          padding: 0.02,
          subArcs: [
            { limit: 40 },
            { limit: 60 },
            { limit: 70 },
            {},
            {},
            {},
            {},
          ],
        }}
        pointer={{ type: "blob", animationDelay: 0 }}
        value={score}
        labels={{
          valueLabel: {
            style: {
              fill: "#2B364B",
            },
          },
          tickLabels: {
            hideMinMax: true,
          },
        }}
      />
      <p className="gauge-horseName">{horseName}</p>
    </div>
  );
};

export default Gauge;
