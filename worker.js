PRO AI — SECURE BACKEND MASTER PROMPT

Act as a senior Cloudflare Workers architect, AI backend engineer, and cybersecurity expert.

Build the secure backend for PRO AI — Evolving With The World.

1. CORE ARCHITECTURE

Create a modular backend using Cloudflare Workers.

The backend must support:

- Master Brain orchestration.
- Multiple AI model providers.
- Specialized AI agents.
- Task management.
- Shared memory integration.
- Research and verification workflows.
- Future expansion without rewriting the system.

2. AI MODEL INTEGRATION

Prepare secure provider adapters for:

- OpenAI
- Google Gemini
- Anthropic Claude
- DeepSeek
- Grok
- Meta Llama
- Mistral
- Qwen

Use environment secrets for API keys.

Never expose API keys in frontend responses or logs.

Never claim a provider is connected unless its credentials and connection have been tested.

3. MASTER BRAIN API

Create modular API routes:

- POST /api/chat
- POST /api/research
- POST /api/agents/run
- GET /api/status
- GET /api/models
- GET /api/tasks

Validate all incoming requests.

Route tasks to appropriate available providers and agents.

4. SPECIALIZED AGENTS

Prepare an extensible architecture for:

- Research Agent
- Coding Agent
- Browser Agent
- Automation Agent
- Memory Agent
- Verification Agent
- Security Agent
- Problem Solver Agent
- AI Scientist Agent

Each agent must have defined inputs, outputs, permissions and error handling.

5. SECURITY

Implement:

- Request validation.
- CORS with configurable allowed origins.
- Secure error handling.
- Rate limiting architecture.
- API key protection.
- Input size limits.
- Safe logging without secrets.
- Authentication-ready architecture.
- Approval requirements for sensitive actions.

Do not use unrestricted CORS in production.

6. COST MANAGEMENT

- Prefer free and open-source options where possible.
- Track provider usage and errors.
- Support provider quotas and fallback.
- Never activate paid services without user approval.
- Return clear quota and billing errors.

7. CLOUDflare COMPATIBILITY

Use Cloudflare Workers-compatible JavaScript.
Use environment bindings and secrets.
Keep compatibility with the existing Pro AI frontend.
Prepare configurable support for Cloudflare D1 and Queues, but do not assume they are already configured.

8. CODE QUALITY

- Write clean, modular, documented code.
- Include input validation and error handling.
- Avoid fake AI responses.
- Do not hardcode API keys.
- Do not delete or replace existing working services.
- Provide configuration instructions.
- Provide tests for every API route.

9. COMPLETION

Return the complete worker.js code and any required supporting files or configuration changes.

Explain exactly which Cloudflare settings and secrets must be configured.

Do not mark any feature complete until it has been tested.

PRO AI — EVOLVING WITH THE WORLD.
