import React from 'react'
import ChildrenNodes from './ChildrenNodes'
import ParentsNodes from './ParentsNodes'
import SiblingsNodes from './SiblingsNodes'

const Tree = ({childrenData,siblingsData,parentsData}) => {
  return (
    <div className='relative'>
      <div className='absolute top-[310px] right-[475px]'>
      <ChildrenNodes childrenData={childrenData}></ChildrenNodes>
      </div>
      <SiblingsNodes siblingsData={siblingsData}></SiblingsNodes>
      <div className='absolute -top-[100px] right-[518px]'>
      <ParentsNodes parentsData={parentsData}></ParentsNodes>
      </div>
    </div>
  )
}

export default Tree