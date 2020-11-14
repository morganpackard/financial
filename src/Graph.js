import React from "react";
// style
const BAR_WIDTH = 1;

const Graph = ({ wealth }) => {
  const maxStocks = wealth.reduce((val, acc) => (val > acc ? val : acc), 0);

  return (
    <>
      {wealth.map((money, idx) => (
        <div
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

      <div>
        Max:{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(maxStocks)}
      </div>
    </>
  );
};

export default Graph;
