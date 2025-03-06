import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



const Test = () => {

  const [val,setVal]=useState(1)
  return (
    <div className='mt-10 ml-10'>

      <div>
        <div className="flex-col gap-4 flex px-2 py-10 bg-white/60">
        
          <Select>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Heir Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

      </div>

    </div>
    </div>

  )
}

export default Test