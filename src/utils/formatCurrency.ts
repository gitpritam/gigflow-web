export const formatBudget = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    //   style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
};
