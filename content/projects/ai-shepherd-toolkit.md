---
title: AI Shepherd Toolkit
date: 2025-01-20
tags: [python, ai, agents, tools]
description: A collection of tools and utilities for building, testing, and deploying AI agents.
---

# AI Shepherd Toolkit

A Python toolkit for building reliable AI agents with structured tool use, evaluation pipelines, and deployment helpers.

## Features

- **Agent Framework** — A minimal agent loop with built-in tool management and retry logic
- **Tool Registry** — Declarative tool definitions with automatic schema generation
- **Eval Harness** — Run structured evaluations across model providers
- **Deployment** — Docker-based deployment with health checks and observability

## Quick Start

```python
from shepherd import Agent, tool

@tool(description="Get the current weather for a city")
def get_weather(city: str) -> str:
    return f"Weather in {city}: 72°F, sunny"

agent = Agent(
    model="claude-sonnet-4-5-20250514",
    tools=[get_weather]
)

result = agent.run("What's the weather in San Francisco?")
print(result)
```

## Architecture

The toolkit follows a modular design:

| Module | Purpose |
|--------|---------|
| `shepherd.core` | Agent loop and message handling |
| `shepherd.tools` | Tool registry and execution |
| `shepherd.eval` | Evaluation framework |
| `shepherd.deploy` | Docker and cloud deployment |

## Links

- [GitHub Repository](https://github.com/QuiGonGitt/ai-shepherd-toolkit)
