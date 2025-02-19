import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function TopicDetails() {
  return (
    <div className='mx-20 lg:mx-44'>
      {/* Input Topic */}
      <div className='mt-5'>
        <label>💡 Write the topic for which you want to generate a course (e.g., Python Course, Yoga, etc.):</label>
        <Input placeholder={'Topic'}/>
      </div>
      <div className='mt-5'>
        <label>📝 Tell us more about your course, what you want to include in the course(Optional)</label>
        <Textarea placeholder={'About your course'}/>
      </div>

      {/* Text Area Description */}
    </div>
  )
}

export default TopicDetails
