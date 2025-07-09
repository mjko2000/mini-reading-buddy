import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../styles/theme";

export interface TooltipPosition {
  position: "top" | "bottom" | "left" | "right";
  align: "start" | "center" | "end";
}

export const DetailedTooltip = styled(motion.div)<{
  tooltipPosition: TooltipPosition;
}>`
  position: absolute;
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  border: 2px solid ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  z-index: 10000;
  box-shadow: ${theme.shadows.xl};
  min-width: 280px;
  max-width: 350px;

  ${({ tooltipPosition }) => {
    const { position, align } = tooltipPosition;

    let positionStyles = "";
    let arrowStyles = "";

    // Position the tooltip
    switch (position) {
      case "top":
        positionStyles = `
          bottom: 100%;
          margin-bottom: ${theme.spacing.sm};
        `;
        arrowStyles = `
          &::after {
            content: "";
            position: absolute;
            top: 100%;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid ${theme.colors.surface};
          }
          &::before {
            content: "";
            position: absolute;
            top: 100%;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid ${theme.colors.secondary};
            z-index: -1;
          }
        `;
        break;
      case "bottom":
        positionStyles = `
          top: 100%;
          margin-top: ${theme.spacing.sm};
        `;
        arrowStyles = `
          &::after {
            content: "";
            position: absolute;
            bottom: 100%;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid ${theme.colors.surface};
          }
          &::before {
            content: "";
            position: absolute;
            bottom: 100%;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid ${theme.colors.secondary};
            z-index: -1;
          }
        `;
        break;
      case "left":
        positionStyles = `
          right: 100%;
          margin-right: ${theme.spacing.sm};
          top: 50%;
          transform: translateY(-50%);
        `;
        arrowStyles = `
          &::after {
            content: "";
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 8px solid ${theme.colors.surface};
          }
          &::before {
            content: "";
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-left: 10px solid ${theme.colors.secondary};
            z-index: -1;
          }
        `;
        break;
      case "right":
        positionStyles = `
          left: 100%;
          margin-left: ${theme.spacing.sm};
          top: 50%;
          transform: translateY(-50%);
        `;
        arrowStyles = `
          &::after {
            content: "";
            position: absolute;
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-right: 8px solid ${theme.colors.surface};
          }
          &::before {
            content: "";
            position: absolute;
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid ${theme.colors.secondary};
            z-index: -1;
          }
        `;
        break;
    }

    // Align the tooltip
    let alignStyles = "";
    if (position === "top" || position === "bottom") {
      switch (align) {
        case "start":
          alignStyles = "left: 0;";
          break;
        case "center":
          alignStyles = "left: 50%; transform: translateX(-50%);";
          break;
        case "end":
          alignStyles = "right: 0;";
          break;
      }

      // Arrow alignment for top/bottom
      if (align === "start") {
        arrowStyles = arrowStyles.replace(/left: 50%;/g, "left: 20px;");
        arrowStyles = arrowStyles.replace(
          /transform: translateX\\(-50%\\);?/g,
          ""
        );
      } else if (align === "end") {
        arrowStyles = arrowStyles.replace(/left: 50%;/g, "right: 20px;");
        arrowStyles = arrowStyles.replace(
          /transform: translateX\\(-50%\\);?/g,
          ""
        );
      } else {
        // Center alignment - ensure arrow has proper positioning
        arrowStyles = arrowStyles.replace(
          /(top: 100%;|bottom: 100%;)/g,
          "$1 left: 50%; transform: translateX(-50%);"
        );
      }
    }

    return positionStyles + alignStyles + arrowStyles;
  }}
`;

export const TooltipHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.border};
  padding-bottom: ${theme.spacing.xs};
`;

export const WordTitle = styled.h4`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  margin: 0;
`;

export const WordTTSButton = styled.button`
  background: ${theme.colors.tertiary};
  border: none;
  border-radius: ${theme.borderRadius.full};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primary};
    transform: scale(1.1);
  }

  svg {
    font-size: 14px;
    color: white;
  }
`;

export const PhoneticSection = styled.div`
  margin-bottom: ${theme.spacing.sm};
`;

export const PhoneticText = styled.span`
  font-family: "Courier New", monospace;
  font-size: ${theme.typography.fontSize.md};
  color: ${theme.colors.textSecondary};
  font-weight: ${theme.typography.fontWeight.medium};
`;

export const TranslationsSection = styled.div`
  margin-bottom: ${theme.spacing.sm};
`;

export const SectionTitle = styled.h5`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.tertiary};
  margin: 0 0 ${theme.spacing.xs} 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TranslationItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.xs};
  padding: ${theme.spacing.xs};
  background: rgba(168, 230, 207, 0.1);
  border-radius: ${theme.borderRadius.sm};
`;

export const TranslationType = styled.span`
  font-size: ${theme.typography.fontSize.xs};
  background: ${theme.colors.secondary};
  color: ${theme.colors.text};
  padding: 2px 6px;
  border-radius: ${theme.borderRadius.sm};
  font-weight: ${theme.typography.fontWeight.medium};
`;

export const TranslationText = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text};
  flex: 1;
`;

export const StressSection = styled.div`
  margin-top: ${theme.spacing.sm};
`;

export const StressText = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  font-style: italic;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
  color: ${theme.colors.textSecondary};
`;

export const ErrorMessage = styled.div`
  color: ${theme.colors.error || "#e53e3e"};
  padding: ${theme.spacing.md};
  text-align: center;
  font-size: ${theme.typography.fontSize.sm};
`;
