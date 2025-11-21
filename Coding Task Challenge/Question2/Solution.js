function avgCoinsForRange(denoms, maxAmount = 99) {
  const INF = 1e9;
  const dp = new Array(maxAmount + 1).fill(INF);
  dp[0] = 0;

  for (const coin of denoms) {
    for (let x = coin; x <= maxAmount; x++) {
      dp[x] = Math.min(dp[x], dp[x - coin] + 1);
    }
  }

  let sum = 0;
  for (let i = 1; i <= maxAmount; i++) sum += dp[i];
  return sum / maxAmount;
}

function findBestDenominations() {
  const maxCoin = 50;
  const nums = [...Array(maxCoin).keys()].map(x => x + 1);

  let bestSet = null;
  let bestAvg = 1e9;

  // choose 6 denominations (one must be 1)
  function* combinations(arr, k, start = 0, curr = []) {
    if (curr.length === k) {
      yield curr.slice();
      return;
    }
    for (let i = start; i < arr.length; i++) {
      curr.push(arr[i]);
      yield* combinations(arr, k, i + 1, curr);
      curr.pop();
    }
  }

  for (const combo of combinations(nums, 6)) {
    if (combo[0] !== 1) continue;     // must contain 1
    const avg = avgCoinsForRange(combo);
    if (avg < bestAvg) {
      bestAvg = avg;
      bestSet = combo;
      console.log("New Best:", combo, "Average:", avg);
    }
  }

  console.log("\nFinal Best Set:", bestSet);
  console.log("Average Coins:", bestAvg);
}

findBestDenominations();
