---
title: Merge-Find
date: 2024-06-27 17:04:54
tags:
- algorithms
- data structure
categories:
- Algorithms
- Concepts
---

**Merge-find**(并查集), also known as **Disjoint-set**, is a data structure that efficiently handles the dynamic connectivity problem. It supports two primary operations: **Union** (to merge two sets) and **find** (to determine the representative or root of a set). This structure is especially useful in algorithms that deal with partitioning elements into disjoint subsets, such as *Kruskal's algorithm* for finding the Minimum Spanning Tree.

## Key Concepts
### Data Structure

- Parent Array: Each element has a pointer to its parent. For a representative element (root), the parent points to itself.
- Rank Array (or Size Array): Keeps track of the rank (or size) of the tree rooted at a particular element. It helps in optimizing the union operation by always attaching the smaller tree under the larger one.

### Operations

1. Find:
   - Determines which subset a particular element is in.
   - Can be used to check if two elements are in the same subset.
   - Uses **path compression** to flatten the structure, making future operations faster.

2. Union:
   - Merges two subsets into a single subset.
   - Uses **union by rank** or **union by size** to keep the tree shallow, improving efficiency.


## Pseudocode and Explanation

### Initialization
- Parent Array: Each element is its own parent initially.
- Rank Array: Initialize rank or size of each element as \$0\$ or \$1\$.

### Find with Path Compression
**Pseudocode:**
```cpp
int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}
```

**Explanation:**
- Recursively traverses the parent pointers until the root is found.
- Path compression flattens the tree by making every node point directly to the root, reducing the time complexity for future operations.

### Union by Rank

**Pseudocode:**
```cpp
void union(int x, int y) {
    int rootX = find(x);
    int rootY = find(y);

    if (rootX != rootY) {
        // union by rank
        if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
    }
}
```
**Explanation:**
- Find the roots of the elements \$x\$ and \$y\$.
- Attach the smaller tree under the larger tree to keep the overall structure balanced.
- If both trees are of the same rank, make one the parent of the other and increase its rank.


## Complete C++ Implementation
```cpp
class UnionFind {
private:
    vector<int> parent;
    vector<int> rank;

public:
    UnionFind(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    void merge(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);

        if (rootX != rootY) {
            if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
        }
    }

    bool connected(int x, int y) {
        return find(x) == find(y);
    }
};
```