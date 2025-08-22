---
title: Binary Search
date: 2024-09-25 16:13:50
tags:
- algorithms
- string
categories:
- Algorithms
- Study Notes
---

The basic pattern of a binary search problem is to find a target element in an **orderly** list.

The model problem is [Leetcode 704](https://leetcode.com/problems/binary-search/)

Here are two points that would make mistakes:

- The boundary conditions for the loop
- The redefinition of search interval boundaris

To the boundary conditions for the loop

```c++
while (left < right)
```

or

```c++
while (left <= right)
```

we need to know when conditions can make the left and right boundary values equal and when not.

To the value of search interval boundaris

```c++
right = mid;
```

or

```c++
right = mid + 1;
```

we need to know how to redefine the boundary values of *left* and *right*.

## Loop Invariant

The loop invariant is a property (or expression) that always be *true* within every iteration of the loop. For the binary search problem, the loop invariant here is the **search interval**, aka. the value of boundaries *left* and *right*.

Here we discuss this search interval should be **left-closed, right-open** or **left-closed, right-closed**.

### Left-closed Right-closed Interval

Since this is a closed interval, both the left and right boundary values of the interval should be valid (i.e., legitimate values). There for, at that time, the left pointer will point to `0`, and the right pointer will point to `nums.size()-1`.

```c++
int left = 0, right = nums.size() - 1;
```

For the loop condition, since both the left and right boundaris can be included in a closed interval, it is reasonable for the left and right boundaries to be equal. Therefore, the condition for the `while` loop should be `left <= right`.

When updating the boundary values in this case, we should notice that the right boundary is closed, thus the new right boudary is \$mid - 1$ when `nums[mid] > target` and left boundary is \$mid + 1\$ when `nums[mid] < target`.

### Left-closed Right-open Interval

Similar to the left-closed right-closed interval, the boundary values are updated in the same way. However, in this case, since the right boundary is open, the condition of the `while` loop should be `left < right` here. And when updating boundary values, the right one should be \$ mid\$ rather than \$mid + 1\$ because the boundary value is included by the interval.

