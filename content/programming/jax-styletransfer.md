---
title: 'Neural style transfer in the JAX ecosystem'
description: "Here I present a hobby project about style transfer using neural networks that I have been working on for a couple of weeks. I implemented the algorithm in JAX and with third-party libraries building on it, namely DeepMind's Haiku and Optax."
date: '2021-05-08T15:13:03Z'
author:
  name: Nicholas Junge
  picture: '/assets/blog/authors/nicholas.jpg'
hashtags: "python,jax,haiku,deep-learning,gpu-computing,style-transfer"
---

*This post is a work in progress, just like the project itself! You can find the source code on [GitHub](https://github.com/njunge94/jax-styletransfer).*

So I decided to finally give JAX a go. I had discovered the project earlier in 2020, but never gotten around to using it. Usually, when I try to use a new computing / ML framework, my "Hello World" project is **neural style transfer**. So how did it go?

# What is neural style transfer?

In neural style transfer, we have two images: A *content* image, which is the template image that is supposed to be transformed, and a *style image*, which contains the style that we want to apply to the content image. Commonly, the content image is a photograph, while the style image is an image of a work of art, like a painting. In the end, your content image is supposed to look like it was painted by van Gogh (or whoever the style image came from) himself!

![Style transfer](https://pytorch.org/tutorials/_images/neuralstyle.png)

*Neural style transfer on a tortoise. Image taken from the [PyTorch tutorial on neural transfer.](https://pytorch.org/tutorials/advanced/neural_style_tutorial.html)*

A popular paper on style transfer with neural networks is "A Neural Algorithm of Artistic Style" by Bethge, Gatys and Ecker (available on the [arXiv](https://arxiv.org/abs/1508.06576)), published in 2015. The paper is really worth the read, but if you prefer the tl;dr: They showed that convolutional neural networks (CNNs) can extract style and content as *additive* elements of an image; you can see this is already hinted by the "equation" in the tortoise image above. It is a little more complicated than just a simple sum, though: You have to find the representations of style and content of an image firt, and then find the right balance between adding the style and keeping the content of your original image intact!

# How to extract style

First a few words on content: This is inherently a regularization task. By imposing a norm penalty of some kind, you can enforce the preservation of your initial image's content more or less rigorously, with the main degrees of freedom being the norm type (Gatys et al. opt for the Euclidean norm) and the regularization strength.

Now it gets interesting. How would you try to capture the *style* of an image? Remember that we want this to be additive (see above) with the content, so we are restricted to applying linear functions on our feature maps.

The paper goes with the *[Gram matrix](https://en.wikipedia.org/wiki/Gramian_matrix)*, known to mathematicians from measure theory, which is a quadratic matrix containing the inner product of a set of vectors:

$$
G_{ij} := \langle v_i, v_j \rangle,\quad 1 \leq i,j \leq n.
$$
The inner product, of course, is a natural similarity measure between two vectors from the same space. Even better, a positive-semidefinite matrix is uniquely determined by its Gram matrix decomposition,

$$
M = G^\top G,
$$

so we can expect to apply the style to the content image by matching the Gram matrices of the two. This can again happen by applying a norm regularization to the Gram matrices; Gatys et al set the regularization strength way higher than that of the content loss, as they divide by the number and the dimensions of the feature maps to bring the Gram Matrix closer to unit norm, presumably to avoid issues with gradients along the network computation.

# Coding Neural Networks in JAX

While I do not want to present every piece of code in the repository, I will outline a few key pieces that are important notions of JAX.

## Functional / stateless computing

JAX employs a functional programming model, meaning you define your program as a series of *transforms* acting on different inputs. While PyTorch / TensorFlow do this, too, JAX does not maintain a global computation graph - you operate on your inputs, without a lot of behind-the-scenes scaffolding.

```
x = 1.0 #  our input

x = multiply_by_2(x)
x = square(x)
x = sin(0.5 * pi * x)

# x = ?
```

Only - you should not use *[side effects](https://jax.readthedocs.io/en/latest/notebooks/Common_Gotchas_in_JAX.html#pure-functions)* in your programs that reference or create additional context outside your scope; examples of this are using global variables or print statements. Of course, JAX will not throw hard errors if you do this (its functional design means it does not care, not that it forbids you from doing this entirely), but the resulting computation might go differently than you expect, especially when using *just-in-time* (JIT) compilation.

## The init + apply paradigm

I used DeepMind's [Haiku](https://github.com/deepmind/dm-haiku), a library for training neural networks in JAX, for this project. It's a very lightweight library, which I like, but it contains a few implicit things that are very important for its usage, which might not be obvious at all to newcomers.

Even though JAX does not keep a graph of all computations, as mentioned above, it's clearly still necessary to keep track of parameters somewhere in order to apply gradients later. And sometimes, you do want to keep some auxiliary data. So how do you reconcile this with functional programming?

You **transform** the function defining your neural network to be a pure function. Haiku does this by [exposing the APIs](https://dm-haiku.readthedocs.io/en/latest/api.html#haiku-transforms) `hk.transform(f)` and `hk.transform_with_state(f)`, which take your function $f$ and return an object representing the transformed $f$, 

$$
\mathrm{transform}: f \rightarrow f': \lbrace init, apply\rbrace 
$$

which has two special member functions called *init* and *apply*. These are used for your network's initialization and forward pass, respectively, and return the network's trainable parameters as a special kind of `dict`.

Another clever thing from Haiku: If you maintain any additional state outside of trainable network parameters, such as layer variables (think $\mu$s and $\sigma$s from BatchNorm), a `hk.transform_with_state`'d $f$ will have the signature
```
f: (params, state, *, **) -> Tuple(new_params, new_state) ,
```

so the state is piped through as an auxiliary in- and output. Awesome!

## Logging the content / style loss

This is a little unintuitive at first, but not for long. Since we are only able to access tracked network `params` and optionally `state`, we need to append the loss values to either of those. Here I chose `state`, but `params` should work fine as well. 

It all works by subclassing the `hk.Module` class, which represents a neural network building block just like in other DL Libs. When we calculate the style losses, we pass the result to `hk.set_state`, a state hook which updates the global state container with the result value for the appropriate name:

```python
class ContentLoss(hk.Module):
    """Identity layer capturing the content loss between input and target."""

    def __init__(self, target, name: Optional[str] = None):
        super(ContentLoss, self).__init__(name=name)
        self.target = jax.lax.stop_gradient(target)

    def __call__(self, x: jnp.ndarray):
        content_loss = jnp.mean(jnp.square(x - self.target))
        hk.set_state("content_loss", content_loss)

        return x

        
class StyleLoss(hk.Module):
    """Identity layer capturing the style loss between input and target."""

    def __init__(self, target, name: Optional[str] = None):
        super(StyleLoss, self).__init__(name=name)
        self.target_g = gram_matrix(target)

    def __call__(self, x: jnp.ndarray):
        g = gram_matrix(x)

        style_loss = jnp.mean(jnp.square(g - self.target_g))
        hk.set_state("style_loss", style_loss)

        return x
```

Other than that, the layer is simply the identity transform. The state variable names are unique on module level; your `params` / `state` containers will be functionally equivalent to a `dict` of `dict`s.

## Freezing the pretrained network

As in the paper, we decide to stand on the shoulders of giants: We are not interested in training the network for ourselves, but rather to use a pretrained one for transfer. In particular, we are not even "learning" anything - we are freezing the entire network and use it to extract the image features.

Conceptually, this amounts to initializing the network parameters as constants: The `hk.initializers.Constant` API is what you want here. For more information and a really nice guide on how to load pretrained HuggingFace Transformers in Haiku, check out [this blog post on pragmatic.ml](https://www.pragmatic.ml/finetuning-transformers-with-jax-and-haiku/).

Another nice thing about this: There is no need for calling any obscure gradient hooks or setting disabling flags for gradient computation in backpropagation, as is required in libraries maintaining computation graphs - you just use what you need, and update only what you use. This leads to much more readable code, since there is no need to call obscure functions or set apocryphal option flags.

The first style transfer attempt was made with VGG-19, a convolutional neural network trained on the ImageNet dataset. In general, many different networks do the job; capturing the style / content losses at different depths will lead to different results. The repository contains functionality for loading models from HDF5 files; weights for a few example architectures are given in [F. Chollet's repository on deep learning models](https://github.com/fchollet/deep-learning-models/releases).

## The training loop

Again, not a lot of difference to other libraries. The loop itself is very barebones, but on the other hand customizable and non-opaque. The optimization is carried out using the `optax` library, which JAX-ifies some widely used batch optimization algorithms.

## What's not to love?

If you ever looked at JAX source code before, you notice that in many places, there are functions nested within functions - this seems to be a hobby of JAX. And it works well, don't get me wrong, but it is not really all too maintainable for the end user. 

BUT: Without nesting, you would need to dynamically insert more functions, use `functools.partial` in many places, and potentially run into trouble with `jax.jit` when zipping up your code for light-speed execution on the GPU, simply because you didn't declare static variables or what you declared was not the right thing. Long story short, these nested functions are a welcome way of avoiding stress with the lower-level JAX features (JIT+XLA).

# Results

The algorithm was tested on the two example images from the [PyTorch Style Transfer tutorial]((https://pytorch.org/tutorials/advanced/neural_style_tutorial.html)). 

512 x 512 px takes excessively long on a MacBook Pro 13 2019 Intel CPU, so I went with my ITX machine (i5-10600K + RTX2060 Super) instead. There, after some CUDA install woes (that could be worth another entire article, god bless), I managed to do between 20 and 30 it/s on a single image pass in VGG19. 

I suppose this program severely underutilizes the GPU; I should give the TensorBoard profiler a go to check this. Otherwise, the code is reasonably clean, transforms to side-effect-free functions is painless thanks to Haiku, and there is a lot of fuel left in the tank for both batches of images and also for tiling high-resolution images. A really good showing all around from JAX!