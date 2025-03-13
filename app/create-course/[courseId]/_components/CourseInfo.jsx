import React from 'react'
import Image from 'next/image'
import { HiOutlinePuzzle } from "react-icons/hi";
import{Button } from "@/components/ui/button"
export default function CourseInfo({course}) {
  return (
    <div className="p-10 border rounded-lg shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="">
            <h2 className="font-bold text-3xl">{course?.courseOutput?.CourseName}</h2>
            <p className="text-sm text-gray-400 mt-3">{course?.courseOutput?.Description}</p>
            <h2 className="font-medium mt-2 flex gap-2 items-center text-primary"><HiOutlinePuzzle /> {course?.category}</h2>
            <Button className="bg-primary text-white w-full mt-5">Start</Button>
        </div>
        <div>
            <Image src={'/placeholder.jpeg'}  width={300} height={300} className=" w-full rounded-xl h-[250px] object-cover" />
        </div>
        
      </div>
      
    </div>
  )
}
