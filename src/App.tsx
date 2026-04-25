const projects = [
  {
    title: "HireFit — AI Resume & Job Matcher",
    desc: "Recruiter-focused AI assistant for resume-JD matching, skill gap analysis, ATS audit, candidate scoring, and safer resume optimization.",
    tech: ["React", "FastAPI", "Gemini", "TF-IDF", "Cosine Similarity"],
    link: "https://github.com/Jatin29AFK/HireFit---AI_Resume_Job_Matcher",
  },
  {
    title: "Nexora — AI Study Assistant",
    desc: "RAG-based study assistant that allows users to query PDFs and URLs, generate quizzes, and learn from uploaded knowledge sources.",
    tech: ["React", "FastAPI", "FAISS", "BM25", "Cross-Encoder"],
    link: "https://github.com/Jatin29AFK/Nexora",
  },
  {
    title: "IoT Digital Twin for Smart Storage",
    desc: "IoT-enabled digital twin system using Raspberry Pi, sensors, Azure IoT Hub, and ML insights for post-harvest storage monitoring.",
    tech: ["Azure Digital Twin", "IoT Hub", "Raspberry Pi", "ML", "Sensors"],
    link: "https://link.springer.com/chapter/10.1007/978-981-96-9979-7_6",
  },
];

const skills = [
  "Python",
  "PyTorch",
  "Machine Learning",
  "RAG",
  "AI Agents",
  "FastAPI",
  "React",
  "TypeScript",
  "FAISS",
  "BM25",
  "LangChain",
  "Azure IoT",
  "C++",
  "SQL",
];

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white ai-grid overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-cyan-400/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="text-xl font-bold tracking-wide">
          <span className="text-cyan-400">Jatin</span> Shukla
        </a>

        <div className="hidden gap-8 text-sm text-slate-300 md:flex">
          <a href="#about" className="hover:text-cyan-400">About</a>
          <a href="#skills" className="hover:text-cyan-400">Skills</a>
          <a href="#projects" className="hover:text-cyan-400">Projects</a>
          <a href="#experience" className="hover:text-cyan-400">Experience</a>
          <a href="#contact" className="hover:text-cyan-400">Contact</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center px-6 pt-24">
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute right-10 top-32 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div>
          <p className="mb-4 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            AI Engineer • RAG Developer • Full-Stack AI Builder
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
            Building intelligent
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI-powered systems
            </span>
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-8 text-slate-300">
            I design and build AI/ML solutions, RAG applications, intelligent automation tools,
            and full-stack products that turn complex data into practical business value.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              View Projects
            </a>

            <a
              href="https://github.com/Jatin29AFK"
              target="_blank"
              className="rounded-full border border-cyan-400/40 px-6 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="glow-card relative rounded-3xl p-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm text-slate-400">AI System Status</span>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              Online
            </span>
          </div>

          <div className="space-y-4">
            <CodeLine label="Input" value="Resume + Job Description + Documents" />
            <CodeLine label="Process" value="RAG + ML Scoring + Semantic Matching" />
            <CodeLine label="Output" value="Insights + Ranking + Recommendations" />
          </div>

          <div className="mt-8 rounded-2xl border border-purple-400/20 bg-purple-400/10 p-5">
            <p className="text-sm text-purple-200">
              Focused on building AI tools that are practical, explainable, and useful for real users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-cyan-400/10 bg-slate-900/80 p-4">
      <p className="text-xs uppercase tracking-widest text-cyan-400">{label}</p>
      <p className="mt-2 text-slate-200">{value}</p>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionTitle title="About Me" subtitle="Who I am" />

        <div className="glow-card rounded-3xl p-8">
          <p className="text-lg leading-8 text-slate-300">
            I am Jatin Shukla, an AI/ML Engineer focused on building real-world AI systems,
            including RAG applications, ML prediction tools, AI resume matching platforms,
            and IoT-based digital twin solutions. My work combines machine learning,
            full-stack development, backend APIs, and deployment-ready engineering.
          </p>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title="Technical Skills" subtitle="My AI engineering toolkit" />

        <div className="flex flex-wrap gap-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm text-cyan-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="Featured AI Projects" subtitle="Practical products I have built" />

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="glow-card rounded-3xl p-6 transition hover:-translate-y-2">
              <h3 className="mb-4 text-xl font-bold text-white">{project.title}</h3>
              <p className="mb-5 text-sm leading-7 text-slate-300">{project.desc}</p>

              <div className="mb-6 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span key={item} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-cyan-300">
                    {item}
                  </span>
                ))}
              </div>

              <a
                href={project.link}
                target="_blank"
                className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
              >
                View Project →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionTitle title="Experience" subtitle="Professional work" />

        <div className="glow-card rounded-3xl p-8">
          <h3 className="text-2xl font-bold">AI/ML Engineer</h3>
          <p className="mt-2 text-cyan-300">Havells India Ltd.</p>

          <ul className="mt-6 space-y-4 text-slate-300">
            <li>• Built ML-based prediction systems for engineering and product design workflows.</li>
            <li>• Developed AI tools, model inference modules, and internal applications for business users.</li>
            <li>• Worked on full-stack AI applications using React, FastAPI, Python, and ML pipelines.</li>
            <li>• Built deployment-ready interfaces for AI/ML models with practical usability in mind.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <SectionTitle title="Let’s Connect" subtitle="Open to AI/ML and full-stack AI opportunities" />

        <p className="mx-auto mb-8 max-w-2xl text-slate-300">
          Interested in AI engineering, RAG systems, ML products, or full-stack AI applications?
          Feel free to connect with me.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:shukla.jeetu2550@gmail.com"
            className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Email Me
          </a>

          <a
            href="https://www.linkedin.com/in/jatin-shukla-401739202/"
            target="_blank"
            className="rounded-full border border-cyan-400/40 px-6 py-3 font-semibold text-cyan-300 hover:bg-cyan-400/10"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
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

export default App;