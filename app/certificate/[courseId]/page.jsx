"use client"

import React, { useCallback, useRef } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { toPng } from 'html-to-image'
import { Button } from '@/components/ui/button'
import Header from '@/app/_components/Header'


export default function CertificatePage() {
  // 1) Read dynamic segment
  const { courseId } = useParams()

  // 2) Read query string
  const searchParams = useSearchParams()
  const name       = searchParams.get('name')   || 'John Doe'
  const courseName = searchParams.get('course') || 'Course Name'

  // 3) Format date
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  const ref = useRef(null)

  // 4) Download handler
  const onButtonClick = useCallback(() => {
    if (!ref.current) return
    const node = ref.current
    const imgs = Array.from(node.getElementsByTagName('img'))
      .map(img =>
        img.complete
          ? Promise.resolve()
          : new Promise((res, rej) => { img.onload = res; img.onerror = rej })
      )

    Promise.all(imgs)
      .then(() => toPng(node, { cacheBust: true }))
      .then(dataUrl => {
        const link = document.createElement('a')
        link.download = `${name}_${courseName}_certificate.png`
        link.href = dataUrl
        link.click()
      })
      .catch(console.error)
  }, [name, courseName])

  return (
    <section className="bg-gray-900 lg:grid lg:h-screen lg:place-content-center">
        <Header getstart={false} />
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-22 lg:px-8 lg:py-30">
        <div className="mx-auto max-w-prose text-center">
          <div className="flex flex-col items-center justify-center p-6">
            <div className="relative w-[560px] h-[400px] " ref={ref}>
              <Image
                src="/certificate.jpg"
                alt="certificate"
                fill
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />

              {/* NAME */}
              <div
                className="absolute text-center font-bold text-xl text-black"
                style={{ top: '190px', left: '50%', transform: 'translateX(-50%)' }}
              >
                {name}
              </div>

              {/* COURSE */}
              <div
                className="absolute text-[10px] text-gray-800 w-[70px] h-[15px] overflow-hidden"
                style={{ top: '220px', left: '50%', transform: 'translateX(-50%)' }}
              >
                {courseName}
              </div>

              {/* DATE */}
              <div
                className="absolute text-xs text-gray-700"
                style={{ top: '308px', left: '140px' }}
              >
                {date}
              </div>
            </div>

            <Button
              onClick={onButtonClick}
              className="mt-6 px-6 text-white rounded-lg hover:bg-sky-700 transition"
            >
              Download 🔽
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
