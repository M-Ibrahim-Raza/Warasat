import React from 'react'
import MinusButton from './MinusButton'
import PlusButton from './PlusButton'

const HeirInput = ({onIncrement,onDecrement,val,children}) => {
  return (
    <div
      id="heir-input"

      className={`flex w-96 bg-TCLG1 py-2 px-4 font-semibold rounded-md mx-auto border-TCDG2 ring-TCDG2 ring-[0.5px] text-TCDG2`}
    >
      <div className='flex flex-[75%] justify-center align-middle'>
        <h1>{children}</h1>
      </div>
      <div className='flex flex-row flex-[25%] align-middle'>
        <MinusButton onClick={onDecrement}></MinusButton>
        <div className='flex flex-1 w-6 align-middle justify-center'>{val}</div>
        <PlusButton onClick={onIncrement}></PlusButton>
      </div>
    </div>
  )
}

export default HeirInput