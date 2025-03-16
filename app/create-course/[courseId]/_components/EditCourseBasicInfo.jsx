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
import { HiPencilSquare } from "react-icons/hi2";
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CourseList } from '@/configs/schema';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';


function EditCourseBasicInfo({course,refreshData}) {
    const [CourseName,setName] = useState();
    const [Description,setDescription] = useState();

    useEffect(()=>{
        setName(course?.courseOutput?.CourseName);
        setDescription(course?.courseOutput?.Description);
    },[course])

    const onUpdateHandler=async()=>{
        course.courseOutput.CourseName = CourseName;
        course.courseOutput.Description = Description;
        const result=await db.update(CourseList).set({
            courseOutput:course?.courseOutput
        }).where(eq(CourseList?.id,course?.id))
        .returning({id:CourseList.id});

        refreshData(true);

        console.log(result);
    }
    return (
        <Dialog>
            <DialogTrigger><HiPencilSquare /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Course Title and Description</DialogTitle>
                    <DialogDescription>
                        <div className='mt-3'>
                            <label>Course Title</label>
                            <Input defaultValue={course?.courseOutput?.CourseName} onChange={(event)=>setName(event?.target.value)}/>
                        </div>
                        <div>
                            <label>Course Description</label>
                            <Textarea className='h-40' defaultValue={course?.courseOutput?.Description} onChange={(event)=>setDescription(event?.target.value)}/>
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

export default EditCourseBasicInfo
