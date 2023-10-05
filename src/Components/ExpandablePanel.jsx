/* eslint-disable react/prop-types */
import { GoChevronLeft, GoChevronDown } from 'react-icons/go'

export default function ExpandablePanel({ header, children, onAlbum,handleToggle, selected, index }) {
    
    return (
        <div className="mb-2 max-w-xl mx-auto" >
            <div className={` border py-[2px] px-[3px] bg-white ${onAlbum && 'py-0 px-[2px]'} ${selected === index ?'rounded-t rounded-b-none' : 'rounded-t rounded-b'}`}>
                <div className="flex items-center justify-between">
                    <header>{header}</header>
                    <div onClick={() => handleToggle(index)} className=" w-[46%] flex justify-end px-2 py-2.5 cursor-pointer ">
                        {selected === index ? <GoChevronLeft /> : <GoChevronDown />}
                    </div>
                </div>

                {
                    selected === index &&
                    <div className="bg-white rounded-b px-2 pt-2 pb-3 transition-all duration-300 ">
                        {children}
                    </div>
                }
            </div>
        </div>
    )
}

