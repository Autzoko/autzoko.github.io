---
title: Greatest Common Divisor of Strings
date: 2024-09-03 17:35:53
tags:
- algorithms
- string
categories:
- Algorithms
- Problems
---
For two strings **s** and **t**. We say **t** divides **s** if and only \$ s = t + t + ... + t \$ (i.e., **t** is concatenated with itself one or more times).

Given two strings ```str1``` and ```str2```, return the largest string **x** such that **x** divides boths ```str1``` and ```str2```.

**Example:**

```
Input: str1 = "ABABC", str2 = "ABC"
Ouput: "ABC"
```

```
Input: str1 = "ABABAB", str2 = "ABAB"
Output: "AB"
```

```
Input: str1 = "LEET", str2 = "CODE"
Output: ""
```

**Constraints:**

- \$ 1 \le len_{str1}, len_{str2} \le 1000 \$
- ```str1``` and ```str2``` consist of English uppercase letters.

## Solution

```cpp
class Solution {
public:
    string gcdOfStrings(string str1, string str2) {
        return (str1 + str2 == str2 + str1) ?
                str1.substr(0, gcd(size(str1), size(str2))) : "";
    }
};
```

**Explanation:**
For two strings, if they are consisted by the same substrings (or same ingradient), their combination in opposite order should be the same. For example, is string *A* is ```ababab```, string *b* is ```abab```, it's obvious that they have the same ingradient ```ab```, so let's combine them as \$ a + b \$ and \$ b + a \$, their results should be same. So, after we make sure that both two strings are made of the same ingradient, we can use **gcd** to find their greatest common division.

Proof:
Assume \$str_1=nX\$ and \$str_2=mX\$ where \$X\$ represents the common divisor of these two strings. Thus, the concatenated string \$str_1+str_2\$ equals \$(n+m)X\$. We get substring of length \$\mathrm{gcd}(len_1, len_2)\$, if this length equals the size of \$str_2\$, which means the size of \$str_2\$ is divisible by \$str_1\$, any division should be equal when divised by \$\mathrm{gcd}(str_1, str_2)\$. The core is that \$str_1 + str_2 = str_2 + str_1\$.

**General Solution:**

```cpp
class Solution {
    bool check(string t, string s) {
        int lenx = (int)s.length() / (int)t.length();
        string ans = "";
        for (int i = 0; i < lenx; i++) {
            ans = ans + t;
        }
        return ans == s;
    }
public:
    string gcdOfStrings(string str1, string str2) {
        int len1 = (int)str1.length(), len2 = (int)str2.length();
        for (int i = min(len1, len2); i >= 1; i--) {
            if (len1 % i == 0 && len2 % i == 0) {
                string X = str1.substr(0, i);
                if (check(X, str1) && check(X, str2)) return X;
            }
        }
        return "";
    }
}
```