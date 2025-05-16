import React from 'react'
import ChildrenNodes from './ChildrenNodes'
import ParentsNodes from './ParentsNodes'
import SiblingsNodes from './SiblingsNodes'
import SpouseNodes from './SpouseNodes'

const Tree = ({childrenData,siblingsData,parentsData,spouseData}) => {
  return (
    <div className='tree relative mt-64 w-full h-[15rem]'>
      <div className='absolute -top-[50px] right-[275px]'>
      <ChildrenNodes childrenData={childrenData}></ChildrenNodes>
      </div>
      <div className='absolute -top-[50px] right-[200px]'>
      <SiblingsNodes siblingsData={siblingsData}></SiblingsNodes>
      </div>
      <div className='absolute -top-[50px] right-[200px]'>
        <SpouseNodes spouseData={spouseData}>
      </SpouseNodes>
      </div>
      <div className='absolute -top-[460px] right-[318px]'>
      <ParentsNodes parentsData={parentsData}></ParentsNodes>
      </div>
    </div>
  )
}

export default Tree