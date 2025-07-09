import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import { theme } from "../styles/theme";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const InputContainer = styled.div`
  position: sticky;
  bottom: 0;
  background: ${theme.colors.background};
  padding: ${theme.spacing.lg};
  border-top: 2px solid ${theme.colors.border};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${theme.spacing.sm};
  max-width: 900px;
  margin: 0 auto;
`;

const TextInput = styled.textarea`
  flex: 1;
  min-height: 50px;
  max-height: 120px;
  padding: ${theme.spacing.md};
  border: 2px solid ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.xl};
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.text};
  background: ${theme.colors.surface};
  resize: none;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.textSecondary};
    font-style: italic;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SendButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.primary};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #ff5a8f;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  placeholder = "Ask Cake Buddy anything about vocabulary and language learning...",
  disabled = false,
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <InputContainer>
      <InputWrapper>
        <TextInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
        />
        <SendButton
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
          <SendIcon />
        </SendButton>
      </InputWrapper>
    </InputContainer>
  );
};
