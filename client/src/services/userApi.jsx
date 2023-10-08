// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
const userToken = localStorage.getItem('user_token')
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4040/api/' }),
  tagTypes: ['userList'],
  endpoints: (builder) => ({
    getAllUserList: builder.query({
      query: () => ({
        url: 'users',
        method: 'GET',
        headers: {
          token: userToken
        }
      }),
      providesTags: ['userList']
    }),
    addUser: builder.mutation({
      query: (userDetail) => ({
        url: "auth/register",
        method: 'POST',
        body: {
          name: userDetail.name,
          user_name: userDetail.username,
          email: userDetail.email,
          password: userDetail.password,
          address: userDetail.address
        }
      }),
      invalidatesTags: ['userList']
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: "users/delete",
        method: "POST",
        headers: {
          token: userToken
        },
        body: {
          userId: userId
        }
      }),
      invalidatesTags: ['userList']
    }),
    findUserById: builder.query({
      query: (userId) => ({
        url: `users/find/${userId}`,
        method: "GET",
        headers: {
          token: userToken
        },
      }),
      invalidatesTags: ['userList']
    }),
    updateUser: builder.mutation({
      query: (userDetail) => ({
        url: 'users/update',
        method: "POST",
        headers: {
          token: userToken
        },
        body: {
          userId: userDetail.userId,
          name: userDetail.name,
          user_name: userDetail.user_name,
          email: userDetail.email,
          address: userDetail.address
        }
      }),
      invalidatesTags: ['userList']
    }),
    loginUser: builder.mutation({
      query: (userDetail) => ({
        url: 'auth/login',
        method: "POST",
        body: {
          user_email: userDetail.userEmail,
          user_password: userDetail.userPassword
        }
      })
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllUserListQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useFindUserByIdQuery,
  useUpdateUserMutation,
  useLoginUserMutation
} = userApi