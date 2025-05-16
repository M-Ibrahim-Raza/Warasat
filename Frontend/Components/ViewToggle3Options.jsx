import React from 'react'
import { Network, PieChart, TableIcon, TreePalmIcon, TreePineIcon } from 'lucide-react'

const ViewToggle3Options = ({ viewToggle, setViewToggle }) => {

  return (
    <div className="relative bg-TCLG3 text-sm text-TCDG2/70 leading-none border-2 border-TCDG1 rounded-full inline-flex w-[27rem]">

      {/* Sliding Highlighter*/}
      <div
        className={`absolute top-0 left-0 h-full w-36 rounded-full transition-all duration-300 ease-in-out bg-TCDG1 ${viewToggle === 0 ? "translate-x-0" : viewToggle === 1 ? "translate-x-36" : "translate-x-72"}`}
      ></div>

      {/* Table Button */}
      <button
        onClick={() => setViewToggle(0)}
        className={`relative w-36 inline-flex justify-center align-middle items-center transition-all duration-300 ease-in-out rounded-full px-4 py-2 font-medium z-10 ${viewToggle === 0 ? "text-TCLG1 font-medium" : "text-TCDG2/70"
          }`}
        id="grid">
        <TableIcon />
        <span className='ml-2'>Table</span>
      </button>

      {/* Pie Chart Button */}
      <button
        onClick={() => setViewToggle(1)}
        className={`relative w-36 inline-flex justify-center align-middle items-center transition-all duration-300 ease-in-out rounded-full px-4 py-2 font-medium z-10 ${viewToggle === 1 ? "text-TCLG1 font-semibold" : "text-TCDG2/70"
          }`}
        id="list">
        <PieChart />
        <span className='ml-2'>Pie Chart</span>
      </button>

      {/* Tree Button */}
      <button
        onClick={() => setViewToggle(2)}
        className={`relative w-36 inline-flex justify-center align-middle items-center transition-all duration-300 ease-in-out rounded-full px-4 py-2 font-medium z-10 ${viewToggle === 2 ? "text-TCLG1 font-semibold" : "text-TCDG2/70"
          }`}
        id="list">
        <Network />
        <span className='ml-2'>Tree</span>
      </button>

    </div>
  )
}

export default ViewToggle3Options;
