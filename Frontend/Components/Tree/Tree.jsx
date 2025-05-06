import React from 'react'
import ChildrenNodes from './ChildrenNodes'
import ParentsNodes from './ParentsNodes'
import SiblingsNodes from './SiblingsNodes'
import SpouseNodes from './SpouseNodes'

const Tree = ({childrenData,siblingsData,parentsData,spouseData}) => {
  return (
    <div className='relative'>
      <div className='absolute top-[310px] right-[475px]'>
      <ChildrenNodes childrenData={childrenData}></ChildrenNodes>
      </div>
      <div className='absolute top-[310px] right-[400px]'>
      <SiblingsNodes siblingsData={siblingsData}></SiblingsNodes>
      </div>
      <div className='absolute top-[310px] right-[400px]'>
        <SpouseNodes spouseData={spouseData}>
      </SpouseNodes>
      </div>
      <div className='absolute -top-[100px] right-[518px]'>
      <ParentsNodes parentsData={parentsData}></ParentsNodes>
      </div>
    </div>
  )
}

export default Tree