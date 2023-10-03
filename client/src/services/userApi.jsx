// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl:'http://localhost:4040/api/'}),
  tagTypes:['userList'],
  endpoints: (builder) => ({
    getAllUserList: builder.query({
        query: () => ({
            url:'users',
            method:'GET',
            headers: {
                token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJiaGltYUBnbWFpbC5jb20iLCJpYXQiOjE2OTYxNjI0NzN9.OZWD3RNGDoen1MyipUCe8OMKvPv36g6R3FEDumrrlr8'
            }
          }),
          providesTags:['userList']
    }),
    addUser:builder.mutation({
        query:(userDetail) => ({
            url:"auth/register",
            method:'POST',
            body:{
                name:userDetail.name,
                user_name:userDetail.username,
                email:userDetail.email,
                password:userDetail.password,
                address:userDetail.address
            }
        }),
        invalidatesTags:['userList']
    }),
    deleteUser:builder.mutation({
      query:(userId) => ({
        url:"users/delete",
        method:"POST",
        headers: {
          token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJiaGltYUBnbWFpbC5jb20iLCJpYXQiOjE2OTYxNjI0NzN9.OZWD3RNGDoen1MyipUCe8OMKvPv36g6R3FEDumrrlr8'
        },
        body:{
          userId:userId
        }
      }),
      invalidatesTags:['userList']
    }),
    findUserById:builder.query({
      query:(userId) => ({
        url:`users/find/${userId}`,
        method:"GET",
        headers: {
          token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJiaGltYUBnbWFpbC5jb20iLCJpYXQiOjE2OTYxNjI0NzN9.OZWD3RNGDoen1MyipUCe8OMKvPv36g6R3FEDumrrlr8'
        },
      }),
      invalidatesTags:['userList']
    }),
    updateUser:builder.mutation({
      query:(userDetail) => ({
        url:'users/update',
        method:"POST",
        headers: {
          token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJiaGltYUBnbWFpbC5jb20iLCJpYXQiOjE2OTYxNjI0NzN9.OZWD3RNGDoen1MyipUCe8OMKvPv36g6R3FEDumrrlr8'
        },
        body:{
          userId:userDetail.userId,
          name:userDetail.name,
          user_name:userDetail.user_name,
          email:userDetail.email,
          address:userDetail.address
        }
      }),
      invalidatesTags:['userList']
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllUserListQuery, useAddUserMutation, useDeleteUserMutation, useFindUserByIdQuery, useUpdateUserMutation } = userApi