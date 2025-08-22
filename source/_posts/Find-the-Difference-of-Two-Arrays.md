---
title: Find the Difference of Two Arrays
date: 2024-10-17 13:05:19
tags:
- algorithms
- hash table
categories:
- Algorithms
- Problems
---
Given two **0-indexed** integer arrays \$nums1\$ and \$nums2\$, return a list **answer** if size 2 where:

- `answer[0]` is a list of all distinct integers in \$nums1\$ which are not present in \$nums2\$.
- `answer[1]` is a list of all distinct integers in \$nums2\$ which are not present in \$nums1\$.

**Examples:**

```
Input: nums1 = [1, 2, 3], nums2 = [2, 4, 6];
Output = [[1, 3], [4, 6]];
```

```
Input: nums1 = [1, 2, 3, 3], nums2 = [1, 1, 2, 2];
Output: [[3], []];
```

**Constraints:**

- \$ 1 \le len(nums1), len(nums2) \le 1000\$
- \$ -1000 \le nums1_i, nums2_i \le 1000

## Solution

```cpp
class Solution {
public:
    vector<vector<int>> findDifference(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> set1(nums1.begin(), nums1.begin());
        unordered_set<int> set2(nums2.begin(), nums2.begin());

        vector<int> distinct_nums1, distinct_nums2;

        for (int num : set1) {
            if (set2.count(num) == 0) distinct_nums1.push_back(num);
        }
        for (int num : set2) {
            if (set1.count(num) == 0) distinct_nums2.push_back(num);
        }

        return {distinct_nums1, distinct_nums2};
    }
}
```

**Explanation:**

Convert the two array into *set*, same elements will be merged within a set, and since the `unordered_set` in C++ is implmented with **hash table with separate chaining method**, using a specific algorithm to hash element into difference *bucket* which points to a chain that contains valid elements. Thus, in ideal case, the `find` function can get the target value with the time complexity of \$O(1)\$, and the worst case the time complexity reduces to \$O(n)\$. So, in the solution, the `unordered_set` is utilized to merge same elements and for faster method to judge whether a value the set is contained.