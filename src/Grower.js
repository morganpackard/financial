class Grower {
  constructor({ initialValue, growthPerPeriod }) {
    if (typeof growthPerPeriod === "undefined") {
      throw new Error("growthPerPeriod is required for growers");
    }

    if (typeof initialValue === "undefined") {
      throw new Error("initialValue is required for growers");
    }

    this.initialValue = initialValue;
    this.value = initialValue;
    this.growthPerPeriod = growthPerPeriod;
    this.count = 0;
  }
  tick() {
    this.count++;
    this.value = Math.max(0, this.value * (1 + this.growthPerPeriod));
  }
  add(value) {
    this.value += value;
  }
  subtract(value) {
    this.value -= value;
  }
}

export default Grower;
