"use client"
import Header from '@/app/_components/Header';
import { ChapterList, CourseDetail, CourseInfo } from '@/app/create-course/[courseId]/_components';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { HiOutlineClipboardDocumentCheck, HiOutlineShare } from 'react-icons/hi2';
import Chatbot from '@/app/_components/Chatbot';
function Course({ params }) {
    const [course, setCourse] = useState([]);
    useEffect(() => {
        params && GetCourse()
    }, [params])
    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId))
        setCourse(result[0]);

        // console.log(result);
        setCourse(result[0])
    }
    return (
        <div>
            <Header />
            <div className="px-10 p-10 md:px-20 lg:px-44">
                <CourseInfo course={course} edit={false} />
                <h3 className="mt-3  mb-2">Course Url:</h3>
                <div>
                    <h2 className="flex items-center justify-between text-center text-gray-400 border p-2 rounded-md">
                        {process.env.NEXT_PUBLIC_HOST_NAME}/course/{course?.courseId}
                        <HiOutlineClipboardDocumentCheck
                            onClick={async () =>
                                await navigator.clipboard.writeText(
                                    process.env.NEXT_PUBLIC_HOST_NAME +
                                    "/course/" +
                                    course?.courseId
                                )
                            }
                            className="text-2xl cursor-pointer text-primary"
                        />
                        {/* Share URL Icon */}
                        {navigator.share && (
                            <HiOutlineShare
                                onClick={() => {
                                    navigator
                                        .share({
                                            title: "Check out this course!",
                                            url:
                                                process.env.NEXT_PUBLIC_HOST_NAME +
                                                "/course/" +
                                                course?.courseId,
                                        })
                                        .then(() => console.log("Successfully shared"))
                                        .catch((error) => console.log("Error sharing", error));
                                }}
                                className="text-2xl cursor-pointer text-primary"
                                title="Share URL"
                            />
                        )}
                    </h2>
                </div>

                <CourseDetail course={course} />
                <ChapterList course={course} edit={false} />
            </div>
            <Chatbot />
        </div>
    )
}

export default Course
