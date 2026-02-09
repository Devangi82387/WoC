import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket"; // shared socket instance
import api from "../api/axios";
import {jwtDecode} from "jwt-decode";

import { useNavigate } from "react-router-dom";

import "../style/ChatWindow.css";

const ChatWindow = () => {
  const { bookingId } = useParams();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const navigate = useNavigate();

  // Get current user from JWT
  const token = localStorage.getItem("token");
  let currentUser = { id: null, role: null };
  if (token) {
    const decoded = jwtDecode(token);
    currentUser = { id: decoded.id, role: decoded.role };
  } else {
    alert("You must be logged in to chat");
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch conversation
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const res = await api.get(`/conversations/${bookingId}`);
        setConversation(res.data);

        // load messages if conversation exists
        const msgRes = await api.get(`/messages/${res.data._id}`);
        setMessages(msgRes.data);

        // join socket room
        socket.emit("joinRoom", res.data._id);
      } catch (err) {
        if (err.response?.status === 404) {
          setConversation(null);
          setMessages([]);
        } else {
          console.error(err);
          alert("Error fetching conversation");
        }
      }
    };

    fetchConversation();

    return () => {
      if (conversation?._id) socket.emit("leaveRoom", conversation._id);
    };
  }, [bookingId, conversation?._id]);

  // Listen for incoming messages
  useEffect(() => {
    const handleReceiveMessage = (message) => {
      if (conversation && message.conversationId === conversation._id) {
        // Prevent duplicates
        setMessages((prev) => {
          if (prev.find((msg) => msg._id === message._id)) return prev;
          return [...prev, message];
        });
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, [conversation]);

  // Send message
  const sendMessage = async () => {
    if (!text.trim()) return;

    if (!conversation?._id) {
      alert("Conversation is not ready yet");
      return;
    }

    try {
      const message = {
        conversationId: conversation._id,
        senderId: currentUser.id,
        senderRole: currentUser.role,
        text: text.trim(),
      };

      const msgRes = await api.post("/messages", message);

      // Add message only if not already in state
      setMessages((prev) => {
        if (prev.find((msg) => msg._id === msgRes.data._id)) return prev;
        return [...prev, msgRes.data];
      });

      socket.emit("sendMessage", msgRes.data);
      setText("");
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  // Determine chat partner
  const chatPartnerName =
    currentUser.role === "customer"
      ? conversation?.providerId?.name || "Provider"
      : conversation?.customerId?.firstName || "Customer";

  return (
    <div className="chat-window" style={{ padding: "10px" }}>
      <h2>Chat with {chatPartnerName} <button
          onClick={() => navigate("/")}
               style={{
                padding: "8px 12px",
                cursor: "pointer",
                float: "right"
                }}
              >
              Back to Home
            </button></h2>



      <div
        className="messages"
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
        }}
      >
        {messages.length === 0 && (
          <p style={{ color: "#666" }}>No messages yet. Start the conversation!</p>
        )}
        {messages.map((m, idx) => (
          <div
            key={`${m._id}-${idx}`} // Unique key
            className={`message ${m.senderId === currentUser.id ? "own" : ""}`}
            style={{
              textAlign: m.senderId === currentUser.id ? "right" : "left",
              marginBottom: "5px",
            }}
          >
            <b>{m.senderRole.toUpperCase()}:</b> {m.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input" style={{ display: "flex", gap: "5px" }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "5px" }}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={{ padding: "5px 10px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;