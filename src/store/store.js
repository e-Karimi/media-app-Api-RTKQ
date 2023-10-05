import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import usersApi from './apis/usersApi'
import albumApi from './apis/albumApi'
import photoApi from './apis/photoApi'

const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [albumApi.reducerPath]: albumApi.reducer,
        [photoApi.reducerPath]: photoApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(usersApi.middleware)
            .concat(albumApi.middleware)
            .concat(photoApi.middleware)
    }
})

setupListeners(store.dispatch)

export default store
export { useFetchUsersQuery, useAddUserMutation, useDeleteUserMutation } from './apis/usersApi'
export { useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation } from './apis/albumApi'
export { useFetchPhotosQuery ,useAddPhotoMutation,useDeletePhotoMutation} from './apis/photoApi'