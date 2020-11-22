import Grower from "./Grower";

const MONTHS = 12;

const YEARS = 55;

class Mortgage {
  constructor({ monthlyPayment, amount, rate }) {
    this.monthsElapsed = 0;
    this.monthlyPayment = monthlyPayment;
    this.amountOwed = amount;
    this.rate = rate;
  }
  tick() {
    const YEARS_OF_MORTGAGE = 30;
    if (this.monthsElapsed++ < 12 * YEARS_OF_MORTGAGE) {
      this.value = this.monthlyPayment;

      const interestPayed = (this.amountOwed * this.rate) / 12;
      this.amountOwed = Math.max(
        0,
        this.amountOwed - (this.value - interestPayed)
      );
    } else {
      this.value = 0;
    }
  }
}

const calculateMonthlyValues = ({ getVarVal }) => {
  const growers = {
    stock: new Grower({
      initialValue: getVarVal("Inl Stock Value") - getVarVal("Down Payment"),
      growthPerPeriod: getVarVal("Stock Market Return") / 12,
    }),
    monthlyCostOfLiving: new Grower({
      initialValue:
        getVarVal("Household Expenses") + getVarVal("Yearly Health Ins") / 12,
      growthPerPeriod: getVarVal("Inflation") / 12,
    }),
    mortgage: new Mortgage({
      rate: 0.03,
      amount: getVarVal("Home Purchase Price") - getVarVal("Down Payment"),
      monthlyPayment: getVarVal("Mortgage Payment"),
    }),
    rentalIncome: new Grower({
      initialValue: getVarVal("Monthly Rent Collected"),
      growthPerPeriod: getVarVal("Inflation") / 12,
    }),
    homeValue: new Grower({
      initialValue: getVarVal("Home Purchase Price"),
      growthPerPeriod: getVarVal("House Appreciation") / 12,
    }),
    propertyTaxPerMonth: new Grower({
      initialValue:
        (getVarVal("Home Purchase Price") * getVarVal("Property Tax Rate")) /
        MONTHS,
      growthPerPeriod: getVarVal("Inflation") / 12,
    }),
    maintenancePerMonth: new Grower({
      initialValue:
        (getVarVal("Home Purchase Price") *
          getVarVal("Annual Maintenance % of Value")) /
        MONTHS,
      growthPerPeriod: getVarVal("Inflation") / 12,
    }),
  };

  const months = new Array(MONTHS * YEARS).fill(0).map(() => {
    Object.values(growers).forEach((grower) => grower.tick());

    const totalExpenses =
      growers.monthlyCostOfLiving.value +
      growers.mortgage.value +
      growers.propertyTaxPerMonth.value +
      growers.maintenancePerMonth.value;

    const totalIncome =
      growers.rentalIncome.value * (1 - getVarVal("Income Tax on Rent"));

    growers.stock.add(totalIncome - totalExpenses);

    return {
      liquid: Math.max(0, growers.stock.value),
      homeValue: growers.homeValue.value,
      amountOwed: growers.mortgage.amountOwed,
      netWorth:
        Math.max(0, growers.stock.value) +
        growers.homeValue.value -
        growers.mortgage.amountOwed,
    };
  });

  return months.filter((month) => month.liquid > 0);
};

export default calculateMonthlyValues;
