/* eslint-disable react/prop-types */
import { GoTrash } from 'react-icons/go'
import { GoSync } from 'react-icons/go'
import { useDeletePhotoMutation } from '../store/store'

export default function PhotoItem({ photo }) {
    const [deletePhoto, results] = useDeletePhotoMutation()
console.log('PhotoItem /results',results);

    const deletePhotoHandler = () => {
        deletePhoto(photo)
    }

    return (
        <div className='relative group' onClick={deletePhotoHandler}>
            <img src={photo.url} alt="picture" className="w-20 h-20 rounded" />
            <div className="absolute inset-0 flex items-center justify-center hover:bg-slate-200 hover:opacity-60 transition-all cursor-pointer">
                {
                    results.isLoading ? <GoSync className="text-3xl animate-spin text-gray-800 font-bold " /> :
                        <GoTrash className='text-3xl text-gray-700  hidden group-hover:block' />
                }
            </div>
        </div>
    )
}
