import Message from '@/types/Message';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const messageApi = createApi({
  reducerPath: 'MessagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/comments` }),
  endpoints: (builder) => ({
    getAllMessages: builder.query<Message[], { page: number; pagePerSize: number; order: string; sort: string }>({
      query: ({ page, pagePerSize, order, sort }) => ({
        url: `?page=${page}&pagePerSize=${pagePerSize}&order=${order}&sort=${sort}`,
      }),
    }),
    getMessagesLength: builder.query<number, void>({
      query: () => ({
        url: '/length',
      }),
    }),
    getMessage: builder.query<Message, { id: number | undefined }>({
      query: ( id ) => ({
        url: `/${id}`,
      }),
    }),
    getUserMessages: builder.query<Message[], { userId: string | undefined; page: number; pagePerSize: number; order: string; sort: string }>({
      query: ({ userId, page, pagePerSize, order, sort }) => ({
        url: `/user/${userId}?page=${page}&pagePerSize=${pagePerSize}&order=${order}&sort=${sort}`,
      }),
    }),
    addLikes: builder.mutation<Message, { id: number | undefined; data: Message | undefined }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    addVisits: builder.mutation<Message, { id: number | undefined; data: Message | undefined }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    patchMessage: builder.mutation<Message, { id: number | undefined; data: Message }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    addMessage: builder.mutation<Message, { data: Message }>({
      query: ({ data }) => ({
        url: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
    }),
    deleteMessage: builder.mutation<Message, { id: number }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllMessagesQuery,
  useGetMessagesLengthQuery,
  useGetMessageQuery,
  useGetUserMessagesQuery,
  useAddLikesMutation,
  useAddVisitsMutation,
  usePatchMessageMutation,
  useAddMessageMutation,
  useDeleteMessageMutation,
} = messageApi;

export default messageApi;
