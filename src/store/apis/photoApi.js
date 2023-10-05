import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//DEV ONLY !!!
const pause = (duration) => {
    return new Promise(resolve => {
        setTimeout(resolve, duration)
    })
}

const photoApi = createApi({
    reducerPatch: 'photo',
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
            fetchPhotos: builder.query({
                providesTags: (result, error, album) => {
                    const tags = result.map(photo => {
                        return { type: 'photo', id: photo.id }
                    })
                    tags.push({ type: 'albumPhotos', id: album.id })
                    return tags;
                },
                query: (album) => {
                    return {
                        url: 'photos',
                        params: { albumId: album.id },
                        methos: 'GET'
                    }
                }
            }),
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'albumPhotos', id: album.id }]
                },
                query: (album) => {
                    return {
                        url: 'photos',
                        params: { albumId: album.id },
                        method: 'POST',
                        body: {
                            url: 'https://via.placeholder.com/150/f66b97',
                            albumId: album.id
                        }
                    }
                }
            }),
            deletePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{ type: 'photo', id: photo.id }]
                },
                query: (photo) => {
                    return {
                        url: `photos/${photo.id}`,
                        method: 'DELETE',
                    }
                }
            })
        }

    }
})


export default photoApi
export const { useFetchPhotosQuery, useAddPhotoMutation, useDeletePhotoMutation } = photoApi

