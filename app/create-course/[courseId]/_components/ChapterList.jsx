import React, { useEffect, useState } from 'react'
import { HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi";
import EditChapters from './EditChapters';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { ChapterProgress } from '@/configs/schema';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';


export default function ChapterList({ course, refreshData, edit=false}) {

    const [progress, setProgress] = useState([]);
    const { user, isLoaded } = useUser();
    const [isCourseCompleted, setIsCourseCompleted] = useState(false);

    const router = useRouter();




    const getProgress = async () => {
        const result = await db.select().from(ChapterProgress).where(
            and(
                eq(ChapterProgress.courseId, course?.courseId),
                eq(ChapterProgress.userId, user?.id)
            )
        );
        setProgress(result); // You can later map this into an object for faster lookup
    };

    useEffect(() => {
        if (user && course?.courseId) {
            getProgress();
        }
    }, [user, course?.courseId]);

    useEffect(() => {
        const checkCompletion = async () => {
            if (user && course?.courseId) {
                const completed = await checkAllChaptersCompleted();
                setIsCourseCompleted(completed);
            }
        };

        checkCompletion();
    }, [progress]);



    const handleMarkAsDone = async (chapterId) => {
        await db
            .insert(ChapterProgress)
            .values({
                userId: user?.id,
                courseId: course?.courseId,
                chapterId: chapterId,
                completed: true
            })

        // const isCourseCompleted = await checkAllChaptersCompleted();
        // if (isCourseCompleted) {
        //     await generateCertificate(); // call your certificate logic
        // }

        getProgress(); // refresh state
    };

    const checkAllChaptersCompleted = async () => {
        const totalChapters = course?.courseOutput?.Chapters.length;

        const result = await db.select().from(ChapterProgress).where(
            and(
                eq(ChapterProgress.courseId, course?.courseId),
                eq(ChapterProgress.userId, user?.id),
                eq(ChapterProgress.completed, true)
            )
        );

        return result.length === totalChapters;
    };

    return (
        <div className="mt-3">
            <h2 className="font-medium text-xl">Chapters</h2>
            <div className="mt-2">
                {course?.courseOutput?.Chapters.map((chapter, index) => (
                    <div className='border p-5 rounded-lg mb-2 flex items-center justify-between'>
                        <div className="flex gap-5 items-center">
                            <h2 className='bg-primary flex-none h-10 w-10 rounded-full text-center text-white p-2'>{index + 1}</h2>
                            <div>
                                <h2 className="font-medium text-lg">{chapter.ChapterName} <EditChapters course={course} index={index} refreshData={() => refreshData(true)} /> </h2>
                                <p className="text-sm text-gray-500 ">{chapter.About}</p>
                                <p className='flex gap-2 text-primary items-center'><HiOutlineClock /> {chapter.Duration}</p>
                                <Button
                                    onClick={() => handleMarkAsDone(index)}
                                    disabled={progress?.[chapter.chapterId]?.completed}
                                    variant={progress?.[chapter.chapterId]?.completed ? 'secondary' : 'default'}
                                >
                                    {progress?.[index]?.completed ? 'Completed ✅' : 'Mark as Done'}
                                </Button>
                            </div>
                        </div>
                        <HiOutlineCheckCircle className='text-gray-300 text-4xl flex-none' />
                    </div>

                ))}
            </div>
            {isCourseCompleted && edit && <div className={`flex justify-center items-center mt-10`}>
                <Button className='text-lg py-5' onClick={() => router.push(`/certificate/${course.courseId}`)}>Generate Certificate</Button>
            </div>}
        </div>
    )
}
