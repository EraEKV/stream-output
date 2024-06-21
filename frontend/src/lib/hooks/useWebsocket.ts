import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<string[]>([]);
  const webSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const webSocket = new WebSocket(url);

    webSocket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    webSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      } catch (error) {
        console.error('Error parsing message:', error);
        setMessages((prevMessages) => [...prevMessages, event.data]); // Handle non-JSON messages
      }
    };

    webSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    webSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    webSocketRef.current = webSocket;

    return () => {
      webSocket.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (webSocketRef.current?.readyState === WebSocket.OPEN) {
      webSocketRef.current.send(message);
    } else {
      console.error('WebSocket is not open');
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
