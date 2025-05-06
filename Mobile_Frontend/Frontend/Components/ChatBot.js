import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Keyboard,
} from "react-native";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollViewRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleChatbot = () => {
    Keyboard.dismiss();
    const toValue = isOpen ? 0 : 1;
    
    Animated.spring(slideAnim, {
      toValue,
      useNativeDriver: false,
      friction: 8,
    }).start();
    
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://127.0.0.1:5000/get_answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();

      const botMessage = {
        sender: "bot",
        text: data.answer || "Error getting response",
      };
      setMessages((prev) => [...prev, botMessage]);
      
      // Scroll to bottom after message is added
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error contacting server." },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  const chatbotHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 350],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleChatbot}
        style={styles.chatButton}
        activeOpacity={0.8}
      >
        <Text style={styles.chatButtonText}>💬 Chat Bot</Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.chatContainer,
          {
            height: chatbotHeight,
            opacity: slideAnim,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                msg.sender === "user"
                  ? styles.userMessage
                  : styles.botMessage,
              ]}
            >
              <Text
                style={
                  msg.sender === "user"
                    ? styles.userMessageText
                    : styles.botMessageText
                }
              >
                {msg.text}
              </Text>
            </View>
          ))}
          {loading && (
            <View style={styles.botMessage}>
              <Text style={styles.botMessageText}>Typing...</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask a question..."
            placeholderTextColor="#999"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={[styles.sendButton, loading && styles.disabledButton]}
            disabled={loading}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 1000,
  },
  chatButton: {
    backgroundColor: "#555555", // TCDG2
    borderRadius: 25,
    padding: 16,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignSelf: "flex-end",
  },
  chatButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  chatContainer: {
    width: 300,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  messagesContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  messagesContent: {
    padding: 12,
  },
  messageBubble: {
    padding: 8,
    marginVertical: 4,
    borderRadius: 12,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#3B82F6", // blue-500
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#E5E7EB", // gray-200
    alignSelf: "flex-start",
  },
  userMessageText: {
    color: "white",
  },
  botMessageText: {
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#3B82F6", // blue-500
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  disabledButton: {
    backgroundColor: "#9CA3AF", // gray-400
  },
  sendButtonText: {
    color: "white",
    fontWeight: "500",
  },
});

export default Chatbot;