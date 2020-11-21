class Grower {
  constructor({ initialValue, growthPerYear }) {
    this.initialValue = initialValue;
    this.value = initialValue;
    this.growthPerYear = growthPerYear;
    this.count = 0;
  }
  tick() {
    this.count++;
    this.value =
      this.initialValue * (1 + this.growthPerYear / 12) ** this.count;
  }
  add(value) {
    this.value += value;
  }
  subtract(value) {
    this.value -= value;
  }
}

export default Grower;
