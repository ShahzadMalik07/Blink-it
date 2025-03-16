import React from 'react'
import {createColumnHelper, flexRender,getCoreRowModel, useReactTable} from "@tanstack/react-table"

const Table = ({data, columns}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div className="p-2">
      <table className='w-full'>
        <thead className='bg-black text-white'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              
              <th>Sr No.</th>
              
              {headerGroup.headers.map(header => (
                <th className='border' key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row,index) => (
            <tr key={row.id}>
              <td className='border px-2'>{index+1}</td>
              {row.getVisibleCells().map(cell => (
                <td className='border px-2 py-1 whitespace-nowrap' key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      
      </table>
      <div className="h-4" />
    </div>
  )
}

export default Table
