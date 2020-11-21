import React, { useState, useEffect } from "react";
import "./App.css";
import Graph from "./Graph";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Grower from "./Grower";

const MONTHS = 12;

const YEARS = 55;

class Mortgage {
  constructor({ monthlyPayment }) {
    this.monthsElapsed = 0;
    this.monthlyPayment = monthlyPayment;
  }
  tick() {
    const YEARS_OF_MORTGAGE = 30;
    if (this.monthsElapsed++ < 12 * YEARS_OF_MORTGAGE) {
      this.value = this.monthlyPayment;
    } else {
      this.value = 0;
    }
  }
}

const variables = {
  Description: { val: "Enter description here", type: "freeText" },
  "Inl Stock Value": { val: 500000 },
  "Stock Market Return": { val: 0.06 },
};

function App() {
  const urlVars = (() => {
    try {
      return JSON.parse(decodeURI(window.location.hash).substr(1));
    } catch (e) {
      return {};
    }
  })();

  const [varVals, setVarVals] = useState({
    ...Object.entries(variables).reduce((acc, [varName, varDescription]) => {
      return {
        ...acc,
        [varName]: varDescription.val,
      };
    }, {}),
    ...urlVars,
  });

  useEffect(() => {
    const encodedVars = encodeURI(JSON.stringify(varVals));
    window.location.hash = encodedVars;
  });

  const getVarVal = (name) => {
    if (name in varVals) {
      return parseFloat(varVals[name]);
    } else {
      throw new Error(`no var named ${name} defined`);
    }
  };

  const growers = {
    stock: new Grower({
      initialValue: getVarVal("Inl Stock Value"),
      growthPerYear: getVarVal("Stock Market Return"),
    }),
  };

  const wealth = new Array(MONTHS * YEARS).fill(0).map((val, month) => {
    // stock value
    const calculateStocks = () => {
      Object.values(growers).forEach((grower) => grower.tick());

      return {
        stock: Math.max(0, growers.stock.value),
      };
    };

    return calculateStocks();
  });

  return (
    <div className="App" style={{ padding: `20px` }}>
      <Grid container spacing={2}>
        {Object.entries(variables).map(([varName, val]) => {
          return (
            <Grid item xs={val.type === "freeText" ? 12 : 2} key={varName}>
              <TextField
                id="standard-basic"
                label={varName}
                fullWidth={val.type === "freeText"}
                value={varVals[varName]}
                onChange={(event) =>
                  setVarVals({ ...varVals, [varName]: event.target.value })
                }
              />
            </Grid>
          );
        })}
      </Grid>
      <Graph wealth={wealth.map((month) => month.stock)} />
    </div>
  );
}

export default App;
