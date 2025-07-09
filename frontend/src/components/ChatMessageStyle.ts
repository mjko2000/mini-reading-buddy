import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../styles/theme";

export const MessageContainer = styled(motion.div)<{ isUser: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  margin-bottom: ${theme.spacing.md};
  align-items: flex-start;
`;

export const Avatar = styled.div<{ isUser: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  background: ${(props) =>
    props.isUser ? theme.colors.primary : theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSize.lg};
  margin: ${(props) =>
    props.isUser ? `0 0 0 ${theme.spacing.sm}` : `0 ${theme.spacing.sm} 0 0`};
  flex-shrink: 0;
`;

export const MessageBubble = styled.div<{ isUser: boolean }>`
  background: ${(props) =>
    props.isUser ? theme.colors.primary : theme.colors.surface};
  color: ${(props) => (props.isUser ? "white" : theme.colors.text)};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.xl};
  border: 2px solid
    ${(props) => (props.isUser ? theme.colors.primary : theme.colors.secondary)};
  box-shadow: ${theme.shadows.md};
  position: relative;

  ${(props) =>
    props.isUser
      ? `
    border-bottom-right-radius: ${theme.borderRadius.md};
  `
      : `
    border-bottom-left-radius: ${theme.borderRadius.md};
  `}
`;

export const MessageContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  line-height: 1.6;
`;

export const WordContainer = styled.div<{ isUser: boolean }>`
  position: relative;
  display: inline-block;
`;

export const ClickableWord = styled.span<{
  isClickable: boolean;
  isUser: boolean;
}>`
  cursor: ${(props) => (props.isClickable ? "pointer" : "default")};
  position: relative;
  padding: 2px 1px;
  border-radius: 3px;
  transition: all 0.2s ease;
  display: inline-block;

  ${(props) =>
    props.isClickable &&
    `
    &:hover {
      background: ${
        props.isUser ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 107, 157, 0.15)"
      };
      transform: translateY(-1px);
    }
  `}
`;

export const MessageWrapper = styled.div`
  position: relative;
  max-width: 70%;

  &:hover .tts-button {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const TooltipContainer = styled.div<{ x: number; y: number }>`
  position: fixed;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y - 10}px;
  transform: translateX(-50%);
  z-index: 10001;
  pointer-events: none;

  > div {
    pointer-events: auto;
  }
`;

export const TTSButton = styled(motion.button)<{ isUser: boolean }>`
  position: absolute;
  bottom: -8px;
  right: ${(props) => (props.isUser ? "8px" : "8px")};
  width: 28px;
  height: 28px;
  border: none;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.primary};
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.md};
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 100;

  &:hover {
    background: #ff5a8f;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    font-size: 16px;
  }
`;
