import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

function getPaging(page, headers) {
  const total = headers.get('X-WP-Total');
  const totalPages = headers.get('X-WP-TotalPages');

  return {
    page,
    total: parseInt(total),
    totalPages: parseInt(totalPages)
  }
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.munceyweb.com/wp-json/wp/v2' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
      getPosts: builder.query({
        query: (page = 1) => ({
          url: `/posts?page=${page}&_fields=title,id,author,excerpt,date`,
          responseHandler: async response => {
            const data = await response.json();
            const paging = getPaging(page, headers);
            return {
              data,
              paging
            }
          }
        }),
        providesTags: (result = {}, error, arg) => [
          'Post',
          ...(result.data ? result.data.map(({ id }) => ({ type: 'Post', id})) : [])
        ]
      }),
      getPost: builder.query({
        query: (id) => `/posts/${id}?_fields=title,id,author,content,date`,
        providesTags: (result, error, arg) => [{ type: 'Post', id: arg }]
      })
  })
});

export const {
  useGetPostsQuery,
  useGetPostQuery
} = apiSlice;