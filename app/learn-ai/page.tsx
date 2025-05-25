"use client";

import React, { useState, useRef, useEffect } from "react";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const SpanishTutorPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: "user", text: input };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      const aiReplyText =
        data.reply || "I couldn't get a clear response. Can you rephrase?";
      const aiMessage: Message = { sender: "ai", text: aiReplyText };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error sending message to AI API:", error);
      const errorMessage: Message = {
        sender: "ai",
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 40px)",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "20px", color: "#4CAF50" }}
      >
        Language Learning AI Tutor
      </h2>

      {/* Chat Display Area */}
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          border: "1px solid #eee",
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "#f9f9f9",
          borderRadius: "5px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "8px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "10px 15px",
                borderRadius: "20px",
                maxWidth: "80%",
                backgroundColor: msg.sender === "user" ? "#DCF8C6" : "#E0E0E0",
                color: "#333",
                fontSize: "0.95em",
                lineHeight: "1.4",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {isLoading && (
          <div style={{ textAlign: "left", margin: "8px 0" }}>
            <span
              style={{
                display: "inline-block",
                padding: "10px 15px",
                borderRadius: "20px",
                backgroundColor: "#E0E0E0",
                color: "#333",
                fontSize: "0.95em",
              }}
            >
              AI is thinking...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} /> {/* Scroll target */}
      </div>

      {/* Input and Send Button */}
      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          placeholder="Ask me something about Language Learning..."
          style={{
            flexGrow: 1,
            padding: "12px",
            borderRadius: "25px",
            border: "1px solid #ddd",
            fontSize: "1em",
            outline: "none",
          }}
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          style={{
            marginLeft: "10px",
            padding: "12px 20px",
            borderRadius: "25px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
            fontSize: "1em",
            fontWeight: "bold",
            transition: "background-color 0.2s ease-in-out",
          }}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SpanishTutorPage;
