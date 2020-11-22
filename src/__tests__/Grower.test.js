import Grower from "../Grower";

it("should grow the right amount", () => {
  const grower = new Grower({ initialValue: 1, growthPerPeriod: 0.1 });

  grower.tick();

  expect(grower.value).toBe(1.1);

  grower.tick();

  expect(Math.round(grower.value * 100)).toBe(Math.round(1.21 * 100));
});

it("should grow the right amount 2", () => {
  const grower = new Grower({ initialValue: 2, growthPerPeriod: 0.1 });

  grower.tick();

  expect(Math.round(grower.value * 100)).toBe(Math.round(2.2 * 100));
});
