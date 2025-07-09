import React, { useState, useEffect, useRef, memo } from "react";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import { type WordDetails } from "../services/apiService";
import {
  DetailedTooltip,
  TooltipHeader,
  WordTitle,
  WordTTSButton,
  PhoneticSection,
  PhoneticText,
  TranslationsSection,
  SectionTitle,
  TranslationItem,
  TranslationType,
  TranslationText,
  StressSection,
  StressText,
  LoadingSpinner,
  ErrorMessage,
  type TooltipPosition,
} from "./WordTooltipStyle";

interface WordTooltipProps {
  word: string;
  onWordTTS: (word: string) => void;
  wordDetails?: WordDetails | null;
  loading?: boolean;
  error?: string | null;
}

export const WordTooltip: React.FC<WordTooltipProps> = memo(
  ({
    word: _word,
    onWordTTS,
    wordDetails = null,
    loading = false,
    error = null,
  }) => {
    const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
      position: "bottom",
      align: "center",
    });
    const tooltipRef = useRef<HTMLDivElement>(null);

    const calculatePosition = (): TooltipPosition => {
      if (!tooltipRef.current) {
        return { position: "bottom", align: "center" };
      }

      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      let position: TooltipPosition["position"] = "bottom";
      let align: TooltipPosition["align"] = "center";

      // Check vertical space - tooltip is positioned fixed, so we check against window
      const spaceAbove = rect.top;
      const spaceBelow = viewport.height - rect.bottom;
      const tooltipHeight = rect.height || 300;

      if (spaceAbove >= tooltipHeight && spaceAbove >= spaceBelow) {
        position = "top";
      } else if (spaceBelow >= tooltipHeight) {
        position = "bottom";
      } else {
        // Force bottom if no good options
        position = "bottom";
      }

      // Check horizontal alignment
      const tooltipWidth = rect.width || 350;
      const tooltipCenter = rect.left + tooltipWidth / 2;

      if (tooltipCenter < 20) {
        align = "start";
      } else if (tooltipCenter > viewport.width - 20) {
        align = "end";
      } else {
        align = "center";
      }

      return { position, align };
    };

    useEffect(() => {
      // Calculate position after component mounts
      const timer = setTimeout(() => {
        setTooltipPosition(calculatePosition());
      }, 10);
      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      // Recalculate position on window resize
      const handleResize = () => {
        setTooltipPosition(calculatePosition());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <DetailedTooltip
        ref={tooltipRef}
        tooltipPosition={tooltipPosition}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        transition={{ duration: 0.3 }}
      >
        {loading ? (
          <LoadingSpinner>Loading...</LoadingSpinner>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : wordDetails ? (
          <>
            <TooltipHeader>
              <WordTitle>{wordDetails.word}</WordTitle>
              <WordTTSButton
                onClick={(e) => {
                  e.stopPropagation();
                  onWordTTS(wordDetails.word);
                }}
                title="Pronounce word"
              >
                <VolumeUpOutlinedIcon />
              </WordTTSButton>
            </TooltipHeader>

            <PhoneticSection>
              <SectionTitle>Pronunciation</SectionTitle>
              <PhoneticText>{wordDetails.phonetic}</PhoneticText>
            </PhoneticSection>

            <TranslationsSection>
              <SectionTitle>Translations</SectionTitle>
              {wordDetails.translations.map(
                (translation: any, index: number) => (
                  <TranslationItem key={index}>
                    <TranslationType>{translation.type}</TranslationType>
                    <TranslationText>{translation.text}</TranslationText>
                  </TranslationItem>
                )
              )}
            </TranslationsSection>

            <StressSection>
              <SectionTitle>Word Stress</SectionTitle>
              <StressText>{wordDetails.stress}</StressText>
            </StressSection>
          </>
        ) : (
          <ErrorMessage>No word details available</ErrorMessage>
        )}
      </DetailedTooltip>
    );
  }
);
