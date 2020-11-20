import React, { useState, useEffect } from "react";
import "./App.css";
import Graph from "./Graph";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const MONTHS = 12;

const YEARS = 55;

class Grower {
  constructor({ initialValue, growthPerYear }) {
    this.value = initialValue;
    this.growthPerYear = growthPerYear;
  }
  tick() {
    this.value = this.value + (this.value * this.growthPerYear) / 12;
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
  Description: { val: "Enter description here", type: "freeText" },
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
  "Annual Maintenance % of Value": { val: 0.005 },
  "Years of Ownership": { val: 30 },
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
      growthPerYear: getVarVal("House Appreciation"),
    }),
    propertyTaxPerMonth: new Grower({
      initialValue:
        (getVarVal("Home Purchase Price") * getVarVal("Property Tax Rate")) /
        MONTHS,
      growthPerYear: getVarVal("Inflation"),
    }),
    maintenancePerMonth: new Grower({
      initialValue:
        (getVarVal("Home Purchase Price") *
          getVarVal("Annual Maintenance % of Value")) /
        MONTHS,
      growthPerYear: getVarVal("Inflation"),
    }),
  };

  let moneyOwedOnHouse =
    getVarVal("Home Purchase Price") - getVarVal("Down Payment");

  const wealth = new Array(MONTHS * YEARS).fill(0).map((val, month) => {
    const INTEREST_RATE = 0.03;
    const interestPayment = (moneyOwedOnHouse * INTEREST_RATE) / MONTHS;
    const principlePayment = getVarVal("Mortgage Payment") - interestPayment;
    moneyOwedOnHouse -= principlePayment;

    // stock value
    const calculateStocks = () => {
      Object.values(growers).forEach((grower) => grower.tick());

      const homeSaleMonth = getVarVal("Years of Ownership") * MONTHS;

      const income =
        (month <= homeSaleMonth ? growers.rentCollected.value : 0) +
        (month === homeSaleMonth
          ? growers.homeValue.value - moneyOwedOnHouse
          : 0);

      const expenses =
        growers.monthlyCostOfLiving.value +
        (month <= homeSaleMonth ? growers.mortgage.value : 0) +
        (month <= homeSaleMonth
          ? growers.rentCollected.value * getVarVal("Income Tax on Rent")
          : 0); /*+
        growers.maintenancePerMonth.value +
        growers.propertyTaxPerMonth.value*/

      const monthlyCashFlow = income - expenses;

      growers.stock.add(
        monthlyCashFlow +
          (monthlyCashFlow < 0
            ? monthlyCashFlow * getVarVal("Tax Rate on Stock Sale")
            : 0)
      );

      return { stock: Math.max(growers.stock.value), expenses, income };
    };

    return calculateStocks();
  });

  debugger;

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
      <div>
        <br />
        <br />
        total cash after home sale:
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(wealth[getVarVal("Years of Ownership") * 12].stock)}
        <br />
        <br />
      </div>
      <Graph wealth={wealth.map((month) => month.stock)} />
      <Graph wealth={wealth.map((month) => month.expenses)} />
      <br />
      <br />
      Disclaimers: There are probably bugs in this thing! For now, just pay
      attention UP TO the point of selling the house. I think I am m still
      subtracting property tax after the sale of the house.
    </div>
  );
}

export default App;
