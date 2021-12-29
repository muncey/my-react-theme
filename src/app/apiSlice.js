import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useDispatch } from 'react-redux';
import { getAppOptions } from './services';

const options = getAppOptions();

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: options.baseUrl }),
  endpoints: (builder) => ({
      getPosts: builder.query({
        query: (page = 1) => ({
          url: `/posts?page=${page}&_fields=title,id,author,excerpt,date,meta`,
          responseHandler: async response => {
            const data = await response.json();
            const headers = response.headers;

            return {
              data,
              headers
            }
          }
        }),
        transformResponse: ({ data, headers}) => {
          const total = headers.get('X-WP-Total');
          const totalPages = headers.get('X-WP-TotalPages');

          return {
            posts: data,
            total: parseInt(total),
            totalPages: parseInt(totalPages)
          }
        },
      }),
      getPost: builder.query({
        query: (id) => `/posts/${id}?_fields=title,id,author,content,date,meta`
      })
  })
});

export const {
  useGetPostsQuery,
  useGetPostQuery
} = apiSlice;