const { calculateFootprint } = require('../utils/calculateFootprint');

describe('calculateFootprint', () => {
  it('calculates footprint correctly for gas heating (no adjustment)', () => {
    const input = {
      electricity: 100, // 100 * 0.4 = 40
      naturalGas: 50,   // 50 * 5.3 = 265
      water: 1000,      // 1000 * 0.003 = 3
      householdSize: 2,
      heatingFuel: 'gas'
    };
    const result = calculateFootprint(input);
    expect(result.totalCO2e).toBe(308); // 40 + 265 + 3
    expect(result.perCapitaCO2e).toBe(154); // 308 / 2
    expect(result.breakdown.electricity).toBe(40);
    expect(result.breakdown.naturalGas).toBe(265);
    expect(result.breakdown.water).toBe(3);
    expect(result.breakdown.heatingAdjustment).toBe(0);

    // Explicit assertion that breakdown sum equals total
    const sum = result.breakdown.electricity + result.breakdown.naturalGas + result.breakdown.water + result.breakdown.heatingAdjustment;
    expect(sum).toBeCloseTo(result.totalCO2e, 2);
  });

  it('calculates footprint correctly for oil heating (1.25x on electricity and gas)', () => {
    const input = {
      electricity: 100, // 40
      naturalGas: 50,   // 265
      water: 1000,      // 3
      householdSize: 2,
      heatingFuel: 'oil'
    };
    const result = calculateFootprint(input);
    const heatingAdj = (40 + 265) * 0.25; // 76.25
    expect(result.totalCO2e).toBe(384.25); // 40 + 265 + 3 + 76.25
    expect(result.perCapitaCO2e).toBe(192.13); // 384.25 / 2 = 192.125 -> 192.13
    expect(result.breakdown.heatingAdjustment).toBe(76.25);
    expect(result.breakdown.water).toBe(3); // untouched by heating modifier

    // Explicit assertion that breakdown sum equals total
    const sum = result.breakdown.electricity + result.breakdown.naturalGas + result.breakdown.water + result.breakdown.heatingAdjustment;
    expect(sum).toBeCloseTo(result.totalCO2e, 2);
  });

  it('calculates footprint correctly for zero usage', () => {
    const input = {
      electricity: 0,
      naturalGas: 0,
      water: 0,
      householdSize: 1,
      heatingFuel: 'electric'
    };
    const result = calculateFootprint(input);
    expect(result.totalCO2e).toBe(0);
    expect(result.perCapitaCO2e).toBe(0);
    expect(result.breakdown.heatingAdjustment).toBe(0);
  });
  
  it('handles boundary condition with zero household size gracefully', () => {
    const input = {
      electricity: 10,
      naturalGas: 0,
      water: 0,
      householdSize: 0,
      heatingFuel: 'none'
    };
    const result = calculateFootprint(input);
    expect(result.totalCO2e).toBe(4);
    expect(result.perCapitaCO2e).toBe(0); // Should not divide by zero
  });
});
