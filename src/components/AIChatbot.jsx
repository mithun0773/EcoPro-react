// src/components/AIChatbot.jsx - WITH REAL API
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader } from "lucide-react";

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI economic analyst powered by GPT-4. Ask me anything about GDP, inflation, population trends, forecasts, or economic policies!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState(
    localStorage.getItem("openai_api_key") || "",
  );
  const [showKeyInput, setShowKeyInput] = useState(
    !localStorage.getItem("openai_api_key"),
  );
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveApiKey = () => {
    localStorage.setItem("openai_api_key", apiKey);
    setShowKeyInput(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!apiKey) {
      setShowKeyInput(true);
      return;
    }

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Call OpenAI API
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content: `You are an expert economic analyst assistant for EcoPro, an AI-powered economic intelligence platform. You have deep knowledge of:
- Global GDP trends, growth rates, and forecasts
- Inflation patterns and monetary policy
- Population dynamics and demographics
- Employment statistics
- Economic indicators and their relationships
- Forecasting methodologies (linear regression, exponential smoothing)

Provide accurate, concise, data-driven responses. When discussing specific countries or years, reference the data from 1960-2023. Use percentage values and concrete numbers when possible. Be helpful and professional.`,
              },
              ...messages,
              userMessage,
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage = {
        role: "assistant",
        content: data.choices[0].message.content,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("OpenAI API Error:", error);

      const errorMessage = {
        role: "assistant",
        content: error.message.includes("401")
          ? "❌ Invalid API key. Please check your OpenAI API key and try again."
          : error.message.includes("429")
            ? "⚠️ Rate limit exceeded. Please wait a moment and try again."
            : `❌ Error: ${error.message}. Using demo mode with simulated responses.`,
      };

      setMessages((prev) => [...prev, errorMessage]);

      // Fallback to demo responses
      if (!error.message.includes("401")) {
        setTimeout(() => {
          const demoResponses = [
            "India's GDP in 2023 was approximately $3.7 trillion, growing at 7.2% annually. This makes India the 5th largest economy globally, projected to become the 3rd largest by 2027.",
            "Global inflation has been trending downward from 8.7% in 2022 to 6.9% in 2023. Developed economies like the US (3.4%) and EU (5.4%) are seeing faster disinflation compared to emerging markets.",
            "Based on AI forecasting using hybrid models (60% linear regression + 40% exponential smoothing), global GDP is projected to reach $125 trillion by 2030, with Asia contributing 45% of growth.",
            "Population growth varies: India (0.9%), China (0.1%), USA (0.5%). India surpassed China as the world's most populous nation in April 2023 with 1.428 billion people.",
            "The US Federal Reserve raised interest rates 11 times in 2022-2023 to combat inflation, bringing the federal funds rate to 5.25-5.50%, the highest level since 2001.",
          ];

          const demoMessage = {
            role: "assistant",
            content:
              demoResponses[Math.floor(Math.random() * demoResponses.length)],
          };

          setMessages((prev) => [...prev, demoMessage]);
        }, 1000);
      }
    } finally {
      setIsTyping(false);
    }
  };

  if (showKeyInput) {
    return (
      <div style={styles.chatbot}>
        <div style={styles.header}>
          <Bot size={24} color="#3b82f6" />
          <div>
            <h3 style={styles.headerTitle}>Setup Required</h3>
            <p style={styles.headerSubtitle}>
              Enter your OpenAI API key to enable AI chat
            </p>
          </div>
        </div>

        <div style={styles.keySetup}>
          <p style={styles.keyInfo}>
            Get your API key from{" "}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              OpenAI Platform
            </a>
          </p>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            style={styles.keyInput}
          />
          <button onClick={saveApiKey} style={styles.saveButton}>
            Save & Continue
          </button>
          <p style={styles.disclaimer}>
            Your API key is stored locally and never sent to our servers.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.chatbot}>
      <div style={styles.header}>
        <Bot size={24} color="#3b82f6" />
        <div style={{ flex: 1 }}>
          <h3 style={styles.headerTitle}>AI Economic Assistant</h3>
          <p style={styles.headerSubtitle}>Powered by GPT-4</p>
        </div>
        <button
          onClick={() => setShowKeyInput(true)}
          style={styles.settingsButton}
          title="Change API Key"
        >
          ⚙️
        </button>
      </div>

      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              ...(msg.role === "user" ? styles.userMessage : styles.aiMessage),
            }}
          >
            <div style={styles.messageIcon}>
              {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div style={styles.messageContent}>{msg.content}</div>
          </div>
        ))}

        {isTyping && (
          <div style={{ ...styles.message, ...styles.aiMessage }}>
            <div style={styles.messageIcon}>
              <Bot size={16} />
            </div>
            <div style={styles.typing}>
              <Loader
                size={20}
                style={{ animation: "spin 1s linear infinite" }}
              />
              <span>Analyzing with AI...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.quickQuestions}>
        <button
          onClick={() => setInput("What is India's current GDP growth rate?")}
          style={styles.quickButton}
        >
          India's GDP growth?
        </button>
        <button
          onClick={() => setInput("Compare inflation in US vs EU")}
          style={styles.quickButton}
        >
          US vs EU inflation
        </button>
        <button
          onClick={() => setInput("What will global GDP be in 2030?")}
          style={styles.quickButton}
        >
          2030 forecast
        </button>
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about GDP, inflation, forecasts..."
          style={styles.input}
        />
        <button
          onClick={handleSend}
          style={styles.sendButton}
          disabled={isTyping}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatbot: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: "650px",
    maxWidth: "500px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "20px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "#fff",
  },
  headerTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    margin: 0,
  },
  headerSubtitle: {
    fontSize: "0.85rem",
    margin: 0,
    opacity: 0.9,
  },
  settingsButton: {
    background: "rgba(255,255,255,0.2)",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  keySetup: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  keyInfo: {
    fontSize: "0.9rem",
    color: "#64748b",
    margin: 0,
  },
  link: {
    color: "#3b82f6",
    textDecoration: "none",
  },
  keyInput: {
    padding: "12px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontFamily: "monospace",
  },
  saveButton: {
    padding: "12px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
  disclaimer: {
    fontSize: "0.75rem",
    color: "#94a3b8",
    margin: 0,
    textAlign: "center",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  message: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  },
  userMessage: {
    flexDirection: "row-reverse",
  },
  aiMessage: {
    flexDirection: "row",
  },
  messageIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  messageContent: {
    padding: "12px 16px",
    borderRadius: "12px",
    background: "#f8fafc",
    maxWidth: "70%",
    fontSize: "0.95rem",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap",
  },
  typing: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    padding: "12px 16px",
    background: "#f8fafc",
    borderRadius: "12px",
    color: "#64748b",
  },
  quickQuestions: {
    display: "flex",
    gap: "8px",
    padding: "10px 20px",
    overflowX: "auto",
    borderTop: "1px solid #e2e8f0",
  },
  quickButton: {
    padding: "8px 14px",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "500",
    color: "#64748b",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  inputContainer: {
    display: "flex",
    gap: "12px",
    padding: "20px",
    borderTop: "1px solid #e2e8f0",
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "0.95rem",
    outline: "none",
  },
  sendButton: {
    padding: "12px 16px",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default AIChatbot;
