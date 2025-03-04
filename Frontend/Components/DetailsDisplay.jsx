import React from 'react'


const DetailsDisplay = ({ children, className }) => {
  return (
    <>
      <div className={className + ' flex bg-TCLG1 text-TCDG2 border-[1px] text-lg justify-center align-middle px-2 py-1 border-TCDG1 rounded-md font-semibold mt-2'}>
        <div className='flex-[70%] flex justify-center'>{children[0]}</div>
        <div className='flex-[30%] flex justify-center'>{children[1]}</div>
      </div>
    </>
  )

}

export default DetailsDisplay