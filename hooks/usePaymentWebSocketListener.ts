import { useEffect, useRef } from "react";
import { useWebSocket } from "../context/WebSocketContext";

type PaymentWebSocketListenerProps = {
  onCancel?: () => void;
  onComplete?: () => void;
  onIncomplete?: () => void;
};

export function usePaymentWebSocketListener({ onCancel, onComplete, onIncomplete }: PaymentWebSocketListenerProps) {
  const { lastMessage, disconnect, onIncomplete: clearMessage } = useWebSocket();
  const hasHandledMessage = useRef(false);

  useEffect(() => {
    if (lastMessage && !hasHandledMessage.current) {
        hasHandledMessage.current = true;
        
        if (lastMessage.status === "CA") {
          disconnect();
          onCancel && onCancel();
        }
        if (lastMessage.status === "CO") {
          disconnect();
          onComplete && onComplete();
        }
        if (lastMessage.status === "IA") {
          onIncomplete && onIncomplete();
          clearMessage();
        }
    }

    return () => {
      hasHandledMessage.current = false;
    };
  }, [lastMessage]);
}   