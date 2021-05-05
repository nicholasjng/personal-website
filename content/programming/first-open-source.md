---
title: 'What I learned from my first free-time open source contribution'
description: "Last week, I contributed to an open source project on my own time for the first time. Here's what I took away from it."
date: '2021-05-05T10:33:23Z'
author:
  name: Nicholas Junge
  picture: '/assets/blog/authors/nicholas.jpg'
---

Last week, with the month of April ending, I achieved something that I had never done before: I got a contribution (Pull #6593) merged into the [JAX](https://github.com/google/jax/) master branch. Now I had previously contributed to a different open source project - [ZenML](https://github.com/maiot-io/zenml) - but there, I worked for the company at the time, and I knew all the guys behind the project personally. So you might think, what's the difference? Well...

# The build-up

I initially got the idea of contributing to open source around mid-April, about two weeks prior. But it turned out that there is some uncertainty involved, which made for a decent amount of overhead for a more hesitant person by nature like myself:

* Which project do I choose?
* Where do I even start?
* Is the project friendly and welcoming for beginners?
* How do I make sure to deliver a quality contribution?
* What if it's not good enough?

I was looking into JAX at the time, a lean(ish) library for automatic differentiation, accelerated linear algebra (using XLA, a linear algebra compiler project under the umbrella of [TensorFlow](https://www.tensorflow.org/xla)), scientific and parallel computing with a NumPy/SciPy-like API on both CPUs and various accelerators such as GPUs and TPUs.

Sounds complicated and not exactly beginner-friendly, right? Luckily, it turns out that JAX is pretty much the perfect project for open-source newcomers like myself.

## Why JAX is great for open source beginners (and pros)

tl,dr: They get a lot of, if not all of the things right.

How so? Let me explain. So I made a list above of things that were holding me back - let's go through those. 

### Where do I even start?

Easy - JAX employs GitHub's issue labels, and annotates requests for missing features and bugs with small, colorful buttons like `contributions welcome`, `enhancement`, and - especially good for newcomers - `good first issue`. So if you are looking for a way to get your hands dirty quickly, head over to their issues tab and filter by these labels.

Related to that, they also have a [readthedocs](https://jax.readthedocs.io/en/latest/) documentation with an extensive [walkthrough](https://jax.readthedocs.io/en/latest/contributing.html) on how to contribute (which also contains a tiny fix that I made :P) - you go all the way through the technical process there, with preliminary steps like how to fork, setting up the upstream remote, all the way to opening a pull request. Awesome!

### Is the project friendly and welcoming for beginners?

Yes it is! If you have a question, more likely than not a maintainer (most, if not all Google employees) gives you input within 24 hours. I have not seen any condescension or attitude from anyone, anywhere - just people who like to explain and show off the project that they are building. GitHub Discussions are usually slower-going than issues, but as the latter is project critical, that is to be expected.

### How do I make sure to deliver a good quality contribution?

Read the contribution document, find a slant and go ahead! It just rolls if you set out on a specific enough task. In my case, I ported two NumPy functions, `numpy.r_` and `numpy.c_`, used for creating arrays from an assortment of objects, to `jax.numpy`. The reason why this worked so well is that the functions were already present (in NumPy), so I just had to port them over to JAX in a sensible manner.

NB: Add tests for all of your newly implemented functions! It's a production-ready library, after all. For that, you can mostly go off of the already existing tests, although you might first need to get a hang of how their testing works (it's mostly a combination of `pytest`, `absl.testing` and custom assertion wrappers).

### What if it's not good enough?

This is where it gets especially wholesome. So I opened my pull request, and... I had to make changes. But that was communicated simply spectacularly: In my case, the review started with a "Looks good!", which is something that looks rather small, but goes a **really** long way, especially for first-time contributors - it's a compliment that reassures that you went in the right direction, takes off a lot of the pressure, builds you up, and makes you try earnestly to fix your mistakes / improve your code.

And it keeps me engaged, too: If you are recognized and appreciated for your efforts, no matter how small, you can get hooked and want to try again - but if not, in the very least, you keep the process in good memory. In the end, that's how the human reinforcement system works, and it's played very nicely here.

I even got help in tidying up my pull request in git as required, by squashing my commits and rebasing on `master`, which was needed because I had never done that before. Amazing!

As for me - I definitely have plans to contribute more in the future. It's an exciting project, and it's likely only going to become better (though hopefully, it does not grow to exorbitant size like PyTorch or TensorFlow have).

## Closing thoughts

So what did I take away? I took away that open source work is awesome and that all of my natural hesitation was unnecessary in this case. Don't get me wrong, it's good to be prepared and do some reading and research before setting out to contribute, but everything that gave me a good deal of first-timer anxiety did not come true at all. So, credit goes to the JAX project for creating a friendly and welcoming environment. Great job!

If you are thinking about open source contribution as well, try it out, it's great! The satisfaction I got from actively going out and contributing is worth it to me one hundred times out of a hundred. 

I will note that the experience is improved exponentially by a friendly community. So getting in touch with a project to get a glimpse of what kind of people there are is also certainly worth it. Happy coding!