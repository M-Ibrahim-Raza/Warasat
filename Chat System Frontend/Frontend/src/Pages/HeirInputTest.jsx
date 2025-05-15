import HeirInput from '../../Components/HeirInput'
import MinusButton from '../../Components/MinusButton'
import PlusButton from '../../Components/PlusButton'
import React, { useState } from 'react'

const Test = () => {

  const [val,setVal]=useState(1)
  return (
    <div className='mt-10 ml-10'>

      <div>
        <div className="flex-col gap-4 flex px-2 py-10 bg-white/60">
          
        <HeirInput 
        onIncrement={()=>{setVal(val=>val+1)}} 
        val={val}
        onDecrement={() => { val>1 && setVal(val => val - 1) }}
        >Son</HeirInput>
        <HeirInput val={12}>Son</HeirInput>
        <HeirInput val={12}>Daughter</HeirInput>

      </div>

    </div>
    </div>

  )
}

export default Test
