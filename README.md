# Jatin Shukla | AI/ML Engineer Portfolio

An interactive portfolio built to present my work as an AI/ML Engineer through project case studies, animated system flows, recruiter-friendly summaries, research work, and an AI-style portfolio assistant.

This portfolio is designed to feel like an AI product, not a static resume site.

## Live Link 

https://port-folio-alpha-black.vercel.app

## Live Focus

- AI/ML engineering profile
- RAG and NLP project showcase
- Agentic AI and full-stack AI positioning
- Detailed case-study presentation
- Research publication and system-design thinking

## Highlights

- Interactive 3D AI hero scene built with React Three Fiber and Drei
- AI-style "Ask My Portfolio" assistant for quick portfolio queries
- Project case studies with detailed workflows, concepts, tech stack, and reasoning
- Demo video previews for HireFit and Nexora
- Research project presentation for IoT Digital Twin work with attached paper
- Systems Lab section combining project workflows and architecture thinking
- Recruiter-focused section with role fit, timeline, locations, and strengths
- Dynamic animated background and AI-themed motion design
- Light and dark mode
- SEO and social metadata
- Vercel Analytics and Speed Insights integration

## Featured Projects

### 1. HireFit | AI Resume and Job Matcher

Applicant-focused NLP project that helps users compare resumes with job descriptions, identify skill gaps, understand ATS alignment, and receive grounded improvement suggestions.

### 2. Nexora | RAG Study Assistant

RAG-based study assistant for PDFs and URLs that supports grounded question answering and quiz generation.

### 3. IoT Digital Twin for Smart Storage

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

- Supabase
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
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The portfolio still runs without Supabase, but the contact form will stay inactive until these are configured.

### 4. Start the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

### 6. Lint the project

```bash
npm run lint
```

## Deployment

This portfolio is intended to be deployed on Vercel.

Recommended flow:

1. Push changes to GitHub
2. Connect the repository to Vercel
3. Add the required environment variables in Vercel
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
Senior AI/ML Engineer  
Noida, India

- Email: shukla.jeetu2550@gmail.com
- LinkedIn: https://www.linkedin.com/in/jatin-shukla-401739202/
- GitHub: https://github.com/Jatin29AFK

## License

This project is for personal portfolio use.
