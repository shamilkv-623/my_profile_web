import { useEffect, useRef, useState } from "react";
import "./ChatBot.css";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [waitingForRole, setWaitingForRole] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        "Hi! I’m Shamil’s AI portfolio assistant. I can explain his experience, suggest relevant projects, navigate the website, or download the right CV.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const cvMap = {
    quant: "/cv/quant.pdf",
    data_science: "/cv/data_science.pdf",
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const classifyCV = (text) => {
    const q = text.toLowerCase();

    const dataScienceKeywords = [
      "data scientist",
      "data science",
      "data analyst",
      "business analyst",
      "analytics",
      "machine learning",
      "ml engineer",
      "predictive modeling",
      "statistics",
      "dashboard",
      "visualization",
      "pandas",
      "sql",
      "python",
    ];

    if (dataScienceKeywords.some((word) => q.includes(word))) {
      return "data_science";
    }

    return "quant";
  };

  const downloadCV = (type) => {
    const link = document.createElement("a");
    link.href = cvMap[type] || cvMap.quant;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navigateTo = (target) => {
    document.querySelector(`#${target}`)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const askAI = async (message) => {
    try {
      const res = await fetch("/.netlify/functions/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error("AI node failed");
      }

      const data = await res.json();

      const validActions = ["none", "navigate", "download_cv", "ask_role"];
      const validTargets = [
        "none",
        "about",
        "education",
        "experience",
        "projects",
        "skills",
        "contact",
        "quant",
        "data_science",
      ];

      if (
        !data.reply ||
        !validActions.includes(data.action) ||
        !validTargets.includes(data.target)
      ) {
        throw new Error("Invalid AI response");
      }

      return data;
    } catch (error) {
      return null;
    }
  };

  const deterministicReply = (text) => {
    const q = text.toLowerCase().trim();

    if (q === "hi" || q === "hello" || q === "hey") {
      return {
        reply:
          "Hi! I’m Shamil’s portfolio assistant. I can help you explore his experience, projects, skills, or download the most relevant CV for a role.",
        action: "none",
        target: "none",
      };
    }

    if (waitingForRole) {
      const cvType = classifyCV(q);

      return {
        reply:
          cvType === "data_science"
            ? "Got it — that sounds like a Data Science or Machine Learning role. I’m downloading the Data Science CV."
            : "Got it — that sounds closest to a Quant, Finance, Research, or Index Development role. I’m downloading the Quant CV.",
        action: "download_cv",
        target: cvType,
      };
    }

    if (q.includes("cv") || q.includes("resume")) {
      const clearDataRole =
        q.includes("data") ||
        q.includes("analytics") ||
        q.includes("machine learning") ||
        q.includes("ml engineer") ||
        q.includes("data scientist") ||
        q.includes("data analyst");

      const clearQuantRole =
        q.includes("quant") ||
        q.includes("finance") ||
        q.includes("trading") ||
        q.includes("index") ||
        q.includes("portfolio") ||
        q.includes("risk") ||
        q.includes("derivatives") ||
        q.includes("options") ||
        q.includes("research");

      if (clearDataRole) {
        return {
          reply:
            "That sounds like a Data Science / ML role. I’m downloading the Data Science CV.",
          action: "download_cv",
          target: "data_science",
        };
      }

      if (clearQuantRole) {
        return {
          reply:
            "That sounds like a Quant / Finance role. I’m downloading the Quant CV.",
          action: "download_cv",
          target: "quant",
        };
      }

      return {
        reply:
          "Sure — which role are you hiring for? You can say Quant Research, Index Development, Systematic Trading, Data Science, or ML Engineer.",
        action: "ask_role",
        target: "none",
      };
    }

    if (q.includes("about") || q.includes("who is shamil")) {
      return {
        reply:
          "Shamil is a Quantitative Researcher with a BS-MS in Mathematics, focused on stochastic control, portfolio optimization, market microstructure, AI, and backtesting systems. I’ll take you to the About section.",
        action: "navigate",
        target: "about",
      };
    }

    if (q.includes("education")) {
      return {
        reply:
          "Shamil has a BS-MS in Mathematics from IISER Bhopal and a Data Science diploma from IIT Madras. I’ll take you to Education.",
        action: "navigate",
        target: "education",
      };
    }

    if (q.includes("experience")) {
      return {
        reply:
          "Shamil works as a Quantitative Researcher at Pashupati Capital Services, focusing on NSE equities, options, futures, backtesting, and real-time research infrastructure.",
        action: "navigate",
        target: "experience",
      };
    }

    if (q.includes("project")) {
      return {
        reply:
          "I’ll show you Shamil’s projects, including stochastic control, portfolio optimization, ML models, NLP, scraping, and analytics work.",
        action: "navigate",
        target: "projects",
      };
    }

    if (q.includes("skill")) {
      return {
        reply:
          "Shamil’s key skills include Python, SQL, quantitative research, portfolio optimization, ML, LLMs, Kafka, PostgreSQL, and data analytics.",
        action: "navigate",
        target: "skills",
      };
    }

    if (q.includes("contact") || q.includes("email") || q.includes("linkedin")) {
      return {
        reply:
          "I’ll take you to the Contact section where you can find email, GitHub, and LinkedIn links.",
        action: "navigate",
        target: "contact",
      };
    }

    return {
      reply:
        "I can help with that. You can ask things like: ‘What projects match a quant role?’, ‘Download CV for data scientist’, ‘Show experience’, or ‘How can I contact Shamil?’",
      action: "none",
      target: "none",
    };
  };

  const handleBotAction = (result) => {
    if (result.action === "ask_role") {
      setWaitingForRole(true);
      return;
    }

    if (result.action === "download_cv") {
      downloadCV(result.target);
      setWaitingForRole(false);
      return;
    }

    if (result.action === "navigate") {
      navigateTo(result.target);
    }
  };

  const sendMessage = async (quickMessage = null) => {
    const messageText = quickMessage || input;

    if (!messageText.trim() || loading) return;

    const userMessage = { from: "user", text: messageText };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    let result = await askAI(messageText);

    if (!result) {
      result = deterministicReply(messageText);
    }

    handleBotAction(result);

    const botMessage = { from: "bot", text: result.reply };

    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  return (
    <>
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        AI
      </button>

      {open && (
        <div className="chatbox">
          <div className="chat-header">
            <div>
              <strong>Portfolio Assistant</strong>
              <p>AI-powered recruiter guide</p>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-msg ${msg.from}`}>
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="chat-msg bot">
                Portfolio Assistant is typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="quick-actions">
            <button onClick={() => sendMessage("download cv")}>
              Download CV
            </button>
            <button onClick={() => sendMessage("quant researcher CV")}>
              Quant CV
            </button>
            <button onClick={() => sendMessage("data scientist CV")}>
              Data Science CV
            </button>
            <button onClick={() => sendMessage("show projects")}>
              Projects
            </button>
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about Shamil, projects, skills, or CV..."
            />
            <button onClick={() => sendMessage()}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;