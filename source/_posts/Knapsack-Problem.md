---
title: Knapsack Problem
date: 2024-06-27 12:26:16
tags:
- algorithms
- optimization
categories:
- Algorithms
- Concepts
---
The **Knapsack Problem** (背包问题) is a classic optimization problem in computer science and mathematics. It involves a set of items, each with a weight and a value, and a knapsack with a maximum weight capacity. The goal is to determine the most valuable combination of items to include in the knapsack without exceeding its weight capacity.

## Variants of the Knapsack Problem

### 0/1 Knapsack Problem

In this version, each item can either be included in the knapsack or excluded; you can't take a fraction of an item. Formally, given \$n\$ items with weights \$w_1,w_2,...,w_n\$ and values \$v_1, v_2,...,v_n\$, and a knapsack with capacity \$W\$, the problem is to maximize the total value \$V\$ while ensuring that the total weight \$W'\$ dose not exceed \$W\$.

**Mathematical formulation:**
Maximize:
\$\$
V=\sum_{i=1}^n v_i x_i
\$\$
Subject to:
\$\$
\sum_{i=1}^n w_i x_i \le W
\$\$
Where \$x_i\$ is \$0\$ or \$1\$, indicating whether item \$i\$ is included.

### Fractional Knapsack Problem
In this version, you can take fractions of items. This allow for a greedy algorithm to achieve the optimal solution by taking items in decreasing order of their value-to-weight ratio until the knapsack is full.
**Mathematical formulation:**
Maximize:
\$\$
V=\sum_{i=1}^{n}v_i x_i
\$\$
Subject to:
\$\$
\sum_{i=1}^n w_i x_i \le W
\$\$
Where \$0 \le x_i \le 1 \$, indicating the fraction of item \$i\$ included.

## Solution Approaches

### Dynamic Programming
Used primarily for the 0/1 knapsack problem. It builds up a table of solutions to subproblems to find the optimal solution.

In the context of the 0/1 kanpsack problem, the **transition equation** helps build the dynamic programming solution. This equation is used to determine the maximum value achieveable by either including or excluding an item based on previous solutions. Let's delve into the specifics.

#### Dynamic Programming Transition Equation for 0/1 Knapsack Problem
For the 0/1 knapsack problem, the transition equation determines the maximum value \$dp_{i,w}\$ achievable using the first \$i\$ items with a maximum weight capacity \$w\$. The equation can be expressed as:
\$\$
dp_{i,w}=max(dp_{i-1,w}, dp_{i-1, w-w_i} + v_i)
\$\$
Where:
- \$dp_{i,w}\$ is the maximum value achievable with the first \$i\$ items and capacity \$w\$.
- \$v_i\$ and \$w_i\$ are the value and weight of the \$i\$-th item.
- \$dp_{i-1,w}\$ represents the maximum value without including the \$i\$-th item.
- \$dp_{i-1, w-w_i} + v_i\$ represents the maximum value including the \$i\$-th item, given that \$w-w_i\$ must be non-negative.

**Explanation:**
1. Initialzation:
   - \$dp_{0,w}=0\$ for all \$w\$, meaning if no items are considered, the maximum value is zero regradless of the weight capacity.
2. Recurrence:
   - For each item \$i\$ and each weight \$w\$
     - If the item's weight \$w_i\$ is greater than \$w\$, the item cannot be included, so the maximum value remains \$dp_{i-1,w}\$.
     - If the item's weight \$w_i\$ is less than or equal to \$w\$, consider two cases:
       - Exclude the item: The maximum value is \$dp_{i-1,w}\$.
       - Include the item: The maximum value is \$dp_{i-1, w-w_i} + v_i\$.
     - Take the maximum of these two cases.

#### Implementation
```cpp
int knapsack_DP(const vector<int>& values, const vector<int>& weights, int W) {
    int n = values.size();

    // create a 2-D DP table to store the maximum value for each subproblem
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    // iterate through each item
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[n][W];
}
```

### Greedy Algorithm
Effective for the fractional knapsack problem. It involves selecting items based on their value-to-weight ratio until knapsack is full.

#### Implementation

```cpp
struct Item {
    int value;
    int weight;
    double value_per_weight;
};

bool compare(const Item& a, const Item& b) {
    return a.value_per_weight > b.value_per_weight;
}

double fractionalKnapsack(const vector<int>& values, const vector<int>& weights, int W) {
    int n = values.size();
    vector<Item> items(n);

    for (int i = 0; i < n; i++) {
        items[i] = {values[i], weights[i], (double)values[i] / weights[i]};
    }

    sort(items.begin(), items.end(), compare);

    double total_value = 0.0;
    int current_weight = 0;

    for (const auto& item : items) {
        if (current_weight + item.weight <= W) {
            current_weight += item.weight;
            total_value += item.value;
        } else {
            int remain = W - current_weight;
            total_value += item.value_per_weight + remain;
            break;
        }
    }

    return total_value;
}
```