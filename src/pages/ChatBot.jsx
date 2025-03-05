import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  fetchAIResponse,
  clearError,
} from "../redux/slices/chatSlice";

const ChatBot = () => {
  const dispatch = useDispatch();
  const chatEndRef = useRef(null);
  const [input, setInput] = useState("");
  const error = useSelector((state) => state.chat.error);
  const loading = useSelector((state) => state.chat.loading);
  const messages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    dispatch(addMessage({ sender: "user", text: input }));
    dispatch(fetchAIResponse(input));
    setInput("");
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-screen bg-gray-50 shadow-lg rounded-lg">
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-4 text-lg font-semibold rounded-t-lg">
        AI Chatbot
      </header>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500 text-white p-3 text-center flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => dispatch(clearError())} className="underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
        {loading && (
          <p className="text-gray-500 text-center">AI is typing...</p>
        )}
        <div ref={chatEndRef}></div>
      </div>

      <div className="p-3 bg-white flex items-center border-t rounded-b-lg">
        <input
          type="text"
          className="flex-1 p-3 border rounded-full outline-none focus:ring focus:ring-blue-300"
          placeholder="Type a message..."
          value={input}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-3 bg-blue-500 text-white px-5 py-3 rounded-full hover:bg-blue-600 transition disabled:bg-gray-400"
          onClick={handleSendMessage}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
