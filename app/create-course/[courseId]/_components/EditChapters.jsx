"use client"

import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HiPencilSquare } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { db } from '@/configs/db'
import { eq } from 'drizzle-orm'
import { CourseList } from '@/configs/schema'

function EditChapters({ course, index,refreshData }) {

    const Chapters = course?.courseOutput?.Chapters;
    const [ChapterName, setChapterName]=useState();
    const [About, setAbout]=useState();

    useEffect(() => {
        setChapterName(Chapters[index].ChapterName);
        setAbout(Chapters[index].About);
    }, [course])

    const onUpdateHandler=async()=>{
        course.courseOutput.Chapters[index].ChapterName = ChapterName;
        course.courseOutput.Chapters[index].About = About;
        const result=await db.update(CourseList).set({
            courseOutput: course?.courseOutput
        }).where(eq(CourseList?.id, course?.id))
            .returning({ id: CourseList.id });

        console.log(result);
        refreshData(true);
    }


    return (
        <Dialog>
            <DialogTrigger><HiPencilSquare /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Chapter</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label>Course Title</label>
                            <Input defaultValue={Chapters[index].ChapterName} onChange={(event) => setChapterName(event?.target.value)} />
                        </div>
                        <div>
                            <label>Course Description</label>
                            <Textarea className='h-40' defaultValue={Chapters[index].About} onChange={(event) => setAbout(event?.target.value)} />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={onUpdateHandler}>Update</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default EditChapters
