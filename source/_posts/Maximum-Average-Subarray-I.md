---
title: Maximum Average Subarray I
date: 2024-10-08 15:40:31
tags:
- algorithms
- sliding window
categories:
- Algorithms
- Problems
---

You are given an integer array **nums** consisting of \$ n\$ elements, and an integer \$ k\$. Find a contiguous subarray whose length is equal to \$ k\$ that has the maximum average value and return this value. Any answer with a calculation error less than \$10^{-5}\$ will be accepted.

**Example:**

```
Input: nums = [1, 12, -5, -6, 50, 3], k = 4;
Output: 12.75000;
```

```
Input: nums = [5], k = 1;
Output: 5.00000;
```

**Constraints:**

- \$ n = len(nums) \$
- \$ 1 \le k \le n \le 1-^5 \$
- \$ -10^4 \le nums_i \le 10^4 \$

## Solution

```cpp
class Solution {
public:
    using LL = long long;
    double findMaxAverage(vector<int>& nums, int k) {
        LL sum = 0;
        for (int i = 0; i < k; i++) {
            sum += nums[i];
        }
        LL maxSum = sum;
        for (int i = 0, j = k; j < nums.size(); i++, j++) {
            sum = sum - nums[i] + nums[j];
            maxSum = max(maxSum, sum);
        }
        return (double)maxSum / (double)k;
    }
}
```

**Explanation:**

This problem uses the **Sliding Window** technique. To reduce the calculation when sliding, first we do not compute the average each time, we can only calculate the sum of the window and divide it at last when return. Since the length of the window is fixed, so each step it move we just need to subtract the left margin value and add the value next to the right margin then the new sum of the window is get. Slide it step by step and update the *maxSum* to find the maximum value of the array.