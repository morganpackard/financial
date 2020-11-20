import React, { useState } from "react";
import PropTypes from "prop-types";
// style
const BAR_WIDTH = 1;

const Graph = ({ wealth }) => {
  const maxStocks = wealth.reduce((val, acc) => (val > acc ? val : acc), 0);

  const [mouseoverText, setMouseOverText] = useState("");

  return (
    <>
      {wealth.map((money, idx) => (
        <div
          onMouseOver={() =>
            setMouseOverText(
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(money)
            )
          }
          key={idx}
          style={{
            display: "inline-block",
            width: `${BAR_WIDTH}px`,
            height: `${(100 * money) / maxStocks}px`,
            backgroundColor: "#cccccc",
            borderLeft: "solid 1px #ffffff",
          }}
        ></div>
      ))}

      <div>{mouseoverText}</div>
    </>
  );
};

Graph.propTypes = {
  wealth: PropTypes.object,
};

export default Graph;
