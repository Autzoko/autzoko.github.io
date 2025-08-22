---
title: Edit Distance
date: 2024-05-21 20:54:36
tags:
- algorithms
- dynamic programming
categories:
- Algorithms
- Problems

---
Given two string **word1** and **word2**, return the minimum number of operation required to converted **word1** to **word2**.

Following three operations are permitted on a word:

- Insert a character
- Delete a character
- Replace a character

**Example:**

```
Input: word1 = "horse", word2 = "ros";
Output: 3;
```

**Constraints:**

- 0 <= len(word1), len(word2) <= 500
- **word1** and **word2** consist of lower case English letters

## Solution

```cpp
class EditDistance {
public:
    int minDistance(string word1, string word2) {
        word1 = " " + word1;
        word2 = " " + word2;

        int **matrix = new int*[word1.size()];
        for(int i = 0; i < word1.size(); i++) {
            matrix[i] = new int[word2.size()];
            fill_n(matrix[i], word2.size(), 0);
        }

        for(int i = 0; i < word1.size(); i++) {
            for(int j = 0; j < word2.size(); j++) {
                if(_min_(i, j) == 0) matrix[i][j] = _max_(i, j);
                else {
                    if(word1[i] == word2[j]) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    } else {
                        matrix[i][j] = _trimin_(
                            matrix[i - 1][j - 1],
                            matrix[i][j - 1],
                            matrix[i - 1][j]
                        ) + 1;
                    }
                }
            }
        }
        return matrix[word1.size() - 1][word2.size() - 1];
    }

private:
    int _min_(int i, int j) {
        return i < j ? i : j;
    }
    int _max_(int i, int j) {
        return i > j ? i : j;
    }
    int _trimin_(int x, int y, int z) {
        return _min_(x, y) < _min_(y, z) ? _min_(x, y) : _min_(y, z);
    }
};
```

**Explanation:**

Use **matrix[i][j]** to represents the edit distance between string **word1[0...i]** and **word2[0...j].** The index of string's content begins at 1, matrix[0][0] indicates the case that **word1** and **word2** are both vacant, which means their edit distance is 0. So, it is obvious that matrix[0][j] is the case when **word1** is empty and the length of **word2** is *j*, and their edit distance should be just *j*. Similarly, matrix[0][i] is the case when the length of **word1** is *i* and **word2** is empty, their edit distance is *i*.

Then we can deduce the equation for the above three operations accordingly:

- **matrix[i - 1][j] + 1**: insert the last character of **word1** into the tail of **word2**
- **matrix[i][j - 1] + 1**: delete the last character of **word2**
- **matrix[i - 1][j - 1] + 1**: replace the last character of **word2** by the last character of **word1**
