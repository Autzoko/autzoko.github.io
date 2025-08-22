---
title: Move Zeroes
date: 2024-09-18 17:51:36
tags:
- algorithms
- two pointers
categories:
- Algorithms
- Problems
---

Given an integer array **nums**, move all \$0\$'s to the end of it while maintaining the relative order of the non-zero elements.

Note that it must be done in-place without making a copy of the array.

**Example:**

```
Input: nums = [0, 1, 0, 3, 12];
Output: [1, 3, 12, 0, 0];
```

```
Input: nums = [0];
Output: [0];
```

**Constraints:**

- \$ 1 \le len_{nums} \le 10^4 \$
- \$ -2^{31} \le nums_i \le 2^{32} - 1\$

## Solution

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int left = 0;
        for (int right = 0; right < nums.size(); right++) {
            if (nums[right] != 0) {
                swap(nums[right], nums[left]);
                left++;
            }
        }
    }
}
```

**Explanation:**
The solution use two pointers to separatly point to a non-zero value and a zero value. Initialy, these two point both point to the index 0. And if the right pointer is not 0, two pointers will be moved to their next index simultaneously. When the left point meets a zero value, it will stay on it, and swap the value with the right pointer. In other words, the zeroes with move to the tail of the vector like bulbles (imagine the bulble sort algorithm).
