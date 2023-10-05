/* eslint-disable react/prop-types */
import { GoTrash } from 'react-icons/go'
import Button from './Button'
import ExpandablePanel from './ExpandablePanel'
import { BsExclamationCircle } from 'react-icons/bs'
import AlbumList from './AlbumList'
import { useDeleteUserMutation } from './../store/store'


export default function UserItems({ user, handleToggle, selected, index }) {
    const [deleteUser, results] = useDeleteUserMutation()

    const deleteUserHandler = () => {
        deleteUser(user)
    }

    const header = (
        <div className="flex items-center select-none pl-1 ">
            <Button onClick={deleteUserHandler} loading={results.isLoading}
                className='w-7 h-7 flex items-center justify-center border rounded me-2 hover:bg-stone-50'>
                <GoTrash className='text-xs text-sky-400 ' />
            </Button>
            <span className='text-sm line-clamp-1 flrx-auto'>{user.name}</span>
            {results.isError &&
                <span className='flex items-center text-xs text-orange-500 font-semibold'>
                    <span className='ml-2 mr-1'><BsExclamationCircle /></span>
                    <span className='text-[10px]'>Error Deleting User!!</span>
                </span>
            }
        </div>
    )

    return (
        <div key={user.id}>
            <ExpandablePanel header={header} handleToggle={handleToggle} selected={selected} index={index}  >
                <AlbumList user={user} />
            </ExpandablePanel>
        </div>

    )
}
