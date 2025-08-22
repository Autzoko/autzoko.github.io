---
title: Kth Largest Sum in a Binary Tree
date: 2024-10-22 23:16:35
tags:
- algorithms
- binary tree
categories:
- Algorithms
- Problems
---

Given the **root** of a binary tree and a positive integer \$ k \$. The *level sum* in the tree is the sum
of the values of the nodes that are on the **same** level.
Return the \$k^{th}\$ largest level sum in the tree (not necessary distinct). If there are fewer than \$k\$ levels in the tree, return -1.

**Example:**

![Binary tree for example 1](https://assets.leetcode.com/uploads/2022/12/14/binaryytreeedrawio-2.png)

```
Input: root = [5, 8, 9, 2, 1, 3, 7, 4, 6], k = 2;
Output: 13;
Explanation: Level 3 has the 2nd largest sum;
```

```
Input: root = [1, 2, null, 3], k = 1;
Output: 3;
```

**Constraints:**

- The number of nodes in the tree is \$n\$.
- \$2 \le Node.val \le 10^5 \$
- \$1 \le k \le n\$

## Solution

```cpp
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode* left, TreeNode* right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    long long kthLargestLevelSum(TreeNode* root, int k) {
        vector<long long> res;
        queue<TreeNode*> q;

        q.push(root);

        while(!q.empty()) {
            int n = q.size();
            long long sum = 0;

            while (n--) {
                sum += (long long)q.front()->val;
                if (q.front()->left) q.push(q.front()->left);
                if (q.front()->right) q.push(q.front()->right);
                q.pop();
            }
            res.push_back(sum);
        }

        if (k > res.size()) return -1;
        sort(res.begin(), res.end(), greater<long long>());

        return res[k - 1];
    }
};
```

**Explanation:**
Since this problem needs us to calculate the sum of each level of the binary tree, a breadth-first traversal is required. The most used method for breadth-first traversal is to use a **queue**, the *CPP* style example code is this:

```cpp
void printTreeBreadthFirst(TreeNode* root) {
    queue<TreeNode*> q;

    if (root != nullptr) {
        q.push(root);
    }

    while (!q.empty()) {
        cout << q.front()->val << " --> ";
        if (q.front()->left) q.push(q.front()->left);
        if (q.front()->right) q.push(q.front()->right);
        q.pop();
    }
}
```

In this problem, the variable \$n\$ holds the number of nodes in this level, which \$n\$ equals current size of the queue. Thus, it only needs to use a inner loop to calculate the sum of the level by popping values from the queue, and meanwhile import the nodes of the next level by accessing the children of current head node of the queue.
