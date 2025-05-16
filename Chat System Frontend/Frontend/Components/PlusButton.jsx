import React from 'react'

const PlusButton = ({onClick}) => {
  return (
    <button className='flex-1 cursor-pointer hover:scale-105 transition-all ease-in-out'
    onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" className='text-TCDG2/85 hover:text-TCDG2 w-6 h-6 rounded-full lucide lucide-circle-plus 
    '><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
</button>
  )
}

export default PlusButton
