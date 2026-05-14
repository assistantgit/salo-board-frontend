import { SocketApi } from '@shared/api';
import { env } from '@shared/config/env';
import { useSocket } from '@shared/lib';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import type { MessageDto } from '../model/types';
import { chatApi } from './chatApi';

export const useChat = (chatId: number, token: string) => {
  const queryClient = useQueryClient();
  const queryKey = useMemo(() => ['messages', chatId], [chatId]);

  // 1. Завантажуємо початкову історію через HTTP
  const { data: messages, isLoading } = useQuery({
    queryKey,
    queryFn: () => chatApi.getMessages(chatId),
    enabled: !!chatId,
  });

  // 2. Створюємо спеціалізований сокет для конкретного чату
  const chatSocket = useMemo(() => {
    const wsUrl = `${env.BACKEND_WS_URL}/ws/chats/${chatId}/?token=${token}`;
    return new SocketApi(wsUrl);
  }, [chatId, token]);

  // Закриваємо сокет при розмонтуванні
  useEffect(() => {
    return () => {
      chatSocket.disconnect();
    };
  }, [chatSocket]);

  // 3. Підписуємося на нові повідомлення
  // SocketApi автоматично використовує подію 'message' для "сирих" JSON-повідомлень без поля type
  useSocket<MessageDto>(
    'message',
    (newMessage) => {
      queryClient.setQueryData<MessageDto[]>(queryKey, (oldData) => {
        if (!oldData) return [newMessage];
        return [...oldData, newMessage];
      });
    },
    [queryKey, queryClient],
    chatSocket,
  );

  // 4. Функція для відправки повідомлення
  const sendMessage = useCallback(
    (text: string) => {
      chatSocket.send({ message: text });
    },
    [chatSocket],
  );

  return {
    messages: messages ?? [],
    isLoading,
    sendMessage,
  };
};
