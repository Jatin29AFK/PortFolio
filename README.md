# Jatin Shukla | AI/ML Engineer Portfolio

An interactive portfolio built to present my work as an AI/ML Engineer through project case studies, animated system flows, recruiter-friendly summaries, research work, and an AI-style portfolio assistant.

This portfolio is designed to feel like an AI product, not a static resume site.

## Live Link 

https://port-folio-alpha-black.vercel.app

## Current Profile

- 3+ years of total experience across applied AI/ML and research
- Senior Executive - AI, JB Emporium India | Sep 2026 - Present | Gurugram
- Senior Engineer - AI/ML, Havells India Ltd. | Mar 2026 - Aug 2026
- AI/ML Engineer, Havells India Ltd. | Jan 2025 - Feb 2026
- Brief experience summaries with expandable work and achievement details
- Production ML, MLOps, GenAI, retrieval, and enterprise AI/data workflows
- Latest resume available through the existing download buttons

## Live Focus

- AI/ML engineering profile
- RAG and NLP project showcase
- Agentic AI, MLOps, and full-stack AI positioning
- BigQuery, data pipelines, validation, Azure, and GCP
- Microsoft 365 Copilot Studio and Power Automate automation positioning
- Detailed case-study presentation
- Research publication and system-design thinking

## Highlights

- Interactive 3D AI hero scene built with React Three Fiber and Drei
- Portfolio assistant with current-role answers, contextual follow-ups, and links to experience, project case studies, contact, and the resume
- Project case studies with detailed workflows, concepts, tech stack, and reasoning
- Contact and interview-request form backed by Resend email delivery
- FormSubmit fallback for contact and interview requests when Resend is not configured
- Demo video previews for HireFit and Nexora
- Research project presentation for IoT Digital Twin work with attached paper
- Systems Lab section combining project workflows and architecture thinking
- Recruiter-focused section with role fit, timeline, locations, and strengths
- Dynamic animated background and AI-themed motion design
- Light and dark mode
- SEO and social metadata
- Vercel Analytics and Speed Insights integration

## Featured Projects

### 1. AgentFlow | Multi-Agent AI Platform

Full-stack multi-agent orchestration platform with LangGraph, FastAPI, semantic memory, streaming traces, and human review.

### 2. Agentic AI Code Review Bot

Multi-agent GitHub PR reviewer with risk scoring, comment previews, test suggestions, and human-reviewable autofix drafts.

### 3. RefundCopilot AI Agent

Policy-grounded refund support agent with prompt-injection defense, deterministic refund checks, admin traces, FastAPI, React, SQLite, and Docker.

### 4. Market Insight AI Agent

Agentic stock market research assistant with FastAPI, LangGraph, yFinance, Groq, Next.js, charting, streaming responses, and visible tool traces.

### 5. HireFit | AI Resume and Job Matcher

Applicant-focused NLP project that helps users compare resumes with job descriptions, identify skill gaps, understand ATS alignment, and receive grounded improvement suggestions.

### 6. Nexora | RAG Study Assistant

RAG-based study assistant for PDFs and URLs that supports grounded question answering and quiz generation.

### 7. IoT Digital Twin for Smart Storage

Research-oriented project focused on IoT telemetry, Azure IoT concepts, and digital twin modeling for post-harvest storage monitoring.

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- GSAP

### 3D and Motion

- Three.js
- React Three Fiber
- Drei

### Backend / Data / Services

- Vercel Serverless Functions
- Resend
- Vercel Analytics
- Vercel Speed Insights

### AI / ML / Retrieval Concepts Represented

- Machine Learning
- Deep Learning
- NLP
- RAG
- Information Retrieval
- Semantic Search
- TF-IDF
- Cosine Similarity
- FAISS
- BM25
- Cross-Encoder reranking
- AI Agents
- Agentic AI workflows
- Microsoft 365 Copilot Studio
- Power Automate
- SharePoint and Teams automation

## Portfolio Sections

- Hero section with animated AI scene
- About section with AI/ML specialization areas
- Project case studies
- Systems Lab
- Skills
- Recruiter summary
- GitHub activity
- Experience and research timeline
- Contact section
- Portfolio assistant

## Project Structure

```text
.
├── public
│   ├── Resume
│   ├── projects
│   └── videos
├── src
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── supabase.ts
├── index.html
├── package.json
└── README.md
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Jatin29AFK/PortFolio.git
cd PortFolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create a `.env.local` file:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"
CONTACT_TO_EMAIL=shukla.jeetu2550@gmail.com
```

For production, replace `onboarding@resend.dev` with an address from a verified Resend domain.
The contact and interview-request forms try `/api/contact` first. If Resend is not configured, the app falls back to FormSubmit and then to the visitor's email app only if delivery cannot be confirmed.

### 4. Start the development server

```bash
npm run dev
```

For direct contact-form email sending during local development, run the app through Vercel's local runtime so `/api/contact` is available:

```bash
vercel dev
```

### 5. Build for production

```bash
npm run build
```

### 6. Lint the project

```bash
npm run lint
```

## Assistant checks

The assistant answers from local profile data and existing project descriptions; it does not require an LLM API key. Project questions open the corresponding case study, and short follow-ups retain the previous topic.

```bash
node --test tests/portfolioAssistant.test.mjs
```

## Deployment

This portfolio is intended to be deployed on Vercel.

Recommended flow:

1. Push changes to GitHub
2. Connect the repository to Vercel
3. Add the required environment variables in Vercel:
   - `RESEND_API_KEY`
   - `CONTACT_FROM_EMAIL`
   - `CONTACT_TO_EMAIL`
4. Redeploy

## Assets Included

- Professional profile image
- Resume PDF
- Research paper PDF
- Project screenshots
- Demo videos for HireFit and Nexora

## Why This Portfolio Is Different

Instead of behaving like a normal portfolio or resume page, this project presents my profile as an AI product experience:

- projects are shown as systems, not just cards
- workflows are visualized
- recruiter information is quick to scan
- research work is given proper context
- an assistant helps visitors navigate my profile

## Contact

Jatin Shukla  
Senior Executive - AI, JB Emporium India<br>
Gurugram, India

- Email: shukla.jeetu2550@gmail.com
- LinkedIn: https://www.linkedin.com/in/jatin-shukla-401739202/
- GitHub: https://github.com/Jatin29AFK

## License

This project is for personal portfolio use.
