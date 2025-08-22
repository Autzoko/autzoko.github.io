---
title: SHA256 Algorithm
date: 2024-06-17 20:28:08
tags: 
- encryption
categories:
- Algorithms
- Encryptions
---
## Introduction

**SHA-256** encryption algorithm is a division from the **SHA-2** group, a.k.a. Secure Hash Algorithm 2. It can be known from the name that, the **SHA** is a type of hash function. This encryption algorithm encode the input message by hashing to encrypt and compress. The result of **SHA** encryption usually contains random alphanumeric characters.

## Explanations of SHA-256 Algorithm

Before explicitly explain the detailed algorithm of **SHA-256**, it is essential to figure out what should be done in advance. Three sections can be extracted: the constants that are used in the algorithm, how to preprocess the data, and the logical operations that are used. After understanding these, the algorithm itself is easy to handle.

### Before Dive into SHA-256

#### Constants

In the **SHA-256** algorithm, 8 hash initial values and 64 hash constants are used. First, the eight initial values are as follow:

```c
uint32_t H[8] = {
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
};
```

These numbers are selected from the first 32 bits of the decimal part of the square roots of the first eight natural prime numbers.

And the 64 hash constants are:

```c
static const uint32_t K[64] = {
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
};
```

Similar to before, these 64 constants are selected from the first 32 bits of the cube roots of the first 64 natural prime numbers.

### Data Preprocessing

The preprocessing stage of the **SHA-256** algorithm has two steps:

- Append '1' followed by enough '0's at the end of the data so that the length of the message modulo 512 equals 448.
- Then append 64 bits of message length information at the end with big endian.

*Notice that: albeit current length modulo 512 equals 448, the append operation is still necessary!*

For example, now here's data:

```c
01100001 01100010 01100011
```

Then we need to append a '1' and 423 '0's:

```c
01100001 01100010 01100011 1000000
00000000       ......      0000000
```

Finally, the length of the original message should be appended to the end of current data by big endian.

### Logical Operations

All of logical operations that involved with **SHA-256** algorithm are as follow:
\$\$
Ch(x,y,z)=(x \land y) \oplus (\urcorner x \land z)
\$\$
\$\$
Maj(x,y,z)=(x\land y)\oplus (x \land z) \oplus (y \land z)
\$\$
\$\$
\Sigma_0(x) = S_R^2(x) \oplus S_R^{13}(x) \oplus S_R^{22}(x)
\$\$
\$\$
\Sigma_1(x) = S_R^6(x) \oplus S_R^{11}(x) \oplus S_R^{25}(x)
\$\$
\$\$
\sigma_0(x) = S_R^7(x) \oplus S_R^{18} \oplus R^3(x)
\$\$
\$\$
\sigma_1(x) = S_R^{17}(x) \oplus S_R^{19}(x) \oplus R^{10}(x)
\$\$

Explanations:

- \$\land\$: and.
- \$\urcorner x\$: not.
- \$\oplus\$: xor.
- \$S_R^n\$: Cycled right shift.
- $R^n\$: Right shift.

## Abstraction

How here comes to ultimately main part of the **SHA-256** algorithm! All the details related to the algorithm will be elaborate here.

The first things is: **break message into 512-bit chunks.**

Suppose that the message \$m\$ can be splited into \$n\$ chunks, so the whole algorithm needs to iterate for \$n\$ times in order to get a 256-bit hash result. Initially, a 256-bit initial value \$H_0\$ is given, then operate with data chunk 1 and get \$H_1\$. Then operate with data chunk 2 and get \$H_2\$. Repeat above step until all data chunks are operated.

The pseudo-code are:

```
data_chunks = divide_by_512_bit(message)
handle = H0
for (chunk in data_chunks):
	handle = operate(handle, chunk)
result = handle
```

Among each *operation*, each data chunk with 512-bit chunk are divided into 16 **words**, each word contains 32 bits and encoded with big endian, as \$W_0,...,W_{15}\$. Which means the first sixteen words can be directly derived from the \$i^{th}\$ chunk data. The rest words are derived through following equation:

\$\$
W_t=\sigma_1(W_{t-2})+W_{t-7}+\sigma_0(W_{t-15})+W_{t-16}
\$\$

Then, iterate by 8 words for 64 times follow these rules:

\$\$
A=H+\Sigma_1(E)+Ch(E,F,G)+K_i+W_i+Maj(A,B,C)+\Sigma_0(A)
\$\$
\$\$
B=A
\$\$
\$\$
C=B
\$\$
\$\$
D=C
\$\$
\$\$
E=D+H+\Sigma_1(E)+Ch(E,F,G)+W_i+K_i
\$\$
\$\$
F=E
\$\$
\$\$
G=F
\$\$
\$\$
H=G
\$\$
*Notice that: the initial value of word A-H is \$H_0\$-\$H_7\$. And \$K_i\$ is the \$i^{th}\$ value of the initial hash value.*

## Code Implementation

- C: [Encryptions/C/src/sha-256.c at main · Autzoko/Encryptions (github.com)](https://github.com/Autzoko/Encryptions/blob/main/C/src/sha-256.c)
- Rust: [Encryptions/rust/src/encryptions/sha_256.rs at main · Autzoko/Encryptions (github.com)](https://github.com/Autzoko/Encryptions/blob/main/rust/src/encryptions/sha_256.rs)
