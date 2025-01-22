import React from "react";

const ChatBot = () => {
  return (
    <div className="fixed bottom-4 right-4">
      <button className="bg-background_color_dark_green text-white rounded-full p-4 shadow-slate-600 shadow-md hover:text-background_color hover:scale-105 transition hover:shadow-none hover:bg-text_color">
        <span className="text-2xl font-semibold">💬 Chat Bot</span>
      </button>
    </div>
  );
};

export default ChatBot;
