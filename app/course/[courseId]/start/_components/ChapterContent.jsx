import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        autoplay: 0,
    },
};

function ChapterContent({ chapter, content }) {
    return (
        <div className='p-10'>
            <h2 className='font-medium text-2xl'>{chapter?.ChapterName}</h2>
            <p className='text-gray-500'>{chapter?.About}</p>

            {/* Video */}
            <div className='flex justify-center my-6'>
                <YouTube
                    videoId={content?.videoId}
                    opts={opts}
                />
            </div>


            <div>
                {content?.content?.Concepts?.map((item,index)=>(
                    <div className='p-5 bg-sky-50 md-3 rounded-lg'>
                        <h2 className='font-medium text-lg'>{item.Title}</h2>
                        {/* <p className='whitespace-pre-wrap'>{item.Explanation}</p> */}
                        <ReactMarkdown>{item.Explanation}</ReactMarkdown>
                        {item.CodeExample&& <div className='p-4 bg-black text-white rounded-md mt-3'>
                            <pre>
                                <code>{item.CodeExample}</code>
                            </pre>
                        </div>}
                    </div>
                ))}
            </div>


            {/* Content */}
        </div>
    )
}

export default ChapterContent
