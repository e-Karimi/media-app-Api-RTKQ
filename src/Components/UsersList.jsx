/* eslint-disable react/no-unescaped-entities */
import { useState, useCallback } from 'react'
import Skeleton from './Skeleton'
import UserItems from './UserItems'
import Ping from './Ping'
import Button from './Button'
import { BsExclamationCircle } from 'react-icons/bs'
import { MdDone } from 'react-icons/md'
import { useFetchUsersQuery, useAddUserMutation } from './../store/store'

export default function UsersList() {
    const { data, isFetching, error } = useFetchUsersQuery()
    const [addUser, results] = useAddUserMutation()
    const [selected, setSelected] = useState(null)
  
    const addUserHandler = () => {
        addUser()
    }

    const handleToggle = useCallback((index) => {
        if (selected === index) {
            return setSelected(null)
        }
        setSelected(index)
    }, [selected])


    let content;
    if (isFetching) {
        content = <Skeleton times={8} onClassName='h-10 w-full' />
    }
    else if (error) {
        content = <div>Error Loading!!</div>
    }
    else {

        if (data.length === 0) {
            content = <div className="text-base text-center m-5">Hi,There aren't any user yet</div>
        } else {
            content = data.map((user, index) =>
                <UserItems
                    key={user.id}
                    user={user}
                    handleToggle={handleToggle}
                    selected={selected}
                    index={index}
                />
            )
        }
    }

    return (
        <div className='bg-slate-50 p-5 mx-auto min-h-screen max-w-xl'>
            <div className="mb-4">
                <header className="flex items-center justify-between mb-2 max-w-xl mx-auto">
                    <h1 className="flex items-center gap-x-2 font-bold text-slate-800">
                        <span>List</span>
                        <span className="flex items-center"><Ping />f </span>
                        <span>Users:</span>
                    </h1>
                    <Button onClick={addUserHandler} loading={results.isLoading}
                        className=" bg-blue-200 w-24 h-8 rounded text-sm cursor-pointer border border-sky-200 hover:bg-sky-200">
                        <span className='font-bold text-gray-700'>+ Add User</span>
                    </Button>
                </header>
                <div className="flex justify-end pr-1">
                    {results.isError &&
                        <span className='flex items-center text-xs text-orange-400 font-semibold'>
                            <span className='me-1'><BsExclamationCircle /></span>
                            <span>Error Creating User!!</span>
                        </span>
                    }
                    {results.isLoading &&
                        <span className='flex items-center text-sm text-sky-500 font-semibold'>
                            <span className='me-1'><MdDone /></span>
                            <span> Success Creating User</span>
                        </span>
                    }
                </div>
            </div>
            <div >
                {content}
            </div>
        </div>
    )
}
