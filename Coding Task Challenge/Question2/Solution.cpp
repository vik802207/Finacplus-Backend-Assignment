#include <bits/stdc++.h>
using namespace std;

// Compute average coins needed for values 1..maxAmount
double avgCoinsForRange(const vector<int> &denoms, int maxAmount = 99) {
    const int INF = 1e9;
    vector<int> dp(maxAmount + 1, INF);
    dp[0] = 0;

    for (int coin : denoms) {
        for (int x = coin; x <= maxAmount; x++) {
            dp[x] = min(dp[x], dp[x - coin] + 1);
        }
    }

    long long sum = 0;
    for (int i = 1; i <= maxAmount; i++) sum += dp[i];
    return (double)sum / maxAmount;
}

vector<vector<int>> allCombinations;
vector<int> nums;
int k = 6;

// Generate all combinations of size k
void generateCombinations(int index, int start, vector<int> &curr) {
    if ((int)curr.size() == k) {
        allCombinations.push_back(curr);
        return;
    }
    for (int i = start; i < nums.size(); i++) {
        curr.push_back(nums[i]);
        generateCombinations(index + 1, i + 1, curr);
        curr.pop_back();
    }
}

void findBestDenominations() {
    int maxCoin = 50;
    nums.clear();

    // nums = [1..50]
    for (int i = 1; i <= maxCoin; i++)
        nums.push_back(i);

    allCombinations.clear();
    vector<int> curr;
    generateCombinations(0, 0, curr);

    vector<int> bestSet;
    double bestAvg = 1e18;

    for (auto &combo : allCombinations) {
        if (combo[0] != 1) continue; // must contain 1

        double avg = avgCoinsForRange(combo);

        if (avg < bestAvg) {
            bestAvg = avg;
            bestSet = combo;

            cout << "New Best: [ ";
            for (int x : combo) cout << x << " ";
            cout << "] Average: " << avg << "\n";
        }
    }

    cout << "\nFinal Best Set: [ ";
    for (int x : bestSet) cout << x << " ";
    cout << "]\n";

    cout << "Average Coins: " << bestAvg << "\n";
}

int main() {
    findBestDenominations();
    return 0;
}
