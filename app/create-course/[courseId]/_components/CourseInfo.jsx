import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiOutlinePuzzle } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/configs/firebaseConfig";
import { eq } from "drizzle-orm";
import { CourseList } from "@/configs/schema";
import { uploadBytes } from "firebase/storage";
import { db } from "@/configs/db";
export default function CourseInfo({ course, refreshData,edit=true }) {
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (course) {
      setSelectedFile(course?.courseBannner)
    }
  }, [course])


  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
    const fileName = Date.now() + ".jpg";
    const storageRef = ref(storage, "ai-course/" + fileName);
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a blob:", snapshot.metadata.name);
      })
      .then((res) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          await db
            .update(CourseList)
            .set({
              courseBanner: downloadUrl,
            })
            .where(eq(CourseList.id, course?.id));
        });
      });
  };

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="">
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.CourseName}{" "}
            <EditCourseBasicInfo
              course={course}
              refreshData={() => refreshData(true)}
            />
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.Description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            <HiOutlinePuzzle /> {course?.category}
          </h2>
          <Button className="bg-primary text-white w-full mt-5">Start</Button>
        </div>
        <div>
          <label htmlFor="upload-image">
            <Image
              src={selectedFile ? selectedFile : "/placeholder.jpeg"}
              width={300}
              height={300}
              className=" w-full rounded-xl h-[250px] object-cover cursor-pointer"
            />
            {edit&& <input
              type="file"
              id="upload-image"
              className="opacity-0"
              onChange={onFileSelected}
            />}
          </label>
        </div>
      </div>
    </div>
  );
}
