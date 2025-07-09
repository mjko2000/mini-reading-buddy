import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../styles/theme";

interface SuggestionButtonProps {
  onClick: () => void;
  emoji: string;
  label: string;
  disabled?: boolean;
}

const Button = styled(motion.button)`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.xl};
  cursor: pointer;
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.medium};
  margin: ${theme.spacing.xs};
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  box-shadow: ${theme.shadows.md};
  min-width: 160px;
  justify-content: center;

  &:hover:not(:disabled) {
    background: #ff5a8f;
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    min-width: 140px;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

const Emoji = styled.span`
  font-size: ${theme.typography.fontSize.lg};
`;

const Label = styled.span`
  white-space: nowrap;
`;

export const SuggestionButton: React.FC<SuggestionButtonProps> = ({
  onClick,
  emoji,
  label,
  disabled = false,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Emoji>{emoji}</Emoji>
      <Label>{label}</Label>
    </Button>
  );
};
