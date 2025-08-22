---
title: Unique Binary Search Trees
date: 2024-07-01 11:51:44
tags:
- algorithms
- dynamic programming
categories:
- Algorithms
- Problems
---

Given a integer $n$, return the number of structurally unique **BST**'s (binary search trees) which has exactly $n$ nodes of unique values from $1$ to $n$.

**Example:**

```
Input: n = 3;
Output: 5;
```

**Constraints:**

$1 \le n \le 19$

### Solution

```cpp
class UniqueBinarySearchTrees {
public:
    int numTrees(int n) {
        int *dp = new int[n + 1];
        fill_n(dp, n + 1, 0);
        dp[0] = dp[1] = 1;
        for(int i = 2; i <= n; i++) {
            for(int j = 1; j <= i; j++) {
                dp[i] += dp[j - 1] * dp[i - j];
            }
        }
        return dp[n];
    }
};
```

**Explanation:**

Assume that the number of **BST**s of $n$ nodes is $G(n)$, and $f(i)$ denotes the number of BSTs whose root value is $i$, thus:

$$
G(n)=\sum_{i=1}^n f(i)
$$

And when $i$ is the root node, the number of nodes of its left subtree is $i-1$, and the number of nodes of its right subtree is $n-i$, thus

$$
f(i)=G(i-1)\times G(n-i)
$$

Fusing above two equations, the ***Catalan Number Equation*** is deduced:

$$
G(n)=\sum_{i=0}^n G(i)\times G(n-1-i)
$$