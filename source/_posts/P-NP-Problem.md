---
title: P&NP Problem
date: 2024-06-25 20:08:32
tags:
- algorithms
categories:
- Algorithms
- Concepts
---
## What is P-Problem and NP-Problem

Before introducing the concept of P-problem and NP-problem, we need to know something about time complexity.

Some types of time complexity of a program are proper to computer, which means the time  usage is affordable, or worthy. And some others types are not that time-saving! So, to categorize those algorithms, computer scientists discover that some specific pattern of time complexity are time-saving, and others are not. Those time-efficient time complexity are **polynomial**, which is letter *P* in *P-problem* stands for, and others that can not determine whether this problem can be solved in polynomial time, then they are **nondeterministic polynomial**, which is the so-called *NP*. Problems in **P** are considered efficiently solvable.

- Time complexity like \$O(1), O(n), O(\\log n), O(n^c)\$ are called **polynomial**.
- Time complexity like \$O(c^n), O(n!)\$ are called **non-polynomial**.

So after understanding the term *polynomial* means in computer algorithm efficiency, we can go on to known the defination of **P-Problem** and **NP-Problem**.

***These conceptions actually are discussing the sovlability of a problem.***

### P Problem

**If a problem can be solved in polynomial time, this problem can be deemed as a *P Problem***,

### NP Problem

**Given a problem, if any of its proposed solution can be varified within polynomial time, this problem can be defined as a nondeterministic polynomial problem.**

And it is important that many problems in **NP** have no known polynomial-time solutions.

### Relationship between P-Problem and NP-Problem

First, it is obvious that all of **P-Problem** are **NP-Problem**. However, does it still is a true statement when reversed? This is hard to say, so this question becomes the famous \$P=NP?\$ problem.

## NPC Problem

The NP-Complete problem is a subset of of NP problems that are as hard as any problem in NP. If any NP-complete problem can be solved in polynomial time, then every problem in NP can be solved in polynomial time.

**In short, the NP-Complete problems are the hardest NP problems!**

Suppose here is an NP problem, all of NP problem can be reduced to it. Then if only find the polynomial time solution of this problem, every NP problem can find a polynomial time solution by reducing to that NP problem.

And how to prove a problem is NP-Complete?

### Steps to Prove a Problem is NP-Complete

1. Show the Problem is in NP
   Verification in polynomial time: demonstrate that given a candidate solution, you can verify its correctness in polynomial time.
2. Select a Known NP-Complete Problem
   Source problem: choose a problem already known to be NP-Complete for the reduction.
3. Construct a Polynomial Time Reduction
   Transform: develop a polynomial time algorithm that converts instances of the chosen NP-Complete problem to instances of the problem you are proving NP-Complete
   1. Input transformation: map any instance of the known NP-Complete problem to an instance of your problem.
   2. Solution transformation: ensure that a solution to the transformed instance of your problem corresponds to a solution to the original NP-Complete problem.

In summary, only two steps needs to be done:

- first show you can verify solutions in polynomial time.
- then transform a known NP-Complete problem to your problem in polynomial time.

**Common NP-Complete Problems for Reductions:**

- Satisfiability (SAT)
- 3-SAT
- Clique
- Vertex Cover
- Hamiltonian Path (Cycle)
- Traveling Salesman Problem (TSP)
