"use client"
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'
import Chatbot from '@/app/_components/Chatbot'
function CourseStart({ params }) {

    const [course, setCourse] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState([]);
    const [chapterContent,setChapterContent]=useState([]);
    useEffect(() => {
        GetCourse();
    }, [])

    /**
     * Used to get Iourse Info by Course Id
     */
    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId));
        console.log(result);
        setCourse(result[0]);
        GetSelectedChapterContent(0);
    }

    const GetSelectedChapterContent = async (chapterId) => {
        const result = await db.select().from(Chapters)
            .where(and(eq(Chapters.chapterId, chapterId),
                eq(Chapters.courseId, course?.courseId)));
        setChapterContent(result[0]);
        console.log(result)
    }
    return (
        <div>
            {/* Chapter List Side bar */}
            <div className='fixed md:w-64 hidden md:block h-screen border-r shadow-sm overflow-auto'>
                <h2 className='font-medium text-lg bg-primary p-4 text-white'>{course?.courseOutput?.CourseName}</h2>

                <div>
                    {course?.courseOutput?.Chapters.map((chapter, index) => (
                        <div key={index}
                            className={`cursor-pointer hover:bg-purple-50 ${selectedChapter?.ChapterName == chapter?.ChapterName && 'bg-purple-100'}`}
                            onClick={() => {
                                setSelectedChapter(chapter);
                                GetSelectedChapterContent(index)
                            }}>
                            <ChapterListCard chapter={chapter} index={index} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Content Div */}
            <div className='md:ml-64'>
                <ChapterContent chapter={selectedChapter} content={chapterContent}/>
            </div>
            {/* Chatbot */}
            <Chatbot/>
        </div>
    )
}

export default CourseStart
