/* eslint-disable react/prop-types */
import ExpandablePanel from './ExpandablePanel'
import { GoTrash } from 'react-icons/go'
import Button from './Button'
import PhotosList from './PhotosList'
import { useDeleteAlbumMutation } from './../store/store'

export default function AlbumItem({ album, handleToggle, selected, index }) {
    const [deleteAlbum, results] = useDeleteAlbumMutation()
    

    const deleteAlbumHandler = () => {
        deleteAlbum(album)
    }

    const header = (
        <div className="flex items-center select-none pl-1 ">
            <Button onClick={() => deleteAlbumHandler(album.id)} loading={results.isLoading} onAlbum
                className='w-6 h-6 flex items-center justify-center border rounded me-2 hover:bg-stone-50  '>
                <GoTrash className='text-[11px] text-purple-700 ' />
            </Button>
            <span className='text-[11px] line-clamp-1 max-w-[100px]'>{album.title}</span>
            {results.isError &&
                <span className='ml-2 text-[9px] text-orange-500 font-semibold '>
                    <span>Error Deleting Album!!</span>
                </span>
            }
        </div>
    )

    return (
        <ExpandablePanel header={header} onAlbum handleToggle={handleToggle} selected={selected} index={index} >
            <PhotosList album={album} />
        </ExpandablePanel>
    )
}
