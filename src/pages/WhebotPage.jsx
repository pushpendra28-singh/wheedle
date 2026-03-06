import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import LogosData from "../jsondata/LogosData";

const WhebotPage = ({ isMinimized, setIsMinimized }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showIntroText, setShowIntroText] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Add intro message only once when bot opens for the first time
    if (!isMinimized && messages.length === 0) {
      setMessages([
        {
          type: "bot",
          text: "Hey! I'm WheBot, How can I help you?",
          isComplete: true, // Intro message appears instantly
        },
      ]);
    }
  }, [isMinimized]);

  useEffect(() => {
    if (!isMinimized) return;

    // show after 3 sec
    const showTimer = setTimeout(() => {
      setShowIntroText(true);
    }, 3000);

    // hide after 12 sec (from page load / minimized state)
    const hideTimer = setTimeout(() => {
      setShowIntroText(false);
    }, 12000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isMinimized]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { type: "user", text: userMessage, isComplete: true },
    ]);

    setInput("");
    setIsTyping(true); // Show typing indicator

    try {
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:5000/chat",
        headers: {
          "x-api-key": "MY_SUPER_SECRET_KEY",
          "Content-Type": "application/json",
        },
        data: {
          message: userMessage,
        },
      });

      // FORCE typing to show for 1–2 seconds
      await sleep(1500);

      setIsTyping(false); // Hide typing indicator

      // Add bot response with typewriter effect
      const botResponse = response.data.reply;
      
      // Add empty bot message that will be filled character by character
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: botResponse,
          displayText: "", // What's currently displayed
          isComplete: false, // Will be set to true when typing is done
        },
      ]);

      // Typewriter effect
      typeWriterEffect(botResponse);

    } catch (error) {
      console.error("Chat API error:", error);
      setIsTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Unable to connect to server. Please try again.",
          isComplete: true,
        },
      ]);
    }
  };

  // Typewriter effect function
  const typeWriterEffect = (fullText) => {
    let currentIndex = 0;
    const typingSpeed = 30; // milliseconds per character (adjust for faster/slower typing)

    const intervalId = setInterval(() => {
      currentIndex++;
      
      setMessages((prev) => {
        const updated = [...prev];
        const lastMessage = updated[updated.length - 1];
        
        if (lastMessage && lastMessage.type === "bot" && !lastMessage.isComplete) {
          lastMessage.displayText = fullText.slice(0, currentIndex);
          
          // Mark as complete when all text is typed
          if (currentIndex >= fullText.length) {
            lastMessage.isComplete = true;
            clearInterval(intervalId);
          }
        }
        
        return updated;
      });
    }, typingSpeed);
  };

  // Typing Indicator Component
  const TypingIndicator = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="flex items-start"
      >
        <div className="max-w-[85%] px-4 py-3 rounded-xl bg-[#040010] border border-[#0B2CC3]">
          <div className="flex items-center gap-1">
            <motion.span
              className="w-2 h-2 bg-white rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.span
              className="w-2 h-2 bg-white rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
            <motion.span
              className="w-2 h-2 bg-white rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
          </div>
        </div>
      </motion.div>
    );
  };

  const refreshChat = () => {
    setMessages([]);
    setIsTyping(false);
  };

  /* ---------------- MINIMIZED VIEW ---------------- */
  if (isMinimized) {
    return (
      <AnimatePresence>
        {/* ================= MINIMIZED ICON ================= */}
        {isMinimized && (
          <motion.div
            key="minimized"
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <AnimatePresence>
              {showIntroText && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.6, x: 20 }}
                  className="
                    cursor-pointer
                    px-4 py-2
                    bg-[#040010]
                    border border-[#0B2CC3]
                    rounded-4xl
                    text-white
                    text-[13px]
                    leading-snug
                    max-w-[210px]
                    
                  "
                >
                  Hey! I'm <span className="font-semibold">WheBot</span>,
                  <br /> How can I help you?
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              layoutId="chatbot-container"
              onClick={() => setIsMinimized(false)}
              className="w-10 h-10 rounded-full bg-black border-2 border-[#0B2CC3] mr-2 animate-bounce"
            >
              <img
                // src="/whebot.svg"
                src={LogosData.botLogo}
                alt="WheBot"
                className="w-full h-full object-contain scale-[2.2]"
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const popupVariants = {
    hidden: {
      opacity: 0,
      clipPath: "circle(0% at 100% 100%)",
    },
    visible: {
      opacity: 1,
      clipPath: "circle(150% at 100% 100%)",
      transition: {
        type: "spring",
        stiffness: 140,
        damping: 28,
        mass: 1.2,
      },
    },
    exit: {
      opacity: 0,
      clipPath: "circle(0% at 100% 100%)",
      transition: {
        duration: 0.45,
        ease: "easeInOut",
      },
    },
  };

  // Message animation variants
  const messageVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  /* ---------------- FULL VIEW ---------------- */
  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Gradient Border */}
        <div className="rounded-[26px] p-[1.5px] bg-gradient-to-b from-[#0B2CC3] to-white">
          {/* Main Container - INCREASED HEIGHT */}
          <div
            className="
            w-[92vw] sm:w-[380px]
            h-[75vh] sm:h-[600px]
            max-h-[700px]
            rounded-[26px]
            px-4 pt-4 pb-3
            flex flex-col
            bg-gradient-to-b from-[#040010] to-[#0B2CC3]
            text-white
            transition-all duration-300
            overflow-hidden
          "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between h-[38px] flex-shrink-0">
              {/* LEFT */}
              <div className="flex items-center">
                <img
                  // src="/whebot_lg.svg"
                  src={LogosData.whebot}
                  alt="WheBot"
                  className="w-[200px] h-[200px]"
                />
              </div>

              {/* RIGHT ICONS */}
              <div className="flex items-center gap-4">
                {/* Refresh */}
                <button
                  onClick={refreshChat}
                  title="Refresh chat"
                  className="hover:scale-110 transition"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 12a9 9 0 1 0 3-6.7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 4v5h5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {/* Minimize */}
                <button
                  onClick={() => setIsMinimized(true)}
                  title="Minimize"
                  className="hover:scale-110 transition"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 4l6 6 6-6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* BODY */}
            <>
              {/* CHAT - More space for messages */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 mt-3 mb-3">
                <AnimatePresence mode="popLayout">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`flex flex-col ${
                        msg.type === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <span className="text-[11px] text-white opacity-80 mb-1">
                        {msg.type === "user" ? "You" : "WheBot"}
                      </span>

                      <div
                        className={`max-w-[85%] text-sm px-4 py-2 rounded-xl ${
                          msg.type === "user"
                            ? "bg-[#0B2CC3]"
                            : "bg-[#040010] border border-[#0B2CC3]"
                        }`}
                      >
                        {msg.type === "bot" && !msg.isComplete ? (
                          <>
                            {msg.displayText}
                            <span className="inline-block w-[2px] h-[14px] bg-white ml-[2px] animate-pulse" />
                          </>
                        ) : (
                          msg.text
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex flex-col items-start">
                      <span className="text-[11px] text-white opacity-80 mb-1">
                        WheBot
                      </span>
                      <TypingIndicator />
                    </div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* INPUT */}
              <div className="mt-auto flex-shrink-0">
                <div className="flex items-center gap-2 border border-white rounded-[12px] px-4 py-2 bg-[#040010]">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="bg-transparent outline-none flex-1 text-sm placeholder:text-white/60"
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button
                    onClick={sendMessage}
                    className="w-8 h-8 rounded-full bg-[#0B2CC3] flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 19V5M5 12l7-7 7 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* FOOTER */}
              <div className="text-center text-xs mt-2 text-white flex-shrink-0">
                Powered by <span className="font-semibold">Wheedle</span>{" "}
                Technologies
              </div>
            </>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WhebotPage;