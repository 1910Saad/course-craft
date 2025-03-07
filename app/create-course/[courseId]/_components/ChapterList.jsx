import React from 'react'

export default function ChapterList({course}) {
  return (
    <div className="mt-5">
      <h2>Chapters</h2>
      <div className="mt-2">
        {course?.courseOutput?.Chapters.map((chapter, index) => (
            <div className="">
                <h2>{index+1}</h2>
            </div>
        ))}
      </div>
    </div>
  )
}
