const maxProfit = (prices) => {
  let profit = 0;
  let minPrice = prices[0];
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - minPrice;
      minPrice = prices[i];
    } else {
      minPrice = Math.min(minPrice, prices[i]);
    }
  }

  console.log("profit", profit);
  return profit;
};

maxProfit([7, 1, 5, 3, 6, 4]);
maxProfit([1, 2, 3, 4, 5]);
maxProfit([7, 6, 4, 3, 1]);
