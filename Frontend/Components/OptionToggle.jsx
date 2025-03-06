import React from 'react'
import { Switch } from "@/components/ui/switch";

const OptionToggle = ({ checked, onCheckedChange, children }) => {
  return (
    <div className="border-2 border-TCDG1 rounded-xl flex flex-col items-center justify-center w-40 px-2 py-1 bg-TCLG1 cursor-pointer hover:bg-TCLG1 transition-all ease-in text-sm"
      onClick={onCheckedChange}>
      <div className="text-TCDG2 font-semibold"><p className="text-center">Add</p><p className="text-center -mt-1">{children}</p></div>
      <Switch className="mt-1" size="" checked={checked}
       />
    </div>
  )
}

export default OptionToggle