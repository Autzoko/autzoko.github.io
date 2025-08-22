---
title: Cheese Way
date: 2024-06-27 17:57:49
tags:
- algorithms
- merge-find
categories:
- Algorithms
- Problems
---
There is a large block of cheese with a height of \$h\$. We can assume its length and width are infinitely large. Inside this cheese, there are many spherical holes of the same radius. We can establish a spatial coordinate system within this cheese, where the bottom surface of the cheese is at \$z=0\$ and the top surface of the cheese is at \$z=h\$.

Currently, there is a little mouse named *Jerry* on the bottom surface of the cheese. Jerry knows the coordinates of the centers of all the holes in the cheese. If two holes are tangent or intersect, Jerry can move from one hole to another. Specially, if a hole is tangent to or intersects the bottom surface, Jerry can enter the hole from the bottom surface of the cheese; if a hole is tangent to or intersects the top surface, Jerry can exit from the hole to the top surface of the cheese.

Jerry, located on the bottom surface of the cheese, wants to know if he can utilize the existing holes to reach the top surface of the cheese without damaging the cheese.

Each input stream contains varies of data.

In the first line, it includes an integer \$T\$ which indicates the total number of input data lines. Then it followed by \$T$ lines of data, each line is formatted as \$n,h,r\$, separated by `space`, representing number of holes, height of cheese, and the radius of holes. The following \$n\$ lines contains three integers \$x,y,z\$, separated by `space`, representing the coordinate of each hole.

## Solution

```cpp
class Cheese {
private:
    vector<int> parent;
    vector<int> rank;
    vector<Long64> X;
    vector<Long64> Y;
    vector<Long64> Z;
    Long64 radius;
    Long64 height;

    bool isConnect(Long64 x1, Long64 y1, Long64 z1, Long64 x2, Long64 y2, Long64 z2, Long64 r) {
        return pow((x1 - x2), 2) + pow((y1 - y2), 2) + pow((z1 - z2), 2) <= 4 * r * r;
    }

    int find(int x) {
        return x == parent[x] ? x : (parent[x] = find(parent[x]));
    }

    void merge(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        if (rootX != rootY) {
            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY; 
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootX] = rootY;
                rank[rootY]++;
            }
        }
    }

public:
    Cheese(vector<Long64> X, vector<Long64> Y, vector<Long64> Z, Long64 radius, Long64 height) {
        X = X;
        Y = Y;
        Z = Z;
        radius = radius;
        height = height;

        int n = X.size();

        // use n + 1 and n + 2 to represent top and bottom
        parent.resize(n + 2);
        rank.resize(n + 2, 1);

        for (int i = 0; i < n + 2; i++) {
            parent[i] = i;
        }
    }

    bool canReach() {
        int n = X.size();
        for (int i = 1; i <= n; i++) {
            if (Z[i] <= radius) {
                merge(i, n + 1);
            }
            if (Z[i] + radius >= height) {
                merge(i, n + 2);
            }
        }

        for (int i = 1; i <= n; i++) {
            for (int j = i + 1; j <= n; j++) {
                if (isConnect(X[i], Y[i], Z[i], X[j], Y[j], Z[j], radius)) {
                    merge(i, j);
                }
            }
        }

        return find(n + 1) == find(n + 2);
    }
};
```

**Explanation:**

This is a typical **Merge-find** problem. We can split the holes into two sets: those whom connected to the bottom surface and those whom connected to the top surface. If a hole  tangent to or intersects the bottom surface, then merge it into the *bottom set*, similarly, we can merge those whom are connected to the top surface to the *top set*. To determine whether there are holes can form a pathway, we just need to know whether the top surface and the bottom surface are in the same set. All above can be achieved by using **merge-find** algorithm.
