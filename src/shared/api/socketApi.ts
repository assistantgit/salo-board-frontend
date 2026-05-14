import { env } from '../config/env';
import { tokenStorage } from '../lib/storage/tokenStorage';

export type SocketEventCallback<T = unknown> = (data: T) => void;

/**
 * SocketApi class to handle WebSocket connections.
 * Provides a simple event-driven interface for real-time updates.
 */
export class SocketApi {
  private socket: WebSocket | null = null;
  private listeners: Map<string, Set<SocketEventCallback<any>>> = new Map();
  private reconnectTimeout: number | null = null;
  private isConnecting = false;
  private url: string;

  constructor(url?: string) {
    this.url = url || env.WS_URL;
    // Proactively connect if in browser
    if (typeof window !== 'undefined') {
      this.connect();
    }
  }

  /**
   * Connect to the WebSocket server.
   */
  public connect() {
    if (this.socket?.readyState === WebSocket.OPEN || this.isConnecting) return;

    this.isConnecting = true;

    // Determine the base WS URL
    let wsUrl = this.url;
    if (!wsUrl.startsWith('ws')) {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = window.location.host;
      wsUrl = `${protocol}//${host}${wsUrl}`;
    }

    // Add token for authentication if available and not already in URL
    const token = tokenStorage.getAccessToken();
    let finalUrl = wsUrl;
    if (token && !wsUrl.includes('token=')) {
      finalUrl = `${wsUrl}${wsUrl.includes('?') ? '&' : '?'}token=${token}`;
    }

    try {
      this.socket = new WebSocket(finalUrl);

      this.socket.onopen = () => {
        console.log(`[SocketApi] Connected to ${wsUrl}`);
        this.isConnecting = false;
        this.clearReconnect();
      };

      this.socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          // If the payload has type and data, use them. Otherwise, treat the whole payload as data.
          if (payload && typeof payload === 'object' && 'type' in payload) {
            const { type, data } = payload;
            this.notify(type, data);
          } else {
            // Default event for raw messages
            this.notify('message', payload);
          }
        } catch (error) {
          console.error('[SocketApi] Failed to parse message', error);
        }
      };

      this.socket.onclose = () => {
        console.log(`[SocketApi] Disconnected from ${wsUrl}`);
        this.isConnecting = false;
        this.scheduleReconnect();
      };

      this.socket.onerror = (error) => {
        console.error(`[SocketApi] WebSocket error on ${wsUrl}`, error);
        this.isConnecting = false;
      };
    } catch (error) {
      console.error(`[SocketApi] Connection failed to ${wsUrl}`, error);
      this.isConnecting = false;
      this.scheduleReconnect();
    }
  }

  /**
   * Subscribe to a specific event type.
   */
  public subscribe<T = unknown>(type: string, callback: SocketEventCallback<T>) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)?.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(type)?.delete(callback);
    };
  }

  /**
   * Send a message to the server.
   */
  public send(typeOrPayload: string | Record<string, unknown>, data?: unknown) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      // If data is provided, use {type, data} format.
      // If not, and typeOrPayload is an object, send it directly (raw message support).
      const payload = data !== undefined ? { type: typeOrPayload as string, data } : typeOrPayload;
      this.socket.send(JSON.stringify(payload));
    } else {
      console.warn('[SocketApi] Cannot send message: socket not connected');
    }
  }

  /**
   * Close the connection.
   */
  public disconnect() {
    this.clearReconnect();
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  /**
   * Force reconnect (useful when tokens change).
   */
  public reconnect() {
    this.disconnect();
    this.connect();
  }

  private notify(type: string, data: unknown) {
    this.listeners.get(type)?.forEach((callback) => {
      callback(data);
    });
    // Also notify wildcard listeners if any
    this.listeners.get('*')?.forEach((callback) => {
      callback({ type, data });
    });
  }

  private scheduleReconnect() {
    if (this.reconnectTimeout) return;
    this.reconnectTimeout = window.setTimeout(() => {
      this.reconnectTimeout = null;
      this.connect();
    }, 5000);
  }

  private clearReconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }
}
