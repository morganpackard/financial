import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

const Variables = ({ children }) => {
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
    "Mortgage Payment": { val: 4000 },
    "Annual Maintenance % of Value": { val: 0.005 },
  };

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

  return (
    <>
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
      {children(getVarVal)}
    </>
  );
};

Variables.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Variables;
