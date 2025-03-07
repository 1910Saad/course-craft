import React from 'react'
import { HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi";
export default function ChapterList({ course }) {
    return (
        <div className="mt-5">
            <h2 className="font-bold text-2xl">Chapters</h2>
            <div className="mt-2">
                {course?.courseOutput?.Chapters.map((chapter, index) => (
                    <div className="flex gap-2 items-center border p-5 rounded-lg shadow-sm mt-2 ">
                        <div className="bg-primary h-10 w-10 rounded-full flex justify-center items-center text-white my-2">
                            <h2>{index + 1}</h2>
                        </div>
                        <div>
                            <h2 className="font-semibold text-sm">{chapter.ChapterName}</h2>
                            <p className= "text-gray-400 text-xs">{chapter.About}</p>
                            <p className='flex gap-2 text-primary items-center text-sm'><HiOutlineClock/> {chapter.Duration}</p>
                        </div>
                        <HiOutlineCheckCircle className='text-gray-300 text-3xl'/>
                    </div>
                ))}
            </div>
        </div>
    )
}
