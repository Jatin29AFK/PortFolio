import { profile } from "./profile.ts";

type ProjectInfo = {
  id: string;
  title: string;
  desc: string;
  tech: string[];
  workflow: string[];
  impact: string[];
  link: string;
  live?: string;
};

type TimelineEntry = { year: string; title: string; desc: string; details?: string[] };
type Knowledge = {
  projects: ProjectInfo[];
  skills: { title: string; skills: string[] }[];
  timeline: TimelineEntry[];
};

export type AssistantAnswer = {
  text: string;
  topic: string;
  links?: { label: string; href: string }[];
};

const aliases: Record<string, string[]> = {
  agentflow: ["agentflow", "agent flow", "agentfow"],
  "code-review-bot": ["code review", "code reviewer", "review bot", "pr review", "pull request"],
  "refundpilot": ["refundcopilot", "refundpilot", "refund copilot", "refund pilot", "refund"],
  "market-insight-ai": ["market insight", "stock", "yfinance"],
  hirefit: ["hirefit", "hire fit", "resume matcher", "resume matching", "resume jd", "jd matching", "ats"],
  nexora: ["nexora"],
  "digital-twin": ["digital twin", "iot", "research publication"],
};

export function answerPortfolioQuestion(question: string, knowledge: Knowledge, previousTopic?: string): AssistantAnswer {
  const q = question.toLowerCase().replace(/[^a-z0-9+]+/g, " ").trim();
  const has = (...terms: string[]) => terms.some((term) => (` ${q} `).includes(` ${term} `));
  const detailed = has("full", "all", "detail", "details", "more", "explain", "how", "achievements", "impact", "results", "stack", "technologies", "workflow");
  const followup = /^(tell me more|more|more details|details|go on|how does it work|what about (its |the )?(stack|tech stack|impact|workflow)|explain (it|more)|show me more)$/.test(q);
  const explicitProject = knowledge.projects.find((project) => {
    const names = aliases[project.id] ?? [project.title.toLowerCase().split(" - ")[0]];
    return names.some((name) => has(name));
  });
  let topic = explicitProject ? `project:${explicitProject.id}` : "";

  // Specific subjects win over generic words such as "resume", "AI", and "role".
  if (!topic) {
    if (has("interview", "schedule", "contact", "email", "phone", "mobile", "reach", "linkedin", "call")) topic = "contact";
    else if (has("resume", "cv", "download resume")) topic = "resume";
    else if (has("jb", "emporium", "current", "currently", "latest role", "employer", "where does he work", "where do you work", "where does jatin work")) topic = "current";
    else if (has("havells", "previous job", "previous role", "past experience")) topic = "havells";
    else if (has("achievement", "achievements", "impact", "results", "metrics")) topic = "achievements";
    else if (has("location", "based", "live", "city", "gurugram", "noida", "remote", "relocate", "relocation")) topic = "location";
    else if (has("education", "degree", "m tech", "mtech", "b tech", "btech", "cgpa", "nit", "iet")) topic = "education";
    else if (has("aws")) topic = "aws";
    else if (has("mlops", "deployment", "docker", "kubernetes", "serving", "monitoring", "ci cd", "inference")) topic = "mlops";
    else if (has("bigquery", "sql", "data", "etl", "elt", "cloud", "azure", "gcp")) topic = "data";
    else if (has("marketpulse", "market pulse", "copilot studio", "power automate", "sharepoint", "automation")) topic = "automation";
    else if (has("rag", "retrieval", "faiss", "bm25")) topic = "rag";
    else if (has("agent", "agents", "agentic", "multi agent", "langgraph", "langchain")) topic = "agents";
    else if (has("project", "projects", "built", "case studies")) topic = "projects";
    else if (has("skill", "skills", "tech", "technologies", "stack", "python", "pytorch", "tensorflow", "machine learning", "ml", "llm")) topic = "skills";
    else if (has("experience", "years", "career", "timeline", "work history")) topic = "experience";
    else if (has("role", "roles", "hire", "fit", "why hire", "strengths")) topic = "fit";
    else if (has("hello", "hi", "hey", "about", "who is jatin", "summary")) topic = "summary";
  }
  if (followup && previousTopic) topic = previousTopic;
  const answer = (text: string, links?: AssistantAnswer["links"]): AssistantAnswer => ({ text, topic, links });
  const section = (label: string, id: string) => [{ label, href: `#${id}` }];

  if (topic.startsWith("project:")) {
    const project = knowledge.projects.find((item) => item.id === topic.slice(8));
    if (project) {
      const detail = has("stack", "technologies", "tech") ? `Stack: ${project.tech.join(", ")}.`
        : has("impact", "results") ? project.impact.join(" ")
        : `Workflow: ${project.workflow.join(" → ")}.`;
      return answer(`${project.title}: ${project.desc}${detailed ? `\n\n${detail}` : ""}`, [
        { label: "View case study", href: `project:${project.id}` },
        { label: "GitHub", href: project.link },
        ...(project.live ? [{ label: "Live demo", href: project.live }] : []),
      ]);
    }
  }
  switch (topic) {
    case "current":
      return answer(`${profile.currentRole} at ${profile.employer} · ${profile.currentPeriod} · ${profile.location}.\n\n${profile.currentSummary}${detailed ? `\n\n${profile.currentDetails.join("\n\n")}` : ""}`, section("View experience", "experience"));
    case "havells": {
      const roles = knowledge.timeline.filter((item) => item.title.includes("Havells"));
      return answer(roles.map((role) => `${role.title} · ${role.year}\n${role.desc}${detailed ? `\n${role.details?.join("\n") ?? ""}` : ""}`).join("\n\n"), section("View experience", "experience"));
    }
    case "achievements":
      return answer(`At Havells, Jatin delivered measurable gains in model accuracy, inference speed, and engineering productivity:\n\n${profile.achievements.join("\n\n")}`, section("View experience", "experience"));
    case "experience":
      return answer(`Jatin has ${profile.experience} of total experience across applied AI/ML and research. He is now ${profile.currentRole} at ${profile.employer}. Previously, he built production ML and GenAI tools at Havells.${detailed ? `\n\n${knowledge.timeline.map((item) => `${item.year} | ${item.title}`).join("\n")}` : ""}`, section("Explore the timeline", "experience"));
    case "location":
      return answer(`Jatin is based in ${profile.location}. He is open to hybrid and remote roles, with Noida, Gurugram, Delhi NCR, Mumbai, Bengaluru, and Hyderabad listed as preferred locations.`, section("Recruiter overview", "recruiters"));
    case "resume":
      return answer(`Download Jatin's latest resume for his ${profile.currentRole} role at ${profile.employer}, previous Havells experience, selected projects, and education.`, [{ label: "Download resume", href: profile.resumePath }]);
    case "contact":
      return answer(`Reach Jatin at ${profile.email} or ${profile.phone}. To request an interview, use the Interview tab in the contact section.`, [{ label: "Contact / interview", href: "#contact" }, { label: "Email Jatin", href: `mailto:${profile.email}` }, { label: "LinkedIn", href: profile.linkedInUrl }]);
    case "education":
      return answer("M.Tech in Computer Science and Engineering, NIT Hamirpur (2023–2025), CGPA 9.15/10. B.Tech in Chemical Engineering, IET Lucknow (2018–2022), CGPA 7.8/10.", section("View timeline", "experience"));
    case "mlops":
      return answer(`Jatin takes models from preparation and evaluation to API serving, Docker deployment, CI/CD, monitoring, and inference optimization. His toolkit includes FastAPI, Flask, Joblib, Azure/GCP, and Kubernetes fundamentals.${detailed ? " At Havells, standardized preprocessing, feature scaling, and model packaging helped reduce PointNet inference latency by 35%. Validation, UAT, fallback flows, and logging supported reliable adoption." : ""}`, section("View skills", "skills"));
    case "data":
      return answer(`Jatin works with Python, SQL, BigQuery, Azure, and GCP, alongside ETL/ELT, data pipelines, validation, and feature engineering. At ${profile.employer}, he builds searchable, traceable outputs from multi-source business data.`, section("View skills", "skills"));
    case "aws":
      return answer("AWS is not listed in the portfolio's current skills. The featured cloud and data stack includes Azure, GCP, and BigQuery.", section("View skills", "skills"));
    case "automation":
      return answer("At Havells, Jatin worked on enterprise automation with Microsoft 365 Copilot Studio, Power Automate, SharePoint, and Teams. MarketPulse covers competitor monitoring, validation, alerts, and reporting.", section("View experience", "experience"));
    case "rag":
      return answer("Jatin builds retrieval workflows using ingestion, chunking, embeddings, FAISS + BM25 hybrid search, and Cross-Encoder reranking. Nexora is his featured RAG project for questions and quizzes grounded in PDFs and URLs.", [{ label: "Explore Nexora", href: "project:nexora" }]);
    case "agents":
      return answer("Jatin builds agent workflows with LangGraph and LangChain, tool routing, memory, reviewer checks, and human approval. Examples include AgentFlow, Agentic AI Code Review Bot, and enterprise AI workflows.", section("Explore AI projects", "projects"));
    case "projects":
      return answer(knowledge.projects.map((project) => project.title).join("\n"), section("Explore case studies", "projects"));
    case "skills":
      return answer(detailed ? knowledge.skills.map((group) => `${group.title}: ${group.skills.join(", ")}`).join("\n\n") : "Core tools: Python, PyTorch, Scikit-learn, FastAPI, LangGraph/LangChain, SQL, BigQuery, Docker, Azure, and GCP. Focus areas: AI agents, RAG, production ML, MLOps, and enterprise automation. Ask for the full skill list for more detail.", section("View all skills", "skills"));
    case "fit":
      return answer(`Jatin combines ${profile.experience} of total experience with hands-on ML delivery, agent workflows, and business-facing AI products. He is open to AI/ML, Agentic AI, RAG/NLP, Applied AI, and MLOps-focused opportunities.`, section("Recruiter overview", "recruiters"));
    case "summary":
      return answer(`Jatin is an AI/ML engineer with ${profile.experience} of total experience, based in ${profile.location}. He is ${profile.currentRole} at ${profile.employer}, building AI and data tools for enterprise workflows. Ask about his experience, achievements, skills, or projects.`, section("About Jatin", "about"));
    default:
      return answer("I don't have that information in Jatin's portfolio. I can help with his current role, Havells experience, achievements, skills, projects, education, or resume.", section("Contact Jatin", "contact"));
  }
}
