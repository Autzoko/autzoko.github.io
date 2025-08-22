---
title: 'Paper Reading: Attention is All You Need'
date: 2024-05-21 21:15:28
tags:
- deep learning
- papers
- attention mechanism
categories:
- Paper Reading
---
**Attention is All You Need** is a paper published in 2017 by Google Brain team. In this paper, the prominent **self-attention mechanism** and **multi-headed self-attention mechanism** are proposed to enhance the general capacity of neural networks. Meanwhile, a basic neural network architecture **Transformer** is proposed to adopt such mechanism and its been tested on translation task.

## What is Attention?

The **attention** mentioned in neural network is similar with the one we mentioned about human intelligence: an ability to capture information which seems to be more important (subjectively). The "attention mechanism" in human congnition is prominently manifested across various sensory perceptions. For instance, when using our eyes, certain features such as bright colors, rapid movements, or familiar faces tend to capture our gaze. Similarly, during reading, specific names, events, or elegant phrases can leave a lasting impression. This attention mechanism also extends to other senses like smell, touch, and hearing. Furthermore, the stream of consciousness during thought processes is often influenced by particularly striking information, all of which illustrate the attention mechanism in human cognition.

In the context of a nerual network, what does the attention mechanism refer to? For example, when we want a neural network to process an image, how does it determine which elements of the image are more important. Consider objects like people, pets, or cars in an image--how does the network decide which one is more noteworthy in the image's "context"? The attention mechanism addresses this problem. When processing an image, the neural network assigns higher weights, or "attention scores", to what it deems more important information. During subsequent forwarding process, the high-weight information is emphasized, enabling the network to capture more detailed and deeper features. This, in turn, aids in handling the semantic importance of the image. Besides image processing, the mechanism is applicable to text, audio, graph, and other data types. Since data in neural networks exists as discrete tensors, the fundamental principles of calculating attention scores remain consistent across different data types.

## Self-Attention Mechanism

The so-called self-attention mechanism refers to a process where the attention scores are computed by comparing the elements within the sequence itself. In other words, the reference for calculating attention scores is the sequence as a whole. For a tensor sequence input into a neural network, the self-attention mechanism requires computing the attention scores between each element and every other element in the sequence. The basic process can be represented in pseudocode as follows:

```
for (element_x : input_sequence) {
	for (element_y : input_sequence) {
		attention_score[x][y] = compute_score(element_x, element_y);
	}
}
```

However, for deep learning tasks, using to nested loops to compute values is highly time-consuming, especially when the input sequence length can be in the tens of thousands. Therefore, researchers use vectorized operations to calculate all pairwise attention scores efficiently. By using vectorized multiplication, we can obtain all attention scores with a single dot product operation between the input tensor sequence and its transposed version.

\$\$
X= \left[ \begin{matrix} x_1, ..., x_n \end{matrix} \right]
\$\$

\$\$
X^T= \left[ \begin{matrix} x_1 \\ \vdots \\ x_n \\ \end{matrix} \right]
\$\$

\$\$
AttentionScore = X \cdot X^T = \left[ \begin{matrix} x_1 \cdot x_1 & ... & x_1 \cdot x_n\\ \vdots & & \vdots \\ x_n \cdot x_1 & ... & x_n \cdot x_n\\ \end{matrix} \right]
\$\$

Through this matrix multiplication operation, combined with parallel computing technology and the parallel processing capabilities of GPU devices, the efficiency of this computation can be greatly enhanced. To ensure that the attention scores are not fixed and be gradually optimized during the training process, we use parameter matrices to adjust the calculation of attention scores. This enable the model to truely capture the information that deserves attention. Thus, the equation for computing attention score can be expressed as follows:
\$\$
Attention(Q,K,V) = softmax(\frac{QK^T}{\sqrt{d_k}})V
\$\$
Here, \$ Q, K, V \$ refer to each element in the input sequence being multiplied by three shared weighted matrices \$ W_q, W_k \$ and \$ W_v \$. The data multiplied by \$ W_q \$ represents the element that will compute attention scores with other elements in the sequence. The data multiplied by \$ W_k \$ represents the data being compared. After comparing each element with every other element, the resulting sequence is the attention score sequence for that element. This sequence is processed through the softmax function and then multiplied by \$ W_v \$ to perform a weighted sum. The entire process essentially calculates the correlations between all elements and the performs a weighted sum, with the result being the output of the attention mechanism. Through this process, the information that is considered more important is multiplied by greater weights, as a result their "information" can be magnified in the subsequent processes.

## Transformer Model

The Transformer model adopts an **encoder-decoder** architecture which is a popular architecture in current deep learning field. Two independent models are separatedly used as an encoder and a decoder. For most cases, they are used to process different types of data. For example, in *image captioning,* encoder is used for process image signal and decoder is for generating captions. In this paper, the Transformer is tested on English-German translation task, so, unprecisely, you can image the encoder is trying to "understand" a sentence in English and then generate some kind of *metaphysical* or *abstract* information, these information contains the concepts, subjects and objectives that are "mentioned" in the original language. Then, these information is passed to decoder, and the task of decode is to decrypt these information into German.

Importantly, the comparison I mentioned above is extremely unprecise, this model cannot translate as human do, in fact it's still a **prediction** or **simulation**, but not **understanding**.
