---
title: Count Word with Given Prefix
date: 2024-06-25 16:53:41
tags:
- algorithms
- dynamic programming
categories:
- Algorithms
- Problems
---
Given an lexicographical order array \$words\$ with size of \$n\$, the strings among \$words\$ are all writen in lower case letters. And given a specific string \$prefix\$ with a length of \$m\$, count the number of strings in \$words\$ that have a prefix of \$prefix\$.

**Example:**

```
Input: ["aaa", "ba", "bac", "bat", "batbat", "batq", "bta", "c"];
Output: 3;
```

**Constraints:**

- The *time complexity* should be \$O(m\log n)\$

## Solution

```cpp
class CountPrefix{
private:
    string prefix;
    vector<string> words;

    bool hasPrefix(string& word, string& pref) {
        if (word.size() < pref.size()) return false;
        for (int i = 0; i < pref.size(); i++) {
            if (word[i] != pref[i])
                return false;
        }
        return true;
    }

    int findFirst(int left, int right) {
        int low = left, high = right, label = -1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (hasPrefix(words[mid], prefix)) {
                label = mid, high = mid - 1;
            } else if (prefix[0] < words[mid][0]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return label;
    }

    int findLast(int left, int right) {
        int low = left, high = right, label = -1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (hasPrefix(words[mid], prefix)) {
                label = mid, low = mid + 1;
            } else if (prefix[0] < words[mid][0]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }

        }
        return label;
    }

public:
    CountPrefix(vector<string> words, string prefix) : words(words), prefix(prefix) {}

    int count() {
        int from = findFirst(0, words.size() - 1);
        int to = findLast(0, words.size() - 1);

        if (from < 0) return 0;
        else return to - from + 1;
    }
};
```

**Explanation:**

The main idea of this algorithm is using *binary search* to find the boundary of words which contain the specific prefix. The function \$findFirst\$ denotes the position where first word has the prefix and function \$findLast\$ denotes the last one. The only difference between \$findFirst\$ and \$findLast\$ is that when hit a proper case, \$findFirst\$ continues to search the section before but the \$findLast\$ search the section behind. By doing this in repetition, the first one and the last one will be found.

About the *time complexity*, the time complexity of function \$hasPrefix\$ is \$O(m)\$. Suppose the time complexity of function \$findFirst\$ and \$findLast\$ is \$T(n)\$, then
\$\$
T(n)=T(\frac{n}{2}) + O(m), T(1) \in O(m),
\$\$
which means \$T(n) \in O(m \log n)\$. Thus the time complexity of \$countPrefix\$ is \$O(m\log n)\$.