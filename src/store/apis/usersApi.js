import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'

//DEV ONLY !!!
const pause = (duration) => {
    return new Promise(resolve => {
        setTimeout(resolve, duration)
    })
}

const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: ' http://localhost:3005',
        //DEV ONLY !!!
        fetchFn: async (...arg) => {
            await pause(1000)
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => {
        return {
            fetchUsers: builder.query({
                providesTags: ['user'],
                query: () => {
                    return {
                        url: '/users',
                        method: 'GET',
                    }
                }
            }),
            addUser: builder.mutation({
                invalidatesTags: ['user'],
                query: () => {
                    return {
                        url: '/users',
                        method: 'POST',
                        body: {
                            name: faker.person.fullName()
                        }
                    }
                }
            }),
            deleteUser: builder.mutation({
                invalidatesTags: ['user'],
                query: (user) => {
                    return {
                        url: `/users/${user.id}`,
                        method: 'DELETE'

                    }
                }
            })


        }
    }

})

export default usersApi
export const { useFetchUsersQuery, useAddUserMutation ,useDeleteUserMutation} = usersApi