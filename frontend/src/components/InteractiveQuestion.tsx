import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import CheckIcon from "@mui/icons-material/Check";
import { theme } from "../styles/theme";

interface InteractiveQuestionProps {
  question: string;
  onAnswerSubmit?: (answer: string, isCorrect: boolean) => void;
}

const QuestionContainer = styled.div`
  margin: ${theme.spacing.md} 0;
  padding: ${theme.spacing.md};
  background: rgba(168, 230, 207, 0.1);
  border-radius: ${theme.borderRadius.lg};
  border-left: 4px solid ${theme.colors.secondary};
`;

const QuestionText = styled.p`
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.6;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const InputContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin: 0 ${theme.spacing.xs};
`;

const CharacterInput = styled.input<{ isCorrect?: boolean | null }>`
  width: 30px;
  height: 30px;
  border: 2px solid
    ${(props) =>
      props.isCorrect === true
        ? theme.colors.success
        : props.isCorrect === false
        ? theme.colors.error
        : theme.colors.secondary};
  border-radius: ${theme.borderRadius.md};
  text-align: center;
  font-size: ${theme.typography.fontSize.md};
  font-family: ${theme.typography.fontFamily};
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  transition: all 0.3s ease;
  text-transform: lowercase;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(255, 107, 157, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.textSecondary};
    font-weight: bold;
  }
`;

const CheckButton = styled(motion.button)<{ isCorrect?: boolean | null }>`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  background: ${(props) =>
    props.isCorrect === true
      ? theme.colors.success
      : props.isCorrect === false
      ? theme.colors.error
      : theme.colors.tertiary};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.3s ease;
  margin-left: ${theme.spacing.xs};

  &:hover {
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FeedbackText = styled(motion.span)<{ isCorrect: boolean }>`
  color: ${(props) =>
    props.isCorrect ? theme.colors.success : theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-left: ${theme.spacing.sm};
`;

const WordSpan = styled.span`
  margin: 0 ${theme.spacing.xs};
`;

export const InteractiveQuestion: React.FC<InteractiveQuestionProps> = ({
  question,
  onAnswerSubmit,
}) => {
  // Extract word from {word} format
  const wordMatch = question.match(/\{([^}]+)\}/);
  const correctAnswer = wordMatch ? wordMatch[1].toLowerCase() : "";
  const wordLength = correctAnswer.length;

  // Create unique hash for this question to avoid conflicts with other questions
  const createHash = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  };

  const questionHash = createHash(question);

  const [userAnswers, setUserAnswers] = useState<string[]>(
    new Array(wordLength).fill("")
  );
  const [isChecked, setIsChecked] = useState<boolean | null>(null);

  const handleCharacterChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newAnswers = [...userAnswers];
      newAnswers[index] = value.toLowerCase();
      setUserAnswers(newAnswers);

      // Auto-focus next input
      if (value && index < wordLength - 1) {
        const nextInputKey = `${questionHash}-${index + 1}`;
        const nextInput = document.querySelector(
          `[data-input-key="${nextInputKey}"]`
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !userAnswers[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      const prevInputKey = `${questionHash}-${index - 1}`;
      const prevInput = document.querySelector(
        `[data-input-key="${prevInputKey}"]`
      ) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    } else if (e.key === "Enter") {
      handleCheck();
    }
  };

  const handleCheck = () => {
    const userWord = userAnswers.join("").toLowerCase();
    const isCorrect = userWord === correctAnswer;

    setIsChecked(isCorrect);
    onAnswerSubmit?.(userWord, isCorrect);
  };

  const renderQuestionWithInputs = () => {
    const parts = question.split(/\{[^}]+\}/);

    return (
      <QuestionText>
        <WordSpan>{parts[0]}</WordSpan>
        <InputContainer>
          {Array.from({ length: wordLength }, (_, index) => {
            const inputKey = `${questionHash}-${index}`;
            return (
              <CharacterInput
                key={index}
                data-input-key={inputKey}
                type="text"
                value={userAnswers[index]}
                onChange={(e) => handleCharacterChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                placeholder="_"
                isCorrect={isChecked}
                maxLength={1}
              />
            );
          })}
          <CheckButton
            onClick={handleCheck}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            isCorrect={isChecked}
            disabled={userAnswers.some((char) => !char.trim())}
          >
            <CheckIcon fontSize="inherit" />
          </CheckButton>
        </InputContainer>
        <WordSpan>{parts[1]}</WordSpan>
        {isChecked !== null && (
          <FeedbackText
            isCorrect={isChecked}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isChecked ? "✅ Correct!" : `❌ Correct answer: ${correctAnswer}`}
          </FeedbackText>
        )}
      </QuestionText>
    );
  };

  return <QuestionContainer>{renderQuestionWithInputs()}</QuestionContainer>;
};
