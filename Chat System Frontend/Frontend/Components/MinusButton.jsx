import React from 'react'

const MinusButton = ({onClick}) => {
  return (
    <button
      className='flex-1 flex cursor-pointer justify-end hover:scale-105 transition-all ease-in-out'
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" 
        className='text-TCDG2/85 hover:text-TCDG2 w-6 h-6 rounded-full lucide'>
        <circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
    </button>
  )
}

export default MinusButton
