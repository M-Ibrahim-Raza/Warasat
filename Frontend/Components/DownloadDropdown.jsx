import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DownloadDropdown = ({onExcelClick,onPdfClick}) => {
  return (
    <Select  value="" onValueChange={(value)=>{
      if (value === "excel"){
        onExcelClick()
      } else if (value === "pdf") {
        onPdfClick()
      }
    }}>
      <SelectTrigger className='w-32 font-medium !text-TCDG1 rounded-xl h-10  hover:!text-TCDG2'>
        <SelectValue placeholder="Download" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="excel">
              As Excel
        </SelectItem>
        <SelectItem value="pdf">
            As PDF
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default DownloadDropdown