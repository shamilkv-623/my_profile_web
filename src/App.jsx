import "./App.css";
import profilePic from "./assets/profile.jpg";
import ChatBot from "./ChatBot";

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

function App() {
  return (
    <div className="app">
      {/* BACKGROUND */}
      <div className="blur blur1"></div>
      <div className="blur blur2"></div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">Shamil.</div>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#education">Education</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="simple-hero">
        <div className="profile-container">
          <img src={profilePic} alt="Shamil KV" />
        </div>

        <h1>Shamil K V</h1>

        <p className="hero-subtitle">
          Quantitative Researcher | BS-MS Mathematics |
          Stochastic Control | Portfolio Optimization |
          Agentic AI for Backtesting Automation
        </p>

        <div className="hero-badges">
          <span>Quantitative Researcher</span>
          <span>AI Engineer</span>
          <span>Data Scientist</span>
        </div>

        <div className="hero-socials">
          <a
            href="https://github.com/shamilkv-623"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/shamil-k-v-2164141b4"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>

          <a href="mailto:shamilkveld@gmail.com">
            <FaEnvelope />
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="section-header">
          <span>01</span>
          <h2>About</h2>
        </div>

        <div className="glass-card">
          <p>
            I specialize in quantitative finance at the intersection of stochastic control, machine learning, and systems engineering.
             My research covers options, futures, and equities, with an emphasis on portfolio optimization and market microstructure.
              I design scalable research pipelines and AI-powered backtesting systems for robust strategy evaluation and systematic trading.
          </p>
        </div>
      </section>

      {/* EDUCATION */}
<section className="section" id="education">
  <div className="section-header">
    <span>02</span>
    <h2>Education</h2>
  </div>

  <div className="timeline">

    {/* IISER */}
    <div className="timeline-item">
      <div className="timeline-dot"></div>

      <div className="timeline-content">

        <div className="timeline-top">
          <h3>
            Indian Institute of Science Education and Research, Bhopal
          </h3>

          <span>Completed on June 2025</span>
        </div>

        <h4>
          BS-MS in Mathematics | Minor in Economic Sciences
        </h4>

        <p>
          CGPA: <strong>7.55</strong>

          <br />
          <br />

          <strong>Relevant Coursework:</strong>

          <br />

          Econometrics, Probability Theory and Markov Processes,
          Numerical Analysis, Microeconomics, Macroeconomics,
          Applied Production Analysis.

          <br />
          <br />

          Focused on probability theory, stochastic calculus,
          stochastic differential equations, optimization,
          economic science, and quantitative finance applications.
        </p>

      </div>
    </div>

    {/* IIT MADRAS */}
    <div className="timeline-item">
      <div className="timeline-dot"></div>

      <div className="timeline-content">

        <div className="timeline-top">
          <h3>
            Indian Institute of Technology Madras
          </h3>

          <span>Completed on Apr 2025</span>
        </div>

        <h4>
          Diploma in Data Science
        </h4>

        <p>
          CGPA: <strong>8.09</strong>

          <br />
          <br />

          Worked on machine learning, predictive modeling,
          data analytics, web scraping, business analytics,
          and applied data science projects.
        </p>

      </div>
    </div>

  </div>
</section>

      {/* EXPERIENCE */}
      <section className="section" id="experience">
        <div className="section-header">
          <span>03</span>
          <h2>Experience</h2>
        </div>

        <div className="timeline">

          <div className="timeline-item">
            <div className="timeline-dot"></div>

            <div className="timeline-content">
              <div className="timeline-top">
                <h3>
                  Pashupati Capital Services Private Limited, Mumbai
                </h3>

                <span>2025 — Present</span>
              </div>

              <h4>Quantitative Researcher</h4>

              <p>
                • Performed statistical and time-series analysis
                on NSE equities, options, and futures data.
                <br />
                <br />

                • Designed quantitative backtesting frameworks
                for options strategies including straddles,
                strangles, iron condors, butterflies, and spreads.
                <br />
                <br />

                • Implemented automated paper trading and
                execution-testing using the XTS API.
                <br />
                <br />

                • Designed and deployed live trading strategies
                driven by volatility and open-interest signals.
                <br />
                <br />

                • Built scalable research infrastructure using
                Kafka, InfluxDB, PostgreSQL, real-time market
                ingestion, and multi-timeframe backtesting.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects">
        <div className="section-header">
          <span>04</span>
          <h2>Projects</h2>
        </div>

        <div className="projects-grid">

          <ProjectCard
            tag="Master Thesis • Quant Finance"
            title="Stochastic Optimal Control in Finance"
            description="MS thesis on stochastic optimal control and Merton’s Portfolio Optimization Problem using SDEs, HJB equations, Markov chain approximation, and reinforcement learning."
            skills={[
              "Stochastic Control",
              "HJB",
              "SDEs",
              "Q-Learning",
            ]}
          />

          <ProjectCard
            tag="Quant Finance • Optimization"
            title="Portfolio Optimization: Mean–Variance & Semi–Variance"
            description="Built a robust mean–variance optimization framework with L1-penalized downside risk control and semi-variance formulations for asymmetric risk modeling."
            skills={[
              "Portfolio Optimization",
              "Semi-Variance",
              "Convex Optimization",
              "Risk Modeling",
            ]}
          />

          <ProjectCard
            tag="Machine Learning • Banking"
            title="Bank Telemarketing Success Prediction"
            description="Built ML classification models using Logistic Regression, Random Forest, Bagging, and XGBoost for bank term-deposit prediction."
            skills={[
              "Python",
              "Scikit-learn",
              "XGBoost",
              "EDA",
            ]}
          />

          <ProjectCard
            tag="Business Analytics"
            title="Customer Segmentation & Pricing Strategy"
            description="Analyzed frozen food distribution data to optimize customer segmentation, inventory management, and pricing strategies."
            skills={[
              "Pandas",
              "Excel",
              "Pricing",
              "Analytics",
            ]}
          />

          <ProjectCard
            tag="AI • NLP"
            title="Goodreads Sentiment Classification"
            description="Used ChatGPT API and NLP-based sentiment analysis to study Goodreads reviews, engagement patterns, and reader preferences."
            skills={[
              "ChatGPT API",
              "NLP",
              "Pandas",
              "Matplotlib",
            ]}
          />

          <ProjectCard
            tag="Web Scraping • Analytics"
            title="Election Data Scraping & Voter Trend Analysis"
            description="Built Python-based scraping pipelines for election data collection and voting trend analysis."
            skills={[
              "BeautifulSoup",
              "Requests",
              "Pandas",
              "Seaborn",
            ]}
          />

          <ProjectCard
            tag="Operations Research"
            title="Fuzzy DEA and Its Applications"
            description="Applied fuzzy set theory to Data Envelopment Analysis using α-level methods and fuzzy BCC models."
            skills={[
              "Fuzzy Logic",
              "DEA",
              "Python",
              "R",
            ]}
          />

        </div>
      </section>

   {/* SKILLS */}
<section className="section" id="skills">
  <div className="section-header">
    <span>05</span>
    <h2>Skills</h2>
  </div>

  <div className="skill-groups">

    {/* Programming */}
    <div className="skill-group">
      <h3>Programming</h3>

      <div className="skills">
        <span>Python</span>
        <span>SQL</span>
        <span>C++</span>
      </div>
    </div>

    {/* Quant Finance */}
    <div className="skill-group">
      <h3>Quantitative Finance</h3>

      <div className="skills">
        <span>Quantitative Research</span>
        <span>Portfolio Optimization</span>
        <span>Financial Engineering</span>
        <span>Stochastic Calculus</span>
        <span>Time Series Analysis</span>
        <span>Backtesting</span>
        <span>Market Microstructure</span>
        <span>Options Strategies</span>
        <span>Risk Modeling</span>
      </div>
    </div>

    {/* AI */}
    <div className="skill-group">
      <h3>Machine Learning & AI</h3>

      <div className="skills">
        <span>Machine Learning</span>
        <span>XGBoost</span>
        <span>Scikit-learn</span>
        <span>Deep Learning</span>
        <span>LLMs</span>
        <span>Agentic AI</span>
        <span>LangGraph</span>
        <span>AI Orchestration</span>
        <span>Prompt Engineering</span>
        <span>NLP</span>
      </div>
    </div>

    {/* Data Engineering */}
    <div className="skill-group">
      <h3>Data Engineering</h3>

      <div className="skills">
        <span>Kafka</span>
        <span>InfluxDB</span>
        <span>PostgreSQL</span>
        <span>Real-Time Data Pipelines</span>
      </div>
    </div>

    {/* Analytics */}
    <div className="skill-group">
      <h3>Data Science & Analytics</h3>

      <div className="skills">
        <span>Pandas</span>
        <span>NumPy</span>
        <span>Data Analytics</span>
        <span>Statistical Modeling</span>
        <span>Visualization</span>
      </div>
    </div>

  </div>
</section>

     {/* CONTACT */}
<section className="section" id="contact">

  <div className="contact-grid">

    {/* OPPORTUNITIES BOX */}
    <div className="contact-card">

      <h2>Open to Opportunities.</h2>

      <p className="contact-description">
        I am actively interested in opportunities across:
      </p>

      <div className="opportunity-tags">

        <span>Quantitative Researcher</span>
        <span>Quant Analyst</span>
        <span>Data Scientist</span>
        <span>Machine Learning Engineer</span>
        <span>AI Engineer</span>
        <span>Model Validator</span>
        <span>Product Manager</span>
        <span>Financial Engineer</span>
        <span>Research Engineer</span>
        <span>Systematic Trading</span>

      </div>

    </div>

    {/* CONTACT BOX */}
    <div className="contact-card contact-box">

      <h2>Contact</h2>

      <p className="contact-description">
        Feel free to reach out for collaborations,
        opportunities, research discussions,
        or AI & quantitative finance projects.
      </p>

      <a
        href="mailto:shamilkveld@gmail.com"
        className="contact-email"
      >
        shamilkveld@gmail.com
      </a>

      <div className="contact-socials">

        <a
          href="https://github.com/shamilkv-623"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/shamil-k-v-2164141b4"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>

      </div>

    </div>

  </div>

</section>

      {/* FOOTER */}
      <footer>
        <p>Designed & Built by Shamil K V</p>
      </footer>
      <ChatBot />
    </div>
  );
}

/* PROJECT CARD COMPONENT */
function ProjectCard({ tag, title, description, skills }) {
  return (
    <div className="project-card">
      <div className="project-top">
        <span>{tag}</span>
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="stack">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <a
        href="https://github.com/shamilkv-623"
        target="_blank"
        rel="noreferrer"
        className="project-link"
      >
        View Project <FaArrowRight />
      </a>
    </div>

  );
}

export default App;