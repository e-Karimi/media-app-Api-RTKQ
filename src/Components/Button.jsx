/* eslint-disable react/prop-types */
import { GoSync } from 'react-icons/go'

export default function Button({ onClick, className, children, loading, onAlbum,onPhoto }) {

  return (
    <button onClick={onClick} disabled={loading}
      className={`cursor-pointer flex items-center justify-center ${className} ${loading && 'opacity-75 cursor-progress'}`}>
      {
        loading ?
        
          <GoSync className={`text-base animate-spin text-sky-700 font-bold ${onAlbum && 'text-sm text-purple-700'}
           ${onPhoto && 'text-sm text-pink-800'}`} 
           />

          : children
      }
    </button>
  )
}
