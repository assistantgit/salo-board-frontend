import { useEffect } from 'react';
import type { SocketApi } from '../../api/socketApi';

/**
 * Hook to subscribe to WebSocket events.
 *
 * @param event - The event type to listen for.
 * @param callback - The callback function to execute when the event is received.
 * @param deps - Optional dependencies to re-subscribe if they change.
 * @param customSocketApi - Optional custom SocketApi instance to use.
 */
export const useSocket = <T = unknown>(
  event: string,
  callback: (data: T) => void,
  deps: unknown[] = [],
  customSocketApi: SocketApi,
) => {
  const api = customSocketApi;

  useEffect(() => {
    const unsubscribe = api.subscribe(event, callback);
    return () => {
      unsubscribe();
    };
  }, [event, callback, api, ...deps]);

  return {
    send: (data: unknown) => api.send(event, data),
  };
};
