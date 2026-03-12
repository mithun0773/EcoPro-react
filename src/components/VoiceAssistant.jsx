// src/components/VoiceAssistant.jsx
import React, { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, VolumeX, Activity } from "lucide-react";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [recognition, setRecognition] = useState(null);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);

        if (event.results[current].isFinal) {
          handleVoiceCommand(transcriptText);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    // Initialize Speech Synthesis
    if ("speechSynthesis" in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setTranscript("");
      setResponse("");
      recognition.start();
      setIsListening(true);
    } else {
      alert(
        "❌ Speech recognition not supported in your browser. Please use Chrome or Edge.",
      );
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    let aiResponse = "";

    // GDP queries
    if (lowerCommand.includes("gdp") && lowerCommand.includes("india")) {
      aiResponse =
        "India's GDP in 2023 is $3.7 trillion, growing at 7.2% annually. This makes India the 5th largest economy globally.";
    } else if (lowerCommand.includes("gdp") && lowerCommand.includes("china")) {
      aiResponse =
        "China's GDP in 2023 is $18.5 trillion, with a growth rate of 4.9%. China is the second-largest economy in the world.";
    } else if (
      lowerCommand.includes("gdp") &&
      lowerCommand.includes("united states")
    ) {
      aiResponse =
        "The United States GDP is $26.9 trillion in 2023, growing at 2.1%. The US remains the world's largest economy.";
    }

    // Inflation queries
    else if (lowerCommand.includes("inflation")) {
      if (lowerCommand.includes("india")) {
        aiResponse =
          "India's current inflation rate is 5.4%, down from 7.8% in 2022. The Reserve Bank of India targets 4% inflation.";
      } else if (
        lowerCommand.includes("us") ||
        lowerCommand.includes("united states")
      ) {
        aiResponse =
          "US inflation is at 3.2% as of late 2023, significantly down from the 9.1% peak in June 2022.";
      } else {
        aiResponse =
          "Global inflation has been trending downward from 8.7% in 2022 to 6.9% in 2023.";
      }
    }

    // Population queries
    else if (lowerCommand.includes("population")) {
      if (lowerCommand.includes("india")) {
        aiResponse =
          "India's population is 1.428 billion as of 2023, surpassing China to become the world's most populous country.";
      } else if (lowerCommand.includes("china")) {
        aiResponse =
          "China's population is 1.426 billion, experiencing its first decline in 60 years with a growth rate of 0.1%.";
      } else {
        aiResponse =
          "The global population is approximately 8 billion people, with Asia accounting for 60% of the total.";
      }
    }

    // Forecast queries
    else if (
      lowerCommand.includes("forecast") ||
      lowerCommand.includes("predict")
    ) {
      aiResponse =
        "Based on AI forecasting models, India's GDP is projected to reach $5.8 trillion by 2030, with an average annual growth of 6.5%.";
    }

    // Comparison queries
    else if (lowerCommand.includes("compare")) {
      aiResponse =
        "India and China have similar population sizes, but China's GDP is 5 times larger. However, India's growth rate of 7.2% exceeds China's 4.9%, indicating potential convergence.";
    }

    // Help command
    else if (
      lowerCommand.includes("help") ||
      lowerCommand.includes("what can you do")
    ) {
      aiResponse =
        "I can answer questions about GDP, inflation, population, forecasts, and economic comparisons. Try asking: What is India's GDP? or Compare India and China.";
    }

    // Default response
    else {
      aiResponse = `I heard: "${command}". I can help with GDP, inflation, population data, and forecasts. Try asking about specific countries or economic indicators.`;
    }

    setResponse(aiResponse);

    if (voiceEnabled) {
      speak(aiResponse);
    }
  };

  const speak = (text) => {
    if (speechSynthesis && voiceEnabled) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Activity size={32} color="#8b5cf6" />
        <div>
          <h2 style={styles.title}>Voice-Controlled Data Assistant</h2>
          <p style={styles.subtitle}>
            Ask questions using your voice • Get instant economic insights
          </p>
        </div>
      </div>

      <div style={styles.mainPanel}>
        {/* Microphone Visualizer */}
        <div style={styles.visualizer}>
          <button
            onClick={isListening ? stopListening : startListening}
            style={{
              ...styles.micButton,
              ...(isListening ? styles.micButtonActive : {}),
            }}
          >
            {isListening ? <MicOff size={48} /> : <Mic size={48} />}
          </button>

          {isListening && (
            <div style={styles.pulseRings}>
              <div style={styles.pulseRing}></div>
              <div
                style={{ ...styles.pulseRing, animationDelay: "0.5s" }}
              ></div>
              <div style={{ ...styles.pulseRing, animationDelay: "1s" }}></div>
            </div>
          )}

          <p style={styles.status}>
            {isListening ? "🎤 Listening..." : "Click to speak"}
          </p>
        </div>

        {/* Transcript Display */}
        {transcript && (
          <div style={styles.transcriptBox}>
            <div style={styles.transcriptLabel}>You said:</div>
            <div style={styles.transcriptText}>"{transcript}"</div>
          </div>
        )}

        {/* Response Display */}
        {response && (
          <div style={styles.responseBox}>
            <div style={styles.responseHeader}>
              <div style={styles.responseLabel}>🤖 AI Response</div>
              <button
                onClick={voiceEnabled ? stopSpeaking : () => speak(response)}
                style={styles.speakerButton}
              >
                {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
            <div style={styles.responseText}>{response}</div>
          </div>
        )}

        {/* Voice Toggle */}
        <div style={styles.controls}>
          <label style={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={voiceEnabled}
              onChange={(e) => setVoiceEnabled(e.target.checked)}
              style={styles.checkbox}
            />
            <span>Enable voice responses</span>
          </label>
        </div>
      </div>

      {/* Example Commands */}
      <div style={styles.examples}>
        <h3 style={styles.examplesTitle}>Try saying:</h3>
        <div style={styles.examplesGrid}>
          {[
            "What is India's GDP?",
            "Tell me about inflation in the US",
            "What is China's population?",
            "Forecast India's economy",
            "Compare India and China",
            "What can you help me with?",
          ].map((example, i) => (
            <button
              key={i}
              onClick={() => {
                setTranscript(example);
                handleVoiceCommand(example);
              }}
              style={styles.exampleButton}
            >
              💬 {example}
            </button>
          ))}
        </div>
      </div>

      {/* Browser Compatibility Notice */}
      <div style={styles.notice}>
        <p style={styles.noticeText}>
          🎙️ Works best in Chrome and Edge browsers with microphone permissions
          enabled
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    margin: "40px auto",
    maxWidth: "900px",
    color: "#fff",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "40px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#fff",
    margin: 0,
  },
  subtitle: {
    fontSize: "1rem",
    color: "rgba(255,255,255,0.9)",
    margin: "5px 0 0 0",
  },
  mainPanel: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "40px",
    marginBottom: "30px",
  },
  visualizer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
    position: "relative",
  },
  micButton: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    border: "3px solid rgba(255,255,255,0.4)",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 2,
  },
  micButtonActive: {
    background: "#ef4444",
    borderColor: "#fff",
    transform: "scale(1.1)",
  },
  pulseRings: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
  },
  pulseRing: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "3px solid rgba(255,255,255,0.6)",
    animation: "pulse 2s ease-out infinite",
  },
  status: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#fff",
    margin: 0,
  },
  transcriptBox: {
    padding: "20px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "12px",
    marginBottom: "20px",
  },
  transcriptLabel: {
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.8)",
    marginBottom: "8px",
    fontWeight: "600",
  },
  transcriptText: {
    fontSize: "1.1rem",
    color: "#fff",
    fontStyle: "italic",
  },
  responseBox: {
    padding: "20px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "12px",
    marginBottom: "20px",
  },
  responseHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  responseLabel: {
    fontSize: "0.9rem",
    fontWeight: "700",
    color: "#fff",
  },
  speakerButton: {
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "6px",
    padding: "6px 10px",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  responseText: {
    fontSize: "1.1rem",
    color: "#fff",
    lineHeight: "1.7",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "15px",
  },
  toggleLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "1rem",
    color: "#fff",
    cursor: "pointer",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
  },
  examples: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "25px",
    marginBottom: "20px",
  },
  examplesTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "15px",
  },
  examplesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "10px",
  },
  exampleButton: {
    padding: "12px 16px",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "0.9rem",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.3s",
  },
  notice: {
    padding: "15px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "8px",
    textAlign: "center",
  },
  noticeText: {
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.9)",
    margin: 0,
  },
};

// Add pulse animation
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  try {
    styleSheet.insertRule(
      `
      @keyframes pulse {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(2);
          opacity: 0;
        }
      }
    `,
      styleSheet.cssRules.length,
    );
  } catch (e) {}
}

export default VoiceAssistant;
