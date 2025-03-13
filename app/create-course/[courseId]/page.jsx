"use client"
import { CourseList } from '@/configs/schema'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import{ and,eq } from "drizzle-orm"
import { db } from '@/configs/db'
import { ChapterList,CourseInfo,CourseDetail } from './_components'
function CourseLayout({params}) {
    var {user} = useUser()
    const [course, setCourse] = useState([])
    useEffect(()=>{
        console.log(params.courseId)
        params&&GetCourse()
    },[params,user])
    const GetCourse = async() =>{
        const result = await db.select().from(CourseList).where(and(eq(CourseList.courseId,params?.courseId),eq(CourseList.createdBy,user?.primaryEmailAddress?.emailAddress)))
        setCourse(result[0])
        console.log(result)
    }
  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>
      {/* basic info */}
      <CourseInfo course={course} />
      {/* course details */}
      <CourseDetail course={course} />
      {/* list of chaps */}
      <ChapterList course={course} />

    </div>
  )
}
export default CourseLayout
