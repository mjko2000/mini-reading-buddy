import React, { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { WordTooltip } from "./WordTooltip";
import { ApiService, type WordDetails } from "../services/apiService";
import {
  MessageContainer,
  Avatar,
  MessageBubble,
  MessageContent,
  WordContainer,
  ClickableWord,
  MessageWrapper,
  TooltipContainer,
  TTSButton,
} from "./ChatMessageStyle";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  showClickableWords?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  isUser,
}) => {
  const [loadingWord, setLoadingWord] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState<string | null>(null);
  const [wordDetails, setWordDetails] = useState<WordDetails | null>(null);
  const [wordError, setWordError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<{ [key: string]: HTMLSpanElement | null }>({});

  const handleWordClick = async (_word: string, cleanWord: string) => {
    if (loadingWord) return; // Prevent clicks while loading

    // If clicking the same word that's already showing, hide it
    if (showTranslation === cleanWord) {
      setShowTranslation(null);
      setTooltipPosition(null);
      setWordDetails(null);
      setWordError(null);
      return;
    }

    // Calculate position for tooltip using window coordinates
    const wordElement = wordRefs.current[cleanWord];
    if (wordElement) {
      const rect = wordElement.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2 - 150,
        y: rect.top,
      });
    }

    setLoadingWord(cleanWord);
    setWordError(null);
    setShowTranslation(cleanWord);

    try {
      const details = await ApiService.getWordDetails(cleanWord);
      setWordDetails(details);
    } catch (err) {
      console.error("Failed to fetch word details:", err);
      setWordError("Failed to load word details");
    } finally {
      setLoadingWord(null);
    }
  };

  // Handle click outside and escape key to close tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showTranslation &&
        messageRef.current &&
        !messageRef.current.contains(event.target as Node)
      ) {
        setShowTranslation(null);
        setTooltipPosition(null);
        setWordDetails(null);
        setWordError(null);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showTranslation) {
        setShowTranslation(null);
        setTooltipPosition(null);
        setWordDetails(null);
        setWordError(null);
      }
    };

    if (showTranslation) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [showTranslation]);

  const handleWordTTS = useCallback((word: string) => {
    if (!("speechSynthesis" in window)) {
      console.warn("Text-to-speech not supported in this browser");
      return;
    }

    speakText(word);
  }, []);

  const speakText = (text: string) => {
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();

    const preferredVoice = voices.find(
      (voice) => voice.name.includes("Google") && voice.lang === "en-US"
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;

    speechSynthesis.speak(utterance);
  };

  const handleTextToSpeech = () => {
    if (isSpeaking) {
      // Stop current speech
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Check if browser supports speech synthesis
    if (!("speechSynthesis" in window)) {
      console.warn("Text-to-speech not supported in this browser");
      return;
    }
    speakText(content);
  };

  const renderContent = () => {
    return content.split(" ").map((word, index) => {
      const cleanWord = word.toLowerCase().replace(/[.,!?;]/g, "");
      const isClickable = cleanWord.length > 1; // Make most words clickable
      const isCurrentLoading = loadingWord === cleanWord;

      return (
        <WordContainer key={index} isUser={isUser}>
          <ClickableWord
            ref={(el) => {
              if (isClickable && el) {
                wordRefs.current[cleanWord] = el;
              }
            }}
            isClickable={isClickable}
            isUser={isUser}
            onClick={() => {
              if (isClickable) {
                handleWordClick(word, cleanWord);
              }
            }}
          >
            {word}
          </ClickableWord>

          {isCurrentLoading && (
            <span style={{ color: "#999", fontSize: "0.8em" }}>...</span>
          )}

          {index < content.split(" ").length - 1 && " "}
        </WordContainer>
      );
    });
  };

  return (
    <MessageContainer
      ref={messageRef}
      isUser={isUser}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isUser && <Avatar isUser={isUser}>🍰</Avatar>}
      <MessageWrapper>
        <MessageBubble isUser={isUser}>
          <MessageContent>{renderContent()}</MessageContent>
        </MessageBubble>
        <TTSButton
          className="tts-button"
          isUser={isUser}
          onClick={handleTextToSpeech}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={isSpeaking ? "Stop speaking" : "Read aloud"}
        >
          <VolumeUpIcon />
        </TTSButton>

        {/* Single WordTooltip positioned absolutely */}
        {showTranslation && tooltipPosition && (
          <TooltipContainer x={tooltipPosition.x} y={tooltipPosition.y}>
            <AnimatePresence>
              <WordTooltip
                word={showTranslation}
                onWordTTS={handleWordTTS}
                wordDetails={wordDetails}
                loading={loadingWord === showTranslation}
                error={wordError}
              />
            </AnimatePresence>
          </TooltipContainer>
        )}
      </MessageWrapper>
      {isUser && <Avatar isUser={isUser}>👤</Avatar>}
    </MessageContainer>
  );
};
