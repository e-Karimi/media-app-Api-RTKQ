/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useCallback } from 'react'
import Button from './Button'
import Skeleton from './Skeleton'
import AlbumItem from './AlbumItem'
import { BsExclamationCircle } from 'react-icons/bs'
import { MdDone } from 'react-icons/md'
import { useFetchAlbumsQuery, useAddAlbumMutation } from './../store/store'


export default function AlbumList({ user }) {
  const [selected, setSelected] = useState(null)
  const { data, isFetching, error } = useFetchAlbumsQuery(user)
  const [addAlbum, results] = useAddAlbumMutation()


  const handleToggle = useCallback((index) => {
    if (selected === index) {
      return setSelected(null)
    }
    setSelected(index)

  }, [selected])

  const addAlbumHandler = () => {
    addAlbum(user)
  }

  let content;
  if (isFetching) {
    content = <Skeleton times={3} onClassName="h-7 w-full" />
  } else if (error) {
    content = <div>Error Loading!!</div>
  } else {
    content = data.map((album, index) =>
      <AlbumItem
        key={album.id}
        album={album}
        selected={selected}
        handleToggle={handleToggle}
        index={index}
      />
    )
  }

  return (
    <div>
      <div className="mb-3">
        <header className="flex items-center justify-between mb-2 max-w-l mx-auto px-3.5 font-semibold">
          <h3 className="text-sm">Albums By
            <span className="ml-1 ">{user.name}</span>
          </h3>
          <Button loading={results.isLoading} disabled={results.isLoading} onAlbum
            onClick={addAlbumHandler}
            className='w-[90px] text-xs py-1.5 border border-purple-300 rounded bg-purple-200 hover:bg-purple-300 font-semibold'>
            + Add Album
          </Button>
        </header>
        <div className="flex justify-end pr-6">
          {results.isError &&
            <div className='flex items-center text-xs text-orange-600 font-semibold'>
              <div className='me-1'><BsExclamationCircle /></div>
              <div>Error Creating Album!!</div>
            </div>
          }
          {results.isLoading &&
            <div className='flex items-center text-xs text-purple-800 font-semibold'>
              <div className='me-1'><MdDone /></div>
              <div> Success Creating Album</div>
            </div>
          }
        </div>
      </div>
      <div className="px-3">
        {content}
      </div>
    </div>
  )
}
