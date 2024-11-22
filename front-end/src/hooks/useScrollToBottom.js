import { useEffect, useRef } from 'react';

export const useScrollToBottom = (dependency) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [dependency]); // Scroll when dependency (messages) changes

  return messagesEndRef;
};