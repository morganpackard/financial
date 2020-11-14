import React, { useState } from "react";
import "./App.css";
import Graph from "./Graph";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const MONTHS = 12;

const YEARS = 55;

const growthFactory = (percentPerYear) => {
  let value = 1;
  return () => {
    value = value * (1 + percentPerYear / (100 * MONTHS));
    return value;
  };
};

class Grower {
  constructor({ initialValue, growthPerYear }) {
    this.value = initialValue;
    this.growthPerYear = growthPerYear;
  }
  tick() {
    this.value = this.value * (1 + this.growthPerYear / 12);
  }
  add(value) {
    this.value += value;
  }
  subtract(value) {
    this.value -= value;
  }
}

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
  "Inl Stock Value": { val: 500000 },
  "Home Purchase Price": { val: 1000000 },
  "House Appreciation": { val: 0.03 },
  Inflation: { val: 0.03 },
  "Stock Market Return": { val: 0.06 },
  "Monthly Rent Collected": { val: 2000 },

  "Down Payment": { val: 200000 },
  "Household Expenses": { val: 4500 },
  "Yearly Health Ins": { val: 18000 },
  "Income Tax on Rent": { val: 0.2 },
  "Property Tax Rate": { val: 0.015 },
  "Tax Rate on Stock Sale": { val: 0.2 },
  "Mortgage Payment": { val: 4000 },
};

function App() {
  const [varVals, setVarVals] = useState(
    Object.entries(variables).reduce((acc, [varName, varDescription]) => {
      return {
        ...acc,
        [varName]: varDescription.val,
      };
    }, {})
  );

  const getVarVal = (name) => {
    if (name in varVals) {
      return parseFloat(varVals[name]);
    } else {
      throw new Error(`no var named ${name} defined`);
    }
  };

  const growers = {
    stock: new Grower({
      initialValue: getVarVal("Inl Stock Value") - getVarVal("Down Payment"),
      growthPerYear: getVarVal("Stock Market Return"),
    }),
    monthlyCostOfLiving: new Grower({
      initialValue:
        getVarVal("Household Expenses") + getVarVal("Yearly Health Ins") / 12,
      growthPerYear: getVarVal("Inflation"),
    }),
    mortgage: new Mortgage({ monthlyPayment: getVarVal("Mortgage Payment") }),
    rentCollected: new Grower({
      initialValue: getVarVal("Monthly Rent Collected"),
      growthPerYear: 0.02,
    }),
    homeValue: new Grower({
      initialValue: getVarVal("Home Purchase Price"),
      growthPerYear: 0.03,
    }),
  };

  // stock value
  const calculateStocks = () => {
    Object.values(growers).forEach((grower) => grower.tick());

    const income = growers.rentCollected.value;
    const expenses =
      growers.monthlyCostOfLiving.value +
      growers.mortgage.value +
      income * getVarVal("Income Tax on Rent") +
      (growers.homeValue.value * getVarVal("Property Tax Rate")) / 12;

    const monthlyCashFlow = income - expenses;

    growers.stock.add(
      monthlyCashFlow +
        (monthlyCashFlow < 0
          ? monthlyCashFlow * getVarVal("Tax Rate on Stock Sale")
          : 0)
    );

    return growers.stock.value;
  };

  const wealth = new Array(MONTHS * YEARS)
    .fill(0)
    .map(() => Math.max(0, calculateStocks()));

  return (
    <div className="App" style={{ padding: `20px` }}>
      <Grid container spacing={2}>
        {Object.entries(variables).map(([varName, val]) => {
          return (
            <Grid item xs={2}>
              <TextField
                id="standard-basic"
                label={varName}
                value={varVals[varName]}
                onChange={(event) =>
                  setVarVals({ ...varVals, [varName]: event.target.value })
                }
              />
            </Grid>
          );
        })}
      </Grid>
      <div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <Graph wealth={wealth} />
    </div>
  );
}

export default App;
