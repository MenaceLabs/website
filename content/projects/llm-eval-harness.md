---
title: LLM Eval Harness
date: 2025-02-10
tags: [python, ai, evaluation, benchmarks]
description: Evaluation framework for benchmarking LLM outputs across structured tasks.
---

# LLM Eval Harness

A framework for systematically evaluating LLM outputs across structured tasks, with support for multiple model providers and custom scoring functions.

## Why This Exists

Evaluating LLMs is hard. Vibes-based assessment doesn't scale. This harness provides:

- **Structured test suites** — Define expected behaviors as test cases
- **Multi-provider support** — Compare outputs across OpenAI, Anthropic, and local models
- **Custom scoring** — Plug in your own evaluation functions
- **Result tracking** — Track performance over time with built-in reporting

## Example

```python
from eval_harness import Suite, Case, run

suite = Suite(
    name="code-generation",
    cases=[
        Case(
            prompt="Write a Python function to check if a number is prime",
            criteria=["def ", "return", "prime"],
            scorer="contains_all"
        ),
    ]
)

results = run(suite, models=["claude-sonnet-4-5-20250514", "gpt-4o"])
results.report()
```

## Links

- [GitHub Repository](https://github.com/QuiGonGitt/llm-eval-harness)
