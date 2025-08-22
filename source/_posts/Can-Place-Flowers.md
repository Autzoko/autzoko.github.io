---
title: Can Place Flowers
date: 2024-09-05 18:51:44
tags:
- algorithms
- greedy
categories:
- Algorithms
- Problems
---

You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in **adjacent** plots.

Given an integer array **flowerbed** containing *0*s and *1*s, where *0* means empty and *1* means not empty, and an integer **n**, return **true** if *n* new flowers can be planted in the *flowerbed* without violating the no-adjacent flowers rule and *false* otherwise.

**Example:**

```
Input: flowerbed = [1, 0, 0 ,0 ,1], n = 1;
Output: true;
```

```
Input: flowerbed = [1, 0, 0, 0, 1], n = 2;
Output: false;
```

**Constraints:**

- \$ 1 \le len_{flowerbed} \le 2 \times 10^4 \$
- \$ flowerbed_i = 1 \or 0 \$
- \$ 0 \le n le len_{flowerbed} \$
- There are no two adjacent flowers in **flowerbed**.

## Solution


```cpp
class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
        for (int i = 0; i < flowerbed.size(); i++) {
            bool left = i == 0 || flowerbed[i - 1] == 0;
            bool right = i == flowerbed.size() - 1 || flowerbed[i + 1] == 0;

            if (left && right && flowerbed[i] == 0) {
                flowerbed[i] = 1;
                n--;
            }
        }

        return n <= 0;
    }
};
```

**Explanation:**

The basic idea of this solution is very simple: traverse the whole array, figure out that whether current place is *legal* for planting a new flower by looking left and looking right at each plot. If a plot is *0* and its left and right plots are both *0* either, it would a legal plot to plant, then we plant a new flower here by marking *1* and, accordingly, the total amount of flowers should be lessen. Also, here are two exceptional conditons, the boarder plots. So we need to judge them separatedly by looking right at the left margin and looking left at the right margin, the logic is same as other plots.

At last, we just need to simply check that whether all of the flowers have been planted, if yes return **true**, otherwise return **false**.