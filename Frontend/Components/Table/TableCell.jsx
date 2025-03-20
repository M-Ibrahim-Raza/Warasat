import React from 'react'
import { capitalizeWords } from '@/Utilities/utilities'

const TableCell = ({children}) => {
  const display_text = typeof children === 'string' ? capitalizeWords(children) : children
  
  return (
    <td class="px-6 py-4 border-b border-TCT1 text-center">{display_text}</td>
  )
}

export default TableCell