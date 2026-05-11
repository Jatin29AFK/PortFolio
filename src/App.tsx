import { useEffect, useMemo, useRef, useState } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars, Text } from "@react-three/drei";
import type { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Theme = "dark" | "light";

type Project = {
  id: string;
  title: string;
  shortTitle: string;
  desc: string;
  problem: string;
  why: string;
  users: string[];
  systemDesign: string[];
  architecture: string[];
  workflow: string[];
  concepts: string[];
  logic: string[];
  techRationale: {
    name: string;
    why: string;
  }[];
  challenges: string[];
  decisions: string[];
  impact: string[];
  improvements: string[];
  tech: string[];
  link: string;
  linkLabel?: string;
  kindLabel?: string;
  paperPdf?: string;
  live?: string;
  image: string;
  screenshots: string[];
  gallery?: {
    src: string;
    title: string;
    desc: string;
  }[];
  video?: string;
};

type Architecture = {
  id: string;
  title: string;
  desc: string;
  nodes: string[];
  stack: string[];
};

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

type Command = {
  label: string;
  hint: string;
  action: () => void;
};

type MotionSystem = {
  title: string;
  subtitle: string;
  description: string;
  steps: string[];
  stack: string[];
};

const resumePath = "/Resume/JatinShukla_resume.pdf";
const profilePhotoPath = "/Resume/1774121399635.png";
const email = "shukla.jeetu2550@gmail.com";
const phone = "+91-9116237146";
const githubUrl = "https://github.com/Jatin29AFK";
const linkedInUrl = "https://www.linkedin.com/in/jatin-shukla-401739202/";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Recruiters", href: "#recruiters" },
  { label: "Lab", href: "#architecture" },
  { label: "Contact", href: "#contact" },
];

const projects: Project[] = [
  {
    id: "agentflow",
    title: "AgentFlow - Multi-Agent AI Platform",
    shortTitle: "AgentFlow",
    desc: "Full-stack multi-agent AI orchestration platform with a FastAPI + LangGraph backend, Groq-powered agents, React dashboard, SQLite memory, reviewer scoring, human review, trace history, and workspace isolation.",
    problem:
      "Most AI apps stop at a single LLM response, but realistic agent systems need planning, specialist routing, deterministic tools, memory retrieval, quality checks, human approval, traceability, and isolated user workspaces.",
    why:
      "I built AgentFlow to showcase practical AI engineering beyond a basic chatbot: supervisor-led multi-agent routing, memory-aware generation, backend tools, human-in-the-loop review, and a polished dashboard for observing the workflow.",
    users: [
      "Developers experimenting with multi-agent workflow orchestration and agent collaboration patterns.",
      "AI product builders who need a clear interface for agent planning, execution traces, memory, reviews, and workflow history.",
      "Teams exploring how research, code, writing, and analysis agents can divide work through a supervisor-led workflow.",
      "Recruiters and engineering reviewers who want to see practical agentic AI architecture beyond a simple chatbot demo.",
    ],
    systemDesign: [
      "The frontend creates or loads a browser-specific workspace ID and sends it with scoped API requests so each demo user sees their own runs, memory, and pending reviews.",
      "A FastAPI backend receives agent tasks, retrieves relevant long-term memory from SQLite, and passes structured state into a LangGraph workflow.",
      "The supervisor agent selects the best specialist agent, chooses whether a deterministic backend tool is needed, and records the route reason.",
      "Specialist agents cover research, code, writing, and analysis tasks, while backend tools handle calculator, text statistics, and keyword extraction workflows.",
      "A reviewer agent scores the output. Strong results go to a finalizer, while low-confidence results pause for human approve, revise, or reject actions.",
      "The dashboard exposes run history, trace timelines, memory management, pending reviews, chat playground, and productivity actions like copy and reuse.",
    ],
    architecture: [
      "React + Vite dashboard",
      "Workspace ID manager",
      "FastAPI routers",
      "SQLite run and memory store",
      "Memory retriever",
      "LangGraph supervisor workflow",
      "Research / Code / Writing / Analysis agents",
      "Tool registry",
      "Reviewer and human review service",
      "Trace timeline and history views",
    ],
    workflow: ["Workspace scope", "Task input", "Memory retrieval", "Supervisor routing", "Tool execution", "Specialist agent", "Reviewer score", "Human review / finalizer", "Trace + history save"],
    concepts: [
      "Multi-agent orchestration: a central layer coordinates multiple specialist agents instead of relying on one general assistant.",
      "LangGraph state workflow: each run moves through memory retrieval, supervisor routing, tool execution, specialist output, review, and finalization.",
      "Tool use: deterministic backend tools support calculator, text statistics, and keyword extraction tasks instead of forcing every operation through an LLM.",
      "Long-term memory: SQLite stores reusable user preferences, project facts, and writing style information that can be retrieved before a run.",
      "Human-in-the-loop AI: low-scoring outputs can be approved, revised, or rejected before they are finalized.",
      "Workspace isolation: browser-specific workspace IDs scope runs, memory, and reviews for safer public demos.",
      "Observability: trace timelines expose memory, routing, tool, reviewer, and finalizer steps so the workflow is inspectable.",
    ],
    logic: [
      "Create or load a workspace ID in the browser.",
      "Submit the user task to the FastAPI agent endpoint.",
      "Retrieve relevant workspace-scoped memories from SQLite.",
      "Use the supervisor to select the specialist agent and optional backend tool.",
      "Execute the selected tool when needed, then run the specialist agent.",
      "Score the result with a reviewer agent and route low-confidence output to human review.",
      "Save trace, final answer, run status, useful memory, and history for the dashboard.",
    ],
    techRationale: [
      {
        name: "FastAPI",
        why: "Used for the backend API, routers, workspace-aware requests, tool execution, memory endpoints, and agent run endpoints.",
      },
      {
        name: "LangGraph",
        why: "Used to model the multi-agent workflow as explicit state transitions across memory retrieval, routing, tools, review, and finalization.",
      },
      {
        name: "Groq",
        why: "Used as the LLM inference provider for the agent workflow and direct chat playground.",
      },
      {
        name: "React",
        why: "Used for the dashboard UI covering Run Agent, Chat Playground, Run History, Human Reviews, Memory, stats, and productivity actions.",
      },
      {
        name: "SQLite",
        why: "Used for local run history, memory storage, pending reviews, and workspace-scoped persistence in a portfolio-friendly deployment.",
      },
      {
        name: "Tailwind CSS",
        why: "Used to build a polished, responsive dashboard with tabs, panels, empty states, badges, and interaction feedback.",
      },
    ],
    challenges: [
      "Keeping multi-agent execution understandable through trace timelines and structured run details.",
      "Adding workspace isolation for public demo safety without building a full authentication system.",
      "Combining direct chat with a separate structured agent workflow without confusing the user.",
      "Designing reviewer scoring and human review so low-confidence outputs have a clear safety path.",
    ],
    decisions: [
      "Separated `/chat` from `/agent/run` so users can choose between direct LLM interaction and the full multi-agent workflow.",
      "Used workspace IDs in localStorage to scope runs, memories, and reviews for each browser session in the public demo.",
      "Added deterministic backend tools so the system demonstrates agent tool use, not only text generation.",
      "Stored traces and run history so the workflow is debuggable and demo-friendly.",
    ],
    impact: [
      "Shows practical understanding of agentic AI system design.",
      "Demonstrates LangGraph-based multi-agent workflow thinking for real product use cases.",
      "Adds a strong AI platform project alongside RAG, NLP, and research work.",
      "Highlights memory, tools, reviewer scoring, human review, workspace isolation, and traceability as engineering concerns.",
    ],
    improvements: [
      "Upgrade SQLite to PostgreSQL or Supabase for stronger persistence on production hosting.",
      "Replace browser workspace IDs with authenticated user accounts and role-based access control.",
      "Add richer observability such as token cost, latency, model usage, and replayable run traces.",
      "Add configurable agent templates so users can create custom teams for different workflows.",
    ],
    tech: ["FastAPI", "LangGraph", "Groq", "React", "SQLite"],
    link: "https://github.com/Jatin29AFK/AgentFlow--Multi-Agent-AI-Platform",
    kindLabel: "AI Multi-Agent Project",
    live: "https://agent-flow-five-phi.vercel.app",
    image: "/projects/agentflow-dashboard.png",
    screenshots: [
      "/projects/agentflow-dashboard.png",
      "/projects/agentflow-run-agent.png",
      "/projects/run-agent2.png",
      "/projects/agentflow-chat-playground.png",
      "/projects/agentflow-history.png",
      "/projects/agentflow-reviews.png",
      "/projects/agentflow-memory.png",
    ],
    video: "/videos/agentflow-demo.webm",
  },
  {
    id: "code-review-bot",
    title: "Agentic AI Code Review Bot",
    shortTitle: "Code Review Bot",
    desc: "Multi-agent GitHub pull request reviewer with a React dashboard, live diff fetching, structured findings, comment previews, review history, and human-reviewable autofix patch drafts.",
    problem:
      "Pull request reviews are repetitive and time-sensitive. Teams still need to catch regressions, security issues, maintainability risks, and missing tests before merging, but doing that well on every PR takes a lot of engineering time.",
    why:
      "I built this project to show how agentic AI can support real developer workflows: fetching live GitHub diffs, routing review work across specialist agents, summarizing risk clearly, and keeping final decisions with the human reviewer.",
    users: [
      "Developers who want a fast first-pass review before asking teammates for manual review.",
      "Engineering teams that want more consistent checks for bugs, security issues, code quality problems, and missing tests.",
      "Maintainers who need structured GitHub comment previews and draft fixes without giving an AI direct merge authority.",
      "Recruiters and engineering reviewers who want to see practical AI developer tooling beyond chatbot-style demos.",
    ],
    systemDesign: [
      "The dashboard starts with an operations overview showing review counts, average score, issues found, and high-risk PR indicators so teams can understand review activity at a glance.",
      "A manual review screen accepts a repository URL, PR number, optional GitHub token, and optional path filters so reviews can target public or private pull requests.",
      "The FastAPI backend fetches live PR metadata and unified diffs from the GitHub REST API, then normalizes the review request into structured backend state.",
      "A custom review orchestrator runs a staged multi-agent workflow covering diff summary, planning, bug detection, security review, code quality review, test suggestion, final aggregation, and autofix drafting.",
      "The review result page combines score, risk snapshot, severity mix, reviewed files, workflow notes, and category filters so a human reviewer can inspect the final output efficiently.",
      "Structured issue cards convert agent output into review findings with severity, category, confidence score, explanation, suggested fix, and risk impact.",
      "Separate panels expose comment preview, test suggestions, positive notes, and autofix drafts so the reviewer can decide what should be posted or applied next.",
      "SQLite stores review history so past PR reviews, findings, comment previews, and generated patch drafts can be searched and reopened.",
      "Optional GitHub comment posting and webhook support let the system move from manual review mode toward automated PR review workflows while staying human-controlled.",
    ],
    architecture: [
      "React + Vite review dashboard",
      "Review input and PR autofill flow",
      "FastAPI API layer",
      "GitHub REST diff fetcher",
      "Multi-agent review orchestrator",
      "Bug / Security / Quality / Test specialist agents",
      "Final review aggregator",
      "Autofix patch draft generator",
      "SQLite review history store",
      "Comment preview and webhook integration",
    ],
    workflow: ["Paste PR URL", "Autofill PR details", "Fetch live GitHub diff", "Plan specialist reviews", "Run bug / security / quality / test agents", "Aggregate findings", "Score PR risk", "Draft autofix patches", "Preview or post comments"],
    concepts: [
      "Agentic code review: a coordinator uses multiple specialized review agents instead of depending on one generic LLM response.",
      "Live diff analysis: the system works from real GitHub pull request patches, not manually copied snippets.",
      "Structured findings: review output is normalized into machine-readable issue objects with severity, confidence, location, and suggested fixes.",
      "Risk scoring: the system summarizes issue severity and confidence into an overall PR risk signal for faster triage.",
      "Human-in-the-loop autofix: the bot drafts unified diff patches for eligible issues but never auto-applies them.",
      "Repository scoping: optional path filters let reviewers focus on selected files or exclude noisy parts of a pull request.",
      "GitHub workflow integration: reviews can stay in dashboard preview mode or post comments back to GitHub when enabled.",
    ],
    logic: [
      "Parse the GitHub PR URL or repo + PR number into a review request.",
      "Fetch PR metadata and diff content from the GitHub API.",
      "Summarize the diff and decide which specialist review agents should run.",
      "Run bug, security, code quality, and test coverage review passes.",
      "Merge and deduplicate findings into a final structured review summary.",
      "Calculate review score, risk level, and issue distribution.",
      "Generate draft unified diff patches for eligible high-confidence issues.",
      "Store the review, findings, comment preview, and patch drafts in SQLite history.",
    ],
    techRationale: [
      {
        name: "FastAPI",
        why: "Used for review endpoints, GitHub integration, orchestrating agent runs, and serving structured review data to the frontend.",
      },
      {
        name: "React",
        why: "Used to build the dashboard for PR input, review history, findings inspection, comment preview, and autofix draft viewing.",
      },
      {
        name: "SQLite",
        why: "Used for lightweight persistence of review history, detailed findings, and generated patch drafts in a portfolio-friendly setup.",
      },
      {
        name: "GitHub REST API",
        why: "Used to fetch live pull request diffs and optionally post comments back to reviewed PRs.",
      },
      {
        name: "Configurable LLM Providers",
        why: "Used so the review workflow can run with Groq, OpenAI, OpenRouter, or compatible APIs instead of being locked to one provider.",
      },
    ],
    challenges: [
      "Keeping review output structured and reliable even when multiple agents contribute findings.",
      "Balancing deep review coverage with token limits and noisy pull request diffs.",
      "Designing autofix as a useful assistant without allowing unsafe automatic code changes.",
      "Supporting both no-token public repo reviews and authenticated private repo workflows.",
    ],
    decisions: [
      "Kept autofix draft-only so humans remain in control of applied code changes.",
      "Separated specialist agents by review concern so bugs, security, quality, and testing can be reasoned about more clearly.",
      "Added comment preview before posting to GitHub so teams can inspect AI output first.",
      "Built separate dashboard, review-form, result, and autofix surfaces so the product feels like a usable engineering tool instead of a single long AI output page.",
      "Stored review history in SQLite so past PR analyses can be revisited without re-running every review from scratch.",
    ],
    impact: [
      "Demonstrates AI developer-tooling experience, not just end-user chatbot product work.",
      "Shows practical GitHub integration, multi-agent orchestration, and human-in-the-loop safety design.",
      "Adds a strong software engineering review automation project alongside RAG, NLP, and agent platform work.",
      "Highlights structured reasoning, explainable findings, and controlled autofix generation as product design choices.",
    ],
    improvements: [
      "Add inline diff viewers and file-by-file finding navigation in the frontend.",
      "Add organization-level policy packs for custom code review rules and standards.",
      "Upgrade SQLite demo storage to a hosted database for collaborative multi-user review history.",
      "Add background queues for larger PR batches and scheduled webhook-driven review processing.",
    ],
    tech: ["FastAPI", "React", "SQLite", "GitHub API", "Multi-Agent AI"],
    link: "https://github.com/Jatin29AFK/Agentic-AI-Code-Review-Bot",
    kindLabel: "AI Code Review Project",
    image: "/projects/Code-Review-Bot dashboard.png",
    screenshots: [
      "/projects/Code-Review-Bot dashboard.png",
      "/projects/New_Review_Section.png",
      "/projects/Review_Result.png",
      "/projects/Review_Result2.png",
      "/projects/Bot_Comment_preview.png",
      "/projects/Bot_Suggestions.png",
      "/projects/Bot-Autofix_Drafts.png",
    ],
    gallery: [
      {
        src: "/projects/Code-Review-Bot dashboard.png",
        title: "Dashboard Overview",
        desc: "Landing screen with review KPIs, high-risk PR tracking, repo access guidance, and quick navigation into new reviews or review history.",
      },
      {
        src: "/projects/New_Review_Section.png",
        title: "Manual PR Review Intake",
        desc: "Form-driven review setup where the user enters the PR URL, repository URL, PR number, optional GitHub token, and optional path filters before running the agent workflow.",
      },
      {
        src: "/projects/Review_Result.png",
        title: "Review Summary and Risk Snapshot",
        desc: "Final review result screen showing the PR title, overall score, risk level, severity mix, reviewed modules, and the actions available for export or GitHub comment posting.",
      },
      {
        src: "/projects/Review_Result2.png",
        title: "Findings and Workflow Trace",
        desc: "Detailed result view with category filters, reviewed files, workflow notes, and high-severity findings so the reviewer can audit why the bot raised a specific issue.",
      },
      {
        src: "/projects/Bot_Comment_preview.png",
        title: "Comment Preview",
        desc: "Preview panel for the exact summary comment and inline comments that can be posted back to the GitHub pull request after human inspection.",
      },
      {
        src: "/projects/Bot_Suggestions.png",
        title: "Test Suggestions and Positive Notes",
        desc: "Reviewer-facing section that separates follow-up test ideas and positive observations so the output is balanced, actionable, and easier to communicate back to the team.",
      },
      {
        src: "/projects/Bot-Autofix_Drafts.png",
        title: "Autofix Drafts",
        desc: "Human-reviewable unified diff patch drafts generated only for eligible high-confidence issues, with linked findings and copy/export actions instead of auto-applying changes.",
      },
    ],
    video: "/videos/Code-Review-Bot_Demo.webm",
  },
  {
    id: "hirefit",
    title: "HireFit - AI Resume & Job Matcher",
    shortTitle: "HireFit",
    desc: "Applicant-focused NLP platform that helps a job seeker compare their resume with a job description, understand missing skills, improve ATS alignment, and generate safer resume optimization suggestions.",
    problem:
      "Applicants often apply without knowing whether their resume actually matches the job description. They struggle to identify missing keywords, weak skill coverage, ATS gaps, and which resume points should be improved for a specific role.",
    why:
      "I built HireFit as an applicant-side NLP assistant so a candidate can upload a resume and JD, get a clear match score, understand skill gaps, audit ATS readiness, and improve the resume without fabricating experience.",
    users: [
      "Job applicants who want to know how strongly their resume matches a specific job description before applying.",
      "Students and freshers who need guidance on missing skills, weak resume sections, and ATS keyword coverage.",
      "Working professionals who want role-specific resume optimization instead of generic resume advice.",
      "Applicants preparing multiple job applications who need a repeatable way to compare each resume against each JD.",
    ],
    systemDesign: [
      "The applicant uploads a resume and pastes or uploads a job description. The system treats the JD as the target requirement document and the resume as the applicant evidence document.",
      "The backend runs NLP preprocessing on both texts: extraction, cleaning, tokenization, normalization, keyword detection, and feature construction.",
      "The matching layer compares resume content with JD requirements using TF-IDF and cosine similarity so the system can produce an interpretable match score.",
      "The skill-gap layer identifies important JD skills that are missing, weakly represented, or not clearly evidenced in the resume.",
      "The ATS audit layer checks whether important keywords, role phrases, and requirement terms are represented clearly enough for automated screening systems.",
      "The GenAI layer is used after scoring to explain the result and suggest safer resume improvements. It should not invent projects or experience; it works from detected resume evidence.",
    ],
    architecture: ["Applicant dashboard", "Resume/JD parser", "NLP preprocessing", "TF-IDF vectorizer", "Cosine similarity scorer", "Skill-gap analyzer", "ATS audit module", "Gemini explanation layer", "Resume optimization view"],
    workflow: ["Applicant uploads resume", "Applicant adds target JD", "Text extraction and NLP cleaning", "Skill and keyword extraction", "TF-IDF vector creation", "Cosine similarity scoring", "Gap and ATS analysis", "Safe optimization suggestions"],
    concepts: [
      "NLP text preprocessing: resume and JD text are cleaned, normalized, tokenized, and converted into machine-readable text features.",
      "Information retrieval: the system treats the JD as a query-like requirement document and the resume as a candidate evidence document.",
      "TF-IDF vectorization: terms that matter more to a role receive stronger weight than common filler words, making skill and keyword overlap more meaningful.",
      "Cosine similarity: resume and JD vectors are compared by direction, giving a normalized similarity score even when both documents have different lengths.",
      "Keyword and phrase matching: role-specific terms such as Python, FastAPI, RAG, SQL, deployment, APIs, or ML pipelines can be detected and compared.",
      "Skill-gap analysis: missing or weakly represented JD requirements are surfaced so applicants know exactly what to improve or learn.",
      "ATS optimization: the project checks whether the resume contains enough relevant role keywords to survive automated screening filters.",
      "Grounded GenAI suggestion: LLM output is used for explanation and wording support, but the suggestions are based on resume/JD evidence rather than free hallucinated claims.",
    ],
    logic: [
      "Parse resume and JD text into clean textual inputs.",
      "Extract role keywords, technical skills, and important requirement phrases from the JD.",
      "Extract applicant skills, project evidence, and resume keywords from the resume.",
      "Create TF-IDF vectors from both documents and compute cosine similarity.",
      "Generate a match score and explain which sections contributed to the score.",
      "Detect missing skills and ATS keyword gaps.",
      "Use Gemini to summarize the analysis and suggest safer resume improvements.",
    ],
    techRationale: [
      {
        name: "React",
        why: "Used to build the applicant-facing dashboard where users upload resume/JD, view score cards, inspect skill gaps, and review optimized suggestions interactively.",
      },
      {
        name: "FastAPI",
        why: "Used for the Python NLP backend because resume parsing, TF-IDF, similarity scoring, and LLM orchestration are easier to maintain in Python services.",
      },
      {
        name: "TF-IDF",
        why: "Used because resume-JD matching needs interpretable keyword importance. It helps identify which JD terms are important and whether the resume covers them.",
      },
      {
        name: "Cosine Similarity",
        why: "Used to compare resume and JD vectors fairly even if one document is longer than the other.",
      },
      {
        name: "Gemini",
        why: "Used for applicant-friendly explanation, rewriting support, and resume optimization guidance after deterministic NLP scoring is complete.",
      },
    ],
    challenges: ["Avoiding generic resume advice", "Keeping suggestions grounded in applicant evidence", "Balancing ATS keyword matching with meaningful skill relevance", "Making NLP scores understandable to non-technical applicants"],
    decisions: [
      "Used deterministic NLP scoring before GenAI so the match score is explainable and not only based on an LLM response.",
      "Separated skill gaps from optimized suggestions so applicants can distinguish between what they genuinely need to learn and what they can rewrite better.",
      "Designed the product around applicant decision-making: should I apply, what am I missing, and how can I improve this resume for this JD?",
    ],
    impact: ["Helps applicants apply with more confidence", "Shows missing JD skills before applying", "Improves resume-JD alignment", "Makes ATS optimization more transparent", "Turns resume improvement into a role-specific NLP workflow"],
    improvements: [
      "Add embeddings for semantic skill matching so related terms like REST API and backend services can be matched more intelligently.",
      "Add confidence scores for extracted skills and experience evidence.",
      "Add role-specific scoring weights so AI/ML, backend, frontend, GenAI, and data roles can be evaluated differently.",
      "Add applicant profile history so users can compare improvement across multiple resume versions.",
    ],
    tech: ["React", "FastAPI", "Gemini", "TF-IDF", "Cosine Similarity"],
    link: "https://github.com/Jatin29AFK/HireFit---AI_Resume_Job_Matcher",
    kindLabel: "AI NLP Project",
    image: "/projects/overview.png",
    screenshots: ["/projects/overview.png", "/projects/recruiter-view.png", "/projects/deep-dive1.png", "/projects/optimized-resume.png"],
    video: "/videos/hirefit-demo.webm",
  },
  {
    id: "nexora",
    title: "Nexora - AI Study Assistant",
    shortTitle: "Nexora",
    desc: "RAG-based study assistant that allows users to query PDFs and URLs, generate quizzes, and learn from uploaded knowledge sources.",
    problem:
      "Students and professionals often have dense PDFs, URLs, and notes but no fast way to ask grounded questions or convert material into practice tests.",
    why:
      "I built Nexora as a practical RAG product that combines ingestion, hybrid retrieval, reranking, answer generation, and quiz workflows.",
    users: [
      "Students who need to understand long PDFs, lecture notes, and URLs faster.",
      "Learners who want answers grounded in their own uploaded content, not generic chatbot guesses.",
      "Exam-preparation users who want quizzes generated from their study material.",
      "Professionals who need to query technical documents, reports, or documentation quickly.",
    ],
    systemDesign: [
      "The application starts with document ingestion. A PDF or URL is converted into clean text that can be chunked and indexed.",
      "NLP preprocessing is used to clean extracted text, remove noise, preserve useful context, and prepare chunks for retrieval.",
      "Chunks are stored in retrieval indexes so user questions can be matched against the most relevant parts of the uploaded knowledge source.",
      "Hybrid retrieval combines semantic search with keyword search so the system can catch both meaning-based matches and exact technical terms.",
      "A reranking stage reviews candidate chunks before answer generation, improving the quality of the context sent to the LLM.",
      "The final answer or quiz is generated only after retrieval, which makes the product closer to a grounded study assistant than a generic chatbot.",
    ],
    architecture: ["React study workspace", "FastAPI backend", "PDF/URL ingestion", "Chunking pipeline", "FAISS + BM25 retrieval", "Cross-Encoder reranker", "LLM answer/quiz generator"],
    workflow: ["User uploads PDF/URL", "Text extraction", "Chunking", "FAISS + BM25 retrieval", "Cross-Encoder reranking", "LLM answer / quiz generation"],
    concepts: [
      "NLP document processing: uploaded PDFs and URLs are converted into clean textual passages that the system can search and reason over.",
      "RAG: retrieval-augmented generation brings external document context into the LLM prompt so answers are based on uploaded material.",
      "Chunking: large documents are split into smaller passages so retrieval can find the most relevant sections instead of sending the whole document.",
      "FAISS: semantic vectors are searched efficiently to find chunks similar in meaning to the user question.",
      "BM25: keyword search is used alongside embeddings to catch exact terms, formulas, names, and technical phrases.",
      "Cross-Encoder reranking: retrieved chunks are scored again with a stronger relevance model before final answer generation.",
      "Quiz generation: retrieved context is transformed into practice questions, helping users test recall instead of only reading answers.",
    ],
    logic: ["Hybrid retrieval", "Semantic chunk matching", "Keyword recall with BM25", "Reranking for answer quality", "Question and quiz generation"],
    techRationale: [
      {
        name: "React",
        why: "Used for a study workspace with upload flow, chat screen, quiz studio, and result views.",
      },
      {
        name: "FastAPI",
        why: "Used to keep ingestion, retrieval, reranking, and generation logic in Python where AI libraries are strongest.",
      },
      {
        name: "FAISS",
        why: "Used for fast vector similarity search, making semantic retrieval practical for document chunks.",
      },
      {
        name: "BM25",
        why: "Used because embedding search can miss exact keywords. BM25 improves recall for technical terms and direct phrase matches.",
      },
      {
        name: "Cross-Encoder",
        why: "Used as a reranking layer because it compares the query and chunk together, giving better relevance ordering than first-pass retrieval alone.",
      },
    ],
    challenges: ["Balancing retrieval speed and relevance", "Supporting multiple source types", "Keeping answers grounded in uploaded content"],
    decisions: [
      "Used hybrid retrieval because RAG quality depends heavily on retrieving the right context before the LLM is called.",
      "Separated ingestion, retrieval, reranking, and generation into pipeline stages so each part can be improved independently.",
      "Added quiz generation because it turns the product from a Q&A tool into a learning system.",
    ],
    impact: ["Faster learning from long documents", "Interactive study flow", "Quiz-based recall", "Reusable RAG architecture"],
    improvements: [
      "Add source citations in every answer so users can jump back to the exact PDF page or URL section.",
      "Add persistent knowledge collections with Supabase so users can return to previous study sessions.",
      "Add evaluation metrics such as retrieval precision, answer groundedness, and quiz quality.",
      "Add streaming responses and background indexing for a smoother user experience.",
    ],
    tech: ["React", "FastAPI", "FAISS", "BM25", "Cross-Encoder"],
    link: "https://github.com/Jatin29AFK/Nexora",
    kindLabel: "RAG AI Project",
    image: "/projects/HomePage.png",
    screenshots: ["/projects/HomePage.png", "/projects/ChatScreen.png", "/projects/QuizStudio.png", "/projects/QuizResults.png"],
    video: "/videos/nexora-demo.webm",
  },
  {
    id: "digital-twin",
    title: "IoT Digital Twin for Smart Storage",
    shortTitle: "Digital Twin",
    desc: "Research project on an IoT-enabled digital twin architecture for post-harvest smart storage, using sensor telemetry, cloud ingestion, and digital representation of storage conditions.",
    problem:
      "Post-harvest storage needs continuous visibility into environmental conditions so teams can reduce spoilage and react before quality drops.",
    why:
      "I worked on this as a research-oriented system design problem to show how IoT telemetry and digital twin concepts can support better visibility into post-harvest storage environments.",
    users: [
      "Researchers studying IoT, cloud telemetry, and digital twin systems for agricultural storage.",
      "Engineers exploring how physical storage environments can be represented digitally through sensor data.",
      "Agricultural technology teams interested in smarter post-harvest monitoring and spoilage-risk reduction.",
      "Academic reviewers or hiring managers who want to see applied system-design thinking beyond normal web projects.",
    ],
    systemDesign: [
      "The paper studies how physical storage conditions can be captured through IoT sensors and represented in a software-based twin model.",
      "A Raspberry Pi-style edge layer is used conceptually as the bridge between real-world sensors and cloud ingestion.",
      "Telemetry such as temperature and humidity can be pushed into an IoT hub, where readings can be processed and mapped to the digital twin.",
      "The digital twin model provides a structured representation of the storage environment so physical state can be reasoned about digitally.",
      "The research direction focuses on monitoring, condition awareness, and the possibility of ML-based risk or anomaly analysis over time.",
    ],
    architecture: ["IoT sensor layer", "Raspberry Pi edge gateway", "Telemetry ingestion", "Azure IoT Hub", "Digital twin model", "Condition monitoring", "ML-based analysis direction"],
    workflow: ["Define storage problem", "Capture sensor telemetry", "Send readings through edge gateway", "Ingest data in cloud", "Map readings to digital twin", "Analyze storage condition", "Document research findings"],
    concepts: [
      "IoT telemetry: physical sensor readings are captured and sent to software systems for monitoring.",
      "Edge device: Raspberry Pi acts as the bridge between sensors and the cloud pipeline.",
      "Azure IoT Hub: telemetry ingestion is handled through a cloud service built for connected devices.",
      "Digital twin: a virtual model mirrors the state of the real storage environment.",
      "ML monitoring: historical and live readings can be analyzed to identify risky conditions or abnormal behavior.",
      "Research contribution: the work connects IoT sensing, cloud ingestion, digital twin modeling, and storage-condition analysis in one applied architecture.",
    ],
    logic: [
      "Identify the post-harvest storage monitoring problem and the environmental parameters that affect stored produce.",
      "Use IoT sensors as the data source for physical condition monitoring.",
      "Use an edge gateway to collect and forward telemetry.",
      "Use cloud ingestion to receive and organize telemetry events.",
      "Represent the storage unit as a digital twin that updates from sensor readings.",
      "Discuss how ML-based analysis can support future anomaly detection and storage-risk prediction.",
    ],
    techRationale: [
      {
        name: "Raspberry Pi",
        why: "Used as a practical edge device for collecting sensor data and sending it to the cloud.",
      },
      {
        name: "Sensors",
        why: "Used to capture real-world storage conditions that affect post-harvest quality.",
      },
      {
        name: "Azure IoT Hub",
        why: "Used for reliable telemetry ingestion from connected devices into the cloud ecosystem.",
      },
      {
        name: "Azure Digital Twin",
        why: "Used to model the physical storage environment as a virtual entity that can be updated from live telemetry.",
      },
      {
        name: "Machine Learning",
        why: "Used conceptually for analyzing condition patterns, identifying risk signals, and supporting smarter storage decisions.",
      },
    ],
    challenges: ["Connecting physical sensor data with a digital representation", "Designing a clear telemetry-to-twin architecture", "Making the research practical for real storage environments", "Positioning ML as an analysis layer over IoT data"],
    decisions: [
      "Used an IoT-first architecture because storage monitoring depends on real-world sensor signals, not only historical datasets.",
      "Modeled the environment as a digital twin so software can represent physical state clearly and update it over time.",
      "Focused on post-harvest storage because small improvements in monitoring can have practical impact on spoilage reduction.",
    ],
    impact: ["Research publication", "Applied IoT and digital twin system design", "Post-harvest storage monitoring use case", "Demonstrates ability to reason about AI/IoT architecture at research level"],
    improvements: [
      "Add alert thresholds and notification workflows for unsafe storage conditions.",
      "Add time-series dashboards for long-term pattern analysis.",
      "Add predictive models for spoilage risk based on environmental trends.",
      "Add device health monitoring so sensor failures can be detected early.",
    ],
    tech: ["Azure Digital Twin", "IoT Hub", "Raspberry Pi", "ML", "Sensors"],
    link: "https://link.springer.com/chapter/10.1007/978-981-96-9979-7_6",
    linkLabel: "Research Paper Link",
    paperPdf: "/Resume/Research_PPR_260426_130810%202.pdf",
    image: "/projects/Overview1.png",
    screenshots: [],
  },
];

const skillGroups = [
  { title: "AI/ML Core", skills: ["Machine Learning", "Deep Learning", "Feature Engineering", "EDA", "Model Evaluation", "Regression", "Classification", "Clustering", "Experimentation"] },
  { title: "GenAI & Agents", skills: ["Generative AI", "LLM Apps", "AI Agents", "Agentic AI", "LangGraph", "Groq", "Multi-Agent Orchestration", "Agentic Workflows", "Prompt Engineering", "Context Grounding", "Tool Use"] },
  { title: "RAG & NLP", skills: ["RAG", "NLP", "Information Retrieval", "Semantic Search", "Document Parsing", "TF-IDF", "Cosine Similarity", "Sentence Transformers"] },
  { title: "Retrieval Stack", skills: ["FAISS", "Vector Search", "BM25", "Cross-Encoder Reranking", "Hybrid Search", "Chunking", "Unstructured Data Processing"] },
  { title: "Frameworks", skills: ["PyTorch", "Scikit-learn", "LangChain", "LangGraph", "FastAPI", "Flask", "Joblib", "SQLite", "Supabase"] },
  { title: "Languages", skills: ["Python", "SQL", "JavaScript", "C", "C++", "C#"] },
  { title: "Product UI", skills: ["React", "Vite", "Tailwind CSS", "TypeScript", "Three.js", "GSAP", "REST APIs"] },
  { title: "Cloud & MLOps", skills: ["Docker", "Azure", "Vercel", "Render", "CI/CD", "Git", "GitHub", "Model Deployment"] },
  { title: "IoT & 3D", skills: ["Azure IoT", "Digital Twin", "Raspberry Pi", "Sensors", "VTK.js", "Point Clouds", "3D Evaluation"] },
];

const architectures: Architecture[] = [
  {
    id: "code-review-bot",
    title: "AI PR Review Orchestrator",
    desc: "A conceptual architecture for reviewing GitHub pull requests with specialist agents, structured findings, comment previews, and draft autofix generation.",
    nodes: ["PR intake", "GitHub diff fetch", "Diff summary", "Planning agent", "Bug / Security / Quality / Test agents", "Finding aggregation", "Risk scoring", "Comment preview", "Autofix drafts", "SQLite history"],
    stack: ["React", "FastAPI", "GitHub API", "SQLite", "Multi-Agent AI"],
  },
  {
    id: "rag",
    title: "RAG System Design",
    desc: "A conceptual architecture for grounded LLM answers over PDFs, URLs, and unstructured documents.",
    nodes: ["Ingestion", "NLP cleaning", "Chunking strategy", "Embedding index", "BM25 recall", "Cross-Encoder rerank", "Grounded generation", "Evaluation"],
    stack: ["FAISS", "BM25", "Cross-Encoder", "LangChain", "FastAPI", "LLM"],
  },
  {
    id: "agentflow",
    title: "Multi-Agent Platform Design",
    desc: "AgentFlow architecture for workspace-scoped multi-agent runs with memory retrieval, supervisor routing, backend tools, reviewer scoring, human review, and trace history.",
    nodes: ["Workspace ID", "Memory retrieval", "Supervisor", "Tool node", "Specialist agent", "Reviewer score", "Human review", "Trace history"],
    stack: ["FastAPI", "LangGraph", "Groq", "SQLite", "React"],
  },
  {
    id: "resume",
    title: "NLP Resume-JD Matcher",
    desc: "Applicant-side NLP flow for matching a resume against a target role and explaining gaps.",
    nodes: ["Resume parsing", "JD parsing", "Token normalization", "TF-IDF vectors", "Cosine score", "Skill gap analysis", "ATS audit", "Safe rewrite"],
    stack: ["NLP", "TF-IDF", "Cosine Similarity", "Gemini", "FastAPI"],
  },
  {
    id: "twin",
    title: "IoT Digital Twin Research",
    desc: "A research architecture for mapping physical storage conditions into a cloud-connected digital model.",
    nodes: ["Problem definition", "Sensor telemetry", "Edge gateway", "Cloud ingestion", "Twin model", "Condition state", "ML risk analysis"],
    stack: ["Azure IoT", "Digital Twin", "Raspberry Pi", "Sensors", "ML"],
  },
  {
    id: "inference",
    title: "ML Inference Productization",
    desc: "A deployment-oriented path from model artifact to reliable business-facing AI tool.",
    nodes: ["Data prep", "Feature scaling", "Model artifact", "Validation", "API inference", "UI controls", "Latency checks", "Packaging"],
    stack: ["Python", "PyTorch", "Scikit-learn", "Joblib", "FastAPI", "React"],
  },
];

const motionSystems: MotionSystem[] = [
  {
    title: "Code Review Bot | PR Review Workflow",
    subtitle: "Multi-agent GitHub review with human-controlled output",
    description:
      "Shows how the Code Review Bot takes a pull request, fetches the live diff, routes the review across specialist agents, aggregates issues, drafts GitHub comments, and prepares optional autofix patches for human review.",
    steps: ["PR URL Input", "GitHub Diff Fetch", "Planning Agent", "Bug / Security / Quality / Test Review", "Finding Aggregation", "Risk Score", "Comment Preview", "Autofix Drafts", "Review History"],
    stack: ["FastAPI", "React", "GitHub API", "SQLite", "Multi-Agent AI"],
  },
  {
    title: "AgentFlow | Multi-Agent Orchestration",
    subtitle: "Supervisor-led agent workflow with memory and review",
    description:
      "Shows how AgentFlow scopes each browser workspace, retrieves memory, routes a task through LangGraph agents and backend tools, scores the output, and stores a traceable run history.",
    steps: ["Workspace", "Memory", "Supervisor", "Tool Node", "Specialist Agent", "Reviewer", "Human Review", "History"],
    stack: ["FastAPI", "LangGraph", "Groq", "SQLite", "React"],
  },
  {
    title: "HireFit | Applicant NLP Flow",
    subtitle: "Resume-JD matching for job applicants",
    description:
      "Shows how HireFit compares a candidate resume with a job description, finds missing skills, checks ATS alignment, and generates safer improvement suggestions.",
    steps: ["Resume Upload", "Job Description Input", "NLP Cleaning", "TF-IDF + Cosine Match", "Skill Gap Analysis", "ATS Audit", "Safe Suggestions"],
    stack: ["NLP", "TF-IDF", "Cosine Similarity", "Gemini", "FastAPI"],
  },
  {
    title: "Nexora | RAG Study Pipeline",
    subtitle: "Grounded Q&A and quiz generation",
    description:
      "Shows how Nexora ingests PDFs and URLs, builds hybrid retrieval context, reranks evidence, and produces grounded answers or quizzes from the uploaded content.",
    steps: ["PDF / URL Input", "Text Extraction", "Chunking", "FAISS + BM25 Retrieval", "Cross-Encoder Rerank", "Grounded Answer", "Quiz Generation"],
    stack: ["RAG", "FAISS", "BM25", "Cross-Encoder", "FastAPI"],
  },
  {
    title: "Digital Twin | Research Flow",
    subtitle: "IoT-enabled monitoring architecture",
    description:
      "Shows how the research project maps physical storage signals into a digital twin so monitored conditions can be analyzed more clearly over time.",
    steps: ["Sensors", "Edge Gateway", "Telemetry Stream", "Azure IoT Hub", "Digital Twin Model", "Condition Monitoring", "ML Analysis Direction"],
    stack: ["Azure IoT", "Digital Twin", "Sensors", "Raspberry Pi", "ML"],
  },
];

const timeline = [
  {
    year: "2023 - 2025",
    title: "M.Tech CSE, NIT Hamirpur",
    desc: "Focused on AI/ML, Systems, Applied Software Engineering, and Research-oriented problem solving.",
  },
  {
    year: "2024 - 2025",
    title: "Research Publication",
    desc: "Published research on IoT-enabled Digital Twin architecture for smart post-harvest storage monitoring.",
  },
  {
    year: "Jan 2025 - Mar 2026",
    title: "AI/ML Engineer, Havells India Ltd.",
    desc: "Built ML inference systems, internal AI tools, prediction pipelines, and business-facing AI applications.",
  },
  {
    year: "Mar 2026 - Present",
    title: "Senior Engineer - AI/ML, Havells India Ltd.",
    desc: "Building AI agents, RAG workflows, internal AI product systems, and model-assisted decision tools.",
  },
];

const fallbackRepos: Repo[] = [
  {
    id: 1,
    name: "Agentic-AI-Code-Review-Bot",
    html_url: "https://github.com/Jatin29AFK/Agentic-AI-Code-Review-Bot",
    description: "Multi-agent GitHub PR reviewer with risk scoring, comment previews, and draft autofix patches.",
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "AgentFlow--Multi-Agent-AI-Platform",
    html_url: "https://github.com/Jatin29AFK/AgentFlow--Multi-Agent-AI-Platform",
    description: "FastAPI, LangGraph, Groq, React, and SQLite multi-agent orchestration platform.",
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "HireFit---AI_Resume_Job_Matcher",
    html_url: "https://github.com/Jatin29AFK/HireFit---AI_Resume_Job_Matcher",
    description: "AI resume and job matching platform.",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Nexora",
    html_url: "https://github.com/Jatin29AFK/Nexora",
    description: "RAG study assistant for PDFs, URLs, chat, and quizzes.",
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    updated_at: new Date().toISOString(),
  },
];

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    return savedTheme === "light" ? "light" : "dark";
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArchitecture, setSelectedArchitecture] = useState<Architecture | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useGSAP(() => {
    gsap.from(".hero-reveal", {
      y: 45,
      opacity: 0,
      duration: 0.95,
      stagger: 0.12,
      ease: "power3.out",
    });

    gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((element) => {
      gsap.fromTo(
        element,
        { y: 54, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 84%" },
        },
      );
    });

    gsap.from(".skill-node", {
      scale: 0.82,
      opacity: 0,
      stagger: 0.04,
      duration: 0.55,
      ease: "back.out(1.8)",
      scrollTrigger: { trigger: "#skills", start: "top 68%" },
    });

    gsap.from(".timeline-item", {
      x: -34,
      opacity: 0,
      stagger: 0.14,
      duration: 0.65,
      ease: "power3.out",
      scrollTrigger: { trigger: "#experience", start: "top 70%" },
    });

    gsap.to(".project-track", {
      xPercent: -6,
      ease: "none",
      scrollTrigger: { trigger: "#projects", start: "top 60%", end: "bottom top", scrub: 1 },
    });

    gsap.from(".ai-motion-card", {
      y: 42,
      opacity: 0,
      rotateX: 8,
      stagger: 0.12,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: { trigger: "#architecture", start: "top 74%" },
    });

    gsap.to(".system-packet", {
      x: 320,
      repeat: -1,
      stagger: 0.24,
      duration: 2.8,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <main className="theme-bg theme-text ai-grid relative min-h-screen overflow-hidden">
      <NeuralBackground />
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero onAsk={() => setChatOpen(true)} />
      <About />
      <Projects onOpenProject={setSelectedProject} />
      <AIMotionSystems onOpenArchitecture={setSelectedArchitecture} />
      <Skills />
      <RecruiterHub />
      <GitHubActivity />
      <Experience />
      <Contact />
      <Footer />
      <CommandPalette onOpenProject={setSelectedProject} onOpenChat={() => setChatOpen(true)} />
      <PortfolioChat open={chatOpen} setOpen={setChatOpen} onOpenProject={setSelectedProject} />
      {selectedProject && <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {selectedArchitecture && (
        <ArchitectureModal architecture={selectedArchitecture} onClose={() => setSelectedArchitecture(null)} />
      )}
    </main>
  );
}

function Navbar({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}) {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <nav className="nav-shell animated-header fixed left-0 top-0 z-50 w-full border-b">
      <div className="nav-inner mx-auto flex max-w-7xl items-center justify-between px-5">
        <a href="#home" onClick={closeMenu} className="nav-brand font-bold tracking-wide">
          <img src={profilePhotoPath} alt="Jatin Shukla" className="nav-avatar" />
          <span>
            <span className="text-cyan-400">Jatin</span> Shukla
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} className="nav-link text-muted hover:text-cyan-400">
              {item.label}
            </a>
          ))}
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-xl border border-cyan-400/30 px-4 py-3 text-base font-bold text-cyan-300"
            aria-label="Toggle menu"
          >
            {open ? "X" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <div className="strong-card mx-5 mb-4 rounded-2xl p-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="text-muted rounded-xl px-3 py-2 hover:bg-cyan-400/10 hover:text-cyan-400"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}) {
  return (
    <button
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      className="theme-toggle"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}

function NeuralBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-70">
      <div className="grid-sweep grid-sweep-a" />
      <div className="grid-sweep grid-sweep-b" />
      <div className="data-columns">
        {Array.from({ length: 10 }).map((_, index) => (
          <span key={index} style={{ left: `${index * 10}%`, animationDelay: `${index * 0.45}s` }} />
        ))}
      </div>
      <svg className="absolute left-0 top-0 h-full w-full" viewBox="0 0 1200 800" fill="none">
        <line x1="160" y1="160" x2="410" y2="290" stroke="rgba(34,211,238,0.28)" strokeWidth="1.5" className="neural-line" />
        <line x1="410" y1="290" x2="650" y2="180" stroke="rgba(132,204,22,0.26)" strokeWidth="1.5" className="neural-line" />
        <line x1="650" y1="180" x2="920" y2="330" stroke="rgba(34,211,238,0.24)" strokeWidth="1.5" className="neural-line" />
        <line x1="280" y1="540" x2="560" y2="420" stroke="rgba(14,165,233,0.22)" strokeWidth="1.5" className="neural-line" />
        <line x1="560" y1="420" x2="860" y2="590" stroke="rgba(132,204,22,0.24)" strokeWidth="1.5" className="neural-line" />
        {[160, 410, 650, 920, 280, 560, 860].map((x, index) => (
          <circle
            key={x}
            cx={x}
            cy={[160, 290, 180, 330, 540, 420, 590][index]}
            r={index % 2 === 0 ? 7 : 8}
            fill={index % 2 === 0 ? "#22d3ee" : "#84cc16"}
            className={index % 2 === 0 ? "float-node" : "float-node-delay"}
          />
        ))}
      </svg>
    </div>
  );
}

function Hero({ onAsk }: { onAsk: () => void }) {
  return (
    <section id="home" className="relative z-10 flex min-h-screen items-center px-6 pb-16 pt-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <p className="hero-reveal mb-4 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            Senior AI/ML Engineer | RAG & Agentic AI | Full-Stack AI Developer
          </p>

          <h1 className="hero-reveal mb-6 text-5xl font-bold leading-tight md:text-7xl">
            Jatin Shukla
            <span className="gradient-text block">Builds Production AI Systems.</span>
          </h1>

          <p className="hero-reveal text-muted mb-8 max-w-xl text-lg leading-8">
            2 Years 10 months building AI agents, RAG systems, NLP products, ML inference tools,
            and full-stack AI applications with Python, FastAPI, PyTorch, LangChain, React, and Azure.
          </p>

          <div className="hero-reveal flex flex-wrap gap-4">
            <button onClick={onAsk} className="assistant-hero-button">
              Ask My Portfolio
            </button>
            <a href="#projects" className="secondary-button">
              View AI Projects
            </a>
            <a href={resumePath} download className="ghost-button">
              Download Resume
            </a>
          </div>

          <div className="hero-reveal mt-8 flex flex-wrap gap-3">
            <span className="metric-pill">AI Agents | RAG | NLP</span>
            <span className="metric-pill">2 Years 10 months Experience</span>
            <span className="metric-pill">Open to AI/ML Roles</span>
          </div>
        </div>

        <div className="hero-reveal hero-visual h-[620px] min-h-[520px] overflow-hidden">
          <HeroTelemetryOverlay />
          <Canvas camera={{ position: [0, 0.2, 7.1], fov: 42 }}>
            <ambientLight intensity={0.75} />
            <pointLight position={[4, 4, 4]} intensity={2.4} />
            <pointLight position={[-4, -2, 3]} color="#84cc16" intensity={1.1} />
            <Stars radius={90} depth={45} count={1500} factor={3} fade speed={1} />
            <Float speed={1.6} rotationIntensity={0.75} floatIntensity={1.4}>
              <AIModel />
            </Float>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.65} />
          </Canvas>
        </div>
      </div>
    </section>
  );
}

function HeroTelemetryOverlay() {
  const telemetryTokens = skillGroups.flatMap((group) => group.skills);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="data-rain">
        {telemetryTokens.map((token, index) => (
          <span
            key={`${token}-${index}`}
            style={{
              left: `${4 + (index % 8) * 11.8}%`,
              top: `${-2 - Math.floor(index / 8) * 2.2}rem`,
              animationDelay: `${(index % 10) * 0.34}s`,
              animationDuration: `${5.2 + (index % 6) * 0.7}s`,
            }}
          >
            {token}
          </span>
        ))}
      </div>

      <div className="model-panel left-4 top-4">
        <p>MODEL ROUTER</p>
        <strong>agentic-rag.online</strong>
        <div className="panel-bars">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="model-panel bottom-4 right-4">
        <p>CONTEXT WINDOW</p>
        <strong>retrieval enriched</strong>
        <div className="panel-bars">
          <span />
          <span />
          <span />
        </div>
        <div className="token-stream">
          {["embed", "retrieve", "rerank", "ground", "answer"].map((token) => (
            <span key={token}>{token}</span>
          ))}
        </div>
        <div className="context-lines">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="scan-line" />
    </div>
  );
}

function AIMotionSystems({ onOpenArchitecture }: { onOpenArchitecture: (architecture: Architecture) => void }) {
  return (
    <section id="architecture" className="section-pad relative z-10">
      <div className="mx-auto max-w-7xl">
        <div className="scroll-reveal">
          <SectionTitle title="Systems Lab" subtitle="Project workflows and architecture thinking in one place" />
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {motionSystems.map((system, systemIndex) => (
            <article key={system.title} className="ai-motion-card system-card glow-card rounded-2xl p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">{system.subtitle}</p>
                  <h3 className="mt-2 text-2xl font-bold">{system.title}</h3>
                </div>
                <span className="live-chip">active</span>
              </div>

              <p className="text-muted system-copy mb-5">{system.description}</p>

              <div className="system-lanes">
                {system.steps.map((step, stepIndex) => (
                  <div key={step} className="system-lane">
                    <span>{step}</span>
                    <i className="system-packet" style={{ animationDelay: `${systemIndex * 0.22 + stepIndex * 0.18}s` }} />
                  </div>
                ))}
              </div>

              <div className="system-stack mt-5">
                {system.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="scroll-reveal mt-12">
          <div className="mb-8">
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-400">Conceptual Architectures</p>
            <h3 className="text-3xl font-bold md:text-4xl">Technical building blocks behind the product flows</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {architectures.map((architecture) => (
              <button
                key={architecture.id}
                onClick={() => onOpenArchitecture(architecture)}
                className="glow-card architecture-card rounded-2xl p-6 text-left transition hover:-translate-y-1"
              >
                <h3 className="mb-2 text-2xl font-bold">{architecture.title}</h3>
                <p className="text-muted mb-6 leading-7">{architecture.desc}</p>
                <WorkflowFlow steps={architecture.nodes} compact />
                <div className="mt-5 flex flex-wrap gap-2">
                  {architecture.stack.map((item) => (
                    <span key={item} className="skill-chip rounded-full px-3 py-1 text-xs text-cyan-300">
                      {item}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AIModel() {
  const groupRef = useRef<Group | null>(null);
  const [active, setActive] = useState(false);

  const nodes = useMemo<[number, number, number][]>(
    () => [
      [-1.9, 1.1, 0.2],
      [1.8, 1, -0.25],
      [-1.7, -0.85, 0.3],
      [1.55, -0.95, -0.2],
      [0, 1.95, 0.12],
      [0, -1.85, -0.12],
      [2.25, 0.05, 0.3],
      [-2.25, 0, -0.25],
    ],
    [],
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * (active ? 0.68 : 0.34);
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.16 + state.pointer.y * 0.1;
    groupRef.current.rotation.z = state.pointer.x * 0.08;
  });

  return (
    <group ref={groupRef} onClick={() => setActive((prev) => !prev)}>
      <mesh position={[-0.38, 0.08, 0]}>
        <sphereGeometry args={[0.82, 48, 48]} />
        <meshStandardMaterial color="#22d3ee" emissive="#0891b2" emissiveIntensity={active ? 1.2 : 0.7} wireframe />
      </mesh>
      <mesh position={[0.38, 0.08, 0]}>
        <sphereGeometry args={[0.82, 48, 48]} />
        <meshStandardMaterial color="#84cc16" emissive="#4d7c0f" emissiveIntensity={active ? 1.05 : 0.55} wireframe />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.65, 0.018, 16, 120]} />
        <meshStandardMaterial color="#22d3ee" emissive="#0284c7" emissiveIntensity={0.85} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[2.08, 0.016, 16, 120]} />
        <meshStandardMaterial color="#84cc16" emissive="#65a30d" emissiveIntensity={0.75} />
      </mesh>
      <mesh rotation={[0.78, 0.4, 0.2]}>
        <torusGeometry args={[2.45, 0.012, 16, 120]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.75} />
      </mesh>

      {nodes.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[active ? 0.12 : 0.09, 24, 24]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#22d3ee" : "#84cc16"}
            emissive={index % 2 === 0 ? "#0891b2" : "#4d7c0f"}
            emissiveIntensity={1}
          />
        </mesh>
      ))}

      <Text position={[0, -2.4, 0]} fontSize={0.42} color="#e2e8f0" anchorX="center" anchorY="middle">
        AI Engineer
      </Text>
    </group>
  );
}

function About() {
  return (
    <section id="about" className="section-pad relative z-10">
      <div className="scroll-reveal mx-auto max-w-6xl">
        <SectionTitle title="Senior AI/ML Engineer at Havells India Ltd." subtitle="Who I Am" />
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <article className="profile-card glow-card rounded-2xl p-5">
            <div className="profile-photo-frame">
              <img src={profilePhotoPath} alt="Jatin Shukla professional portrait" className="profile-photo" />
              <span className="profile-scan" />
            </div>
            <div className="mt-5">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-400">Available for AI roles</p>
              <h3 className="mt-2 text-2xl font-bold">Jatin Shukla</h3>
              <p className="text-muted mt-2 leading-7">AI/ML Engineer building RAG Systems, NLP Products, AI Agents, and Full-Stack AI Tools.</p>
            </div>
          </article>

          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1">
            {[
              ["AI/ML Fields", "Machine Learning, Deep Learning, Model Inference, Model Evaluation, Experimentation, and Applied AI Product Engineering."],
              ["RAG / NLP Fields", "RAG Systems, NLP Pipelines, Information Retrieval, Semantic Search, Document Parsing, and Resume-JD Matching."],
              ["Agentic / Product Fields", "AI Agents, Agentic Workflows, FastAPI Backends, React Interfaces, Full-Stack AI Systems, and Research-Led System Design."],
            ].map(([title, desc]) => (
              <article key={title} className="glow-card rounded-2xl p-6">
                <h3 className="mb-3 text-xl font-bold">{title}</h3>
                <p className="text-muted leading-7">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ onOpenProject }: { onOpenProject: (project: Project) => void }) {
  return (
    <section id="projects" className="section-pad relative z-10">
      <div className="mx-auto max-w-7xl">
        <div className="scroll-reveal">
          <SectionTitle title="My Project Case Studies" subtitle="Engineering depth, not just cards" />
        </div>

        <div className="project-track grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <article key={project.id} className="project-card scroll-reveal glow-card overflow-hidden rounded-2xl">
              <ProjectMedia project={project} />
              <div className="p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-cyan-400">
                  {getProjectKind(project)}
                </p>
                <h3 className="mb-3 text-2xl font-bold">{project.shortTitle}</h3>
                <p className="text-muted mb-5 text-sm leading-7">{project.desc}</p>
                <div className="project-card-detail">
                  <p>App Flow</p>
                  <WorkflowFlow steps={project.workflow} compact />
                </div>
                <div className="project-card-detail mt-4">
                  <p>Tech Used</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span key={item} className="skill-chip rounded-full px-3 py-1 text-xs font-medium text-cyan-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={() => onOpenProject(project)} className="primary-button small-button">
                    View Case Study
                  </button>
                <a href={project.link} target="_blank" rel="noreferrer" className="ghost-button small-button">
                  {project.linkLabel ?? "GitHub"}
                </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <div className="project-image group relative h-56 w-full overflow-hidden border-b border-cyan-400/10">
      {project.video && !videoFailed ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
          src={project.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoFailed(true)}
        />
      ) : project.video ? (
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
        />
      ) : project.paperPdf ? (
        <div className="research-media-card">
          <span>PDF</span>
          <strong>Research Paper</strong>
          <p>IoT Digital Twin for smart post-harvest storage monitoring</p>
        </div>
      ) : (
        <div className="project-static-media">
          <img src={project.image} alt={project.title} />
        </div>
      )}
      <div className="preview-badge absolute bottom-4 left-4 rounded-full border border-cyan-400/30 px-3 py-1 text-xs backdrop-blur">
        {getProjectPreviewLabel(project)}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-pad relative z-10">
      <div className="scroll-reveal mx-auto max-w-7xl">
        <SectionTitle title="Skills" subtitle="Core AI, engineering, retrieval, and product stack" />
        <div className="skills-summary glow-card rounded-2xl p-6">
          <p className="text-muted max-w-4xl leading-8">
            Strongest around AI/ML product engineering, RAG systems, NLP workflows, agentic AI applications,
            FastAPI backends, React frontends, retrieval pipelines, and deployment-ready full-stack AI systems.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <article key={group.title} className="skill-card glow-card rounded-2xl p-5">
              <h3 className="mb-4 text-lg font-bold text-cyan-300">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-node skill-chip rounded-full px-3 py-2 text-sm text-cyan-200">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecruiterHub() {
  const [copied, setCopied] = useState(false);
  const recruiterSections: {
    label: string;
    items: string[];
    note?: string;
  }[] = [
    {
      label: "Open For Roles",
      items: ["AI/ML Engineer", "AI Engineer", "Data Scientist", "Agentic AI Engineer", "RAG / NLP Engineer"],
    },
    {
      label: "Experience",
      items: ["Total Experience: 2 Years 10 months", "Current Role: Senior Engineer - AI/ML", "Previous Role: AI/ML Engineer", "Academic Base: M.Tech CSE, NIT Hamirpur"],
    },
    {
      label: "Timeline",
      items: ["2023 - 2025 | M.Tech CSE", "2024 - 2025 | Research Publication", "Jan 2025 - Mar 2026 | AI/ML Engineer", "Mar 2026 - Present | Senior Engineer - AI/ML"],
    },
    {
      label: "Open To",
      items: ["Noida", "Gurugram", "Delhi NCR", "Mumbai", "Bengaluru", "Hyderabad"],
      note: "Open to Hybrid Roles and Remote",
    },
    {
      label: "Strongest Areas",
      items: ["AI Agents and Agentic Workflows", "RAG, NLP, and Semantic Retrieval", "ML Inference Pipelines and FastAPI AI Backends"],
    },
  ];

  async function copyEmail() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <section id="recruiters" className="section-pad relative z-10">
      <div className="scroll-reveal mx-auto max-w-7xl">
        <SectionTitle title="For Recruiters" subtitle="Fast hiring signals" />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glow-card rounded-2xl p-6">
            <div className="recruiter-grid">
              {recruiterSections.map((section) => (
                <div key={section.label} className="info-tile recruiter-tile">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-400">{section.label}</p>
                  <ul className="recruiter-list">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {section.note && <p className="recruiter-note">{section.note}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="glow-card rounded-2xl p-6">
            <div className="grid gap-3">
              <a href={resumePath} download className="primary-button">
                Download Resume
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="secondary-button">
                View GitHub
              </a>
              <a href={linkedInUrl} target="_blank" rel="noreferrer" className="secondary-button">
                View LinkedIn
              </a>
              <a href="#projects" className="ghost-button">
                View AI Projects
              </a>
              <button onClick={copyEmail} className="ghost-button">
                {copied ? "Email Copied" : "Copy Email"}
              </button>
              <a href={`mailto:${email}?subject=Interview%20Opportunity%20for%20AI%20Engineer%20Role`} className="ghost-button">
                Schedule Interview
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GitHubActivity() {
  const [repos, setRepos] = useState<Repo[]>(fallbackRepos);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadRepos() {
      try {
        const response = await fetch("https://api.github.com/users/Jatin29AFK/repos?sort=updated&per_page=6");
        if (!response.ok) return;
        const data = (await response.json()) as Repo[];
        const recentRepos = data.filter((repo) => new Date(repo.updated_at).getFullYear() >= 2026).slice(0, 6);
        if (!cancelled && recentRepos.length) {
          setRepos(recentRepos);
          setLive(true);
        }
      } catch {
        setLive(false);
      }
    }

    loadRepos();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className="section-pad relative z-10">
      <div className="scroll-reveal mx-auto max-w-7xl">
        <SectionTitle title="Recent GitHub Projects" subtitle={live ? "2026 repository activity" : "2026 project snapshots with live fetch fallback"} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="glow-card rounded-2xl p-5 transition hover:-translate-y-1">
              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 className="font-bold text-cyan-300">{repo.name}</h3>
                <span className="text-xs text-muted">{repo.language ?? "Code"}</span>
              </div>
              <p className="text-muted min-h-14 text-sm leading-6">{repo.description ?? "AI engineering repository by Jatin Shukla."}</p>
              <div className="mt-5 flex items-center gap-3 text-xs text-muted">
                <span>Stars {repo.stargazers_count}</span>
                <span>Forks {repo.forks_count}</span>
                <span>Updated {formatDate(repo.updated_at)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section-pad relative z-10">
      <div className="scroll-reveal mx-auto max-w-5xl">
        <SectionTitle title="Timeline" subtitle="Experience and research" />
        <div className="timeline">
          {timeline.map((item) => (
            <article key={item.title} className="timeline-item">
              <span className="timeline-dot" />
              <p className="text-sm font-semibold text-cyan-300">{item.year}</p>
              <h3 className="mt-2 text-2xl font-bold">{item.title}</h3>
              <p className="text-muted mt-3 leading-7">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function openMailFallback(values: typeof form) {
    const name = values.name.trim();
    const fromEmail = values.email.trim();
    const message = values.message.trim();
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${fromEmail}`, "", "Message:", message].join("\n"),
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      website: form.website.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("Please fill all fields.");
      return;
    }

    if (!emailPattern.test(payload.email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = "The contact form is unavailable right now.";

        try {
          const result = (await response.json()) as { error?: string };
          if (result.error) errorMessage = result.error;
        } catch {
          errorMessage = "The contact form is unavailable right now.";
        }

        openMailFallback(payload);
        setStatus(`${errorMessage} Your email app has been opened as a fallback.`);
        setSubmitting(false);
        return;
      }

      setForm({ name: "", email: "", message: "", website: "" });
      setStatus("Message sent successfully. I will get back to you soon.");
    } catch (error) {
      console.error("Contact form error:", error);
      openMailFallback(payload);
      setStatus("Direct form delivery is unavailable right now. Your email app has been opened as a fallback.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="section-pad relative z-10">
      <div className="scroll-reveal mx-auto max-w-5xl">
        <SectionTitle title="Contact" subtitle="Open to Senior AI/ML Engineer, AI/ML Engineer, RAG Engineer, NLP Engineer, and Applied AI roles" />
        <div className="mb-6 flex flex-wrap gap-2">
          {["Senior AI/ML Engineer", "AI/ML Engineer", "RAG Engineer", "NLP Engineer", "Applied AI Engineer"].map((role) => (
            <span key={role} className="concept-pill">{role}</span>
          ))}
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="glow-card rounded-2xl p-8">
            <h3 className="mb-4 text-2xl font-bold">Contact Details</h3>
            <p className="text-muted mb-6 leading-7">
              Interested in AI agents, RAG systems, NLP products, ML inference pipelines, or full-stack AI applications?
              I am open to product engineering, applied research, and production AI roles across AI/ML, RAG, NLP, and full-stack AI delivery.
            </p>
            <div className="space-y-4 text-sm">
              <a href={`tel:${phone.replaceAll("-", "")}`} className="block text-cyan-300 hover:text-cyan-200">
                {phone}
              </a>
              <a href={`mailto:${email}`} className="block text-cyan-300 hover:text-cyan-200">
                {email}
              </a>
              <a href={linkedInUrl} target="_blank" rel="noreferrer" className="block text-cyan-300 hover:text-cyan-200">
                LinkedIn Profile
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="block text-cyan-300 hover:text-cyan-200">
                GitHub Profile
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glow-card rounded-2xl p-8">
            <FormField label="Name" value={form.name} onChange={(value) => setForm((prev) => ({ ...prev, name: value }))} placeholder="Your name" />
            <FormField label="Email" type="email" value={form.email} onChange={(value) => setForm((prev) => ({ ...prev, email: value }))} placeholder="your.email@example.com" />
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
              value={form.website}
              onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
            />
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium">Message</label>
              <textarea
                className="input-field min-h-36 resize-none"
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                placeholder="Write your message..."
              />
            </div>
            <button type="submit" disabled={submitting} className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? "Sending..." : "Send Message"}
            </button>
            <p className="text-muted mt-3 text-xs leading-6">
              If the built-in form is unavailable, the portfolio will open your email app with the message prefilled.
            </p>
            {status && <p className="mt-4 text-sm text-cyan-300">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <input className="input-field" type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </div>
  );
}

function PortfolioChat({
  open,
  setOpen,
  onOpenProject,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onOpenProject: (project: Project) => void;
}) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Portfolio assistant online. Ask me about Jatin's AI agents, code review bot, RAG systems, NLP projects, ML experience, resume, contact, or role fit.",
    },
  ]);
  const [input, setInput] = useState("");

  function submitQuestion(question: string) {
    if (!question.trim()) return;
    const answer = answerPortfolioQuestion(question);
    setMessages((prev) => [...prev, { role: "user", text: question }, { role: "assistant", text: answer }]);
    setInput("");
  }

  return (
    <>
      <button className="chat-fab" onClick={() => setOpen((prev) => !prev)} aria-label="Ask about Jatin">
        <span>Portfolio AI</span>
        Ask Assistant
      </button>
      {open && (
        <aside className="chat-panel">
          <div className="flex items-center justify-between border-b border-cyan-400/15 p-4">
            <div>
              <h2 className="font-bold">Portfolio Assistant</h2>
              <p className="text-xs text-muted">AI-style personal assistant for Jatin's profile</p>
            </div>
            <button onClick={() => setOpen(false)} className="icon-button" aria-label="Close chat">
              X
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chat-bubble ${message.role === "assistant" ? "assistant" : "user"}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 px-4 pb-3">
            {["What AI projects has Jatin built?", "Tell me about AgentFlow", "Tell me about the Code Review Bot", "Does Jatin know RAG?", "How can I contact Jatin?"].map((question) => (
              <button key={question} onClick={() => submitQuestion(question)} className="quick-question">
                {question}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2 border-t border-cyan-400/15 p-4"
            onSubmit={(event) => {
              event.preventDefault();
              submitQuestion(input);
            }}
          >
            <input className="input-field" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about Jatin..." />
            <button className="primary-button small-button" type="submit">
              Send
            </button>
          </form>
          <div className="px-4 pb-4">
            <button onClick={() => onOpenProject(projects[0])} className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              Open AgentFlow case study
            </button>
          </div>
        </aside>
      )}
    </>
  );
}

function CommandPalette({
  onOpenProject,
  onOpenChat,
}: {
  onOpenProject: (project: Project) => void;
  onOpenChat: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const commands: Command[] = useMemo(
    () => [
      { label: "Ask about Jatin", hint: "Open AI portfolio assistant", action: onOpenChat },
      { label: "Download Resume", hint: "Open resume PDF", action: () => window.open(resumePath, "_blank") },
      { label: "Go to Projects", hint: "View AI case studies", action: () => scrollToId("projects") },
      { label: "Go to Recruiters", hint: "Open hiring quick actions", action: () => scrollToId("recruiters") },
      { label: "Go to Architecture Lab", hint: "Open AI system diagrams", action: () => scrollToId("architecture") },
      { label: "Go to Contact", hint: "Open contact form", action: () => scrollToId("contact") },
      { label: "View GitHub", hint: githubUrl, action: () => window.open(githubUrl, "_blank") },
      ...projects.map((project) => ({
        label: `Open ${project.shortTitle}`,
        hint: project.desc,
        action: () => onOpenProject(project),
      })),
    ],
    [onOpenChat, onOpenProject],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredCommands = commands.filter((command) => `${command.label} ${command.hint}`.toLowerCase().includes(query.toLowerCase()));

  function run(command: Command) {
    command.action();
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      <span id="commands" className="sr-only">
        Command palette
      </span>
      {open && (
        <div className="modal-backdrop command-backdrop" onClick={() => setOpen(false)}>
          <div className="command-palette" onClick={(event) => event.stopPropagation()}>
            <input
              autoFocus
              className="command-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects, skills, resume, contact..."
            />
            <div className="max-h-96 overflow-y-auto p-2">
              {filteredCommands.map((command) => (
                <button key={command.label} onClick={() => run(command)} className="command-item">
                  <span className="font-semibold">{command.label}</span>
                  <span className="text-xs text-muted">{command.hint}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEscape(onClose);
  const galleryItems = project.gallery ?? project.screenshots.map((src) => ({ src, title: `${project.shortTitle} preview`, desc: "" }));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <article className="modal-shell" onClick={(event) => event.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-cyan-400/15 bg-inherit p-5 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-400">
              {getProjectKind(project)}
            </p>
            <h2 className="text-2xl font-bold">{project.title}</h2>
          </div>
          <button onClick={onClose} className="icon-button" aria-label="Close case study">
            X
          </button>
        </div>

        <div className="space-y-10 p-5 md:p-8">
          <div className="case-study-hero">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-cyan-400">Project Overview</p>
              <p className="text-muted text-lg leading-8">{project.desc}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="info-tile">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-400">Primary Goal</p>
                <p className="mt-2 font-semibold">{project.problem}</p>
              </div>
              <div className="info-tile">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-400">Why It Matters</p>
                <p className="mt-2 font-semibold">{project.why}</p>
              </div>
            </div>
          </div>

          {project.screenshots.length > 0 && (
            <div>
              <h3 className="case-section-heading">Product Screens</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {galleryItems.map((item) => (
                  <figure key={item.src} className="glow-card overflow-hidden rounded-2xl p-3">
                    <img src={item.src} alt={item.title} className="case-screenshot-image" />
                    <figcaption className="px-1 pt-4">
                      <p className="font-semibold">{item.title}</p>
                      {item.desc && <p className="text-muted mt-2 text-sm leading-7">{item.desc}</p>}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}

          {project.video ? (
            <div>
              <h3 className="case-section-heading">Demo Video</h3>
              <div className="demo-video-shell">
                <video src={project.video} controls muted playsInline preload="metadata" poster={project.image} />
              </div>
            </div>
          ) : project.paperPdf ? (
            <div>
              <h3 className="mb-4 text-xl font-bold">Research Paper</h3>
              <div className="research-paper-card">
                <p>
                  This project is presented as a research-driven IoT and Digital Twin system. The attached
                  paper documents the concept, architecture, and storage-monitoring use case in more formal detail.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href={project.link} target="_blank" rel="noreferrer" className="primary-button small-button">
                    {project.linkLabel ?? "Research Paper Link"}
                  </a>
                  {project.paperPdf && (
                    <a href={project.paperPdf} target="_blank" rel="noreferrer" className="ghost-button small-button">
                      View Attached PDF
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="case-section-heading">Platform Snapshot</h3>
              <div className="platform-snapshot">
                <img src={project.image} alt={`${project.shortTitle} platform preview`} />
                <div>
                  <p>
                    AgentFlow is presented as a product-style multi-agent platform case study. The focus is on a
                    FastAPI + LangGraph workflow with Groq agents, SQLite memory, backend tools, reviewer scoring,
                    human review, workspace isolation, and traceable execution history.
                  </p>
                  <a href={project.link} target="_blank" rel="noreferrer" className="primary-button small-button">
                    GitHub Link
                  </a>
                </div>
              </div>
            </div>
          )}

          <CaseBlock title={project.paperPdf ? "Research Audience" : "Target Users"} items={project.users} />
          <CaseBlock title={project.paperPdf ? "Research System Discussion" : "System Design Discussion"} items={project.systemDesign} />

          <div>
            <h3 className="case-section-heading">{project.paperPdf ? "Research Methodology Flow" : "Detailed App Flow"}</h3>
            <WorkflowFlow steps={project.workflow} />
          </div>

          <CaseBlock title={project.paperPdf ? "Research Architecture Components" : "Architecture Components"} items={project.architecture} />
          <CaseBlock title={project.paperPdf ? "Research Concepts Used" : "Detailed Concepts Used"} items={project.concepts} />

          <TechRationaleBlock items={project.techRationale} />

          <CaseBlock title={project.paperPdf ? "Research Logic" : "Implementation Logic"} items={project.logic} />
          <CaseBlock title={project.paperPdf ? "Research Design Decisions" : "Engineering Decisions"} items={project.decisions} />

          <CaseBlock title={project.paperPdf ? "Research Challenges" : "Challenges Solved"} items={project.challenges} />
          <CaseBlock title={project.paperPdf ? "Research Contribution" : "Business / Product Impact"} items={project.impact} />

          <CaseBlock title={project.paperPdf ? "Future Research Directions" : "Future Improvements"} items={project.improvements} />

          <div className="flex flex-wrap gap-3">
            <a href={project.link} target="_blank" rel="noreferrer" className="primary-button">
              {project.linkLabel ?? "GitHub Link"}
            </a>
            {project.paperPdf && (
              <a href={project.paperPdf} target="_blank" rel="noreferrer" className="secondary-button">
                Attached PDF
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="secondary-button">
                Live Demo
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

function ArchitectureModal({ architecture, onClose }: { architecture: Architecture; onClose: () => void }) {
  useEscape(onClose);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <article className="modal-shell max-w-4xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-cyan-400/15 p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-400">Architecture</p>
            <h2 className="text-2xl font-bold">{architecture.title}</h2>
          </div>
          <button onClick={onClose} className="icon-button" aria-label="Close architecture">
            X
          </button>
        </div>
        <div className="space-y-8 p-6">
          <p className="text-muted text-lg leading-8">{architecture.desc}</p>
          <WorkflowFlow steps={architecture.nodes} />
          <div className="grid gap-3 sm:grid-cols-2">
            {architecture.stack.map((item) => (
              <div key={item} className="info-tile">
                {item}
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

function CaseBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="case-section-heading">{title}</h3>
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item} className="info-tile">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function TechRationaleBlock({
  items,
}: {
  items: {
    name: string;
    why: string;
  }[];
}) {
  return (
    <div>
      <h3 className="case-section-heading">Tech Stack and Why I Used It</h3>
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.name} className="tech-rationale-tile">
            <span>{item.name}</span>
            <p>{item.why}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkflowFlow({ steps, compact = false }: { steps: string[]; compact?: boolean }) {
  return (
    <div className={compact ? "workflow-flow compact" : "workflow-flow"}>
      {steps.map((step, index) => (
        <div key={step} className="workflow-step">
          <span>{step}</span>
          {index < steps.length - 1 && <b aria-hidden="true">-&gt;</b>}
        </div>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-cyan-400/10 px-6 py-10 text-center">
      <p className="text-muted text-sm">
        <span className="font-semibold text-cyan-300">Jatin Shukla</span> | All rights reserved.
      </p>
    </footer>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-12">
      <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-400">{subtitle}</p>
      <h2 className="text-4xl font-bold md:text-5xl">{title}</h2>
    </div>
  );
}

function getProjectKind(project: Project) {
  if (project.kindLabel) return project.kindLabel;
  if (project.paperPdf) return "Research Paper Project";
  if (project.video) return "Demo Video Project";
  return "AI Platform Project";
}

function getProjectPreviewLabel(project: Project) {
  if (project.paperPdf) return "PDF attached";
  if (project.id === "code-review-bot") return "Workflow demo preview";
  if (project.video) return "Demo video preview";
  return "Platform preview";
}

function getQuestionSignals(question: string) {
  const normalized = question.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const tokens = normalized.split(/\s+/).filter(Boolean);
  const compact = tokens.join("");

  return { normalized, tokens, compact };
}

function hasApproxTerm(
  signals: ReturnType<typeof getQuestionSignals>,
  terms: string[],
  maxDistance = 1,
) {
  return terms.some((term) => {
    const normalizedTerm = term.toLowerCase().replace(/[^a-z0-9]+/g, "");

    return (
      signals.normalized.includes(term.toLowerCase()) ||
      signals.compact.includes(normalizedTerm) ||
      signals.tokens.some((token) => editDistance(token, normalizedTerm) <= maxDistance)
    );
  });
}

function editDistance(left: string, right: string) {
  if (left === right) return 0;
  if (!left.length) return right.length;
  if (!right.length) return left.length;

  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  const current = Array(right.length + 1).fill(0);

  for (let i = 1; i <= left.length; i += 1) {
    current[0] = i;
    for (let j = 1; j <= right.length; j += 1) {
      const substitutionCost = left[i - 1] === right[j - 1] ? 0 : 1;
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + substitutionCost,
      );
    }
    previous.splice(0, previous.length, ...current);
  }

  return previous[right.length];
}

function answerPortfolioQuestion(question: string) {
  const q = question.toLowerCase();
  const signals = getQuestionSignals(question);
  const asksCodeReviewBot =
    hasApproxTerm(signals, ["code review bot", "code reviewer", "review bot", "pull request review", "pr review", "agentic ai code review bot"], 2) ||
    ((q.includes("code review") || q.includes("pull request")) && (q.includes("bot") || q.includes("github") || q.includes("review")));
  const asksAgentFlow = hasApproxTerm(signals, ["agentflow", "agent flow", "agentfow", "multi-agent", "multiagent", "agentic", "orchestration"], 2);
  const asksHireFit = hasApproxTerm(signals, ["hirefit", "hire fit"], 1) || q.includes("resume") || q.includes("job");
  const asksNexora = hasApproxTerm(signals, ["nexora"], 1) || q.includes("rag") || q.includes("pdf") || q.includes("bm25") || q.includes("faiss");

  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("mail") ||
    q.includes("phone") ||
    q.includes("mobile") ||
    q.includes("number") ||
    q.includes("no.") ||
    q.includes("call") ||
    q.includes("reach") ||
    q.includes("linkedin")
  ) {
    return `Contact Jatin at ${phone} or ${email}. LinkedIn: ${linkedInUrl}. GitHub: ${githubUrl}.`;
  }

  if (asksCodeReviewBot) {
    return "Agentic AI Code Review Bot is Jatin's multi-agent GitHub pull request reviewer. It fetches live PR diffs, runs specialist review agents for bugs, security, code quality, and missing tests, then produces structured findings, PR risk scoring, comment previews, review history, and human-reviewable autofix patch drafts.";
  }

  if (asksAgentFlow) {
    return "AgentFlow is Jatin's full-stack multi-agent AI orchestration platform built with FastAPI, LangGraph, Groq, React, SQLite, Vite, and Tailwind. It includes supervisor routing, specialist agents, memory, tools, reviewer scoring, human review, workspace isolation, chat playground, and trace history. Live demo: https://agent-flow-five-phi.vercel.app";
  }

  if (asksHireFit) {
    return "HireFit is an applicant-focused NLP resume-JD matcher. It uses resume/JD parsing, NLP preprocessing, TF-IDF, cosine similarity, skill-gap analysis, ATS keyword audit, and Gemini-based explanation to help applicants improve role fit before applying.";
  }

  if (q.includes("project") || q.includes("built") || q.includes("case stud")) {
    return "Jatin's featured AI projects are AgentFlow for multi-agent orchestration, Agentic AI Code Review Bot for GitHub PR review automation, HireFit for NLP resume-JD matching, Nexora for RAG study workflows, and IoT Digital Twin research for smart post-harvest storage.";
  }

  if (asksNexora) {
    return "Yes. Jatin has strong RAG experience through Nexora: PDF/URL ingestion, chunking, FAISS + BM25 retrieval, Cross-Encoder reranking, and LLM-based answers and quiz generation.";
  }

  if (q.includes("ml") || q.includes("machine") || q.includes("pytorch") || q.includes("experience")) {
    return "Jatin has 2.9+ years of total AI/ML experience across Senior Engineer - AI/ML, AI/ML Engineer, M.Tech research, ML inference tools, RAG products, FastAPI backends, React interfaces, AI agents, and IoT Digital Twin research.";
  }

  if (q.includes("role") || q.includes("hire") || q.includes("why") || q.includes("fit")) {
    return "Best-fit roles for Jatin include Senior AI/ML Engineer, AI/ML Engineer, RAG Engineer, NLP Engineer, Applied AI Engineer, and Full-Stack AI Developer roles.";
  }

  if (q.includes("research") || q.includes("digital twin") || q.includes("iot")) {
    return "Jatin's research/project work includes an IoT Digital Twin for smart post-harvest storage using Raspberry Pi sensors, Azure IoT Hub, digital twin modeling, and ML-oriented monitoring.";
  }

  if (q.includes("skill") || q.includes("tech")) {
    return "Jatin's toolkit includes Python, SQL, JavaScript, C, C++, C#, PyTorch, Scikit-learn, ML, DL, NLP, RAG, GenAI, AI agents, LangGraph, LangChain, Groq, multi-agent orchestration, FAISS, BM25, Cross-Encoder reranking, FastAPI, Flask, React, Docker, Azure, Vercel, Render, Git, and GitHub.";
  }

  return "Portfolio summary: Jatin is a Senior AI/ML Engineer focused on AI agents, multi-agent platforms, RAG, NLP, ML inference systems, and full-stack AI products. Try asking about AgentFlow, HireFit, Nexora, skills, experience, roles, or contact.";
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value));
}

function useEscape(callback: () => void) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") callback();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [callback]);
}

export default App;
