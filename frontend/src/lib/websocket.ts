type WebSocketCallback = (data: any) => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private subscribers: Map<string, WebSocketCallback[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private isConnecting = false;

  constructor(private url: string) {
    // Only connect if we're in a browser environment
    if (typeof window !== 'undefined') {
      this.connect();
    }
  }

  private connect() {
    // Prevent multiple connection attempts
    if (this.isConnecting) return;

    this.isConnecting = true;

    try {
      // Only try to connect if we're in a browser environment
      if (typeof window === 'undefined') {
        this.isConnecting = false;
        return;
      }

      // Create the WebSocket connection
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.isConnecting = false;
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
        this.isConnecting = false;
        this.handleReconnect();
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnecting = false;
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
      this.isConnecting = false;
      this.handleReconnect();
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => this.connect(), this.reconnectDelay * this.reconnectAttempts);
    }
  }

  private handleMessage(data: any) {
    const { type, payload } = data;
    const callbacks = this.subscribers.get(type) || [];
    callbacks.forEach(callback => callback(payload));
  }

  subscribe(type: string, callback: WebSocketCallback) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, []);
    }
    this.subscribers.get(type)?.push(callback);
  }

  unsubscribe(type: string, callback: WebSocketCallback) {
    const callbacks = this.subscribers.get(type) || [];
    this.subscribers.set(type, callbacks.filter(cb => cb !== callback));
  }

  send(type: string, payload: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }));
    } else {
      console.warn('WebSocket is not connected. Message not sent:', { type, payload });
    }
  }
}

export const websocketService = new WebSocketService(
  process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:8080'
);