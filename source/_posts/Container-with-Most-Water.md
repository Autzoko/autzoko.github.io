---
title: Container with Most Water
date: 2024-10-01 13:17:04
tags:
- algorithms
- two pointers
- greedy
categories:
- Algorithms
- Problems
---
You are given an integer array **height** of length \$n\$. There are \$n\$ vertical lines drawn such that the two endpoints of the \$i^{th}\$ line are \$(i,0)\$ and \$(i, height_i)\$.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of the water a container can store.

**Examples:**

![Illustration](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg)

```
Input: height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
Output = 49;
```

```
Input: height = [1, 1];
Output = 1;
```

**Constraints:**

- \$ n = len(height) \$
- \$ 2 \le n \le 10^5 \$
- \$ 0 \le height_i \le 10^4 \$

## Solution

```cpp
class Solution {
public:
    using LL = long long;
    int maxArea(vector<int>& height) {
        LL left = 0, right = height.size() - 1;
        LL maxA = 0;

        while (left < right) {
            LL currentArea = min(height[left], height[right]) * (right - left);
            maxA = max(maxA, currentArea);

            if (height[left] < height[right]) left++;
            else right--;
        }
        
        return maxA;
    }
}
```

**Explanation:**

To solve this problem the **two pointers** technique is adopted. The *left* pointer starting at the index 0 and the *right* pointer starts at the end of the vector. Use *maxA* to keep track of the maximum area found. Then calculate the current area of the container and update it to the *maxA*. And we need to move the two pointers inwards to find the global maximum area. The method for moving inwards the pointers is to always move the smaller one (low one) the seeking a greater value that may increase the area.

