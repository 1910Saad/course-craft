"use client"
import React, { useCallback, useRef } from 'react'
import Image from 'next/image'
import { toPng } from 'html-to-image'
import { Button } from '@/components/ui/button'


export default function page({ name = "John", date = "20 10 20", course = "Python" }) {
    const ref = useRef(null)

    const onButtonClick = useCallback(() => {
        if (!ref.current) return

        const node = ref.current

        const imgElements = node.getElementsByTagName('img')
        const imgPromises = Array.from(imgElements).map((img) => {
            if (img.complete) return Promise.resolve()
            return new Promise((resolve, reject) => {
                img.onload = resolve
                img.onerror = reject
            })
        })

        Promise.all(imgPromises)
            .then(() => toPng(node, { cacheBust: true }))
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `${name}_${course}_certificate.png`
                link.href = dataUrl
                link.click()
            })
            .catch((err) => console.error("Error generating image:", err))
    }, [ref, name, course])

    return (
        <div className="flex flex-col items-center justify-center p-6">
            {/* Certificate Output Area */}
            <div className="relative w-[560px] h-[400px]" ref={ref}>
                <Image
                    src="/certificate.jpg"
                    alt="certificate"
                    fill
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Name */}
                <div
                    className="absolute text-center font-bold text-xl text-black"
                    style={{ top: '190px', left: '50%', transform: 'translateX(-50%)' }}
                >
                    {name}
                </div>

                {/* Course */}
                <div
                    className="absolute text-sm text-gray-800"
                    style={{ top: '220px', left: '50%', transform: 'translateX(-50%)' }}
                >
                    {course}
                </div>

                {/* Date */}
                <div
                    className="absolute text-xs text-gray-700"
                    style={{ top: '308px', left: '140px' }}
                >
                    {date}
                </div>
            </div>

            {/* Download Button */}
            <Button
                onClick={onButtonClick}
                className="mt-6 px-6  text-white rounded-lg hover:bg-sky-700 transition"
            >
                Download 🔽
            </Button>
        </div>
    )
}
