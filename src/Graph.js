import React, { useState } from "react";
import PropTypes from "prop-types";
// style
const BAR_WIDTH = 1;

const Graph = ({ wealth, maxVal = 4000000, title }) => {
  const [mouseoverText, setMouseOverText] = useState("");

  return (
    <>
      <h2>{title}</h2>
      {wealth.map((money, idx) => (
        <div
          onMouseOver={() =>
            setMouseOverText(
              `Year: ${Math.floor(idx / 12)} ${new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(money)}`
            )
          }
          key={idx}
          style={{
            display: "inline-block",
            width: `${BAR_WIDTH}px`,
            height: `${(100 * Math.min(money, maxVal)) / maxVal}px`,
            backgroundColor: idx % 12 === 0 ? "#ff8400" : "#cccccc",
            borderLeft: "solid 1px #ffffff",
          }}
        ></div>
      ))}

      <div>{mouseoverText}</div>

      <div>
        <br />
        <br />
      </div>
    </>
  );
};

Graph.propTypes = {
  wealth: PropTypes.array,
  maxVal: PropTypes.number,
  title: PropTypes.string,
};

export default Graph;
