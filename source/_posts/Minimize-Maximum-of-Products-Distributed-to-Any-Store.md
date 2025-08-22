---
title: Minimize Maximum of Products Distributed to Any Store
date: 2024-11-13 23:15:06
tags:
- algorithms
- binary search
categories:
- Algorithms
- Problems
---
You are given an integer **n** indicating there are **n** specialty retail stores. There are **m** product types varying amounts, which are given as a **0-indexed** integer array `quantities`, where `quantities[i]` represents the number of products of the \$i^{th}\$ product type.
You need to distribute *all product* to the retail stores following these rules:

- A store can only be given **at most one product type** but can given **any** amount of it.
- After distribution, each store will have been given some number of products (possibly 0), Let \$x\$ represent the maximum number of products given to any store. You want \$x\$ to be as small as possible, i.e., you want to *minimize* the **maximum** of products that are given to any store.

Return the minimum possible \$x\$.

**Example:**

```
Input: n = 6, quantities = [11, 6];
Output = 3;
The 11 products of type 0 are distributed to the first four stores in the amount of [2, 3, 3, 3]. The 6 products of type 1 are distributed to the other two stores in the amount of [3, 3].
```

```
Input: n = 7, quantities = [15, 10, 10];
Output: 5;
[5, 5, 5, 5, 5, 5, 5];
```

```
Input: n = 1, quantities = [10000];
Output = 10000;
```

**Constraints:**

- \$1 \le m \le n \le 10^5\$
- \$1 \le quantities_i \le 10^5\$


## Solution

```cpp
class Solution {
public:
    int minimizedMaximum(int n, vector<int>& quantities) {
        int low{1}; // same as 'int low = 1;', but in a more safe way.
        int high = *max_element(quantities.begin(), quantities.end());
        while (low < high) {
            int mid = (low + high) / 2;
            int needed{0};
            for (int q : quantities) {
                needed += (q + mid - 1) / mid;
            }
            if (needed <= n) high = mid;
            else low = mid + 1;
        }
        return low
    }
}
```

**Explanation:**
The key idea of this solution is **binary search**, the variable `mid` here is used to indicate the possible maximum quantity that can be distributed to a single store. Variables `low` and `high` hold the lower bound and the upper bound of the quantity for distribution. Then use binary search to update the variable `mid` to find the possible minimized maximum quantity. The way to update `mid` is to check whether this value can be distributed within \$n\$ stores. Here using variable `needed` to hold the number of store that needs for distributing under `mid`. So traverse the `quantities` to compute the needed number of stores to distribute `q` products under `mid` is the upper bound. For example, if `q=7` then `mid=3`, since 7 products need 3 stores. If `needed` is less than \$n\$, which means the value of `mid` is greater, and there might a smaller solution, thus update `high` with `mid`. Otherwise, `mid` is to small, thus update `low` with `mid + 1`. When `low` and `high` converge, which means the minimized value `mid` is found, then return `low`.