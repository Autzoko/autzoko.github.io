---
title: Find If Array Can Be Sorted
date: 2024-11-06 13:38:18
tags:
- algorithms
- sorting
categories:
- Algorithms
- Problems
---
You are given a **0-indexed** array of positive integers `nums`.
In one operation, you can swap any two **adjacent** elements if they have the **same** number of *set bits* (1 presented in binary). You are allowed to do this operation *any* number of times (including zero).
Return `true` if you can sort the array, else return `false`.

**Examples:**

```
Input: nums = [8, 4, 2, 30, 15] => [0x1000, 0x100, 0x10, 0x11110, 0x1111];
Output: True => Sorted to [0x10, 0x100, 0x1000, 0x1111, 0x11110] == [2, 4, 8, 15, 30];
```

```
Input: nums = [3, 16, 8, 4, 2];
Output: False;
```

## Solution

```cpp
class Solution {
public:
    static bool canSortArray(const vector<int>& nums) {
        uint16_t pmax = 0, cmin = 0; cmax = 0;
        uint8_t pcnt = 0;
        for (const uint16_t v : nums) {
            if (const uint8_t ccnt = popcount(v); pcnt == ccnt) {
                cmin = min(cmin, v);
                cmax = max(cmax, v);
            } else if (cmin < pmax) {
                return false;
            } else {
                pmax = cmax;
                cmin = cmax = v;
                pcnt = ccnt;
            }
        }
        return cmin >= pmax;
    }
}
```

**Explanation:**

This solution divides the array into several groups by the number of bits that are set. The `popcount()` function here is an library function that used to find the number of set bits in a variable. And the `if (const uint8_t ccnt = popcount(v); pcnt == ccnt)` structure is to define a variable within the *if-else if-else* structure and use it for boolean expression in a brief way.
The *if-else if-else* structure in the code is doing mainly for:

- Checking set bits of current variable `v`, if current number of set bit `ccnt` equals the number of set bits of last variable `pcnt`, then they are in the same group. Then update the maximum and the minimum value of current group into `cmin` and `cmax`.
- If the minimum value of current group `cmin` is less than the greatest value of the last group `pmax`, then this array cannot be sorted because every number that presents in a relative back group must be greater than every number in a front group. Thus, program return *false* here.
- If `ccnt` does not equal `pcnt`, current value `v` belongs to a new group, so the maximum value of current group is assigned to `pmax`, the maximum of the previous group, then update `cmin` and `cmax` with current value, and `pcnt` with the number of set bit of `v`.

Above all, the core of this solution is to guarantee that for each group, their minimum value must be greater than the maximum value of every group in its front.
