---
title: String Compression
date: 2024-09-10 13:13:11
tags:
- algorithms
- two pointers
categories:
- Algorithms
- Problems
---

Given an array of characters **chars**, compress it using following algorithm:

Begin with an empty string **s**. For each group of consecutive repeating characters in **chars**:

- If the group length is \$1\$, append the character to *s*.
- Otherwise, append the charactoer followed by the group's length.

The compressed string **s** should not be returned separately, but instead, be stored in the input character array **chars**. Note that group lengths that are \$10\$ or longer will be split into multiple characters in **chars**.

After modifying the input array, return the new length of the array.

**Example:**

```
Input: chars = ["a","a","b","b","c","c","c"];
Output: 6, ["a","2","b","2","c","3"];
```

```
Input: chars = ["a"];
Output: 1, ["a"];
```

```
Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"];
Output: 4, ["a","b","1","2"];
```

**Constraints:**

- \$ 1 \le l_{chars} \le 2000 \$
- \$chars_i\$ is a lower case English letter, uppercase English letter, digit, or symbol.

## Solution

```cpp
class Solution {
public:
    int compress(vector<char>& chars) {
        int ans = 0;

        for (int i = 0; i < chars.size();) {
            const char letter = chars[i];
            int count = 0;

            while (i < chars.size() && chars[i] == letter) {
                count++;
                i++;
            }

            chars[ans++] = letter;

            if (count > 1) {
                for (const char c : to_string(count)) {
                    chars[ans++] = c;
                }
            }
        }
        return ans;
    }
}
```

**Explanation:**

Using two pointers to iterate original string and trach generated new string. Here, use **i** to iterate whole string and count the length of each group. Once a group's length is detected, use another pointer **ans** to write on the original string.

```
"aabbccc"
 ^              <-- i = 0
 ^              <-- ans = 0

"aabbccc"
  ^             <-- i++
 ^

"aabbccc"
   ^            <-- i++, n = 2, letter = a
 ^

"aabbccc"
   ^
  ^             <-- chars[ans++] = a

"a2bbccc"
   ^
   ^            <-- chars[ans++] = 2

"a2bbccc"
    ^           <-- i++, n = 1
   ^

"a2bbccc"
     ^          <-- i++, n = 2, letter = b
   ^

"a2bbccc"
     ^
    ^           <-- chars[ans++] = b

"a2b2ccc"
     ^
     ^          <-- chars[ans++] = 2

"a2b2ccc"
      ^         <-- i++
     ^

"a2b2ccc"
       ^        <-- i++, n = 3, letter = c
     ^

"a2b2ccc"
       ^
      ^         <-- chars[ans++] = c

"a2b2c3c"
       ^
       ^        <-- chars[ans++] = 3
```
