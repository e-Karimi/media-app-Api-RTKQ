import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from '@faker-js/faker'

//DEV ONLY !!!
const pause = (duration) => {
    return new Promise(resolve => {
        setTimeout(resolve, duration)
    })
}


const albumApi = createApi({
    reducerPath: 'album',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        //DEV ONLY !!!
        fetchFn: async (...arg) => {
            await pause(1000)
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => {
        return {
            fetchAlbums: builder.query({
                providesTags: (result, error, user) => {
                    const tags = result.map(album => {
                        return { type: 'album', id: album.id }
                    })
                    tags.push({ type: 'userAlbums', id: user.id })
                    return tags
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        params: { userId: user.id },
                        method: 'GET',
                    }
                }
            }),
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{ type: 'userAlbums', id: user.id }]
                },
                query: (user) => {
                    return {
                        url: `/albums`,
                        method: 'POST',
                        body: {
                            title: faker.commerce.productName(),
                            userId: user.id
                        }
                    }
                }
            }),
            deleteAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'album', id: album.id }]
                },
                query: (album) => {
                    return {
                        url: `albums/${album.id}`,
                        method: 'DELETE',
                    }
                }
            })
        }
    }
})


export default albumApi
export const { useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation } = albumApi