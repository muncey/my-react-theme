import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useDispatch } from 'react-redux';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.munceyweb.com/wp-json/wp/v2' }),
  endpoints: (builder) => ({
      getPosts: builder.query({
        query: (page = 1) => ({
          url: `/posts?page=${page}&_fields=title,id,author,excerpt,date`,
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
        query: (id) => `/posts/${id}?_fields=title,id,author,content,date`
      })
  })
});

export const {
  useGetPostsQuery,
  useGetPostQuery
} = apiSlice;