describe("Testing calculator", () => {
  it('should calculate the monthly rate correctly', function () {
    const value = { amount: 10000, years: 2, rate: 0.05 }
    expect(calculateMonthlyPayment(value)).toEqual("724.71");
  });

  it("should return a result with 2 decimal places", function () {
    const value = { amount: 10000, years: 2, rate: 0.05 }
    let string = calculateMonthlyPayment(value)
    let lastThree = string.substring(string.length - 3);

    expect(lastThree[0]).toBe(".");
    expect(isFinite(parseInt(lastThree[1]))).toBe(true);
    expect(isFinite(parseInt(lastThree[2]))).toBe(true);
  });
})
/// etc
