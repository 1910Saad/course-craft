"use client"
import { CourseList } from '@/configs/schema'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import{ and,eq } from "drizzle-orm"
import { db } from '@/configs/db'
function CourseLayout({params}) {
    var user = useUser()
    const [course, setCourse] = useState([])
    useEffect(()=>{
        console.log(params.courseId)
        params&&GetCourse()
    },[params])
    const GetCourse = async() =>{
        const result = await db.select().from(CourseList).where(and(eq(CourseList.courseId,params?.courseId),eq(CourseList.createdBy,user?.primaryEmailAddress?.emailAddress)))
        console.log(result)
    }
  return (
    <div>
      CourseLayout
    </div>
  )
}
export default CourseLayout