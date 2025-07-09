import { useState } from "react";
import styled from "styled-components";
import { theme } from "./styles/theme";
import {
  ChatMessage,
  ChatInput,
  InteractiveQuestion,
  WelcomeMessage,
} from "./components";
import { ApiService } from "./services/apiService";
import type { Message, ChatState } from "./types";
import "./App.css";

// Main App Container with retro styling
const AppContainer = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background: ${theme.colors.background};
  font-family: ${theme.typography.fontFamily};
  color: ${theme.colors.text};
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: ${theme.colors.surface};
  border-bottom: 3px solid ${theme.colors.secondary};
  padding: ${theme.spacing.lg};
  text-align: center;
  box-shadow: ${theme.shadows.md};
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSize["3xl"]};
  color: ${theme.colors.primary};
  margin: 0 0 ${theme.spacing.sm} 0;
  font-weight: ${theme.typography.fontWeight.bold};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.textSecondary};
  margin: 0;
  font-style: italic;
`;

const ChatContainer = styled.div`
  flex: 1;
  width: 100%;
  margin: 0;
  padding: 0 ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  overflow: visible;

  @media (max-width: 768px) {
    padding: 0 ${theme.spacing.md};
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow: visible;
  padding: ${theme.spacing.lg} 0;
  min-height: 400px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const AIResponseWithQuestions = styled.div`
  margin-top: ${theme.spacing.md};
`;

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isTyping: false,
  });
  const [conversationId, setConversationId] = useState<string>("");

  const addMessage = (
    content: string,
    isUser: boolean,
    options?: Partial<Message>
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date(),
      showClickableWords: !isUser,
      ...options,
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  };

  const handleSendMessage = async (message: string) => {
    // Add user message
    addMessage(message, true, { showClickableWords: false });

    // Show AI typing
    setChatState((prev) => ({ ...prev, isTyping: true }));

    try {
      // Call backend API
      const { response: aiResponse, conversationId: newConversationId } =
        await ApiService.sendChatMessage(message, conversationId);

      // Update conversation ID
      setConversationId(newConversationId);

      // Extract answers from questions
      const questions = aiResponse.questions.map((q: string) => ({
        question: q,
        answer: extractAnswer(q),
        options: [],
      }));

      // Add AI response
      addMessage(aiResponse.content, false, {
        showClickableWords: true,
        questions,
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      // Add error message
      addMessage(
        "Sorry, I'm having trouble responding right now. Please try again.",
        false,
        {
          showClickableWords: false,
        }
      );
    } finally {
      setChatState((prev) => ({ ...prev, isTyping: false }));
    }
  };

  const extractAnswer = (questionWithBraces: string): string => {
    const match = questionWithBraces.match(/\{([^}]+)\}/);
    return match ? match[1] : "";
  };

  const handleSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const renderMessageContent = (message: Message) => {
    const content = (
      <ChatMessage
        content={message.content}
        isUser={message.isUser}
        showClickableWords={message.showClickableWords}
      />
    );

    if (!message.isUser && message.questions) {
      return (
        <div>
          {content}
          <AIResponseWithQuestions>
            {message.questions.map((question, index) => (
              <InteractiveQuestion
                key={`${message.id}-question-${index}`}
                question={question.question}
                onAnswerSubmit={(answer, isCorrect) => {
                  console.log("Answer submitted:", answer, isCorrect);
                }}
              />
            ))}
          </AIResponseWithQuestions>
        </div>
      );
    }

    return content;
  };

  return (
    <AppContainer>
      <Header>
        <Title>🍰 Cake Buddy</Title>
        <Subtitle>Your AI English Learning Companion</Subtitle>
      </Header>

      <ChatContainer>
        <MessagesContainer>
          {chatState.messages.length === 0 ? (
            <WelcomeMessage onSuggestionClick={handleSuggestion} />
          ) : (
            <>
              {chatState.messages.map((message) => (
                <div key={message.id}>{renderMessageContent(message)}</div>
              ))}

              {chatState.isTyping && (
                <ChatMessage
                  content="🍰 Cake Buddy is typing..."
                  isUser={false}
                  showClickableWords={false}
                />
              )}
            </>
          )}
        </MessagesContainer>

        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={chatState.isTyping}
        />
      </ChatContainer>
    </AppContainer>
  );
}

export default App;
