import React from "react";
import "./App.css";
import Graph from "./Graph";
import Variables from "./Variables";
import calculateMonthlyValues from "./calculateMonthlyValues";

function App() {
  return (
    <div className="App" style={{ padding: `20px` }}>
      <Variables>
        {(getVarVal) => {
          const months = calculateMonthlyValues({ getVarVal });
          return Object.keys(months[0]).map((key) => {
            // eslint-disable-next-line
            debugger;
            return (
              <Graph
                title={key}
                key={key}
                wealth={months.map((month) => month[key])}
              />
            );
          });
        }}
      </Variables>
    </div>
  );
}

export default App;
