import { baseApi } from '@shared/api';
import type { MessageDto } from '../model/types';

export const chatApi = {
  getMessages: async (chatId: number): Promise<MessageDto[]> => {
    const { data } = await baseApi.get<MessageDto[]>(`/chats/${chatId}/messages`);
    return data;
  },

  sendMessage: async (chatId: number, text: string): Promise<MessageDto> => {
    const { data } = await baseApi.post<MessageDto>(`/chats/${chatId}/messages`, { message: text });
    return data;
  },
};
