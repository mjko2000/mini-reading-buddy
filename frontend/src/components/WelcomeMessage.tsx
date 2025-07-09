import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../styles/theme";
import { SuggestionButton } from "./SuggestionButton";

interface WelcomeMessageProps {
  onSuggestionClick: (suggestion: string) => void;
}

const Container = styled(motion.div)`
  text-align: center;
  padding: ${theme.spacing["3xl"]};
  background: ${theme.colors.surface};
  border: 3px dashed ${theme.colors.secondary};
  border-radius: ${theme.borderRadius["2xl"]};
  margin: ${theme.spacing.xl} 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const MainTitle = styled.h2`
  font-size: ${theme.typography.fontSize["2xl"]};
  color: ${theme.colors.primary};
  margin: 0 0 ${theme.spacing.md} 0;
  font-weight: ${theme.typography.fontWeight.bold};
`;

const WelcomeText = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.lg} 0;
  line-height: 1.6;
`;

const InstructionsContainer = styled.div`
  background: rgba(168, 230, 207, 0.1);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin: ${theme.spacing.lg} 0;
  border-left: 4px solid ${theme.colors.secondary};
`;

const InstructionsTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.tertiary};
  margin: 0 0 ${theme.spacing.md} 0;
  font-weight: ${theme.typography.fontWeight.semibold};
`;

const InstructionItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.sm};
  text-align: left;
`;

const InstructionIcon = styled.span`
  font-size: ${theme.typography.fontSize.lg};
  margin-right: ${theme.spacing.sm};
  flex-shrink: 0;
`;

const InstructionText = styled.p`
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.text};
  margin: 0;
  line-height: 1.5;
`;

const SuggestionsTitle = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.textSecondary};
  margin: ${theme.spacing.lg} 0 ${theme.spacing.md} 0;
  font-weight: ${theme.typography.fontWeight.medium};
`;

const SuggestionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  onSuggestionClick,
}) => {
  const suggestions = [
    {
      text: "I like cheese and pepperoni on my pizza.",
      emoji: "🍕",
      label: "Talk about food",
    },
    {
      text: "Hello! How are you today?",
      emoji: "👋",
      label: "Say hello",
    },
    {
      text: "The weather is very nice today.",
      emoji: "🌤️",
      label: "Describe weather",
    },
    {
      text: "I enjoy reading books in my free time.",
      emoji: "📚",
      label: "Share hobbies",
    },
  ];

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <MainTitle>👋 Welcome to Cake Buddy!</MainTitle>

      <WelcomeText>
        Your AI English learning companion that makes practicing English fun and
        interactive!
      </WelcomeText>

      <InstructionsContainer>
        <InstructionsTitle>🎯 How to use Cake Buddy:</InstructionsTitle>

        <InstructionItem>
          <InstructionIcon>💬</InstructionIcon>
          <InstructionText>
            <strong>Start a conversation:</strong> Type any English sentence or
            choose from suggestions below
          </InstructionText>
        </InstructionItem>

        <InstructionItem>
          <InstructionIcon>🖱️</InstructionIcon>
          <InstructionText>
            <strong>Learn vocabulary:</strong> Click on any word in my responses
            to see Vietnamese translation
          </InstructionText>
        </InstructionItem>

        <InstructionItem>
          <InstructionIcon>✏️</InstructionIcon>
          <InstructionText>
            <strong>Practice spelling:</strong> Fill in missing letters in the
            interactive exercises
          </InstructionText>
        </InstructionItem>

        <InstructionItem>
          <InstructionIcon>🎉</InstructionIcon>
          <InstructionText>
            <strong>Get feedback:</strong> Receive instant corrections and
            suggestions to improve your English
          </InstructionText>
        </InstructionItem>
      </InstructionsContainer>

      <SuggestionsTitle>Choose a topic to get started:</SuggestionsTitle>

      <SuggestionsContainer>
        {suggestions.map((suggestion, index) => (
          <SuggestionButton
            key={index}
            onClick={() => onSuggestionClick(suggestion.text)}
            emoji={suggestion.emoji}
            label={suggestion.label}
          />
        ))}
      </SuggestionsContainer>
    </Container>
  );
};
