import Project from '@/types/Project';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const projectApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/projects` }),
  endpoints: (builder) => ({
    getAllProjects: builder.query<Project[], { page: number; pagePerSize: number; order: string; sort: string }>({
      query: ({ page, pagePerSize, order, sort }) => ({
        url: `?page=${page}&pagePerSize=${pagePerSize}&order=${order}&sort=${sort}`,
      }),
    }),
    getProjectsLength: builder.query<number, void>({
      query: () => ({
        url: '/length',
      }),
    }),
    getProject: builder.query<Project, { id: number | undefined }>({
      query: ( id ) => ({
        url: `/${id}`,
      }),
    }),
    getUserProjects: builder.query<Project[], { userId: string | undefined; page: number; pagePerSize: number; order: string; sort: string }>({
      query: ({ userId, page, pagePerSize, order, sort }) => ({
        url: `/user/${userId}?page=${page}&pagePerSize=${pagePerSize}&order=${order}&sort=${sort}`,
      }),
    }),
    addLikes: builder.mutation<Project, { id: number | undefined; data: Project | undefined }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    addVisits: builder.mutation<Project, { id: number | undefined; data: Project }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    patchProject: builder.mutation<Project, { id: number; data: Project }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    addProject: builder.mutation<Project, { data: Project }>({
      query: ({ data }) => ({
        url: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
    }),
    deleteProject: builder.mutation<Project, { id: number | undefined }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetProjectsLengthQuery,
  useGetProjectQuery,
  useGetUserProjectsQuery,
  useAddLikesMutation,
  useAddVisitsMutation,
  usePatchProjectMutation,
  useAddProjectMutation,
  useDeleteProjectMutation,
} = projectApi;

export default projectApi;
