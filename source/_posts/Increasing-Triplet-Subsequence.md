---
title: Increasing Triplet Subsequence
date: 2024-09-10 11:43:09
tags:
- algorithms
- greedy
categories:
- Algorithms
- Problems
---

Given an integer array **nums**, return *true* if there exists a triple of indices \$\[i, j, k\]\$ such that \$ i \lt j \lt k\$ and \$nums_i \lt nums_j \lt nums_k\$. If no such indices exists, return *false*.

**Example:**

```
Input: nums = [1, 2, 3, 4, 5];
Output: true;
```

```
Input: nums = [5, 4, 3, 2, 1];
Output: false;
```

```
Input: nums = [2, 1, 5, 0, 4, 6];
Output: true;
```

**Constraints:**
- \$ 1 \le l_{nums} \le 5 \times 10^5 \$
- \$ -2^{31} \le nums_i \le 2^{31}-1\$

## Solution

```cpp
class Solution {
public:
    bool increasingTriplet(vector<int>& nums) {
        if (nums.size() < 3) return false;

        int i = INT_MAX, j = INT_MAX;

        for (int num : nums) {
            if (num <= i) {
                i = num;
            } else if (num <= j) {
                j = num;
            } else {
                return true;
            }
        }
        return false;
    }
};
```

**Explanation:**
The solution is based on keeping track of two minimum values, \$i\$ and \$j\$, while iterating through the array.

- Initialize two variables, \$i\$ and \$j\$, to **INT_MAX**.
- - If the element is less than or equal to \$i\$, update \$i\$ with the element.
- - If the element if greater than \$i\$ but less than or equal to \$j\$, update \$j\$ with the element.
- - If the element is greater than both \$i\$ and \$j\$, it means an increasing triplet is found, and the function returns *true*.
- If the loop completes without finding an increasing triplet, return *false*.

The time complexity is \$O(n)\$ and the space complexity is \$O(1)\$.