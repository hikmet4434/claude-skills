---
name: ai-engineering
description: AI-native engineering expertise for Nepal-first AI commerce startups. Use when designing AI workflows, implementing RAG systems, building AI agents, integrating LLMs (OpenAI/Claude/DeepSeek), orchestrating multi-agent systems, creating AI coding pipelines, or evaluating AI product decisions. Covers LLM architecture, prompt engineering, vector databases, AI agents, and AI-augmented development workflows.
---

# AI Engineering Framework

## 1. AI Systems Understanding

### LLM Architecture Awareness
- Transformer architecture and attention mechanisms
- Token limits, context windows, and model capabilities
- Model capabilities vs costs (GPT-4, Claude 3.5, Gemini, DeepSeek, Qwen)
- Fine-tuning vs RAG vs prompting strategies
- Multi-modal capabilities (vision, audio, tool use)

### AI Workflow Orchestration
- Prompt chaining and sequential processing
- Agent orchestration with tool-calling systems
- Structured output systems (JSON mode, function calling)
- Memory architecture (short-term, long-term, vector)
- Context engineering and retrieval pipelines

### RAG Systems
- Document chunking strategies (fixed, semantic, recursive)
- Embedding generation and vector storage
- Vector search algorithms (cosine similarity, HNSW)
- Hybrid search (keyword + vector)
- RAG evaluation metrics (context precision, recall)

### AI Agents & Multi-Agent Systems
- Agent architecture (reactive, proactive, autonomous)
- Tool definition and execution loops
- Multi-agent orchestration patterns
- Agent communication protocols
- Human-in-the-loop checkpoints and approvals

## 2. AI Tooling Expertise

### AI Coding Systems

**Primary AI Coding Platforms**
- GPT-5 workflows with Codex integration
- Claude workflows with Claude Code
- Gemini/DeepSeek/Qwen workflows for specialized tasks
- WindSurf orchestration and Cursor IDE systems
- VS Code AI extensions and Continue.dev

**AI Coding Patterns**
- AI pair-programming and AI debugging systems
- AI code review workflows
- AI architecture generation
- AI documentation generation
- AI test generation and QA automation

### AI Development Workflows

**Prompt Engineering Patterns**
```
┌─────────────────────────────────────────────────────────────┐
│                    AI Workflow Layers                        │
├─────────────────────────────────────────────────────────────┤
│  User Intent → Prompt Chain → Agent Orchestration → Output  │
└─────────────────────────────────────────────────────────────┘
```

**Key Workflows**
- Context window management for large codebases
- Incremental refinement with artifact persistence
- Multi-turn conversations for complex tasks
- Role-based prompting for specialized agents
- Few-shot examples for consistency

## 3. AI Product Design

### AI UX Systems
- Voice AI systems with speech synthesis
- Vision AI systems (OCR, object detection, document parsing)
- Recommendation systems with personalization
- AI automation systems with scheduling
- Conversational interfaces and chat UX

### AI-First Product Thinking
- AI-native feature identification
- Automation opportunity mapping
- Human-AI collaboration patterns
- AI capability gap analysis
- Trust and transparency in AI products

## 4. AI Security & Safety

### Application Security
- Prompt injection prevention and detection
- Data leakage prevention and sanitization
- AI permission systems and tool isolation
- Agent sandboxing and rate limiting
- Ephemeral credential systems

### AI Safety Awareness
- Hallucination mitigation strategies
- Output validation and verification
- Model uncertainty communication
- Bias detection and mitigation
- AI safety best practices

## 5. AI Infrastructure

### Open-Source AI Ecosystems
- Ollama for local model deployment
- LM Studio and vLLM for inference
- Hugging Face model hub integration
- Quantization strategies (4-bit, 8-bit)
- GPU infrastructure basics (CUDA, VRAM)

### AI Cost Optimization
- Token usage optimization and batching
- Model routing based on task complexity
- Caching strategies for repeated queries
- Prompt compression techniques
- Batch inference for offline processing

## 6. AI-Augmented Development Pipeline

### Development Workflow Integration

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Design    │────▶│   Code     │────▶│   Test      │
│   AI Assist │     │   AI Pair  │     │   AI QA     │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Review    │────▶│   Deploy    │────▶│   Monitor   │
│   AI Check  │     │   AI Valid  │     │   AI Alert  │
└─────────────┘     └─────────────┘     └─────────────┘
```

### AI Tooling Stack

| Category | Tools |
|----------|-------|
| Code Generation | GPT-4, Claude 3.5, DeepSeek Coder, CodeQwen |
| Code Review | GitHub Copilot, Claude, Cursor |
| Documentation | GPT-4, Claude, Mintlify |
| Testing | AI-generated tests, mutation testing |
| Deployment | AI-assisted validation, rollback detection |

## 7. Vector Database Architecture

### Vector Storage Systems
- Pinecone, Weaviate, Qdrant for managed solutions
- pgvector for PostgreSQL integration
- Chroma for local development
- Milvus for high-scale deployments

### Embedding Pipelines
```
Document → Chunking → Embedding → Vector Store → Query → Rerank → Response
```

### Search Optimization
- ANN (Approximate Nearest Neighbor) algorithms
- Hybrid search combining dense + sparse retrieval
- Re-ranking with cross-encoders
- Semantic caching for performance

## 8. AI Evaluation & Benchmarking

### Model Evaluation
- Benchmark datasets and task-specific evaluation
- LLM-as-Judge approaches
- Human evaluation integration
- Comparative analysis frameworks

### System Evaluation
- End-to-end RAG evaluation
- Agent performance monitoring
- Cost-per-task tracking
- Latency optimization

## Quality Gates

- [ ] RAG system accuracy > 85%
- [ ] Prompt injection tests pass
- [ ] Token budget monitoring active
- [ ] Fallback mechanisms implemented
- [ ] AI cost tracking integrated
- [ ] Human review for critical decisions